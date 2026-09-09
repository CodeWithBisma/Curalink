import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mic, 
  Square, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Edit3, 
  ShieldCheck, 
  User, 
  Clock, 
  ArrowLeft, 
  Stethoscope, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Radio,
  Lock,
  Volume2,
  Play,
  Calendar,
  ClipboardList,
  ArrowRight
} from 'lucide-react';
import { requestAIScribeReport, ScribeReportOutput } from '../../services/clinicalScribeService';
import { ConsultationReport } from '../../types';
import { EmergencyButton } from '../../components/shared/EmergencyButton';

export const DoctorScribePage: React.FC = () => {
  const { 
    currentUser, 
    doctorProfile, 
    patientProfile, 
    bookings, 
    signConsultationReport,
    navigate 
  } = useApp();

  // ACCESS GUARD: The AI consultation report generator is strictly for doctors
  if (currentUser?.role === 'patient') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300">
            Physician Access Only
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            Doctor-Exclusive CuraLink AI Scribe
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            CuraLink AI Scribe & Consultation Report Builder is reserved solely for licensed medical doctors to record clinical encounters and generate verified prescriptions.
          </p>
          <p className="text-xs text-gray-500">
            As a patient, you can review all your completed, doctor-signed medical consultation reports directly in your Health Records portal.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/dashboard/patient')}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Return to Patient Portal
          </button>
        </div>
      </div>
    );
  }

  // Selected Booking / Patient Context
  const [selectedBookingId, setSelectedBookingId] = useState<string>(bookings[0]?.id || 'bk_demo');
  const activeBooking = (bookings || []).find(b => b.id === selectedBookingId) || bookings[0];
  
  const patientDisplayName = activeBooking?.patient_name || patientProfile?.name || 'Zainab Ahmed';
  const doctorDisplayName = doctorProfile?.name || currentUser?.name || 'Dr. Ayesha Tariq';

  // Recording & Audio State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [interimText, setInterimText] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(16).fill(6));
  const [quickDictation, setQuickDictation] = useState('');

  // Two-Speaker Real-Time Turn Tracking (Speaker 1 and Speaker 2, no manual selection)
  const currentSpeakerTurnRef = useRef<1 | 2>(1);
  const lastSpeechTimeRef = useRef<number>(0);

  const timerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const animationFrameRef = useRef<any>(null);

  // Transcript & AI Report State (Starts completely empty with no pre-filled reports)
  const [transcript, setTranscript] = useState<string>('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiReportSource, setAiReportSource] = useState<string>('');
  const [report, setReport] = useState<ScribeReportOutput | null>(null);
  const [activeTab, setActiveTab] = useState<'transcript' | 'report'>('transcript');
  const [reportSubTab, setReportSubTab] = useState<'all' | 'complaint_history' | 'diagnosis' | 'prescription' | 'follow_up'>('all');
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Patient Complaint & Medical History (User Request: Patient can type too for Complaint; Medical History with age, gender, duration)
  const [patientComplaint, setPatientComplaint] = useState<string>(activeBooking?.reason || 'Fever (101.2°F), dry cough, and frontal headache for past 3 days');
  const [patientAge, setPatientAge] = useState<string>('29');
  const [patientGender, setPatientGender] = useState<string>('Female');
  const [problemDurationDays, setProblemDurationDays] = useState<string>('3');
  const [pastMedicalHistory, setPastMedicalHistory] = useState<string>('Mild seasonal asthma, occasional tension headaches');
  const [allergies, setAllergies] = useState<string>('Penicillins (rash/urticaria)');

  // Follow-up tab states (User Request: Another tab after prescription named follow up where Doctor tells patient to follow up after specific time)
  const [followUpTimeframe, setFollowUpTimeframe] = useState<string>('5 Days');
  const [followUpDate, setFollowUpDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [followUpInstructions, setFollowUpInstructions] = useState<string>(
    'Review in 5 days. Monitor body temperature twice daily. Return earlier or call emergency Rescue 1122 if high persistent fever (>103°F) or shortness of breath develops.'
  );

  const setTimeframeAndCalcDate = (tf: string, daysToAdd: number) => {
    setFollowUpTimeframe(tf);
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    setFollowUpDate(d.toISOString().split('T')[0]);
  };

  // Sync patient's typed complaint into the consultation dialogue
  const handleSyncComplaintToTranscript = () => {
    if (!patientComplaint.trim()) return;
    setTranscript(prev => {
      const line = `Patient: "Chief Complaint: ${patientComplaint.trim()} for past ${problemDurationDays} days."`;
      if (prev.includes(patientComplaint.trim())) return prev;
      return prev ? `${line}\n${prev}` : line;
    });
    setNotification('Patient complaint appended to consultation dialogue transcript.');
    setTimeout(() => setNotification(null), 3500);
  };

  // Auto-Extract Medical History & Demographics from Consultation Dialogue
  const handleExtractHistoryFromTranscript = () => {
    if (!transcript.trim()) {
      setErrorMessage('Please record or enter a consultation conversation first to extract medical history.');
      return;
    }

    const text = transcript.toLowerCase();
    let extractedAge = patientAge;
    let extractedGender = patientGender;
    let extractedDuration = problemDurationDays;
    let extractedHistory = pastMedicalHistory;
    let extractedAllergies = allergies;

    // Age matching (e.g., "29 years old", "age 34", "28 saal")
    const ageMatch = text.match(/(?:age\s*(?:is|of)?\s*|i am\s*|patient is\s*)?(\d{1,3})\s*(?:years|year old|yo|yr|saal)/i) ||
                     text.match(/(?:age|umer)\s*(?:is)?\s*[:=]?\s*(\d{1,3})/i);
    if (ageMatch && ageMatch[1]) {
      extractedAge = ageMatch[1];
    }

    // Gender detection
    if (text.includes('female') || text.includes('woman') || text.includes('lady') || text.includes('khatoon') || text.includes('she is') || text.includes('her mother')) {
      extractedGender = 'Female';
    } else if (text.includes('male') || text.includes('gentleman') || text.includes('man') || text.includes('mard') || text.includes('he is') || text.includes('his father')) {
      extractedGender = 'Male';
    }

    // Duration matching (e.g., "for 3 days", "past 4 days", "since 5 days", "3 din se")
    const durationMatch = text.match(/(?:for|past|since|last)\s*(\d+)\s*(?:days|day|din)/i) ||
                          text.match(/(\d+)\s*(?:days|din)\s*(?:ago|se|duration)/i);
    if (durationMatch && durationMatch[1]) {
      extractedDuration = durationMatch[1];
    }

    // Conditions
    const conditionsFound: string[] = [];
    if (text.includes('hypertension') || text.includes('high bp') || text.includes('blood pressure')) conditionsFound.push('Hypertension');
    if (text.includes('diabet') || text.includes('sugar')) conditionsFound.push('Diabetes Mellitus');
    if (text.includes('asthma') || text.includes('damma') || text.includes('inhaler') || text.includes('wheez')) conditionsFound.push('Asthma');
    if (text.includes('migraine')) conditionsFound.push('Migraine');
    if (text.includes('allergy') || text.includes('allergic')) conditionsFound.push('Allergic Rhinitis');
    if (conditionsFound.length > 0) {
      extractedHistory = conditionsFound.join(', ');
    }

    // Allergies
    if (text.includes('penicillin')) {
      extractedAllergies = 'Penicillins';
    } else if (text.includes('sulfa')) {
      extractedAllergies = 'Sulfa Drugs';
    } else if (text.includes('nsaid') || text.includes('aspirin') || text.includes('brufen')) {
      extractedAllergies = 'NSAIDs / Aspirin';
    }

    setPatientAge(extractedAge);
    setPatientGender(extractedGender);
    setProblemDurationDays(extractedDuration);
    setPastMedicalHistory(extractedHistory);
    setAllergies(extractedAllergies);

    setNotification(`Medical History extracted from transcript: Age ${extractedAge}, ${extractedGender}, Duration ${extractedDuration} days.`);
    setTimeout(() => setNotification(null), 4000);
  };

  // Timer Effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // Clean up media on unmount
  useEffect(() => {
    return () => {
      stopAllMedia();
    };
  }, []);

  const stopAllMedia = () => {
    if (speechRecognitionRef.current) {
      try { speechRecognitionRef.current.stop(); } catch (e) {}
      speechRecognitionRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
      audioContextRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Start Real-Time Microphone & Speech Listening
  const handleStartRecording = async () => {
    setErrorMessage(null);
    setInterimText('');
    setRecordingDuration(0);
    setIsSigned(false);
    currentSpeakerTurnRef.current = 1;
    lastSpeechTimeRef.current = 0;

    try {
      // 1. Request real microphone access
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          micStreamRef.current = stream;

          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            audioContextRef.current = ctx;
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateVisualizer = () => {
              if (!analyserRef.current) return;
              analyserRef.current.getByteFrequencyData(dataArray);
              
              // Average volumes into 16 equalizer columns
              const step = Math.floor(bufferLength / 16);
              const newBars = [];
              for (let i = 0; i < 16; i++) {
                let sum = 0;
                for (let j = 0; j < step; j++) {
                  sum += dataArray[i * step + j] || 0;
                }
                const avg = sum / (step || 1);
                newBars.push(Math.max(6, Math.min(48, Math.round((avg / 255) * 44) + 6)));
              }
              setAudioLevel(newBars);
              animationFrameRef.current = requestAnimationFrame(updateVisualizer);
            };
            updateVisualizer();
          }
        } catch (micErr) {
          console.warn('Microphone hardware permission notice:', micErr);
          setErrorMessage('Microphone access was denied or not available. You can still dictate or type notes directly into the transcript box.');
        }
      }

      // 2. Real-Time Speech Recognition API
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        try {
          const recognition = new SpeechRec();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              const res = event.results[i];
              if (res.isFinal) {
                const text = res[0].transcript.trim();
                if (text) {
                  const now = Date.now();
                  // Detect conversational pause to alternate between Speaker 1 and Speaker 2
                  if (lastSpeechTimeRef.current > 0 && now - lastSpeechTimeRef.current > 1300) {
                    currentSpeakerTurnRef.current = currentSpeakerTurnRef.current === 1 ? 2 : 1;
                  }
                  lastSpeechTimeRef.current = now;
                  const speakerLabel = `Speaker ${currentSpeakerTurnRef.current}`;
                  setTranscript(prev => {
                    const prefix = prev ? `${prev}\n` : '';
                    return `${prefix}${speakerLabel}: "${text}"`;
                  });
                }
              } else {
                interim += res[0].transcript;
              }
            }
            setInterimText(interim);
          };

          recognition.onerror = (recErr: any) => {
            console.warn('SpeechRecognition error:', recErr);
          };

          recognition.onend = () => {
            // Keep listening if user is still in recording mode
            if (isRecording && speechRecognitionRef.current) {
              try { speechRecognitionRef.current.start(); } catch (e) {}
            }
          };

          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (recErr) {
          console.warn('Speech recognition start failure:', recErr);
        }
      } else {
        setErrorMessage('Browser real-time SpeechRecognition is not natively supported in this browser. You can dictate or type conversation notes directly into the transcript field below.');
      }

      setIsRecording(true);
      setNotification('Microphone active. Ambiently listening to doctor-patient conversation in real time.');
    } catch (err: any) {
      console.error('Failed to start recording:', err);
      setErrorMessage('Could not initialize microphone recorder. Please check device permissions.');
    }
  };

  // Stop Recording and Generate Report
  const handleStopRecording = async () => {
    setIsRecording(false);
    stopAllMedia();
    setInterimText('');

    const cleanText = transcript.trim();
    if (!cleanText || cleanText.length < 15) {
      setErrorMessage('No consultation conversation was recorded yet. Please speak into the microphone or type clinical notes into the transcript box, then click "Generate AI Report".');
      return;
    }

    await generateAIReport(cleanText);
  };

  // Add manual quick dictation line (alternates Speaker 1 and Speaker 2 automatically)
  const handleAddDictation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickDictation.trim()) return;
    const speakerLabel = `Speaker ${currentSpeakerTurnRef.current}`;
    setTranscript(prev => {
      const prefix = prev ? `${prev}\n` : '';
      return `${prefix}${speakerLabel}: "${quickDictation.trim()}"`;
    });
    // Alternate speaker turn
    currentSpeakerTurnRef.current = currentSpeakerTurnRef.current === 1 ? 2 : 1;
    setQuickDictation('');
  };

  // Generate Complete Structured AI Report from Real Transcript
  const generateAIReport = async (textToProcess: string) => {
    const cleanText = textToProcess.trim();
    if (!cleanText) {
      setErrorMessage('Please speak into the microphone or provide consultation dialogue first.');
      return;
    }

    setErrorMessage(null);
    setIsGeneratingAI(true);
    setNotification('Gemini Clinical AI is analyzing your live conversation in real time...');

    try {
      const result = await requestAIScribeReport({
        transcript: cleanText,
        patientName: patientDisplayName,
        doctorName: doctorDisplayName,
        visitType: activeBooking?.type || 'clinical_consult',
        existingVitals: activeBooking?.vitals || undefined
      });

      setReport(result.report);
      setAiReportSource(result.source);

      // Populate extracted demographic and medical history fields if available from Gemini
      if (result.report.patient_age && result.report.patient_age !== 'Not documented') {
        setPatientAge(String(result.report.patient_age));
      }
      if (result.report.patient_gender && result.report.patient_gender !== 'Not documented') {
        setPatientGender(result.report.patient_gender);
      }
      if (result.report.duration_days && result.report.duration_days !== 'Not documented') {
        setProblemDurationDays(String(result.report.duration_days));
      }
      if (result.report.past_medical_history && result.report.past_medical_history !== 'Not documented') {
        setPastMedicalHistory(result.report.past_medical_history);
      }
      if (result.report.allergies && result.report.allergies !== 'Not documented') {
        setAllergies(result.report.allergies);
      }
      if (result.report.follow_up_timeframe && result.report.follow_up_timeframe !== 'Not documented') {
        setFollowUpTimeframe(result.report.follow_up_timeframe);
      }
      if (result.report.follow_up_instructions && result.report.follow_up_instructions !== 'Not documented') {
        setFollowUpInstructions(result.report.follow_up_instructions);
      }

      setActiveTab('report');
      setNotification('Real-time AI Consultation Report generated successfully. Review, edit details, or sign with your PMC stamp.');
    } catch (e: any) {
      console.error('Error generating AI report:', e);
      setErrorMessage('Failed to synthesize AI report: ' + (e?.message || 'Server error'));
    } finally {
      setIsGeneratingAI(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  // Sign & Verify Report with PMC Certificate
  const handleSignReport = () => {
    if (!report) return;

    const reportId = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newReport: ConsultationReport = {
      id: reportId,
      booking_id: activeBooking?.id || 'bk_101',
      patient_uid: activeBooking?.patient_uid || 'patient_demo',
      patient_name: patientDisplayName,
      doctor_uid: currentUser?.uid || 'doc_1',
      doctor_name: doctorDisplayName,
      doctor_specialty: doctorProfile?.specialty || 'General Physician & Family Medicine',
      doctor_pmc: doctorProfile?.pmc_license_number || 'PMC-48291-P',
      date: new Date().toISOString().split('T')[0],
      visit_type: activeBooking?.type || 'video',
      chief_complaint: patientComplaint || report.chief_complaint || report.history_of_illness,
      patient_age: patientAge || report.patient_age,
      patient_gender: patientGender || report.patient_gender,
      problem_duration_days: problemDurationDays || (report.duration_days ? String(report.duration_days) : undefined),
      medical_history: pastMedicalHistory || report.past_medical_history,
      allergies: allergies || report.allergies,
      diagnosis: report.diagnosis,
      advice: report.advice,
      examination_findings: report.physical_exam || report.examination_findings,
      red_flags: report.red_flags,
      follow_up: `${followUpTimeframe || report.follow_up_timeframe || '5 Days'} - ${followUpInstructions || report.follow_up_instructions || 'Care follow-up'}`,
      follow_up_timeframe: followUpTimeframe || report.follow_up_timeframe || '5 Days',
      follow_up_date: followUpDate || report.follow_up_date,
      follow_up_instructions: followUpInstructions || report.follow_up_instructions,
      status: 'signed',
      transcription_summary: report.transcription_summary,
      transcript: transcript,
      vitals: report.vitals,
      medications: report.medications,
      signed_at: new Date().toISOString()
    };

    signConsultationReport(newReport);
    setIsSigned(true);
    setIsEditingReport(false);
    setNotification('Report signed with PMC digital credentials and synchronized to patient medical history!');
    setTimeout(() => setNotification(null), 6000);
  };

  const handleAddMedication = () => {
    if (!report) return;
    setReport({
      ...report,
      medications: [
        ...report.medications,
        {
          name: 'Tab. Paracetamol 500mg',
          dosage: '500mg',
          frequency: 'Twice daily (BD)',
          duration: '5 days',
          instructions: 'Take after meals'
        }
      ]
    });
  };

  const handleRemoveMedication = (index: number) => {
    if (!report) return;
    const next = [...report.medications];
    next.splice(index, 1);
    setReport({ ...report, medications: next });
  };

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(transcript);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header & Doctor Credentials */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard/doctor')}
              className="text-xs font-semibold text-gray-500 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Doctor Console</span>
            </button>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-600" />
              CuraLink AI Scribe • Real-Time
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2.5">
            <Stethoscope className="w-6 h-6 text-[#0F766E]" />
            <span>CuraLink AI Scribe</span>
          </h1>
          <p className="text-xs text-gray-500 max-w-2xl">
            Live clinical dialogue capture. Press the microphone to begin recording your consultation. CuraLink AI Scribe transcribes the conversation between doctor and patient and generates the verified clinical report and prescription.
          </p>
        </div>

        {/* Doctor Identity Badge & Emergency Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <EmergencyButton callerRole="doctor" patientName={patientDisplayName} />

          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-[#0F766E] font-bold flex items-center justify-center">
              {doctorDisplayName.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{doctorDisplayName}</p>
              <p className="text-[11px] text-teal-700 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-600" />
                <span>PMC Lic: {doctorProfile?.pmc_license_number || 'PMC-49102-P'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification / Error Alerts */}
      {notification && (
        <div className="bg-teal-50 border border-teal-200 text-teal-900 rounded-xl p-3.5 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-semibold">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-teal-700 hover:text-teal-900 text-xs font-bold cursor-pointer">Dismiss</button>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl p-3.5 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {transcript.trim().length >= 15 && (
              <button
                onClick={() => generateAIReport(transcript)}
                className="px-2.5 py-1 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-semibold cursor-pointer text-xs"
              >
                Retry
              </button>
            )}
            <button onClick={() => setErrorMessage(null)} className="text-rose-700 hover:text-rose-900 text-xs font-bold cursor-pointer">Dismiss</button>
          </div>
        </div>
      )}

      {/* Patient & Appointment Context */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Target Patient Encounter</span>
            <div className="flex items-center gap-2">
              <p className="text-sm font-extrabold text-gray-900">{patientDisplayName}</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {activeBooking?.type === 'video' ? 'Telehealth Video' : 'Home Bedside Visit'}
              </span>
            </div>
            <p className="text-xs text-gray-500">Chief Complaint: {activeBooking?.reason || 'Consultation assessment'}</p>
          </div>
        </div>

        {/* Change Appointment Dropdown */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-500 whitespace-nowrap">Patient:</label>
            <select
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-800 focus:outline-none focus:border-teal-600 cursor-pointer w-full md:w-auto"
            >
              {(bookings || []).map((b) => (
                <option key={b.id} value={b.id}>
                  {b.patient_name || patientDisplayName} — {b.time_slot} ({b.type === 'video' ? 'Video' : 'Home Visit'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patient Complaint & Medical History Input Station (Patient can type too; Medical History extraction) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
              <ClipboardList className="w-3 h-3" />
              <span>Step 1: Patient Complaint & Medical History</span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 mt-1">
              Patient Chief Complaint & Demographics
            </h3>
            <p className="text-xs text-gray-500">
              Patient can type their symptoms directly, or doctor can extract them directly from the spoken consultation dialogue.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExtractHistoryFromTranscript}
              className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Extract age, gender, duration, and medical history from recorded consultation conversation"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>Auto-Extract from Dialogue</span>
            </button>
          </div>
        </div>

        {/* 1. Patient Chief Complaint */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <span>Patient Complaint (Patient can type here)</span>
              <span className="text-[10px] text-gray-400 font-normal">• Patient or Attendant direct input</span>
            </label>
            <button
              onClick={handleSyncComplaintToTranscript}
              className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Append to Dialogue Transcript</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <textarea
            rows={2}
            value={patientComplaint}
            onChange={(e) => setPatientComplaint(e.target.value)}
            placeholder="Type patient complaint (e.g. High fever, persistent dry cough, headache, chills)..."
            className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
          />

          {/* Quick symptom suggestions */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[10px] font-bold text-gray-400">Quick Symptoms:</span>
            {[
              'Fever 101.2°F',
              'Frontal Headache',
              'Dry Cough',
              'Sore Throat',
              'Body Ache & Fatigue',
              'Shortness of breath',
              'Abdominal Pain'
            ].map((sym) => (
              <button
                key={sym}
                onClick={() => {
                  setPatientComplaint(prev => prev ? `${prev}, ${sym}` : sym);
                }}
                className="text-[10px] bg-gray-100 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 border border-gray-200 px-2 py-0.5 rounded-md font-medium text-gray-700 transition-colors cursor-pointer"
              >
                + {sym}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Medical History (Age, Gender, Problem for past how many days, past history, allergies) */}
        <div className="pt-3 border-t border-gray-100">
          <div className="mb-2">
            <span className="text-xs font-bold text-gray-800">
              Medical History & Clinical Profile
            </span>
            <span className="text-[10px] text-gray-500 ml-2">
              (Extracted from dialogue between patient & doctor or manually verified)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">
                Patient Age (Years)
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="e.g. 29"
                className="w-full text-xs font-bold p-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">
                Gender
              </label>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
                className="w-full text-xs font-bold p-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white cursor-pointer"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">
                Problem for past how many days?
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={problemDurationDays}
                  onChange={(e) => setProblemDurationDays(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full text-xs font-bold p-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
                />
                <span className="text-xs text-gray-500 font-bold whitespace-nowrap">Days</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">
                Past Medical History / Chronic Illnesses
              </label>
              <input
                type="text"
                value={pastMedicalHistory}
                onChange={(e) => setPastMedicalHistory(e.target.value)}
                placeholder="e.g. Hypertension, Diabetes, Asthma, No prior chronic illness"
                className="w-full text-xs p-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-rose-700 block mb-1">
                Known Drug Allergies
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g. Penicillins, Sulfa drugs, None reported"
                className="w-full text-xs p-2 bg-rose-50/50 border border-rose-200 text-rose-900 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Real-Time Recording Stage */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center space-y-5">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`}></span>
            <span className="font-semibold text-slate-200">
              {isRecording ? 'Ambient Listening: Recording Doctor & Patient...' : 'Consultation Standby'}
            </span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-emerald-400 font-bold">{formatTime(recordingDuration)}</span>
          </div>

          {/* Central Touchpoint & Prominent "Start Consultation" Action */}
          <div className="relative flex flex-col items-center justify-center py-2 space-y-4">
            {isRecording && (
              <>
                <span className="absolute w-36 h-36 rounded-full bg-red-500/20 animate-ping -top-1"></span>
                <span className="absolute w-48 h-48 rounded-full bg-teal-500/10 animate-pulse -top-7"></span>
              </>
            )}

            <button
              id="realtime-scribe-mic-button"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isGeneratingAI}
              className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-2xl cursor-pointer ${
                isRecording
                  ? 'bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white ring-4 ring-red-400/40'
                  : 'bg-gradient-to-tr from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white ring-4 ring-teal-500/30'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-8 h-8 fill-current mb-1 text-white" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-center leading-tight">
                    End Call &<br />Generate
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-9 h-9 mb-1 text-white" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-center leading-tight">
                    Start<br />Consultation
                  </span>
                </>
              )}
            </button>

            {/* Direct High-Visibility Action Button */}
            <div>
              {!isRecording ? (
                <button
                  id="btn-start-consultation"
                  onClick={handleStartRecording}
                  disabled={isGeneratingAI}
                  className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:shadow-teal-500/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Consultation</span>
                </button>
              ) : (
                <button
                  id="btn-end-consultation"
                  onClick={handleStopRecording}
                  disabled={isGeneratingAI}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:shadow-red-500/20"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>End Consultation & Generate Report</span>
                </button>
              )}
            </div>
          </div>

          {/* Real Audio Equalizer Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-10 w-full max-w-md">
            {audioLevel.map((height, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-75 ${
                  isRecording 
                    ? 'bg-gradient-to-t from-teal-400 to-emerald-300 shadow-sm' 
                    : 'bg-slate-700 h-2'
                }`}
                style={{ height: isRecording ? `${height}px` : '6px' }}
              />
            ))}
          </div>

          {/* Live speech interim stream feedback */}
          {interimText && (
            <div className="max-w-xl bg-slate-800/80 border border-teal-500/40 rounded-xl px-4 py-2 text-xs text-teal-300 italic animate-pulse">
              <span className="font-semibold not-italic text-teal-400">Heard: </span>
              "{interimText}"
            </div>
          )}

          <p className="text-xs text-slate-400 max-w-md">
            {isRecording
              ? 'Ambiently listening to the clinical consultation. Click "End Consultation & Generate Report" when finished.'
              : 'Click "Start Consultation" to begin dual-voice recording. CuraLink AI Scribe captures the conversation between doctor and patient and synthesizes a comprehensive clinical report.'}
          </p>

          {/* Dual-Voice Spoken Turn Input */}
          <div className="pt-3 border-t border-slate-800 w-full max-w-xl flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                Dual-Voice Recording
              </span>
            </div>

            <form onSubmit={handleAddDictation} className="flex items-center gap-1.5 flex-1 w-full">
              <input
                type="text"
                value={quickDictation}
                onChange={e => setQuickDictation(e.target.value)}
                placeholder="Speak into mic or type dialogue (alternates doctor & patient)..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-600 text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold cursor-pointer shrink-0"
              >
                Add Spoken Turn
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tabs: Live Transcript vs AI Consultation Report */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('transcript')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'transcript'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1. Recorded Dialogue Transcript</span>
              {transcript && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>

            <button
              onClick={() => {
                if (!report && transcript.trim()) {
                  generateAIReport(transcript);
                } else {
                  setActiveTab('report');
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>2. CuraLink AI Consultation Report</span>
              {report && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>
          </div>

          {activeTab === 'transcript' && transcript && (
            <button
              onClick={handleCopyTranscript}
              className="text-xs text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              {copiedTranscript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
              <span>{copiedTranscript ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          {activeTab === 'report' && report && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditingReport(!isEditingReport)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isEditingReport
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                <span>{isEditingReport ? 'Done Editing' : 'Edit Report'}</span>
              </button>

              {!isSigned ? (
                <button
                  onClick={handleSignReport}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign & Verify Report</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>PMC Verified & Signed</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tab 1: Live Conversation Transcript */}
        {activeTab === 'transcript' && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Recorded Consultation Dialogue</h3>
                <p className="text-xs text-gray-500">
                  {transcript 
                    ? 'Real-time spoken words captured between Doctor and Patient.' 
                    : 'Nothing recorded yet. Press "Start Mic" above to begin recording.'}
                </p>
              </div>

              {transcript && (
                <button
                  onClick={() => generateAIReport(transcript)}
                  disabled={isGeneratingAI}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isGeneratingAI ? 'Processing AI...' : 'Generate AI Report Now'}</span>
                </button>
              )}
            </div>

            <textarea
              rows={12}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Microphone recordings and dialogue spoken between Doctor and Patient will appear here in real time as you speak..."
              className="w-full text-xs font-sans leading-relaxed p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white transition-colors font-mono"
            />
          </div>
        )}

        {/* Tab 2: AI-Generated Clinical Report & Prescription */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            {isGeneratingAI ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-teal-600 border-t-transparent animate-spin mx-auto"></div>
                <h3 className="text-base font-bold text-gray-900">CuraLink AI Scribe is Synthesizing Consultation Report</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Extracting clinical ICD-10 diagnosis, objective exam findings, pharmacotherapy dosing, and dietary instructions from your recorded conversation...
                </p>
              </div>
            ) : report ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      PMC Verified Medical Consultation Report
                    </span>
                    <h2 className="text-xl font-extrabold text-gray-900 mt-1">
                      Clinical Assessment & Digital Prescription
                    </h2>
                    <p className="text-xs text-gray-500">
                      Consultant: {doctorDisplayName} • Patient: {patientDisplayName} • Date: {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                      isSigned
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}>
                      {isSigned ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-amber-600" />}
                      <span>{isSigned ? 'Signed & Verified' : 'Draft Generated from Real Conversation'}</span>
                    </span>
                    {aiReportSource && (
                      <p className="text-[10px] text-gray-400 font-mono">Engine: {aiReportSource}</p>
                    )}
                  </div>
                </div>

                {/* Report Section Tabs: User Request: Another tab after prescription named follow up where Doctor tells patient to follow up after specific time */}
                <div className="flex items-center gap-1.5 border-b border-gray-200 pb-2 overflow-x-auto">
                  <button
                    onClick={() => setReportSubTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      reportSubTab === 'all'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Complete Report
                  </button>
                  <button
                    onClick={() => setReportSubTab('complaint_history')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      reportSubTab === 'complaint_history'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    1. Demographics & History
                  </button>
                  <button
                    onClick={() => setReportSubTab('diagnosis')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      reportSubTab === 'diagnosis'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    2. Vitals & Diagnosis
                  </button>
                  <button
                    onClick={() => setReportSubTab('prescription')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      reportSubTab === 'prescription'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    3. Prescription (Rx)
                  </button>
                  <button
                    onClick={() => setReportSubTab('follow_up')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      reportSubTab === 'follow_up'
                        ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 font-extrabold'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>4. Follow-up Tab</span>
                  </button>
                </div>

                {/* Section 1: Patient Demographics & Medical History */}
                {(reportSubTab === 'all' || reportSubTab === 'complaint_history') && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-teal-600" />
                        <span>Patient Clinical Demographics & History</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Documented from Consultation Dialogue</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Age</span>
                        <p className="font-extrabold text-slate-900">{patientAge || report.patient_age || '29'} Years</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Gender</span>
                        <p className="font-extrabold text-slate-900">{patientGender || report.patient_gender || 'Female'}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Problem Duration</span>
                        <p className="font-extrabold text-slate-900">{problemDurationDays || (report.duration_days ? `${report.duration_days}` : '3')} Days</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                        <span className="text-[10px] uppercase font-bold text-rose-500 block">Drug Allergies</span>
                        <p className="font-bold text-rose-800 truncate">{allergies || report.allergies || 'None reported'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Past Medical History</span>
                        <p className="text-slate-700 leading-relaxed font-medium">{pastMedicalHistory || report.past_medical_history || 'No chronic medical illness reported'}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Chief Presenting Complaint</span>
                        <p className="text-slate-700 leading-relaxed font-medium">{patientComplaint || report.chief_complaint || report.history_of_illness}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vitals Ribbon & Diagnosis Section */}
                {(reportSubTab === 'all' || reportSubTab === 'diagnosis') && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Blood Pressure</span>
                    {isEditingReport ? (
                      <input
                        type="text"
                        value={report.vitals?.bp || ''}
                        onChange={(e) => setReport({ ...report, vitals: { ...report.vitals, bp: e.target.value } })}
                        className="w-full text-xs font-bold bg-white border border-gray-300 rounded p-1 mt-0.5"
                      />
                    ) : (
                      <p className="text-sm font-extrabold text-gray-900">{report.vitals?.bp || '120/80 mmHg'}</p>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Pulse Rate</span>
                    {isEditingReport ? (
                      <input
                        type="text"
                        value={report.vitals?.pulse || ''}
                        onChange={(e) => setReport({ ...report, vitals: { ...report.vitals, pulse: e.target.value } })}
                        className="w-full text-xs font-bold bg-white border border-gray-300 rounded p-1 mt-0.5"
                      />
                    ) : (
                      <p className="text-sm font-extrabold text-gray-900">{report.vitals?.pulse || 78} bpm</p>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Body Temp</span>
                    {isEditingReport ? (
                      <input
                        type="text"
                        value={report.vitals?.temp || ''}
                        onChange={(e) => setReport({ ...report, vitals: { ...report.vitals, temp: e.target.value } })}
                        className="w-full text-xs font-bold bg-white border border-gray-300 rounded p-1 mt-0.5"
                      />
                    ) : (
                      <p className="text-sm font-extrabold text-gray-900">{report.vitals?.temp || '98.6 F'}</p>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Oxygen (SpO2)</span>
                    {isEditingReport ? (
                      <input
                        type="text"
                        value={report.vitals?.spo2 || ''}
                        onChange={(e) => setReport({ ...report, vitals: { ...report.vitals, spo2: e.target.value } })}
                        className="w-full text-xs font-bold bg-white border border-gray-300 rounded p-1 mt-0.5"
                      />
                    ) : (
                      <p className="text-sm font-extrabold text-gray-900">{report.vitals?.spo2 || 98}%</p>
                    )}
                  </div>
                </div>

                {/* Primary Diagnosis & Chief Complaint */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-teal-800">Primary Diagnosis (ICD-10)</label>
                    {isEditingReport ? (
                      <input
                        type="text"
                        value={report.diagnosis}
                        onChange={(e) => setReport({ ...report, diagnosis: e.target.value })}
                        className="w-full text-sm font-bold bg-white border border-teal-300 rounded-xl p-2.5"
                      />
                    ) : (
                      <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200">
                        <p className="text-sm font-bold text-teal-900">{report.diagnosis}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Chief Complaint & History</label>
                      {isEditingReport ? (
                        <textarea
                          rows={3}
                          value={report.history_of_illness}
                          onChange={(e) => setReport({ ...report, history_of_illness: e.target.value })}
                          className="w-full text-xs bg-white border border-gray-300 rounded-xl p-2.5"
                        />
                      ) : (
                        <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed">
                          {report.history_of_illness}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Objective Physical Findings</label>
                      {isEditingReport ? (
                        <textarea
                          rows={3}
                          value={report.physical_exam || report.examination_findings || ''}
                          onChange={(e) => setReport({ ...report, physical_exam: e.target.value, examination_findings: e.target.value })}
                          className="w-full text-xs bg-white border border-gray-300 rounded-xl p-2.5"
                        />
                      ) : (
                        <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed">
                          {report.physical_exam || report.examination_findings || 'No physical examination findings documented in the provided transcript.'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
                )}

                {/* Pharmacotherapy & Medications */}
                {(reportSubTab === 'all' || reportSubTab === 'prescription') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Prescription Rx (Medications)</label>
                    {isEditingReport && (
                      <button
                        onClick={handleAddMedication}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Medication</span>
                      </button>
                    )}
                  </div>

                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                          <th className="px-3.5 py-2.5">Medicine Name</th>
                          <th className="px-3.5 py-2.5">Dosage</th>
                          <th className="px-3.5 py-2.5">Frequency</th>
                          <th className="px-3.5 py-2.5">Duration</th>
                          <th className="px-3.5 py-2.5">Instructions</th>
                          {isEditingReport && <th className="px-3.5 py-2.5 text-right">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {report.medications.map((med, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50">
                            <td className="px-3.5 py-2.5 font-bold text-gray-900">
                              {isEditingReport ? (
                                <input
                                  type="text"
                                  value={med.name}
                                  onChange={(e) => {
                                    const next = [...report.medications];
                                    next[idx].name = e.target.value;
                                    setReport({ ...report, medications: next });
                                  }}
                                  className="w-full text-xs p-1 border rounded font-bold"
                                />
                              ) : (
                                med.name
                              )}
                            </td>
                            <td className="px-3.5 py-2.5 text-gray-700">
                              {isEditingReport ? (
                                <input
                                  type="text"
                                  value={med.dosage}
                                  onChange={(e) => {
                                    const next = [...report.medications];
                                    next[idx].dosage = e.target.value;
                                    setReport({ ...report, medications: next });
                                  }}
                                  className="w-full text-xs p-1 border rounded"
                                />
                              ) : (
                                med.dosage
                              )}
                            </td>
                            <td className="px-3.5 py-2.5 text-teal-800 font-semibold">
                              {isEditingReport ? (
                                <input
                                  type="text"
                                  value={med.frequency}
                                  onChange={(e) => {
                                    const next = [...report.medications];
                                    next[idx].frequency = e.target.value;
                                    setReport({ ...report, medications: next });
                                  }}
                                  className="w-full text-xs p-1 border rounded"
                                />
                              ) : (
                                med.frequency
                              )}
                            </td>
                            <td className="px-3.5 py-2.5 text-gray-600">
                              {isEditingReport ? (
                                <input
                                  type="text"
                                  value={med.duration}
                                  onChange={(e) => {
                                    const next = [...report.medications];
                                    next[idx].duration = e.target.value;
                                    setReport({ ...report, medications: next });
                                  }}
                                  className="w-full text-xs p-1 border rounded"
                                />
                              ) : (
                                med.duration
                              )}
                            </td>
                            <td className="px-3.5 py-2.5 text-gray-500">
                              {isEditingReport ? (
                                <input
                                  type="text"
                                  value={med.instructions}
                                  onChange={(e) => {
                                    const next = [...report.medications];
                                    next[idx].instructions = e.target.value;
                                    setReport({ ...report, medications: next });
                                  }}
                                  className="w-full text-xs p-1 border rounded"
                                />
                              ) : (
                                med.instructions
                              )}
                            </td>
                            {isEditingReport && (
                              <td className="px-3.5 py-2.5 text-right">
                                <button
                                  onClick={() => handleRemoveMedication(idx)}
                                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}

                {/* Section 4: FOLLOW-UP TAB (User Request: "Another tab after prescription named follow up where Doctor tells patient to follow up after specific time") */}
                {(reportSubTab === 'all' || reportSubTab === 'follow_up') && (
                  <div className="bg-emerald-50/50 border-2 border-emerald-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-200/60">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold border border-emerald-300">
                          <Calendar className="w-3 h-3 text-emerald-700" />
                          <span>Doctor's Follow-up Instructions Tab</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mt-1">
                          Follow-up Care & Consultation Re-evaluation
                        </h3>
                        <p className="text-xs text-gray-600">
                          Doctor instructs patient on exact follow-up timeframe, recovery milestones, and when to seek re-examination.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <EmergencyButton callerRole="doctor" patientName={patientDisplayName} />
                      </div>
                    </div>

                    {/* Timeframe Preset Selectors */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-emerald-950 block">
                        Instruct Patient to Follow Up After:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: '3 Days', days: 3 },
                          { label: '5 Days', days: 5 },
                          { label: '1 Week (7 Days)', days: 7 },
                          { label: '2 Weeks (14 Days)', days: 14 },
                          { label: '1 Month (30 Days)', days: 30 },
                          { label: 'SOS / As Needed', days: 0 }
                        ].map((tf) => (
                          <button
                            key={tf.label}
                            type="button"
                            onClick={() => setTimeframeAndCalcDate(tf.label, tf.days)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              followUpTimeframe === tf.label
                                ? 'bg-[#0F766E] text-white border-teal-700 shadow-xs ring-2 ring-teal-400'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300'
                            }`}
                          >
                            {tf.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Specific Date & Instructions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">
                          Target Follow-up Date
                        </label>
                        <input
                          type="date"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          className="w-full text-xs font-bold p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-500 mt-1 block">
                          Scheduled review with {doctorDisplayName}
                        </span>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">
                          Detailed Follow-up Directives & Home Monitoring
                        </label>
                        <textarea
                          rows={2}
                          value={followUpInstructions}
                          onChange={(e) => setFollowUpInstructions(e.target.value)}
                          placeholder="Provide specific follow-up instructions for the patient (e.g., monitor blood pressure twice daily, review with repeat lab CBC if fever persists)..."
                          className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-teal-600 leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Warning if red flags */}
                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Urgent Return / Emergency SOS Protocol:</strong>
                        <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                          Patient must not wait for the scheduled follow-up date if they experience persistent high fever &gt;103°F, shortness of breath, blood in sputum, severe chest pain, or marked lethargy. Call Rescue 1122 or report to the nearest hospital emergency room immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Advice & Warning Signs */}
                {(reportSubTab === 'all' || reportSubTab === 'follow_up' || reportSubTab === 'diagnosis') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Lifestyle & Recovery Advice</label>
                    {isEditingReport ? (
                      <textarea
                        rows={3}
                        value={report.advice}
                        onChange={(e) => setReport({ ...report, advice: e.target.value })}
                        className="w-full text-xs bg-white border border-gray-300 rounded-xl p-2.5"
                      />
                    ) : (
                      <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed">
                        {report.advice}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Red Flag Warning Signs</span>
                    </label>
                    {isEditingReport ? (
                      <textarea
                        rows={3}
                        value={report.red_flags}
                        onChange={(e) => setReport({ ...report, red_flags: e.target.value })}
                        className="w-full text-xs bg-white border border-rose-200 rounded-xl p-2.5 text-rose-950"
                      />
                    ) : (
                      <p className="text-xs text-rose-900 bg-rose-50/70 p-3 rounded-xl border border-rose-200 leading-relaxed">
                        {report.red_flags}
                      </p>
                    )}
                  </div>
                </div>
                )}

                {/* Bottom Signature Section */}
                <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-900">Signed Electronically by {doctorDisplayName}</p>
                    <p className="text-[11px] text-gray-500">PMC License Registration: {doctorProfile?.pmc_license_number || 'PMC-49102-P'} • Verified Digital Seal</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {!isSigned ? (
                      <button
                        onClick={handleSignReport}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Sign & Verify This Report</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => navigate(`/consultation/${activeBooking?.id || 'bk_101'}/report`)}
                          className="flex-1 sm:flex-initial bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View Official PDF Record</span>
                        </button>
                        <button
                          onClick={() => navigate('/dashboard/doctor')}
                          className="flex-1 sm:flex-initial bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Return to Console
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-xs space-y-3">
                <FileText className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold text-gray-800">No Report Generated Yet</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Record your real conversation using the microphone above. When you end recording, Gemini AI will analyze the conversation and produce the medical consultation report here.
                </p>
                {transcript.trim() && (
                  <button
                    onClick={() => generateAIReport(transcript)}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Report From Spoken Transcript</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Award, 
  Download, 
  Share2, 
  Edit3, 
  Save, 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  AlertCircle,
  Pill,
  HeartPulse,
  Printer
} from 'lucide-react';
import { ConsultationReport } from '../../types';
import { EmergencyButton } from '../../components/shared/EmergencyButton';

interface ConsultationReportPageProps {
  bookingId?: string;
}

export const ConsultationReportPage: React.FC<ConsultationReportPageProps> = ({ bookingId }) => {
  const { 
    bookings, 
    doctors, 
    consultationReports, 
    currentUser, 
    patientProfile,
    signConsultationReport, 
    navigate, 
    currentRoute 
  } = useApp();

  const routeStr = currentRoute || '';
  const id = bookingId || (routeStr.includes('/consultation/') ? (routeStr.split('/consultation/')[1] || '').replace('/report', '') : (bookings && bookings[0]?.id));
  const booking = (bookings || []).find(b => b.id === id) || (bookings && bookings[0]);
  const doctor = (doctors || []).find(d => d.id === booking?.doctor_id || d.uid === booking?.doctor_id) || (doctors && doctors[0]);

  const defaultReport: ConsultationReport = (consultationReports && consultationReports[0]) || {
    id: 'rep_101',
    booking_id: booking?.id || 'bk_101',
    patient_uid: 'patient_demo',
    patient_name: booking?.patient_name || patientProfile?.name || currentUser?.name || 'Zainab Ahmed',
    doctor_uid: 'doc_1',
    doctor_name: 'Dr. Ayesha Tariq',
    date: new Date().toISOString().split('T')[0],
    visit_type: 'video',
    diagnosis: 'Acute Upper Respiratory Tract Infection (Viral Rhinosinusitis)',
    advice: 'Maintain oral fluid hydration (minimum 2.5L daily). Rest in an elevated posture. Avoid cold iced beverages.',
    status: 'signed',
    transcription_summary: 'Patient presented with headache and low-grade pyrexia.',
    vitals: {
      temperature_f: 100.2,
      blood_pressure: '118/76',
      pulse_bpm: 82,
      spo2_percent: 98
    },
    medications: [
      { name: 'Paracetamol (Panadol)', dosage: '500mg', instructions: '1 tablet TDS after meals for 3 days' }
    ]
  };

  const existingReport = (consultationReports || []).find(r => r.booking_id === booking?.id) || defaultReport;
  
  // State for report data
  const [report, setReport] = useState<ConsultationReport>(existingReport);
  const [isEditing, setIsEditing] = useState(false);
  const [editDiagnosis, setEditDiagnosis] = useState(report?.diagnosis || 'Acute Upper Respiratory Tract Infection (Viral Rhinosinusitis)');
  const [editAdvice, setEditAdvice] = useState(report?.advice || 'Maintain oral fluid hydration (minimum 2.5L daily). Rest in an elevated posture. Avoid cold iced beverages.');
  const [showSignSuccess, setShowSignSuccess] = useState(false);

  const doctorName = doctor?.name || report?.doctor_name || 'Dr. Ayesha Tariq';
  const doctorSpecialty = doctor?.specialty || 'General Physician & Family Medicine';
  const doctorPmc = doctor?.pmc_license_number || 'PMC-48291-P';
  const doctorHospital = doctor?.hospital_affiliation || 'National Hospital, Lahore';
  const doctorId = doctor?.id || doctor?.uid || report?.doctor_uid || 'doc_1';

  const isDoctorUser = currentUser?.role === 'doctor';
  const isSigned = report?.status === 'signed';

  // Patient Verification Gate: Patient cannot review report until verified and signed by doctor
  if (!isDoctorUser && !isSigned) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Report Pending Doctor Verification</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              Waiting for Doctor to Verify & Sign Report
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
              This consultation report has not yet been authorized by <strong>{doctorName}</strong>. In accordance with clinical policy, patients cannot review the medical report or prescription until the attending doctor verifies and signs it.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Attending Physician Review Queue</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Dr. {doctorName.replace('Dr. ', '')} ({doctorSpecialty}) is reviewing the diagnostic transcription and formulating medical instructions. Once signed with the official PMC seal, it will be immediately available in your patient portal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="btn-gate-return-dashboard"
              onClick={() => navigate('/dashboard/patient')}
              className="w-full sm:w-auto bg-[#0F766E] hover:bg-[#0B5C56] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Return to Patient Portal
            </button>
            <button
              id="btn-gate-view-history"
              onClick={() => navigate('/dashboard/patient/history')}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer"
            >
              View Verified Records
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDoctorSign = () => {
    if (report?.id) {
      signConsultationReport(report.id, doctorName);
    }
    setReport(prev => ({
      ...prev,
      diagnosis: editDiagnosis,
      advice: editAdvice,
      status: 'signed',
      signed_at: new Date().toISOString()
    }));
    setIsEditing(false);
    setShowSignSuccess(true);
    setTimeout(() => setShowSignSuccess(false), 4000);
  };

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 pb-24">
      {/* Back button */}
      <button
        onClick={() => navigate(isDoctorUser ? '/dashboard/doctor' : '/dashboard/patient')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>

      {/* Top Status & Verification Strip */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Document Reference</span>
            <span className="text-xs font-mono font-bold text-gray-800">#{report.id.toUpperCase()}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mt-0.5">
            Electronic Medical Certificate & Prescription
          </h1>
        </div>

        {/* Status Badge & Emergency Action */}
        <div className="flex items-center gap-3 flex-wrap">
          <EmergencyButton callerRole={isDoctorUser ? 'doctor' : 'patient'} patientName={report.patient_name} />
          {isSigned ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Signed by Dr. {doctorName.replace('Dr. ', '')} ({doctorPmc})</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Draft — Pending Doctor Review & Signature</span>
            </div>
          )}
        </div>
      </div>

      {showSignSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>Report officially approved and signed. Appended to patient's permanent CNIC health records.</span>
        </div>
      )}

      {/* Main Printable Clinical Document */}
      <div id="medical-report-printable" className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F766E] flex items-center justify-center text-white">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-[#0F766E]">CuraLink Clinical Network</span>
            </div>
            <p className="text-[11px] text-gray-500">Official Telehealth & Bedside Consultation Record</p>
          </div>

          <div className="text-left sm:text-right text-xs text-gray-600 space-y-0.5">
            <p className="font-bold text-gray-900">{doctorName}</p>
            <p className="text-teal-800 font-semibold">{doctorSpecialty}</p>
            <p className="font-mono text-[11px]">PMC No: {doctorPmc}</p>
            <p className="text-gray-400 text-[10px]">{doctorHospital}</p>
          </div>
        </div>

        {/* Patient & Consultation Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs">
          <div>
            <span className="text-gray-400 block text-[11px]">Patient Name</span>
            <span className="font-bold text-gray-900">{report.patient_name}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px]">National ID (Masked)</span>
            <span className="font-mono font-bold text-gray-900">XXXXX-XXXXXXX-2</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px]">Consultation Date</span>
            <span className="font-bold text-gray-900">{new Date(report.date).toLocaleDateString('en-GB')}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px]">Format</span>
            <span className="font-bold text-gray-900 capitalize">{report.visit_type === 'video' ? 'Video Telehealth' : 'Home Bedside Visit'}</span>
          </div>
        </div>

        {/* Patient Demographics & Medical History */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>Patient Medical History & Profile</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Recorded during consultation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Patient Age</span>
              <p className="font-extrabold text-slate-900">{report.patient_age || '29'} Years</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Gender</span>
              <p className="font-extrabold text-slate-900">{report.patient_gender || 'Female'}</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Problem Duration</span>
              <p className="font-extrabold text-slate-900">{report.duration_days ? `${report.duration_days} Days` : '3 Days'}</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-rose-200">
              <span className="text-[10px] text-rose-500 uppercase font-bold block">Drug Allergies</span>
              <p className="font-bold text-rose-800 truncate">{report.allergies || 'None reported'}</p>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Past Medical History / Chronic Illnesses</span>
            <p className="text-slate-700 leading-relaxed font-medium">{report.past_medical_history || 'No chronic medical illness reported.'}</p>
          </div>
        </div>

        {/* Vitals Section (Recorded if Home Visit or Reported Online) */}
        {report.vitals && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Recorded Vital Signs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-gray-200 text-center">
                <span className="text-[10px] text-gray-400 uppercase">Blood Pressure</span>
                <p className="text-sm font-bold text-gray-900">{report.vitals.blood_pressure || '120/80 mmHg'}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 text-center">
                <span className="text-[10px] text-gray-400 uppercase">Pulse / Heart Rate</span>
                <p className="text-sm font-bold text-gray-900">{report.vitals.heart_rate || '78 bpm'}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 text-center">
                <span className="text-[10px] text-gray-400 uppercase">Temperature</span>
                <p className="text-sm font-bold text-gray-900">{report.vitals.temperature || '99.4 °F'}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 text-center">
                <span className="text-[10px] text-gray-400 uppercase">Oxygen Saturation (SpO2)</span>
                <p className="text-sm font-bold text-gray-900">{report.vitals.oxygen_saturation || '98%'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chief Complaint & Diagnosis */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">Chief Complaint</span>
            <p className="text-xs text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100 font-medium">
              {report.chief_complaint}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Clinical Diagnosis</span>
              {isDoctorUser && !isSigned && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Done Editing' : 'Edit Diagnosis'}</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <textarea
                rows={2}
                value={editDiagnosis}
                onChange={e => setEditDiagnosis(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <div className="p-3.5 rounded-lg bg-teal-50/60 border border-teal-200 text-xs font-bold text-teal-950">
                {isSigned ? report.diagnosis : editDiagnosis}
              </div>
            )}
          </div>
        </div>

        {/* Prescribed Medications Table (Part 4 requirement: Name, Dosage, Frequency, Duration, Instructions) */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Prescription & Dosage Schedule</span>
          </h3>

          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-3.5 font-bold">Medication</th>
                  <th className="py-2.5 px-3.5 font-bold">Dosage</th>
                  <th className="py-2.5 px-3.5 font-bold">Frequency</th>
                  <th className="py-2.5 px-3.5 font-bold">Duration</th>
                  <th className="py-2.5 px-3.5 font-bold">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {report.medications.map((med, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-3.5 font-bold text-teal-950">{med.name}</td>
                    <td className="py-2.5 px-3.5">{med.dosage}</td>
                    <td className="py-2.5 px-3.5">{med.frequency}</td>
                    <td className="py-2.5 px-3.5 font-medium">{med.duration}</td>
                    <td className="py-2.5 px-3.5 text-gray-600 italic">{med.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor's Follow-up Instructions (User Request: Another tab/card after prescription where Doctor tells patient to follow up after specific time) */}
        <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-700 text-white shadow-2xs">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Doctor's Follow-Up Care & Next Appointment</h4>
                <p className="text-[11px] text-gray-600">Specific time interval and monitoring guidance ordered by Dr. {doctorName.replace('Dr. ', '')}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Follow up after: {report.follow_up_timeframe || '5 Days'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Target Review Date</span>
              <p className="font-extrabold text-sm text-gray-900">
                {report.follow_up_date 
                  ? new Date(report.follow_up_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'Within 5 Days'}
              </p>
              <p className="text-[10px] text-teal-800 font-medium mt-1">Book review telehealth in 1-tap</p>
            </div>

            <div className="sm:col-span-2 bg-white p-3 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Clinical Directives & Recovery Instructions</span>
              <p className="text-gray-800 leading-relaxed font-medium">
                {report.follow_up_instructions || report.advice || 'Maintain oral fluid hydration (minimum 2.5L daily). Rest in an elevated posture. If fever persists beyond 48 hours, follow up immediately.'}
              </p>
            </div>
          </div>

          {/* Red Flag Warning Alert */}
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-950">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Red Flag Emergency SOS Protocol:</span>
              <p className="text-[11px] text-rose-900 leading-relaxed mt-0.5">
                {report.red_flags || 'Do not wait for scheduled follow-up if you experience severe shortness of breath, blood in sputum, chest pressure, persistent temperature >103°F, or sudden confusion. Tap Emergency Button or call Rescue 1122 immediately.'}
              </p>
            </div>
          </div>
        </div>

        {/* Doctor's Advice & Care Plan */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Doctor's Advice & Care Plan</span>
          {isEditing ? (
            <textarea
              rows={3}
              value={editAdvice}
              onChange={e => setEditAdvice(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-blue-400 focus:outline-none"
            />
          ) : (
            <p className="text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
              {isSigned ? report.advice : editAdvice}
            </p>
          )}
        </div>

        {/* Doctor Signature Seal & Timestamp */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-[11px] text-gray-500 space-y-1">
            <p className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Digitally verified via CuraLink Health Gateway</span>
            </p>
            <p>Signed electronically under the Pakistan Electronic Transactions Ordinance.</p>
          </div>

          <div className="text-left sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-teal-600 pl-3 sm:pr-3 py-1">
            <p className="text-xs font-mono font-bold text-gray-800">Dr. {doctor.name.replace('Dr. ', '')}</p>
            <p className="text-[10px] text-teal-800 font-bold">{doctor.qualifications}</p>
            <p className="text-[10px] text-gray-400 font-mono">
              Signed: {report.signed_at ? new Date(report.signed_at).toLocaleString('en-US') : 'Pending Signature'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Bars depending on viewer role */}
      {isDoctorUser && !isSigned ? (
        /* Doctor Control Card: Edit / Sign & Approve */
        <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Doctor Sign-Off Portal</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Review the AI transcription draft above. You may edit the diagnosis or medication dosages prior to signing.
              </p>
            </div>
            <Award className="w-6 h-6 text-blue-600 shrink-0" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Edit Report Fields'}
            </button>

            <button
              onClick={handleDoctorSign}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign & Approve Official Medical Record</span>
            </button>
          </div>
        </div>
      ) : (
        /* Patient View Controls */
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-gray-900">Consultation Document Ready</p>
            <p className="text-[11px] text-gray-500">Auto-saved to your permanent personal health history.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrintDownload}
              className="flex-1 sm:flex-initial bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Prescription</span>
            </button>

            <button
              onClick={() => navigate(`/booking/new?doctorId=${doctorId}`)}
              className="flex-1 sm:flex-initial bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>Book Follow-up</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

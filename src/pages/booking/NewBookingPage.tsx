import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Video, 
  Car, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  Sparkles,
  AlertCircle,
  Stethoscope,
  Activity,
  Droplet,
  Thermometer,
  Bandage,
  Wind,
  UserCheck,
  Check,
  ChevronDown,
  ChevronUp,
  PackageCheck
} from 'lucide-react';
import { Booking, NurseParamedicProfile } from '../../types';

export interface SymptomConditionOption {
  id: string;
  label: string;
  category: string;
  description: string;
  procedures: string[];
  equipmentSummary: string;
  rationale: string;
  keywords: string[];
}

export const HOME_CARE_SYMPTOM_OPTIONS: SymptomConditionOption[] = [
  {
    id: 'dehydration_weakness',
    label: 'Acute Dehydration, Emesis & Fluid Loss',
    category: 'Intravenous Therapy',
    description: 'Inability to retain oral fluids, severe gastrointestinal fluid loss, dengue recovery, or postural dizziness.',
    procedures: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)',
      'IV Cannulation & Saline / Electrolyte Drip'
    ],
    equipmentSummary: 'Sterile IV Cannula (20G/22G), Ringer Lactate/Normal Saline IV solution, infusion set, tourniquet, vitals diagnostic kit',
    rationale: 'Intravenous fluid replacement rapidly restores circulatory volume and addresses critical electrolyte deficits.',
    keywords: ['dehydrat', 'vomit', 'diarrhea', 'weak', 'drip', 'saline', 'dengue', 'food poisoning', 'nausea', 'fluid']
  },
  {
    id: 'fever_injection',
    label: 'Pyrexia, Acute Pain & Prescribed Injections',
    category: 'Injections & Analgesia',
    description: 'Elevated temperature (>101°F), severe acute headache/backache, or clinician-prescribed injectable medications.',
    procedures: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)',
      'IM / Subcutaneous Injections (Insulin, Antibiotics)'
    ],
    equipmentSummary: 'Single-use sterile syringes (2ml/5ml), hypodermic needles, antiseptic alcohol prep pads, calibrated digital thermometer',
    rationale: 'Aseptic intramuscular or subcutaneous drug administration with pre- and post-dose vital signs surveillance.',
    keywords: ['fever', 'inject', 'shot', 'pain', 'headache', 'body ache', 'insulin', 'antibiotic', 'temperature']
  },
  {
    id: 'wound_stitches',
    label: 'Surgical Wound, Suture Management & Burns',
    category: 'Aseptic Dressing',
    description: 'Post-operative dressing renewal, suture/staple extraction, diabetic ulcer management, or traumatic wound care.',
    procedures: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)',
      'Aseptic Surgical Wound Dressing & Suture Care'
    ],
    equipmentSummary: 'Sterile gauze packs, Povidone-Iodine solution, surgical microfoam tape, sterile suture forceps and stitch cutters',
    rationale: 'Aseptic debridement and sterile protective dressing prevent secondary bacterial invasion and accelerate tissue repair.',
    keywords: ['wound', 'cut', 'stitch', 'suture', 'burn', 'ulcer', 'dressing', 'injury', 'bleed', 'sore']
  },
  {
    id: 'cough_asthma',
    label: 'Bronchospasm, Acute Asthma & Dyspnea',
    category: 'Respiratory Therapy',
    description: 'Expiratory wheezing, acute bronchial constriction, chronic COPD exacerbation, or heavy pulmonary congestion.',
    procedures: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)',
      'Nebulization Therapy for Respiratory Relief'
    ],
    equipmentSummary: 'Heavy-duty compressor nebulizer, adult/pediatric aerosol mask assembly, sterile saline respules, pulse oximeter',
    rationale: 'Direct aerosolized bronchodilator delivery reverses acute bronchoconstriction and optimizes peripheral oxygenation.',
    keywords: ['asthma', 'cough', 'wheez', 'breath', 'chest', 'nebuliz', 'respirat', 'congestion', 'phlegm', 'inhal']
  },
  {
    id: 'elderly_catheter',
    label: 'Bedridden Patient & Catheterization Care',
    category: 'Urological / Long-term Care',
    description: 'Homebound or bedridden patient requiring urinary Foley catheter replacement, irrigation, or decubitus ulcer staging.',
    procedures: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)',
      'Urinary Catheter Care & Foley Flush'
    ],
    equipmentSummary: 'Sterile silicone Foley catheters (14Fr/16Fr), closed drainage urine bag with anti-reflux valve, lubricating jelly',
    rationale: 'Strict sterile catheterization prevents painful urinary retention and catastrophic catheter-associated urinary tract infections.',
    keywords: ['catheter', 'foley', 'urine', 'bedridden', 'elderly', 'paralysis', 'bed sore', 'bladder']
  },
  {
    id: 'routine_monitoring',
    label: 'Cardiometabolic Screening & Vitals Surveillance',
    category: 'Diagnostic Health Check',
    description: 'Comprehensive baseline evaluation: systemic hypertension check, capillary blood glucose analysis, and oxygen saturation.',
    procedures: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)'
    ],
    equipmentSummary: 'Certified digital sphygmomanometer, clinical glucometer with fresh test strips and lancets, infrared thermometer',
    rationale: 'Systematic quantitative assessment of cardiovascular, respiratory, and glycemic markers at the patient residence.',
    keywords: ['bp', 'sugar', 'diabetes', 'glucose', 'hypertension', 'pressure', 'checkup', 'vitals']
  },
  {
    id: 'general_doctor_check',
    label: 'Comprehensive Physical Examination & Consultation',
    category: 'General Clinical Exam',
    description: 'Systemic clinical evaluation by an experienced practitioner for undifferentiated symptoms or multi-system complaints.',
    procedures: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)'
    ],
    equipmentSummary: 'Primary care diagnostic diagnostics: acoustic stethoscope, sphygmomanometer, diagnostic penlight, clinical thermometer',
    rationale: 'Holistic clinical evaluation and physical triage to formulate a structured differential diagnosis and treatment regimen.',
    keywords: ['general', 'doctor', 'exam', 'check', 'assessment', 'other']
  }
];

export const NewBookingPage: React.FC = () => {
  const { 
    doctors, 
    nursesParamedics,
    currentUser, 
    patientProfile, 
    lastSymptomResult, 
    createBooking, 
    navigate, 
    currentRoute,
    searchParams
  } = useApp();

  // Parse URL query params
  const routeStr = currentRoute || '';
  const urlParams = new URLSearchParams(window.location.search || (routeStr.includes('?') ? routeStr.split('?')[1] : ''));
  const doctorIdParam = searchParams?.doctorId || urlParams.get('doctorId');
  const staffIdParam = searchParams?.staffId || urlParams.get('staffId');
  const typeParam = (searchParams?.type || urlParams.get('type')) as 'video' | 'home_visit' | null;

  const defaultDoc = (doctors || []).find(d => d.id === doctorIdParam || d.uid === doctorIdParam) || (doctors && doctors[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(defaultDoc);

  const defaultStaff = (nursesParamedics || []).find(s => s.id === staffIdParam) || (nursesParamedics && nursesParamedics[0]);
  const [selectedStaff, setSelectedStaff] = useState<NurseParamedicProfile | undefined>(defaultStaff);

  const [step, setStep] = useState<number>(1);

  // Form State
  const initialVisitType = (staffIdParam || typeParam === 'home_visit') ? 'home_visit' : (typeParam || 'video');
  const [visitType, setVisitType] = useState<'video' | 'home_visit'>(initialVisitType);
  const [homeCareProviderType, setHomeCareProviderType] = useState<'nurse_paramedic' | 'doctor'>(
    staffIdParam ? 'nurse_paramedic' : (defaultDoc?.offers_home_visit ? 'doctor' : 'nurse_paramedic')
  );

  // Auto-detect matching symptom from lastSymptomResult or query parameters
  const detectInitialSymptomId = (): string => {
    const symParam = searchParams?.symptom || urlParams.get('symptom');
    const procParam = searchParams?.procedure || urlParams.get('procedure');

    if (procParam) {
      const p = procParam.toLowerCase();
      if (p.includes('iv') || p.includes('drip')) return 'dehydration_weakness';
      if (p.includes('inject')) return 'fever_injection';
      if (p.includes('wound') || p.includes('suture')) return 'wound_stitches';
      if (p.includes('nebul')) return 'cough_asthma';
      if (p.includes('catheter')) return 'elderly_catheter';
      if (p.includes('vital')) return 'routine_monitoring';
    }

    if (symParam) {
      const match = HOME_CARE_SYMPTOM_OPTIONS.find(o => 
        o.id === symParam || o.keywords.some(k => symParam.toLowerCase().includes(k))
      );
      if (match) return match.id;
    }

    if (lastSymptomResult) {
      const textToScan = `${lastSymptomResult.primary_symptom || ''} ${lastSymptomResult.possible_conditions?.join(' ') || ''} ${lastSymptomResult.urgency || ''} ${lastSymptomResult.next_steps?.join(' ') || ''}`.toLowerCase();
      
      for (const opt of HOME_CARE_SYMPTOM_OPTIONS) {
        if (opt.keywords.some(k => textToScan.includes(k))) {
          return opt.id;
        }
      }
    }

    return 'dehydration_weakness';
  };

  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(detectInitialSymptomId);
  const [showAdvancedProcedures, setShowAdvancedProcedures] = useState<boolean>(false);

  const initialMatchedOption = HOME_CARE_SYMPTOM_OPTIONS.find(o => o.id === selectedSymptomId) || HOME_CARE_SYMPTOM_OPTIONS[0];

  const [selectedProcedures, setSelectedProcedures] = useState<string[]>(
    initialMatchedOption.procedures
  );

  // Reactively synchronize selected doctor if doctorId param changes
  useEffect(() => {
    const docId = searchParams?.doctorId || new URLSearchParams(window.location.search).get('doctorId');
    if (docId && doctors && doctors.length > 0) {
      const match = doctors.find(d => d.id === docId || d.uid === docId);
      if (match) {
        setSelectedDoctor(match);
      }
    }
  }, [searchParams, doctors]);

  // Reactively synchronize selected staff if staffId param changes
  useEffect(() => {
    const sId = searchParams?.staffId || new URLSearchParams(window.location.search).get('staffId');
    if (sId && nursesParamedics && nursesParamedics.length > 0) {
      const match = nursesParamedics.find(s => s.id === sId);
      if (match) {
        setSelectedStaff(match);
        setVisitType('home_visit');
        setHomeCareProviderType('nurse_paramedic');
      }
    }
  }, [searchParams, nursesParamedics]);

  // Reactively synchronize visit type if type param changes
  useEffect(() => {
    const t = (searchParams?.type || new URLSearchParams(window.location.search).get('type')) as 'video' | 'home_visit' | null;
    if (t === 'video' || t === 'home_visit') {
      setVisitType(t);
    }
  }, [searchParams]);

  // Automatically synchronize selectedProcedures and default reason when selectedSymptomId changes
  useEffect(() => {
    const matched = HOME_CARE_SYMPTOM_OPTIONS.find(o => o.id === selectedSymptomId);
    if (matched) {
      setSelectedProcedures(matched.procedures);
      if (visitType === 'home_visit') {
        setReason(`Home bedside visit for: ${matched.label} (${matched.description}). Kit automatically prepared.`);
      }
    }
  }, [selectedSymptomId, visitType]);

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('04:30 PM');

  // Address for home visit
  const [streetAddress, setStreetAddress] = useState('House 14-B, Sector F');
  const [area, setArea] = useState('DHA Phase 5');
  const [city, setCity] = useState(selectedDoctor?.city || selectedStaff?.city || 'Lahore');
  const [landmarks, setLandmarks] = useState('Near Lalik Jan Chowk, Sector F mosque');

  // Reason for visit (pre-filled from symptom check if available!)
  const [reason, setReason] = useState(() => {
    if (lastSymptomResult) {
      return `Consultation for ${lastSymptomResult.primary_symptom} (${lastSymptomResult.duration}). Severity: ${lastSymptomResult.severity}/10.`;
    }
    return `Home bedside visit for: ${initialMatchedOption.label} (${initialMatchedOption.description}). Kit automatically prepared.`;
  });
  const [fileAttached, setFileAttached] = useState(false);

  // Payment State
  const effectivePatientName = patientProfile?.name || currentUser?.name || 'Zainab Ahmed';
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'card'>('jazzcash');
  const [walletPhone, setWalletPhone] = useState('0300-1234567');
  const [cardHolder, setCardHolder] = useState(effectivePatientName);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('829');

  useEffect(() => {
    if (effectivePatientName) {
      setCardHolder(effectivePatientName);
    }
  }, [effectivePatientName]);

  // Payment processing & PIN modal state
  const [processing, setProcessing] = useState(false);
  const [showWalletPinModal, setShowWalletPinModal] = useState(false);
  const [walletPin, setWalletPin] = useState('');

  const consultationFee = useMemo(() => {
    if (visitType === 'video') {
      return selectedDoctor?.video_fee || 1500;
    }
    if (homeCareProviderType === 'doctor') {
      return selectedDoctor?.home_visit_fee || 2500;
    }
    return selectedStaff?.home_visit_fee || 1200;
  }, [visitType, homeCareProviderType, selectedDoctor, selectedStaff]);

  const platformFee = 150;
  const totalAmount = consultationFee + platformFee;

  const currentSymptomConfig = useMemo(() => {
    return HOME_CARE_SYMPTOM_OPTIONS.find(o => o.id === selectedSymptomId) || HOME_CARE_SYMPTOM_OPTIONS[0];
  }, [selectedSymptomId]);

  const handleNextFromStep1 = () => {
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    if (visitType === 'home_visit') {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const handleNextFromStep3 = () => {
    setStep(4);
  };

  const handleNextFromStep4 = () => {
    setStep(5);
  };

  const handleInitiatePayment = () => {
    if (paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') {
      setShowWalletPinModal(true);
    } else {
      executeBookingConfirmation();
    }
  };

  const executeBookingConfirmation = () => {
    setProcessing(true);
    setShowWalletPinModal(false);

    setTimeout(() => {
      setProcessing(false);
      const newBookingId = 'bk_' + Date.now();

      const isNurseParamedic = visitType === 'home_visit' && homeCareProviderType === 'nurse_paramedic';

      const newBooking: Booking = {
        id: newBookingId,
        patient_id: currentUser?.id || 'patient_demo',
        patient_uid: currentUser?.uid || 'patient_demo',
        patient_name: effectivePatientName,
        doctor_id: isNurseParamedic ? (selectedDoctor?.id || 'doc_1') : (selectedDoctor?.id || selectedDoctor?.uid || 'doc_1'),
        provider_type: visitType === 'video' ? 'doctor' : (homeCareProviderType === 'doctor' ? 'doctor' : (selectedStaff?.role || 'nurse')),
        staff_id: isNurseParamedic ? selectedStaff?.id : undefined,
        staff_name: isNurseParamedic ? selectedStaff?.name : undefined,
        staff_role: isNurseParamedic ? selectedStaff?.role : undefined,
        staff_title: isNurseParamedic ? selectedStaff?.title : undefined,
        staff_photo: isNurseParamedic ? selectedStaff?.photo_url : undefined,
        services_requested: (visitType === 'home_visit') ? selectedProcedures : undefined,
        type: visitType,
        status: 'confirmed',
        date: selectedDate,
        time_slot: selectedSlot,
        address: visitType === 'home_visit' ? {
          street: streetAddress,
          area,
          city,
          landmarks
        } : undefined,
        reason,
        payment_method: paymentMethod,
        payment_status: 'paid',
        fee: totalAmount,
        symptom_check_id: lastSymptomResult?.id,
        created_at: new Date().toISOString()
      };

      createBooking(newBooking);
      navigate(`/booking/${newBookingId}/confirmation`);
    }, 1200);
  };

  const isNurseCareActive = visitType === 'home_visit' && homeCareProviderType === 'nurse_paramedic';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 pb-20">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(isNurseCareActive ? '/home-care' : '/doctors')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isNurseCareActive ? 'Back to Home Care Directory' : 'Change Doctor Selection'}</span>
        </button>

        <button
          onClick={() => navigate('/home-care')}
          className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
        >
          Browse All Nurses & Paramedics
        </button>
      </div>

      {/* Booking Header with Doctor or Nurse Mini-card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {isNurseCareActive && selectedStaff ? (
          <div className="flex items-center space-x-3.5">
            <img
              src={selectedStaff.photo_url}
              alt={selectedStaff.name}
              className="w-14 h-14 rounded-xl object-cover border border-gray-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-bold text-gray-900">{selectedStaff.name}</h2>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  selectedStaff.role === 'nurse' 
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200' 
                    : 'text-blue-800 bg-blue-50 border-blue-200'
                }`}>
                  {selectedStaff.role === 'nurse' ? 'PNC-RN' : 'RESCUE 1122'}
                </span>
              </div>
              <p className="text-xs text-teal-800 font-medium">{selectedStaff.title}</p>
              <p className="text-[11px] text-gray-500">{selectedStaff.license_number} • {selectedStaff.city} • {selectedStaff.rating} ★ ({selectedStaff.reviews_count} reviews)</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3.5">
            <img
              src={selectedDoctor?.photo_url}
              alt={selectedDoctor?.name}
              className="w-14 h-14 rounded-xl object-cover border border-gray-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-bold text-gray-900">{selectedDoctor?.name}</h2>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">PMC</span>
              </div>
              <p className="text-xs text-teal-800 font-medium">{selectedDoctor?.specialty}</p>
              <p className="text-[11px] text-gray-500">{selectedDoctor?.hospital_affiliation} • {selectedDoctor?.city}</p>
            </div>
          </div>
        )}

        {/* Change clinician picker dropdown */}
        <div className="w-full sm:w-auto">
          {isNurseCareActive ? (
            <select
              value={selectedStaff?.id || ''}
              onChange={e => {
                const s = (nursesParamedics || []).find(staff => staff.id === e.target.value);
                if (s) setSelectedStaff(s);
              }}
              className="w-full sm:w-auto text-xs px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 bg-white font-medium"
            >
              {(nursesParamedics || []).map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role === 'nurse' ? 'Nurse' : 'Paramedic'} - Rs. {s.home_visit_fee})
                </option>
              ))}
            </select>
          ) : (
            <select
              value={selectedDoctor?.id || selectedDoctor?.uid || ''}
              onChange={e => {
                const d = (doctors || []).find(doc => doc.id === e.target.value || doc.uid === e.target.value);
                if (d) setSelectedDoctor(d);
              }}
              className="w-full sm:w-auto text-xs px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 bg-white font-medium"
            >
              {(doctors || []).map(d => (
                <option key={d.id || d.uid} value={d.id || d.uid}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Booking Step Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-gray-500">
          <span className="text-[#0F766E]">Step {step} of 5</span>
          <span>
            {step === 1 ? 'Select Consultation Type' :
             step === 2 ? 'Date & Time Slot' :
             step === 3 ? 'Home Address' :
             step === 4 ? 'Clinical Reason & Attachments' : 'Review & Payment'}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#0F766E] h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* STEP 1: Select Visit Type */}
      {step === 1 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Choose Care Format</h3>
            <p className="text-xs text-gray-500 mt-1">
              Select HD Video Consultation with a specialist doctor or dispatch certified Nurses & Paramedics for home bedside care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Video Option */}
            <button
              type="button"
              onClick={() => setVisitType('video')}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                visitType === 'video'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Doctor Video Telehealth</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    HD telehealth call with Dr. {selectedDoctor?.name.replace('Dr. ', '')}. AI note-taking transcription and instant doctor-signed PMC prescription.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-800">Doctor Telehealth Fee</span>
                <span className="font-extrabold text-base text-gray-900">Rs. {selectedDoctor?.video_fee.toLocaleString()}</span>
              </div>
            </button>

            {/* Home Visit Option: Nurses & Paramedics */}
            <button
              type="button"
              onClick={() => setVisitType('home_visit')}
              className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                visitType === 'home_visit'
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-gray-900">Home Visit (Nurse / Paramedic)</h4>
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Economical</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Certified PNC Nurse or Rescue 1122 Paramedic arrives at your doorstep with clinical vitals kit, IV fluids, sterile wound dressings, and injections.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800">Bedside Care Fee</span>
                <span className="font-extrabold text-base text-gray-900">Rs. {consultationFee.toLocaleString()}</span>
              </div>
            </button>
          </div>

          {/* If Home Visit is selected, show provider type and bedside procedure options */}
          {visitType === 'home_visit' && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 space-y-4 animate-in fade-in-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">Select Doorstep Clinician Type</h4>
                  <p className="text-[11px] text-gray-500">Choose between specialized bedside nursing staff or a visiting doctor</p>
                </div>

                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setHomeCareProviderType('nurse_paramedic')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      homeCareProviderType === 'nurse_paramedic'
                        ? 'bg-[#0F766E] text-white shadow-2xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Nurse / Paramedic (PNC)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHomeCareProviderType('doctor')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      homeCareProviderType === 'doctor'
                        ? 'bg-[#0F766E] text-white shadow-2xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Visiting Doctor
                  </button>
                </div>
              </div>

              {homeCareProviderType === 'nurse_paramedic' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800">Assigned Bedside Clinician:</span>
                    <button
                      type="button"
                      onClick={() => navigate('/home-care')}
                      className="text-xs text-[#0F766E] font-bold hover:underline cursor-pointer"
                    >
                      View All Available Staff →
                    </button>
                  </div>

                  {selectedStaff && (
                    <div className="bg-white rounded-xl border border-teal-200 p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedStaff.photo_url}
                          alt={selectedStaff.name}
                          className="w-11 h-11 rounded-lg object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-gray-900">{selectedStaff.name}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                              selectedStaff.role === 'nurse'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-blue-50 text-blue-800 border-blue-200'
                            }`}>
                              {selectedStaff.role === 'nurse' ? 'PNC-RN' : 'RESCUE 1122'}
                            </span>
                          </div>
                          <p className="text-[11px] text-teal-800 font-medium">{selectedStaff.title}</p>
                          <p className="text-[10px] text-gray-500">{selectedStaff.city} • {selectedStaff.experience_years} yrs exp • {selectedStaff.rating} ★</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-900">Rs. {selectedStaff.home_visit_fee}</span>
                        <p className="text-[10px] text-emerald-600 font-semibold">Standard Care Fee</p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{selectedDoctor?.name}</p>
                      <p className="text-[11px] text-gray-500">{selectedDoctor?.specialty} • {selectedDoctor?.city}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-900">Rs. {selectedDoctor?.home_visit_fee || 2500}</span>
                  </div>
                  {!selectedDoctor?.offers_home_visit && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                      Note: Dr. {selectedDoctor?.name} currently prefers video telehealth. We recommend switching to a certified Nurse/Paramedic above for instant doorstep visit, or choose another doctor.
                    </p>
                  )}
                </div>
              )}

              {/* AUTOMATIC PROCEDURE SELECTION ACCORDING TO SYMPTOMS */}
              <div className="space-y-4 pt-2 border-t border-gray-200">
                {/* Clinical Triage Explainer */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-teal-700 text-white flex items-center justify-center">
                        <PackageCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        Automated Clinical Protocol & Kit Configuration
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
                      Standardized Care
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Select the patient's primary clinical presentation below. The clinical system automatically prepares the visiting clinician with required sterile equipment, diagnostic tools, and bedside treatment protocols.
                  </p>
                  {lastSymptomResult && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-900 bg-white px-2.5 py-1 rounded-md border border-teal-200 mt-1">
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>Identified from Assessment: <strong>{lastSymptomResult.primary_symptom}</strong></span>
                    </div>
                  )}
                </div>

                {/* Professional Clinical Indication Cards */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-800">
                    Select Clinical Presentation / Symptoms:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {HOME_CARE_SYMPTOM_OPTIONS.map(opt => {
                      const isSelected = selectedSymptomId === opt.id;
                      return (
                        <div
                          key={opt.id}
                          id={`symptom-option-${opt.id}`}
                          onClick={() => setSelectedSymptomId(opt.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-teal-50/70 border-teal-600 shadow-2xs ring-1 ring-teal-500/30'
                              : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/70'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block mb-0.5">
                                  {opt.category}
                                </span>
                                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                  {opt.id === 'dehydration_weakness' && <Droplet className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                                  {opt.id === 'fever_injection' && <Thermometer className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                                  {opt.id === 'wound_stitches' && <Bandage className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                                  {opt.id === 'cough_asthma' && <Wind className="w-3.5 h-3.5 text-cyan-600 shrink-0" />}
                                  {opt.id === 'elderly_catheter' && <UserCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                                  {opt.id === 'routine_monitoring' && <Activity className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                                  {opt.id === 'general_doctor_check' && <Stethoscope className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                                  <span>{opt.label}</span>
                                </h4>
                              </div>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'bg-teal-700 text-white' : 'border border-gray-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <p className="text-[11px] text-gray-600 leading-relaxed">{opt.description}</p>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                            <span className="text-teal-800 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                              <span>{opt.procedures.length} {opt.procedures.length === 1 ? 'procedure' : 'procedures'} configured</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Prepared Kit Highlight Box */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal-700" />
                      <span>Configured Medical Kit: {currentSymptomConfig.label}</span>
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                      Ready for Dispatch
                    </span>
                  </div>

                  {/* Auto-selected procedures pills */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1.5 tracking-wider">
                      Assigned Bedside Procedures:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProcedures.map((p, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-slate-50 text-slate-800 border border-slate-200 px-2.5 py-1 rounded-md"
                        >
                          <CheckCircle2 className="w-3 h-3 text-teal-600" />
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Equipment summary without emojis */}
                  <div className="bg-slate-50/90 rounded-xl border border-slate-200 p-3.5 space-y-2.5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                        <PackageCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-gray-900 block">
                          Clinician Medical Supplies & Equipment:
                        </span>
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          {currentSymptomConfig.equipmentSummary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/80">
                      <div className="w-5 h-5 rounded bg-slate-200/70 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Stethoscope className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-gray-900 block">
                          Clinical Indication:
                        </span>
                        <p className="text-[11px] text-gray-600 leading-relaxed">
                          {currentSymptomConfig.rationale}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Optional: Advanced view toggle */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedProcedures(!showAdvancedProcedures)}
                      className="text-xs text-gray-500 hover:text-gray-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Customize Bedside Procedures Checklist</span>
                      {showAdvancedProcedures ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {showAdvancedProcedures && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2 text-xs animate-in fade-in-50">
                        <p className="text-[11px] text-gray-500">
                          Pre-configured according to the chosen clinical presentation. Adjust individual items if required:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {[
                            'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)',
                            'IV Cannulation & Saline / Electrolyte Drip',
                            'IM / Subcutaneous Injections (Insulin, Antibiotics)',
                            'Aseptic Surgical Wound Dressing & Suture Care',
                            'Nebulization Therapy for Respiratory Relief',
                            'Urinary Catheter Care & Foley Flush'
                          ].map((proc, idx) => {
                            const isChecked = selectedProcedures.includes(proc);
                            return (
                              <label
                                key={idx}
                                className={`flex items-start gap-2 p-2.5 rounded-lg border text-[11px] cursor-pointer transition-colors ${
                                  isChecked
                                    ? 'bg-teal-50 border-teal-300 text-teal-950 font-medium'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setSelectedProcedures(selectedProcedures.filter(p => p !== proc));
                                    } else {
                                      setSelectedProcedures([...selectedProcedures, proc]);
                                    }
                                  }}
                                  className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                                />
                                <span>{proc}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleNextFromStep1}
            className="w-full bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold py-3 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Date & Time Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Select Date & Time Slot */}
      {step === 2 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Select Date & Time</h3>
            <p className="text-xs text-gray-500 mt-1">
              Choose your preferred appointment schedule with Dr. {selectedDoctor.name.replace('Dr. ', '')}.
            </p>
          </div>

          {/* Next 7 Days Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">Available Days</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[0, 1, 2, 3, 4, 5].map(offset => {
                const dateObj = new Date();
                dateObj.setDate(dateObj.getDate() + offset);
                const iso = dateObj.toISOString().split('T')[0];
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = dateObj.getDate();
                const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });

                const isSelected = selectedDate === iso;

                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setSelectedDate(iso)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 border-[#0F766E] text-[#0F766E] font-bold shadow-2xs'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-[10px] uppercase text-gray-500">{offset === 0 ? 'Today' : dayName}</p>
                    <p className="text-base font-bold my-0.5">{dayNum}</p>
                    <p className="text-[10px] text-gray-400">{monthName}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">Available Time Slots</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                '09:30 AM', 
                '11:00 AM', 
                '02:30 PM', 
                '04:30 PM', 
                '06:00 PM', 
                '07:30 PM', 
                '08:45 PM'
              ].map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-2xs'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" />
                  <span>{slot}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNextFromStep2}
              className="flex-1 bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold py-3 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{visitType === 'home_visit' ? 'Continue to Address' : 'Continue to Reason'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Patient Address (If Home Visit) */}
      {step === 3 && visitType === 'home_visit' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Your Home Visit Address</h3>
            <p className="text-xs text-gray-500 mt-1">
              The doctor will navigate directly to this location using GPS coordinates.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address & House/Apartment Number *</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. House 14-B, Street 3, Sector F"
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Area / Neighborhood *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DHA Phase 5 / Gulberg"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 bg-white"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Prominent Landmark / Entry Notes for Visiting Doctor</label>
              <input
                type="text"
                placeholder="e.g. Near Lalik Jan Chowk, opposite Sector F Mosque, green gate"
                value={landmarks}
                onChange={e => setLandmarks(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNextFromStep3}
              className="flex-1 bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold py-3 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Reason & Files</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Reason for Visit & Attachments */}
      {step === 4 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Reason for Consultation</h3>
            <p className="text-xs text-gray-500 mt-1">
              Pre-filled from your AI symptom check if available, or enter your concerns.
            </p>
          </div>

          {lastSymptomResult && (
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0F766E]" />
                <span className="text-teal-900 font-semibold">Linked to Symptom Check: {lastSymptomResult.primary_symptom}</span>
              </div>
              <span className="text-[10px] bg-teal-200/60 text-teal-900 px-2 py-0.5 rounded font-bold">Auto-attached</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Chief Medical Complaint & Symptoms *</label>
            <textarea
              rows={4}
              required
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600"
            ></textarea>
          </div>

          {/* Option to attach photo or previous report (Part 4 requirement) */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center space-y-2 bg-gray-50/50">
            <Upload className="w-6 h-6 text-gray-400 mx-auto" />
            <p className="text-xs font-semibold text-gray-700">Attach Previous Lab Report or Photo (Optional)</p>
            <p className="text-[11px] text-gray-400">PDF, JPG, or PNG (e.g. CBC blood report, skin lesion photo)</p>

            {fileAttached ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Report_CBC_LahoreLabs.pdf (Encrypted)
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setFileAttached(true)}
                className="text-xs font-bold text-[#0F766E] underline cursor-pointer"
              >
                Attach sample medical report
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(visitType === 'home_visit' ? 3 : 2)}
              className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleNextFromStep4}
              className="flex-1 bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold py-3 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Summary & Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Summary & Payment */}
      {step === 5 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Summary & Secure Checkout</h3>
            <p className="text-xs text-gray-500 mt-1">
              Review your consultation details and select your payment method.
            </p>
          </div>

          {/* Booking Summary Box (Part 4 requirement) */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">
                {isNurseCareActive ? 'Assigned Bedside Clinician:' : 'Attending Doctor:'}
              </span>
              <span className="font-bold text-gray-900">
                {isNurseCareActive && selectedStaff
                  ? `${selectedStaff.name} (${selectedStaff.role === 'nurse' ? 'Licensed Nurse' : 'EMT Paramedic'})`
                  : `${selectedDoctor?.name} (${selectedDoctor?.specialty})`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Visit Format:</span>
              <span className="font-bold text-gray-900 capitalize flex items-center gap-1">
                {visitType === 'video' ? <Video className="w-3.5 h-3.5 text-blue-600" /> : <Car className="w-3.5 h-3.5 text-emerald-600" />}
                {visitType === 'video' ? 'Video Telehealth Consultation' : 'Home Bedside Visit'}
              </span>
            </div>
            {visitType === 'home_visit' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">Condition / Symptoms:</span>
                  <span className="font-semibold text-teal-900 text-right max-w-[65%]">
                    {currentSymptomConfig.label}
                  </span>
                </div>
                {selectedProcedures.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Auto-Prepared Kit & Procedures:</span>
                    <span className="font-medium text-gray-800 text-right max-w-[65%]">
                      {selectedProcedures.slice(0, 2).join(', ')}
                      {selectedProcedures.length > 2 ? ` (+${selectedProcedures.length - 2} more)` : ''}
                    </span>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Scheduled Time:</span>
              <span className="font-bold text-gray-900">{selectedDate} at {selectedSlot}</span>
            </div>
            {visitType === 'home_visit' && (
              <div className="flex justify-between">
                <span className="text-gray-500">Destination Address:</span>
                <span className="font-bold text-gray-900">{streetAddress}, {area}, {city}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 flex justify-between">
              <span className="text-gray-500">Care Fee:</span>
              <span className="font-bold text-gray-900">Rs. {consultationFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>Platform & AI Record Processing:</span>
              <span>Rs. {platformFee}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-extrabold text-gray-900">
              <span>Total Payable Amount:</span>
              <span className="text-[#0F766E]">Rs. {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selection (JazzCash, Easypaisa, Card) */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">Select Payment Gateway</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'jazzcash'
                    ? 'border-red-600 bg-red-50/50 shadow-2xs font-bold text-red-900'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-red-600 text-white font-extrabold text-[10px] flex items-center justify-center mx-auto mb-1">
                  JC
                </div>
                <p className="text-xs font-bold">JazzCash</p>
                <p className="text-[10px] text-gray-400">Mobile Wallet</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('easypaisa')}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'easypaisa'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs font-bold text-emerald-900'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center mx-auto mb-1">
                  EP
                </div>
                <p className="text-xs font-bold">Easypaisa</p>
                <p className="text-[10px] text-gray-400">Mobile Account</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs font-bold text-blue-900'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-1">
                  <CreditCard className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold">Debit / Card</p>
                <p className="text-[10px] text-gray-400">Visa / Mastercard</p>
              </button>
            </div>
          </div>

          {/* Payment Method Inputs */}
          {paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa' ? (
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <p className="text-xs font-semibold text-gray-700">
                Enter your {paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} Registered Mobile Number
              </p>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={walletPhone}
                  onChange={e => setWalletPhone(e.target.value)}
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 bg-white"
                />
              </div>
              <p className="text-[11px] text-gray-400">
                An authorization prompt will be dispatched directly to your phone.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={e => setCardHolder(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-teal-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono focus:outline-none focus:border-teal-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">CVC</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleInitiatePayment}
              disabled={processing}
              className="flex-1 bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{processing ? 'Processing Payment...' : `Confirm & Pay Rs. ${totalAmount.toLocaleString()}`}</span>
            </button>
          </div>
        </div>
      )}

      {/* Wallet PIN Modal (Mock PIN/OTP flow per Part 4 requirement) */}
      {showWalletPinModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-[#0F766E] flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">
                Authorize {paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Enter your 4-digit mobile MPIN to authorize Rs. {totalAmount.toLocaleString()} to CuraLink Pakistan.
              </p>
            </div>

            <div className="py-2">
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="••••"
                value={walletPin}
                onChange={e => setWalletPin(e.target.value)}
                className="w-32 mx-auto text-center text-2xl font-bold tracking-widest py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={executeBookingConfirmation}
                className="w-full bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold py-3 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Approve Payment
              </button>
              <button
                onClick={() => setShowWalletPinModal(false)}
                className="w-full text-xs text-gray-500 hover:text-gray-800 py-1 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

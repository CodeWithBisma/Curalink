export type SourceAttribution =
  | 'patient_statement'
  | 'doctor_statement'
  | 'provided_patient_data'
  | 'provided_vital'
  | 'not_documented'
  | 'ai_generated';

export interface AttributedField<T = string> {
  text: T;
  source: SourceAttribution;
  requires_clinician_review?: boolean;
}

export interface PrescribedMedItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  source?: SourceAttribution;
}

export interface DocumentedClinicalInfo {
  chief_complaint: AttributedField;
  duration?: AttributedField;
  location?: AttributedField;
  severity?: AttributedField;
  associated_symptoms?: AttributedField;
  denied_symptoms?: AttributedField;
  history_of_illness: AttributedField;
  patient_reported_medications: AttributedField;
  allergies: AttributedField;
  vitals: {
    bp: AttributedField;
    pulse: AttributedField;
    temp: AttributedField;
    spo2: AttributedField;
    respiratory_rate: AttributedField;
    weight: AttributedField;
  };
  physical_examination: AttributedField;
}

export interface DoctorAssessmentSection {
  doctor_stated_diagnosis: AttributedField;
  doctor_stated_assessment: AttributedField;
  icd10_code: AttributedField;
}

export interface DoctorPlanSection {
  treatment_plan: AttributedField;
  prescribed_medications: PrescribedMedItem[];
  stated_advice: AttributedField;
  explicit_red_flags: AttributedField;
  follow_up_instructions: AttributedField;
}

export interface AISafetyItem {
  text: string;
  source: 'ai_generated';
  requires_clinician_review: true;
}

export interface AISafetySuggestionsSection {
  safety_considerations: AISafetyItem[];
  suggested_actions?: AISafetyItem[];
  unmentioned_elements: string[];
}

export interface ScribeReportOutput {
  // Direct fields
  diagnosis: string;
  chief_complaint: string;
  patient_age?: number | string;
  patient_gender?: string;
  duration_days?: number | string;
  past_medical_history?: string;
  duration?: string;
  location?: string;
  severity?: string;
  associated_symptoms?: string;
  denied_symptoms?: string;
  history_of_illness: string;
  patient_reported_medications?: string;
  allergies?: string;
  vitals: {
    bp: string;
    pulse: number | string;
    temp: string;
    spo2: number | string;
    respiratory_rate?: string | null;
    weight?: string | null;
  };
  examination_findings: string;
  physical_exam?: string;
  transcription_summary: string;
  doctor_stated_diagnosis?: string;
  doctor_stated_assessment?: string;
  icd10_code?: string;
  doctor_stated_treatment_plan?: string;
  advice: string;
  doctor_stated_advice?: string;
  red_flags: string;
  doctor_stated_red_flags?: string;
  follow_up: string;
  doctor_stated_follow_up?: string;
  follow_up_timeframe?: string;
  follow_up_date?: string;
  follow_up_instructions?: string;
  medications: PrescribedMedItem[];

  // AI-generated suggestions
  ai_safety_considerations?: string[];
  ai_suggested_actions?: string[];

  // Structured sections
  documented_info?: DocumentedClinicalInfo;
  doctor_assessment?: DoctorAssessmentSection;
  doctor_plan?: DoctorPlanSection;
  ai_suggestions?: AISafetySuggestionsSection;

  // Status & draft header
  report_status?: 'draft' | 'reviewed' | 'signed';
  status_label?: string;

  grounding_notes?: {
    unmentioned_elements: string[];
    is_provisional_diagnosis: boolean;
    confidence_level?: 'high' | 'moderate' | 'low';
  };
  prompt_version?: string;
  schema_version?: string;
}

export interface ClinicalSampleCase {
  id: string;
  title: string;
  patientName: string;
  patientAge: number;
  chiefComplaint: string;
  transcript: string;
}

export const SAMPLE_CLINICAL_CONVERSATIONS: ClinicalSampleCase[] = [
  {
    id: 'case_headache_requirement11',
    title: 'Headache Clinical Consultation (Requirement 11 Test Case)',
    patientName: 'Ahmad Khan',
    patientAge: 32,
    chiefComplaint: 'Frontal headaches for two weeks, rated 7/10',
    transcript: `Doctor: What brings you in today?

Patient: I've been having headaches for about two weeks.

Doctor: Where is the pain?

Patient: Mostly around my forehead.

Doctor: How severe is it from 1 to 10?

Patient: About 7.

Doctor: Any nausea or vomiting?

Patient: Sometimes I feel nauseous, but I haven't vomited.

Doctor: Are you taking any medications for it?

Patient: No.`
  },
  {
    id: 'case_throat_fever',
    title: 'Acute Tonsillopharyngitis & Fever (Urgent Care)',
    patientName: 'Zainab Ahmed',
    patientAge: 29,
    chiefComplaint: 'Severe sore throat and 102°F fever for 3 days',
    transcript: `Doctor: "As-salamu alaykum Zainab. Please have a seat. How can I help you today?"
Patient: "Wa alaykum as-salam Doctor Sahab. For the past three days, I have had terrible pain in my throat. Swallowing even a sip of warm water feels like needles, and I have high fever of 102 degrees Fahrenheit."
Doctor: "I see. Have you noticed any chills, headache, or neck stiffness?"
Patient: "Yes, bad headache and body aches. No neck stiffness though."
Doctor: "Any cough, shortness of breath, or chest pain?"
Patient: "A mild dry cough occasionally, but no chest pain or breathing difficulty."
Doctor: "Are you allergic to any medicines, particularly Penicillin or Sulfa drugs?"
Patient: "No known drug allergies, doctor."
Doctor: "Let's check your vitals first. Blood pressure is 118 over 76 mmHg. Heart rate is 84 bpm. Oxygen saturation is 98% on room air. Body temperature is 101.8 Fahrenheit right now. Let me inspect your throat. Please open wide and say 'Aah'."
Patient: "Aaaah..."
Doctor: "Your posterior pharynx and uvula are visibly inflamed and red, with yellowish follicular exudates on both tonsils. Your anterior cervical lymph nodes are also swollen and tender to the touch. Your chest sounds completely clear bilaterally."
Patient: "Is it a serious throat infection, doctor?"
Doctor: "You have acute exudative pharyngotonsillitis. It requires a targeted 7-day oral antibiotic course to eradicate the infection and prevent complications, along with antipyretics and anti-inflammatory throat gargles. You must not skip doses, even after fever settles in 48 hours."
Patient: "Understood doctor. Any dietary instructions?"
Doctor: "Stay on warm soft foods, khichdi, clear chicken broth, and drink at least 2.5 liters of warm water or green tea with honey daily. Avoid cold beverages and spicy oily dishes. If you develop difficulty breathing or cannot swallow liquids, return immediately."
Patient: "Thank you so much Doctor Sahab."`
  },
  {
    id: 'case_gastroenteritis',
    title: 'Acute Gastroenteritis & Food Poisoning',
    patientName: 'Hamza Tariq',
    patientAge: 42,
    chiefComplaint: 'Abdominal cramps, vomiting, and diarrhea for 24 hours',
    transcript: `Doctor: "Good afternoon Hamza. Tell me what happened."
Patient: "Doctor, since last night after eating restaurant food, I have had severe stomach cramping and diarrhea. I've been to the washroom 6 times, and vomited twice this morning."
Doctor: "Have you noticed any blood in stools or high fever?"
Patient: "No blood, but I feel very weak, thirsty, and dizzy when standing up."
Doctor: "Let's examine. Pulse is slightly elevated at 92 bpm, BP is 106/70 mmHg, Temp 99.1°F, SpO2 99%. Your oral tongue is somewhat dry, showing mild dehydration. Abdomen is soft, with generalized lower abdominal tenderness and hyperactive bowel sounds. No rebound tenderness."
Doctor: "This is acute food-borne gastroenteritis. The most critical priority is immediate rehydration with ORS (Nimkol). We will start anti-spasmodics for the cramps and a restorative probiotic."
Patient: "Do I need an antibiotic?"
Doctor: "Not immediately, as there is no dysentery or high fever. If symptoms persist beyond 48 hours or fever exceeds 101°F, we will re-evaluate."`
  },
  {
    id: 'case_hypertension',
    title: 'Hypertension Clinical Review & Headache',
    patientName: 'Fatima Noor',
    patientAge: 34,
    chiefComplaint: 'Occipital morning headaches and routine blood pressure check',
    transcript: `Doctor: "Welcome Fatima. How have you been managing your medications lately?"
Patient: "Doctor, I've had dull headaches at the back of my head for the past week, especially upon waking up. I confess I skipped my BP medicine three days last week because of work stress."
Doctor: "Let's check your blood pressure now. Resting BP is 152 over 96 mmHg in right arm, 150 over 94 in left arm. Pulse is 76 bpm regular. Chest is clear and no ankle swelling."
Doctor: "Skipping anti-hypertensives causes rebound arterial hypertension, which explains the morning occipital throbbing. We will adjust your Amlodipine dose, and I need you to strictly log your morning and evening BP for the next 10 days."
Patient: "I will be strictly compliant, doctor. Thank you for checking so thoroughly."`
  }
];

export async function requestAIScribeReport(params: {
  transcript: string;
  patientName?: string;
  doctorName?: string;
  visitType?: string;
  existingVitals?: any;
  doctorSpecialty?: string;
}): Promise<{ success: boolean; report: ScribeReportOutput; source: string; promptVersion?: string }> {
  const cleanTranscript = params.transcript?.trim();
  if (!cleanTranscript || cleanTranscript.length < 15) {
    throw new Error('Consultation transcript is too short to generate a clinical report. Please record or dictate dialogue first.');
  }

  const response = await fetch('/api/gemini/generate-consultation-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch (parseErr) {
    throw new Error('Unable to parse response from clinical report server. Please try again.');
  }

  if (!response.ok || !data?.success || !data?.report) {
    const message = data?.error || 'Unable to generate the clinical report. Please try again.';
    throw new Error(message);
  }

  const normalizedReport: ScribeReportOutput = {
    ...data.report,
    physical_exam:
      data.report.examination_findings ||
      data.report.physical_exam ||
      'No physical examination findings documented in the provided transcript.'
  };

  return {
    success: true,
    report: normalizedReport,
    source: data.source || 'gemini-3.8-flash',
    promptVersion: data.promptVersion
  };
}

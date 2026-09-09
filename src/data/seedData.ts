import { DoctorProfile, PatientProfile, Booking, ConsultationReport, MedicalHistoryItem, NotificationItem, MedicalNote, NurseParamedicProfile } from '../types';

export const INITIAL_NURSES_PARAMEDICS: NurseParamedicProfile[] = [
  {
    id: 'staff_1',
    uid: 'staff_1',
    name: 'Nurse Bushra Bibi',
    role: 'nurse',
    title: 'Licensed Registered Nurse (PNC-RN)',
    license_number: 'PNC-RN-78291',
    photo_url: 'https://images.unsplash.com/photo-1594824813576-905ff9b61d36?auto=format&fit=crop&q=80&w=400',
    experience_years: 9,
    rating: 4.96,
    reviews_count: 168,
    city: 'Lahore',
    home_visit_fee: 1200,
    services_offered: [
      'Bedside Vitals Check (BP, Pulse, Temp, SpO2, Blood Sugar)',
      'IV Cannulation & Saline / Electrolyte Drips',
      'IM / Subcutaneous Injections (Insulin, Antibiotics)',
      'Aseptic Surgical Wound Dressing & Suture Removal',
      'Bedside Urinary Catheter Care & Foley Flush'
    ],
    bio: 'PNC-registered senior nursing officer with 9 years of hospital and home health experience. Expert in gentle IV insertion, elderly bedridden care, and post-operative surgical dressing.',
    is_available: true
  },
  {
    id: 'staff_2',
    uid: 'staff_2',
    name: 'Paramedic Muhammad Rizwan',
    role: 'paramedic',
    title: 'Senior Emergency Medical Technician (Rescue 1122 Certified)',
    license_number: 'EMS-EMT-44912',
    photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    experience_years: 8,
    rating: 4.92,
    reviews_count: 142,
    city: 'Lahore',
    home_visit_fee: 1000,
    services_offered: [
      'Bedside Emergency Vitals & Oxygen Saturation Triage',
      'Nebulization Therapy for Asthma / Bronchitis',
      'Rapid Blood Glucose & Dengue Rapid Diagnostic Kit',
      'Emergency First Aid & Trauma Splinting',
      'Assisted Patient Mobilization & Transfer Prep'
    ],
    bio: 'Certified Rescue 1122 emergency paramedic trained in rapid bedside assessment, respiratory nebulization, vital signs monitoring, and emergency patient stabilization.',
    is_available: true
  },
  {
    id: 'staff_3',
    uid: 'staff_3',
    name: 'Nurse Saima Akhtar',
    role: 'nurse',
    title: 'Senior Home Health & Geriatric Care Nurse',
    license_number: 'PNC-RN-54210',
    photo_url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=400',
    experience_years: 11,
    rating: 4.98,
    reviews_count: 215,
    city: 'Karachi',
    home_visit_fee: 1400,
    services_offered: [
      'Comprehensive Bedside Vitals Monitoring',
      'Diabetic Foot Care & Daily Insulin Titration Support',
      'IV Infusions & Antibiotic Cannulation',
      'Tracheostomy Care & Airway Suctioning',
      'Palliative & Bedridden Patient Hygiene Care'
    ],
    bio: 'Dedicated home health nurse specializing in chronic diabetic management, palliative bedside comfort, and IV infusions across Karachi neighborhoods.',
    is_available: true
  },
  {
    id: 'staff_4',
    uid: 'staff_4',
    name: 'Paramedic Ali Hassan',
    role: 'paramedic',
    title: 'Critical Care Paramedic & Field EMT',
    license_number: 'EMS-EMT-38102',
    photo_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    experience_years: 7,
    rating: 4.89,
    reviews_count: 98,
    city: 'Karachi',
    home_visit_fee: 1100,
    services_offered: [
      'Rapid Bedside Vitals & ECG Rhythm Strip Check',
      'Emergency Oxygen Cylinder Administration',
      'Blood Sample Collection for Lab Pick-up',
      'Acute Pain Relief Injection Administration',
      'Wound Cleansing & Antiseptic Bandaging'
    ],
    bio: 'Emergency field paramedic specialized in urgent bedside vitals monitoring, oxygen therapy administration, and blood draw services.',
    is_available: true
  },
  {
    id: 'staff_5',
    uid: 'staff_5',
    name: 'Nurse Farzana Jameel',
    role: 'nurse',
    title: 'ICU & Post-Operative Registered Nurse',
    license_number: 'PNC-RN-66120',
    photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    experience_years: 10,
    rating: 4.95,
    reviews_count: 130,
    city: 'Islamabad',
    home_visit_fee: 1300,
    services_offered: [
      'Post-Surgical Suture Removal & Drain Inspection',
      'IV Cannulation & Medication Infusions',
      'Bedside Oxygen & Vitals Assessment',
      'NG Tube Insertion & Enteral Feeding Support',
      'Pressure Ulcer (Bed Sore) Dressing'
    ],
    bio: 'Experienced post-surgical and ICU nurse providing compassionate home bedside nursing, sterile dressings, and medication management in Islamabad & Rawalpindi.',
    is_available: true
  },
  {
    id: 'staff_6',
    uid: 'staff_6',
    name: 'Paramedic Usman Tariq',
    role: 'paramedic',
    title: 'Emergency Medical Technician (Rescue 1122 Trained)',
    license_number: 'EMS-EMT-51920',
    photo_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    experience_years: 6,
    rating: 4.88,
    reviews_count: 76,
    city: 'Islamabad',
    home_visit_fee: 1050,
    services_offered: [
      'Bedside Vital Signs (BP, Heart Rate, Pulse Ox, Temp)',
      'Nebulization & Inhaler Coaching',
      'Burn Dressing & Minor Wound Care',
      'Rapid Blood Typing & Glucose Check',
      'Home Medical Kit Verification'
    ],
    bio: 'Certified emergency responder providing rapid bedside assessment, nebulization therapy, and vital signs monitoring for families across Islamabad.',
    is_available: true
  }
];

export const INITIAL_DOCTORS: DoctorProfile[] = [
  {
    uid: 'doc_1',
    name: 'Dr. Ayesha Tariq',
    photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-48291-P',
    verification_status: 'approved',
    specialty: 'General Physician & Family Medicine',
    qualifications: 'MBBS (KEMU), FCPS (Family Medicine), MRCGP (UK)',
    experience_years: 12,
    hospital_affiliation: 'Shaukat Khanum & National Hospital, Lahore',
    affiliated_hospital_ids: ['hosp_skm', 'hosp_national'],
    diseases_treated: ['Dengue Fever', 'Typhoid Fever', 'Seasonal Influenza', 'Viral URI', 'Acute Gastroenteritis', 'Hypertension'],
    symptoms_handled: ['High Fever', 'Chills', 'Severe Headache', 'Body Aches', 'Cough', 'Fatigue', 'Vomiting', 'Stomach Pain'],
    bio: 'Dr. Ayesha Tariq has over 12 years of clinical experience in acute illness management, preventive healthcare, and chronic condition monitoring. She provides compassionate video consultations and clinical prescriptions across Pakistan.',
    city: 'Lahore',
    offers_video: true,
    offers_home_visit: true,
    home_visit_radius_km: 15,
    video_fee: 1500,
    home_visit_fee: 1800,
    rating: 4.9,
    reviews_count: 142,
    availability: {
      Monday: { enabled: true, slots: ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM', '07:30 PM'] },
      Tuesday: { enabled: true, slots: ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM'] },
      Wednesday: { enabled: true, slots: ['09:00 AM', '11:30 AM', '03:00 PM', '06:00 PM'] },
      Thursday: { enabled: true, slots: ['09:00 AM', '11:30 AM', '02:00 PM', '07:00 PM'] },
      Friday: { enabled: true, slots: ['09:00 AM', '11:00 AM', '03:30 PM', '06:00 PM'] },
      Saturday: { enabled: true, slots: ['10:00 AM', '01:00 PM', '04:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_2',
    name: 'Dr. Bilal Haroon',
    photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-33829-S',
    verification_status: 'approved',
    specialty: 'Consultant Pulmonologist & Critical Care',
    qualifications: 'MBBS (Dow), FCPS (Pulmonology), FACP (USA)',
    experience_years: 15,
    hospital_affiliation: 'Aga Khan University Hospital, Karachi',
    affiliated_hospital_ids: ['hosp_aku', 'hosp_southcity'],
    diseases_treated: ['Asthma', 'COPD & Bronchitis', 'Pneumonia', 'Chest Infections', 'Seasonal Flu', 'Post-COVID Pulmonary Care'],
    symptoms_handled: ['Wheezing', 'Chest Congestion', 'Persistent Cough', 'Shortness of Breath', 'Difficulty Breathing', 'Night Cough', 'Fever with Cough'],
    bio: 'Specialist in respiratory infections, asthma, COPD, and post-viral pulmonary care. Renowned for accurate diagnostic assessments and patient-centered treatment plans.',
    city: 'Karachi',
    offers_video: true,
    offers_home_visit: true,
    home_visit_radius_km: 18,
    video_fee: 2000,
    home_visit_fee: 2500,
    rating: 4.95,
    reviews_count: 218,
    availability: {
      Monday: { enabled: true, slots: ['10:00 AM', '12:00 PM', '04:00 PM', '08:00 PM'] },
      Tuesday: { enabled: true, slots: ['10:00 AM', '01:00 PM', '05:00 PM'] },
      Wednesday: { enabled: true, slots: ['10:00 AM', '12:00 PM', '04:00 PM'] },
      Thursday: { enabled: true, slots: ['11:00 AM', '03:00 PM', '06:00 PM'] },
      Friday: { enabled: true, slots: ['09:30 AM', '02:30 PM', '05:00 PM'] },
      Saturday: { enabled: true, slots: ['11:00 AM', '02:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_3',
    name: 'Dr. Maryam Khan',
    photo_url: 'https://images.unsplash.com/photo-1594824813576-905ff9b61d36?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-52190-I',
    verification_status: 'approved',
    specialty: 'Consultant Pediatrician & Child Specialist',
    qualifications: 'MBBS (Rawalpindi Medical College), MCPS, FCPS (Pediatrics)',
    experience_years: 9,
    hospital_affiliation: 'Shifa International Hospital, Islamabad',
    affiliated_hospital_ids: ['hosp_shifa'],
    diseases_treated: ['Pediatric Asthma', 'Childhood Infections', 'Typhoid Fever', 'Acute Gastroenteritis', 'Measles & Viral Rashes', 'Neonatal Jaundice'],
    symptoms_handled: ['Child High Fever', 'Ear Ache', 'Vomiting in Children', 'Persistent Cough', 'Poor Feeding', 'Child Skin Rash', 'Dehydration'],
    bio: 'Dedicated child health specialist managing pediatric seasonal fevers, vaccinations, growth monitoring, and acute childhood allergies. Gentle and child-friendly approach.',
    city: 'Islamabad',
    offers_video: true,
    offers_home_visit: true,
    home_visit_radius_km: 15,
    video_fee: 1800,
    home_visit_fee: 2000,
    rating: 4.88,
    reviews_count: 96,
    availability: {
      Monday: { enabled: true, slots: ['09:00 AM', '11:00 AM', '02:00 PM', '06:00 PM'] },
      Tuesday: { enabled: true, slots: ['09:00 AM', '01:00 PM', '04:00 PM'] },
      Wednesday: { enabled: true, slots: ['10:00 AM', '03:00 PM', '06:00 PM'] },
      Thursday: { enabled: true, slots: ['09:00 AM', '12:00 PM', '05:00 PM'] },
      Friday: { enabled: true, slots: ['10:00 AM', '03:00 PM'] },
      Saturday: { enabled: true, slots: ['10:00 AM', '01:00 PM', '03:00 PM'] },
      Sunday: { enabled: true, slots: ['11:00 AM', '02:00 PM'] }
    }
  },
  {
    uid: 'doc_4',
    name: 'Dr. Usman Qureshi',
    photo_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-29103-F',
    verification_status: 'approved',
    specialty: 'Internal Medicine & Diabetologist',
    qualifications: 'MBBS (AIMC), FCPS (Medicine), Diploma in Diabetes (UK)',
    experience_years: 14,
    hospital_affiliation: 'Doctors Hospital & Medical Center, Lahore',
    affiliated_hospital_ids: ['hosp_doctors', 'hosp_skm'],
    diseases_treated: ['Type 2 Diabetes Mellitus', 'Hypertension', 'Metabolic Syndrome', 'Geriatric Chronic Illness', 'Dengue Fever Care', 'Thyroid Disorders'],
    symptoms_handled: ['High Blood Sugar', 'Frequent Urination', 'Dizziness & Weakness', 'High Blood Pressure', 'Chronic Fatigue', 'Persistent Fever', 'Headache'],
    bio: 'Senior internist with special interest in metabolic disorders, hypertension, diabetes management, and geriatric care with home assessment options.',
    city: 'Lahore',
    offers_video: true,
    offers_home_visit: true,
    home_visit_radius_km: 20,
    video_fee: 1600,
    home_visit_fee: 2200,
    rating: 4.85,
    reviews_count: 175,
    availability: {
      Monday: { enabled: true, slots: ['02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'] },
      Tuesday: { enabled: true, slots: ['02:00 PM', '05:00 PM', '07:00 PM'] },
      Wednesday: { enabled: true, slots: ['02:00 PM', '04:00 PM', '08:00 PM'] },
      Thursday: { enabled: true, slots: ['03:00 PM', '06:00 PM'] },
      Friday: { enabled: true, slots: ['03:00 PM', '07:00 PM'] },
      Saturday: { enabled: true, slots: ['12:00 PM', '03:00 PM', '05:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_5',
    name: 'Dr. Farah Nazeer',
    photo_url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-77120-K',
    verification_status: 'approved',
    specialty: 'Consultant Dermatologist & Skin Specialist',
    qualifications: 'MBBS (SMC), MCPS, FCPS (Dermatology)',
    experience_years: 8,
    hospital_affiliation: 'South City Hospital, Karachi',
    affiliated_hospital_ids: ['hosp_southcity', 'hosp_aku'],
    diseases_treated: ['Eczema & Atopic Dermatitis', 'Acne Vulgaris', 'Psoriasis', 'Allergic Rashes', 'Fungal Skin Infections', 'Urticaria & Hives'],
    symptoms_handled: ['Skin Rash', 'Severe Itching', 'Skin Redness & Flaking', 'Hives & Swelling', 'Dry Cracked Skin', 'Blisters', 'Acne Breakouts'],
    bio: 'Expert in skin conditions, eczema, acute rashes, hair disorders, and pediatric dermatology. High definition video assessment with detailed prescription care.',
    city: 'Karachi',
    offers_video: true,
    offers_home_visit: false,
    home_visit_radius_km: 0,
    video_fee: 1700,
    home_visit_fee: 0,
    rating: 4.92,
    reviews_count: 110,
    availability: {
      Monday: { enabled: true, slots: ['11:00 AM', '01:00 PM', '03:30 PM'] },
      Wednesday: { enabled: true, slots: ['11:00 AM', '01:00 PM', '04:00 PM'] },
      Friday: { enabled: true, slots: ['10:00 AM', '02:00 PM', '05:00 PM'] },
      Saturday: { enabled: true, slots: ['12:00 PM', '03:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_6',
    name: 'Dr. Zainab Raza',
    photo_url: 'https://images.unsplash.com/photo-1594824813576-905ff9b61d36?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-63102-L',
    verification_status: 'approved',
    specialty: 'Consultant Cardiologist & Hypertension Specialist',
    qualifications: 'MBBS (AIMC), FCPS (Cardiology), MRCP (UK)',
    experience_years: 11,
    hospital_affiliation: 'National Hospital & Medical Centre, Lahore',
    affiliated_hospital_ids: ['hosp_national', 'hosp_doctors'],
    diseases_treated: ['Hypertension (High BP)', 'Coronary Artery Disease', 'Heart Failure Management', 'Arrhythmia & Palpitations', 'High Cholesterol'],
    symptoms_handled: ['Chest Pain / Angina', 'Shortness of Breath', 'Heart Palpitations', 'High BP Dizziness', 'Swollen Ankles', 'Fatigue with Exertion'],
    bio: 'Experienced cardiologist specialized in preventive cardiovascular care, post-angioplasty rehab, and individualized anti-hypertensive therapy.',
    city: 'Lahore',
    offers_video: true,
    offers_home_visit: false,
    home_visit_radius_km: 0,
    video_fee: 2200,
    home_visit_fee: 0,
    rating: 4.91,
    reviews_count: 134,
    availability: {
      Monday: { enabled: true, slots: ['10:00 AM', '02:00 PM', '05:00 PM'] },
      Tuesday: { enabled: true, slots: ['11:00 AM', '03:00 PM', '06:00 PM'] },
      Wednesday: { enabled: true, slots: ['10:00 AM', '01:00 PM', '04:00 PM'] },
      Thursday: { enabled: true, slots: ['11:00 AM', '03:00 PM', '07:00 PM'] },
      Friday: { enabled: true, slots: ['09:00 AM', '12:00 PM'] },
      Saturday: { enabled: true, slots: ['11:00 AM', '02:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_7',
    name: 'Dr. Tariq Mansoor',
    photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-81934-K',
    verification_status: 'approved',
    specialty: 'Consultant Gastroenterologist & Hepatologist',
    qualifications: 'MBBS (Dow), FCPS (Gastroenterology)',
    experience_years: 13,
    hospital_affiliation: 'Aga Khan University Hospital, Karachi',
    affiliated_hospital_ids: ['hosp_aku', 'hosp_southcity'],
    diseases_treated: ['Acute Gastroenteritis', 'Typhoid Fever', 'Acid Reflux & GERD', 'Irritable Bowel Syndrome (IBS)', 'Fatty Liver & Hepatitis'],
    symptoms_handled: ['Stomach Pain & Cramping', 'Severe Nausea & Vomiting', 'Watery Diarrhea', 'Heartburn & Acidity', 'Abdominal Bloating', 'Fever with Diarrhea'],
    bio: 'Digestive and liver health expert managing gastrointestinal infections, food poisoning, chronic heartburn, and biliary disorders.',
    city: 'Karachi',
    offers_video: true,
    offers_home_visit: false,
    home_visit_radius_km: 0,
    video_fee: 1900,
    home_visit_fee: 0,
    rating: 4.89,
    reviews_count: 156,
    availability: {
      Monday: { enabled: true, slots: ['11:00 AM', '02:00 PM', '06:00 PM'] },
      Tuesday: { enabled: true, slots: ['10:00 AM', '01:00 PM', '05:00 PM'] },
      Wednesday: { enabled: true, slots: ['11:00 AM', '03:00 PM', '07:00 PM'] },
      Thursday: { enabled: true, slots: ['10:00 AM', '02:00 PM'] },
      Friday: { enabled: true, slots: ['10:00 AM', '04:00 PM'] },
      Saturday: { enabled: true, slots: ['12:00 PM', '04:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_8',
    name: 'Dr. Asim Javed',
    photo_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-41982-I',
    verification_status: 'approved',
    specialty: 'Consultant Neurologist & Headache Specialist',
    qualifications: 'MBBS (AMC), FCPS (Neurology), Stroke Care Fellowship',
    experience_years: 10,
    hospital_affiliation: 'Shifa International Hospital, Islamabad',
    affiliated_hospital_ids: ['hosp_shifa'],
    diseases_treated: ['Migraine & Tension Headaches', 'Stroke & TIA Follow-up', 'Epilepsy & Seizures', 'Neuropathy & Nerve Pain', 'Vertigo & Balance Disorders'],
    symptoms_handled: ['Throbbing Headache', 'Facial Numbness', 'Dizziness & Vertigo', 'Tremors & Shaking', 'Memory Lapses', 'Neck Stiffness'],
    bio: 'Consultant neurologist with deep clinical interest in acute migraine management, vertigo, stroke rehabilitation, and neuropathy.',
    city: 'Islamabad',
    offers_video: true,
    offers_home_visit: false,
    home_visit_radius_km: 0,
    video_fee: 2100,
    home_visit_fee: 0,
    rating: 4.93,
    reviews_count: 88,
    availability: {
      Monday: { enabled: true, slots: ['10:00 AM', '01:00 PM', '04:00 PM'] },
      Tuesday: { enabled: true, slots: ['11:00 AM', '03:00 PM', '06:00 PM'] },
      Wednesday: { enabled: true, slots: ['10:00 AM', '02:00 PM'] },
      Thursday: { enabled: true, slots: ['10:00 AM', '01:00 PM', '05:00 PM'] },
      Friday: { enabled: true, slots: ['11:00 AM', '03:00 PM'] },
      Saturday: { enabled: true, slots: ['10:00 AM', '01:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_9',
    name: 'Dr. Hamza Malik',
    photo_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-34190-L',
    verification_status: 'approved',
    specialty: 'Consultant Oncologist & Internal Medicine',
    qualifications: 'MBBS (KEMU), MRCP (UK), FCPS (Medical Oncology)',
    experience_years: 16,
    hospital_affiliation: 'Shaukat Khanum Memorial Hospital, Lahore',
    affiliated_hospital_ids: ['hosp_skm'],
    diseases_treated: ['Medical Oncology', 'Hematology & Anemia', 'Chemotherapy Supportive Care', 'General Internal Medicine', 'Unexplained Weight Loss'],
    symptoms_handled: ['Severe Anemia & Fatigue', 'Unexplained Fever & Night Sweats', 'Persistent Lymph Swelling', 'Loss of Appetite', 'Chronic Pain'],
    bio: 'Senior consultant medical oncologist and internist dedicated to cancer diagnosis, chemotherapy symptom relief, and second opinions.',
    city: 'Lahore',
    offers_video: true,
    offers_home_visit: false,
    home_visit_radius_km: 0,
    video_fee: 2500,
    home_visit_fee: 0,
    rating: 4.97,
    reviews_count: 189,
    availability: {
      Monday: { enabled: true, slots: ['09:30 AM', '12:00 PM', '03:30 PM'] },
      Wednesday: { enabled: true, slots: ['10:00 AM', '01:30 PM', '04:00 PM'] },
      Thursday: { enabled: true, slots: ['11:00 AM', '02:30 PM'] },
      Friday: { enabled: true, slots: ['09:00 AM', '12:30 PM'] },
      Saturday: { enabled: true, slots: ['10:00 AM', '01:00 PM'] },
      Sunday: { enabled: false, slots: [] }
    }
  },
  {
    uid: 'doc_pending_demo',
    name: 'Dr. Kamran Siddiqui',
    photo_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    pmc_license_number: 'PMC-99381-PND',
    verification_status: 'pending',
    specialty: 'Orthopedic & Sports Medicine',
    qualifications: 'MBBS, FCPS (Orthopedics)',
    experience_years: 6,
    hospital_affiliation: 'PIMS Hospital, Islamabad',
    affiliated_hospital_ids: ['hosp_shifa'],
    diseases_treated: ['Joint & Bone Pain', 'Sports Injuries', 'Fractures & Sprains', 'Arthritis Care'],
    symptoms_handled: ['Joint Pain', 'Back Pain', 'Knee Swelling', 'Difficulty Walking'],
    bio: 'Musculoskeletal pain specialist currently awaiting PMC license verification review.',
    city: 'Islamabad',
    offers_video: true,
    offers_home_visit: false,
    home_visit_radius_km: 0,
    video_fee: 1800,
    home_visit_fee: 0,
    rating: 5.0,
    reviews_count: 0,
    availability: {
      Monday: { enabled: true, slots: ['10:00 AM', '02:00 PM'] }
    }
  }
];

export const INITIAL_PATIENT: PatientProfile = {
  uid: 'patient_demo',
  name: 'Zainab Ahmed',
  cnic: '35201-1234567-8',
  dob: '1996-05-14',
  gender: 'female',
  city: 'Lahore',
  emergency_contact: {
    name: 'Hamza Ahmed',
    relationship: 'Spouse',
    phone: '0300-4829103'
  },
  addresses: [
    {
      id: 'addr_1',
      label: 'Home',
      street: 'House 42-B, Sector Y, Phase 3',
      area: 'DHA',
      city: 'Lahore',
      is_default: true
    },
    {
      id: 'addr_2',
      label: 'Office',
      street: 'Plot 18, Block G-3, M.A. Johar Town',
      area: 'Johar Town',
      city: 'Lahore'
    }
  ],
  has_completed_first_symptom_check: true,
  onboarding_step: 4,
  known_conditions: ['Mild Seasonal Asthma', 'Occasional Migraines'],
  allergies: ['Penicillin', 'Dust mite'],
  current_medications: ['Salbutamol Inhaler (as needed)', 'Cetirizine 10mg'],
  past_surgeries: ['Appendectomy (2018)']
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_101',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    doctor_uid: 'doc_1',
    doctor_name: 'Dr. Ayesha Tariq',
    doctor_photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    doctor_specialty: 'General Physician & Family Medicine',
    mode: 'home_visit',
    scheduled_date: 'Today',
    scheduled_time: '11:30 AM',
    status: 'in_progress',
    fee: 3000,
    platform_fee: 150,
    total_amount: 3150,
    address: {
      street: 'House 42-B, Sector Y, Phase 3',
      area: 'DHA',
      city: 'Lahore',
      lat: 31.4722,
      lng: 74.3722
    },
    notes: 'Persistent fever (101.5F) for 2 days with productive chest cough.',
    created_at: '2026-09-06T09:15:00Z',
    eta_minutes: 12,
    driver_status: 'on_the_way'
  },
  {
    id: 'bk_102',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    doctor_uid: 'doc_2',
    doctor_name: 'Dr. Bilal Haroon',
    doctor_photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    doctor_specialty: 'Consultant Pulmonologist & Critical Care',
    mode: 'video',
    scheduled_date: 'Tomorrow',
    scheduled_time: '04:00 PM',
    status: 'confirmed',
    fee: 2000,
    platform_fee: 150,
    total_amount: 2150,
    created_at: '2026-09-05T14:30:00Z'
  },
  {
    id: 'bk_103',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    doctor_uid: 'doc_4',
    doctor_name: 'Dr. Usman Qureshi',
    doctor_photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    doctor_specialty: 'Internal Medicine & Diabetologist',
    mode: 'video',
    scheduled_date: '2026-08-20',
    scheduled_time: '06:00 PM',
    status: 'completed',
    fee: 1600,
    platform_fee: 150,
    total_amount: 1750,
    created_at: '2026-08-19T10:00:00Z'
  }
];

export const INITIAL_REPORTS: ConsultationReport[] = [
  {
    id: 'rep_103',
    booking_id: 'bk_103',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    doctor_uid: 'doc_4',
    doctor_name: 'Dr. Usman Qureshi',
    doctor_specialty: 'Internal Medicine',
    doctor_pmc: 'PMC-29103-F',
    date: 'August 20, 2026',
    mode: 'video',
    chief_complaint: 'Routine follow-up for blood pressure check and acute fatigue.',
    symptoms_discussed: ['Midday lethargy', 'Mild tension headaches', 'Sleep disturbance'],
    assessment_diagnosis: 'Mild situational hypertension secondary to work stress; Vitamin D insufficiency.',
    medications: [
      {
        name: 'Sunny D 200,000 IU Ampoule',
        dosage: '1 ampoule orally',
        frequency: 'Every 2 weeks',
        duration: '6 weeks',
        instructions: 'Take with milk after a heavy meal'
      },
      {
        name: 'Panadol Extend 665mg',
        dosage: '1 tablet',
        frequency: 'Every 8 hours as needed',
        duration: '3 days',
        instructions: 'Only for headache relief'
      }
    ],
    doctor_notes: 'Patient advised 30 minutes brisk walking daily. Reduce dietary sodium intake. Re-check BP twice weekly.',
    follow_up_recommendation: 'Repeat 25-OH Vitamin D test in 6 weeks and schedule tele-review.',
    doctor_signed: true,
    signed_at: '2026-08-20T18:45:00Z',
    created_at: '2026-08-20T18:30:00Z'
  },
  {
    id: 'rep_101',
    booking_id: 'bk_101',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    doctor_uid: 'doc_1',
    doctor_name: 'Dr. Ayesha Tariq',
    doctor_specialty: 'General Physician & Family Medicine',
    doctor_pmc: 'PMC-48291-P',
    date: 'September 6, 2026',
    mode: 'home_visit',
    chief_complaint: 'Fever (101.5F), productive cough with yellowish phlegm, and throat soreness.',
    symptoms_discussed: ['High fever', 'Wheezing episodes at night', 'Throat irritation', 'Body aches'],
    assessment_diagnosis: 'Acute Bronchitis with Mild Asthma Exacerbation.',
    medications: [
      {
        name: 'Azomax (Azithromycin) 500mg',
        dosage: '1 capsule daily',
        frequency: 'Once a day',
        duration: '5 days',
        instructions: 'Take 1 hour before breakfast on empty stomach'
      },
      {
        name: 'Ventolin Nebules 2.5mg',
        dosage: '1 respule via nebulizer',
        frequency: 'Twice daily',
        duration: '3 days',
        instructions: 'Mix with 2ml normal saline'
      },
      {
        name: 'Panadol 500mg (Paracetamol)',
        dosage: '2 tablets',
        frequency: 'Every 6 hours if fever > 100°F',
        duration: '4 days',
        instructions: 'Do not exceed 8 tablets in 24 hours'
      }
    ],
    doctor_notes: 'Bilateral chest auscultation revealed scattered rhonchi and mild expiratory wheeze. Oxygen saturation is stable at 97% on room air. Hydration strongly advised.',
    follow_up_recommendation: 'Review in 5 days if fever persists or shortness of breath worsens.',
    doctor_signed: false, // Showcases "Pending Doctor Review"
    created_at: '2026-09-06T10:00:00Z'
  }
];

export const INITIAL_MEDICAL_HISTORY: MedicalHistoryItem[] = [
  {
    id: 'hist_1',
    patient_uid: 'patient_demo',
    type: 'visit_report',
    date: '2026-08-20',
    source: 'doc_4',
    source_name: 'Dr. Usman Qureshi (Video)',
    title: 'Hypertension & Vitamin D Consultation',
    diagnosis: 'Mild situational hypertension; Vitamin D insufficiency',
    symptoms: ['Midday lethargy', 'Tension headaches'],
    medications: [
      { name: 'Sunny D 200,000 IU', dosage: '1 ampoule', frequency: 'Bi-weekly', duration: '6 weeks', instructions: 'Oral' }
    ],
    notes: 'Signed and verified by PMC-29103-F'
  },
  {
    id: 'hist_2',
    patient_uid: 'patient_demo',
    type: 'uploaded_doc',
    date: '2026-07-12',
    source: 'self-uploaded',
    source_name: 'Chughtai Lab Diagnostic Report',
    title: 'Complete Blood Count (CBC) & Fasting Lipid Profile',
    diagnosis: 'Normal hemoglobin (12.8 g/dL), Borderline elevated triglycerides',
    lab_values: {
      'Hemoglobin': '12.8 g/dL (Normal)',
      'Total Leukocyte Count (TLC)': '7,200 /uL',
      'Platelets': '265,000 /uL',
      'Fasting Blood Sugar': '94 mg/dL',
      'Serum Triglycerides': '168 mg/dL (Borderline)'
    },
    notes: 'Verified from uploaded laboratory PDF report with AI extraction'
  },
  {
    id: 'hist_3',
    patient_uid: 'patient_demo',
    type: 'uploaded_doc',
    date: '2026-04-05',
    source: 'self-uploaded',
    source_name: 'Prescription Slip (National Hospital)',
    title: 'Allergy & Seasonal Rhinitis Prescription',
    symptoms: ['Nasal congestion', 'Sneezing fits'],
    medications: [
      { name: 'Avamys Nasal Spray', dosage: '2 sprays per nostril', frequency: 'Once daily', duration: '14 days', instructions: 'Morning' },
      { name: 'Rigix (Cetirizine) 10mg', dosage: '1 tablet', frequency: 'At bedtime', duration: '7 days', instructions: 'After dinner' }
    ],
    notes: 'Uploaded legacy prescription photograph'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    user_uid: 'patient_demo',
    type: 'tracker',
    title: 'Dr. Ayesha Tariq is on the way!',
    message: 'Your home visit doctor has started the trip. Estimated arrival in ~12 minutes.',
    read: false,
    created_at: '10 minutes ago',
    related_url: '/consultation/bk_101/tracker'
  },
  {
    id: 'notif_2',
    user_uid: 'patient_demo',
    type: 'report',
    title: 'Medical Report Ready for Review',
    message: 'Your consultation draft report from Dr. Ayesha Tariq is being finalized.',
    read: false,
    created_at: '35 minutes ago',
    related_url: '/consultation/bk_101/report'
  },
  {
    id: 'notif_3',
    user_uid: 'patient_demo',
    type: 'payment',
    title: 'Payment Successful via JazzCash',
    message: 'Rs. 3,150 paid successfully for booking #BK-101.',
    read: true,
    created_at: '1 hour ago',
    related_url: '/payment/bk_101'
  },
  {
    id: 'notif_4',
    user_uid: 'patient_demo',
    type: 'appointment',
    title: 'Upcoming Video Appointment',
    message: 'Consultation with Dr. Bilal Haroon is scheduled for tomorrow at 04:00 PM.',
    read: true,
    created_at: 'Yesterday',
    related_url: '/dashboard/patient/appointments'
  }
];

export const EMERGENCY_FACILITIES = [
  {
    city: 'Nationwide (Pakistan)',
    name: 'Rescue 1122 Medical Emergency Service',
    phone: '1122',
    type: 'Government Ambulance & Paramedic Response',
    address: 'Available in all districts across Punjab, KP, Balochistan, Sindh & Gilgit-Baltistan'
  },
  {
    city: 'Nationwide (Pakistan)',
    name: 'Edhi Foundation Emergency Service',
    phone: '115',
    type: 'Ambulance & Urgent Care Transit',
    address: 'Pakistan-wide 24/7 helpline'
  },
  {
    city: 'Karachi',
    name: 'Aga Khan University Hospital Emergency Department',
    phone: '(021) 111-911-911',
    type: 'Level 1 Trauma & Comprehensive ER',
    address: 'Stadium Road, Karachi'
  },
  {
    city: 'Karachi',
    name: 'Civil Hospital Karachi & Trauma Centre',
    phone: '(021) 99215740',
    type: 'Public Tertiary Emergency Center',
    address: 'Mission Rd, near Dow University, Karachi'
  },
  {
    city: 'Lahore',
    name: 'Shalamar Hospital Emergency & Trauma Care',
    phone: '(042) 111-205-205',
    type: '24/7 Tertiary Emergency Care',
    address: 'Shalimar Link Road, Mughalpura, Lahore'
  },
  {
    city: 'Lahore',
    name: 'Mayo Hospital Emergency Department',
    phone: '(042) 99211100',
    type: 'Public Tertiary Emergency & Burns Unit',
    address: 'Hospital Road, Anarkali, Lahore'
  },
  {
    city: 'Islamabad / Rawalpindi',
    name: 'PIMS (Pakistan Institute of Medical Sciences) ER',
    phone: '(051) 9261170',
    type: 'Federal Apex Emergency Hospital',
    address: 'Sector G-8/3, Islamabad'
  },
  {
    city: 'Islamabad / Rawalpindi',
    name: 'Shifa International Hospital Emergency Services',
    phone: '(051) 8463000',
    type: 'Private Tertiary 24/7 Emergency Center',
    address: 'Pitras Bukhari Road, H-8/4, Islamabad'
  }
];

export const INITIAL_MEDICAL_NOTES: MedicalNote[] = [
  {
    id: 'note_ml_1',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    patient_cnic: '35201-1234567-8',
    author_uid: 'doc_1',
    author_name: 'Dr. Ayesha Tariq',
    author_role: 'doctor',
    author_pmc: 'PMC-48291-P',
    title: 'Official Medical Leave Certificate - Convalescent Bed Rest',
    category: 'medical_leave',
    content: 'Clinical Evaluation: Patient examined presenting with post-viral fatigue and convalescing from febrile illness. Clinical examination reveals mild orthostatic dizziness and low platelet recovery phase. Advised strict medical bed rest for 3 consecutive days from 08-Sep-2026 to 10-Sep-2026. Advised adequate hydration and complete excusal from workplace responsibilities.',
    priority: 'important',
    vitals: {
      bp: '116/74',
      pulse: 76,
      temp_f: 98.6,
      spo2: 98
    },
    leave_details: {
      start_date: '2026-09-08',
      end_date: '2026-09-10',
      total_days: 3,
      reason: 'Post-Viral Fatigue & Convalescent Rest (Platelet Monitoring)',
      patient_cnic: '35201-1234567-8',
      employer_institution: 'Systems Limited / Operations HR',
      duty_resumption_date: '2026-09-11',
      certificate_number: 'MLC-2026-09-4821',
      monthly_quota_index: 1
    },
    tags: ['Medical Leave', 'Certificate', 'PMC Verified', 'Work Excusal'],
    is_pinned: true,
    booking_id: 'bk_101',
    created_at: '2026-09-08T09:00:00.000Z'
  },
  {
    id: 'note_1',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    author_uid: 'doc_1',
    author_name: 'Dr. Ayesha Tariq',
    author_role: 'doctor',
    author_pmc: 'PMC-48291-P',
    title: 'Dengue Convalescent Follow-up & Platelet Monitoring',
    category: 'clinical_observation',
    content: 'Patient evaluated on Day 6 post-fever defervescence. Petechial rash on lower limbs fading well. Platelet count improved to 142,000/μL (up from 84,000/μL). Oral intake adequate; patient tolerating ORS and papaya leaf extract supplement. Advised to continue oral fluids (minimum 2.5L/day), strictly avoid NSAIDs/aspirin, and report immediately if persistent abdominal pain or gum bleeding occurs.',
    priority: 'important',
    vitals: {
      bp: '118/76',
      pulse: 78,
      temp_f: 98.4,
      spo2: 99
    },
    tags: ['Dengue', 'Platelets', 'Infectious Disease', 'Hydration'],
    is_pinned: true,
    booking_id: 'bk_101',
    created_at: '2026-09-07T10:30:00.000Z'
  },
  {
    id: 'note_2',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    author_uid: 'patient_demo',
    author_name: 'Zainab Ahmed',
    author_role: 'patient',
    title: 'Morning Fasting Sugar & BP Log',
    category: 'symptom_journal',
    content: 'Checked morning fasting blood sugar using Accu-Chek before breakfast. Level was 114 mg/dL. Resting blood pressure recorded at 124/82 mmHg after 10 minutes sitting. Mild afternoon dizziness resolved after drinking nimbu pani (lemon water with pinch of salt). Continuing 25-minute brisk walk daily.',
    priority: 'routine',
    vitals: {
      bp: '124/82',
      pulse: 74,
      sugar_mg_dl: 114
    },
    tags: ['Self-Monitoring', 'Blood Glucose', 'Home Log'],
    is_pinned: false,
    created_at: '2026-09-08T08:15:00.000Z'
  },
  {
    id: 'note_3',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    author_uid: 'doc_2',
    author_name: 'Dr. Bilal Haroon',
    author_role: 'doctor',
    author_pmc: 'PMC-39102-K',
    title: 'Hypertension Management & Salt Restriction Plan',
    category: 'follow_up',
    content: 'Ambulatory blood pressure review indicates systolic stabilization with Tab. Amlodipine 5mg OD. Advised reduction of sodium intake to < 2g per day. Emphasized cutting out processed achaar, salty papad, and fried items. Schedule repeat renal function test (serum creatinine & electrolytes) in 4 weeks.',
    priority: 'routine',
    vitals: {
      bp: '122/80',
      pulse: 72
    },
    tags: ['Cardiology', 'Hypertension', 'Diet Plan'],
    is_pinned: false,
    booking_id: 'bk_102',
    created_at: '2026-09-05T14:20:00.000Z'
  },
  {
    id: 'note_4',
    patient_uid: 'patient_demo',
    patient_name: 'Zainab Ahmed',
    author_uid: 'doc_1',
    author_name: 'Dr. Ayesha Tariq',
    author_role: 'doctor',
    author_pmc: 'PMC-48291-P',
    title: 'Severe Drug Allergy: Penicillins / Amoxicillin',
    category: 'allergy_warning',
    content: 'CRITICAL ALERT: Patient experienced severe urticaria and facial angioedema after oral Amoxicillin course in 2023. Strict contraindication to all beta-lactam antibiotics (Penicillins, Augmentin, Ampicillin). In case of bacterial respiratory infection, use Macrolides (Azithromycin/Clarithromycin) or Fluoroquinolones as appropriate.',
    priority: 'urgent',
    tags: ['Allergy Alert', 'Penicillin', 'Contraindication'],
    is_pinned: true,
    created_at: '2026-08-20T11:00:00.000Z'
  }
];

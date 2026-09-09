export interface HospitalInfo {
  id: string;
  name: string;
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi';
  address: string;
  phone: string;
  emergencyHotline: string;
  type: 'Tertiary Hospital' | 'Specialized Institute' | 'University Hospital' | 'Private Medical Center';
  rating: number;
  reviewsCount: number;
  image: string;
  departments: string[];
  hasEmergency247: boolean;
  hasAmbulance: boolean;
}

export interface DiseaseInfo {
  id: string;
  name: string;
  urduName: string;
  category: 'Infectious' | 'Chronic' | 'Pediatric' | 'Respiratory' | 'Dermatology' | 'General';
  description: string;
  urgency: 'Low' | 'Moderate' | 'High' | 'Emergency';
  keySymptoms: string[];
  recommendedSpecialty: string;
  careAdvice: string;
}

export interface PatientTestimonial {
  id: string;
  patientName: string;
  city: string;
  area: string;
  visitType: 'Home Visit' | 'Video Consultation';
  doctorName: string;
  rating: number;
  date: string;
  review: string;
  avatar: string;
}

export const POPULAR_SYMPTOMS = [
  { id: 'sym_fever', label: 'High Fever & Chills', icon: '🌡️', category: 'General', searchKey: 'fever' },
  { id: 'sym_cough', label: 'Cough & Chest Congestion', icon: '🫁', category: 'Respiratory', searchKey: 'cough' },
  { id: 'sym_child', label: 'Child / Pediatric Fever', icon: '👶', category: 'Pediatrics', searchKey: 'pediatric' },
  { id: 'sym_rash', label: 'Skin Rash & Itching', icon: '🩺', category: 'Dermatology', searchKey: 'skin' },
  { id: 'sym_headache', label: 'Migraine & Throbbing Headache', icon: '🧠', category: 'Neurology', searchKey: 'headache' },
  { id: 'sym_bp', label: 'Blood Pressure / Dizziness', icon: '❤️', category: 'Cardiology', searchKey: 'bp' },
  { id: 'sym_stomach', label: 'Stomach Pain & Vomiting', icon: '🤢', category: 'Gastroenterology', searchKey: 'stomach' },
  { id: 'sym_sugar', label: 'Diabetes & High Sugar', icon: '🩸', category: 'Endocrinology', searchKey: 'diabetes' },
];

export const COMMON_DISEASES: DiseaseInfo[] = [
  {
    id: 'dis_dengue',
    name: 'Dengue Fever',
    urduName: 'ڈینگی بخار',
    category: 'Infectious',
    description: 'Mosquito-borne viral infection characterized by sudden high fever, retro-orbital eye pain, severe muscle aching, and low platelet counts.',
    urgency: 'High',
    keySymptoms: ['Sudden high fever (103°F+)', 'Severe headache & behind eyes', 'Joint & bone pain (breakbone)', 'Skin petechial rash'],
    recommendedSpecialty: 'General Physician & Internal Medicine',
    careAdvice: 'Immediate CBC blood test, constant hydration with ORS and papaya leaf extract, avoid aspirin/brufen, rest.'
  },
  {
    id: 'dis_typhoid',
    name: 'Typhoid Fever',
    urduName: 'ٹائیفائیڈ بخار',
    category: 'Infectious',
    description: 'Bacterial infection caused by Salmonella typhi through contaminated food or water, leading to step-ladder persistent fever.',
    urgency: 'Moderate',
    keySymptoms: ['Prolonged step-ladder fever', 'Stomach ache & constipation/diarrhea', 'Extreme fatigue', 'Coated white tongue'],
    recommendedSpecialty: 'Internal Medicine & Infectious Disease',
    careAdvice: 'Blood culture & Typhidot test, prescribed antibiotics course completion, boiled drinking water, soft light diet.'
  },
  {
    id: 'dis_flu',
    name: 'Seasonal Influenza & Viral URI',
    urduName: 'موسمی نزلہ اور زکام',
    category: 'Respiratory',
    description: 'Acute viral infection of the upper respiratory tract commonly circulating during seasonal transitions across Pakistan.',
    urgency: 'Low',
    keySymptoms: ['Runny or congested nose', 'Sore throat & dry cough', 'Mild to moderate fever (100°F)', 'General body aches'],
    recommendedSpecialty: 'General Physician & Family Medicine',
    careAdvice: 'Paracetamol for fever, steam inhalation twice daily, warm honey water, adequate sleep, vitamin C.'
  },
  {
    id: 'dis_diabetes',
    name: 'Type 2 Diabetes Mellitus',
    urduName: 'ذیابیطس / شوگر',
    category: 'Chronic',
    description: 'Chronic metabolic disorder leading to elevated blood glucose levels requiring consistent monitoring and medication management.',
    urgency: 'Moderate',
    keySymptoms: ['Frequent urination at night', 'Excessive thirst & dry mouth', 'Slow-healing sores', 'Unexplained fatigue'],
    recommendedSpecialty: 'Internal Medicine & Diabetologist',
    careAdvice: 'Regular fasting and HbA1c testing, low glycemic diet, daily 30-min walk, strictly adherence to oral hypoglycemics or insulin.'
  },
  {
    id: 'dis_hypertension',
    name: 'Hypertension (High BP)',
    urduName: 'ہائی بلڈ پریشر',
    category: 'Chronic',
    description: 'Elevated arterial blood pressure placing chronic strain on heart, kidneys, and cerebral vessels.',
    urgency: 'Moderate',
    keySymptoms: ['Occipital morning headaches', 'Shortness of breath with mild exertion', 'Dizziness or lightheadedness', 'Nosebleeds in severe cases'],
    recommendedSpecialty: 'Consultant Cardiologist & General Physician',
    careAdvice: 'Daily BP logging, low sodium salt restriction, DASH diet, stress control, never skip prescribed anti-hypertensive drugs.'
  },
  {
    id: 'dis_asthma',
    name: 'Pediatric & Adult Asthma',
    urduName: 'دمہ اور سانس کی الرجی',
    category: 'Pediatric',
    description: 'Chronic inflammation of the airways causing reversible airflow obstruction, heightened by urban smog in Lahore and Karachi.',
    urgency: 'High',
    keySymptoms: ['Audible wheezing sounds', 'Nighttime persistent coughing', 'Chest tightness', 'Breathlessness with activity'],
    recommendedSpecialty: 'Consultant Pulmonologist & Pediatrician',
    careAdvice: 'Keep reliever inhaler accessible at all times, air purifier usage during smog alerts, avoid dust and cold allergens.'
  },
  {
    id: 'dis_gastro',
    name: 'Acute Gastroenteritis',
    urduName: 'پیٹ کی خرابی اور اسہال',
    category: 'General',
    description: 'Stomach and intestinal inflammation causing watery stools, cramps, and dehydration commonly following outside food.',
    urgency: 'Moderate',
    keySymptoms: ['Watery diarrhea', 'Abdominal cramping & spasms', 'Nausea and vomiting', 'Low-grade fever & weakness'],
    recommendedSpecialty: 'General Physician & Gastroenterologist',
    careAdvice: 'Frequent small sips of WHO-formula ORS, zinc supplements for children, banana/rice/toast diet, avoid spicy food.'
  },
  {
    id: 'dis_eczema',
    name: 'Eczema & Atopic Dermatitis',
    urduName: 'جلدی خارش اور الرجی',
    category: 'Dermatology',
    description: 'Inflammatory dry skin condition causing intense itching, redness, flaking, and sensitivity to weather changes.',
    urgency: 'Low',
    keySymptoms: ['Dry, scaly patches', 'Intense itching especially at night', 'Red inflamed flares on joints', 'Cracked skin'],
    recommendedSpecialty: 'Consultant Dermatologist',
    careAdvice: 'Fragrance-free ceramide moisturizers right after lukewarm bathing, avoid harsh soaps, cotton clothing only.'
  }
];

export const PARTNER_HOSPITALS: HospitalInfo[] = [
  {
    id: 'hosp_skm',
    name: 'Shaukat Khanum Memorial Hospital',
    city: 'Lahore',
    address: '7A Block R-3, Johar Town, Lahore',
    phone: '+92 42 35905000',
    emergencyHotline: '042-35905000 Ext 4444',
    type: 'Tertiary Hospital',
    rating: 4.95,
    reviewsCount: 3840,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=500',
    departments: ['Internal Medicine', 'Oncology', 'Emergency Care', 'Diagnostic Imaging', 'Pathology Labs'],
    hasEmergency247: true,
    hasAmbulance: true
  },
  {
    id: 'hosp_aku',
    name: 'Aga Khan University Hospital',
    city: 'Karachi',
    address: 'Stadium Road, Karachi, Sindh',
    phone: '+92 21 111 911 911',
    emergencyHotline: '021-34930051',
    type: 'University Hospital',
    rating: 4.92,
    reviewsCount: 4210,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500',
    departments: ['Pediatrics & Neonatal ICU', 'Pulmonology', 'Cardiology', 'Emergency Medicine', 'Neurology'],
    hasEmergency247: true,
    hasAmbulance: true
  },
  {
    id: 'hosp_shifa',
    name: 'Shifa International Hospital',
    city: 'Islamabad',
    address: 'Pitras Bukhari Road, H-8/4, Islamabad',
    phone: '+92 51 8464646',
    emergencyHotline: '051-8463666',
    type: 'Tertiary Hospital',
    rating: 4.88,
    reviewsCount: 2950,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500',
    departments: ['Emergency Care', 'Pediatric Surgery', 'Critical Care', 'Internal Medicine', 'Cardiology'],
    hasEmergency247: true,
    hasAmbulance: true
  },
  {
    id: 'hosp_national',
    name: 'National Hospital & Medical Centre',
    city: 'Lahore',
    address: 'L-Block, DHA Phase 1, Lahore Cantt',
    phone: '+92 42 111 171 819',
    emergencyHotline: '042-35723821',
    type: 'Private Medical Center',
    rating: 4.85,
    reviewsCount: 1680,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=500',
    departments: ['Family Medicine', 'Cardiology', 'Gynecology', 'Urgent Care', 'Orthopedics'],
    hasEmergency247: true,
    hasAmbulance: true
  },
  {
    id: 'hosp_southcity',
    name: 'South City Hospital',
    city: 'Karachi',
    address: 'Street 3, Block 3, Clifton, Karachi',
    phone: '+92 21 35862301',
    emergencyHotline: '021-35862305',
    type: 'Private Medical Center',
    rating: 4.86,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=500',
    departments: ['Dermatology', 'Obstetrics & Gynecology', 'General Surgery', 'Cardiology', 'ICU'],
    hasEmergency247: true,
    hasAmbulance: true
  },
  {
    id: 'hosp_doctors',
    name: 'Doctors Hospital & Medical Center',
    city: 'Lahore',
    address: '152-G/1, Canal Bank Road, Johar Town, Lahore',
    phone: '+92 42 35302701',
    emergencyHotline: '042-35302705',
    type: 'Tertiary Hospital',
    rating: 4.82,
    reviewsCount: 2210,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=500',
    departments: ['Diabetology & Endocrinology', 'Neurology', 'Critical Care', 'Dialysis', 'Emergency'],
    hasEmergency247: true,
    hasAmbulance: true
  }
];

export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    id: 'test_1',
    patientName: 'Mrs. Saima Tariq',
    city: 'Lahore',
    area: 'DHA Phase 5',
    visitType: 'Home Visit',
    doctorName: 'Dr. Ayesha Tariq',
    rating: 5,
    date: '2 days ago',
    review: 'My 4-year-old daughter spiked a 103°F fever late on a Sunday evening. Instead of dragging her through an overcrowded ER waiting room, Dr. Ayesha arrived at our home within 25 minutes with full pediatric diagnostics. The care was thorough, calm, and truly life-saving.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'test_2',
    patientName: 'Hamza Farooq',
    city: 'Karachi',
    area: 'Clifton Block 4',
    visitType: 'Video Consultation',
    doctorName: 'Dr. Bilal Haroon',
    rating: 5,
    date: 'Last week',
    review: 'Had severe chest congestion and wheezing. The HD video consultation was seamless on 4G, and Dr. Bilal explained my spirometry plan with immense patience. Received my signed digital prescription directly to my phone and ordered medicines via Easypaisa in minutes.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'test_3',
    patientName: 'Khurram Shehzad',
    city: 'Islamabad',
    area: 'F-8/3',
    visitType: 'Home Visit',
    doctorName: 'Dr. Maryam Khan',
    rating: 5,
    date: '3 days ago',
    review: 'My elderly mother suffers from chronic diabetes and mobility pain. Having a PMC certified doctor come directly to our living room with live GPS tracking on the map gave us complete peace of mind. Her CNIC medical history is now updated forever.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const WHY_CURALINK_BENEFITS = [
  {
    icon: 'ShieldCheck',
    title: '100% PMC-Verified Doctors',
    description: 'Every medical practitioner is strictly verified with the Pakistan Medical Commission. Genuine degrees, valid licenses, and verified hospital affiliations.',
    badge: 'Audited Licenses'
  },
  {
    icon: 'MapPin',
    title: 'Convenient Home Physician Visits',
    description: 'Avoid stressful traffic and crowded clinic waiting rooms. Qualified doctors visit your residence at your scheduled time with live GPS tracking.',
    badge: 'Scheduled & Same-Day'
  },
  {
    icon: 'Sparkles',
    title: 'AI-Guided Clinical Triage',
    description: 'Instant symptom assessment protocol built with clinical guidance. Recommends whether you need self-care, a video consultation, or an in-person doctor visit.',
    badge: 'Instant & Free'
  },
  {
    icon: 'FileText',
    title: 'Lifetime CNIC Digital Health Record',
    description: 'Every prescription, vital reading, and clinical note is securely attached to your CNIC. Accessible anytime, downloadable as official signed PDFs.',
    badge: 'Zero Paper Lost'
  },
  {
    icon: 'CreditCard',
    title: 'Transparent Pricing & Local Payments',
    description: 'Clear, upfront consultation fees with zero hidden charges. Pay safely using JazzCash, Easypaisa, Raast instant transfers, or debit cards.',
    badge: 'Rs 1,500 – Rs 3,500'
  },
  {
    icon: 'PhoneCall',
    title: '24/7 Dedicated Care Coordination',
    description: 'Our clinical coordination team is always on standby to assist with appointment bookings, lab queries, and visit logistics.',
    badge: 'Care Support'
  }
];

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  ArrowLeft,
  Building,
  DollarSign,
  Car,
  Video,
  CreditCard,
  FileCheck,
  Calendar,
  Award,
  Search,
  Clock,
  Printer,
  User as UserIcon,
  Tag
} from 'lucide-react';
import { MedicalLeaveCertificateModal } from '../../components/medical/MedicalLeaveCertificateModal';
import { MedicalNote } from '../../types';
import { EmergencyButton } from '../../components/shared/EmergencyButton';

export const DoctorProfileSettingsPage: React.FC = () => {
  const { doctorProfile, updateDoctorProfile, medicalNotes, navigate } = useApp();

  const [bio, setBio] = useState(doctorProfile.bio);
  const [qualifications, setQualifications] = useState(doctorProfile.qualifications);
  const [hospitalAffiliation, setHospitalAffiliation] = useState(doctorProfile.hospital_affiliation);
  const [videoFee, setVideoFee] = useState(doctorProfile.video_fee);
  const [homeVisitFee, setHomeVisitFee] = useState(doctorProfile.home_visit_fee);
  const [homeVisitRadiusKm, setHomeVisitRadiusKm] = useState(doctorProfile.home_visit_radius_km);
  const [offersHomeVisit, setOffersHomeVisit] = useState(doctorProfile.offers_home_visit);
  const [offersVideo, setOffersVideo] = useState(doctorProfile.offers_video);

  const [bankTitle, setBankTitle] = useState('Dr. ' + doctorProfile.name.replace('Dr. ', ''));
  const [bankName, setBankName] = useState('Habib Bank Limited (HBL)');
  const [iban, setIban] = useState('PK36HABB0001234567890102');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Medical Leave Certificate viewer state
  const [selectedCertificateNote, setSelectedCertificateNote] = useState<MedicalNote | null>(null);
  const [leaveSearchQuery, setLeaveSearchQuery] = useState('');

  // All medical leave notes issued by this doctor
  const issuedLeaveNotes = useMemo(() => {
    return (medicalNotes || []).filter(note => {
      if (note.category !== 'medical_leave') return false;
      // Notes authored by this doctor, or doctor role notes in demo
      const isThisDoctor = note.author_uid === doctorProfile.uid || 
        note.author_pmc === doctorProfile.pmc_license_number ||
        note.author_role === 'doctor';
      return isThisDoctor;
    });
  }, [medicalNotes, doctorProfile.uid, doctorProfile.pmc_license_number]);

  // Filtered by search query (patient name, CNIC, diagnosis, certificate number)
  const filteredLeaveNotes = useMemo(() => {
    if (!leaveSearchQuery.trim()) return issuedLeaveNotes;
    const q = leaveSearchQuery.toLowerCase();
    return issuedLeaveNotes.filter(note => {
      const matchPatient = (note.patient_name || '').toLowerCase().includes(q);
      const matchCnic = (note.patient_cnic || note.leave_details?.patient_cnic || '').toLowerCase().includes(q);
      const matchCertNo = (note.leave_details?.certificate_number || '').toLowerCase().includes(q);
      const matchReason = (note.leave_details?.reason || note.title || '').toLowerCase().includes(q);
      const matchEmployer = (note.leave_details?.employer_institution || '').toLowerCase().includes(q);
      return matchPatient || matchCnic || matchCertNo || matchReason || matchEmployer;
    });
  }, [issuedLeaveNotes, leaveSearchQuery]);

  // Distinct patients who received medical leave notes from this doctor
  const uniquePatientsCount = useMemo(() => {
    const patientSet = new Set(issuedLeaveNotes.map(n => n.patient_cnic || n.patient_uid || n.patient_name));
    return patientSet.size;
  }, [issuedLeaveNotes]);

  // Current month count
  const currentMonthKey = useMemo(() => new Date().toISOString().slice(0, 7), []);
  const currentMonthName = useMemo(() => new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }), []);
  const thisMonthIssuedCount = useMemo(() => {
    return issuedLeaveNotes.filter(n => (n.leave_details?.start_date || n.created_at || '').slice(0, 7) === currentMonthKey).length;
  }, [issuedLeaveNotes, currentMonthKey]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorProfile({
      bio,
      qualifications,
      hospital_affiliation: hospitalAffiliation,
      video_fee: Number(videoFee),
      home_visit_fee: Number(homeVisitFee),
      home_visit_radius_km: Number(homeVisitRadiusKm),
      offers_home_visit: offersHomeVisit,
      offers_video: offersVideo
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 pb-20">
      <button
        onClick={() => navigate('/dashboard/doctor')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Practice Dashboard</span>
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Practice Profile & Fees</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure your consultation fee structures, hospital affiliations, and banking remittance details.
          </p>
        </div>
        <EmergencyButton callerRole="doctor" />
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Doctor profile and consultation fee rates updated live on patient search directory.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Verification Strip */}
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
            <div>
              <p className="font-bold text-teal-950">PMC Verified Practitioner</p>
              <p className="text-teal-800 font-mono text-[11px]">License: {doctorProfile.pmc_license_number}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
            Active Status
          </span>
        </div>

        {/* Clinical Bio & Qualifications */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Clinical Profile</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Professional Qualifications & Degrees</label>
            <input
              type="text"
              required
              value={qualifications}
              onChange={e => setQualifications(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Hospital / Clinic Affiliation</label>
            <input
              type="text"
              required
              value={hospitalAffiliation}
              onChange={e => setHospitalAffiliation(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Doctor Biography & Practice Overview</label>
            <textarea
              rows={4}
              required
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 leading-relaxed"
            />
          </div>
        </div>

        {/* Services & Fees (Video & Home Visit) */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Consultation Services & Practice Focus</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Video Service */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-xs text-blue-900">
                  <Video className="w-4 h-4 text-blue-600" />
                  Telehealth Video Consultations
                </span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Active</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Telehealth Consultation Fee (PKR)</label>
                <input
                  type="number"
                  step="100"
                  value={videoFee}
                  onChange={e => setVideoFee(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white"
                />
                <p className="text-[10px] text-gray-500 mt-1">Includes HD video consultation, AI clinical scribe report, digital prescription, and follow-up plan.</p>
              </div>
            </div>

            {/* Home Bedside Care Notification */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-xs text-emerald-950">
                  <Car className="w-4 h-4 text-emerald-700" />
                  Home Bedside Visits (Nurses & Paramedics)
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Dedicated Staff</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Home bedside visits are staffed exclusively by CuraLink's certified <strong>Nurses & Paramedics</strong> (PNC & Rescue 1122 accredited) for economical vitals checks, IV drips, wound care, and injections.
              </p>
              <p className="text-[10px] text-emerald-800 font-medium">
                Physicians remain dedicated to high-volume telehealth consultations and hospital rounds.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Account Info for Earnings Deposit (Part 4 requirement) */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#0F766E]" />
            <span>Earnings Remittance Bank Account (Pakistan IBAN)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Account Title</label>
              <input
                type="text"
                value={bankTitle}
                onChange={e => setBankTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name</label>
              <select
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-600 bg-white"
              >
                <option value="Habib Bank Limited (HBL)">Habib Bank Limited (HBL)</option>
                <option value="Meezan Bank">Meezan Bank</option>
                <option value="United Bank Limited (UBL)">United Bank Limited (UBL)</option>
                <option value="MCB Bank">MCB Bank</option>
                <option value="Allied Bank Limited (ABL)">Allied Bank Limited (ABL)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">24-Character IBAN Number</label>
            <input
              type="text"
              value={iban}
              onChange={e => setIban(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 font-mono focus:outline-none focus:border-teal-600"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#0F766E] hover:bg-[#0B5C56] text-white text-xs font-bold px-6 py-3 rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Update Practice Profile</span>
          </button>
        </div>
      </form>

      {/* ISSUED MEDICAL LEAVE NOTES REGISTRY (DOCTOR'S PATIENT LEAVE AUDIT LOG) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <FileCheck className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Issued Medical Leave Certificates Registry
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Official audit log of all patients issued medical leave excuses by Dr. {doctorProfile.name.replace('Dr. ', '')} under PMC regulations.
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard/doctor/notes')}
            className="self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Issue New Leave Note</span>
          </button>
        </div>

        {/* Regulatory & Usage Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Certificates</span>
            <span className="text-lg font-extrabold text-gray-900 block mt-0.5">{issuedLeaveNotes.length}</span>
            <span className="text-[10px] text-gray-500">All-time issued</span>
          </div>

          <div className="p-3.5 bg-purple-50/60 border border-purple-200/80 rounded-xl">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Issued This Month</span>
            <span className="text-lg font-extrabold text-purple-900 block mt-0.5">{thisMonthIssuedCount}</span>
            <span className="text-[10px] text-purple-600 font-medium">{currentMonthName}</span>
          </div>

          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Patients Certified</span>
            <span className="text-lg font-extrabold text-emerald-900 block mt-0.5">{uniquePatientsCount}</span>
            <span className="text-[10px] text-emerald-600 font-medium">Distinct individuals</span>
          </div>

          <div className="p-3.5 bg-teal-50/60 border border-teal-200/80 rounded-xl">
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Statutory Policy</span>
            <span className="text-xs font-bold text-teal-950 block mt-0.5">Max 2 Notes/Mo</span>
            <span className="text-[10px] text-teal-700">Per verified CNIC cap</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search issued leave by patient name, CNIC, certificate #, or workplace..."
              value={leaveSearchQuery}
              onChange={(e) => setLeaveSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 focus:bg-white focus:outline-none focus:border-purple-600"
            />
          </div>
          {leaveSearchQuery && (
            <button
              onClick={() => setLeaveSearchQuery('')}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Issued Leave Notes List */}
        {filteredLeaveNotes.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 space-y-2">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-gray-800">
              {leaveSearchQuery ? 'No matching medical leave certificates found' : 'No medical leave notes issued yet'}
            </p>
            <p className="text-[11px] text-gray-500 max-w-sm mx-auto">
              {leaveSearchQuery
                ? 'Try searching with a different patient name, CNIC (e.g. 35201-), or certificate serial number.'
                : 'Whenever you issue an official medical leave or sick leave certificate from the Clinical Notes section, it will be catalogued here with full patient details and CNIC tracking.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeaveNotes.map((note) => {
              const patientCnic = note.patient_cnic || note.leave_details?.patient_cnic || 'CNIC on File';
              const certNo = note.leave_details?.certificate_number || `MLC-${note.id.slice(0, 8).toUpperCase()}`;
              const daysCount = note.leave_details?.days_count || 1;
              const startDate = note.leave_details?.start_date || note.created_at;
              const endDate = note.leave_details?.end_date || startDate;
              const returnDate = note.leave_details?.resumption_date || endDate;
              const employer = note.leave_details?.employer_institution || 'Employer / Educational Institution';
              const reason = note.leave_details?.reason || note.title;

              return (
                <div
                  key={note.id}
                  className="p-4 sm:p-5 rounded-2xl border border-purple-100 bg-purple-50/20 hover:bg-purple-50/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    {/* Header line: Patient name & CNIC */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-950 flex items-center gap-1.5">
                        <UserIcon className="w-4 h-4 text-purple-700" />
                        {note.patient_name || 'Patient'}
                      </span>
                      <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-purple-200 text-purple-900 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-purple-600" />
                        CNIC: {patientCnic}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md">
                        {certNo}
                      </span>
                    </div>

                    {/* Medical reason & leave dates */}
                    <div className="text-xs text-gray-700 space-y-1">
                      <p className="font-semibold text-gray-900">
                        Condition: <span className="font-normal text-gray-700">{reason}</span>
                      </p>
                      <div className="flex items-center gap-3 flex-wrap text-[11px] text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-purple-600" />
                          <span>Leave Period: <strong>{startDate}</strong> to <strong>{endDate}</strong> ({daysCount} {daysCount === 1 ? 'day' : 'days'})</span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>Resumption: <strong>{returnDate}</strong></span>
                        <span className="text-gray-300">•</span>
                        <span>Recipient: <strong>{employer}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedCertificateNote(note)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-white hover:bg-purple-100 border border-purple-300 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-purple-600" />
                      <span>View & Print Certificate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Official Certificate Modal */}
      {selectedCertificateNote && (
        <MedicalLeaveCertificateModal
          isOpen={Boolean(selectedCertificateNote)}
          onClose={() => setSelectedCertificateNote(null)}
          note={selectedCertificateNote}
          patientName={selectedCertificateNote.patient_name || 'Patient'}
          patientCnic={selectedCertificateNote.patient_cnic || selectedCertificateNote.leave_details?.patient_cnic || 'CNIC on File'}
          doctorName={selectedCertificateNote.author_name || doctorProfile.name}
          doctorPmc={selectedCertificateNote.author_pmc || doctorProfile.pmc_license_number}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Video, 
  Car, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const DoctorOnboardingPage: React.FC = () => {
  const { 
    currentUser, 
    doctorProfile, 
    updateDoctorProfile, 
    completeDoctorOnboarding, 
    navigate 
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [pmcNumber, setPmcNumber] = useState(doctorProfile.pmc_license_number || 'PMC-48291-P');
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [cnicUploaded, setCnicUploaded] = useState(false);

  // Step 2: Professional Details
  const [specialty, setSpecialty] = useState(doctorProfile.specialty || 'General Physician & Family Medicine');
  const [experience, setExperience] = useState(doctorProfile.experience_years || 10);
  const [qualifications, setQualifications] = useState(doctorProfile.qualifications || 'MBBS, FCPS');
  const [hospitalAffiliation, setHospitalAffiliation] = useState(doctorProfile.hospital_affiliation || 'Services Hospital, Lahore');

  // Step 3: Service Settings
  const [offersVideo, setOffersVideo] = useState(doctorProfile.offers_video ?? true);
  const [offersHomeVisit, setOffersHomeVisit] = useState(doctorProfile.offers_home_visit ?? true);
  const [radiusKm, setRadiusKm] = useState(doctorProfile.home_visit_radius_km || 15);
  const [videoFee, setVideoFee] = useState(doctorProfile.video_fee || 1500);
  const [homeVisitFee, setHomeVisitFee] = useState(doctorProfile.home_visit_fee || 3000);

  // Step 4: Availability Grid
  const [days, setDays] = useState<{ [day: string]: boolean }>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false
  });
  const [timeSlots, setTimeSlots] = useState<{ [day: string]: string[] }>({
    Monday: ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM'],
    Tuesday: ['09:00 AM', '11:30 AM', '02:00 PM', '05:00 PM'],
    Wednesday: ['09:00 AM', '11:30 AM', '03:00 PM', '06:00 PM'],
    Thursday: ['09:00 AM', '11:30 AM', '02:00 PM', '07:00 PM'],
    Friday: ['09:00 AM', '11:00 AM', '03:30 PM', '06:00 PM'],
    Saturday: ['10:00 AM', '01:00 PM'],
    Sunday: []
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitForReview = () => {
    updateDoctorProfile({
      pmc_license_number: pmcNumber,
      specialty,
      experience_years: Number(experience),
      qualifications,
      hospital_affiliation: hospitalAffiliation,
      offers_video: offersVideo,
      offers_home_visit: offersHomeVisit,
      home_visit_radius_km: Number(radiusKm),
      video_fee: Number(videoFee),
      home_visit_fee: Number(homeVisitFee),
      verification_status: 'pending'
    });
    completeDoctorOnboarding();
    setSubmitted(true);
  };

  const toggleDay = (day: string) => {
    setDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* 5-Step Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
          <span className="text-blue-600">Step {step} of 5</span>
          <span>
            {step === 1 ? 'PMC Verification' : 
             step === 2 ? 'Professional Details' : 
             step === 3 ? 'Services & Fees' : 
             step === 4 ? 'Weekly Availability' : 'Review & Submit'}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {!submitted ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* STEP 1: PMC Verification */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Step 1: Credentials
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">PMC Verification Documents</h1>
                <p className="text-xs text-gray-500 mt-1">
                  We cross-reference every doctor with the Pakistan Medical Commission (PMC) registry.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    PMC Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PMC-48291-P"
                    value={pmcNumber}
                    onChange={e => setPmcNumber(e.target.value)}
                    className="w-full text-xs font-mono uppercase px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* License upload */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center space-y-2 bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                    <p className="text-xs font-semibold text-gray-700">PMC Certificate Scan *</p>
                    <p className="text-[11px] text-gray-400">PDF or Clear JPEG</p>
                    {licenseUploaded ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PMC License Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setLicenseUploaded(true)}
                        className="text-xs font-bold text-blue-600 underline cursor-pointer"
                      >
                        Attach Demo PMC Doc
                      </button>
                    )}
                  </div>

                  {/* CNIC upload */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center space-y-2 bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                    <p className="text-xs font-semibold text-gray-700">Doctor CNIC Front & Back *</p>
                    <p className="text-[11px] text-gray-400">Official National Identity</p>
                    {cnicUploaded ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> CNIC Scan Attached
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCnicUploaded(true)}
                        className="text-xs font-bold text-blue-600 underline cursor-pointer"
                      >
                        Attach Demo CNIC Scan
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Professional Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Professional Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Step 2: Experience & Specialty
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">Professional Qualifications</h1>
                <p className="text-xs text-gray-500 mt-1">
                  Shown to patients when booking consultations.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Clinical Specialty *</label>
                  <select
                    value={specialty}
                    onChange={e => setSpecialty(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="General Physician & Family Medicine">General Physician & Family Medicine</option>
                    <option value="Consultant Pulmonologist & Critical Care">Consultant Pulmonologist & Critical Care</option>
                    <option value="Consultant Pediatrician">Consultant Pediatrician</option>
                    <option value="Internal Medicine & Diabetologist">Internal Medicine & Diabetologist</option>
                    <option value="Consultant Dermatologist">Consultant Dermatologist</option>
                    <option value="Consultant Cardiologist">Consultant Cardiologist</option>
                    <option value="Gynecologist & Obstetrician">Gynecologist & Obstetrician</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Years of Clinical Experience *</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={experience}
                      onChange={e => setExperience(Number(e.target.value))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Degrees & Certifications *</label>
                    <input
                      type="text"
                      placeholder="e.g. MBBS (KEMU), FCPS"
                      value={qualifications}
                      onChange={e => setQualifications(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Current Hospital / Clinic Affiliation</label>
                  <input
                    type="text"
                    placeholder="e.g. Aga Khan Hospital, Shaukat Khanum, PIMS"
                    value={hospitalAffiliation}
                    onChange={e => setHospitalAffiliation(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Service Settings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Service Settings */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Step 3: Consultation Settings & Fees
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">Services & Pricing</h1>
                <p className="text-xs text-gray-500 mt-1">
                  Choose the modes you offer and set your consultation fees in PKR.
                </p>
              </div>

              <div className="space-y-6">
                {/* Video toggle & fee */}
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Video className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Offers Video Consultations</p>
                        <p className="text-[11px] text-gray-500">Encrypted telehealth video room with AI note-taking</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={offersVideo}
                        onChange={e => setOffersVideo(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {offersVideo && (
                    <div className="pt-2 border-t border-gray-200">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Video Consultation Fee (PKR)</label>
                      <input
                        type="number"
                        step="100"
                        value={videoFee}
                        onChange={e => setVideoFee(Number(e.target.value))}
                        className="w-48 text-xs font-bold px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* Home Visit toggle, radius & fee */}
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Car className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Offers Home Visits</p>
                        <p className="text-[11px] text-gray-500">In-person doctor bedside visits with live GPS routing</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={offersHomeVisit}
                        onChange={e => setOffersHomeVisit(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {offersHomeVisit && (
                    <div className="pt-2 border-t border-gray-200 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                          <span>Home Visit Service Radius: {radiusKm} km</span>
                          <span className="text-gray-400">Max travel range</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="40"
                          value={radiusKm}
                          onChange={e => setRadiusKm(Number(e.target.value))}
                          className="w-full accent-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Home Visit Fee (PKR)</label>
                        <input
                          type="number"
                          step="100"
                          value={homeVisitFee}
                          onChange={e => setHomeVisitFee(Number(e.target.value))}
                          className="w-48 text-xs font-bold px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-600 bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Availability Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Availability */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Step 4: Weekly Schedule
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">Available Consultation Hours</h1>
                <p className="text-xs text-gray-500 mt-1">
                  Select the days and default consultation shifts you accept.
                </p>
              </div>

              <div className="space-y-3">
                {Object.keys(days).map(day => (
                  <div 
                    key={day} 
                    className={`p-3.5 rounded-xl border transition-all ${
                      days[day] ? 'bg-blue-50/40 border-blue-200' : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={days[day]}
                          onChange={() => toggleDay(day)}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                        <span className="text-xs font-bold text-gray-900">{day}</span>
                      </div>

                      {days[day] ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {timeSlots[day]?.map((slot, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-white border border-blue-200 px-2 py-0.5 rounded font-semibold text-blue-800">
                              {slot}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-400">Off / Unavailable</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Review & Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  Step 5: Final Verification
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">Ready for Verification</h1>
                <p className="text-xs text-gray-500 mt-1">
                  Check your credentials before submitting for PMC verification.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">PMC Registration:</span>
                  <span className="font-bold text-gray-900 uppercase font-mono">{pmcNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Specialty:</span>
                  <span className="font-bold text-gray-900">{specialty}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Experience:</span>
                  <span className="font-bold text-gray-900">{experience} years</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Video Consultation Fee:</span>
                  <span className="font-bold text-blue-700">Rs. {videoFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Home Visit Fee (up to {radiusKm} km):</span>
                  <span className="font-bold text-emerald-700">Rs. {homeVisitFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Upon submission, your account will be reviewed within 24–48 hours. During this period, you may explore your Doctor Console in "Pending Verification" mode.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2.5 text-xs text-gray-600 border border-gray-200 rounded-lg cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmitForReview}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit for review</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Confirmation Screen */
        <div className="bg-white border border-blue-200 rounded-2xl p-8 sm:p-10 shadow-md text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Application Submitted
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              We'll notify you once verified
            </h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              Our clinical governance team is reviewing your PMC credentials ({pmcNumber}). You can access your doctor dashboard now, which will display a "Pending Verification" banner until verified.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard/doctor')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 px-6 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Go to Doctor Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

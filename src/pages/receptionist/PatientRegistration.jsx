import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'

const NAV_LINKS = [
  "Dashboard",
  "Patient Management",
  "Patient Registration",
  "Appointment Management",
  "Queue Management",
  "Billing Collection",
  "Follow-up Management",
]

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  maritalStatus: "",
  nationality: "",
  aadhaar: "",
  mobile: "",
  altPhone: "",
  email: "",
  state: "",
  address: "",
  emergencyName: "",
  relationship: "",
  emergencyPhone: "",
  emergencyEmail: "",
  insuranceProvider: "",
  policyNumber: "",
  validFrom: "",
  validUntil: "",
  coverageAmount: "",
  insuranceType: "",
  department: "",
  assignedDoctor: "",
  patientType: "",
  chiefComplaint: "",
}

function PatientRegistration() {
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("Patient Registration")
  const [form, setForm] = useState(INITIAL_FORM)
  const [allergies, setAllergies] = useState(["Penicillin"])
  const [allergyInput, setAllergyInput] = useState("")
  const [photo, setPhoto] = useState(null)

  const handleNavClick = (link) => {
    setActiveLink(link)
    if (link === "Dashboard")                navigate('/receptionist')
    if (link === "Patient Management")       navigate('/receptionist/patients')
    if (link === "Appointment Management")   navigate('/receptionist/appointments')
    if (link === "Queue Management")         navigate('/receptionist/queue')
    if (link === "Billing Collection")       navigate('/receptionist/billing')
    if (link === "Follow-up Management")     navigate('/receptionist/follow-up')
    if (link === "Patient Registration")     navigate('/receptionist/registration')
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const addAllergy = () => {
    if (allergyInput.trim()) {
      setAllergies(prev => [...prev, allergyInput.trim()])
      setAllergyInput("")
    }
  }

  const removeAllergy = (allergy) => {
    setAllergies(prev => prev.filter(a => a !== allergy))
  }

  const handleRegister = () => {
    console.log("Registering patient:", { ...form, allergies, photo })
    // TODO: wire to API
    navigate('/receptionist/patients')
  }

  const handleSaveDraft = () => {
    console.log("Saved as draft:", { ...form, allergies, photo })
    // TODO: wire to API
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Patient Registration</h2>
            <p className="text-sm text-gray-400">Register a new patient into the system</p>
          </div>
          <button
            onClick={() => navigate('/receptionist/patients')}
            className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            ⊗ Cancel
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Left + Middle: Form sections (span 2 cols) */}
          <div className="col-span-2 flex flex-col gap-6">

            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-700 mb-4">👤 Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    FIRST NAME <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.firstName} onChange={handleChange("firstName")}
                    placeholder="Enter first name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    LAST NAME <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.lastName} onChange={handleChange("lastName")}
                    placeholder="Enter last name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    DATE OF BIRTH <span className="text-red-500">*</span>
                  </label>
                  <input type="date" value={form.dob} onChange={handleChange("dob")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    GENDER <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.gender} onChange={handleChange("gender")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">BLOOD GROUP</label>
                  <input type="text" value={form.bloodGroup} onChange={handleChange("bloodGroup")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">MARITAL STATUS</label>
                  <input type="text" value={form.maritalStatus} onChange={handleChange("maritalStatus")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">NATIONALITY</label>
                  <input type="text" value={form.nationality} onChange={handleChange("nationality")}
                    placeholder="e.g. Indian"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">AADHAAR / ID NUMBER</label>
                  <input type="text" value={form.aadhaar} onChange={handleChange("aadhaar")}
                    placeholder="XXXX-XXXX-XXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-700 mb-4">📞 Contact Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    MOBILE NUMBER <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.mobile} onChange={handleChange("mobile")}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">ALTERNATE PHONE</label>
                  <input type="text" value={form.altPhone} onChange={handleChange("altPhone")}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">EMAIL ADDRESS</label>
                  <input type="email" value={form.email} onChange={handleChange("email")}
                    placeholder="patient@email.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">STATE</label>
                  <input type="text" value={form.state} onChange={handleChange("state")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-medium text-gray-500 mb-1 block">ADDRESS</label>
                  <textarea value={form.address} onChange={handleChange("address")}
                    placeholder="House No., Street, Area, City, PIN Code"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-700 mb-4">⚠ Emergency Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    CONTACT NAME <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.emergencyName} onChange={handleChange("emergencyName")}
                    placeholder="Full name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    RELATIONSHIP <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.relationship} onChange={handleChange("relationship")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    CONTACT PHONE <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.emergencyPhone} onChange={handleChange("emergencyPhone")}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">CONTACT EMAIL</label>
                  <input type="email" value={form.emergencyEmail} onChange={handleChange("emergencyEmail")}
                    placeholder="contact@email.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-700 mb-4">📄 Insurance Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">INSURANCE PROVIDER</label>
                  <input type="text" value={form.insuranceProvider} onChange={handleChange("insuranceProvider")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">POLICY NUMBER</label>
                  <input type="text" value={form.policyNumber} onChange={handleChange("policyNumber")}
                    placeholder="Enter policy number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">VALID FROM</label>
                  <input type="date" value={form.validFrom} onChange={handleChange("validFrom")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">VALID UNTIL</label>
                  <input type="date" value={form.validUntil} onChange={handleChange("validUntil")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">COVERAGE AMOUNT (₹)</label>
                  <input type="number" value={form.coverageAmount} onChange={handleChange("coverageAmount")}
                    placeholder="e.g. 500000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">INSURANCE TYPE</label>
                  <input type="text" value={form.insuranceType} onChange={handleChange("insuranceType")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Photo + Initial Medical Info + Actions */}
          <div className="col-span-1 flex flex-col gap-6">

            {/* Patient Photo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-700 mb-4">Patient Photo</h3>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-3">
                  {photo
                    ? <img src={photo} alt="Patient" className="w-full h-full object-cover" />
                    : <span className="text-3xl text-gray-400">👤</span>
                  }
                </div>
                <label className="border border-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  + Upload Photo
                  <input type="file" accept="image/png, image/jpeg" onChange={handlePhotoUpload} className="hidden" />
                </label>
                <p className="text-xs text-gray-400 mt-2">JPG or PNG, max 2MB</p>
              </div>
            </div>

            {/* Initial Medical Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-700 mb-4">Initial Medical Info</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    DEPARTMENT <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.department} onChange={handleChange("department")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">ASSIGNED DOCTOR</label>
                  <input type="text" value={form.assignedDoctor} onChange={handleChange("assignedDoctor")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    PATIENT TYPE <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={form.patientType} onChange={handleChange("patientType")}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">CHIEF COMPLAINT</label>
                  <textarea value={form.chiefComplaint} onChange={handleChange("chiefComplaint")}
                    placeholder="Brief reason for visit"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">KNOWN ALLERGIES</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {allergies.map(a => (
                      <span key={a} className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {a}
                        <button onClick={() => removeAllergy(a)} className="hover:text-red-800">✕</button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={e => setAllergyInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addAllergy())}
                    placeholder="Add allergy..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRegister}
                className="bg-gray-900 text-white text-sm py-2.5 rounded-lg hover:bg-gray-800 transition"
              >
                ⊙ Register
              </button>
              <button
                onClick={handleSaveDraft}
                className="border border-gray-200 text-sm py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PatientRegistration
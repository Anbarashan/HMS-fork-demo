import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

// Mock patient data — replace with API later
const MOCK_PATIENT = {
  name: "Ananya Krishnan",
  gender: "Female",
  dob: "15 Mar 1993 (32 Y)",
  phone: "9988776655",
  bloodGroup: "B+",
  email: "ananyaKrishnan@gmail.com",
  location: "Vellore, Tamil Nadu",
  photo: null,
  personalInfo: {
    fullName: "ananyaKrishnan@gmail.com",
    address: "Vellore",
    age: "34 years",
    bloodGroup: "B+",
    aadharNo: "9876 5432 1210",
    department: "Cardiology",
  },
  medicalSummary: {
    allergies: "Penicillin, Pollen",
    chronic: "Hypertension",
    age: "34 years",
    bloodGroup: "B+",
    height: "175 cm",
    weight: "72 kg",
  },
  recentVisits: [
    { date: "19 June 26", doctor: "Dr. Ananya Krishnan", dept: "Cardiology" },
    { date: "12 June 26", doctor: "Dr. Ananya Krishnan", dept: "Cardiology" },
    { date: "08 June 26", doctor: "Dr. Ananya Krishnan", dept: "Cardiology" },
    { date: "01 June 26", doctor: "Dr. Ananya Krishnan", dept: "Cardiology" },
  ],
  upcomingFollowUp: {
    day: "24",
    month: "JUN",
    doctor: "Dr. Ananya Krishnan",
    reason: "BP Monitoring Orders",
    time: "10:30 AM",
  },
}

function PatientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("Patient Management")

  const patient = MOCK_PATIENT // TODO: fetch by `id`

  const handleNavClick = (link) => {
    setActiveLink(link)
    if (link === "Dashboard")              navigate('/receptionist')
    if (link === "Patient Management")     navigate('/receptionist/patients')
    if (link === "Patient Registration")   navigate('/receptionist/registration')
    if (link === "Appointment Management") navigate('/receptionist/appointments')
    if (link === "Queue Management")       navigate('/receptionist/queue')
    if (link === "Billing Collection")     navigate('/receptionist/billing')
    if (link === "Follow-up Management")   navigate('/receptionist/follow-up')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <button onClick={() => navigate('/receptionist')} className="hover:text-gray-600">
            Receptionist
          </button>
          <span className="mx-1">›</span>
          <button onClick={() => navigate('/receptionist/patients')} className="font-semibold text-gray-700 hover:text-gray-900">
            Patient Management
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gray-200 overflow-hidden shrink-0">
            {patient.photo
              ? <img src={patient.photo} alt={patient.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">👤</div>
            }
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{patient.name}</h2>

            <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <span>👤</span> {patient.gender}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span>📅</span> {patient.dob}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span>📞</span> {patient.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-red-500">🩸</span> {patient.bloodGroup}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span>✉️</span> {patient.email}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span>📍</span> {patient.location}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info + Recent Visits */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4">Personal Information</h3>
            <div className="flex flex-col gap-2.5 text-sm">
              {Object.entries({
                "Full Name": patient.personalInfo.fullName,
                "Address": patient.personalInfo.address,
                "Age": patient.personalInfo.age,
                "Blood Group": patient.personalInfo.bloodGroup,
                "Aadhar No": patient.personalInfo.aadharNo,
                "Department": patient.personalInfo.department,
              }).map(([label, value]) => (
                <div key={label} className="flex">
                  <span className="text-gray-400 w-32 shrink-0">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Visits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4">Recent Visits</h3>
            <div className="flex flex-col gap-3">
              {patient.recentVisits.map((v, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 w-24 shrink-0">{v.date}</span>
                  <span className="flex-1 text-gray-700">{v.doctor}</span>
                  <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full mr-3">
                    {v.dept}
                  </span>
                  <button className="text-xs text-gray-400 hover:text-blue-500 whitespace-nowrap">👁 View</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medical Summary + Upcoming Follow-up */}
        <div className="grid grid-cols-2 gap-4">

          {/* Medical Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4">Medical Summary</h3>
            <div className="flex flex-col gap-2.5 text-sm">
              {Object.entries({
                "Allergies": patient.medicalSummary.allergies,
                "Chronic": patient.medicalSummary.chronic,
                "Age": patient.medicalSummary.age,
                "Blood Group": patient.medicalSummary.bloodGroup,
                "Height": patient.medicalSummary.height,
                "Weight": patient.medicalSummary.weight,
              }).map(([label, value]) => (
                <div key={label} className="flex">
                  <span className="text-gray-400 w-32 shrink-0">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Follow-up */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Medical Summary</h3>
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="text-center shrink-0">
                  <p className="text-2xl font-bold text-gray-800 leading-none">{patient.upcomingFollowUp.day}</p>
                  <p className="text-xs text-gray-400 uppercase">{patient.upcomingFollowUp.month}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{patient.upcomingFollowUp.doctor}</p>
                  <p className="text-xs text-gray-400">Reason: {patient.upcomingFollowUp.reason}</p>
                  <p className="text-xs text-gray-400">{patient.upcomingFollowUp.time}</p>
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-500 hover:underline mt-4 text-center">
              + Schedule New Follow-up
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PatientProfile
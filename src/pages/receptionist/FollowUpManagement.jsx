import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'
import StatsCard from '../../components/common/StatsCard'

const NAV_LINKS = [
  "Dashboard",
  "Patient Management",
  "Patient Registration",
  "Appointment Management",
  "Queue Management",
  "Billing Collection",
  "Follow-up Management",
]

const FOLLOW_UPS = [
  { id: "P-1001", patient: "Arjun Mehta",   doctor: "Dr. Priya Sharma", lastVisit: "12 Jun 2025", nextFollowUp: "19 Jun 2025", type: "Cardiac Review", status: "Due Today" },
  { id: "P-1002", patient: "Kavitha Rajan", doctor: "Dr. Ravi Kumar",   lastVisit: "10 Jun 2025", nextFollowUp: "19 Jun 2025", type: "Post-op Check",  status: "Due Today" },
  { id: "P-1004", patient: "Sneha Patel",   doctor: "Dr. Arun Nair",    lastVisit: "05 Jun 2025", nextFollowUp: "15 Jun 2025", type: "Neuro Review",   status: "Overdue"   },
  { id: "P-1005", patient: "Rajesh Verma",  doctor: "Dr. Priya Sharma", lastVisit: "15 Jun 2025", nextFollowUp: "22 Jun 2025", type: "BP Monitoring",  status: "Upcoming"  },
  { id: "P-1007", patient: "Vikram Nair",   doctor: "Dr. Arun Nair",    lastVisit: "17 Jun 2025", nextFollowUp: "24 Jun 2025", type: "Physio Review",  status: "Upcoming"  },
]

const STATUS_STYLES = {
  "Due Today": "bg-yellow-100 text-yellow-700",
  "Overdue":   "bg-red-100 text-red-700",
  "Upcoming":  "bg-blue-100 text-blue-700",
}

const INITIAL_SCHEDULE_FORM = {
  patientQuery: "",
  timeSlot: "",
  doctor: "",
  followUpType: "",
  followUpDate: "",
  patientInstructions: "",
  sendSms: false,
  sendEmail: false,
}

function FollowUpManagement() {
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("Follow-up Management")
  const [search, setSearch] = useState("")
  const [scheduleForm, setScheduleForm] = useState(INITIAL_SCHEDULE_FORM)

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

  const handleScheduleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setScheduleForm(prev => ({ ...prev, [field]: value }))
  }

  const handleExport = () => {
    console.log("Exporting follow-ups")
    // TODO: export logic
  }

  const handleScheduleFollowUpHeader = () => {
    console.log("Opening schedule follow-up panel")
    // TODO: scroll to / focus the schedule form
  }

  const handleBook = (id) => {
    console.log("Booking follow-up for patient:", id)
    // TODO: wire to API
  }

  const handleCall = (id) => {
    console.log("Calling patient:", id)
    // TODO: trigger call action
  }

  const handleEmail = (id) => {
    console.log("Emailing patient:", id)
    // TODO: trigger email action
  }

  const handleScheduleFollowUp = () => {
    console.log("Scheduling follow-up:", scheduleForm)
    // TODO: wire to API
    setScheduleForm(INITIAL_SCHEDULE_FORM)
  }

  const filtered = FOLLOW_UPS.filter(f =>
    f.patient.toLowerCase().includes(search.toLowerCase()) ||
    f.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Follow-up Management</h2>
            <p className="text-sm text-gray-400">Track and schedule patient follow-up appointments</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              ⬇ Export
            </button>
            <button
              onClick={handleScheduleFollowUpHeader}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              + Schedule Follow-up
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard icon="📅" label="Due Today"     value={7}  />
          <StatsCard icon="⏰" label="Due This Week" value={31} />
          <StatsCard icon="✅" label="Completed"     value={18} />
          <StatsCard icon="⚠️" label="Overdue"       value={5}  subColor="text-red-500" />
        </div>

        {/* Follow-ups Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">

          <div className="flex items-center gap-3 mb-5">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search patient..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="border border-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
              ▽ Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Doctor</th>
                  <th className="pb-3 font-medium">Last Visit</th>
                  <th className="pb-3 font-medium">Next Follow-up</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3">
                      <p className="font-medium text-gray-800">{f.patient}</p>
                      <p className="text-xs text-gray-400">{f.id}</p>
                    </td>
                    <td className="py-3 text-gray-500">{f.doctor}</td>
                    <td className="py-3 text-gray-500">{f.lastVisit}</td>
                    <td className="py-3 font-medium text-gray-800">{f.nextFollowUp}</td>
                    <td className="py-3">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{f.type}</span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[f.status] || "bg-gray-100 text-gray-600"}`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <button
                        onClick={() => handleBook(f.id)}
                        className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800 transition mr-2"
                      >
                        🗐 Book
                      </button>
                      <button
                        onClick={() => handleCall(f.id)}
                        className="text-xs text-gray-400 hover:text-blue-500 transition mr-2"
                      >
                        📞 Call
                      </button>
                      <button
                        onClick={() => handleEmail(f.id)}
                        className="text-xs text-gray-400 hover:text-blue-500 transition"
                      >
                        ✉ Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule Follow-up Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-700 mb-4">Schedule Follow-up</h3>

          <div className="grid grid-cols-3 gap-6">

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  PATIENT ID OR NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={scheduleForm.patientQuery}
                  onChange={handleScheduleChange("patientQuery")}
                  placeholder="Search patient..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  DOCTOR <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={scheduleForm.doctor}
                  onChange={handleScheduleChange("doctor")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  FOLLOW-UP DATE <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={scheduleForm.followUpDate}
                  onChange={handleScheduleChange("followUpDate")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  TIME SLOT <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={scheduleForm.timeSlot}
                  onChange={handleScheduleChange("timeSlot")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  FOLLOW-UP TYPE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={scheduleForm.followUpType}
                  onChange={handleScheduleChange("followUpType")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">PATIENT INSTRUCTIONS</label>
                <textarea
                  value={scheduleForm.patientInstructions}
                  onChange={handleScheduleChange("patientInstructions")}
                  placeholder="Diet restrictions, medications, tests to bring..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={scheduleForm.sendSms}
                    onChange={handleScheduleChange("sendSms")}
                  />
                  Send SMS reminder
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={scheduleForm.sendEmail}
                    onChange={handleScheduleChange("sendEmail")}
                  />
                  Send Email reminder
                </label>
              </div>

              <button
                onClick={handleScheduleFollowUp}
                className="bg-gray-900 text-white text-sm py-2.5 rounded-lg hover:bg-gray-800 transition"
              >
                ⊙ Schedule Follow-up
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FollowUpManagement
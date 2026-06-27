import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/common/Sidebar'
import StatsCard from '../../components/common/StatsCard'
import StatusBadge from '../../components/common/StatusBadge'

const NAV_LINKS = [
  "Dashboard",
  "Patient Management",
  "Patient Registration",
  "Appointment Management",
  "Queue Management",
  "Billing Collection",
  "Follow-up Management",
]

const APPOINTMENTS = [
  { apptId: "APT-0891", patient: "Arjun Mehta",     doctor: "Dr. Priya Sharma", dateTime: "19 Jun · 09:00", type: "Consultation", status: "Completed"   },
  { apptId: "APT-0892", patient: "Kavitha Rajan",   doctor: "Dr. Ravi Kumar",   dateTime: "19 Jun · 09:30", type: "Follow-up",    status: "In Progress" },
  { apptId: "APT-0893", patient: "Mohammed Farhan", doctor: "Dr. Priya Sharma", dateTime: "19 Jun · 10:00", type: "New Patient",  status: "Waiting"     },
  { apptId: "APT-0894", patient: "Sneha Patel",     doctor: "Dr. Arun Nair",    dateTime: "19 Jun · 10:30", type: "Consultation", status: "Scheduled"   },
  { apptId: "APT-0895", patient: "Rajesh Verma",    doctor: "Dr. Ravi Kumar",   dateTime: "19 Jun · 11:00", type: "Review",       status: "Scheduled"   },
  { apptId: "APT-0896", patient: "Anita Desai",     doctor: "Dr. Arun Nair",    dateTime: "19 Jun · 11:30", type: "Consultation", status: "Cancelled"   },
]

const TYPE_STYLES = {
  Consultation: "bg-gray-100 text-gray-600",
  "Follow-up":  "bg-gray-100 text-gray-600",
  "New Patient":"bg-gray-100 text-gray-600",
  Review:       "bg-gray-100 text-gray-600",
}

const STATUS_STYLES = {
  Completed:    "text-green-600",
  "In Progress":"text-blue-600",
  Waiting:      "text-orange-500",
  Scheduled:    "text-gray-600",
  Cancelled:    "text-red-500",
}

const INITIAL_BOOKING = {
  patientQuery: "",
  department: "",
  doctor: "",
  appointmentDate: "",
  timeSlot: "",
  appointmentType: "",
  consultationFee: "",
}

function AppointmentManagement() {
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("Appointment Management")
  const [search, setSearch] = useState("")
  const [booking, setBooking] = useState(INITIAL_BOOKING)

  const handleNavClick = (link) => {
    setActiveLink(link)
    if (link === "Dashboard")              navigate('/receptionist')
    if (link === "Patient Management")     navigate('/receptionist/patients')
    if (link === "Patient Registration")   navigate('/receptionist/registration')
    if (link === "Queue Management")       navigate('/receptionist/queue')
    if (link === "Billing Collection")      navigate('/receptionist/billing')
    if (link === "Follow-up Management")    navigate('/receptionist/follow-up')
    if (link === "Appointment Management")  navigate('/receptionist/appointments')
  }

  const handleBookingChange = (field) => (e) => {
    setBooking(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleBookAppointment = () => {
    console.log("Booking appointment:", booking)
    // TODO: wire to API
    setBooking(INITIAL_BOOKING)
  }

  const filtered = APPOINTMENTS.filter(a =>
    a.patient.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Appointment Management</h2>
          <p className="text-sm text-gray-400">Schedule and manage all patient appointments</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard icon="📅" label="Total Today"  value={23} />
          <StatsCard icon="✅" label="Completed"    value={11} />
          <StatsCard icon="⏰" label="Upcoming"      value={9}  />
          <StatsCard icon="⛔" label="Cancelled"     value={3}  subColor="text-red-500" />
        </div>

        <div className="grid grid-cols-3 gap-4">

          {/* Appointments Table */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">

            <div className="flex items-center gap-3 mb-5">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search patient or doctor..."
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
                    <th className="pb-3 font-medium">Appt ID</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Doctor</th>
                    <th className="pb-3 font-medium">Date & Time</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(a => (
                    <tr key={a.apptId} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-3 font-mono text-xs text-gray-500">{a.apptId}</td>
                      <td className="py-3 font-medium text-gray-800">{a.patient}</td>
                      <td className="py-3 text-gray-500">{a.doctor}</td>
                      <td className="py-3 text-gray-500 whitespace-nowrap">{a.dateTime}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${TYPE_STYLES[a.type] || "bg-gray-100 text-gray-600"}`}>
                          {a.type}
                        </span>
                      </td>
                      <td className={`py-3 font-medium text-xs ${STATUS_STYLES[a.status] || "text-gray-500"}`}>
                        {a.status}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <button className="text-xs text-gray-400 hover:text-blue-500 transition mr-3">👁 View</button>
                        <button className="text-xs text-red-500 hover:text-red-600 transition">⊗ Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Book Appointment Panel */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-700 mb-4">+ Book Appointment</h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  PATIENT ID OR NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={booking.patientQuery}
                  onChange={handleBookingChange("patientQuery")}
                  placeholder="Search patient..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  DEPARTMENT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={booking.department}
                  onChange={handleBookingChange("department")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  DOCTOR <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={booking.doctor}
                  onChange={handleBookingChange("doctor")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  APPOINTMENT DATE <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={booking.appointmentDate}
                  onChange={handleBookingChange("appointmentDate")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  TIME SLOT <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={booking.timeSlot}
                  onChange={handleBookingChange("timeSlot")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  APPOINTMENT TYPE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={booking.appointmentType}
                  onChange={handleBookingChange("appointmentType")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">CONSULTATION FEE</label>
                <input
                  type="number"
                  value={booking.consultationFee}
                  onChange={handleBookingChange("consultationFee")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleBookAppointment}
                className="bg-gray-900 text-white text-sm py-2.5 rounded-lg hover:bg-gray-800 transition mt-1"
              >
                ⊙ Book Appointment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AppointmentManagement
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

const PATIENTS = [
  { id: "P-1001", name: "Arjun Mehta", age: "34/M", phone: "+91 98765 43210", dept: "Cardiology", lastVisit: "19 Jun 2025", status: "Active" },
  { id: "P-1001", name: "Arjun Mehta", age: "34/M", phone: "+91 98765 43210", dept: "Cardiology", lastVisit: "19 Jun 2025", status: "Active" },
  { id: "P-1001", name: "Arjun Mehta", age: "34/M", phone: "+91 98765 43210", dept: "Cardiology", lastVisit: "19 Jun 2025", status: "Active" },
  { id: "P-1001", name: "Arjun Mehta", age: "34/M", phone: "+91 98765 43210", dept: "Cardiology", lastVisit: "19 Jun 2025", status: "Active" },
  { id: "P-1001", name: "Arjun Mehta", age: "34/M", phone: "+91 98765 43210", dept: "Cardiology", lastVisit: "19 Jun 2025", status: "Active" },
  { id: "P-1001", name: "Arjun Mehta", age: "34/M", phone: "+91 98765 43210", dept: "Cardiology", lastVisit: "19 Jun 2025", status: "Active" },
]

const STATUS_STYLES = {
  Active:   "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-500",
}

function PatientManagement() {
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("Patient Management")
  const [search, setSearch] = useState("")

  const handleNavClick = (link) => {
    setActiveLink(link)
    if (link === "Dashboard")                navigate('/receptionist')
    if (link === "Patient Registration")     navigate('/receptionist/registration')
    if (link === "Appointment Management")   navigate('/receptionist/appointments')
    if (link === "Queue Management")         navigate('/receptionist/queue')
    if (link === "Billing Collection")       navigate('/receptionist/billing')
    if (link === "Follow-up Management")     navigate('/receptionist/follow-up')
    if (link === "Patient Management")       navigate('/receptionist/patients')
  }

  const filtered = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
            <p className="text-sm text-gray-400">Search, view and manage all registered patients</p>
          </div>
          <div className="flex gap-3">
            <button className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
              ⬇ Export
            </button>
            <button
              onClick={() => navigate('/receptionist/registration')}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              👤+ Register New
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard icon="👥" label="Total Patients"   value="2,847" />
          <StatsCard icon="👤" label="New This Month"   value={134} sub="+18% vs last month" subColor="text-green-500" trend="up" />
          <StatsCard icon="💓" label="Active Cases"     value={389} />
          <StatsCard icon="⏰" label="Avg Revisit Days" value={21} />
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

          <div className="flex items-center gap-3 mb-5">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, ID or phone..."
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
                  <th className="pb-3 font-medium">Patient ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Age / Gender</th>
                  <th className="pb-3 font-medium">Phone</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Last Visit</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 font-mono text-xs text-gray-500">{p.id}</td>
                    <td className="py-3 font-medium text-gray-800">{p.name}</td>
                    <td className="py-3 text-gray-500">{p.age}</td>
                    <td className="py-3 text-gray-600">{p.phone}</td>
                    <td className="py-3">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{p.dept}</span>
                    </td>
                    <td className="py-3 text-gray-500">{p.lastVisit}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[p.status] || "bg-gray-100 text-gray-600"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/receptionist/patients/${p.id}`)}
                        className="text-xs text-gray-500 hover:text-blue-500 transition mr-3"
                      >
                        👁 View
                      </button>
                      <button className="text-xs text-gray-500 hover:text-blue-500 transition">🗓 Appt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-400">Showing 1–7 of 2,847 patients</p>
            <div className="flex gap-2">
              <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
                Previous
              </button>
              <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PatientManagement
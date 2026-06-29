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

const INITIAL_QUEUE = [
  { token: "T-009", name: "Sneha Patel",   dept: "Cardiology", counter: "Counter 1", wait: "14 min", priority: false },
  { token: "T-010", name: "Rajesh Verma",  dept: "Ortho",      counter: "Counter 3", wait: "28 min", priority: false },
  { token: "T-011", name: "Anita Desai",   dept: "General",    counter: "Counter 2", wait: "35 min", priority: true  },
  { token: "T-012", name: "Vikram Nair",   dept: "Neurology",  counter: "Counter 1", wait: "42 min", priority: false },
  { token: "T-013", name: "Priya Krishnan",dept: "General",    counter: "Counter 3", wait: "50 min", priority: false },
]

const NOW_SERVING = {
  token: "T-009",
  name: "Sneha Patel",
  age: "31 yrs",
  gender: "Female",
  status: "Active",
  dept: "Cardiology",
  blood: "B+",
  initials: "SP",
}

function QueueManagement() {
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("Queue Management")
  const [queue, setQueue] = useState(INITIAL_QUEUE)
  const [search, setSearch] = useState("")

  const handleNavClick = (link) => {
    setActiveLink(link)
    if (link === "Dashboard")              navigate('/receptionist')
    if (link === "Patient Management")     navigate('/receptionist/patients')
    if (link === "Patient Registration")   navigate('/receptionist/registration')
    if (link === "Appointment Management") navigate('/receptionist/appointments')
    if (link === "Billing Collection")     navigate('/receptionist/billing')
    if (link === "Follow-up Management")   navigate('/receptionist/follow-up')
    if (link === "Queue Management")       navigate('/receptionist/queue')
  }

  const handleCall = (token) => {
    console.log("Calling token:", token)
    // TODO: wire to API — move token to "now serving"
  }

  const handleDelete = (token) => {
    setQueue(prev => prev.filter(q => q.token !== token))
  }

  const handleCallNext = () => {
    console.log("Calling next patient")
    // TODO: wire to API
  }

  const handleRecall = () => {
    console.log("Recalling current patient")
    // TODO: wire to API
  }

  const handleMakeServed = () => {
    console.log("Marking current patient as served")
    // TODO: wire to API
  }

  const handleAddToQueue = () => {
    console.log("Add to queue clicked")
    // TODO: open modal / form
  }

  const handleRefresh = () => {
    console.log("Refreshing queue")
    // TODO: re-fetch from API
  }

  const filteredQueue = queue.filter(q =>
    q.name.toLowerCase().includes(search.toLowerCase()) ||
    q.token.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Queue Management</h2>
            <p className="text-sm text-gray-400">Real-time patient queue · Auto-refreshes every 30s</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </span>
            <button
              onClick={handleRefresh}
              className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-1.5"
            >
              ↻ Refresh
            </button>
            <button
              onClick={handleAddToQueue}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              + Add to Queue
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard icon="👥" label="Total In Queue" value={12} />
          <StatsCard icon="💚" label="Now Serving"    value={NOW_SERVING.token} />
          <StatsCard icon="⏰" label="Avg Wait Time"  value="18 min" />
          <StatsCard icon="✅" label="Served Today"   value={39} sub="+7 vs yesterday" subColor="text-green-500" trend="up" />
        </div>

        {/* Now Serving Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg shrink-0">
              {NOW_SERVING.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-800">{NOW_SERVING.name}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span>{NOW_SERVING.age} | {NOW_SERVING.gender} |</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {NOW_SERVING.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-blue-500 font-medium">{NOW_SERVING.token}</span>
                <span className="text-blue-600 font-semibold">{NOW_SERVING.dept}</span>
                <span className="text-gray-400">Blood: <span className="text-red-500 font-medium">{NOW_SERVING.blood}</span></span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleCallNext}
                className="border border-green-200 text-green-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition"
              >
                Call Next
              </button>
              <button
                onClick={handleRecall}
                className="border border-yellow-200 bg-yellow-50 text-yellow-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-yellow-100 transition"
              >
                Recall
              </button>
              <button
                onClick={handleMakeServed}
                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Make Served
              </button>
            </div>
          </div>
        </div>

        {/* Queue List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Queue List</h3>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            {filteredQueue.map((q, i) => (
              <div
                key={q.token}
                className={`flex items-center justify-between py-3 ${i !== filteredQueue.length - 1 ? "border-b border-gray-50" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-gray-500 w-12">{q.token}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800 text-sm">{q.name}</p>
                      {q.priority && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{q.dept} · {q.counter}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{q.wait}</span>
                  <button
                    onClick={() => handleCall(q.token)}
                    className="border border-gray-200 text-xs px-3 py-1.5 rounded-full hover:bg-gray-50 transition font-medium"
                  >
                    Call
                  </button>
                  <button
                    onClick={() => handleDelete(q.token)}
                    className="text-gray-400 hover:text-red-500 transition text-sm"
                    title="Remove from queue"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default QueueManagement
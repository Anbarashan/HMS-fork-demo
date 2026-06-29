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

const INVOICES = [
  { invoiceId: "INV-2501", patient: "Arjun Mehta",   date: "19 Jun", service: "Consultation + ECG",  total: 2500, paid: 2500, balance: 0,    status: "Paid"    },
  { invoiceId: "INV-2502", patient: "Kavitha Rajan", date: "19 Jun", service: "Consultation",         total: 800,  paid: 0,    balance: 800,  status: "Pending" },
  { invoiceId: "INV-2503", patient: "Mohammed Farhan", date: "19 Jun", service: "X-Ray + Consultation", total: 3200, paid: 2000, balance: 1200, status: "Partial" },
  { invoiceId: "INV-2504", patient: "Sneha Patel",   date: "18 Jun", service: "MRI + Consultation",   total: 8500, paid: 0,    balance: 8500, status: "Overdue" },
  { invoiceId: "INV-2505", patient: "Rajesh Verma",  date: "18 Jun", service: "Blood Tests + Consult",total: 2100, paid: 2100, balance: 0,    status: "Paid"    },
]

const STATUS_STYLES = {
  Paid:    "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Partial: "bg-blue-100 text-blue-700",
  Overdue: "bg-red-100 text-red-700",
}

const SELECTED_PATIENT = {
  name: "Mohammed Farhan",
  totalAmount: 3200,
  amountPaid: 2000,
  balanceDue: 1200,
}

const INITIAL_COLLECT_FORM = {
  patientId: "",
  amountToCollect: "",
  paymentMode: "",
  referenceId: "",
  remarks: "",
}

function BillingCollection() {
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("Billing Collection")
  const [search, setSearch] = useState("")
  const [collectForm, setCollectForm] = useState(INITIAL_COLLECT_FORM)

  const handleNavClick = (link) => {
    setActiveLink(link)
    if (link === "Dashboard")              navigate('/receptionist')
    if (link === "Patient Management")     navigate('/receptionist/patients')
    if (link === "Patient Registration")   navigate('/receptionist/registration')
    if (link === "Appointment Management") navigate('/receptionist/appointments')
    if (link === "Queue Management")       navigate('/receptionist/queue')
    if (link === "Follow-up Management")   navigate('/receptionist/follow-up')
    if (link === "Billing Collection")     navigate('/receptionist/billing')
  }

  const handleCollectChange = (field) => (e) => {
    setCollectForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleCollectAndGenerateReceipt = () => {
    console.log("Collecting payment:", collectForm)
    // TODO: wire to API
  }

  const handlePrintInvoice = () => {
    console.log("Printing invoice for:", SELECTED_PATIENT.name)
    // TODO: trigger print
  }

  const handleLabDetails = () => {
    console.log("Viewing lab details for patient ID:", collectForm.patientId)
    // TODO: navigate to lab details / fetch info
  }

  const handleCreateInvoice = () => {
    console.log("Create invoice clicked")
    // TODO: open invoice creation modal
  }

  const handleExport = () => {
    console.log("Exporting billing data")
    // TODO: export logic
  }

  const handleView = (invoiceId) => {
    console.log("Viewing invoice:", invoiceId)
    // TODO: navigate to invoice detail
  }

  const handlePrint = (invoiceId) => {
    console.log("Printing invoice:", invoiceId)
    // TODO: trigger print
  }

  const handleCollect = (invoiceId) => {
    console.log("Collecting payment for invoice:", invoiceId)
    // TODO: open collect modal / scroll to collect panel
  }

  const filtered = INVOICES.filter(inv =>
    inv.patient.toLowerCase().includes(search.toLowerCase()) ||
    inv.invoiceId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar links={NAV_LINKS} activeLink={activeLink} onLinkClick={handleNavClick} />

      <main className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Billing Collection</h2>
            <p className="text-sm text-gray-400">Manage patient invoices and payment collection</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              ⬇ Export
            </button>
            <button
              onClick={handleCreateInvoice}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              + Create Invoice
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatsCard icon="💲" label="Today's Collection" value="₹42,500" sub="+15% vs yesterday" subColor="text-green-500" trend="up" />
          <StatsCard icon="📄" label="Invoices Raised"    value={28} />
          <StatsCard icon="⏰" label="Pending Amount"     value="₹18,400" />
          <StatsCard icon="⛔" label="Overdue"            value="₹6,200" subColor="text-red-500" />
        </div>

        {/* Search */}
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

        {/* Collect Payment Panel */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-700 mb-4">💳 Collect Payment</h3>

          <div className="grid grid-cols-4 gap-4 items-start">

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">PATIENT ID</label>
                <input
                  type="text"
                  value={collectForm.patientId}
                  onChange={handleCollectChange("patientId")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleLabDetails}
                className="bg-green-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-green-600 transition"
              >
                ⊙ Lab Details
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  AMOUNT TO COLLECT (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={collectForm.amountToCollect}
                  onChange={handleCollectChange("amountToCollect")}
                  placeholder="1200"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  PAYMENT MODE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={collectForm.paymentMode}
                  onChange={handleCollectChange("paymentMode")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">REFERENCE / TRANSACTION ID</label>
                <input
                  type="text"
                  value={collectForm.referenceId}
                  onChange={handleCollectChange("referenceId")}
                  placeholder="For card / UPI"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">REMARKS</label>
                <textarea
                  value={collectForm.remarks}
                  onChange={handleCollectChange("remarks")}
                  placeholder="Any additional notes"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleCollectAndGenerateReceipt}
                className="bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition"
              >
                ⊙ Collect & Generate Receipt
              </button>
              <button
                onClick={handlePrintInvoice}
                className="border border-gray-200 bg-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                🖨 Print Invoice
              </button>
            </div>

            {/* Patient summary card */}
            <div className="bg-white rounded-lg p-4 border border-orange-100">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Patient</span>
                  <span className="font-semibold text-gray-800">{SELECTED_PATIENT.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="font-semibold text-gray-800">₹{SELECTED_PATIENT.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid</span>
                  <span className="font-semibold text-gray-800">₹{SELECTED_PATIENT.amountPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="text-red-500 font-medium">Balance Due</span>
                  <span className="text-red-500 font-bold">₹{SELECTED_PATIENT.balanceDue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-medium">Invoice #</th>
                  <th className="pb-3 font-medium">Patient</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium"></th>
                  <th className="pb-3 font-medium text-right">Paid</th>
                  <th className="pb-3 font-medium text-right">Balance</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.invoiceId} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 font-mono text-xs text-gray-500">{inv.invoiceId}</td>
                    <td className="py-3 font-medium text-gray-800">{inv.patient}</td>
                    <td className="py-3 text-gray-500">{inv.date}</td>
                    <td className="py-3">
                      <p className="text-xs text-gray-400">{inv.service}</p>
                      <p className="font-medium text-gray-700">₹{inv.total.toLocaleString()}</p>
                    </td>
                    <td className="py-3 text-right text-green-600 font-medium">₹{inv.paid.toLocaleString()}</td>
                    <td className={`py-3 text-right font-medium ${inv.balance > 0 ? "text-red-500" : "text-gray-400"}`}>
                      ₹{inv.balance.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[inv.status] || "bg-gray-100 text-gray-600"}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleView(inv.invoiceId)}
                        className="text-xs text-gray-400 hover:text-blue-500 transition mr-3"
                      >
                        👁 View
                      </button>
                      <button
                        onClick={() => handlePrint(inv.invoiceId)}
                        className="text-xs text-gray-400 hover:text-blue-500 transition mr-3"
                      >
                        🖨 Print
                      </button>
                      {inv.balance > 0 && (
                        <button
                          onClick={() => handleCollect(inv.invoiceId)}
                          className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
                        >
                          🗐 Collect
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BillingCollection
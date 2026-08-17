// src/pages/DashboardPage.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AppLayout from "../components/AppLayout";

// =========================================================
// STATIC MOCK DATA
// =========================================================
const APPLICATIONS = [
  {
    id: "FDA-2026-0417",
    productName: "Amoxicillin 500mg Capsule",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-06-12",
    status: "Under review",
  },
  {
    id: "FDA-2026-0398",
    productName: "Paracetamol 250mg/5mL Syrup",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-05-28",
    status: "Submitted",
  },
  {
    id: "FDA-2026-0355",
    productName: "Losartan Potassium 50mg Tablet",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-04-15",
    status: "Approved",
  },
  {
    id: "FDA-2026-0312",
    productName: "Cetirizine HCl 10mg Tablet",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-03-02",
    status: "For compliance",
  },
  {
    id: "FDA-2026-0287",
    productName: "Multivitamins + Minerals Softgel",
    type: "Minor Variation-Notification (MiV-N)",
    dateSubmitted: "2026-01-20",
    status: "Rejected",
  },
];

// Submissions trend for the last 6 months (separate mock dataset,
// so the chart has more than one data point per month to work with)
const MONTHLY_TREND = [
  { month: "Jan", submitted: 3, approved: 2 },
  { month: "Feb", submitted: 5, approved: 3 },
  { month: "Mar", submitted: 4, approved: 4 },
  { month: "Apr", submitted: 6, approved: 5 },
  { month: "May", submitted: 7, approved: 4 },
  { month: "Jun", submitted: 8, approved: 6 },
];

const STATUS_COLORS = {
  Submitted: "#9ca3af",
  "Under review": "#d4af52",
  Approved: "#0b513c",
  "For compliance": "#d97706",
  Rejected: "#dc2626",
};

// =========================================================
// DERIVED STATS (computed from APPLICATIONS)
// =========================================================
const totalApplications = APPLICATIONS.length;

const statusCounts = APPLICATIONS.reduce((acc, app) => {
  acc[app.status] = (acc[app.status] || 0) + 1;
  return acc;
}, {});

const STATUS_BREAKDOWN = Object.keys(STATUS_COLORS).map((status) => ({
  name: status,
  value: statusCounts[status] || 0,
}));

const needsAttention =
  (statusCounts["For compliance"] || 0) + (statusCounts["Rejected"] || 0);

const STAT_CARDS = [
  {
    label: "Total Applications",
    value: totalApplications,
    hint: "All time",
  },
  {
    label: "Under Review",
    value: statusCounts["Under review"] || 0,
    hint: "Currently with FDA",
  },
  {
    label: "Approved",
    value: statusCounts["Approved"] || 0,
    hint: "This year",
  },
  {
    label: "Needs Attention",
    value: needsAttention,
    hint: "Compliance or rejected",
  },
];

// =========================================================
// STATUS BADGE (same styling as My Applications)
// =========================================================
function StatusBadge({ status }) {
  const styles = {
    Submitted: "bg-gray-100 text-gray-600 border-gray-200",
    "Under review": "bg-[#d4af52]/10 text-[#8a6d1f] border-[#d4af52]/30",
    Approved: "bg-emerald-50 text-[#0b513c] border-emerald-200",
    "For compliance": "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
        styles[status] || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

// =========================================================
// STAT CARD
// =========================================================
function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-ink/50">
        {label}
      </p>
      <p className="font-display text-3xl text-ink mt-2">{value}</p>
      <p className="text-xs text-ink/40 mt-1">{hint}</p>
    </div>
  );
}

// =========================================================
// PAGE
// =========================================================
export default function DashboardPage() {
  const recentApplications = APPLICATIONS.slice(0, 5);

  return (
    <AppLayout>
      <div className="px-10 py-10">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-forest mb-2">
          Overview
        </p>
        <h1 className="font-display text-3xl text-ink mb-8">Welcome back</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
          {/* Submissions trend */}
          <div className="lg:col-span-2 rounded-lg border border-line bg-surface p-6">
            <h2 className="font-display text-lg text-ink mb-1">
              Submissions vs. Approvals
            </h2>
            <p className="text-xs text-ink/50 mb-4">Last 6 months</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_TREND} barGap={4}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="submitted"
                    name="Submitted"
                    fill="#d4af52"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="approved"
                    name="Approved"
                    fill="#0b513c"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status breakdown */}
          <div className="rounded-lg border border-line bg-surface p-6">
            <h2 className="font-display text-lg text-ink mb-1">
              Status Breakdown
            </h2>
            <p className="text-xs text-ink/50 mb-4">All applications</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STATUS_BREAKDOWN}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {STATUS_BREAKDOWN.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 space-y-1.5">
              {STATUS_BREAKDOWN.filter((s) => s.value > 0).map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2 text-ink/70">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[s.name] }}
                    />
                    {s.name}
                  </span>
                  <span className="font-medium text-ink">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent applications */}
        <div className="rounded-lg border border-line bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <div>
              <h2 className="font-display text-lg text-ink">
                Recent Applications
              </h2>
              <p className="text-xs text-ink/50">Your latest submissions</p>
            </div>
            <button
              type="button"
              onClick={() => {
                console.log("Navigate to My Applications");
                // TODO: navigate("/applications")
              }}
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:bg-gray-50"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Reference No.
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Product Name
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Date Submitted
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-line last:border-b-0 hover:bg-gray-50/40"
                  >
                    <td className="px-5 py-4 font-mono text-xs text-ink/70">
                      {application.id}
                    </td>
                    <td className="px-5 py-4 text-ink">
                      {application.productName}
                    </td>
                    <td className="px-5 py-4 text-ink/70">
                      {new Date(application.dateSubmitted).toLocaleDateString(
                        "en-PH",
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={application.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

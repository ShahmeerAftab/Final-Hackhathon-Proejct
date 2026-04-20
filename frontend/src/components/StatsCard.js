/**
 * StatsCard — Dashboard metric card
 */
export default function StatsCard({ icon, label, value, change, positive = true }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-brand-50 border border-brand-100 rounded-lg flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
        }`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-extrabold text-slate-900 mb-0.5">{value}</p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  );
}

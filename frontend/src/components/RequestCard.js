import Link from "next/link";
import Badge from "./Badge";

/**
 * RequestCard — Stack Overflow-style question card
 * Left: stats column  |  Right: content
 */
export default function RequestCard({
  id, title, description, tags, category,
  urgency, status, author, avatar, createdAt, helperCount, views,
}) {
  const urgencyMap = {
    high:   { label: "High",   variant: "high" },
    medium: { label: "Medium", variant: "medium" },
    low:    { label: "Low",    variant: "low" },
  };
  const u = urgencyMap[urgency] ?? { label: urgency, variant: "default" };

  return (
    <div className="bg-white border border-slate-200 rounded question-card flex overflow-hidden">

      {/* Stats column */}
      <div className="hidden sm:flex flex-col items-center justify-start gap-3 px-4 py-5 bg-slate-50 border-r border-slate-200 min-w-[76px] text-center shrink-0">
        <div>
          <p className="text-base font-bold text-slate-700">{helperCount}</p>
          <p className="text-xs text-slate-400 leading-tight">helpers</p>
        </div>
        <div>
          <p className="text-base font-bold text-slate-700">{views}</p>
          <p className="text-xs text-slate-400 leading-tight">views</p>
        </div>
        <div className={`w-9 h-9 rounded flex items-center justify-center text-xs font-semibold ${
          status === "solved"
            ? "bg-emerald-500 text-white"
            : helperCount > 0
              ? "border border-emerald-500 text-emerald-600"
              : "border border-slate-300 text-slate-400"
        }`}>
          {status === "solved" ? "✓" : helperCount}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 min-w-0">
        <Link href={`/request/${id}`}>
          <h3 className="text-sm font-semibold text-brand hover:text-brand-dark leading-snug mb-2 line-clamp-2 transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => <Badge key={tag} variant="tag">{tag}</Badge>)}
          <Badge variant="category">{category}</Badge>
          <Badge variant={u.variant}>{u.label}</Badge>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant={status === "solved" ? "solved" : "open"}>
            {status === "solved" ? "✓ Solved" : "Unanswered"}
          </Badge>
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-5 h-5 bg-brand-50 rounded-full flex items-center justify-center text-xs font-bold text-brand">
              {avatar}
            </div>
            <span className="text-xs text-brand font-medium">{author}</span>
            <span className="text-xs text-slate-400">{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Badge from "@/components/Badge";
import { requests, helpers } from "@/lib/data";
import RequestDetailActions from "./RequestDetailActions";

function getRequestById(id) {
  return requests.find((r) => r.id === id) ?? null;
}

/**
 * Request Detail Page — "/request/[id]"
 * params is a Promise in Next.js 16+
 */
export default async function RequestDetailPage({ params }) {
  const { id } = await params;
  const request = getRequestById(id);
  if (!request) notFound();

  const urgencyMap = {
    high:   { label: "🔴 High",   variant: "high" },
    medium: { label: "🟡 Medium", variant: "medium" },
    low:    { label: "🟢 Low",    variant: "low" },
  };
  const u = urgencyMap[request.urgency] ?? { label: request.urgency, variant: "default" };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-5 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-brand transition-colors">Questions</Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-xs">{request.title.slice(0, 50)}…</span>
        </nav>

        {/* Question card */}
        <div className="bg-white border border-slate-200 rounded-lg mb-5 overflow-hidden shadow-sm">
          {/* Orange top stripe */}
          <div className="h-1 bg-brand" />

          <div className="p-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="category">{request.category}</Badge>
              <Badge variant={u.variant}>{u.label}</Badge>
              <Badge variant={request.status === "solved" ? "solved" : "open"}>
                {request.status === "solved" ? "✓ Solved" : "Open"}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-slate-900 leading-snug mb-4">
              {request.title}
            </h1>

            {/* Body */}
            <p className="text-slate-600 leading-relaxed text-sm mb-5">{request.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {request.tags.map((tag) => <Badge key={tag} variant="tag">{tag}</Badge>)}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-brand-50 rounded-full flex items-center justify-center text-xs font-bold text-brand">
                  {request.avatar}
                </div>
                <span>
                  Asked by <span className="font-semibold text-brand">{request.author}</span>
                </span>
              </div>
              <span>· {request.createdAt}</span>
              <span>· 👁 {request.views} views</span>
              <span>· 🙋 {request.helperCount} helpers</span>
            </div>

            <RequestDetailActions isSolved={request.status === "solved"} />
          </div>
        </div>

        {/* Helpers */}
        <div>
          <h2 className="text-base font-bold text-slate-800 mb-3">
            {helpers.length} Helper{helpers.length !== 1 ? "s" : ""} Offering Support
          </h2>

          <div className="space-y-3">
            {helpers.map((helper) => (
              <div key={helper.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {helper.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{helper.name}</p>
                    <p className="text-xs text-slate-400">
                      {helper.role} · <span className="text-brand font-medium">⭐ {helper.reputation} rep</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded p-3 leading-relaxed">
                  {helper.message}
                </p>

                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-semibold bg-brand text-white rounded hover:bg-brand-dark transition-colors">
                    ✓ Accept Help
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 text-center">
          <Link href="/explore" className="text-sm text-brand hover:underline font-medium">
            ← Back to all questions
          </Link>
        </div>
      </div>
    </div>
  );
}

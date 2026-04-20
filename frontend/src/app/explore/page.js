"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import RequestCard from "@/components/RequestCard";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { requests, categories, urgencyLevels } from "@/lib/data";

/**
 * Explore Page — "/explore"
 */
export default function ExplorePage() {
  const { loading } = useAuth();
  const [search, setSearch]                     = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUrgency, setSelectedUrgency]   = useState("All");
  const [sortBy, setSortBy]                     = useState("newest");

  const filteredRequests = requests.filter((req) => {
    const q = search.toLowerCase();
    const matchSearch  = req.title.toLowerCase().includes(q) || req.tags.some((t) => t.toLowerCase().includes(q));
    const matchCat     = selectedCategory === "All" || req.category === selectedCategory;
    const matchUrgency = selectedUrgency  === "All" || req.urgency  === selectedUrgency;
    return matchSearch && matchCat && matchUrgency;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-7 h-7 border-[3px] border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">All Questions</h1>
              <p className="text-sm text-slate-500">{filteredRequests.length} question{filteredRequests.length !== 1 ? "s" : ""}</p>
            </div>
            <Link href="/create">
              <Button variant="primary" size="md">Ask Question</Button>
            </Link>
          </div>

          {/* Search */}
          <div className="relative mt-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Search by title or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent hover:border-slate-400 transition-colors"
            />
          </div>

          {/* Sort tabs */}
          <div className="flex gap-0.5 mt-3">
            {["newest", "votes", "unanswered"].map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-all capitalize ${
                  sortBy === s
                    ? "bg-brand text-white border-brand"
                    : "text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-5">

          {/* Sidebar filters */}
          <aside className="w-full lg:w-52 shrink-0 space-y-4">

            {/* Category */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-brand-50 border-b border-brand-100">
                <p className="text-xs font-bold text-brand uppercase tracking-wide">Category</p>
              </div>
              <div className="p-2 space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-brand-50 text-brand font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-brand"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-3 py-2 bg-brand-50 border-b border-brand-100">
                <p className="text-xs font-bold text-brand uppercase tracking-wide">Urgency</p>
              </div>
              <div className="p-2 space-y-0.5">
                {urgencyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedUrgency(level)}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors ${
                      selectedUrgency === level
                        ? "bg-brand-50 text-brand font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-brand"
                    }`}
                  >
                    {level === "All" ? "All urgency" : `${level} priority`}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {(selectedCategory !== "All" || selectedUrgency !== "All") && (
              <button
                onClick={() => { setSelectedCategory("All"); setSelectedUrgency("All"); }}
                className="w-full text-xs text-red-500 hover:bg-red-50 py-2 rounded border border-red-200 transition-colors"
              >
                ✕ Clear filters
              </button>
            )}
          </aside>

          {/* Question list */}
          <div className="flex-1 space-y-2">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((r) => <RequestCard key={r.id} {...r} />)
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
                <p className="text-3xl mb-3">🔍</p>
                <h3 className="text-base font-bold text-slate-800 mb-1">No questions found</h3>
                <p className="text-sm text-slate-500 mb-4">Try different filters or search terms.</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => { setSearch(""); setSelectedCategory("All"); setSelectedUrgency("All"); }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

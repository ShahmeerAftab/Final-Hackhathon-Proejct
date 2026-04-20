"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import RequestCard from "@/components/RequestCard";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { dashboardStats, recentRequests } from "@/lib/data";

/**
 * Dashboard Page — "/dashboard"
 */
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-[3px] border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Verifying session…</p>
        </div>
      </div>
    );
  }

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} user={user} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top navbar */}
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-base font-bold text-slate-800">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/create">
                <Button variant="primary" size="sm">+ Ask Question</Button>
              </Link>
              <div
                className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold"
                title={user?.username}
              >
                {initials}
              </div>
              <button
                onClick={logout}
                className="hidden sm:block text-xs text-slate-400 hover:text-red-500 transition-colors font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-7 space-y-7">

          {/* Welcome banner */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Welcome back, <span className="text-brand">{user?.username}</span>! 👋
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">{user?.email}</p>
            </div>
            <Link href="/create">
              <Button variant="primary" size="sm">+ New question</Button>
            </Link>
          </div>

          {/* Stats */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Overview</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat) => (
                <StatsCard key={stat.label} {...stat} />
              ))}
            </div>
          </section>

          {/* Recent questions */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Questions</h3>
              <Link href="/explore" className="text-sm text-brand hover:underline font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-2">
              {recentRequests.map((r) => <RequestCard key={r.id} {...r} />)}
            </div>
          </section>

          {/* Quick actions */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: "✏️", label: "Ask a Question",    desc: "Post a new help request",   href: "/create",  accent: "hover:border-brand" },
                { icon: "🔍", label: "Explore Questions", desc: "Browse and help others",     href: "/explore", accent: "hover:border-brand" },
                { icon: "🚪", label: "Sign Out",           desc: "Log out of your account",   href: null,       accent: "hover:border-red-300" },
              ].map((action) =>
                action.href ? (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`bg-white border border-slate-200 rounded-lg p-4 flex items-start gap-3 hover:shadow-sm transition-all ${action.accent}`}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{action.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
                    </div>
                  </Link>
                ) : (
                  <button
                    key={action.label}
                    onClick={logout}
                    className={`bg-white border border-slate-200 rounded-lg p-4 flex items-start gap-3 hover:shadow-sm transition-all text-left w-full ${action.accent}`}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{action.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
                    </div>
                  </button>
                )
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

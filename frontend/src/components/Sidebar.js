"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sidebar — Dashboard navigation (white + brand accent)
 */
const navItems = [
  { label: "Dashboard",    href: "/dashboard", icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  )},
  { label: "Explore",      href: "/explore", icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  )},
  { label: "Ask for Help", href: "/create", icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
  )},
  { label: "My Requests",  href: "/dashboard", icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
  )},
  { label: "Contributors", href: "/explore", icon: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  )},
];

export default function Sidebar({ onClose, user }) {
  const pathname = usePathname();
  const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : "?";

  return (
    <aside className="w-60 bg-white border-r border-slate-200 min-h-screen flex flex-col shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2 px-5 h-14 border-b border-slate-200 shrink-0">
        <div className="h-[3px] bg-brand absolute top-0 left-0 right-0" />
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-7 h-7 bg-brand rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
              <path d="M12 2C8.5 6 7 9 8 12.5c.5 2 2 3.5 4 4-1-1.5-1.5-3-.5-5 1 2.5 3 4 5 4 0-3-1-5.5-5-13.5z"/>
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">
            Helplytics<span className="text-brand">AI</span>
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-50 text-brand border-r-2 border-brand"
                  : "text-slate-600 hover:text-brand hover:bg-brand-50"
              }`}
            >
              <span className={isActive ? "text-brand" : "text-slate-400"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user?.username || "Guest"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

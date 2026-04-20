import Link from "next/link";
import Navbar from "@/components/Navbar";
import { features, communityStats } from "@/lib/data";

/**
 * Landing Page — "/" (professional white + brand orange)
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ════════════════════════════════════════
          HERO — two-column layout
      ════════════════════════════════════════ */}
      <section className="hero-bg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                Community Q&amp;A · AI-matched experts
              </div>

              <h1 className="text-4xl sm:text-[3.2rem] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-5">
                Every developer<br />
                gets <span className="gradient-text">unstuck</span> here.
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                Post your question, get matched with verified experts in minutes.
                Help others and build a reputation that proves your skills.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded hover:bg-brand-dark transition-colors shadow-md text-sm"
                >
                  Get started free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 text-slate-700 font-medium border border-slate-300 rounded hover:border-slate-400 hover:bg-slate-50 transition-colors text-sm"
                >
                  Browse questions
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {["JD", "SM", "AK", "RB", "TC"].map((init) => (
                    <div
                      key={init}
                      className="w-8 h-8 rounded-full bg-brand-50 border-2 border-white flex items-center justify-center text-xs font-bold text-brand"
                    >
                      {init[0]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  Trusted by <span className="font-semibold text-slate-800">12,400+</span> developers — free forever
                </p>
              </div>
            </div>

            {/* Right: product preview card */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Shadow card for depth */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-brand-100 rounded-xl opacity-60" />

                {/* Main preview card */}
                <div className="relative bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                  {/* Orange top stripe */}
                  <div className="h-1.5 bg-brand" />

                  <div className="p-5">
                    {/* Question row */}
                    <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-100">
                      <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                        JD
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 leading-snug mb-1">
                          How do I fix CORS errors in Express.js with credentials?
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>Posted 2 min ago</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded text-xs font-medium">🔴 High</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-1.5 mb-4">
                      {["Node.js", "Express", "CORS"].map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-brand-50 text-brand border border-brand-100 text-xs rounded font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* AI match box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 bg-brand rounded flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-slate-700">AI matched 3 experts</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { n: "Alex K.", r: "Backend Expert", rep: "2.4k", active: true },
                          { n: "Sara M.", r: "Node.js Dev",    rep: "1.8k", active: false },
                        ].map((e) => (
                          <div key={e.n} className={`flex items-center justify-between px-2.5 py-2 rounded border ${e.active ? "bg-white border-brand-100" : "bg-white border-slate-200"}`}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-brand-50 rounded-full flex items-center justify-center text-xs font-bold text-brand">
                                {e.n[0]}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-800">{e.n}</p>
                                <p className="text-xs text-slate-400">{e.r}</p>
                              </div>
                            </div>
                            <span className="text-xs text-brand font-semibold">⭐ {e.rep}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-2.5 bg-brand text-white text-xs font-semibold rounded hover:bg-brand-dark transition-colors">
                      ✓ Accept help from Alex K.
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating notification badge */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</div>
                <span className="text-xs font-medium text-slate-700">Solved in 4 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS BAR — white cards, not orange block
      ════════════════════════════════════════ */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {communityStats.map((s) => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-lg p-5 text-center shadow-sm">
                <p className="text-2xl sm:text-3xl font-extrabold text-brand">{s.value}</p>
                <p className="text-slate-500 text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-3">Why Helplytics AI</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Built for how developers actually work
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm">
              No fluff. Just the tools that get you from stuck to shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-brand hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 bg-brand-50 border border-brand-100 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:bg-brand group-hover:border-brand transition-all">
                  <span className="group-hover:grayscale-0">{f.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-3">Simple process</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">From stuck to solved in 3 steps</h2>
            <p className="text-slate-500 text-sm">The fastest path from a blocked developer to a working solution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[17%] right-[17%] h-px bg-slate-300" />
            {[
              { step: "1", title: "Post your question", desc: "Describe the problem, add tags, set urgency. AI helps you write a clear, searchable question in seconds." },
              { step: "2", title: "Get matched instantly", desc: "Our AI routes your question to experts with the right skills. You get notified the moment someone responds." },
              { step: "3", title: "Solve & earn reputation", desc: "Accept the best answer, mark it resolved. Both you and your helper gain community reputation points." },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="w-12 h-12 bg-brand text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-5 shadow-md relative z-10">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand font-semibold text-sm uppercase tracking-widest mb-4">Join the community</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to stop being stuck?
          </h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed">
            Thousands of developers help each other every single day.<br />It's free, and always will be.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand text-white font-semibold rounded hover:bg-brand-dark transition-colors text-sm"
          >
            Create your free account
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                  <path d="M12 2C8.5 6 7 9 8 12.5c.5 2 2 3.5 4 4-1-1.5-1.5-3-.5-5 1 2.5 3 4 5 4 0-3-1-5.5-5-13.5z"/>
                </svg>
              </div>
              <span className="text-slate-300 text-sm font-bold">Helplytics AI</span>
            </div>
            <p className="text-slate-600 text-xs">© 2025 Helplytics AI · Built for developers, by developers.</p>
            <div className="flex gap-5 text-xs text-slate-500">
              <Link href="/explore" className="hover:text-brand transition-colors">Explore</Link>
              <Link href="/auth"    className="hover:text-brand transition-colors">Sign up</Link>
              <Link href="/auth"    className="hover:text-brand transition-colors">Log in</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

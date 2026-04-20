"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Textarea } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { categories } from "@/lib/data";

/**
 * Create Request Page — "/create"
 */
export default function CreatePage() {
  const { loading } = useAuth();

  const [form, setForm] = useState({ title: "", description: "", tags: "", category: "", urgency: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSubmit(e) { e.preventDefault(); setSubmitted(true); }

  const categoryOptions = categories.filter((c) => c !== "All");
  const urgencyOptions = [
    { value: "low",    label: "🟢 Low — Not urgent, just curious" },
    { value: "medium", label: "🟡 Medium — Need help soon" },
    { value: "high",   label: "🔴 High — Blocking my work right now" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-7 h-7 border-[3px] border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-brand-50 border-2 border-brand-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">🎉</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Question Posted!</h2>
          <p className="text-slate-500 mb-6">Experts have been notified and will respond shortly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/explore"><Button variant="primary">Browse Questions</Button></Link>
            <Button variant="secondary" onClick={() => setSubmitted(false)}>Ask Another</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-5 flex items-center gap-1.5">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-brand transition-colors">Questions</Link>
          <span>/</span>
          <span className="text-slate-600">Ask a Question</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Ask a Question</h1>
          <p className="text-sm text-slate-500 mt-1">Get help from our community of developers worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5">
              <Input
                label="Question Title" name="title" required
                placeholder="e.g. How do I fix a CORS error in Express.js?"
                value={form.title} onChange={handleChange}
              />
              <Textarea
                label="Detailed Description" name="description" rows={7} required
                placeholder={"Describe your problem:\n• What you're trying to do\n• What you've already tried\n• Any error messages you're seeing"}
                value={form.description} onChange={handleChange}
              />
              <Input
                label="Tags (comma-separated)" name="tags"
                placeholder="e.g. React, Node.js, TypeScript"
                value={form.tags} onChange={handleChange}
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category" value={form.category} onChange={handleChange} required
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent hover:border-slate-400 transition-colors"
                >
                  <option value="" disabled>Select a category</option>
                  {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Urgency */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Urgency <span className="text-red-500">*</span>
                </label>
                <select
                  name="urgency" value={form.urgency} onChange={handleChange} required
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent hover:border-slate-400 transition-colors"
                >
                  <option value="" disabled>How urgent?</option>
                  {urgencyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary">Post Your Question</Button>
              <Link href="/explore"><Button variant="secondary">Cancel</Button></Link>
            </div>
          </form>

          {/* Tips panel */}
          <aside className="space-y-4">
            <div className="bg-brand-50 border border-brand-100 rounded-lg p-4">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <span className="text-brand">💡</span> Writing a good question
              </h3>
              <ul className="text-xs text-slate-600 space-y-2">
                {[
                  "Summarize the problem in the title",
                  "Describe what you've already tried",
                  "Include error messages if any",
                  "Add relevant tags",
                  "Set urgency honestly",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-1.5">
                    <span className="text-brand mt-0.5 font-bold">›</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Community rules</h3>
              <ul className="text-xs text-slate-500 space-y-2">
                {[
                  "Be specific and clear",
                  "Search before posting",
                  "Be respectful to helpers",
                  "Mark solved when resolved",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-1.5">
                    <span className="text-slate-300 mt-0.5 font-bold">›</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

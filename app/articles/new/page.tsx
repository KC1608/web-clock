"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/car-data";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { ArrowLeft, Send, CheckCircle2, AlertCircle, ShieldCheck, Lock } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const supabase = createClient();

  const [form, setForm] = useState({
    title: "",
    category: "Engines",
    authorName: "",
    authorRole: "Mechanic / Enthusiast",
    summary: "",
    introduction: "",
    howItWorks: "",
    keyMetricLabel: "Operating Spec",
    keyMetricValue: "",
    tags: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);
          setForm((prev) => ({
            ...prev,
            authorName: prev.authorName || user.user_metadata?.full_name || user.email?.split("@")[0] || "",
          }));
        }
      } catch (e) {
        console.error("Auth check error:", e);
      } finally {
        setLoadingUser(false);
      }
    };
    checkUser();
  }, [supabase]);

  const handleGoogleSignIn = async () => {
    const redirectUrl = `${window.location.origin}/auth/callback?next=/articles/new`;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const steps = form.howItWorks
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (steps.length === 0) {
        throw new Error("Please provide at least 1 step explaining how the system works.");
      }

      const technicalHighlights = [
        {
          label: form.keyMetricLabel || "Key Parameter",
          value: form.keyMetricValue || "Variable based on setup",
        },
      ];

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          authorName: form.authorName,
          authorRole: form.authorRole,
          summary: form.summary,
          introduction: form.introduction,
          howItWorks: steps,
          technicalHighlights,
          tags: form.tags,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit guide.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/articles/${data.article.slug}`);
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Technical Guides
          </Link>

          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              Community Contributor
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Contribute Automotive Knowledge
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              Share how a car component functions—whether it&apos;s a wastegate, rotary engine, short-ram intake, cat-back exhaust, or projector lens.
            </p>
          </div>

          {/* Anti-Bot Verification Banner */}
          {!loadingUser && !currentUser && (
            <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-200">
                    Spam &amp; Bot Prevention Active
                  </h4>
                  <p className="text-xs text-amber-300/80 mt-0.5">
                    Sign in with your Google / Gmail account so your article can be verified and attributed to your profile.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-zinc-950 shrink-0 transition-colors"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#1e1e1e"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#1e1e1e"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#1e1e1e"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#1e1e1e"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          )}

          {currentUser && (
            <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Verified Author: <strong>{currentUser.email}</strong>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">
                Bot-Shielded
              </span>
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>Article published successfully! Redirecting to your guide...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Component Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Mechanical Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. How External Wastegates Prevent Boost Creep"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Author details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Your Name or Handle *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ApexTuner99"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Your Role / Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g. Turbo Fabricator / Track Enthusiast"
                  value={form.authorRole}
                  onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                One-Sentence Summary
              </label>
              <input
                type="text"
                placeholder="Quick hook on why this component or concept matters."
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Introduction / Engineering Context */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Engineering Overview / Context *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Explain the background, purpose, and physics of this part..."
                value={form.introduction}
                onChange={(e) => setForm({ ...form, introduction: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Step-by-step How It Works */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                How It Works (1 step per line) *
              </label>
              <p className="text-xs text-zinc-500 mb-2">
                Describe the sequence of motion, gases, fluid, or electricity. Each new line will render as a distinct step.
              </p>
              <textarea
                rows={5}
                required
                placeholder={`1. Exhaust gas pressurizes against the valve face.\n2. Boost reference line applies pressure to the diaphragm actuator.\n3. The spring opens the poppet valve to vent excess exhaust gas.\n4. Pressure stabilizes at target manifold PSI.`}
                value={form.howItWorks}
                onChange={(e) => setForm({ ...form, howItWorks: e.target.value })}
                className="w-full font-mono text-sm rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Technical highlight metric */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Highlight Metric Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flow Velocity / Spring Rating"
                  value={form.keyMetricLabel}
                  onChange={(e) => setForm({ ...form, keyMetricLabel: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Metric Value
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14.5 PSI / 38mm / 950°C"
                  value={form.keyMetricValue}
                  onChange={(e) => setForm({ ...form, keyMetricValue: e.target.value })}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Turbo, Wastegate, Boost, Tuning"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-950 hover:from-red-500 hover:to-amber-500 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {submitting ? (
                  <>Publishing Knowledge...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Publish Technical Guide
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

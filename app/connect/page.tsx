"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConnectMessage } from "@/lib/car-data";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  MessageSquare,
  Send,
  Mail,
  Car,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Flame,
  ShieldCheck,
} from "lucide-react";

export default function ConnectPage() {
  const [messages, setMessages] = useState<ConnectMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const supabase = createClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    favoriteCar: "",
    interestArea: "Engines & Internals",
    message: "",
  });

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/connect");
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error("Failed to load community thoughts:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Check user auth state
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        setForm((prev) => ({
          ...prev,
          name: prev.name || user.user_metadata?.full_name || "",
          email: user.email || prev.email,
        }));
      }
    };
    checkUser();
  }, [supabase]);

  const handleGoogleSignIn = async () => {
    const redirectUrl = `${window.location.origin}/auth/callback?next=/connect`;
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
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setSuccess(true);
      setForm((prev) => ({
        ...prev,
        favoriteCar: "",
        message: "",
      }));
      fetchMessages();
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
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-semibold text-red-400">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>The Gearhead Gathering</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Let&apos;s Connect &amp; Talk Cars
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Drop your thoughts, ideas for articles, or dream car builds along with your verified email so we can reach out, exchange automotive knowledge, and talk shop.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Connection Form (Left Column, 7 Cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-red-500" />
                    Drop Your Thoughts &amp; Email
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Protected against bot spam via Google Authentication.
                  </p>
                </div>

                {!currentUser && (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/90 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    Sign in with Google
                  </button>
                )}
              </div>

              {currentUser && (
                <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Authenticated with Gmail: <strong>{currentUser.email}</strong>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">
                    Bot-Verified
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
                  <span>Thank you! Your message was submitted to the community feed. We&apos;ll be in touch!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Your Name or Handle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Favorite Car / Build */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Favorite Car / Engine Build
                    </label>
                    <div className="relative">
                      <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="e.g. Nissan GT-R / BMW M3 E46 / Miata"
                        value={form.favoriteCar}
                        onChange={(e) => setForm({ ...form, favoriteCar: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  {/* Interest Area */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Topic You Want to Discuss
                    </label>
                    <select
                      value={form.interestArea}
                      onChange={(e) => setForm({ ...form, interestArea: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="Engines & Internals">Engines &amp; Internals (Pistons, Cams, Valves)</option>
                      <option value="Turbos & Superchargers">Turbos, Superchargers &amp; Wastegates</option>
                      <option value="Cold Air Intakes & Fueling">Cold Air Intakes &amp; Fuel Injection</option>
                      <option value="Exhaust Scavenging & Headers">Exhaust Scavenging, Headers &amp; Downpipes</option>
                      <option value="Matrix LED & Headlight Tech">Matrix LED &amp; Headlight Tech</option>
                      <option value="Suspension & Aerodynamics">Suspension, Aero &amp; Track Setup</option>
                    </select>
                  </div>
                </div>

                {/* Message / Thoughts */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Your Thoughts, Questions &amp; What We Should Discuss *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you're working on, questions about mechanical parts, or automotive topics you'd like to explore..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-red-950 hover:from-red-500 hover:to-amber-500 transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {submitting ? (
                    <>Sending thoughts...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Post Thoughts &amp; Connect
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Community Feed / Discussion Wall (Right Column, 5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-500" />
                  Community Thoughts Wall
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  {messages.length} Enthusiasts Connected
                </span>
              </div>

              {loading ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center text-xs text-zinc-500">
                  Loading community thoughts...
                </div>
              ) : messages.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center text-xs text-zinc-400">
                  Be the first to leave your thoughts and connect!
                </div>
              ) : (
                <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">{msg.name}</p>
                          {msg.favoriteCar && (
                            <p className="text-[11px] text-red-400 font-medium flex items-center gap-1 mt-0.5">
                              <Car className="h-3 w-3" />
                              {msg.favoriteCar}
                            </p>
                          )}
                        </div>
                        <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400 shrink-0">
                          {msg.interestArea}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        &ldquo;{msg.message}&rdquo;
                      </p>

                      <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                        <span className="font-mono text-zinc-400">{msg.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

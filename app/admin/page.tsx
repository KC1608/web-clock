"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminAccessDenied from "@/components/admin/AdminAccessDenied";
import { createClient } from "@/utils/supabase/client";
import { isAdmin, getAdminEmails } from "@/lib/admin-auth";
import { ConnectMessage, CarArticle } from "@/lib/car-data";
import type { User } from "@supabase/supabase-js";
import {
  ShieldCheck,
  Mail,
  FileText,
  Trash2,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Database,
  Users,
  Loader2,
  TrendingUp,
  Flame,
  Gauge,
  Sparkles,
} from "lucide-react";

export default function AdminPortalPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "articles" | "team">("leads");

  // Data states
  const [messages, setMessages] = useState<ConnectMessage[]>([]);
  const [articles, setArticles] = useState<CarArticle[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchLeadQuery, setSearchLeadQuery] = useState("");
  const [searchArticleQuery, setSearchArticleQuery] = useState("");

  // Action status states
  const [actionNotice, setActionNotice] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUser(user);

        if (user && isAdmin(user.email)) {
          // Fetch leads
          const resMessages = await fetch("/api/connect");
          const dataMessages = await resMessages.json();
          if (dataMessages.messages) setMessages(dataMessages.messages);

          // Fetch articles
          const resArticles = await fetch("/api/articles");
          const dataArticles = await resArticles.json();
          if (dataArticles.articles) setArticles(dataArticles.articles);
        }
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setLoading(false);
        setLoadingData(false);
      }
    };

    checkAuthAndLoad();
  }, [supabase]);

  // Lead deletion
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this message?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete message");

      setMessages((prev) => prev.filter((m) => m.id !== id));
      setActionNotice({ text: "Message removed from database.", type: "success" });
    } catch (err) {
      console.error(err);
      setActionNotice({ text: "Error deleting message.", type: "error" });
    } finally {
      setDeletingId(null);
      setTimeout(() => setActionNotice(null), 3000);
    }
  };

  // Article deletion
  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the guide "${title}"?`)) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete article");

      setArticles((prev) => prev.filter((a) => a.id !== id && a.slug !== id));
      setActionNotice({ text: `Article "${title}" removed.`, type: "success" });
    } catch (err) {
      console.error(err);
      setActionNotice({ text: "Error deleting article.", type: "error" });
    } finally {
      setDeletingId(null);
      setTimeout(() => setActionNotice(null), 3000);
    }
  };

  // Export leads to CSV
  const handleExportCSV = () => {
    if (messages.length === 0) return;
    const headers = ["Name", "Email", "Favorite Car", "Topic", "Message", "Submitted At"];
    const rows = messages.map((m) => [
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${(m.favoriteCar || "").replace(/"/g, '""')}"`,
      `"${m.interestArea.replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      `"${new Date(m.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `revpulse-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered queries
  const filteredMessages = useMemo(() => {
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
        (m.favoriteCar && m.favoriteCar.toLowerCase().includes(searchLeadQuery.toLowerCase()))
    );
  }, [messages, searchLeadQuery]);

  const filteredArticles = useMemo(() => {
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchArticleQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchArticleQuery.toLowerCase()) ||
        a.author.name.toLowerCase().includes(searchArticleQuery.toLowerCase())
    );
  }, [articles, searchArticleQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Loader2 className="h-5 w-5 animate-spin text-red-500" />
            <span>Verifying administrator credentials...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Access check
  if (!currentUser || !isAdmin(currentUser.email)) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AdminAccessDenied currentUser={currentUser} />
        </main>
        <Footer />
      </div>
    );
  }

  const adminEmails = getAdminEmails();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Action Notification Banner */}
          {actionNotice && (
            <div
              className={`mb-6 rounded-xl border p-4 text-xs font-semibold flex items-center gap-2 ${
                actionNotice.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}
            >
              {actionNotice.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              <span>{actionNotice.text}</span>
            </div>
          )}

          {/* Admin Header */}
          <header className="border-b border-zinc-800 pb-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-red-600 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                  Admin Portal
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  Authenticated: {currentUser.email}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
                RevPulse Command Center
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Manage visitor leads, moderate car technical guides, and inspect database activity.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300">
                <Database className="h-3.5 w-3.5" />
                Supabase Sync: Active
              </span>
            </div>
          </header>

          {/* KPI Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Leads</span>
                <Mail className="h-4 w-4 text-red-400" />
              </div>
              <p className="text-3xl font-black text-white">{messages.length}</p>
              <span className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                Car Enthusiast Inquiries
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Published Guides</span>
                <FileText className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-3xl font-black text-white">{articles.length}</p>
              <span className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1">
                <Gauge className="h-3 w-3 text-amber-400" />
                Technical Articles
              </span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Categories</span>
                <Flame className="h-4 w-4 text-orange-400" />
              </div>
              <p className="text-3xl font-black text-white">6 Active</p>
              <span className="text-[11px] text-zinc-400 mt-1">Engines, Turbos, Intakes...</span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Admins Active</span>
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-3xl font-black text-white">{adminEmails.length}</p>
              <span className="text-[11px] text-zinc-400 mt-1">Authorized Whitelisted</span>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-800 mb-6 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "leads"
                  ? "border-red-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Let&apos;s Connect Leads ({messages.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("articles")}
              className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "articles"
                  ? "border-red-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Articles &amp; Guides ({articles.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("team")}
              className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "team"
                  ? "border-red-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Admin Team &amp; Whitelist
            </button>
          </div>

          {/* TAB 1: Leads & Connect Submissions */}
          {activeTab === "leads" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search by name, email, car, or message content..."
                    value={searchLeadQuery}
                    onChange={(e) => setSearchLeadQuery(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={messages.length === 0}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors shrink-0 disabled:opacity-50"
                >
                  <Download className="h-4 w-4 text-emerald-400" />
                  Export to CSV
                </button>
              </div>

              {loadingData ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-xs text-zinc-400">
                  Loading database records...
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 p-12 text-center">
                  <Mail className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
                  <p className="text-sm font-semibold text-white">No submissions found</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Visitor messages from the &ldquo;Let&apos;s Connect&rdquo; hub will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">
                        <th className="p-4">Sender / Handle</th>
                        <th className="p-4">Email Address</th>
                        <th className="p-4">Car Build</th>
                        <th className="p-4">Topic &amp; Thoughts</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {filteredMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-zinc-900/60 transition-colors">
                          <td className="p-4 font-bold text-white whitespace-nowrap">{msg.name}</td>
                          <td className="p-4 font-mono text-zinc-300">{msg.email}</td>
                          <td className="p-4 text-red-400 font-medium whitespace-nowrap">
                            {msg.favoriteCar || "—"}
                          </td>
                          <td className="p-4 max-w-md">
                            <span className="inline-block rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400 font-medium mb-1">
                              {msg.interestArea}
                            </span>
                            <p className="text-zinc-200 line-clamp-2 leading-relaxed">&ldquo;{msg.message}&rdquo;</p>
                          </td>
                          <td className="p-4 text-zinc-400 whitespace-nowrap">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              {/* Reply via Gmail */}
                              <a
                                href={`mailto:${msg.email}?subject=RevPulse AutoTech - Let's Talk Cars!&body=Hi ${encodeURIComponent(
                                  msg.name
                                )},%0D%0A%0D%0AThanks for reaching out through RevPulse AutoTech! I saw your note about ${encodeURIComponent(
                                  msg.favoriteCar || msg.interestArea
                                )}.%0D%0A%0D%0A`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-red-600/10 border border-red-500/30 px-2.5 py-1 text-[11px] font-bold text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                              >
                                Reply via Gmail
                              </a>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteMessage(msg.id)}
                                disabled={deletingId === msg.id}
                                className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-600/20 hover:text-red-400 transition-colors"
                                title="Delete submission"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Articles CMS & Moderation */}
          {activeTab === "articles" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search guides by title, category, or author..."
                    value={searchArticleQuery}
                    onChange={(e) => setSearchArticleQuery(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <Link
                  href="/articles/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-4 py-2 text-xs font-bold text-white hover:from-red-500 hover:to-amber-500 transition-all shrink-0"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Write New Guide
                </Link>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="p-4">Guide Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Reading Time</th>
                      <th className="p-4">Published Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-zinc-900/60 transition-colors">
                        <td className="p-4 font-bold text-white max-w-xs sm:max-w-md">
                          <Link
                            href={`/articles/${art.slug}`}
                            className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                          >
                            {art.title}
                            <ExternalLink className="h-3 w-3 text-zinc-500 shrink-0" />
                          </Link>
                        </td>
                        <td className="p-4">
                          <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-red-400 border border-red-500/20 whitespace-nowrap">
                            {art.category}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-zinc-300">
                          {art.author.name}
                          <span className="block text-[10px] text-zinc-500">{art.author.role}</span>
                        </td>
                        <td className="p-4 text-zinc-400 whitespace-nowrap">{art.readingTime}</td>
                        <td className="p-4 text-zinc-400 whitespace-nowrap">{art.publishedAt}</td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/articles/${art.slug}`}
                              className="rounded-lg bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                            >
                              View
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDeleteArticle(art.id, art.title)}
                              disabled={deletingId === art.id}
                              className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-600/20 hover:text-red-400 transition-colors"
                              title="Delete guide"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Admin Whitelist */}
          {activeTab === "team" && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  Authorized Administrators Whitelist
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Only accounts with these verified Google/Gmail addresses are granted access to this dashboard.
                </p>
              </div>

              <div className="space-y-2">
                {adminEmails.map((email, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs"
                  >
                    <div className="flex items-center gap-2 font-mono text-zinc-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {email}
                    </div>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                      Super Admin
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 text-xs text-zinc-400 space-y-2">
                <p className="font-semibold text-zinc-200">How to add more admin users:</p>
                <p>
                  To grant access to additional partners or mechanics, add their email addresses separated by commas to the <code>ADMIN_EMAILS</code> environment variable in your <code>.env</code> file or Vercel Project Settings:
                </p>
                <pre className="rounded bg-zinc-900 p-2 font-mono text-zinc-300 text-[11px] overflow-x-auto">
                  ADMIN_EMAILS=choprakartik10@gmail.com,partner@gmail.com
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

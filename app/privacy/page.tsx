import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText, ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - RevPulse AutoTech",
  description:
    "Privacy Policy for RevPulse AutoTech explaining how we handle authentication, user data, and community contributions.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 7, 2026";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <header className="border-b border-zinc-800 pb-8 mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-400 mb-3">
              <Shield className="h-3.5 w-3.5" />
              <span>Legal &amp; Data Transparency</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="space-y-10 text-zinc-300 text-sm sm:text-base leading-relaxed">
            {/* Overview */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-red-500" />
                1. Overview
              </h2>
              <p>
                At <strong>RevPulse AutoTech</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Platform&rdquo;), we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains what data we collect when you visit our website, sign in using Google authentication, contribute car knowledge, or submit messages via our &ldquo;Let&apos;s Connect&rdquo; hub.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                2. Information We Collect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                  <h3 className="text-base font-semibold text-white mb-2">
                    A. Google / Gmail Profile Data
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    When you sign in using Google OAuth, we receive basic authentication credentials provided by Google: your verified email address, full name, and avatar image. We use this strictly to authenticate your identity and protect our community from spam bots.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
                  <h3 className="text-base font-semibold text-white mb-2">
                    B. Community Contributions &amp; Messages
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    When you submit an automotive technical guide or leave thoughts on our &ldquo;Let&apos;s Connect&rdquo; page, we store your submitted content, chosen username/handle, favorite car build, and message text to display to other enthusiasts.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-500" />
                3. How We Use Your Information
              </h2>
              <ul className="space-y-2.5 list-disc list-inside text-zinc-300">
                <li>
                  <strong className="text-white">Account Authentication &amp; Bot Defense:</strong> Verifying human users through Google OAuth to prevent malicious spam submissions.
                </li>
                <li>
                  <strong className="text-white">Content Attribution:</strong> Displaying your contributor handle next to automotive guides you write.
                </li>
                <li>
                  <strong className="text-white">Direct Communication:</strong> Reaching out via email only if you submitted a message on the &ldquo;Let&apos;s Connect&rdquo; hub requesting discussion about cars.
                </li>
                <li>
                  <strong className="text-white">Platform Operation:</strong> Ensuring uptime, analyzing aggregated performance metrics, and preventing abuse.
                </li>
              </ul>
            </section>

            {/* Third-Party Service Providers */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                4. Third-Party Service Providers
              </h2>
              <p>
                We do not sell, rent, or monetize your personal data. We rely on industry-standard infrastructure providers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4">
                  <h4 className="font-bold text-white text-sm">Google Cloud Identity</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Provides secure OAuth authentication and token verification.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4">
                  <h4 className="font-bold text-white text-sm">Supabase</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Encrypted PostgreSQL database and session token storage with Row Level Security.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-4">
                  <h4 className="font-bold text-white text-sm">Vercel Inc.</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Serverless edge hosting, SSL certificates, and delivery networks.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention & Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                5. Your Data Rights &amp; Deletion
              </h2>
              <p>
                You retain complete ownership over your contributions and personal data. You may at any time request:
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-zinc-300">
                <li>A copy of any personal data associated with your email address.</li>
                <li>Immediate deletion or anonymization of your account, contact messages, or published articles.</li>
              </ul>
              <p className="text-xs text-zinc-400 pt-2">
                To request data deletion, simply send a message through our{" "}
                <Link href="/connect" className="text-red-400 underline hover:text-red-300">
                  Let&apos;s Connect
                </Link>{" "}
                page or contact us at the email below.
              </p>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  Have Questions or Privacy Requests?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  We are here to assist with any data protection or privacy inquiries.
                </p>
              </div>
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-500 transition-colors shrink-0"
              >
                Contact Us via Let&apos;s Connect
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

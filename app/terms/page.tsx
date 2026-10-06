import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileCheck, AlertTriangle, ShieldCheck, Wrench, ArrowLeft, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - RevPulse AutoTech",
  description:
    "Terms of Service for RevPulse AutoTech covering platform usage, content guidelines, and automotive educational disclaimers.",
};

export default function TermsOfServicePage() {
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
              <FileCheck className="h-3.5 w-3.5" />
              <span>User Agreement &amp; Platform Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="space-y-10 text-zinc-300 text-sm sm:text-base leading-relaxed">
            {/* Agreement to Terms */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-red-500" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using <strong>RevPulse AutoTech</strong> (&ldquo;RevPulse&rdquo;, &ldquo;we&rdquo;, or &ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions outlined herein, please discontinue use of the platform immediately.
              </p>
            </section>

            {/* Automotive Educational Disclaimer */}
            <section className="rounded-2xl border border-amber-950/40 bg-amber-950/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                2. Automotive &amp; Mechanical Disclaimer
              </h2>
              <p className="text-zinc-200">
                All guides, technical articles, and component analyses published on RevPulse AutoTech—including discussions regarding internal combustion engines, turbochargers, fuel injection, exhaust systems, and vehicle optics—are intended <strong>strictly for educational and informational purposes</strong>.
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside text-xs sm:text-sm text-zinc-300">
                <li>Automotive modifications and tuning involve inherent mechanical, safety, and regulatory risks.</li>
                <li>You are solely responsible for ensuring that any work or modifications comply with local vehicle emissions, road safety, and homologation laws.</li>
                <li>Always consult certified mechanics, master technicians, and workshop service manuals before attempting mechanical repairs or high-performance modifications.</li>
              </ul>
            </section>

            {/* User Accounts and Authentication */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Wrench className="h-5 w-5 text-red-500" />
                3. User Accounts &amp; Authentication
              </h2>
              <p>
                We allow users to authenticate securely using Google OAuth to publish articles and participate in discussions. By signing in, you agree to:
              </p>
              <ul className="space-y-2 list-disc list-inside text-zinc-300">
                <li>Provide authentic information associated with your Google account.</li>
                <li>Not attempt to automate, scrape, bypass, or submit fraudulent requests through bots.</li>
                <li>Maintain the security of your own Google account credentials.</li>
              </ul>
            </section>

            {/* Community Content & Contributions */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                4. Community Content &amp; Intellectual Property
              </h2>
              <p>
                When you submit knowledge guides, articles, or feedback on RevPulse AutoTech:
              </p>
              <ul className="space-y-2 list-disc list-inside text-zinc-300">
                <li>
                  <strong className="text-white">Your Ownership:</strong> You retain ownership of the original text and insights you contribute.
                </li>
                <li>
                  <strong className="text-white">Platform License:</strong> By posting content, you grant RevPulse a perpetual, royalty-free, worldwide license to display, index, format, and distribute your contribution to the car enthusiast community.
                </li>
                <li>
                  <strong className="text-white">Content Quality:</strong> You agree not to submit plagiarized material, malicious links, harmful automotive instructions, commercial spam, or abusive language.
                </li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                5. Limitation of Liability
              </h2>
              <p>
                Under no circumstances shall RevPulse AutoTech, its developers, or contributors be held liable for any direct, indirect, incidental, or consequential damages, engine failures, workshop injuries, or regulatory penalties arising out of the use or inability to use information provided on this platform. The website and tools (including the Web Clock) are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
              </p>
            </section>

            {/* Termination & Changes */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                6. Changes to Terms
              </h2>
              <p>
                We reserve the right to revise these Terms of Service at any time. Significant updates will be noted with a revised date at the top of this document. Continued use of the platform after modifications indicates your acceptance.
              </p>
            </section>

            {/* Contact Card */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  Questions Regarding the Terms?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Reach out to us directly through our community connect hub.
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

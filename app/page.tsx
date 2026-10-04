import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/storage";
import { CATEGORIES } from "@/lib/car-data";
import {
  Wind,
  Gauge,
  Flame,
  Volume2,
  Sun,
  Cpu,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle2,
  PenTool,
} from "lucide-react";

export default function HomePage() {
  const articles = getAllArticles();

  const iconMap: Record<string, React.ElementType> = {
    Gauge,
    Wind,
    Flame,
    Volume2,
    Sun,
    Cpu,
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-red-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.18),rgba(255,255,255,0))]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free Community Automotive Engineering Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Demystifying How <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">Engines, Turbos &amp; Exhausts</span> Actually Work.
            </h1>

            <p className="text-lg text-zinc-300 sm:text-xl leading-relaxed">
              No fluff, just mechanics and physics. Learn how forced induction generates boost, how exhaust pulse scavenging scavenges torque, and why direct injection behaves differently.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-950/50 hover:from-red-500 hover:to-amber-500 transition-all hover:scale-105"
              >
                <BookOpen className="h-4 w-4" />
                Explore Tech Guides
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/articles/new"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all hover:border-zinc-600"
              >
                <PenTool className="h-4 w-4 text-amber-400" />
                Submit Knowledge
              </Link>
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-6 py-3.5 text-sm font-semibold text-red-300 hover:bg-red-500/10 transition-all"
              >
                <MessageSquare className="h-4 w-4 text-red-400" />
                Let&apos;s Connect
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Component Categories Grid */}
      <section className="py-16 sm:py-20 bg-zinc-950 border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
                Systems &amp; Architecture
              </p>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Explore by Mechanical System
              </h2>
            </div>
            <Link
              href="/articles"
              className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-1 group"
            >
              Browse all topics
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Gauge;
              return (
                <Link
                  key={cat.slug}
                  href={`/articles?category=${encodeURIComponent(cat.name)}`}
                  className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-red-950/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-300">
                      Explore &rarr;
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Engineering Deep Dives */}
      <section className="py-16 sm:py-20 bg-zinc-900/40 border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                Featured Guides
              </p>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Latest Technical Deep Dives
              </h2>
            </div>
            <Link
              href="/articles"
              className="text-sm font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
            >
              View all {articles.length} guides
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article) => (
              <article
                key={article.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-200 hover:border-zinc-700 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 font-medium text-red-400 border border-red-500/20">
                      {article.category}
                    </span>
                    <span className="text-zinc-400">{article.readingTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white hover:text-red-400 transition-colors line-clamp-2">
                    <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-sm text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-1.5">
                    {article.content.technicalHighlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-zinc-400">{item.label}:</span>
                        <span className="text-zinc-200 font-mono font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-semibold text-zinc-300">{article.author.name}</p>
                    <p className="text-zinc-400 text-[11px]">{article.author.role}</p>
                  </div>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Anatomy Banner: How a Turbocharger Works */}
      <section className="py-16 bg-zinc-950 border-b border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/20 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white tracking-wide uppercase">
                Anatomy Breakdown
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                How Boost Is Made: The 5-Step Cycle
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Ever wonder what happens the moment you bury the throttle? Hot exhaust gases turn a turbine up to 250,000 RPM, forcing compressed dense air through an intercooler into the combustion chamber.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Wastegate prevents dangerous over-boost spikes</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Intercooler drops intake charge temp by 40-70°F</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Blow-off valve protects compressor against surge</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Twin-scroll eliminates exhaust pulse interference</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/articles/how-turbochargers-work-dynamics"
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-500 transition-colors"
                >
                  Read Full Turbo Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Connect & Clock Tool Banner */}
      <section className="py-16 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Let's Connect Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Let&apos;s Connect &amp; Talk Cars</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Have opinions on naturally aspirated vs turbocharged engines? A cool car build you want to showcase? Drop your thoughts and your email address so we can connect and exchange car knowledge.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/connect"
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
                >
                  Go to Connect Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Web Clock Utility Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Garage &amp; Workshop Clock</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Need a clean full-screen digital or analog timer while working on your car in the garage? The original Web Clock has been moved to its own dedicated route.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/clock"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  Open Web Clock Tool
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

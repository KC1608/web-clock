import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticleBySlug, getAllArticles } from "@/lib/storage";
import {
  Clock,
  User,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Sparkles,
} from "lucide-react";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all Technical Guides
            </Link>
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/20">
              {article.category}
            </span>
          </div>

          {/* Article Header */}
          <header className="space-y-4 pb-8 border-b border-zinc-800">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {article.title}
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed">{article.summary}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-zinc-200">{article.author.name}</span>
                  <span className="text-zinc-500 ml-1.5">({article.author.role})</span>
                </div>
              </div>

              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-zinc-500" />
                {article.readingTime}
              </span>
              <span>•</span>
              <span>Published on {article.publishedAt}</span>
            </div>
          </header>

          {/* Main Article Content */}
          <div className="py-8 space-y-10">
            {/* Overview / Introduction */}
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                Engineering Context
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed">
                {article.content.introduction}
              </p>
            </section>

            {/* Step-by-Step Cycle / How it Works */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Wrench className="h-5 w-5 text-red-500" />
                Mechanical Sequence &amp; How It Works
              </h2>
              <div className="space-y-3">
                {article.content.howItWorks.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-400 font-mono text-xs font-bold border border-red-500/30">
                      {idx + 1}
                    </div>
                    <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Highlights Box */}
            <section className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Technical Specifications &amp; Physics Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.content.technicalHighlights.map((spec, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 flex flex-col justify-between"
                  >
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                      {spec.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-red-400 mt-1">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros & Cons if available */}
            {article.content.prosAndCons && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-emerald-950/40 bg-emerald-950/10 p-6">
                  <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    Engineering Advantages
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {article.content.prosAndCons.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-950/40 bg-amber-950/10 p-6">
                  <h3 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    Trade-offs &amp; Challenges
                  </h3>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {article.content.prosAndCons.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Common Troubleshooting / Tuning Notes */}
            {article.content.commonTroubleshooting && (
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-zinc-400" />
                  Common Troubleshooting &amp; Workshop Symptoms
                </h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {article.content.commonTroubleshooting.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold">&rarr;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tags */}
            <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href="/connect"
                className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Discuss this article on the Connect page &rarr;
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h3 className="text-xl font-bold text-white mb-4">Related in {article.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.slug}`}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 hover:bg-zinc-900 transition-colors"
                  >
                    <span className="text-xs text-red-400 font-semibold">{rel.category}</span>
                    <h4 className="text-base font-bold text-white mt-1">{rel.title}</h4>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{rel.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}

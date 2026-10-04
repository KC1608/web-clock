"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/car-data";
import { getAllArticles } from "@/lib/storage";
import { Search, PenTool, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function ArticlesDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const allArticles = getAllArticles();

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-zinc-800 bg-zinc-900/50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Engineering Knowledge Base
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  Automotive Technical Guides
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
                  Dissecting the physics and operation of internal combustion engines, turbochargers, free-flow exhausts, induction, and modern car electronics.
                </p>
              </div>

              <Link
                href="/articles/new"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950 hover:from-red-500 hover:to-amber-500 transition-all hover:scale-105 shrink-0"
              >
                <PenTool className="h-4 w-4" />
                Add Your Knowledge
              </Link>
            </div>

            {/* Search Bar & Category Filters */}
            <div className="mt-8 space-y-4">
              <div className="relative max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search articles by topic, e.g. 'Turbo', 'Scavenging', 'Valves', 'GDI'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    selectedCategory === "All"
                      ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                  }`}
                >
                  All ({allArticles.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                <BookOpen className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
                <h3 className="text-lg font-bold text-white">No articles matched your filter</h3>
                <p className="text-sm text-zinc-400 mt-1 max-w-md mx-auto">
                  Try searching for different keywords or be the first to contribute a post on this topic!
                </p>
                <div className="mt-6">
                  <Link
                    href="/articles/new"
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                  >
                    <PenTool className="h-4 w-4" />
                    Write a Guide
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-red-950/10"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 font-medium text-red-400 border border-red-500/20">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-zinc-400">
                          <Clock className="h-3 w-3" />
                          {article.readingTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white hover:text-red-400 transition-colors line-clamp-2">
                        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                      </h2>

                      <p className="text-sm text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Technical Specs Preview */}
                      <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-1.5">
                        {article.content.technicalHighlights.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="text-zinc-400">{item.label}:</span>
                            <span className="text-zinc-200 font-mono font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-400"
                          >
                            #{tag}
                          </span>
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
                        className="flex items-center gap-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors group"
                      >
                        Read
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

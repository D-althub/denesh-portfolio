"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { BlogArticle } from "@/data/portfolioData";
import { BookOpen, Calendar, Clock, ArrowRight, X } from "lucide-react";

export function BlogJournalSection() {
  const { data } = usePortfolio();
  const { blog } = data;
  const [readingArticle, setReadingArticle] = useState<BlogArticle | null>(
    null
  );

  return (
    <section id="journal" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              09 // Production Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ESSAYS & NOTES ON CRAFT
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Director logs, screenwriting discipline, world building philosophy, and behind-the-scenes essays.
          </p>
        </div>

        {/* List of Journal Essays */}
        <div className="space-y-6">
          {blog.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setReadingArticle(article)}
              className="glass-panel glass-panel-hover cursor-pointer rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
                  <span className="rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-0.5 uppercase tracking-widest text-[#D4AF37]">
                    {article.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>{article.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition">
                  {article.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-zinc-800">
                <span className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                  <span>Read Essay</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Essay Reader Lightbox Modal */}
      <AnimatePresence>
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingArticle(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#D4AF37]/40 bg-[#121212] p-8 sm:p-12 shadow-2xl"
            >
              <div className="sticky top-0 z-10 -mx-8 sm:-mx-12 -mt-8 sm:-mt-12 flex items-center justify-between border-b border-zinc-800 bg-[#121212]/95 backdrop-blur-md px-8 sm:px-12 py-5 mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                  DSS FILMS // PRODUCTION JOURNAL
                </span>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="rounded-full border border-zinc-700 bg-black p-2 text-zinc-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 font-mono text-xs text-zinc-400">
                  <span className="uppercase tracking-widest text-[#D4AF37]">
                    {readingArticle.category}
                  </span>
                  <span>•</span>
                  <span>{readingArticle.date}</span>
                  <span>•</span>
                  <span>{readingArticle.readTime}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {readingArticle.title}
                </h2>
              </div>

              <div className="prose prose-invert max-w-none text-base sm:text-lg font-light leading-relaxed text-zinc-200 whitespace-pre-wrap space-y-6">
                {readingArticle.content}
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="rounded border border-[#D4AF37] bg-[#D4AF37] px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-black font-semibold hover:bg-transparent hover:text-[#D4AF37]"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

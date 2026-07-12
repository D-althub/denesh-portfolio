"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { StoryLabItem } from "@/data/portfolioData";
import {
  Beaker,
  FileText,
  Sparkles,
  Tag,
  BookOpen,
  Filter,
} from "lucide-react";

const CATEGORIES: StoryLabItem["category"][] = [
  "Characters",
  "World Building",
  "Screenplays",
  "Visual References",
  "Moodboards",
  "Dialogue Experiments",
  "Research Notes",
];

export function StoryLabSection() {
  const { data } = usePortfolio();
  const { storyLab } = data;
  const [activeCategory, setActiveCategory] = useState<
    StoryLabItem["category"] | "All"
  >("All");
  const [selectedCard, setSelectedCard] = useState<StoryLabItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? storyLab
      : storyLab.filter((item) => item.category === activeCategory);

  return (
    <section id="story-lab" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              04 // Narrative R&D
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              STORY LAB
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Live exploration notes, dialogue experiments, character profiles, and production world-building studies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-zinc-800">
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition ${
              activeCategory === "All"
                ? "bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
            }`}
          >
            All Disciplines
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Study Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedCard(item)}
                className="glass-panel glass-panel-hover cursor-pointer rounded-xl p-6 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                      {item.category}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-300 font-light mt-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-black/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center space-x-1">
                    <span>Inspect</span>
                    <BookOpen className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detailed Lab Note Lightbox Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl border border-[#D4AF37]/40 bg-[#121212] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                <div className="flex items-center space-x-2">
                  <Beaker className="h-4 w-4 text-[#D4AF37]" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                    Lab Dossier // {selectedCard.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="rounded-full border border-zinc-700 bg-black px-3 py-1 font-mono text-xs text-zinc-400 hover:text-white"
                >
                  Close [ESC]
                </button>
              </div>

              <h3 className="font-serif text-3xl font-bold text-white mb-4">
                {selectedCard.title}
              </h3>

              <div className="rounded-xl border border-zinc-800 bg-black/60 p-6 my-6 font-mono text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                {selectedCard.details}
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {selectedCard.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[#D4AF37]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

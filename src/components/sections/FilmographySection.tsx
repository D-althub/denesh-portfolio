"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { FilmographyItem } from "@/data/portfolioData";
import { Film, ChevronDown, ChevronUp, Award, Clock } from "lucide-react";

export function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;
  const [filter, setFilter] = useState<
    "All" | "Released" | "In Development" | "Upcoming"
  >("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems =
    filter === "All"
      ? filmography
      : filmography.filter((f) => f.category === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="filmography" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              07 // Career Canon
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              FILMOGRAPHY ARCHIVE
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Complete directorial slate categorized by production timeline. Expand entries to inspect festival honors.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-zinc-800">
          {(["All", "Released", "In Development", "Upcoming"] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition ${
                  filter === cat
                    ? "bg-[#D4AF37] text-black font-semibold"
                    : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
                }`}
              >
                {cat} Slate
              </button>
            )
          )}
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-zinc-800/80 pl-6 md:pl-10 space-y-8">
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] md:-left-[47px] top-4 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#090909] group-hover:bg-[#D4AF37] transition" />

                  {/* Card */}
                  <div className="glass-panel glass-panel-hover rounded-xl p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                            {item.year}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="rounded border border-zinc-800 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white group-hover:text-[#D4AF37] transition">
                          {item.title}
                        </h3>
                        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
                          {item.role}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="inline-flex items-center space-x-2 self-start sm:self-center rounded border border-zinc-800 bg-zinc-900/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        <span>{isExpanded ? "Collapse Details" : "Expand Dossier"}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-zinc-300 font-light mt-4 leading-relaxed">
                      {item.logline}
                    </p>

                    {/* Expandable Details Box */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-6 border-t border-zinc-800/80 space-y-4">
                            {item.runtime && (
                              <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                                <Clock className="h-4 w-4 text-[#D4AF37]" />
                                <span>Est. Runtime: {item.runtime}</span>
                              </div>
                            )}

                            {item.festivals && item.festivals.length > 0 && (
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                                  <Award className="h-4 w-4" />
                                  <span>Festival Honors & Laurels</span>
                                </div>
                                <ul className="space-y-1 pl-6 list-disc text-xs font-mono text-zinc-300">
                                  {item.festivals.map((fest) => (
                                    <li key={fest}>{fest}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

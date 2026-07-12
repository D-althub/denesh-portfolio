"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Lock, Sparkles, Eye, ShieldAlert } from "lucide-react";

export function DevelopingConceptsSection() {
  const { data } = usePortfolio();
  const { concepts } = data;
  const [unlockedIds, setUnlockedIds] = useState<Record<string, boolean>>({});

  const toggleUnlockPreview = (id: string) => {
    setUnlockedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="concepts" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              03 // Incubator & Concept Slate
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              DEVELOPING CONCEPTS
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Pinterest-style architectural treatment cards. Classified projects remain intentionally blurred under NDA.
          </p>
        </div>

        {/* Masonry / Pinterest-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-2 gap-8 space-y-8">
          {concepts.map((concept, idx) => {
            const isTemporarilyUnlocked = unlockedIds[concept.id];
            const shouldBlur = concept.isBlurred && !isTemporarilyUnlocked;

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="break-inside-avoid relative overflow-hidden rounded-xl border border-[#D4AF37]/20 bg-[#121212] p-8 shadow-2xl transition-all hover:border-[#D4AF37]/50"
              >
                {/* Header Tag / Genre & Status */}
                <div className="flex items-center justify-between mb-6">
                  <span className="rounded border border-zinc-800 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    {concept.genre}
                  </span>
                  <div className="flex items-center space-x-2">
                    {concept.isBlurred && (
                      <span className="flex items-center space-x-1 text-[10px] font-mono uppercase tracking-widest text-amber-500">
                        <Lock className="h-3 w-3" />
                        <span>Classified NDA</span>
                      </span>
                    )}
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                      {concept.status}
                    </span>
                  </div>
                </div>

                {/* Main Content Area (Blurred if Classified) */}
                <div className="relative">
                  <div
                    className={`transition-all duration-700 ${
                      shouldBlur ? "blur-md select-none opacity-40" : "blur-0 opacity-100"
                    }`}
                  >
                    <h3 className="font-serif text-3xl font-bold text-white tracking-wide mb-3">
                      {concept.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 mb-5">
                      <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>MOOD: {concept.mood}</span>
                    </div>

                    <p className="text-base font-light text-zinc-200 leading-relaxed italic border-l-2 border-[#D4AF37]/40 pl-4 py-1">
                      &ldquo;{concept.premise}&rdquo;
                    </p>
                  </div>

                  {/* Coming Soon / Blur Overlay */}
                  {concept.isBlurred && (
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                        isTemporarilyUnlocked
                          ? "opacity-0 pointer-events-none"
                          : "opacity-100"
                      }`}
                    >
                      <div className="rounded-xl border border-[#D4AF37]/40 bg-black/80 backdrop-blur-md px-6 py-5 text-center shadow-2xl">
                        <ShieldAlert className="h-6 w-6 text-[#D4AF37] mx-auto mb-2" />
                        <h4 className="font-serif text-lg font-bold text-white tracking-wider">
                          COMING SOON
                        </h4>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-1">
                          In Secret Treatment Stage
                        </p>
                        <button
                          onClick={() => toggleUnlockPreview(concept.id)}
                          className="mt-4 inline-flex items-center space-x-1.5 rounded border border-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Peek Under NDA</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Re-lock Button if temporarily previewed */}
                {concept.isBlurred && isTemporarilyUnlocked && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => toggleUnlockPreview(concept.id)}
                      className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] hover:underline"
                    >
                      Lock Classified Dossier
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Award, Film, Sparkles, ArrowDown } from "lucide-react";

export function AboutSection() {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-3">
            01 // The Filmmaker
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            DIRECTOR&apos;S BIOGRAPHY
          </h2>
          <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {/* Grid: Large Portrait & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-[#D4AF37]/20 bg-[#121212] shadow-2xl group">
              <img
                src={about.portraitUrl}
                alt={about.name}
                className="h-full w-full object-cover object-top filter grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-60" />

              {/* Auteur Seal Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <h3 className="font-serif text-lg tracking-[0.15em] font-bold text-white">
                    {about.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    Writer • Director • Creator
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/60 backdrop-blur-md">
                  <Award className="h-5 w-5 text-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* Subtle backdrop gold glow frame */}
            <div className="absolute -inset-2 -z-10 rounded-xl bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-2xl opacity-60" />
          </motion.div>

          {/* Biography & Interests Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                Emotional Cinema • Atmospheric Tone
              </span>
              <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-zinc-200">
                {about.bio}
              </p>
            </div>

            <div className="border-t border-zinc-800/80 pt-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
                Core Narrative Explorations
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {about.interests.map((genre) => (
                  <span
                    key={genre}
                    className="group rounded-full border border-zinc-800 bg-[#121212]/80 px-4 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  >
                    • {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-zinc-800/80">
              <div>
                <div className="font-serif text-3xl font-bold text-white">
                  3
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
                  Concepts Under Development
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-[#D4AF37]">
                  3+
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
                  Feature & Series Slates
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-white">
                  100%
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
                  Independent Vision
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vertical Evolution Timeline */}
        <div className="mt-28">
          <div className="text-center mb-16">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wider">
              CAREER EVOLUTION & VISION
            </h3>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-2">
              From Early Stage Plays to Independent Production Studio
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Timeline Line */}
            <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#D4AF37]/60 via-zinc-800 to-[#D4AF37]/60 hidden md:block" />

            <div className="space-y-12">
              {about.timeline.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative flex flex-col md:flex-row items-center justify-between min-h-[110px]"
                  >
                    {/* Left Column (Desktop) */}
                    <div
                      className={`w-full md:w-[calc(50%-32px)] px-6 ${
                        isEven ? "md:text-right" : "md:order-2 md:text-left"
                      }`}
                    >
                      <div className="glass-panel rounded-lg p-6 hover:border-[#D4AF37]/50 transition">
                        <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest">
                          {step.year}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white mt-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-zinc-400 mt-2 font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Icon Node - Perfectly pinned to the vertical center line */}
                    <div className="z-10 my-4 md:my-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] bg-[#090909] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                    </div>

                    {/* Right spacer */}
                    <div
                      className={`w-full md:w-[calc(50%-32px)] px-6 hidden md:block ${
                        isEven ? "" : "md:order-1"
                      }`}
                    />

                    {/* Mobile Arrow down indicator */}
                    {idx < about.timeline.length - 1 && (
                      <div className="md:hidden text-[#D4AF37] py-2">
                        <ArrowDown className="h-4 w-4 animate-bounce" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

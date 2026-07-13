"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Compass, Eye, Sparkles, Building2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { initialPortfolioData } from "@/data/portfolioData";

export function DirectorsStatementSection() {
  const { data } = usePortfolio();
  const statement = (data as any).statement || {
    headline: "A Cinema of Intimacy and Scale",
    portraitUrl: "/images/denesh-portrait.jpg",
    whyStoriesMatter:
      "Stories are our only permanent defense against the erosion of time.",
    whyFilmsAreMade:
      "Films are not merely entertainment; they are shared collective dreams.",
    creativePhilosophy:
      "My approach marries uncompromising visual ambition with radical emotional honesty.",
    longTermVision:
      "DSS Productions is an independent sanctuary for auteur cinema.",
    quote: "Every frame is an invitation into a universe where feelings have physical weight.",
  };

  return (
    <section
      id="statement"
      className="relative py-32 bg-[#090909] overflow-hidden border-t border-[#C6A55C]/15"
    >
      {/* Background Soft Atmospheric Glow */}
      <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-[#C6A55C]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-[#C6A55C]/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#C6A55C] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CREATIVE MANIFESTO</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
              Director&apos;s Statement
            </h2>
          </div>

          <span className="mt-4 md:mt-0 font-mono text-xs uppercase tracking-[0.25em] text-[#A8A8A8]">
            DENESH SATYA SAI • AUTEUR PHILOSOPHY
          </span>
        </div>

        {/* Main Showcase Grid: Chiaroscuro Cinematic Portrait Left + Narrative Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Large Chiaroscuro Cinematic Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-lg overflow-hidden border border-[#C6A55C]/30 bg-[#121212] shadow-[0_20px_60px_rgba(0,0,0,0.85)] aspect-[4/5]">
              <img
                src={statement.portraitUrl}
                alt="Director Denesh Satya Sai Cinematic Portrait"
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.12]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-90" />

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <Quote className="w-8 h-8 text-[#C6A55C]/40 mb-3" />
                <p className="font-serif italic text-lg sm:text-xl text-white font-light leading-relaxed">
                  &ldquo;{statement.quote}&rdquo;
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C6A55C] block mt-3">
                  DENESH SATYA SAI • FOUNDER, DSS PRODUCTIONS
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: The Four Pillars of the Creative Manifesto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 space-y-12"
          >
            {/* Why Stories Matter */}
            <div className="p-8 rounded-lg border border-zinc-800/80 bg-[#121212]/70 hover:border-[#C6A55C]/40 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-[#C6A55C]" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  Why Stories Matter
                </h3>
              </div>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed">
                {statement.whyStoriesMatter}
              </p>
            </div>

            {/* Why Films Are Made */}
            <div className="p-8 rounded-lg border border-zinc-800/80 bg-[#121212]/70 hover:border-[#C6A55C]/40 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-[#C6A55C]" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  Why Films Are Made
                </h3>
              </div>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed">
                {statement.whyFilmsAreMade}
              </p>
            </div>

            {/* Creative Philosophy */}
            <div className="p-8 rounded-lg border border-zinc-800/80 bg-[#121212]/70 hover:border-[#C6A55C]/40 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-[#C6A55C]" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  Creative Philosophy
                </h3>
              </div>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed">
                {statement.creativePhilosophy}
              </p>
            </div>

            {/* Long-Term Vision: Production Company */}
            <div className="p-8 rounded-lg border border-[#C6A55C]/40 bg-[#C6A55C]/5 shadow-[0_0_30px_rgba(198,165,92,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-[#C6A55C]" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  Long-Term Vision: DSS Productions
                </h3>
              </div>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed">
                {statement.longTermVision}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

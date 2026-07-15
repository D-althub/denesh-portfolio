"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { usePortfolio } from "@/context/PortfolioContext";
import { Award, Film, Sparkles, Compass, Shield, Heart, Anchor, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const { data } = usePortfolio();
  const { about } = data;
  const directorsStatement = (data as any).directorsStatement || (data as any).statement || {
    whyStoriesMatter: "Stories are our primary survival mechanism against emotional isolation. Across civilizations, narrative has been the bridge between individual solitude and collective empathy.",
    whyFilmsAreMade: "Cinema is the only art form where time, space, and memory converge into a sensory present. We direct to make the invisible visible.",
    creativePhilosophy: "My approach marries uncompromising visual ambition with radical emotional honesty.",
    dssProductionsVision: "DSS Productions is founded on a singular principle: protecting the delicate vision of the filmmaker from commercial dilution as an independent sanctuary for auteur cinema."
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-28">
        {/* Header: Director's Statement / Manifesto */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-zinc-800">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-3 flex items-center gap-2">
                <Film className="w-4 h-4" />
                <span>06 // AUTEUR MANIFESTO & BIO</span>
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                DIRECTOR&apos;S STATEMENT
              </h1>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 max-w-md leading-relaxed">
              Why cinema exists, why stories endure, and the artistic blueprint of Denesh Satya Sai.
            </p>
          </div>
        </div>

        {/* Large Chiaroscuro Portrait & Bio Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Portrait Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#121212] shadow-[0_25px_80px_rgba(0,0,0,0.9)] group">
                <img
                  src={about.portraitUrl || "/images/denesh-portrait.jpg"}
                  alt={about.name}
                  className="h-full w-full object-cover object-top filter grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-65" />

                {/* Auteur Seal Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <h3 className="font-serif text-xl tracking-[0.15em] font-bold text-white">
                      {about.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                      Writer • Director • Creator
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/80 backdrop-blur-md shadow-lg">
                    <Award className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                </div>
              </div>

              {/* Subtle gold glow background */}
              <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-b from-[#D4AF37]/15 to-transparent blur-3xl opacity-70" />
            </motion.div>

            {/* Bio & Storytelling Philosophy Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 flex flex-col justify-center space-y-8"
            >
              <div className="space-y-5">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                  Emotional Cinema • Atmospheric Tone
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight">
                  &ldquo;A film is not simply a moving picture; it is an emotional sanctuary where audiences confront unspoken truths.&rdquo;
                </h2>
                <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
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
                      className="group rounded-full border border-zinc-800 bg-[#121212] px-4 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                    >
                      • {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800/80">
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    3
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
                    Active Features & Slates
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#D4AF37]">
                    100%
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
                    Independent Vision
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    MMXXVI
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mt-1">
                    DSS Studio Foundation
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Storytelling Philosophy: Why Stories Matter & Why Films Are Made */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-28">
          <div className="mb-14 border-b border-zinc-800 pb-6">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37] block mb-2">
              THE PHILOSOPHICAL CANON
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              WHY WE CREATE CINEMA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Why Stories Matter */}
            <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 text-[#D4AF37] mb-4">
                  <Heart className="h-6 w-6" />
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-white">
                    Why Stories Matter
                  </h3>
                </div>
                <p className="font-serif italic text-lg text-[#D4AF37]/90 leading-relaxed">
                  &ldquo;Stories are our primary survival mechanism against emotional isolation.&rdquo;
                </p>
                <p className="text-sm text-zinc-300 font-light leading-relaxed mt-4">
                  {directorsStatement?.whyStoriesMatter ||
                    "Across civilizations, narrative has been the bridge between individual solitude and collective empathy. When we step inside a character's journey, we gain permission to feel our own buried grief, hope, and vulnerability."}
                </p>
              </div>
              <div className="pt-6 border-t border-zinc-800 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                SECTION I // THE HUMAN NEED
              </div>
            </div>

            {/* Why Films Are Made */}
            <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 text-[#D4AF37] mb-4">
                  <Compass className="h-6 w-6" />
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-white">
                    Why Films Are Made
                  </h3>
                </div>
                <p className="font-serif italic text-lg text-[#D4AF37]/90 leading-relaxed">
                  &ldquo;Cinema is the only art form where time, space, and memory converge into a sensory present.&rdquo;
                </p>
                <p className="text-sm text-zinc-300 font-light leading-relaxed mt-4">
                  {directorsStatement?.whyFilmsAreMade ||
                    "A film is made not merely to entertain, but to freeze an ephemeral feeling so that audiences decades later can step inside that exact atmospheric resonance. We direct to make the invisible visible."}
                </p>
              </div>
              <div className="pt-6 border-t border-zinc-800 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                SECTION II // THE CRAFT OF TIME
              </div>
            </div>
          </div>
        </div>

        {/* Journey into Filmmaking: Career Evolution Timeline */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-28">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] block mb-2">
              CHRONOLOGY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wider">
              JOURNEY INTO FILMMAKING
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-3">
              From Early Stage Plays to Independent Production Studio
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Vertical Line */}
            <div className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-[#D4AF37]/80 via-zinc-800 to-[#D4AF37]/80 hidden md:block" />

            <div className="space-y-14">
              {about.timeline.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative flex flex-col md:flex-row items-center justify-between min-h-[120px]"
                  >
                    {/* Left Column */}
                    <div
                      className={`w-full md:w-[calc(50%-36px)] px-6 ${
                        isEven ? "md:text-right" : "md:order-2 md:text-left"
                      }`}
                    >
                      <div className="glass-panel rounded-xl p-7 hover:border-[#D4AF37]/60 transition shadow-xl border border-zinc-800 bg-[#121212]">
                        <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest font-bold">
                          {step.year}
                        </span>
                        <h4 className="font-serif text-xl font-bold text-white mt-1">
                          {step.title}
                        </h4>
                        <p className="text-sm text-zinc-400 mt-2.5 font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Icon Node - Centered accurately on the line */}
                    <div className="z-10 my-4 md:my-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] bg-[#090909] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                    </div>

                    {/* Right spacer */}
                    <div
                      className={`w-full md:w-[calc(50%-36px)] px-6 hidden md:block ${
                        isEven ? "" : "md:order-1"
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Production Company Vision: DSS Productions */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#18150c] via-[#121212] to-[#090909] p-8 sm:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
            {/* Decorative Gold Watermark */}
            <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none font-serif text-[260px] font-bold text-[#D4AF37] select-none">
              DSS
            </div>

            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                <Shield className="w-4 h-4" />
                <span>INDEPENDENT AUTEUR SANCTUARY</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
                VISION FOR DSS PRODUCTIONS
              </h2>

              <p className="font-serif italic text-xl sm:text-2xl text-[#D4AF37] font-light">
                &ldquo;Building a permanent home for bold, uncompromised auteur cinema.&rdquo;
              </p>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {directorsStatement?.dssProductionsVision ||
                  "DSS Productions is founded on a singular principle: protecting the delicate vision of the filmmaker from commercial dilution. As we expand into feature films and limited series, our studio acts as a sanctuary where rigorous acoustic design, poetic cinematography, and human empathy remain paramount above all else."}
              </p>

              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                    Uncompromised Creative Control
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                    Acoustic & Visual Immersion
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                    Stories That Stay With You
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

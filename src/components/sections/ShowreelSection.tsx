"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Play, Film, Sparkles, X, Compass, Award } from "lucide-react";

export function ShowreelSection() {
  const { data } = usePortfolio();
  const { showreel } = data;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="showreel"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-3">
            06 // Motion Exhibition
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            DIRECTOR&apos;S SHOWREEL
          </h2>
          <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {/* Cinematic Reel Frame with Large Play Button */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#121212] shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={showreel.videoUrl}
              alt="Cinematic Showreel Preview"
              className="h-full w-full object-cover filter contrast-[1.15] brightness-[0.6] transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Large Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(true)}
                className="group/btn relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-black/70 text-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.4)] backdrop-blur-md transition-all hover:bg-[#D4AF37] hover:text-black"
              >
                <Play className="h-10 w-10 sm:h-12 sm:w-12 ml-1 fill-current" />
                <span className="absolute -inset-2 rounded-full border border-[#D4AF37]/40 animate-ping" />
              </motion.button>
              <span className="mt-5 font-mono text-xs uppercase tracking-[0.35em] text-zinc-300">
                Play 2026 Production Reel [03:14]
              </span>
            </div>

            {/* Frame Metadata corner tags */}
            <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]/80">
              DSS SLATE // REEL MASTER 4K
            </div>
            <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              ASPECT 2.39:1 ANAMORPHIC
            </div>
          </div>
        </div>

        {/* Below Reel: Director's Vision, Creative Philosophy, Favorite Genres, Inspirations */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Director's Vision */}
          <div className="glass-panel rounded-xl p-8 space-y-4">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <Film className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold tracking-wider">
                DIRECTOR&apos;S VISION
              </h3>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {showreel.directorsVision}
            </p>
          </div>

          {/* Creative Philosophy */}
          <div className="glass-panel rounded-xl p-8 space-y-4">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <Compass className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold tracking-wider">
                PHILOSOPHY
              </h3>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {showreel.creativePhilosophy}
            </p>
          </div>

          {/* Favorite Genres */}
          <div className="glass-panel rounded-xl p-8 space-y-4">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold tracking-wider">
                FAVORITE GENRES
              </h3>
            </div>
            <ul className="space-y-2 font-mono text-xs text-zinc-300">
              {showreel.favoriteGenres.map((g) => (
                <li key={g} className="flex items-center space-x-2">
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inspirations */}
          <div className="glass-panel rounded-xl p-8 space-y-4">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <Award className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold tracking-wider">
                INSPIRATIONS
              </h3>
            </div>
            <ul className="space-y-2 font-mono text-xs text-zinc-300">
              {showreel.inspirations.map((ins) => (
                <li key={ins} className="flex items-center space-x-2">
                  <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlaying(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-black shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 bg-[#121212] px-6 py-4">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                  DSS FILMS // 2026 DIRECTOR SHOWREEL
                </span>
                <button
                  onClick={() => setIsPlaying(false)}
                  className="rounded-full border border-zinc-700 bg-black p-1.5 text-zinc-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black flex items-center justify-center relative">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                  title="Director Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

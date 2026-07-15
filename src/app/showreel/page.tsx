"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { usePortfolio } from "@/context/PortfolioContext";
import { Play, Film, Sparkles, X, Compass, Award, Camera, Video, Layers } from "lucide-react";

export default function ShowreelPage() {
  const { data } = usePortfolio();
  const { showreel } = data;
  const gallery = (data.gallery || []).filter((g) => !g.visibility || g.visibility === "public");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedBts, setSelectedBts] = useState<string | null>(null);

  // Filter gallery or define dedicated behind-the-scenes items
  const btsItems = [
    {
      id: "bts-1",
      title: "On Location: Desert Highway Tracking Rig",
      project: "3 Days Journey",
      duration: "02:18",
      imageUrl: "/images/3-days-journey.jpg",
      description: "Behind-the-scenes breakdown of rigging the anamorphic camera vehicle across superheated asphalt.",
    },
    {
      id: "bts-2",
      title: "Directing Actors & Acoustic Blocking",
      project: "Untold Stories",
      duration: "03:45",
      imageUrl: "/images/untold-stories.jpg",
      description: "Rehearsing emotional pacing and dialogue subtext in intimate chamber interiors.",
    },
    {
      id: "bts-3",
      title: "VFX & Wirework Choreography",
      project: "Cursed Wings",
      duration: "04:12",
      imageUrl: "/images/cursed-wings.jpg",
      description: "Inside the green screen studio coordinating high-altitude celestial flight movements.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-28">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-zinc-800">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-3 flex items-center gap-2">
                <Film className="w-4 h-4" />
                <span>05 // MOTION EXHIBITION</span>
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                DIRECTOR&apos;S SHOWREEL
              </h1>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 max-w-md leading-relaxed">
              Curated master motion slate across dramatic features, episodic visual architecture, and kinetic camera staging.
            </p>
          </div>
        </div>

        {/* Cinematic Widescreen Player Billboard */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#121212] shadow-[0_25px_80px_rgba(0,0,0,0.9)] group">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-black">
              <img
                src={showreel.videoUrl}
                alt="Cinematic Showreel Preview"
                className="h-full w-full object-cover filter contrast-[1.15] brightness-[0.55] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/30 to-transparent" />

              {/* Center Play Interaction */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                  className="group/btn relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-black/80 text-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.5)] backdrop-blur-md transition-all hover:bg-[#D4AF37] hover:text-black"
                >
                  <Play className="h-10 w-10 sm:h-12 sm:w-12 ml-1 fill-current" />
                  <span className="absolute -inset-2 rounded-full border border-[#D4AF37]/40 animate-ping" />
                </motion.button>
                <span className="mt-6 font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-bold">
                  PLAY THEATRICAL MASTER REEL [03:14]
                </span>
                <p className="font-serif text-lg text-zinc-300 font-light mt-2 max-w-lg">
                  Highlighting cinematography, rhythm, and emotional subtext from Denesh Satya Sai&apos;s directorial canon.
                </p>
              </div>

              {/* Top & Bottom Technical Badges */}
              <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-800">
                DSS FILM CANON // MMXXVI
              </div>
              <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-800 hidden sm:block">
                ASPECT 2.39:1 ANAMORPHIC MASTER
              </div>
            </div>
          </div>
        </div>

        {/* Director Notes & Creative Philosophy */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37] block mb-2">
              AUTEUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              DIRECTOR NOTES & VISION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-panel rounded-xl p-8 space-y-4 border border-zinc-800/80 bg-[#121212]/90">
              <div className="flex items-center space-x-2.5 text-[#D4AF37]">
                <Film className="h-5 w-5" />
                <h3 className="font-serif text-lg font-bold tracking-wider">
                  DIRECTOR&apos;S VISION
                </h3>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {showreel.directorsVision}
              </p>
            </div>

            <div className="glass-panel rounded-xl p-8 space-y-4 border border-zinc-800/80 bg-[#121212]/90">
              <div className="flex items-center space-x-2.5 text-[#D4AF37]">
                <Compass className="h-5 w-5" />
                <h3 className="font-serif text-lg font-bold tracking-wider">
                  STORY PHILOSOPHY
                </h3>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {showreel.creativePhilosophy}
              </p>
            </div>

            <div className="glass-panel rounded-xl p-8 space-y-4 border border-zinc-800/80 bg-[#121212]/90">
              <div className="flex items-center space-x-2.5 text-[#D4AF37]">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-serif text-lg font-bold tracking-wider">
                  FAVORITE GENRES
                </h3>
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-zinc-300">
                {showreel.favoriteGenres.map((g) => (
                  <li key={g} className="flex items-center space-x-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-xl p-8 space-y-4 border border-zinc-800/80 bg-[#121212]/90">
              <div className="flex items-center space-x-2.5 text-[#D4AF37]">
                <Award className="h-5 w-5" />
                <h3 className="font-serif text-lg font-bold tracking-wider">
                  INSPIRATIONS
                </h3>
              </div>
              <ul className="space-y-2.5 font-mono text-xs text-zinc-300">
                {showreel.inspirations.map((ins) => (
                  <li key={ins} className="flex items-center space-x-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Behind-the-Scenes Footage & Directing Process */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-16">
          <div className="mb-12 border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37] block mb-2">
                ON SET & IN THE EDIT
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                BEHIND-THE-SCENES FOOTAGE
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 max-w-sm">
              Directing methodology, camera blocking, and production soundscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {btsItems.map((bts) => (
              <div
                key={bts.id}
                onClick={() => setSelectedBts(bts.title)}
                className="group relative cursor-pointer rounded-xl overflow-hidden border border-zinc-800 bg-[#121212] transition-all hover:border-[#D4AF37]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-black relative">
                  <img
                    src={bts.imageUrl}
                    alt={bts.title}
                    className="h-full w-full object-cover filter contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37] bg-black/80 text-[#D4AF37] shadow-lg">
                      <Play className="h-6 w-6 ml-0.5 fill-current" />
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 rounded bg-black/80 px-2.5 py-1 font-mono text-[10px] text-[#D4AF37] border border-zinc-800">
                    {bts.duration}
                  </div>
                </div>

                <div className="p-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    {bts.project} // ON SET
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-[#D4AF37] transition">
                    {bts.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-2.5 leading-relaxed">
                    {bts.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Video Modal Player */}
      <AnimatePresence>
        {(isPlaying || selectedBts) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsPlaying(false);
                setSelectedBts(null);
              }}
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
                  {selectedBts ? `BTS FEATUREETTE // ${selectedBts}` : "DSS FILMS // 2026 DIRECTOR SHOWREEL"}
                </span>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setSelectedBts(null);
                  }}
                  className="rounded-full border border-zinc-700 bg-black p-1.5 text-zinc-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black flex items-center justify-center relative">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                  title="Showreel Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

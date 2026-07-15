"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { usePortfolio } from "@/context/PortfolioContext";
import { GalleryItem } from "@/data/portfolioData";
import {
  Eye,
  X,
  Maximize2,
  Film,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Calendar,
  Camera,
  Layers,
} from "lucide-react";

export interface ExtendedGalleryItem extends GalleryItem {
  projectName: string;
}

const GALLERY_CATEGORIES: GalleryItem["category"][] = [
  "Behind the Scenes",
  "Projects",
  "Concept Art",
  "Posters",
  "Location Scouting",
  "Production",
  "Film Stills",
  "Storyboard Frames",
  "Color Palettes",
  "Moodboards",
];

export default function GalleryPage() {
  const { data } = usePortfolio();
  const gallery = (data.gallery || []).filter((g) => !g.visibility || g.visibility === "public");

  const [activeCategory, setActiveCategory] = useState<GalleryItem["category"] | "All Archive">("All Archive");
  const [sortOrder, setSortOrder] = useState<"default" | "newest" | "oldest">("default");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Enrich gallery items with explicit project names for clear hover reveal
  const enrichedGallery: ExtendedGalleryItem[] = gallery.map((item, index) => {
    let projectName = item.project || "Untold Stories";
    if (!item.project) {
      if (item.title.toLowerCase().includes("cursed") || item.category === "Concept Art") {
        projectName = "Cursed Wings";
      } else if (item.title.toLowerCase().includes("desert") || item.title.toLowerCase().includes("3 days") || index % 4 === 0) {
        projectName = "3 Days Journey";
      } else if (index % 3 === 0) {
        projectName = "The Love";
      } else if (index % 5 === 0) {
        projectName = "The Saviour";
      }
    }
    return {
      ...item,
      projectName,
    };
  });

  const filteredGallery = (
    activeCategory === "All Archive"
      ? enrichedGallery
      : enrichedGallery.filter((item) => item.category === activeCategory)
  ).sort((a, b) => {
    if (sortOrder === "newest") {
      return (b.date || "").localeCompare(a.date || "") || -1;
    }
    if (sortOrder === "oldest") {
      return (a.date || "").localeCompare(b.date || "") || -1;
    }
    return 0;
  });

  const activeItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null && filteredGallery.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  }, [lightboxIndex, filteredGallery.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null && filteredGallery.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  }, [lightboxIndex, filteredGallery.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white relative">
      {/* Subtle Film Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />

      <main className="pt-28 pb-28 relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-zinc-800">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-3 flex items-center gap-2 font-bold">
                <Film className="w-4 h-4" />
                <span>04 // VISUAL EXHIBITION ARCHIVE</span>
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                CINEMATIC GALLERY
              </h1>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 max-w-md leading-relaxed">
              Pinterest-inspired masonry visual archive exploring anamorphic compositions, concept art, location scouting, and master production stills.
            </p>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("All Archive")}
                className={`rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition ${
                  activeCategory === "All Archive"
                    ? "bg-[#D4AF37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                    : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
                }`}
              >
                All Archive ({enrichedGallery.length})
              </button>
              {GALLERY_CATEGORIES.map((cat) => {
                const count = enrichedGallery.filter((i) => i.category === cat).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition ${
                      activeCategory === cat
                        ? "bg-[#D4AF37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                        : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <ArrowUpDown className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Sort:</span>
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="rounded-full border border-zinc-800 bg-[#121212] px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 focus:border-[#D4AF37] focus:outline-none cursor-pointer"
              >
                <option value="default">Default Canon Order</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Immersive Pinterest Masonry Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          {filteredGallery.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-12 text-center font-mono text-zinc-400 space-y-3">
              <Film className="h-10 w-10 text-zinc-600 mx-auto animate-pulse" />
              <p className="uppercase tracking-widest text-sm text-white">No visual frames match this category.</p>
              <button
                onClick={() => setActiveCategory("All Archive")}
                className="rounded border border-[#D4AF37] bg-[#D4AF37]/10 px-6 py-2 text-xs uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition"
              >
                Reset Archive Filter
              </button>
            </div>
          ) : (
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              <AnimatePresence>
                {filteredGallery.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    onClick={() => setLightboxIndex(idx)}
                    className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl border border-zinc-800/80 bg-[#121212] shadow-xl"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      loading="lazy"
                      className="w-full h-auto object-cover filter contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* High-end Dark Vignette Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Top Aspect Badge */}
                    <div className="absolute top-3 left-3 rounded bg-black/80 backdrop-blur-md px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] border border-zinc-800/80 opacity-90 group-hover:opacity-100 transition">
                      {item.category}
                    </div>

                    {/* Hover Reveal Card */}
                    <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="inline-flex items-center space-x-1.5 rounded bg-[#D4AF37] text-black font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 w-fit mb-2 shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>Project: {item.projectName}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-white mt-1">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-zinc-300 font-light mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-[#D4AF37]" />
                          <span>{item.date || "MMXXVI Canon"}</span>
                        </span>
                        <span className="flex items-center gap-1 text-[#D4AF37] font-bold uppercase tracking-wider">
                          <Maximize2 className="h-3 w-3" />
                          <span>Inspect</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 max-w-6xl w-full overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#121212] shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Top Navigation Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0b0b0b]">
                <div className="flex items-center space-x-3 font-mono text-xs uppercase tracking-widest text-zinc-400">
                  <span className="text-[#D4AF37] font-bold">EXHIBITION LIGHTBOX</span>
                  <span>//</span>
                  <span className="text-white font-bold">
                    {lightboxIndex !== null ? lightboxIndex + 1 : 1} OF {filteredGallery.length}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    Use [Left] [Right] [Esc] to navigate
                  </span>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="flex items-center gap-2 rounded-full border border-zinc-700 bg-black/80 px-4 py-1.5 font-mono text-xs text-zinc-300 hover:text-white hover:border-[#D4AF37] transition"
                  >
                    <span>CLOSE [ESC]</span>
                    <X className="h-4 w-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>

              {/* Image Viewport */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[48vh] max-h-[66vh] select-none">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.altText || activeItem.title}
                  className="max-h-[66vh] w-auto object-contain transition-all duration-300"
                />

                {/* Left Arrow */}
                {filteredGallery.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-zinc-800/80 bg-black/80 p-3.5 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition shadow-xl"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {/* Right Arrow */}
                {filteredGallery.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-zinc-800/80 bg-black/80 p-3.5 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition shadow-xl"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Complete Metadata Reveal */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-zinc-800 bg-[#0c0c0c] overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded bg-[#D4AF37] text-black font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5">
                      Project: {activeItem.projectName}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                      {activeItem.category}
                    </span>
                    {activeItem.date && (
                      <span className="font-mono text-xs text-zinc-400 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{activeItem.date}</span>
                      </span>
                    )}
                    {activeItem.photographer && (
                      <span className="font-mono text-xs text-zinc-400 flex items-center gap-1">
                        <Camera className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{activeItem.photographer}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {activeItem.title}
                  </h3>

                  {activeItem.description && (
                    <p className="text-sm text-zinc-300 font-light max-w-3xl leading-relaxed">
                      {activeItem.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="rounded border border-zinc-700 bg-zinc-900 px-6 py-3 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                  >
                    Return to Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

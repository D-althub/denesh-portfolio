"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { GalleryItem } from "@/data/portfolioData";
import { Eye, X, Maximize2 } from "lucide-react";

const GALLERY_CATEGORIES: GalleryItem["category"][] = [
  "Film Stills",
  "Concept Art",
  "Location Scouting",
  "Behind the Scenes",
  "Storyboard Frames",
  "Color Palettes",
  "Moodboards",
];

export function VisualGallerySection() {
  const { data } = usePortfolio();
  const { gallery } = data;
  const [activeCategory, setActiveCategory] = useState<
    GalleryItem["category"] | "All"
  >("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              05 // Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              VISUAL GALLERY
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Masonry visual exhibition across lighting tests, color scripts, storyboards, and set photography.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-zinc-800">
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition ${
              activeCategory === "All"
                ? "bg-[#D4AF37] text-black font-semibold"
                : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
            }`}
          >
            All Archive
          </button>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-black font-semibold"
                  : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredGallery.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxItem(item)}
                className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl border border-zinc-800/80 bg-[#121212]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto object-cover filter contrast-[1.08] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover Reveal Card */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-zinc-300 font-light mt-1.5 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-wider text-[#D4AF37]">
                    <Maximize2 className="h-3 w-3" />
                    <span>View Lightbox Frame</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-5xl w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#121212] shadow-2xl"
            >
              <div className="relative max-h-[75vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-black/70 text-zinc-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                    {lightboxItem.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    {lightboxItem.title}
                  </h3>
                  {lightboxItem.description && (
                    <p className="text-sm text-zinc-300 font-light mt-2 max-w-2xl">
                      {lightboxItem.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setLightboxItem(null)}
                  className="self-start sm:self-center rounded border border-zinc-700 bg-zinc-900 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Return to Gallery
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { GalleryItem } from "@/data/portfolioData";
import { Film, Sparkles, Maximize2, ExternalLink } from "lucide-react";

interface ProjectDynamicGalleryProps {
  projectTitle: string;
}

export function ProjectDynamicGallery({ projectTitle }: ProjectDynamicGalleryProps) {
  const { data } = usePortfolio();
  const gallery = (data.gallery || []).filter((g) => !g.visibility || g.visibility === "public");

  // Filter items linked specifically to this project or canon fallback
  const projectGallery = gallery.filter((item) => {
    if (item.project && item.project.toLowerCase() === projectTitle.toLowerCase()) {
      return true;
    }
    // Also include items linked via canonical keywords if no explicit project property exists
    if (!item.project) {
      if (projectTitle.toLowerCase().includes("untold") && (item.title.toLowerCase().includes("piano") || item.title.toLowerCase().includes("twilight"))) {
        return true;
      }
      if (projectTitle.toLowerCase().includes("cursed") && (item.title.toLowerCase().includes("cursed") || item.category === "Concept Art")) {
        return true;
      }
      if (projectTitle.toLowerCase().includes("3 days") && (item.title.toLowerCase().includes("desert") || item.title.toLowerCase().includes("highway"))) {
        return true;
      }
    }
    return false;
  });

  if (projectGallery.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-16 border-t border-zinc-800/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] flex items-center gap-2 mb-2 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>STUDIO VAULT ARCHIVE LINK</span>
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
            Live Exhibition Frames: {projectTitle}
          </h3>
        </div>

        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition border border-[#D4AF37]/40 hover:border-white rounded-full px-5 py-2.5 bg-[#D4AF37]/10 shrink-0"
        >
          <span>Explore Full Gallery Archive</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectGallery.map((item) => (
          <Link
            key={item.id}
            href="/gallery"
            className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-[#121212] block shadow-xl transition hover:border-[#D4AF37]/60"
          >
            <div className="aspect-[16/10] overflow-hidden bg-black relative">
              <img
                src={item.imageUrl}
                alt={item.altText || item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.08]"
              />
              <div className="absolute top-3 left-3 rounded bg-black/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] border border-zinc-800">
                {item.category} // {item.aspect}
              </div>
            </div>

            <div className="p-6 space-y-2">
              <h4 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
              <div className="pt-3 flex items-center justify-between font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider">
                <span>{item.date || "Vault Record"}</span>
                <span className="flex items-center gap-1 font-bold">
                  <Maximize2 className="h-3 w-3" />
                  <span>Inspect in Lightbox</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

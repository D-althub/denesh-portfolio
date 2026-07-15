"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Film,
  Sparkles,
  ArrowRight,
  Play,
  Layers,
  Calendar,
  Eye,
  Compass,
} from "lucide-react";
import { getProjectRoute } from "@/utils/projectRoutes";

export default function ProjectsPage() {
  const { data } = usePortfolio();
  const projects = (data.projects || []).filter((p) => !p.visibility || p.visibility === "public");
  const concepts = (data.concepts || []).filter((c) => !c.visibility || c.visibility === "public");
  const [activeTab, setActiveTab] = useState<"all" | "features" | "series" | "future">("all");

  const getRoute = (id: string) => getProjectRoute(id);

  const allCards = [
    ...projects.map((p) => ({ ...p, type: p.genre.includes("Series") ? "series" : "features" })),
    ...concepts.map((c) => ({
      ...c,
      status: c.status,
      progress: 25,
      description: c.premise,
      developmentStage: "Conceptual & World Architecture",
      expectedCompletion: "Future Slate",
      type: "future",
    })),
  ];

  const filteredCards =
    activeTab === "all" ? allCards : allCards.filter((item) => item.type === activeTab);

  const featuredBillboard = projects.find((p) => p.id === "untold-stories") || projects[0];

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <main className="pt-24 pb-28">
        {/* Cinematic Netflix-style Billboard Banner */}
        <section className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-20">
          <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#121212] aspect-[21/9] sm:aspect-[24/9] shadow-[0_25px_80px_rgba(0,0,0,0.9)] group">
            <img
              src={featuredBillboard.posterUrl}
              alt={featuredBillboard.title}
              className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.15] transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 max-w-2xl z-10 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/80 px-3.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>FEATURED CINEMATIC UNIVERSE</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                {featuredBillboard.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed line-clamp-3">
                {featuredBillboard.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={getRoute(featuredBillboard.id)}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded border border-[#D4AF37] bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all hover:bg-transparent hover:text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Enter Production Dossier</span>
                </Link>

                <a
                  href="#slate-grid"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded border border-zinc-700 bg-black/60 text-zinc-300 font-mono text-xs uppercase tracking-[0.25em] hover:border-white hover:text-white transition"
                >
                  <span>Explore All {allCards.length} Productions</span>
                </a>
              </div>
            </div>

            {/* Top Right Aspect Tag */}
            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>THEATRICAL DOSSIERS // MMXXVI</span>
            </div>
          </div>
        </section>

        {/* Slate Navigation & Filter Tabs */}
        <section id="slate-grid" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800 pb-6 gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37] block mb-2">
                02 // NETFLIX-STYLE ARCHIVE SLATE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                THE PRODUCTION SLATE
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Works" },
                { id: "features", label: "Feature Films" },
                { id: "series", label: "Episodic Series" },
                { id: "future", label: "Future Concepts" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition ${
                    activeTab === tab.id
                      ? "bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "border border-zinc-800 bg-[#121212] text-zinc-400 hover:border-[#D4AF37] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Netflix-Style Premium Grid */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-zinc-800/80 bg-[#121212] transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Poster Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={card.posterUrl || "/images/untold-stories.jpg"}
                    alt={card.title}
                    className={`h-full w-full object-cover filter contrast-[1.1] transition-transform duration-700 group-hover:scale-105 ${
                      (card as any).isBlurred ? "blur-md brightness-50" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />

                  {/* Top Status & Type Badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 rounded-full border border-zinc-700/80 bg-black/80 backdrop-blur-md px-3 py-1">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        card.status.includes("Working") || card.status.includes("Active")
                          ? "bg-[#D4AF37] animate-pulse"
                          : "bg-zinc-400"
                      }`}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-300">
                      {card.status}
                    </span>
                  </div>

                  {/* Genre Tag Bottom Left */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="rounded border border-zinc-700 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                      {card.genre}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="flex flex-1 flex-col justify-between p-6 space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition">
                      {card.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-light mt-2.5 leading-relaxed line-clamp-3">
                      {card.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                    {/* Progress Bar (if available) */}
                    {typeof card.progress === "number" && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                          <span>Dossier Completion</span>
                          <span className="text-[#D4AF37] font-bold">{card.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-200"
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Milestone and Date */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="rounded bg-black/50 p-2.5 border border-zinc-800/80">
                        <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                          Milestone
                        </div>
                        <div className="text-zinc-300 truncate font-medium mt-0.5">
                          {card.developmentStage || "Screenplay Study"}
                        </div>
                      </div>
                      <div className="rounded bg-black/50 p-2.5 border border-zinc-800/80">
                        <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                          Target
                        </div>
                        <div className="text-[#D4AF37] font-semibold mt-0.5">
                          {card.expectedCompletion || "In Development"}
                        </div>
                      </div>
                    </div>

                    {/* Cinematic Dossier Entry Link */}
                    <Link
                      href={getRoute(card.id)}
                      className="w-full flex items-center justify-center space-x-2 rounded border border-zinc-800 bg-zinc-900/80 py-3 text-xs font-mono uppercase tracking-[0.2em] text-zinc-200 transition-all group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]"
                    >
                      <span>Open Cinematic Dossier</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Film, Calendar, CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { initialPortfolioData } from "@/data/portfolioData";
import { getProjectRoute } from "@/utils/projectRoutes";

export function FeaturedProjectSection() {
  const { data } = usePortfolio();
  const publicProjects = (data.projects || []).filter((p) => !p.visibility || p.visibility === "public");
  const project: any = (data as any).featuredProject || publicProjects[0] || (initialPortfolioData as any).featuredProject;

  if (!project) return null;

  return (
    <section
      id="featured"
      className="relative py-28 bg-[#090909] overflow-hidden border-t border-[#C6A55C]/15"
    >
      {/* Background Atmospheric Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C6A55C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#C6A55C]/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#C6A55C] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED PRODUCTION</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
              {project.title}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span className="px-3.5 py-1.5 rounded border border-[#C6A55C]/30 bg-[#C6A55C]/10 text-[#C6A55C] font-mono text-xs uppercase tracking-[0.2em]">
              {project.genre}
            </span>
            <span className="px-3.5 py-1.5 rounded border border-zinc-800 bg-[#121212] text-[#A8A8A8] font-mono text-xs uppercase tracking-[0.2em]">
              {project.status}
            </span>
          </div>
        </div>

        {/* Main Showcase Layout: Poster Left + Synopsis & Lore Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left: Large Theatrical Movie Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative group rounded-lg overflow-hidden border border-[#C6A55C]/30 bg-[#121212] shadow-[0_20px_60px_rgba(0,0,0,0.8)] aspect-[2/3]">
              <img
                src={project.posterUrl}
                alt={`${project.title} Official Movie Poster`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />

              {/* Bottom Poster Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C6A55C] block">
                    A FILM BY DENESH SATYA SAI
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium mt-1">
                    {project.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#C6A55C]/40 bg-[#090909]/80 flex items-center justify-center text-[#C6A55C]">
                  <Film className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Beautiful Synopsis & Core Themes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A8A8A8] block mb-4">
                SYNOPSIS & VISION
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-white font-light leading-relaxed mb-6">
                &ldquo;{project.description}&rdquo;
              </p>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed mb-8">
                {project.synopsis}
              </p>

              {/* Themes Grid */}
              <div className="mb-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C6A55C] block mb-4">
                  THEMES EXPLORED
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {project.themes && project.themes.map((theme: any, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-md bg-[#121212] border border-[#C6A55C]/20 text-xs font-mono text-[#FFFFFF]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Read More Button to Dedicated Project Page */}
            <div className="pt-6 border-t border-zinc-800">
              <Link
                href={getProjectRoute(project.slug || project.id || project.title)}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded border border-[#C6A55C] bg-[#C6A55C] text-black font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all hover:bg-[#C6A55C]/90 shadow-[0_0_25px_rgba(198,165,92,0.3)]"
              >
                <span>Read Full Production Dossier</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Character Cards Showcase */}
        {project.characters && project.characters.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Lead Characters
              </h3>
              <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.2em]">
                DRAMATIC PROFILES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.characters.map((char: any, index: number) => (
                <div
                  key={index}
                  className="group p-8 rounded-lg border border-[#C6A55C]/20 bg-[#121212]/90 hover:border-[#C6A55C]/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-2xl text-white font-medium">
                        {char.name}
                      </h4>
                      <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.18em] block mt-1">
                        {char.role} • {char.actorOrArchetype}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-[#A8A8A8] leading-relaxed">
                    {char.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Large Cinematic Stills & Moodboard Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Cinematic Stills & Moodboard
            </h3>
            <span className="font-mono text-xs text-[#A8A8A8] uppercase tracking-[0.2em]">
              VISUAL PALETTE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery &&
              project.gallery.slice(0, 3).map((still: any, idx: number) => (
                <div
                  key={idx}
                  className="group relative rounded-lg overflow-hidden border border-zinc-800 bg-[#121212] aspect-[16/10]"
                >
                  <img
                    src={still.imageUrl}
                    alt={still.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C6A55C] block">
                      STILL N° 0{idx + 1}
                    </span>
                    <p className="font-serif text-base text-white mt-0.5">
                      {still.title}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Interactive Development Timeline */}
        {project.timeline && (
          <div className="p-8 sm:p-10 rounded-lg border border-[#C6A55C]/25 bg-[#121212]">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-5 h-5 text-[#C6A55C]" />
              <h3 className="font-serif text-2xl text-white font-light">
                Development Timeline
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {project.timeline.map((stage: any, idx: number) => (
                <div
                  key={idx}
                  className={`relative p-5 rounded border ${
                    stage.completed
                      ? "border-[#C6A55C]/40 bg-[#C6A55C]/5"
                      : "border-zinc-800 bg-[#090909]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#C6A55C]">
                      {stage.date}
                    </span>
                    {stage.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#C6A55C]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#A8A8A8]" />
                    )}
                  </div>
                  <h4 className="font-serif text-lg text-white font-medium mb-1">
                    {stage.stage}
                  </h4>
                  <p className="font-sans text-xs text-[#A8A8A8] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

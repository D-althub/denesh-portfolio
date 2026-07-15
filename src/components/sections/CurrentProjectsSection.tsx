"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/portfolioData";
import {
  Film,
  Calendar,
  Layers,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { getProjectRoute } from "@/utils/projectRoutes";

export function CurrentProjectsSection() {
  const { data } = usePortfolio();
  const projects = (data.projects || []).filter((p) => !p.visibility || p.visibility === "public");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              02 // Active Production Slate
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              CURRENT PROJECTS
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Interactive status tracking for original features and episodic cinema in active development.
          </p>
        </div>

        {/* Grid of Premium Movie Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel glass-panel-hover group relative flex flex-col overflow-hidden rounded-xl"
            >
              {/* Poster Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121212]">
                <img
                  src={project.posterUrl}
                  alt={project.title}
                  className="h-full w-full object-cover filter contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 rounded-full border border-[#D4AF37]/40 bg-black/80 backdrop-blur-md px-3.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {project.status}
                  </span>
                </div>

                {/* Genre Overlay Badge */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="rounded border border-zinc-700 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-zinc-300">
                    {project.genre}
                  </span>
                </div>
              </div>

              {/* Content Box */}
              <div className="flex flex-1 flex-col justify-between p-6 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-light mt-3 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                  {/* Cinematic Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider">
                      <span className="text-zinc-400">Production Progress</span>
                      <span className="rounded bg-[#D4AF37]/10 border border-[#D4AF37]/40 px-2 py-0.5 text-[#D4AF37] font-bold text-[11px]">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative h-full rounded-full bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                      />
                    </div>
                  </div>

                  {/* Stage & Date */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="rounded bg-black/40 p-2.5 border border-zinc-800/80">
                      <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                        Development Stage
                      </div>
                      <div className="text-zinc-300 truncate font-medium mt-0.5">
                        {project.developmentStage}
                      </div>
                    </div>
                    <div className="rounded bg-black/40 p-2.5 border border-zinc-800/80">
                      <div className="text-[9px] uppercase tracking-wider text-zinc-500">
                        Expected Completion
                      </div>
                      <div className="text-[#D4AF37] font-semibold mt-0.5">
                        {project.expectedCompletion}
                      </div>
                    </div>
                  </div>

                  {/* Details Trigger Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full flex items-center justify-center space-x-2 rounded border border-zinc-800 bg-zinc-900/60 py-2.5 text-xs font-mono uppercase tracking-widest text-zinc-300 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <span>View Production Dossier</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Production Dossier Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#121212] shadow-2xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={selectedProject.posterUrl}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover filter contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-black/70 text-zinc-300 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                      {selectedProject.status}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                      {selectedProject.genre}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                <p className="text-base text-zinc-300 font-light leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.directorNotes && (
                  <div className="rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4">
                    <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-xs uppercase tracking-widest mb-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Director&apos;s Creative Note</span>
                    </div>
                    <p className="text-sm text-zinc-300 font-light italic">
                      &ldquo;{selectedProject.directorNotes}&rdquo;
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block">
                      Current Milestone
                    </span>
                    <span className="text-sm font-medium text-white">
                      {selectedProject.developmentStage}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block">
                      Target Premiere Window
                    </span>
                    <span className="text-sm font-medium text-[#D4AF37]">
                      {selectedProject.expectedCompletion}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <Link
                    href={getProjectRoute(selectedProject.id || selectedProject.title)}
                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all hover:bg-[#D4AF37] hover:text-black shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                  >
                    <span>Enter Full Cinematic Dossier</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

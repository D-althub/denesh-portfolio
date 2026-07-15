"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectType } from "@/data/portfolioData";
import { Film, Tv, Video, BookOpen, Lightbulb, X, Sparkles, ArrowRight, Check } from "lucide-react";

interface ProjectCreationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: ProjectType) => void;
}

const PROJECT_TYPES: {
  id: ProjectType;
  title: string;
  icon: any;
  tagline: string;
  description: string;
  features: string[];
  gradient: string;
  accent: string;
}[] = [
  {
    id: "Feature Film",
    title: "Feature Film",
    icon: Film,
    tagline: "Full-Length Theatrical Motion Picture",
    description: "Complete dossier for theatrical or major streaming distribution.",
    features: [
      "Overview, Synopsis & Logline",
      "Cast & Principal Crew Credits",
      "Festival Selection & Laurels",
      "Master Visual Gallery & Stills",
      "Production Timeline & Music Deck",
    ],
    gradient: "from-amber-950/40 via-zinc-900 to-black",
    accent: "border-[#D4AF37] text-[#D4AF37]",
  },
  {
    id: "Web Series",
    title: "Web Series",
    icon: Tv,
    tagline: "Episodic Television & Streaming Narrative",
    description: "Multi-season episodic structure with character arcs and world lore.",
    features: [
      "Series Bible & Premise",
      "Season & Episode Manager (Video Embeds)",
      "Character Profiles & World Building",
      "Episode Reordering & Duration Tracking",
      "Trailers, BTS & Concept Gallery",
    ],
    gradient: "from-purple-950/40 via-zinc-900 to-black",
    accent: "border-purple-400 text-purple-300",
  },
  {
    id: "Short Film",
    title: "Short Film",
    icon: Video,
    tagline: "Single Standalone Narrative & Festival Short",
    description: "Concise cinematic presentation designed for festivals and online premiere.",
    features: [
      "Logline & Core Premise",
      "Cast & Crew Roster",
      "Trailer & Master Video Embed",
      "Behind the Scenes (BTS) Frame Archive",
      "Directorial Methodology & Timeline",
    ],
    gradient: "from-blue-950/40 via-zinc-900 to-black",
    accent: "border-blue-400 text-blue-300",
  },
  {
    id: "Script Only",
    title: "Script Only",
    icon: BookOpen,
    tagline: "Screenplay Development & Spec Script",
    description: "Writing architecture without requiring gallery frames or posters.",
    features: [
      "Logline, Themes & Core Genre",
      "Character Breakdown & Dialogue Notes",
      "Script Revision History & Versioning",
      "Writing Progress Tracker (0-100%)",
      "Research Logs & Reference Archive",
    ],
    gradient: "from-emerald-950/40 via-zinc-900 to-black",
    accent: "border-emerald-400 text-emerald-300",
  },
  {
    id: "Concept",
    title: "Concept Lab",
    icon: Lightbulb,
    tagline: "Incubator Ideas, Moodboards & Visual Lore",
    description: "Early-stage development and research kept hidden until officially published.",
    features: [
      "Incubator Premise & Visual References",
      "Moodboard Grid & Inspiration Deck",
      "Location Scouting Notes",
      "Dialogue Snippets & Character Sketches",
      "Private / Draft Encapsulation",
    ],
    gradient: "from-red-950/40 via-zinc-900 to-black",
    accent: "border-red-400 text-red-300",
  },
];

export function ProjectCreationPopup({ isOpen, onClose, onSelectType }: ProjectCreationPopupProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 lg:p-8 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-6xl rounded-2xl border border-[#D4AF37]/40 bg-[#0c0c0c] p-6 sm:p-8 lg:p-10 shadow-[0_0_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>STUDIO DOSSIER GENERATOR</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
                What are you creating?
              </h2>
              <p className="font-mono text-xs text-zinc-400 max-w-2xl">
                Select a format below. The system will automatically generate the required dossier schema, media folders, dynamic URL (`/projects/slug`), and specialized editor tabs.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-zinc-800 bg-black p-2.5 text-zinc-400 hover:border-white hover:text-white transition self-end sm:self-center shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECT_TYPES.map((type) => {
              const IconComponent = type.icon;
              return (
                <div
                  key={type.id}
                  onClick={() => onSelectType(type.id)}
                  className={`group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-gradient-to-br ${type.gradient} p-6 cursor-pointer transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:-translate-y-1`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-black shadow-lg ${type.accent}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-500 group-hover:text-white transition">
                        {type.id}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#D4AF37] transition flex items-center justify-between">
                        <span>{type.title}</span>
                        <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition text-[#D4AF37]" />
                      </h3>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mt-1 font-semibold">
                        {type.tagline}
                      </p>
                      <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                        {type.description}
                      </p>
                    </div>

                    {/* Feature Checklist */}
                    <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                      <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block">
                        Auto-Generated Modules:
                      </span>
                      <ul className="space-y-1.5 font-mono text-[11px] text-zinc-300">
                        {type.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 group-hover:text-[#D4AF37] transition">
                      Click to Initialize Dossier
                    </span>
                    <span className="rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3 py-1 font-mono text-[10px] uppercase text-[#D4AF37] font-bold">
                      Select
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="rounded-xl border border-zinc-800/80 bg-black/60 p-4 font-mono text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All creations immediately sync with dynamic routing `/projects/your-slug`. No manual folder or code editing required.</span>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition uppercase font-bold"
            >
              Cancel & Return to Slate
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

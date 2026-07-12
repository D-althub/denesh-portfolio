"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Search,
  Users,
  FileText,
  RefreshCw,
  Video,
  Clapperboard,
  Scissors,
} from "lucide-react";

const WRITING_PROCESS_STAGES = [
  {
    step: "01",
    title: "Idea",
    icon: Lightbulb,
    description:
      "A lingering visual image or emotional question that refuses to leave the mind.",
    deepDive:
      "Every feature begins with an obsession. For 'Untold Stories', it was a mental image of two wristwatches showing slightly different time zones on the same table.",
  },
  {
    step: "02",
    title: "Research",
    icon: Search,
    description:
      "Immersion in historical archives, psychological case studies, and real-world locations.",
    deepDive:
      "Spending weeks interviewing specialists, scouting rainy ferry docks, and collecting authentic historical textures.",
  },
  {
    step: "03",
    title: "Character Development",
    icon: Users,
    description:
      "Crafting internal wounds, contradictions, daily routines, and unspoken secrets.",
    deepDive:
      "Writing 20-page character biographies detailing what each protagonist fears most and how they behave when completely alone.",
  },
  {
    step: "04",
    title: "Screenplay",
    icon: FileText,
    description:
      "Translating emotional beats into dramatic action, subtextual dialogue, and visual pacing.",
    deepDive:
      "Executing the architectural draft: 110 pages where every scene turn must change the emotional equilibrium of the room.",
  },
  {
    step: "05",
    title: "Revisions",
    icon: RefreshCw,
    description:
      "Relentlessly stripping away exposition and sharpening rhythm across multiple table reads.",
    deepDive:
      "Cutting any dialogue that explains what actors can express through silence, lighting, or blocking.",
  },
  {
    step: "06",
    title: "Pre-production",
    icon: Video,
    description:
      "Storyboarding shot-by-shot, designing color palettes, casting, and location scouting.",
    deepDive:
      "Collaborating with department heads to ensure production design and lens choices mirror character psychology.",
  },
  {
    step: "07",
    title: "Production",
    icon: Clapperboard,
    description:
      "Directing on set with deliberate calmness, capturing organic performances on camera.",
    deepDive:
      "Creating an intimate set atmosphere where actors feel safe to take bold emotional risks.",
  },
  {
    step: "08",
    title: "Post Production",
    icon: Scissors,
    description:
      "Sculpting rhythm in the edit bay, sound design architecture, and 35mm film grading.",
    deepDive:
      "The final rewrite: balancing silence, score, and color temperature until the film resonates long after the credits.",
  },
];

export function WritingProcessSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentStep = WRITING_PROCESS_STAGES[activeIdx];

  return (
    <section id="process" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              08 // Method & Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              WRITING & PRODUCTION PROCESS
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Horizontal animated creative pipeline from initial seed idea to theatrical exhibition.
          </p>
        </div>

        {/* Horizontal Process Steps Bar */}
        <div className="relative mb-16">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-zinc-800 via-[#D4AF37]/50 to-zinc-800 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
            {WRITING_PROCESS_STAGES.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeIdx === idx;

              return (
                <button
                  key={item.step}
                  onClick={() => setActiveIdx(idx)}
                  className={`group flex flex-col items-center text-center p-4 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#121212] border border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-105"
                      : "bg-[#121212]/50 border border-zinc-800/80 hover:border-[#D4AF37]/40"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all mb-3 ${
                      isActive
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black font-bold"
                        : "border-zinc-700 bg-black text-[#D4AF37] group-hover:border-[#D4AF37]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
                    Phase {item.step}
                  </span>
                  <span className="font-serif text-sm font-bold text-white mt-1">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-panel rounded-2xl p-8 md:p-12 border border-[#D4AF37]/30"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <span className="font-mono text-4xl sm:text-6xl font-bold text-[#D4AF37]">
                  {currentStep.step}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-wide">
                  {currentStep.title}
                </h3>
                <p className="text-sm font-light text-zinc-400 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-zinc-800 lg:pl-10">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">
                  Auteur Methodology // Deep Dive
                </div>
                <p className="text-lg sm:text-xl font-light text-zinc-200 leading-relaxed italic">
                  &ldquo;{currentStep.deepDive}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

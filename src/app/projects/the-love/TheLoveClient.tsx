"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  Film,
  ArrowLeft,
  Calendar,
  Sparkles,
  CheckCircle2,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { ProjectDynamicGallery } from "@/components/projects/ProjectDynamicGallery";
import { usePortfolio } from "@/context/PortfolioContext";

const staticProject = {
  title: "The Love",
  status: "In Development",
  genre: "Romantic Drama • Poetic Cinema",
  description:
    "An intimate exploration of memory, devotion, and the unseen threads that bind two souls across decades of silence.",
  synopsis:
    "Set against the monsoon rains and historic architecture of coastal India, THE LOVE explores the unvoiced passion between an archival restorer and a classical violinist. When a long-lost journal surfaces from the 1970s, their present lives begin to mirror an unfinished romance from the past. Through sensual texture, ambient acoustics, and painterly compositions, the film examines whether true devotion is measured by presence or by what remains across time.",
  productionStatus: "Treatment Complete — Casting & Acoustic Design",
  posterUrl: "/images/untold-stories.jpg",
  directorNotes:
    "A symphony of silence, rain, and tactile texture. Every frame is composed to feel like an impressionist painting where emotion speaks louder than dialogue.",
  themes: [
    "Memory as an Active Presence",
    "The Architecture of Devotion",
    "Unspoken vs. Spoken Truths",
    "Time and Emotional Resonance",
  ],
  characters: [
    {
      name: "Kabir Varma",
      role: "Lead Protagonist",
      actorOrArchetype: "Archival Restorer",
      description:
        "Meticulous, quiet, and deeply attuned to historical fragility, Kabir discovers that preserving the past often forces a confrontation with one's own emotional isolation.",
      imageUrl: "/images/untold-stories.jpg",
    },
    {
      name: "Meera Nair",
      role: "Lead Protagonist",
      actorOrArchetype: "Classical Violinist",
      description:
        "Passionate and spontaneous, Meera seeks an artistic language that transcends formal technique, finding resonance in Kabir's silent dedication.",
      imageUrl: "/images/denesh-portrait.jpg",
    },
  ],
  visualReferences: [
    {
      title: "Monsoon Courtyard Reflections",
      description: "Soft diffused daylight falling on wet stone and antique mahogany.",
      imageUrl: "/images/untold-stories.jpg",
    },
    {
      title: "Chiaroscuro Chamber Interiors",
      description: "Warm candlelit tones contrasted with cool rain-streaked windowpanes.",
      imageUrl: "/images/3-days-journey.jpg",
    },
  ],
  conceptArt: [
    {
      title: "The Archival Chamber Discovery",
      description: "Master concept study capturing dust motes suspended in warm afternoon light.",
      imageUrl: "/images/cursed-wings.jpg",
    },
    {
      title: "Coastal Cliff Magic Hour",
      description: "Color palette test exploring deep emerald and gold sunset hues.",
      imageUrl: "/images/the-saviour.jpg",
    },
  ],
  gallery: [
    {
      title: "Acoustic Rehearsal Hall",
      description: "Framing composition study with natural bounce lighting.",
      imageUrl: "/images/untold-stories.jpg",
    },
    {
      title: "Antique Journal Texture Study",
      description: "Macro lens detail test on aged paper and ink.",
      imageUrl: "/images/3-days-journey.jpg",
    },
    {
      title: "Rain on Mahogany Frame",
      description: "Mood and atmosphere test.",
      imageUrl: "/images/denesh-portrait.jpg",
    },
  ],
  timeline: [
    {
      stage: "Poetic Treatment & Acoustic Architecture",
      date: "Q3 2025",
      description: "Drafted emotional treatment focusing on sound design and visual motifs.",
      completed: true,
    },
    {
      stage: "Architectural Scouting",
      date: "Q1 2026",
      description: "Scouted heritage libraries, courtyards, and coastal mansions.",
      completed: true,
    },
    {
      stage: "Lead Ensemble Casting",
      date: "Q3 2026",
      description: "Auditioning classical musicians and actors for authentic chemistry.",
      completed: false,
    },
    {
      stage: "Principal Photography Window",
      date: "Q2 2027",
      description: "Targeting monsoon season for natural atmospheric lighting and rain textures.",
      completed: false,
    },
  ],
};

export function TheLoveClient() {
  const { data } = usePortfolio();

  // Find dynamic project details from admin workspace
  const liveProject = data.projects.find(
    (p) =>
      p.id === "the-love" ||
      p.id === "project-4" ||
      p.title.toLowerCase().includes("love")
  );

  const project = {
    ...staticProject,
    title: liveProject?.title || staticProject.title,
    status: liveProject?.status || staticProject.status,
    genre: liveProject?.genre || staticProject.genre,
    description: liveProject?.description || staticProject.description,
    productionStatus: liveProject
      ? `${liveProject.status}${
          liveProject.developmentStage ? ` — ${liveProject.developmentStage}` : ""
        }`
      : staticProject.productionStatus,
    posterUrl: liveProject?.posterUrl || staticProject.posterUrl,
    directorNotes: liveProject?.directorNotes || staticProject.directorNotes,
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-28">
        {/* Top Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#A8A8A8] hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO PRODUCTION SLATE</span>
          </Link>
        </div>

        {/* Hero Presentation */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.genre.toUpperCase()} • {project.status.toUpperCase()}</span>
              </div>

              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-white font-light tracking-tight leading-none mb-6">
                {project.title}
              </h1>

              <p className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37]/90 font-light max-w-3xl">
                &ldquo;{project.description}&rdquo;
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
              <div className="p-6 rounded-lg border border-[#D4AF37]/30 bg-[#121212] w-full max-w-xs">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  CURRENT STATUS
                </span>
                <p className="font-serif text-lg text-white font-medium">
                  {project.productionStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Production Banner Still */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/30 aspect-[21/9] bg-[#121212]">
            <img
              src={project.posterUrl}
              alt={project.title}
              className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]">
                  POETIC CINEMA MASTER FRAME
                </span>
                <p className="font-serif text-xl text-white mt-1">
                  Monsoon Courtyard Acoustic Sequence
                </p>
              </div>
              <Film className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* 1. Synopsis & Themes */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block mb-4">
                THE NARRATIVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-6">
                Full Synopsis
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed mb-8">
                {project.synopsis}
              </p>
              <div className="p-6 rounded border border-zinc-800 bg-[#121212]">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
                  DIRECTOR&apos;S CRAFT NOTES
                </span>
                <p className="font-serif italic text-base text-white">
                  &ldquo;{project.directorNotes}&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block mb-4">
                THEMATIC PILLARS
              </span>
              <h3 className="font-serif text-3xl text-white font-light mb-6">
                Themes Explored
              </h3>
              <div className="space-y-4">
                {project.themes.map((theme, i) => (
                  <div
                    key={i}
                    className="p-4 rounded border border-zinc-800 bg-[#121212] flex items-center justify-between"
                  >
                    <span className="font-serif text-lg text-white">{theme}</span>
                    <span className="font-mono text-xs text-[#D4AF37]">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Characters Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block mb-2">
              DRAMATIC ROLES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              Lead Characters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.characters.map((char, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border border-[#D4AF37]/25 bg-[#121212] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] block mb-2">
                    {char.role} • {char.actorOrArchetype}
                  </span>
                  <h3 className="font-serif text-3xl text-white font-light mb-4">
                    {char.name}
                  </h3>
                  <p className="font-sans text-base text-[#A8A8A8] font-light leading-relaxed">
                    {char.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Visual References & Moodboard */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block mb-2">
              CINEMATOGRAPHY & LIGHTING
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              Visual References & Moodboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.visualReferences.map((ref, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border border-zinc-800 bg-[#121212]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={ref.imageUrl}
                    alt={ref.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-white font-light mb-2">
                    {ref.title}
                  </h3>
                  <p className="font-sans text-sm text-[#A8A8A8]">
                    {ref.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Concept Art */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="mb-12 border-b border-zinc-800 pb-6 flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block mb-1">
                PRE-PRODUCTION CONCEPTUALS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
                Concept Art & Matte Studies
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.conceptArt.map((art, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-[#121212]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover filter contrast-[1.1]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-white font-light mb-2">
                    {art.title}
                  </h3>
                  <p className="font-sans text-sm text-[#A8A8A8]">
                    {art.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Gallery & Visual Stills */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="mb-12 border-b border-zinc-800 pb-6 flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block mb-1">
                ON-LOCATION EXHIBITION
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
                Production Gallery
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((still, idx) => (
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block">
                    STILL N° 0{idx + 1}
                  </span>
                  <p className="font-serif text-base text-white mt-0.5">
                    {still.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ProjectDynamicGallery projectTitle="The Love" />
        </div>

        {/* 6. Development Timeline */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="p-10 rounded-lg border border-[#D4AF37]/30 bg-[#121212]">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif text-3xl text-white font-light">
                Development Timeline & Current Status
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {project.timeline.map((stage, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded border ${
                    stage.completed
                      ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                      : "border-zinc-800 bg-[#090909]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#D4AF37]">
                      {stage.date}
                    </span>
                    {stage.completed && (
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    )}
                  </div>
                  <h4 className="font-serif text-lg text-white font-medium mb-2">
                    {stage.stage}
                  </h4>
                  <p className="font-sans text-xs text-[#A8A8A8]">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

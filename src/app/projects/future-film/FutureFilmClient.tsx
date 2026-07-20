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
  title: "3 Days Journey",
  status: "Story Under Development",
  genre: "Road Trip Drama • Thriller",
  description:
    "A transformative seventy-two hour road voyage across shifting terrains that tests relationships, secrets, and survival.",
  synopsis:
    "Spanning three consecutive days along a desolate highway, 3 DAYS JOURNEY follows three estranged companions whose vehicle breaks down miles from civilization. As temperatures drop and hidden truths emerge, the physical journey becomes a psychological reckoning. Featuring kinetic hand-held camerawork mixed with sweeping panoramic drone vistas, the film explores solitude, survival, and what remains when pretense is stripped away.",
  productionStatus: "Screenplay Locked — Principal Scouting Complete",
  posterUrl: "/images/3-days-journey.jpg",
  directorNotes:
    "Kinetic hand-held camerawork mixed with sweeping panoramic drone shots capturing vast horizons and psychological claustrophobia under open skies.",
  themes: [
    "Isolation vs. Human Connection",
    "Psychological Reckoning",
    "Survival Against Nature & Self",
    "Unmasking Hidden Truths",
  ],
  characters: [
    {
      name: "Vikram Mehta",
      role: "Lead Protagonist",
      actorOrArchetype: "Disillusioned Photojournalist",
      description:
        "Carrying decades of conflict photography behind his viewfinder, Vikram is forced to put down the camera and experience raw reality when their survival is threatened.",
      imageUrl: "/images/3-days-journey.jpg",
    },
    {
      name: "Aanya Sen",
      role: "Lead Protagonist",
      actorOrArchetype: "Environmental Researcher",
      description:
        "Analytical and fiercely guarded, Aanya holds the key to the mysterious reason they embarked on this seventy-two hour highway expedition.",
      imageUrl: "/images/denesh-portrait.jpg",
    },
  ],
  visualReferences: [
    {
      title: "Desolate Highway Magic Hour",
      description: "Long shadows stretching across cracked asphalt with warm amber tungsten headlights.",
      imageUrl: "/images/3-days-journey.jpg",
    },
    {
      title: "Hand-held Claustrophobic Interiors",
      description: "Textured dashboard reflections and rain-streaked glass framing quiet tension.",
      imageUrl: "/images/untold-stories.jpg",
    },
  ],
  conceptArt: [
    {
      title: "The Breakdown at Mile 142",
      description: "Digital matte painting and storyboard master frame for the Act I inciting incident.",
      imageUrl: "/images/3-days-journey.jpg",
    },
    {
      title: "Desert Nightfall Horizon",
      description: "Color script study emphasizing deep indigo sky vs warm campfire embers.",
      imageUrl: "/images/cursed-wings.jpg",
    },
  ],
  gallery: [
    {
      title: "Location Scout: Dry Lake Bed",
      description: "Wide angle 16mm test frame.",
      imageUrl: "/images/3-days-journey.jpg",
    },
    {
      title: "Anamorphic Flare Study",
      description: "Vintage lens flare characterization.",
      imageUrl: "/images/untold-stories.jpg",
    },
    {
      title: "Tension in the Rearview Mirror",
      description: "Close-up composition test.",
      imageUrl: "/images/the-saviour.jpg",
    },
  ],
  timeline: [
    {
      stage: "Story Treatment & Road Map Architecture",
      date: "Q2 2025",
      description: "Completed 90-page intense psychological road thriller script.",
      completed: true,
    },
    {
      stage: "Location Scouting Across Highway Vistas",
      date: "Q4 2025",
      description: "Scouted dry lake beds and isolated mountain passes across 1,200 miles.",
      completed: true,
    },
    {
      stage: "Cast Attachment & Anamorphic Tests",
      date: "Q3 2026",
      description: "Securing lead ensemble and running kinetic camera rig tests.",
      completed: false,
    },
    {
      stage: "Principal Photography",
      date: "Q1 2027",
      description: "Scheduled 30-day chronological shoot on location along highway corridors.",
      completed: false,
    },
  ],
};

export function FutureFilmClient() {
  const { data } = usePortfolio();

  // Find dynamic project details from admin workspace
  const liveProject = data.projects.find(
    (p) =>
      p.id === "3-days-journey" ||
      p.id === "project-2" ||
      p.title.toLowerCase().includes("journey") ||
      p.title.toLowerCase().includes("3 days")
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
                  ANAMORPHIC MASTER FRAME
                </span>
                <p className="font-serif text-xl text-white mt-1">
                  Seventy-Two Hour Highway Sequence
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

          <ProjectDynamicGallery projectTitle="3 Days Journey" />
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

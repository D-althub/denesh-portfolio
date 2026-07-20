"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Film, ArrowLeft, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { ProjectDynamicGallery } from "@/components/projects/ProjectDynamicGallery";
import { usePortfolio } from "@/context/PortfolioContext";

const staticProject = {
  title: "Untold Stories",
  status: "Currently In Development",
  genre: "Romantic Drama",
  description:
    "A heartfelt romantic drama exploring how time, destiny, and love reunite two souls separated by life's quietest choices.",
  synopsis:
    "Set across fifteen years of shifting seasons and unspoken memories, UNTOLD STORIES chronicles the lives of Maya, a classical pianist measuring time through unfinished compositions, and Kabir, an architect rebuilding historical ruins. When fate draws them back to the mist-covered coastal town where they first parted, they must confront whether destiny can mend what quiet misunderstanding tore apart.",
  productionStatus: "Currently In Development — Principal Photography Complete",
  posterUrl: "/images/untold-stories.jpg",
  directorNotes:
    "Filmed with vintage anamorphic lenses and natural twilight falloff to capture the bittersweet passage of time.",
  themes: [
    "Memory & Time's Passage",
    "Destiny vs. Free Will",
    "Unspoken Devotion",
    "Healing & Second Chances",
  ],
  characters: [
    {
      name: "Maya Rostova",
      role: "Lead Protagonist",
      actorOrArchetype: "Classical Pianist",
      description:
        "A quiet perfectionist whose apartment is lined with antique sheet music and metronomes. Her emotional journey centers on learning that love is not a flawless score, but an improvisation.",
      imageUrl: "/images/untold-stories.jpg",
    },
    {
      name: "Kabir Sen",
      role: "Lead Protagonist",
      actorOrArchetype: "Restoration Architect",
      description:
        "Dedicated to preserving historic structures while struggling to repair the foundations of his own past choices.",
      imageUrl: "/images/3-days-journey.jpg",
    },
  ],
  visualReferences: [
    {
      title: "Anamorphic Golden Hour",
      description: "Warm flares and natural twilight shadows over rain-slicked cobblestones.",
      imageUrl: "/images/untold-stories.jpg",
    },
    {
      title: "Tactile Interior Shadows",
      description: "Dust motes suspended in afternoon sunlight across worn wooden pianos.",
      imageUrl: "/images/denesh-portrait.jpg",
    },
  ],
  timeline: [
    {
      stage: "Story Treatment & Character Architecture",
      date: "Q1 2025",
      description: "Completed intensive character profiling and 120-page screenplay draft.",
      completed: true,
    },
    {
      stage: "Location Scouting & Anamorphic Tests",
      date: "Q3 2025",
      description: "Scouted coastal misty harbors and secured vintage anamorphic primes.",
      completed: true,
    },
    {
      stage: "Principal Photography",
      date: "Q1 2026",
      description: "Captured 38 days of cinematic principal photography.",
      completed: true,
    },
    {
      stage: "Original Orchestral Score & Final Color Polish",
      date: "Late 2026",
      description: "Collaborating with string quartets and DI colorists for theatrical mastering.",
      completed: false,
    },
  ],
};

export function UntoldStoriesClient() {
  const { data } = usePortfolio();

  // Find dynamic project details from admin workspace
  const liveProject = data.projects.find(
    (p) =>
      p.id === "untold-stories" ||
      p.id === "project-1" ||
      p.title.toLowerCase().includes("untold")
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
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#C6A55C]/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-28">
        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#A8A8A8] hover:text-[#C6A55C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO THEATRICAL SLATE</span>
          </Link>
        </div>

        {/* Hero Presentation */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#C6A55C] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.genre.toUpperCase()} • {project.status.toUpperCase()}</span>
              </div>

              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-white font-light tracking-tight leading-none mb-6">
                {project.title}
              </h1>

              <p className="font-serif italic text-2xl sm:text-3xl text-[#C6A55C]/90 font-light max-w-3xl">
                &ldquo;{project.description}&rdquo;
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
              <div className="p-6 rounded-lg border border-[#C6A55C]/30 bg-[#121212] w-full max-w-xs">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C6A55C] block mb-1">
                  PRODUCTION STATUS
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
          <div className="relative rounded-xl overflow-hidden border border-[#C6A55C]/30 aspect-[21/9] bg-[#121212]">
            <img
              src={project.posterUrl}
              alt={project.title}
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#C6A55C]">
                  ANAMORPHIC MASTER FRAME
                </span>
                <p className="font-serif text-xl text-white mt-1">
                  Twilight Coastal Parting Sequence
                </p>
              </div>
              <Film className="w-6 h-6 text-[#C6A55C]" />
            </div>
          </div>
        </div>

        {/* Synopsis & Core Themes Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] block mb-4">
                THE NARRATIVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-6">
                Full Synopsis
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed mb-8">
                {project.synopsis}
              </p>
              {project.directorNotes && (
                <div className="p-6 rounded border border-zinc-800 bg-[#121212]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C6A55C] block mb-2">
                    DIRECTOR&apos;S CRAFT NOTES
                  </span>
                  <p className="font-serif italic text-base text-white">
                    &ldquo;{project.directorNotes}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] block mb-4">
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
                    <span className="font-serif text-lg text-white">
                      {theme}
                    </span>
                    <span className="font-mono text-xs text-[#C6A55C]">
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Characters Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="mb-12 border-b border-zinc-800 pb-6 flex items-end justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] block mb-2">
                DRAMATIC ROLES
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
                Lead Characters
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.characters.map((char, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border border-[#C6A55C]/25 bg-[#121212] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A55C] block mb-2">
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

        {/* Visual References & Moodboard */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] block mb-2">
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

          <ProjectDynamicGallery projectTitle="Untold Stories" />
        </div>

        {/* Development Timeline */}
        {project.timeline && (
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
            <div className="p-10 rounded-lg border border-[#C6A55C]/30 bg-[#121212]">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-5 h-5 text-[#C6A55C]" />
                <h2 className="font-serif text-3xl text-white font-light">
                  Production Timeline
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {project.timeline.map((stage, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded border ${
                      stage.completed
                        ? "border-[#C6A55C]/40 bg-[#C6A55C]/5"
                        : "border-zinc-800 bg-[#090909]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-[#C6A55C]">
                        {stage.date}
                      </span>
                      {stage.completed && (
                        <CheckCircle2 className="w-4 h-4 text-[#C6A55C]" />
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
        )}
      </main>

      <Footer />
    </div>
  );
}

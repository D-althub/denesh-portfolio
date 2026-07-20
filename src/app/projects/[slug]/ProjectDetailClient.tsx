"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { matchesSlug } from "@/utils/slugMatcher";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  Sparkles,
  ArrowLeft,
  Compass,
  BookOpen,
  Layers,
  Film,
  Users,
  MapPin,
  Calendar,
  Clock,
  Feather,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";
import { ProjectDynamicGallery } from "@/components/projects/ProjectDynamicGallery";

interface ProjectDetailClientProps {
  slug: string;
}

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { data, addMessage } = usePortfolio();
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [isSent, setIsSent] = useState(false);

  // Find project or concept matching the slug
  const liveProject = data.projects.find((p) => matchesSlug(p, slug));
  const liveConcept = data.concepts.find((c) => matchesSlug(c, slug));

  const handleInquirySubmit = (e: React.FormEvent, title: string) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMsg) return;

    addMessage({
      name: inquiryName,
      email: inquiryEmail,
      subject: `Dossier Inquiry: ${title}`,
      message: inquiryMsg,
    });

    setIsSent(true);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMsg("");
    setTimeout(() => setIsSent(false), 5000);
  };

  if (!liveProject && !liveConcept) {
    return (
      <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white flex flex-col justify-between">
        <Navbar />
        <main className="pt-40 pb-28 max-w-3xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/60 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Compass className="w-4 h-4 animate-spin" />
            <span>DOSSIER NOT FOUND</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-white font-light tracking-tight">
            Vault Record Empty
          </h1>
          <p className="font-sans text-lg text-zinc-400 font-light max-w-xl mx-auto">
            The requested project or concept record is not cataloged in the studio archives, or has been marked confidential.
          </p>
          <div className="pt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded border border-[#D4AF37] bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-[0.25em] font-bold hover:bg-transparent hover:text-[#D4AF37] transition shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Slate</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Concept Detail View ---
  if (liveConcept) {
    const concept = liveConcept;
    const isBlurred = concept.isBlurred;

    return (
      <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
        <Navbar />

        <main className="pt-32 pb-28">
          {/* Breadcrumbs */}
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#A8A8A8] hover:text-[#D4AF37] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>RETURN TO SLATE</span>
            </Link>
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column - Poster/Artwork */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-[#121212] aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
                  <img
                    src={concept.posterUrl || "/images/3-days-journey.jpg"}
                    alt={concept.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                      isBlurred ? "blur-xl scale-110 brightness-50" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />
                  
                  {isBlurred && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className="p-3.5 rounded-full bg-black/60 border border-zinc-800 backdrop-blur-md">
                        <Film className="w-8 h-8 text-[#D4AF37]" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                        PRE-PRODUCTION LOCKED
                      </span>
                      <p className="font-serif italic text-sm text-zinc-300 max-w-xs">
                        Visual materials for this concept are currently restricted during co-development negotiations.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Spec Sheet & Inquiry */}
              <div className="lg:col-span-7 space-y-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/85 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                    <Sparkles className="w-4 h-4" />
                    <span>FUTURE SLATE CONCEPT</span>
                  </div>
                  <h1 className="font-serif text-5xl sm:text-6xl text-white font-light tracking-tight leading-tight">
                    {concept.title}
                  </h1>
                </div>

                {/* Concept Metadata Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="rounded-xl border border-zinc-800 bg-[#121212]/80 p-5">
                    <span className="text-zinc-500 block uppercase tracking-wider mb-1">
                      GENRE
                    </span>
                    <span className="text-[#D4AF37] font-semibold text-sm">
                      {concept.genre}
                    </span>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-[#121212]/80 p-5">
                    <span className="text-zinc-500 block uppercase tracking-wider mb-1">
                      MOOD / GENESIS
                    </span>
                    <span className="text-white font-medium text-sm">
                      {concept.mood}
                    </span>
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-[#121212]/80 p-5">
                    <span className="text-zinc-500 block uppercase tracking-wider mb-1">
                      DEVELOPMENT
                    </span>
                    <span className="text-zinc-300 font-medium text-sm">
                      {concept.status}
                    </span>
                  </div>
                </div>

                {/* The Premise */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                    CONCEPT PREMISE
                  </h3>
                  <p className="font-serif italic text-2xl sm:text-3xl text-zinc-200 font-light leading-relaxed">
                    &ldquo;{concept.premise}&rdquo;
                  </p>
                </div>

                {/* Co-Production Inquiry Form */}
                <div className="rounded-2xl border border-zinc-800 bg-[#121212] p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-serif text-2xl font-light text-white">
                      Inquire About Co-Development
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed">
                    Interested in exploring packaging, funding, or co-production options for <strong className="text-white">{concept.title}</strong>? Submit your details to open a dialogue.
                  </p>

                  <form
                    onSubmit={(e) => handleInquirySubmit(e, concept.title)}
                    className="space-y-4 font-sans"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-[#090909] border border-zinc-800 rounded px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition text-white"
                      />
                      <input
                        type="email"
                        placeholder="Your Email Address"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full bg-[#090909] border border-zinc-800 rounded px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition text-white"
                      />
                    </div>
                    <textarea
                      placeholder="Your message details..."
                      rows={4}
                      required
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      className="w-full bg-[#090909] border border-zinc-800 rounded px-4 py-3 text-sm focus:border-[#D4AF37] focus:outline-none transition text-white resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded border border-[#D4AF37] bg-[#D4AF37] text-black hover:bg-transparent hover:text-[#D4AF37] font-mono text-xs uppercase tracking-widest font-bold transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Inquiry</span>
                    </button>
                  </form>

                  {isSent && (
                    <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] justify-center py-2 animate-fade-in bg-zinc-900/60 rounded border border-zinc-800">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Inquiry transmitted successfully to Studio Archives.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Project Detail View ---
  const project = liveProject!;
  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-28">
        {/* Top Breadcrumbs */}
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
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-2 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.projectType || "Feature Film"} • {project.genre.toUpperCase()}</span>
              </div>

              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-white font-light tracking-tight leading-none mb-4">
                {project.title}
              </h1>

              {project.logline && (
                <p className="font-serif italic text-2xl sm:text-3xl text-zinc-300 font-light max-w-3xl leading-relaxed">
                  &ldquo;{project.logline}&rdquo;
                </p>
              )}
            </div>

            {/* Spec Card */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
              <div className="p-6 rounded-xl border border-zinc-800 bg-[#121212] w-full max-w-sm space-y-4">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 block mb-1">
                    PRODUCTION STATUS
                  </span>
                  <p className="font-serif text-xl text-white font-medium">
                    {project.status}
                  </p>
                </div>
                {project.developmentStage && (
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 block mb-1">
                      CURRENT STAGE
                    </span>
                    <p className="font-sans text-sm text-zinc-300 font-light">
                      {project.developmentStage}
                    </p>
                  </div>
                )}
                {project.expectedCompletion && (
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 block mb-1">
                      TARGET COMPLETION
                    </span>
                    <p className="font-sans text-sm text-[#D4AF37] font-semibold">
                      {project.expectedCompletion}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero/Poster Wide Banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[21/9] bg-[#121212] shadow-2xl">
            <img
              src={project.heroBannerUrl || project.posterUrl || "/images/3-days-journey.jpg"}
              alt={project.title}
              className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-bold">
                  PRODUCTION DOSSIER FRAME
                </span>
                <p className="font-serif text-xl text-white mt-1">
                  {project.title} Storyboard Concept
                </p>
              </div>
              <Film className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Narrative & Info */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Synopsis & Director Notes */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block font-bold">
                  THE NARRATIVE
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
                  Synopsis
                </h2>
                <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                  {project.synopsis || project.description}
                </p>
              </div>

              {project.directorNotes && (
                <div className="p-8 rounded-xl border border-zinc-800 bg-[#121212] space-y-3">
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-bold">
                      DIRECTOR&apos;S CRAFT NOTES
                    </span>
                  </div>
                  <p className="font-serif italic text-base text-zinc-100 leading-relaxed">
                    &ldquo;{project.directorNotes}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Production Progress & Specs */}
            <div className="lg:col-span-4 space-y-8">
              {/* Progress Bar */}
              {typeof project.progress === "number" && (
                <div className="space-y-3 p-6 rounded-xl border border-zinc-800 bg-[#121212]">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-zinc-400">
                    <span>Slate Progress</span>
                    <span className="text-[#D4AF37] font-bold">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-950 border border-zinc-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-600 to-[#D4AF37]"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Crew / Cast quick details */}
              {project.cast && project.cast.length > 0 && (
                <div className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block font-bold">
                    LEAD CAST
                  </span>
                  <div className="space-y-3">
                    {project.cast.map((actor) => (
                      <div
                        key={actor.id}
                        className="p-4 rounded-xl border border-zinc-800/80 bg-[#121212]/50 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-serif text-white font-medium">{actor.name}</p>
                          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                            as {actor.roleName}
                          </p>
                        </div>
                        <Users className="w-4 h-4 text-zinc-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* World Building Section */}
        {project.worldBuilding && project.worldBuilding.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
            <div className="mb-12 border-b border-zinc-800 pb-6 flex items-center gap-3">
              <Compass className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37] block font-bold">
                  WORLD DESIGN
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
                  Lore & Atmosphere
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.worldBuilding.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-xl border border-zinc-800 bg-[#121212] space-y-3"
                >
                  <h3 className="font-serif text-2xl text-white font-light">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Timeline Section */}
        {project.timeline && project.timeline.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
            <div className="p-10 rounded-xl border border-zinc-800 bg-[#121212] space-y-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="font-serif text-3xl text-white font-light">
                  Production Timeline & Road Map
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.timeline.map((stage, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-lg border ${
                      stage.completed
                        ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                        : "border-zinc-800/80 bg-[#090909]"
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
                    <p className="font-sans text-xs text-zinc-400 font-light">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Gallery */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <ProjectDynamicGallery projectTitle={project.title} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

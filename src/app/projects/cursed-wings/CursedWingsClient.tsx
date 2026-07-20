"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  Sparkles,
  ArrowLeft,
  ShieldAlert,
  Flame,
  Compass,
  Music,
  BookOpen,
  Feather,
  Clock,
  Layers,
} from "lucide-react";
import { ProjectDynamicGallery } from "@/components/projects/ProjectDynamicGallery";
import { usePortfolio } from "@/context/PortfolioContext";

const staticProject = {
  title: "Cursed Wings",
  status: "In Development",
  genre: "Dark Fantasy Series",
  description:
    "A dark fantasy series exploring destiny, sacrifice, supernatural forces, and the hidden cost of absolute power.",
  synopsis:
    "The Obsidian Citadel rises 14,000 feet above the Shattered Mistland. Built from volcanic basalt and reinforced with celestial brass conduits, the fortress exists in a perpetual twilight governed by ancient atmospheric seals that alter air density and gravitational pull. Below the clouds lie the Ashlands — a lawless expanse where fallen sentinels and earth-bound tribes survive amidst volcanic vents and forgotten relics.",
  productionStatus: "Dark Fantasy Series • World Experience",
  posterUrl: "/images/cursed-wings.jpg",
  directorNotes: "",
};

const rules = [
  {
    rule: "Law of Sacrificial Flight",
    explanation:
      "Obsidian wings do not beat by atmospheric wind alone; their armatures draw kinetic energy directly from the iron inside the bearer's bloodstream.",
  },
  {
    rule: "The Atmospheric Stratum Seal",
    explanation:
      "Breaching the 16,000-foot upper stratosphere without consecrated volcanic brass armor causes immediate cellular severance.",
  },
  {
    rule: "The Eclipse Covenant",
    explanation:
      "During the Tri-Moon Eclipse, all wing conduits lock open, rendering sentinels unable to retract their wings or seek earthly sanctuary.",
  },
];

const powerSystem = [
  {
    name: "Resonance Forging",
    mechanics: "Attuning volcanic basalt plates to the bearer's heartbeat via iron conduits.",
    toll: "Gradual calcification of the bearer's skeletal structure over seven years.",
  },
  {
    name: "Ash-Gliding Conduits",
    mechanics: "Manipulating thermal updrafts above subterranean magma rifts.",
    toll: "Permanent degradation of peripheral vision and retinal burning.",
  },
  {
    name: "Soul-Severance Dive",
    mechanics: "Free-falling through atmospheric seals to attain supersonic strike velocity.",
    toll: "Loss of autobiographical memory with each descent.",
  },
];

const timelineEras = [
  {
    era: "Era I • The Sundering",
    title: "The First Sky Fracture",
    description:
      "The ancient celestial rupture that separated the High Obsidian Cloisters from the Shattered Ashlands below.",
  },
  {
    era: "Era II • The Iron Covenant",
    title: "Forging of the Ash-Wings",
    description:
      "High Sentinels bind their lineages to the Citadel, trading earthly freedom for dominion over the upper sky.",
  },
  {
    era: "Present Era • Season I Catalyst",
    title: "The Awakening Shadow",
    description:
      "Atmospheric seals begin to hum with forbidden frequency as exiled sentinels discover the true origin of their wings.",
  },
];

const musicMoods = [
  {
    trackTitle: "Liturgies of Basalt",
    composerMood: "Deep choral drones with low brass swells.",
    description:
      "Evokes the immense architectural weight and ten-thousand-year isolation of the Obsidian Citadel.",
  },
  {
    trackTitle: "Ash on Feathers",
    composerMood: "Solo acoustic cello over distant low-frequency thunder.",
    description:
      "Intimate theme accompanying Kaelen's exile into the Shattered Ashlands.",
  },
];

const inspirations = [
  "Chiaroscuro Painting & Caravaggesque Shadow Play",
  "High Fantasy Mythos & Gothic Monastic Architecture",
  "Practical Armor Craftsmanship & Tactile Metallurgy",
  "Poetic Tragedies of Classical Antiquity",
];

export function CursedWingsClient() {
  const { data } = usePortfolio();

  // Find dynamic project details from admin workspace
  const liveProject = data.projects.find(
    (p) =>
      p.id === "cursed-wings" ||
      p.id === "cursed-wings-series" ||
      p.title.toLowerCase().includes("cursed")
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
        {/* Top Return Navigation */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#A8A8A8] hover:text-[#C6A55C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO THEATRICAL SLATE</span>
          </Link>
        </div>

        {/* Hero Banner for Cursed Wings */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="relative rounded-2xl overflow-hidden border border-[#C6A55C]/40 bg-[#121212] aspect-[21/9] shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            <img
              src={project.posterUrl}
              alt="Cursed Wings Dark Fantasy Universe"
              className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#C6A55C] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{project.genre.toUpperCase()} • {project.status.toUpperCase()}</span>
              </div>
              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-white font-light tracking-tight leading-none mb-4">
                {project.title}
              </h1>
              <p className="font-sans text-lg sm:text-xl text-[#A8A8A8] max-w-3xl font-light">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: THE WORLD */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-3">
                <Compass className="w-4 h-4" />
                <span>SECTION 01 • THE REALM</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-light mb-6">
                The World: The Obsidian Citadel
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed mb-6">
                {project.synopsis}
              </p>
              {project.directorNotes && (
                <div className="p-6 rounded border border-zinc-800 bg-[#121212] mt-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C6A55C] block mb-2">
                    DIRECTOR&apos;S NOTES
                  </span>
                  <p className="font-serif italic text-base text-white">
                    &ldquo;{project.directorNotes}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#C6A55C]/30 bg-[#121212] aspect-[4/3]">
                <img
                  src={project.posterUrl}
                  alt="Obsidian Citadel Architecture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: THE RULES */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>SECTION 02 • CANON LAWS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              The Rules of Flight & Sky
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-[#C6A55C]/25 bg-[#121212] hover:border-[#C6A55C]/50 transition-colors"
              >
                <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.2em] block mb-3">
                  CANON LAW N° 0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl text-white font-light mb-4">
                  {rule.rule}
                </h3>
                <p className="font-sans text-sm text-[#A8A8A8] leading-relaxed">
                  {rule.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: CHARACTERS */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-2">
              <Feather className="w-4 h-4" />
              <span>SECTION 03 • KEY FIGURES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              Characters & Archetypes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg border border-[#C6A55C]/30 bg-[#121212] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.2em] block mb-2">
                  THE WINGED EXILE
                </span>
                <h3 className="font-serif text-3xl text-white font-light mb-4">
                  Kaelen Vane
                </h3>
                <p className="font-sans text-base text-[#A8A8A8] font-light leading-relaxed">
                  Bearer of the Ash-Forged Wings. Disgraced High Sentinel whose wings burn hotter the closer he comes to uncovering the Citadel&apos;s forbidden history.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-lg border border-[#C6A55C]/30 bg-[#121212] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.2em] block mb-2">
                  KEEPER OF SEALS
                </span>
                <h3 className="font-serif text-3xl text-white font-light mb-4">
                  Lyra of the Upper Cloister
                </h3>
                <p className="font-sans text-base text-[#A8A8A8] font-light leading-relaxed">
                  Archivist and alchemist who decodes ancient liturgical inscriptions hidden beneath volcanic basalt strata.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: MYTHOLOGY */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="p-10 sm:p-14 rounded-xl border border-[#C6A55C]/30 bg-[#121212]">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-4">
              <BookOpen className="w-4 h-4" />
              <span>SECTION 04 • ANCIENT LORE</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light mb-6">
              Mythology of the Shattered Sky
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl text-[#C6A55C]/90 font-light leading-relaxed mb-6">
              &ldquo;Ten thousand years ago, the First Architects traded the sun for flight. They sealed the sky behind obsidian vaults to trap the Primordial Seraphs, forging weapons from their fallen feathers.&rdquo;
            </p>
            <p className="font-sans text-base text-[#A8A8A8] font-light leading-relaxed">
              Every wing worn by the sentinels contains a fragment of those original seraphic armatures. To wear them is to carry a piece of an imprisoned god.
            </p>
          </div>
        </section>

        {/* Section 5: POWER SYSTEM */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-2">
              <Flame className="w-4 h-4" />
              <span>SECTION 05 • SACRIFICIAL MECHANICS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              Power System & Physical Toll
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {powerSystem.map((power, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-zinc-800 bg-[#121212] hover:border-[#C6A55C]/40 transition-colors"
              >
                <h3 className="font-serif text-2xl text-white font-light mb-3">
                  {power.name}
                </h3>
                <p className="font-sans text-sm text-[#A8A8A8] mb-6">
                  {power.mechanics}
                </p>
                <div className="pt-4 border-t border-zinc-800">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C6A55C] block mb-1">
                    PHYSIOLOGICAL TOLL
                  </span>
                  <p className="font-sans text-xs text-zinc-300">
                    {power.toll}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: TIMELINE */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-2">
              <Clock className="w-4 h-4" />
              <span>SECTION 06 • HISTORICAL EPOCHS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              Chronology of the Realm
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timelineEras.map((era, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-[#C6A55C]/25 bg-[#121212]"
              >
                <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.2em] block mb-2">
                  {era.era}
                </span>
                <h3 className="font-serif text-2xl text-white font-light mb-3">
                  {era.title}
                </h3>
                <p className="font-sans text-sm text-[#A8A8A8] leading-relaxed">
                  {era.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: CONCEPT ART */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-2">
              <Layers className="w-4 h-4" />
              <span>SECTION 07 • VISUAL CONCEPTS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              Concept Art & World Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#121212]">
              <div className="aspect-[16/10]">
                <img
                  src={project.posterUrl}
                  alt="Winged Sentinel Concept"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-white font-light mb-1">
                  Sentinel Obsidian Wing Armature
                </h3>
                <p className="font-sans text-sm text-[#A8A8A8]">
                  Practical costume and armature design study.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#121212]">
              <div className="aspect-[16/10]">
                <img
                  src="/images/the-saviour.jpg"
                  alt="Upper Cloister Gate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-white font-light mb-1">
                  The Upper Cloister Sanctuary
                </h3>
                <p className="font-sans text-sm text-[#A8A8A8]">
                  Basalt architecture amidst cloud inversion layers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: MUSIC MOOD */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
          <div className="mb-12 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] mb-2">
              <Music className="w-4 h-4" />
              <span>SECTION 08 • ACOUSTIC MOOD</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
              Music & Liturgical Soundscape
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {musicMoods.map((music, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg border border-zinc-800 bg-[#121212]"
              >
                <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.2em] block mb-2">
                  THEME N° 0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl text-white font-light mb-2">
                  {music.trackTitle}
                </h3>
                <p className="font-sans text-sm text-[#A8A8A8] mb-4">
                  {music.composerMood}
                </p>
                <p className="font-sans text-xs text-zinc-400">
                  {music.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Studio Vault Gallery */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-20">
          <ProjectDynamicGallery projectTitle="Cursed Wings" />
        </div>

        {/* Section 9: INSPIRATIONS */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-20">
          <div className="p-10 sm:p-12 rounded-xl border border-[#C6A55C]/30 bg-[#121212]">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] block mb-4">
              SECTION 09 • AESTHETIC GENESIS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-6">
              Auteur Inspirations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inspirations.map((insp, i) => (
                <div
                  key={i}
                  className="p-4 rounded border border-zinc-800 bg-[#090909] font-serif text-base text-white"
                >
                  {insp}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

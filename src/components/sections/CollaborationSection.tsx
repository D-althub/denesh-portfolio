"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  TrendingUp,
  Camera,
  Scissors,
  Music,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const COLLABORATION_DEPARTMENTS = [
  {
    title: "Actors",
    icon: Users,
    tagline: "Character & Performance",
    desc: "Seeking actors who value psychological realism and subtle subtext over theatrical exaggeration.",
  },
  {
    title: "Producers",
    icon: Briefcase,
    tagline: "Co-Production & Packaging",
    desc: "Partnering with visionary producers for regional and European co-productions.",
  },
  {
    title: "Investors",
    icon: TrendingUp,
    tagline: "Film Slate Financing",
    desc: "Equity & slate participation opportunities for original features with international festival potential.",
  },
  {
    title: "Cinematographers",
    icon: Camera,
    tagline: "Atmospheric Optics",
    desc: "Collaborating with DPs passionate about anamorphic lenses, natural light, and shadow separation.",
  },
  {
    title: "Editors",
    icon: Scissors,
    tagline: "Rhythm & Architectural Pace",
    desc: "Editors who sculpt silence and emotional tension inside every scene transition.",
  },
  {
    title: "Music Directors",
    icon: Music,
    tagline: "Score & Sonic Landscape",
    desc: "Composers blending acoustic strings, minimal synth textures, and ambient room tone.",
  },
];

export function CollaborationSection() {
  const [selectedRole, setSelectedRole] = useState("Actors");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              11 // Creative Syndicate
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              INVITATION TO COLLABORATE
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            We actively invite dialogues with department specialists across our upcoming 2026–2028 production slates.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {COLLABORATION_DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            const isSelected = selectedRole === dept.title;

            return (
              <div
                key={dept.title}
                onClick={() => {
                  setSelectedRole(dept.title);
                  setSubmitted(false);
                }}
                className={`cursor-pointer rounded-xl p-6 transition-all ${
                  isSelected
                    ? "border-2 border-[#D4AF37] bg-[#121212] shadow-[0_0_30px_rgba(212,175,55,0.2)] scale-[1.02]"
                    : "border border-zinc-800 bg-[#121212]/60 hover:border-[#D4AF37]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded border border-[#D4AF37]/30 bg-black text-[#D4AF37]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {dept.tagline}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {dept.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {dept.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Inquiry Drawer / Form */}
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-[#D4AF37]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                Selected Department: {selectedRole}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Submit Confidential Reel & Inquiry
              </h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                Whether you are an actor seeking character sides for &apos;Untold Stories&apos; or an equity investor reviewing our slate prospectus, our development desk reviews every serious submission.
              </p>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-8 text-center space-y-3"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-white">
                    Inquiry Received by Denesh Satya Sai
                  </h4>
                  <p className="text-sm text-zinc-300 font-light">
                    Thank you for connecting regarding <strong className="text-[#D4AF37]">{selectedRole}</strong>. Our production team will review your portfolio and reply within 48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-mono uppercase tracking-widest text-[#D4AF37] underline"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                        Full Name / Studio
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Julian Mercer"
                        className="w-full rounded border border-zinc-800 bg-black/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                        Direct Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="julian@mercerfilms.com"
                        className="w-full rounded border border-zinc-800 bg-black/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                      Showreel / IMDb / Portfolio Link
                    </label>
                    <input
                      required
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolio: e.target.value })
                      }
                      placeholder="https://imdb.com/name/... or https://vimeo.com/..."
                      className="w-full rounded border border-zinc-800 bg-black/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                      Personal Note / Proposal
                    </label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      placeholder={`Tell us about your interest in collaborating as ${selectedRole}...`}
                      className="w-full rounded border border-zinc-800 bg-black/60 px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 text-xs font-mono uppercase tracking-[0.25em] text-black font-semibold hover:bg-transparent hover:text-[#D4AF37]"
                  >
                    <span>Send {selectedRole} Dossier</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

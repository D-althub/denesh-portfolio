"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import {
  Mail,
  Camera,
  Film,
  Share2,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white flex flex-col justify-between">
      <Navbar />

      <main className="pt-36 pb-28 flex-1">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>07 // DIRECT CORRESPONDENCE</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
              Let&apos;s Create Stories Together.
            </h1>
            <div className="mt-6 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-6 max-w-lg leading-relaxed">
              For script commissions, executive co-production dialogues, press inquiries, and festival screenings.
            </p>
          </div>

          {/* Quick Connect Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            <a
              href="mailto:rachabattunisatya7@gmail.com"
              className="glass-panel glass-panel-hover flex items-center justify-between p-6 rounded-xl group border border-zinc-800/80 bg-[#121212] transition-all hover:border-[#D4AF37]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800 group-hover:border-[#D4AF37] transition">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Direct Desk
                  </div>
                  <div className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition mt-0.5">
                    Email
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
            </a>

            <a
              href="https://www.instagram.com/_d_e_n_e___?igsh=MWRjMXVva3JwdHZxbg=="
              target="_blank"
              rel="noreferrer"
              className="glass-panel glass-panel-hover flex items-center justify-between p-6 rounded-xl group border border-zinc-800/80 bg-[#121212] transition-all hover:border-[#D4AF37]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800 group-hover:border-[#D4AF37] transition">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Set Stills
                  </div>
                  <div className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition mt-0.5">
                    Instagram
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
            </a>

            <a
              href="https://www.imdb.com/name/nm17442387/?ref_=tt_ov_1_1"
              target="_blank"
              rel="noreferrer"
              className="glass-panel glass-panel-hover flex items-center justify-between p-6 rounded-xl group border border-zinc-800/80 bg-[#121212] transition-all hover:border-[#D4AF37]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800 group-hover:border-[#D4AF37] transition">
                  <Film className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Credits & Canon
                  </div>
                  <div className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition mt-0.5">
                    IMDb
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/denesh-satya-sai-394175278/"
              target="_blank"
              rel="noreferrer"
              className="glass-panel glass-panel-hover flex items-center justify-between p-6 rounded-xl group border border-zinc-800/80 bg-[#121212] transition-all hover:border-[#D4AF37]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800 group-hover:border-[#D4AF37] transition">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Syndicate
                  </div>
                  <div className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition mt-0.5">
                    LinkedIn
                  </div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
            </a>
          </div>

          {/* Elegant Contact Form */}
          <div className="glass-panel rounded-2xl p-8 sm:p-14 max-w-4xl mx-auto border border-[#D4AF37]/40 bg-[#121212]/90 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-14 space-y-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-white">
                  Dispatch Transmitted Successfully
                </h3>
                <p className="text-base text-zinc-300 font-light max-w-lg mx-auto leading-relaxed">
                  Thank you for reaching out. Denesh Satya Sai and the studio executive team review incoming correspondence daily and will connect promptly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="rounded border border-[#D4AF37] bg-transparent px-8 py-3.5 text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                    CONFIDENTIAL DISPATCH
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 mt-1 block">
                    All correspondence is encrypted and routed directly to the director&apos;s desk.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
                      Your Name / Production House *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Julian Mercer // Mercer Films"
                      className="w-full rounded-lg border border-zinc-800 bg-black/90 px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none transition shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="julian@mercerfilms.com"
                      className="w-full rounded-lg border border-zinc-800 bg-black/90 px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none transition shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
                    Subject / Inquiry Type *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Co-Production Inquiry // 3 Days Journey Feature Film"
                    className="w-full rounded-lg border border-zinc-800 bg-black/90 px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2.5">
                    Confidential Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Share details regarding your proposal, screening request, or production collaboration..."
                    className="w-full rounded-lg border border-zinc-800 bg-black/90 px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none transition shadow-inner resize-y"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    * Required Fields // SSL Secured
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center space-x-3 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-10 py-4 text-xs font-mono uppercase tracking-[0.25em] text-black font-bold transition hover:bg-transparent hover:text-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  >
                    <span>Transmit Dispatch</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

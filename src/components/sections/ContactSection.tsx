"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Camera,
  Film,
  Share2,
  Send,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
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
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-3">
            12 // Direct Communication
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            GET IN TOUCH
          </h2>
          <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-6 max-w-lg">
            For press inquiries, script commissions, festival screenings, and executive co-production dialogues.
          </p>
        </div>

        {/* Quick Connect Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <a
            href="mailto:rachabattunisatya7@gmail.com"
            className="glass-panel glass-panel-hover flex items-center justify-between p-5 rounded-xl group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Direct Desk
                </div>
                <div className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                  Email
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37]" />
          </a>

          <a
            href="https://www.instagram.com/_d_e_n_e___?igsh=MWRjMXVva3JwdHZxbg=="
            target="_blank"
            rel="noreferrer"
            className="glass-panel glass-panel-hover flex items-center justify-between p-5 rounded-xl group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37]">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Set Stills
                </div>
                <div className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                  Instagram
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37]" />
          </a>

          <a
            href="https://www.imdb.com/name/nm17442387/?ref_=tt_ov_1_1"
            target="_blank"
            rel="noreferrer"
            className="glass-panel glass-panel-hover flex items-center justify-between p-5 rounded-xl group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37]">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Credits & Canon
                </div>
                <div className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                  IMDb
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37]" />
          </a>

          <a
            href="https://www.linkedin.com/in/denesh-satya-sai-394175278/"
            target="_blank"
            rel="noreferrer"
            className="glass-panel glass-panel-hover flex items-center justify-between p-5 rounded-xl group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37]">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Syndicate
                </div>
                <div className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                  LinkedIn
                </div>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37]" />
          </a>
        </div>

        {/* Elegant Contact Form */}
        <div className="glass-panel rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto border border-[#D4AF37]/30">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-white">
                Message Dispatched to Denesh Satya Sai
              </h3>
              <p className="text-sm text-zinc-300 font-light max-w-md mx-auto">
                Thank you for your dispatch. Our executive assistant reviews incoming correspondence daily and will reach out promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded border border-[#D4AF37] bg-transparent px-6 py-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              >
                Send Another Dispatch
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    Your Name / Production House
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Julian Mercer"
                    className="w-full rounded-lg border border-zinc-800 bg-black/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="julian@mercerfilms.com"
                    className="w-full rounded-lg border border-zinc-800 bg-black/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Subject / Inquiry Type
                </label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Co-Production Inquiry // Cursed Wings Season 1"
                  className="w-full rounded-lg border border-zinc-800 bg-black/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Confidential Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Share details regarding your proposal, screening request, or production collaboration..."
                  className="w-full rounded-lg border border-zinc-800 bg-black/80 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-3 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-10 py-3.5 text-xs font-mono uppercase tracking-[0.25em] text-black font-semibold transition hover:bg-transparent hover:text-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  <span>Transmit Dispatch</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

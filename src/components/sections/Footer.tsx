"use client";

import React from "react";
import { Mail, Camera, Grid, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#090909] border-t border-zinc-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Closing Note Section */}
        <div className="mb-24 space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37] block">
            — A CLOSING NOTE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-white italic max-w-4xl leading-tight">
            &ldquo;Every story deserves to be remembered.&rdquo;
          </h2>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800 via-zinc-800/40 to-transparent mb-16" />

        {/* 3-Column Footer Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Left Column: DSS Identity */}
          <div className="space-y-2">
            <div className="font-serif text-2xl font-bold tracking-wider text-white">
              DSS
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-300 font-semibold">
              DENESH SATYA SAI
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              WRITER - DIRECTOR - STORYTELLER
            </div>
          </div>

          {/* Center Column: ELSEWHERE */}
          <div className="flex flex-col md:items-center space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
              ELSEWHERE
            </span>
            <div className="flex items-center space-x-5 text-zinc-400">
              <a
                href="mailto:rachabattunisatya7@gmail.com"
                aria-label="Email"
                className="hover:text-[#D4AF37] transition"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/_d_e_n_e___?igsh=MWRjMXVva3JwdHZxbg=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-[#D4AF37] transition"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="https://www.imdb.com/name/nm17442387/?ref_=tt_ov_1_1"
                target="_blank"
                rel="noreferrer"
                aria-label="IMDb / Portfolio"
                className="hover:text-[#D4AF37] transition"
              >
                <Grid className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/denesh-satya-sai-394175278/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#D4AF37] transition"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Copyright */}
          <div className="flex flex-col md:items-end space-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            <div>© 2026</div>
            <div>ALL FRAMES RESERVED</div>
          </div>
        </div>
      </div>

      {/* Giant Bottom Watermark Text matching Screenshot 2 */}
      <div className="pointer-events-none select-none relative mt-16 w-full overflow-hidden flex justify-center">
        <div className="font-serif text-[18vw] font-bold leading-none tracking-tight text-zinc-900/40 uppercase whitespace-nowrap">
          DENESH
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
      </div>
    </footer>
  );
}

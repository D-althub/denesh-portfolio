"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

export function HeroSection() {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#090909]"
    >
      {/* Background Cinematic Visual with Slow Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: "easeOut" }}
          className="h-full w-full"
        >
          <div
            className="h-full w-full bg-cover bg-center transition-all duration-1000 filter brightness-[0.38] contrast-[1.1]"
            style={{
              backgroundImage: `url('${hero.videoBg}')`,
            }}
          />
        </motion.div>

        {/* Noir Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/60 to-transparent" />
      </div>

      {/* Main Content matching Reference Screenshot exactly */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-28 pb-20 w-full text-left">
        <div className="max-w-4xl">
          {/* Subtitle Above Headline */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-6 block"
          >
            A FILM BY DENESH SATYA SAI
          </motion.span>

          {/* Main Headline matching Reference Screenshot */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-[1.05] mb-6 drop-shadow-2xl"
          >
            Stories That{" "}
            <span className="text-[#D4AF37] italic font-serif">Stay</span>
            <br />
            With You.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-400 mb-10 block"
          >
            WRITER • DIRECTOR • STORYTELLER
          </motion.p>

          {/* Action Buttons matching Reference Screenshot exactly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap items-center gap-5"
          >
            <Link
              href="/about"
              className="border border-[#D4AF37] text-[#D4AF37] px-7 py-3.5 text-xs font-mono uppercase tracking-[0.25em] transition duration-300 hover:bg-[#D4AF37] hover:text-black"
            >
              EXPLORE MY WORLD
            </Link>

            <a
              href="#projects"
              className="border border-zinc-800 text-zinc-300 px-7 py-3.5 text-xs font-mono uppercase tracking-[0.25em] transition duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              ▷ CURRENT PROJECTS
            </a>
          </motion.div>
        </div>
      </div>

      {/* Right Vertical Edge Text matching Reference Screenshot */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block z-10 select-none">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500 block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          REEL N° 01 / MMXXV
        </span>
      </div>

      {/* Bottom Center Scroll Indicator matching Reference Screenshot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 select-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-500">
          SCROLL
        </span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-zinc-500 text-xs font-mono"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

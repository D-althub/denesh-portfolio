"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Sparkles } from "lucide-react";

export function StudioIntroLoader({ onFinish }: { onFinish?: () => void } = {}) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"countdown" | "logo" | "tagline" | "exit">(
    "countdown"
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 30) setStage("logo");
    if (progress === 70) setStage("tagline");
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setStage("exit");
        if (onFinish) {
          setTimeout(onFinish, 700);
        }
      }, 600);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090909] text-white selection:bg-transparent"
        >
          {/* Subtle Projector Light Beam Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-30">
            <div className="h-[400px] w-[600px] rounded-full bg-radial from-[#D4AF37]/20 via-transparent to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <AnimatePresence mode="wait">
              {stage === "countdown" && (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
                    Initializing Reel 35mm
                  </span>
                  <div className="text-4xl font-light tracking-widest text-zinc-400 font-mono">
                    00:{progress < 10 ? `0${progress}` : progress}
                  </div>
                </motion.div>
              )}

              {stage === "logo" && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="flex items-center space-x-3 text-[#D4AF37]">
                    <Film className="h-6 w-6 animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.5em] font-medium">
                      Production House
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-serif tracking-[0.25em] font-bold text-white">
                    DSS FILMS
                  </h1>
                </motion.div>
              )}

              {stage === "tagline" && (
                <motion.div
                  key="tagline"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <h1 className="text-3xl md:text-5xl font-serif tracking-[0.2em] font-light text-white">
                    DENESH SATYA SAI
                  </h1>
                  <p className="text-sm md:text-base font-light tracking-[0.3em] text-[#D4AF37]">
                    STORIES THAT STAY WITH YOU.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Progress Bar */}
            <div className="absolute top-36 w-48 md:w-64 h-[2px] overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-200 via-[#D4AF37] to-amber-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={() => {
              setStage("exit");
              if (onFinish) onFinish();
            }}
            className="absolute bottom-8 right-8 z-20 flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-mono uppercase tracking-widest text-zinc-400 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <span>Skip Intro</span>
            <Sparkles className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

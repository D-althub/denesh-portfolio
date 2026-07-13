"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function StudioIntroLoader({ onFinish }: { onFinish?: () => void } = {}) {
  const [active, setActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFinishIntro = () => {
    setActive(false);
    if (onFinish) {
      setTimeout(onFinish, 300);
    }
  };

  // If the video fails to load or isn't present, auto-dismiss after 3 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState === 0) {
        handleFinishIntro();
      }
    }, 3500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#090909] overflow-hidden"
        >
          {/* Full-Screen Video Intro */}
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleFinishIntro}
            className="h-full w-full object-cover filter contrast-[1.05]"
          />

          {/* Skip Intro Button */}
          <button
            onClick={handleFinishIntro}
            className="absolute bottom-8 right-8 z-20 flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs font-mono uppercase tracking-widest text-zinc-300 backdrop-blur-md transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <span>Skip Intro</span>
            <Sparkles className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

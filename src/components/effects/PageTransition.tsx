"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Derive chapter title from pathname for a subtle cinematic chapter title on transition
  const getChapterName = (path: string) => {
    if (path === "/") return "REEL 01 // THEATRICAL SLATE";
    if (path.startsWith("/projects")) return "REEL 02 // PRODUCTION DOSSIERS";
    if (path.startsWith("/gallery")) return "REEL 03 // VISUAL ARCHIVE";
    if (path.startsWith("/showreel")) return "REEL 04 // MOTION EXHIBITION";
    if (path.startsWith("/about")) return "REEL 05 // CREATIVE MANIFESTO";
    if (path.startsWith("/contact")) return "REEL 06 // DIRECT DISPATCH";
    return "DSS CINEMATIC UNIVERSE";
  };

  useEffect(() => {
    // Scroll top on pathname change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="min-h-screen w-full flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

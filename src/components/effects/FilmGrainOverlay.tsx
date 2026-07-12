"use client";

import React from "react";

export function FilmGrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.055] mix-blend-overlay"
    >
      <svg className="h-full w-full">
        <filter id="cinematic-film-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#cinematic-film-noise)"
          className="animate-grain"
        />
      </svg>
    </div>
  );
}

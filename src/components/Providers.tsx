"use client";

import React from "react";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { LenisProvider } from "@/components/effects/LenisProvider";
import { FilmGrainOverlay } from "@/components/effects/FilmGrainOverlay";
import { MouseSpotlight } from "@/components/effects/MouseSpotlight";
import { StudioIntroLoader } from "@/components/effects/StudioIntroLoader";
import { ThreeAtmosphere } from "@/components/effects/ThreeAtmosphere";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <LenisProvider>
        <StudioIntroLoader />
        <FilmGrainOverlay />
        <MouseSpotlight />
        <ThreeAtmosphere />
        {children}
      </LenisProvider>
    </PortfolioProvider>
  );
}

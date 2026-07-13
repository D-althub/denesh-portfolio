import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Film, ArrowLeft, Sparkles, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "3 Days Journey | Denesh Satya Sai",
  description:
    "Official production dossier for 3 DAYS JOURNEY — a road trip dramatic thriller written and directed by Denesh Satya Sai.",
  openGraph: {
    title: "3 Days Journey | Denesh Satya Sai",
    description:
      "A seventy-two hour road voyage that unravels unspoken secrets and transforms three lives.",
    type: "website",
  },
};

export default function FutureFilmPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#C6A55C]/30 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-28">
        {/* Top Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#A8A8A8] hover:text-[#C6A55C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO THEATRICAL SLATE</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="relative rounded-2xl overflow-hidden border border-[#C6A55C]/30 bg-[#121212] aspect-[21/9]">
            <img
              src="/images/3-days-journey.jpg"
              alt="3 Days Journey Feature Film"
              className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#C6A55C] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ROAD TRIP DRAMA • THRILLER</span>
              </div>
              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-white font-light tracking-tight leading-none mb-4">
                3 Days Journey
              </h1>
              <p className="font-serif italic text-2xl text-[#C6A55C]/90 max-w-3xl">
                &ldquo;A transformative seventy-two hour road voyage across shifting terrains that tests relationships, secrets, and survival.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Synopsis & Exploration */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A55C] block mb-4">
                THE PREMISE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-6">
                Seventy-Two Hours on the Horizon
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed mb-6">
                Spanning three consecutive days along a desolate highway, 3 DAYS JOURNEY follows three estranged companions whose vehicle breaks down miles from civilization. As temperatures drop and hidden truths emerge, the physical journey becomes a psychological reckoning.
              </p>
              <p className="font-sans text-base sm:text-lg text-[#A8A8A8] font-light leading-relaxed">
                Featuring kinetic hand-held camerawork mixed with sweeping panoramic drone vistas, the film explores solitude, survival, and what remains when pretense is stripped away.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="p-8 rounded-lg border border-zinc-800 bg-[#121212]">
                <span className="font-mono text-xs text-[#C6A55C] uppercase tracking-[0.2em] block mb-2">
                  PRODUCTION DOSSIER
                </span>
                <h3 className="font-serif text-2xl text-white font-light mb-4">
                  Status: Screenplay Locked
                </h3>
                <p className="font-sans text-sm text-[#A8A8A8] mb-6">
                  Desert location scouting completed across dry lake beds and highway vistas. Expected principal photography: early 2027.
                </p>
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-[#C6A55C]">
                  <span>AUTEUR FEATURE N° 02</span>
                  <Film className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

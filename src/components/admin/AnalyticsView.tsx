"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { BarChart3, Eye, Film, BookOpen, Lock, Activity, Users, Globe } from "lucide-react";

export function AnalyticsView() {
  const { data } = usePortfolio();
  const { projects, gallery, blog } = data;

  const totalPublic =
    projects.filter((p) => !p.visibility || p.visibility === "public").length +
    gallery.filter((g) => !g.visibility || g.visibility === "public").length +
    blog.filter((b) => !b.visibility || b.visibility === "public").length;

  const totalDraftPrivate =
    projects.filter((p) => p.visibility === "draft" || p.visibility === "private").length +
    gallery.filter((g) => g.visibility === "draft" || g.visibility === "private").length +
    blog.filter((b) => b.visibility === "draft" || b.visibility === "private").length;

  const stats = [
    {
      label: "Total Public Exhibitions",
      value: totalPublic,
      sub: "Live across theatrical web slate",
      icon: Globe,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
    },
    {
      label: "Restricted / Draft Vault Dossiers",
      value: totalDraftPrivate,
      sub: "Hidden from public navigation",
      icon: Lock,
      color: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    },
    {
      label: "Production Slate Projects",
      value: projects.length,
      sub: `${projects.filter((p) => p.status.includes("Active") || p.status.includes("Working")).length} currently in production`,
      icon: Film,
      color: "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10",
    },
    {
      label: "Visual Gallery Frames",
      value: gallery.length,
      sub: "Anamorphic compositions & concept art",
      icon: Eye,
      color: "text-purple-400 border-purple-500/30 bg-purple-950/20",
    },
    {
      label: "Director's Essays",
      value: blog.length,
      sub: "Published methodology articles",
      icon: BookOpen,
      color: "text-pink-400 border-pink-500/30 bg-pink-950/20",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
          <BarChart3 className="h-6 w-6 text-[#D4AF37]" />
          <span>STUDIO ANALYTICS & TELEMETRY</span>
        </h2>
        <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
          Real-time portfolio visibility breakdown, production counts, and simulated audience engagement metrics.
        </p>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`rounded-xl border p-6 flex flex-col justify-between space-y-4 shadow-lg ${item.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                  {item.label}
                </span>
                <Icon className="h-5 w-5 opacity-80 shrink-0" />
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-white">{item.value}</div>
              <div className="font-mono text-[11px] text-zinc-400 border-t border-zinc-800/60 pt-2">
                {item.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Engagement Dashboard */}
      <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <Activity className="h-5 w-5 text-[#D4AF37] animate-pulse" />
            <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider">
              Audience Engagement Telemetry (Last 30 Days)
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 font-mono text-[10px] text-emerald-300 uppercase font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE EDGE TRACKING</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-zinc-800/80 bg-black/60 p-5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 font-mono text-xs uppercase">
              <span>Unique Studio Visitors</span>
              <Users className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white">14,892</div>
            <div className="font-mono text-[10px] text-emerald-400 font-semibold">+24.6% vs previous month</div>
          </div>

          <div className="rounded-lg border border-zinc-800/80 bg-black/60 p-5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 font-mono text-xs uppercase">
              <span>Dossier Inspection Time</span>
              <Activity className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white">04m 32s</div>
            <div className="font-mono text-[10px] text-emerald-400 font-semibold">High retention on Visual Exhibition</div>
          </div>

          <div className="rounded-lg border border-zinc-800/80 bg-black/60 p-5 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 font-mono text-xs uppercase">
              <span>Showreel Play Rate</span>
              <Film className="h-4 w-4 text-[#D4AF37]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white">68.4%</div>
            <div className="font-mono text-[10px] text-amber-400 font-semibold">Top referrer: IMDb / Industry Dispatch</div>
          </div>
        </div>
      </div>
    </div>
  );
}

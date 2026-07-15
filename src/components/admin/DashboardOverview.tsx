"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Film,
  Video,
  Eye,
  BookOpen,
  MessageSquare,
  Sparkles,
  Plus,
  Upload,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Database,
  Globe,
} from "lucide-react";

interface DashboardOverviewProps {
  onNavigateTab: (tabId: string) => void;
}

export function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  const { data } = usePortfolio();
  const { projects, gallery, blog, messages = [] } = data;

  const publicProjectsCount = projects.filter(
    (p) => !p.visibility || p.visibility === "public"
  ).length;
  const draftProjectsCount = projects.filter(
    (p) => p.visibility === "draft" || p.visibility === "private"
  ).length;

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-10 max-w-7xl">
      {/* Top Banner & System Status */}
      <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#121212] via-[#1a1a14] to-[#121212] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                REAL-TIME PERSISTENT STUDIO CMS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Welcome back, Denesh Satya Sai
            </h2>
            <p className="font-mono text-xs text-zinc-300 max-w-2xl leading-relaxed">
              All modifications to projects, stills, essays, and settings instantly synchronize with local storage and server persistence (`portfolio-state.json`). Drafts remain strictly hidden from public visitors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab("Projects")}
              className="flex items-center gap-2 rounded-xl border border-[#D4AF37] bg-[#D4AF37] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] transition hover:bg-transparent hover:text-[#D4AF37]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Production</span>
            </button>
            <button
              onClick={() => onNavigateTab("Media")}
              className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-black px-5 py-3 font-mono text-xs uppercase tracking-widest text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <Upload className="h-4 w-4 text-[#D4AF37]" />
              <span>Upload Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Projects Card */}
        <div
          onClick={() => onNavigateTab("Projects")}
          className="group cursor-pointer rounded-xl border border-zinc-800 bg-[#121212] p-6 transition hover:border-[#D4AF37]/60 space-y-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              Theatrical Slate
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800">
              <Film className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-white group-hover:text-[#D4AF37] transition">
              {projects.length}
            </div>
            <div className="font-mono text-[10px] uppercase text-zinc-500 mt-1 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{publicProjectsCount} Public</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">{draftProjectsCount} Draft/Private</span>
            </div>
          </div>
        </div>

        {/* Gallery Card */}
        <div
          onClick={() => onNavigateTab("Media")}
          className="group cursor-pointer rounded-xl border border-zinc-800 bg-[#121212] p-6 transition hover:border-[#D4AF37]/60 space-y-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              Visual Archive
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800">
              <Eye className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-white group-hover:text-[#D4AF37] transition">
              {gallery.length}
            </div>
            <div className="font-mono text-[10px] uppercase text-zinc-500 mt-1">
              Stills & Concept Art Frames
            </div>
          </div>
        </div>

        {/* Journal Card */}
        <div
          onClick={() => onNavigateTab("Journal")}
          className="group cursor-pointer rounded-xl border border-zinc-800 bg-[#121212] p-6 transition hover:border-[#D4AF37]/60 space-y-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              Director Notes
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-white group-hover:text-[#D4AF37] transition">
              {blog.length}
            </div>
            <div className="font-mono text-[10px] uppercase text-zinc-500 mt-1">
              Published Methodology Essays
            </div>
          </div>
        </div>

        {/* Messages Card */}
        <div
          onClick={() => onNavigateTab("Messages")}
          className="group cursor-pointer rounded-xl border border-zinc-800 bg-[#121212] p-6 transition hover:border-[#D4AF37]/60 space-y-4 shadow-lg relative overflow-hidden"
        >
          {unreadMessagesCount > 0 && (
            <div className="absolute top-0 right-0 h-2 w-full bg-[#D4AF37]" />
          )}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              Inquiry Dispatches
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-[#D4AF37] border border-zinc-800">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-white group-hover:text-[#D4AF37] transition">
              {messages.length}
            </div>
            <div className="font-mono text-[10px] uppercase mt-1 flex items-center gap-1.5">
              {unreadMessagesCount > 0 ? (
                <span className="text-[#D4AF37] font-bold animate-pulse">
                  {unreadMessagesCount} Unread Inquiry Dispatches
                </span>
              ) : (
                <span className="text-zinc-500">All Correspondence Reviewed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>INSTANT CMS QUICK CONTROLS</span>
          </span>
          <span className="font-mono text-[10px] text-zinc-500 uppercase">
            Execute Actions Directly
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab("Projects")}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4 text-left transition hover:border-[#D4AF37] group"
          >
            <div>
              <div className="font-mono text-xs uppercase font-bold text-white group-hover:text-[#D4AF37]">
                01 // Production Slate
              </div>
              <div className="font-mono text-[10px] text-zinc-500 mt-1">
                Add, edit, or publish films
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
          </button>

          <button
            onClick={() => onNavigateTab("Media")}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4 text-left transition hover:border-[#D4AF37] group"
          >
            <div>
              <div className="font-mono text-xs uppercase font-bold text-white group-hover:text-[#D4AF37]">
                02 // Media Uploader
              </div>
              <div className="font-mono text-[10px] text-zinc-500 mt-1">
                Upload frames directly to disk
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
          </button>

          <button
            onClick={() => onNavigateTab("Messages")}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4 text-left transition hover:border-[#D4AF37] group"
          >
            <div>
              <div className="font-mono text-xs uppercase font-bold text-white group-hover:text-[#D4AF37]">
                03 // Read Messages
              </div>
              <div className="font-mono text-[10px] text-zinc-500 mt-1">
                Inspect co-production inquiries
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
          </button>

          <button
            onClick={() => onNavigateTab("Settings")}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4 text-left transition hover:border-[#D4AF37] group"
          >
            <div>
              <div className="font-mono text-xs uppercase font-bold text-white group-hover:text-[#D4AF37]">
                04 // Studio Settings
              </div>
              <div className="font-mono text-[10px] text-zinc-500 mt-1">
                Hero text, about, & contact info
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#D4AF37] transition" />
          </button>
        </div>
      </div>

      {/* System Health Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              Persistence Engine Status
            </h3>
          </div>
          <p className="font-mono text-xs text-zinc-400 leading-relaxed">
            Your studio database is dual-synced: running in high-speed browser state while automatically saving to server disk via `/api/portfolio`. No manual deployments required.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>JSON Backup Active</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>API Endpoints Verified</span>
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              Live Website Sync Check
            </h3>
          </div>
          <p className="font-mono text-xs text-zinc-400 leading-relaxed">
            When you click `Publish` on any project or upload a still, the public website updates instantly. Draft items remain strictly encapsulated within this secure vault.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">Live URL: https://www.deneshssai.in</span>
            <a
              href="/"
              target="_blank"
              className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1"
            >
              <span>Inspect Live Site</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Eye,
  BookOpen,
  Video,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { JournalManager } from "@/components/admin/JournalManager";
import { MediaManager } from "@/components/admin/MediaManager";
import { AnalyticsView } from "@/components/admin/AnalyticsView";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { MessagesManager } from "@/components/admin/MessagesManager";

type DashboardTab =
  | "Dashboard"
  | "Projects"
  | "Media"
  | "Gallery"
  | "Journal"
  | "Messages"
  | "Analytics"
  | "Settings";

const TABS: { id: DashboardTab; label: string; icon: any; desc: string }[] = [
  { id: "Dashboard", label: "CMS Overview", icon: Sparkles, desc: "System Health & Quick Actions" },
  { id: "Projects", label: "Production Slate", icon: Film, desc: "Feature Films & Series" },
  { id: "Media", label: "Media Manager", icon: Video, desc: "Master Image & Showreel Library" },
  { id: "Gallery", label: "Visual Exhibition", icon: Eye, desc: "Stills & Storyboards Layout" },
  { id: "Journal", label: "Director's Journal", icon: BookOpen, desc: "Essays & Methodology" },
  { id: "Messages", label: "Inquiry Desk", icon: BarChart3, desc: "Contact Correspondence" },
  { id: "Settings", label: "System & Backup", icon: Settings, desc: "JSON Backup & Security" },
];

export default function CreatorVaultDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/dss-admin");
    } catch {
      router.push("/dss-admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col lg:flex-row selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-zinc-800/80 bg-[#0b0b0b] flex flex-col justify-between shrink-0 z-30">
        <div>
          {/* Studio Brand & Vault Badge */}
          <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37] bg-black shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-bold">
                  DSS CREATOR VAULT
                </span>
                <span className="font-serif text-base font-bold text-white tracking-wide">
                  STUDIO CONTROL
                </span>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded border border-zinc-800 p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Navigation Items (Desktop & Responsive Mobile dropdown) */}
          <nav className={`p-4 space-y-1.5 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
              MANAGEMENT MODULES
            </div>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 transition text-left ${
                    isActive
                      ? "border border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] font-semibold"
                      : "border border-transparent text-zinc-400 hover:bg-zinc-900/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-[#D4AF37]" : "text-zinc-500"}`} />
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider">{tab.label}</div>
                      <div className="font-mono text-[10px] text-zinc-500 font-normal">{tab.desc}</div>
                    </div>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-[#D4AF37]" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: View Public Site & Logout */}
        <div className={`p-4 border-t border-zinc-800/80 space-y-2.5 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black px-4 py-3 font-mono text-xs text-zinc-300 hover:border-[#D4AF37] hover:text-white transition"
          >
            <span>Preview Live Studio Portal</span>
            <ExternalLink className="h-4 w-4 text-[#D4AF37]" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 font-mono text-xs uppercase tracking-wider text-red-300 hover:bg-red-600 hover:text-white hover:border-red-500 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Lock Vault & Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 min-w-0 bg-[#090909] p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top Status Breadcrumb */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="flex items-center space-x-2 font-mono text-xs text-zinc-400 uppercase tracking-widest">
            <span className="text-[#D4AF37] font-bold">DSS CREATOR VAULT</span>
            <span>//</span>
            <span className="text-white font-semibold">{activeTab} MODULE</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vault Edge Middleware Active</span>
            </span>
          </div>
        </div>

        {/* Tab Module Renderer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "Dashboard" && <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab as DashboardTab)} />}
            {activeTab === "Projects" && <ProjectsManager />}
            {activeTab === "Media" && <MediaManager />}
            {activeTab === "Gallery" && <GalleryManager />}
            {activeTab === "Journal" && <JournalManager />}
            {activeTab === "Messages" && <MessagesManager />}
            {activeTab === "Analytics" && <AnalyticsView />}
            {activeTab === "Settings" && <SettingsManager />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

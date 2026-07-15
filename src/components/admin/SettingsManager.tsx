"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { Settings, Download, Upload, RotateCcw, LogOut, ShieldAlert, Check, AlertTriangle } from "lucide-react";

export function SettingsManager() {
  const { data, resetToDefault } = usePortfolio();
  const router = useRouter();

  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Export data as JSON file
  const handleExport = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dss-studio-vault-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.projects)) {
          throw new Error("Invalid schema. JSON must contain valid studio portfolio data.");
        }
        localStorage.setItem("dss_portfolio_data_v1", JSON.stringify(parsed));
        setImportSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err: any) {
        setImportError(err.message || "Failed to parse JSON backup file.");
      }
    };
    reader.readAsText(file);
  };

  // Reset to default
  const handleReset = () => {
    if (confirm("WARNING: This will overwrite all custom vault additions and revert to the original 2026 theatrical canon. Continue?")) {
      resetToDefault();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  // Logout
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/dss-admin");
    } catch (err) {
      router.push("/dss-admin");
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
          <Settings className="h-6 w-6 text-[#D4AF37]" />
          <span>VAULT SYSTEM SETTINGS & BACKUP</span>
        </h2>
        <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
          Export full studio database (`JSON`), restore archival state, and manage administrative session security.
        </p>
      </div>

      {/* Backup & Restore Panel */}
      <div className="rounded-xl border border-zinc-800 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-zinc-800 pb-4">
          <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Download className="h-5 w-5 text-[#D4AF37]" />
            <span>PORTFOLIO DATA PERSISTENCE & BACKUP</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Since the vault updates live browser state, regularly export your backup (`.json`) file for safekeeping and deployment sync.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Export Box */}
          <div className="rounded-lg border border-zinc-800 bg-black/60 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
                01 // EXPORT STUDIO CANON
              </span>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Download a complete JSON snapshot containing all projects, gallery items, journal entries, and showreel configuration.
              </p>
            </div>

            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 rounded border border-[#D4AF37] bg-[#D4AF37]/10 px-5 py-3 font-mono text-xs uppercase font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <Download className="h-4 w-4" />
              <span>Download Vault Backup (.JSON)</span>
            </button>
          </div>

          {/* Import Box */}
          <div className="rounded-lg border border-zinc-800 bg-black/60 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                02 // IMPORT / RESTORE BACKUP
              </span>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Upload a previously saved backup file (`.json`) to overwrite current state and restore your entire portfolio immediately.
              </p>
            </div>

            <label className="flex items-center justify-center gap-2 rounded border border-emerald-500/50 bg-emerald-950/20 px-5 py-3 font-mono text-xs uppercase font-bold text-emerald-300 hover:bg-emerald-500 hover:text-black transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Upload className="h-4 w-4" />
              <span>Select Backup File (.JSON)</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {importError && (
          <div className="rounded border border-red-500/40 bg-red-950/40 p-3.5 font-mono text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
            <span>{importError}</span>
          </div>
        )}

        {importSuccess && (
          <div className="rounded border border-emerald-500/40 bg-emerald-950/40 p-3.5 font-mono text-xs text-emerald-200 flex items-center gap-2 animate-pulse font-bold">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>BACKUP RESTORED SUCCESSFULLY! Reloading studio environment...</span>
          </div>
        )}
      </div>

      {/* Reset & Danger Zone */}
      <div className="rounded-xl border border-red-900/40 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-red-900/40 pb-4">
          <h3 className="font-serif text-xl font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <span>DANGER ZONE // VAULT RESET & TERMINATION</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
              Revert to Default MMXXVI Canon
            </span>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              If you wish to clear all edits and custom entries, click here to reload original initial studio data (`portfolioData.ts`).
            </p>
          </div>

          <div className="flex sm:justify-end">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-6 py-3 font-mono text-xs uppercase font-bold text-zinc-300 hover:border-red-500 hover:text-red-400 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset to Default Canon</span>
            </button>
          </div>
        </div>

        {resetSuccess && (
          <div className="font-mono text-xs text-amber-400 font-bold flex items-center gap-1.5 animate-pulse">
            <Check className="h-4 w-4" />
            <span>STUDIO CANON RESET TO INITIAL MMXXVI THEATRICAL SLATE</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-4 border-t border-red-900/40">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-red-300 font-semibold">
              Terminate Administrative Session
            </span>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Clear your signed HTTP-only security token (`dss_vault_session`) and lock the Creator Vault immediately.
            </p>
          </div>

          <div className="flex sm:justify-end">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded border border-red-500 bg-red-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:bg-red-700 transition disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span>{loggingOut ? "LOCKING VAULT..." : "LOCK VAULT & LOGOUT"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Sparkles, ShieldCheck, ArrowRight, AlertCircle, Film } from "lucide-react";

export default function CreatorVaultLoginPage() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/dss-admin/dashboard");
      } else {
        setError(data.error || "Authentication failed. Access denied.");
      }
    } catch (err) {
      setError("Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-white flex items-center justify-center p-6 selection:bg-[#D4AF37]/30 selection:text-white overflow-hidden">
      {/* Background Ambient Glow & Film Grain */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-600/10 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-[#D4AF37]/30 bg-[#0c0c0c]/90 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-8 sm:p-10"
      >
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/80 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <Lock className="h-7 w-7 text-[#D4AF37]" />
            <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/20 animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              <span>DSS CREATOR VAULT</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white pt-2">
              STUDIO ARCHIVE ACCESS
            </h1>
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              Restricted Director & Slate Management
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-start space-x-3 rounded-lg border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-200 backdrop-blur-md"
          >
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-semibold">
              Authorized Phone Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 3332221110"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-black/80 px-4 py-3.5 font-mono text-sm text-white placeholder-zinc-600 transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-semibold">
              Security PIN
            </label>
            <input
              type="password"
              required
              maxLength={10}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-black/80 px-4 py-3.5 font-mono text-sm text-white placeholder-zinc-600 transition focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40 shadow-inner tracking-[0.3em]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2.5 rounded-lg border border-[#D4AF37] bg-[#D4AF37] py-3.5 font-mono text-xs uppercase tracking-[0.25em] font-bold text-black transition-all hover:bg-transparent hover:text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50"
          >
            {loading ? (
              <span>VERIFYING CREDENTIALS...</span>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4 fill-current" />
                <span>UNLOCK CREATOR VAULT</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Security Notice */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <Film className="w-3 w-3 text-[#D4AF37]/70" />
            <span>DENESH SATYA SAI PRODUCTIONS // MMXXVI</span>
          </div>
          <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
            256-Bit Encrypted Session. Unauthorized attempts logged.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

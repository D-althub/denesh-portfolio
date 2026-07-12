"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Concepts", href: "#concepts" },
  { label: "Story Lab", href: "#story-lab" },
  { label: "Gallery", href: "#gallery" },
  { label: "Showreel", href: "#showreel" },
  { label: "Filmography", href: "#filmography" },
  { label: "Process", href: "#process" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#090909]/85 backdrop-blur-xl border-b border-[#D4AF37]/15 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Left: Brand / Title matching Reference Screenshot */}
        <Link
          href="/"
          className="group flex items-center space-x-3 text-white transition hover:text-[#D4AF37] shrink-0"
        >
          <span className="font-serif text-lg font-bold tracking-widest text-white group-hover:text-[#D4AF37] transition">
            DSS
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-300 group-hover:text-white transition">
            DENESH SATYA SAI
          </span>
        </Link>

        {/* Right: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition hover:text-[#D4AF37]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-[#D4AF37]"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-[#090909]/95 backdrop-blur-2xl px-6 py-6">
          <div className="grid grid-cols-2 gap-4 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 border-b border-zinc-900 hover:text-[#D4AF37]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

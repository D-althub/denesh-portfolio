"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Showreel", href: "/showreel" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.altKey || e.metaKey) && e.shiftKey && (e.key === "L" || e.key === "l" || e.key === "V" || e.key === "v")) {
        e.preventDefault();
        router.push("/dss-admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#090909]/85 backdrop-blur-xl border-b border-[#D4AF37]/15 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Left: Brand / Title with Studio Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-3.5 sm:space-x-5 text-white transition hover:text-[#D4AF37] shrink-0"
        >
          <img
            src="/images/logo-cropped.png"
            alt="DSS Studio Logo"
            className="h-11 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="flex items-center space-x-3">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-white group-hover:text-[#D4AF37] transition">
              DSS
            </span>
            <span className="hidden sm:inline-block h-5 w-[1px] bg-zinc-700" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-300 group-hover:text-white transition">
              DENESH SATYA SAI
            </span>
          </div>
        </Link>

        {/* Right: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition ${
                  isActive
                    ? "text-[#D4AF37] font-semibold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                    : "hover:text-[#D4AF37]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
                )}
              </Link>
            );
          })}
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
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 border-b border-zinc-900 transition ${
                    isActive
                      ? "text-[#D4AF37] font-bold border-b-[#D4AF37]"
                      : "hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}


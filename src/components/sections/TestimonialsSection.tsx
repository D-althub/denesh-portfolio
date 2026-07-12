"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import { Quote, Star } from "lucide-react";

export function TestimonialsSection() {
  const { data } = usePortfolio();
  const { testimonials } = data;

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090909]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-2 block">
              10 // Critical Reception
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              INDUSTRY TESTIMONIALS
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mt-4 md:mt-0 max-w-sm">
            Reflections from actors, executive producers, and festival jurors on directorial craft.
          </p>
        </div>

        {/* Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel glass-panel-hover relative rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <Quote className="h-8 w-8 text-[#D4AF37]/40 mb-6" />
                <p className="text-base font-light text-zinc-200 leading-relaxed italic">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {test.author}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                    {test.role}
                  </p>
                  <p className="font-mono text-[10px] uppercase text-zinc-500 mt-0.5">
                    {test.production}
                  </p>
                </div>
                <div className="flex space-x-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

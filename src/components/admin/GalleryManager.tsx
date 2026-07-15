"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { GalleryItem } from "@/data/portfolioData";
import { Film, Plus, Edit2, Trash2, Eye, EyeOff, Lock, Check, X } from "lucide-react";

const CATEGORIES: GalleryItem["category"][] = [
  "Behind the Scenes",
  "Projects",
  "Concept Art",
  "Posters",
  "Location Scouting",
  "Production",
  "Film Stills",
  "Storyboard Frames",
  "Color Palettes",
  "Moodboards",
];

export function GalleryManager() {
  const { data, addGalleryItem, updateGalleryItem, deleteGalleryItem } = usePortfolio();
  const { gallery, projects } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formState, setFormState] = useState<Partial<GalleryItem>>({
    title: "",
    category: "Film Stills",
    imageUrl: "/images/untold-stories.jpg",
    aspect: "wide",
    description: "",
    visibility: "public",
    project: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    altText: "",
    photographer: "Denesh Satya Sai Studio",
  });

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormState({ ...item });
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormState({
      id: `gal-${Date.now()}`,
      title: "",
      category: "Film Stills",
      imageUrl: "/images/untold-stories.jpg",
      aspect: "wide",
      description: "",
      visibility: "public",
      project: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      altText: "",
      photographer: "Denesh Satya Sai Studio",
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      if (!formState.title) return;
      addGalleryItem({
        id: formState.id || `gal-${Date.now()}`,
        title: formState.title || "Untitled Still",
        category: formState.category || "Film Stills",
        imageUrl: formState.imageUrl || "/images/untold-stories.jpg",
        aspect: formState.aspect || "wide",
        description: formState.description || "",
        visibility: formState.visibility || "public",
        project: formState.project || undefined,
        date: formState.date || undefined,
        altText: formState.altText || formState.title,
        photographer: formState.photographer || "Denesh Satya Sai Studio",
      });
    } else if (editingId) {
      updateGalleryItem(editingId, formState);
    }
    setEditingId(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
            <Film className="h-6 w-6 text-[#D4AF37]" />
            <span>VISUAL EXHIBITION GALLERY</span>
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
            Manage high-resolution stills, storyboard frames, concept art, project linkage, and aspect ratio formatting.
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] transition hover:bg-transparent hover:text-[#D4AF37]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Gallery Item</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="rounded-xl border border-[#D4AF37]/50 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              {isCreating ? "NEW EXHIBITION FRAME" : `EDITING // ${formState.title}`}
            </span>
            <button type="button" onClick={() => { setIsCreating(false); setEditingId(null); }} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Frame / Artwork Title *
              </label>
              <input
                type="text"
                required
                value={formState.title || ""}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="e.g. Desert Highway Composition"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Visual Category *
              </label>
              <select
                value={formState.category || "Film Stills"}
                onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Linked Production Project
              </label>
              <select
                value={formState.project || ""}
                onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="">No Project Link (General)</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Image URL (Local or Remote) *
              </label>
              <input
                type="text"
                required
                value={formState.imageUrl || ""}
                onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="/images/3-days-journey.jpg or /uploads/..."
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Aspect Ratio Format
              </label>
              <select
                value={formState.aspect || "wide"}
                onChange={(e) => setFormState({ ...formState, aspect: e.target.value as any })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="wide">Wide (16:9 / 2.39:1 Anamorphic)</option>
                <option value="tall">Tall (Portrait / Poster)</option>
                <option value="square">Square (1:1 Concept Card)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Date / Era
              </label>
              <input
                type="text"
                value={formState.date || ""}
                onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="May 2026"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Composition Description / Technical Notes
              </label>
              <textarea
                rows={2}
                value={formState.description || ""}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Cinematography and lighting setup breakdown..."
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Photographer / Credit
              </label>
              <input
                type="text"
                value={formState.photographer || ""}
                onChange={(e) => setFormState({ ...formState, photographer: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="DSS Studio / Elena Rostova"
              />
            </div>

            <div className="space-y-2 sm:col-span-3">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Visibility Status
              </label>
              <div className="grid grid-cols-3 gap-4 pt-1">
                {(["public", "draft", "private"] as const).map((status) => (
                  <button
                    type="button"
                    key={status}
                    onClick={() => setFormState({ ...formState, visibility: status })}
                    className={`flex items-center justify-center gap-2 rounded border py-3 px-4 font-mono text-xs uppercase tracking-wider transition ${
                      formState.visibility === status
                        ? "border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                        : "border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600"
                    }`}
                  >
                    {status === "public" && <Eye className="h-4 w-4" />}
                    {status === "draft" && <EyeOff className="h-4 w-4" />}
                    {status === "private" && <Lock className="h-4 w-4" />}
                    <span>{status}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingId(null); }}
              className="rounded border border-zinc-700 bg-zinc-900 px-6 py-2.5 font-mono text-xs uppercase text-zinc-300 hover:border-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded border border-[#D4AF37] bg-[#D4AF37] px-8 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-transparent hover:text-[#D4AF37]"
            >
              <Check className="h-4 w-4" />
              <span>Save Gallery Frame</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => {
          const visibility = item.visibility || "public";
          return (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121212] overflow-hidden transition hover:border-zinc-700 shadow-lg space-y-4"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-black relative">
                <img src={item.imageUrl} alt={item.altText || item.title} className="h-full w-full object-cover" />
                <div className="absolute top-3 left-3 rounded bg-black/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] border border-zinc-800">
                  {item.category} // {item.aspect}
                </div>
                {item.project && (
                  <div className="absolute bottom-3 left-3 rounded bg-[#D4AF37]/90 text-black font-bold px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                    Project: {item.project}
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition">
                    {item.title}
                  </h3>
                  <div className="font-mono text-[10px] text-zinc-500 mt-1 flex items-center justify-between">
                    <span>{item.date || "Recent"}</span>
                    <span>{item.photographer || "DSS Studio"}</span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase border ${
                      visibility === "public"
                        ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
                        : visibility === "draft"
                        ? "border-amber-500/40 bg-amber-950/40 text-amber-300"
                        : "border-red-500/40 bg-red-950/40 text-red-300"
                    }`}
                  >
                    {visibility === "public" && <Eye className="h-3 w-3" />}
                    {visibility === "draft" && <EyeOff className="h-3 w-3" />}
                    {visibility === "private" && <Lock className="h-3 w-3" />}
                    <span>{visibility}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-xs text-zinc-300 hover:border-[#D4AF37] hover:text-white transition"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete frame "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="flex items-center gap-1 rounded border border-red-900/60 bg-red-950/40 px-2.5 py-1 font-mono text-xs text-red-300 hover:border-red-500 hover:text-white transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

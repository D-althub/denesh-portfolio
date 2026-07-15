"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { GalleryItem } from "@/data/portfolioData";
import {
  Video,
  Check,
  Sparkles,
  Film,
  Award,
  Compass,
  Upload,
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Search,
  Filter,
  X,
  AlertCircle,
} from "lucide-react";

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

export function MediaManager() {
  const { data, updateShowreel, addGalleryItem, updateGalleryItem, deleteGalleryItem } = usePortfolio();
  const { showreel, projects, gallery } = data;

  const [subTab, setSubTab] = useState<"library" | "showreel">("library");

  // Showreel form state
  const [showreelForm, setShowreelForm] = useState({
    videoUrl: showreel.videoUrl,
    directorsVision: showreel.directorsVision,
    creativePhilosophy: showreel.creativePhilosophy,
    favoriteGenres: showreel.favoriteGenres.join(", "),
    inspirations: showreel.inspirations.join(", "),
  });
  const [showreelSaved, setShowreelSaved] = useState(false);

  // Gallery/Media upload & edit form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState("ALL");
  const [filterCategory, setFilterCategory] = useState("ALL");

  const [mediaForm, setMediaForm] = useState<Partial<GalleryItem>>({
    title: "",
    category: "Film Stills",
    imageUrl: "",
    aspect: "wide",
    description: "",
    visibility: "public",
    project: "",
    date: new Date().toISOString().slice(0, 10),
    altText: "",
    photographer: "Denesh Satya Sai Studio",
  });

  const handleSaveShowreel = (e: React.FormEvent) => {
    e.preventDefault();
    updateShowreel({
      videoUrl: showreelForm.videoUrl,
      directorsVision: showreelForm.directorsVision,
      creativePhilosophy: showreelForm.creativePhilosophy,
      favoriteGenres: showreelForm.favoriteGenres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      inspirations: showreelForm.inspirations
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    });
    setShowreelSaved(true);
    setTimeout(() => setShowreelSaved(false), 3000);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setMediaForm({
      id: `gal-${Date.now()}`,
      title: "",
      category: "Film Stills",
      imageUrl: "",
      aspect: "wide",
      description: "",
      visibility: "public",
      project: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      altText: "",
      photographer: "Denesh Satya Sai Studio",
    });
  };

  const handleEditMedia = (item: GalleryItem) => {
    setEditingId(item.id);
    setIsCreating(false);
    setMediaForm({ ...item });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed. Please check server permissions.");
      }

      const json = await res.json();
      if (json.success && json.url) {
        setMediaForm((prev) => ({
          ...prev,
          imageUrl: json.url,
          title: prev.title || file.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
          altText: prev.altText || `Cinematic frame: ${file.name}`,
        }));
      } else {
        throw new Error(json.error || "Unknown upload error");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const saveMediaWithVisibility = (targetVisibility: "public" | "draft" | "private") => {
    if (isCreating) {
      if (!mediaForm.title || !mediaForm.imageUrl) return;
      addGalleryItem({
        id: mediaForm.id || `gal-${Date.now()}`,
        title: mediaForm.title,
        category: mediaForm.category || "Film Stills",
        imageUrl: mediaForm.imageUrl,
        aspect: mediaForm.aspect || "wide",
        description: mediaForm.description || "",
        visibility: targetVisibility,
        project: mediaForm.project || undefined,
        date: mediaForm.date || undefined,
        altText: mediaForm.altText || mediaForm.title,
        photographer: mediaForm.photographer || "Denesh Satya Sai Studio",
      });
    } else if (editingId) {
      updateGalleryItem(editingId, { ...mediaForm, visibility: targetVisibility });
    }
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    saveMediaWithVisibility(mediaForm.visibility || "public");
  };

  const filteredGallery = gallery.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.project && item.project.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProject = filterProject === "ALL" || item.project === filterProject;
    const matchesCategory = filterCategory === "ALL" || item.category === filterCategory;
    return matchesSearch && matchesProject && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
            <Video className="h-6 w-6 text-[#D4AF37]" />
            <span>MASTER MEDIA & SHOWREEL LIBRARY</span>
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
            Persistent image uploader (`/api/upload`), project-to-gallery linking, and master showreel stream control.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-black p-1 font-mono text-xs">
          <button
            onClick={() => setSubTab("library")}
            className={`flex items-center gap-2 rounded px-4 py-2 transition font-bold uppercase ${
              subTab === "library"
                ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>Image Library ({gallery.length})</span>
          </button>

          <button
            onClick={() => setSubTab("showreel")}
            className={`flex items-center gap-2 rounded px-4 py-2 transition font-bold uppercase ${
              subTab === "showreel"
                ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Film className="h-4 w-4" />
            <span>Showreel Config</span>
          </button>
        </div>
      </div>

      {subTab === "library" ? (
        <div className="space-y-8">
          {/* Controls & Add Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121212] p-4 sm:p-6 rounded-xl border border-zinc-800 shadow-lg">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search image archive by title, note, or project..."
                  className="w-full rounded-lg border border-zinc-800 bg-black pl-10 pr-4 py-2.5 font-mono text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Filter Project */}
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="rounded-lg border border-zinc-800 bg-black px-3 py-2.5 font-mono text-xs text-zinc-300 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="ALL">All Projects / General</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.title}>
                    Project: {p.title}
                  </option>
                ))}
              </select>

              {/* Filter Category */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-lg border border-zinc-800 bg-black px-3 py-2.5 font-mono text-xs text-zinc-300 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="ALL">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {!isCreating && !editingId && (
              <button
                onClick={handleStartCreate}
                className="flex items-center justify-center gap-2 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-transparent hover:text-[#D4AF37] transition shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Upload & Link New Image</span>
              </button>
            )}
          </div>

          {/* Media Editor Form */}
          {(isCreating || editingId) && (
            <form onSubmit={handleSaveMedia} className="rounded-xl border border-[#D4AF37]/50 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>{isCreating ? "UPLOAD & ENRICH NEW IMAGE FRAME" : `EDITING // ${mediaForm.title}`}</span>
                </span>
                <button type="button" onClick={() => { setIsCreating(false); setEditingId(null); }} className="text-zinc-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Upload Panel */}
              <div className="rounded-lg border-2 border-dashed border-zinc-800 bg-black/60 p-6 text-center hover:border-[#D4AF37]/60 transition relative group">
                {mediaForm.imageUrl ? (
                  <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
                    <div className="h-28 w-44 rounded border border-zinc-800 overflow-hidden bg-black shrink-0 relative">
                      <img src={mediaForm.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2 min-w-0">
                      <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold block">
                        Current Image Asset Loaded
                      </span>
                      <p className="font-mono text-xs text-zinc-300 break-all">{mediaForm.imageUrl}</p>
                      <label className="inline-flex items-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-4 py-1.5 font-mono text-xs text-zinc-300 hover:border-[#D4AF37] hover:text-white transition cursor-pointer">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload Replacement File</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center space-y-3 py-6">
                    <div className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 text-[#D4AF37]">
                      <Upload className="h-8 w-8 animate-bounce" />
                    </div>
                    <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                      Click to Select & Upload Image (`.JPG`, `.PNG`, `.WEBP`)
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      Files are saved directly to `public/uploads/` on the server and synced immediately with the live gallery.
                    </span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                  </label>
                )}

                {uploading && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center font-mono text-xs text-[#D4AF37] font-bold uppercase tracking-widest gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#D4AF37] animate-ping" />
                    <span>Uploading file to server storage...</span>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="rounded border border-red-500/40 bg-red-950/40 p-3.5 font-mono text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Image Title / Frame Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={mediaForm.title || ""}
                    onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                    className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    placeholder="e.g. Maya Piano Twilight Still"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Category *
                  </label>
                  <select
                    value={mediaForm.category || "Film Stills"}
                    onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value as any })}
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
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Linked Production Project
                  </label>
                  <select
                    value={mediaForm.project || ""}
                    onChange={(e) => setMediaForm({ ...mediaForm, project: e.target.value })}
                    className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="">No Project Link (General Exhibition)</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.expectedCompletion || p.status || "Project"})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Aspect Ratio Format
                  </label>
                  <select
                    value={mediaForm.aspect || "wide"}
                    onChange={(e) => setMediaForm({ ...mediaForm, aspect: e.target.value as any })}
                    className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="wide">Wide (16:9 / 2.39:1 Anamorphic Cinema)</option>
                    <option value="tall">Tall (3:4 / Portrait Poster)</option>
                    <option value="square">Square (1:1 Concept Box)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Date / Production Era
                  </label>
                  <input
                    type="text"
                    value={mediaForm.date || ""}
                    onChange={(e) => setMediaForm({ ...mediaForm, date: e.target.value })}
                    className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    placeholder="May 2026 or Summer Shoot"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Photographer / Credit
                  </label>
                  <input
                    type="text"
                    value={mediaForm.photographer || ""}
                    onChange={(e) => setMediaForm({ ...mediaForm, photographer: e.target.value })}
                    className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Denesh Satya Sai Studio / Elena Rostova"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Technical & Composition Notes / Description
                  </label>
                  <textarea
                    rows={2}
                    value={mediaForm.description || ""}
                    onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })}
                    className="w-full rounded border border-zinc-800 bg-black p-3.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Shot on 40mm anamorphic prime, tungsten amber falloff..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Alt Text (SEO & Accessibility)
                  </label>
                  <input
                    type="text"
                    value={mediaForm.altText || ""}
                    onChange={(e) => setMediaForm({ ...mediaForm, altText: e.target.value })}
                    className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Descriptive alt text for screen readers..."
                  />
                </div>

                <div className="space-y-2 sm:col-span-3">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Exhibition Visibility
                  </label>
                  <div className="grid grid-cols-3 gap-4 pt-1">
                    {(["public", "draft", "private"] as const).map((status) => (
                      <button
                        type="button"
                        key={status}
                        onClick={() => setMediaForm({ ...mediaForm, visibility: status })}
                        className={`flex items-center justify-center gap-2 rounded border py-3 px-4 font-mono text-xs uppercase tracking-wider transition ${
                          mediaForm.visibility === status
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

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingId(null); }}
                  className="rounded border border-zinc-700 bg-zinc-900 px-6 py-2.5 font-mono text-xs uppercase text-zinc-300 hover:border-white transition"
                >
                  Cancel
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={!mediaForm.imageUrl || !mediaForm.title}
                    onClick={() => saveMediaWithVisibility("draft")}
                    className="flex items-center gap-2 rounded border border-amber-500/60 bg-amber-950/40 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-300 hover:bg-amber-500 hover:text-black transition disabled:opacity-50"
                  >
                    <EyeOff className="h-4 w-4" />
                    <span>Save Draft (Hidden)</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!mediaForm.imageUrl || !mediaForm.title}
                    className="flex items-center gap-2 rounded border border-[#D4AF37] bg-[#D4AF37] px-8 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-transparent hover:text-[#D4AF37] transition disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                    <span>Publish to Exhibition</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Grid of Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => {
              const visibility = item.visibility || "public";
              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121212] overflow-hidden transition hover:border-zinc-700 shadow-lg space-y-4"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-black relative">
                    <img src={item.imageUrl} alt={item.altText || item.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-3 left-3 rounded bg-black/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] border border-zinc-800 flex items-center gap-1.5">
                      <span>{item.category}</span>
                      <span>//</span>
                      <span>{item.aspect}</span>
                    </div>
                    {item.project && (
                      <div className="absolute bottom-3 left-3 rounded bg-[#D4AF37]/90 text-black font-bold px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider">
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
                        <span>{item.date || "Recent Archive"}</span>
                        <span>{item.photographer || "DSS Studio"}</span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        {visibility !== "public" ? (
                          <button
                            onClick={() => updateGalleryItem(item.id, { visibility: "public" })}
                            className="flex items-center gap-1.5 rounded border border-[#D4AF37]/60 bg-[#D4AF37]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold transition"
                          >
                            <Check className="h-3 w-3" />
                            <span>Publish</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => updateGalleryItem(item.id, { visibility: "draft" })}
                            className="flex items-center gap-1.5 rounded border border-amber-500/40 bg-amber-950/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-300 hover:border-amber-400 transition"
                          >
                            <EyeOff className="h-3 w-3" />
                            <span>Unpublish</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditMedia(item)}
                          className="flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-xs text-zinc-300 hover:border-[#D4AF37] hover:text-white transition"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete media frame "${item.title}"?`)) {
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
      ) : (
        /* Showreel Configuration SubTab */
        <form onSubmit={handleSaveShowreel} className="rounded-xl border border-zinc-800 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-2">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span>Master Showreel Video URL (Widescreen / Vimeo / YouTube Embed or MP4)</span>
            </label>
            <input
              type="text"
              required
              value={showreelForm.videoUrl}
              onChange={(e) => setShowreelForm({ ...showreelForm, videoUrl: e.target.value })}
              className="w-full rounded border border-zinc-800 bg-black px-4 py-3 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
              placeholder="/videos/showreel.mp4 or https://vimeo.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span>Director&apos;s Vision Statement</span>
            </label>
            <textarea
              rows={4}
              value={showreelForm.directorsVision}
              onChange={(e) => setShowreelForm({ ...showreelForm, directorsVision: e.target.value })}
              className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none leading-relaxed"
              placeholder="Director's vision philosophy..."
            />
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Creative Story Philosophy</span>
            </label>
            <textarea
              rows={4}
              value={showreelForm.creativePhilosophy}
              onChange={(e) => setShowreelForm({ ...showreelForm, creativePhilosophy: e.target.value })}
              className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none leading-relaxed"
              placeholder="Storytelling philosophy notes..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold">
                Favorite Genres (Comma-separated)
              </label>
              <input
                type="text"
                value={showreelForm.favoriteGenres}
                onChange={(e) => setShowreelForm({ ...showreelForm, favoriteGenres: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-3 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Psychological Thriller, Sci-Fi Noir, Chamber Drama"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-xs uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-2">
                <Award className="h-4 w-4 text-[#D4AF37]" />
                <span>Directorial Inspirations (Comma-separated)</span>
              </label>
              <input
                type="text"
                value={showreelForm.inspirations}
                onChange={(e) => setShowreelForm({ ...showreelForm, inspirations: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-3 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Denis Villeneuve, Wong Kar-wai, Roger Deakins"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            {showreelSaved ? (
              <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5 animate-pulse font-bold">
                <Check className="h-4 w-4" />
                <span>SHOWREEL SETTINGS UPDATED SUCCESSFULLY</span>
              </span>
            ) : (
              <span className="font-mono text-xs text-zinc-500">Live Showreel Preview synced instantly across studio</span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 rounded border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-transparent hover:text-[#D4AF37] transition"
            >
              <Check className="h-4 w-4" />
              <span>Save Media Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

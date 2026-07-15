"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/portfolioData";
import { Film, Plus, Edit2, Trash2, Eye, EyeOff, Lock, Check, X, Sparkles, Upload, AlertCircle } from "lucide-react";

export function ProjectsManager() {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();
  const { projects } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [formState, setFormState] = useState<Partial<Project>>({
    title: "",
    genre: "Feature Film // Drama",
    status: "Active Production",
    progress: 50,
    description: "",
    developmentStage: "Pre-Production / Casting",
    expectedCompletion: "Q4 2026",
    posterUrl: "/images/untold-stories.jpg",
    directorNotes: "",
    visibility: "public",
  });

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setFormState({ ...p });
    setIsCreating(false);
    setUploadError(null);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setUploadError(null);
    setFormState({
      id: `project-${Date.now()}`,
      title: "",
      genre: "Feature Film // Drama",
      status: "Active Production",
      progress: 50,
      description: "",
      developmentStage: "Pre-Production / Casting",
      expectedCompletion: "Q4 2026",
      posterUrl: "/images/untold-stories.jpg",
      directorNotes: "",
      visibility: "public",
    });
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPoster(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Poster upload failed. Check server permissions.");
      }

      const json = await res.json();
      if (json.success && json.url) {
        setFormState((prev) => ({
          ...prev,
          posterUrl: json.url,
        }));
      } else {
        throw new Error(json.error || "Unknown upload error");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload poster image.");
    } finally {
      setUploadingPoster(false);
    }
  };

  const saveWithVisibility = (targetVisibility: "public" | "draft" | "private") => {
    if (isCreating) {
      if (!formState.title) return;
      addProject({
        id: formState.id || `project-${Date.now()}`,
        title: formState.title || "Untitled Production",
        status: formState.status || "In Development",
        genre: formState.genre || "Feature Film",
        progress: Number(formState.progress) || 0,
        description: formState.description || "",
        developmentStage: formState.developmentStage || "Development",
        expectedCompletion: formState.expectedCompletion || "TBA",
        posterUrl: formState.posterUrl || "/images/untold-stories.jpg",
        directorNotes: formState.directorNotes || "",
        visibility: targetVisibility,
      });
    } else if (editingId) {
      updateProject(editingId, { ...formState, visibility: targetVisibility });
    }
    setEditingId(null);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveWithVisibility(formState.visibility || "public");
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setUploadError(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
            <Film className="h-6 w-6 text-[#D4AF37]" />
            <span>THEATRICAL PRODUCTIONS CANON</span>
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
            Manage active films, dossier progress (`0-100%`), posters, and public/draft/private visibility.
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] transition hover:bg-transparent hover:text-[#D4AF37]"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Production</span>
          </button>
        )}
      </div>

      {/* Editor / Form Modal / Inline Box */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="rounded-xl border border-[#D4AF37]/50 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              {isCreating ? "NEW DOSSIER ENTRY" : `EDITING // ${formState.title}`}
            </span>
            <button type="button" onClick={handleCancel} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Production Title
              </label>
              <input
                type="text"
                required
                value={formState.title || ""}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="e.g. Untold Stories"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Genre / Classification
              </label>
              <input
                type="text"
                value={formState.genre || ""}
                onChange={(e) => setFormState({ ...formState, genre: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Feature Film // Psychological Drama"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Production Status
              </label>
              <input
                type="text"
                value={formState.status || ""}
                onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Active Production / Post-Production"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Development Progress ({formState.progress || 0}%)
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={formState.progress || 0}
                onChange={(e) => setFormState({ ...formState, progress: Number(e.target.value) })}
                className="w-full accent-[#D4AF37] cursor-pointer mt-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Current Milestone Stage
              </label>
              <input
                type="text"
                value={formState.developmentStage || ""}
                onChange={(e) => setFormState({ ...formState, developmentStage: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Screenplay Finalization / Principal Photography"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Target Release / Completion
              </label>
              <input
                type="text"
                value={formState.expectedCompletion || ""}
                onChange={(e) => setFormState({ ...formState, expectedCompletion: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Q4 2026 / Festival Slate"
              />
            </div>

            {/* Poster Upload & URL */}
            <div className="space-y-3 sm:col-span-2 rounded-lg border border-zinc-800/80 bg-black/60 p-4">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 font-bold">
                Poster Artwork (`Upload Poster` or URL)
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  value={formState.posterUrl || ""}
                  onChange={(e) => setFormState({ ...formState, posterUrl: e.target.value })}
                  className="flex-1 w-full rounded border border-zinc-800 bg-black px-4 py-2 font-mono text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  placeholder="/images/untold-stories.jpg"
                />
                <label className="flex items-center gap-2 rounded border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black cursor-pointer transition shrink-0">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingPoster ? "Uploading..." : "Upload Poster File"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterUpload}
                    disabled={uploadingPoster}
                    className="hidden"
                  />
                </label>
              </div>
              {uploadError && (
                <p className="font-mono text-xs text-red-400 flex items-center gap-1.5 pt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{uploadError}</span>
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Dossier Logline & Description
              </label>
              <textarea
                rows={3}
                value={formState.description || ""}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Enter cinematic synopsis or premise..."
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Director Notes / Subtext (Optional)
              </label>
              <textarea
                rows={2}
                value={formState.directorNotes || ""}
                onChange={(e) => setFormState({ ...formState, directorNotes: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Director subtext and visual language notes..."
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
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

          {/* Workflow Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded border border-zinc-700 bg-zinc-900 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:border-white transition"
            >
              Cancel
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => saveWithVisibility("draft")}
                className="flex items-center gap-2 rounded border border-amber-500/60 bg-amber-950/40 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-300 hover:bg-amber-500 hover:text-black transition"
              >
                <EyeOff className="h-4 w-4" />
                <span>Save Draft (Hidden)</span>
              </button>

              <button
                type="button"
                onClick={() => saveWithVisibility("public")}
                className="flex items-center gap-2 rounded border border-[#D4AF37] bg-[#D4AF37] px-8 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-transparent hover:text-[#D4AF37] transition"
              >
                <Check className="h-4 w-4" />
                <span>Publish to Live Site</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => {
          const visibility = p.visibility || "public";
          return (
            <div
              key={p.id}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121212] p-6 transition hover:border-zinc-700 space-y-6 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-12 overflow-hidden rounded border border-zinc-800 bg-black shrink-0">
                    <img src={p.posterUrl} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition">
                      {p.title}
                    </h3>
                    <p className="font-mono text-xs text-zinc-400 mt-1">{p.genre}</p>
                    <p className="font-mono text-[10px] text-[#D4AF37] mt-0.5">{p.status}</p>
                  </div>
                </div>

                {/* Visibility Badge */}
                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider border ${
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
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{p.description}</p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase text-zinc-400">
                  <span>Development Stage: {p.developmentStage}</span>
                  <span className="text-[#D4AF37] font-bold">{p.progress}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-zinc-900 overflow-hidden">
                  <div className="h-full rounded-full bg-[#D4AF37]" style={{ width: `${p.progress}%` }} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {visibility !== "public" ? (
                    <button
                      onClick={() => updateProject(p.id, { visibility: "public" })}
                      className="flex items-center gap-1.5 rounded border border-[#D4AF37]/60 bg-[#D4AF37]/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold transition"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Publish</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateProject(p.id, { visibility: "draft" })}
                      className="flex items-center gap-1.5 rounded border border-amber-500/40 bg-amber-950/30 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-amber-300 hover:border-amber-400 transition"
                    >
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Unpublish (Draft)</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-xs uppercase text-zinc-300 hover:border-[#D4AF37] hover:text-white transition"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${p.title}" and unlink its gallery frames from studio slate?`)) {
                        deleteProject(p.id);
                      }
                    }}
                    className="flex items-center gap-1 rounded border border-red-900/60 bg-red-950/40 px-3 py-1.5 font-mono text-xs uppercase text-red-300 hover:border-red-500 hover:text-white transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

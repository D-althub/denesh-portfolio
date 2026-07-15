"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { BlogArticle } from "@/data/portfolioData";
import { BookOpen, Plus, Edit2, Trash2, Eye, EyeOff, Lock, Check, X } from "lucide-react";

export function JournalManager() {
  const { data, addBlogArticle, updateBlogArticle, deleteBlogArticle } = usePortfolio();
  const { blog } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formState, setFormState] = useState<Partial<BlogArticle>>({
    title: "",
    date: "JULY 2026",
    readTime: "5 min read",
    category: "Director Notes & Craft",
    excerpt: "",
    content: "",
    visibility: "public",
  });

  const handleEdit = (article: BlogArticle) => {
    setEditingId(article.id);
    setFormState({ ...article });
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormState({
      id: `journal-${Date.now()}`,
      title: "",
      date: "JULY 2026",
      readTime: "5 min read",
      category: "Director Notes & Craft",
      excerpt: "",
      content: "",
      visibility: "public",
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      if (!formState.title) return;
      addBlogArticle({
        id: formState.id || `journal-${Date.now()}`,
        title: formState.title || "Untitled Note",
        date: formState.date || "JULY 2026",
        readTime: formState.readTime || "4 min read",
        category: formState.category || "Director Notes",
        excerpt: formState.excerpt || "",
        content: formState.content || "",
        visibility: formState.visibility || "public",
      });
    } else if (editingId) {
      updateBlogArticle(editingId, formState);
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
            <BookOpen className="h-6 w-6 text-[#D4AF37]" />
            <span>DIRECTOR&apos;S JOURNAL & ESSAYS</span>
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
            Write and edit directing methodology essays, production notes, and craft reflections.
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-lg border border-[#D4AF37] bg-[#D4AF37] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] transition hover:bg-transparent hover:text-[#D4AF37]"
          >
            <Plus className="h-4 w-4" />
            <span>Write New Journal Note</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Form */}
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="rounded-xl border border-[#D4AF37]/50 bg-[#121212] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              {isCreating ? "NEW JOURNAL ENTRY" : `EDITING // ${formState.title}`}
            </span>
            <button type="button" onClick={() => { setIsCreating(false); setEditingId(null); }} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2 sm:col-span-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Article Title
              </label>
              <input
                type="text"
                required
                value={formState.title || ""}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="e.g. The Architecture of Silence in Chamber Drama"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Category / Craft Area
              </label>
              <input
                type="text"
                value={formState.category || ""}
                onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Director Notes / Cinematography"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Date
              </label>
              <input
                type="text"
                value={formState.date || ""}
                onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="JULY 2026"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Estimated Read Time
              </label>
              <input
                type="text"
                value={formState.readTime || ""}
                onChange={(e) => setFormState({ ...formState, readTime: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black px-4 py-2.5 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="5 min read"
              />
            </div>

            <div className="space-y-2 sm:col-span-3">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Excerpt / Summary
              </label>
              <textarea
                rows={2}
                value={formState.excerpt || ""}
                onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Summary for preview cards..."
              />
            </div>

            <div className="space-y-2 sm:col-span-3">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                Full Essay Content
              </label>
              <textarea
                rows={8}
                value={formState.content || ""}
                onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                className="w-full rounded border border-zinc-800 bg-black p-4 font-mono text-sm text-white focus:border-[#D4AF37] focus:outline-none whitespace-pre-wrap"
                placeholder="Write the full essay or director notes..."
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
              <span>Save Journal Entry</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blog.map((article) => {
          const visibility = article.visibility || "public";
          return (
            <div
              key={article.id}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121212] p-6 transition hover:border-zinc-700 space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-1 font-mono text-[10px] uppercase text-[#D4AF37]">
                    {article.category}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">{article.date} // {article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition">
                  {article.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-3">{article.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
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
                    onClick={() => handleEdit(article)}
                    className="flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-xs uppercase text-zinc-300 hover:border-[#D4AF37] hover:text-white transition"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete journal article "${article.title}"?`)) {
                        deleteBlogArticle(article.id);
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

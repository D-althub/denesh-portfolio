"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PortfolioData,
  initialPortfolioData,
  Project,
  DevelopingConcept,
  GalleryItem,
  BlogArticle,
  MessageItem,
} from "@/data/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  updateHero: (hero: PortfolioData["hero"]) => void;
  updateAbout: (about: PortfolioData["about"]) => void;
  // Project operations
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Concept operations
  addConcept: (concept: DevelopingConcept) => void;
  updateConcept: (id: string, updated: Partial<DevelopingConcept>) => void;
  deleteConcept: (id: string) => void;
  // Gallery operations
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  // Blog operations
  addBlogArticle: (article: BlogArticle) => void;
  updateBlogArticle: (id: string, updated: Partial<BlogArticle>) => void;
  deleteBlogArticle: (id: string) => void;
  // Showreel operations
  updateShowreel: (showreel: Partial<PortfolioData["showreel"]>) => void;
  // Settings & Contact & SEO operations
  updateContactInfo: (contactInfo: PortfolioData["contactInfo"]) => void;
  updateSocialLinks: (socialLinks: PortfolioData["socialLinks"]) => void;
  updateSeo: (seo: PortfolioData["seo"]) => void;
  // Message operations
  addMessage: (message: Omit<MessageItem, "id" | "date" | "read">) => void;
  updateMessageStatus: (id: string, updated: Partial<MessageItem>) => void;
  deleteMessage: (id: string) => void;
  // Reset & Backup
  resetToDefault: () => void;
  importData: (imported: PortfolioData) => void;
}

const STORAGE_KEY = "dss_studio_slate_2026_v2";

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setData(parsed);
        }
        // Sync from server persistence API if available
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && serverData.projects && serverData.gallery) {
            setData(serverData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
          }
        }
      } catch (e) {
        console.error("Failed to load studio data:", e);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Persist to server automatically
        fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch(() => {});
      } catch (e) {
        console.error("Failed to save studio data:", e);
      }
    }
  }, [data, isLoaded]);

  const updateHero = (hero: PortfolioData["hero"]) => {
    setData((prev) => ({ ...prev, hero }));
  };

  const updateAbout = (about: PortfolioData["about"]) => {
    setData((prev) => ({ ...prev, about }));
  };

  // Projects
  const addProject = (project: Project) => {
    setData((prev) => ({ ...prev, projects: [project, ...prev.projects] }));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => {
      const targetProject = prev.projects.find((p) => p.id === id);
      const targetTitle = targetProject?.title?.toLowerCase() || "";
      return {
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
        gallery: prev.gallery.filter(
          (g) => !g.project || (g.project !== id && g.project.toLowerCase() !== targetTitle)
        ),
      };
    });
  };

  // Concepts
  const addConcept = (concept: DevelopingConcept) => {
    setData((prev) => ({ ...prev, concepts: [concept, ...prev.concepts] }));
  };

  const updateConcept = (id: string, updated: Partial<DevelopingConcept>) => {
    setData((prev) => ({
      ...prev,
      concepts: prev.concepts.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    }));
  };

  const deleteConcept = (id: string) => {
    setData((prev) => ({
      ...prev,
      concepts: prev.concepts.filter((c) => c.id !== id),
    }));
  };

  // Gallery
  const addGalleryItem = (item: GalleryItem) => {
    setData((prev) => ({ ...prev, gallery: [item, ...prev.gallery] }));
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...updated } : g)),
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  // Blog
  const addBlogArticle = (article: BlogArticle) => {
    setData((prev) => ({ ...prev, blog: [article, ...prev.blog] }));
  };

  const updateBlogArticle = (id: string, updated: Partial<BlogArticle>) => {
    setData((prev) => ({
      ...prev,
      blog: prev.blog.map((b) => (b.id === id ? { ...b, ...updated } : b)),
    }));
  };

  const deleteBlogArticle = (id: string) => {
    setData((prev) => ({
      ...prev,
      blog: prev.blog.filter((b) => b.id !== id),
    }));
  };

  const updateShowreel = (showreel: Partial<PortfolioData["showreel"]>) => {
    setData((prev) => ({
      ...prev,
      showreel: { ...prev.showreel, ...showreel },
    }));
  };

  const updateContactInfo = (contactInfo: PortfolioData["contactInfo"]) => {
    setData((prev) => ({ ...prev, contactInfo }));
  };

  const updateSocialLinks = (socialLinks: PortfolioData["socialLinks"]) => {
    setData((prev) => ({ ...prev, socialLinks }));
  };

  const updateSeo = (seo: PortfolioData["seo"]) => {
    setData((prev) => ({ ...prev, seo }));
  };

  const addMessage = (message: Omit<MessageItem, "id" | "date" | "read">) => {
    const newMsg: MessageItem = {
      ...message,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      read: false,
    };
    setData((prev) => ({ ...prev, messages: [newMsg, ...(prev.messages || [])] }));
  };

  const updateMessageStatus = (id: string, updated: Partial<MessageItem>) => {
    setData((prev) => ({
      ...prev,
      messages: (prev.messages || []).map((m) => (m.id === id ? { ...m, ...updated } : m)),
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: (prev.messages || []).filter((m) => m.id !== id),
    }));
  };

  const resetToDefault = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const importData = (imported: PortfolioData) => {
    setData(imported);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateHero,
        updateAbout,
        addProject,
        updateProject,
        deleteProject,
        addConcept,
        updateConcept,
        deleteConcept,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addBlogArticle,
        updateBlogArticle,
        deleteBlogArticle,
        updateShowreel,
        updateContactInfo,
        updateSocialLinks,
        updateSeo,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        resetToDefault,
        importData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

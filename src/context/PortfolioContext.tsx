"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PortfolioData,
  initialPortfolioData,
  Project,
  DevelopingConcept,
  StoryLabItem,
  GalleryItem,
  BlogArticle,
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
  // Story Lab operations
  addStoryLabItem: (item: StoryLabItem) => void;
  updateStoryLabItem: (id: string, updated: Partial<StoryLabItem>) => void;
  deleteStoryLabItem: (id: string) => void;
  // Gallery operations
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  // Blog operations
  addBlogArticle: (article: BlogArticle) => void;
  updateBlogArticle: (id: string, updated: Partial<BlogArticle>) => void;
  deleteBlogArticle: (id: string) => void;
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
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
      }
    } catch (e) {
      console.error("Failed to load studio data from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save studio data to localStorage:", e);
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
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
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

  // Story Lab
  const addStoryLabItem = (item: StoryLabItem) => {
    setData((prev) => ({ ...prev, storyLab: [item, ...prev.storyLab] }));
  };

  const updateStoryLabItem = (id: string, updated: Partial<StoryLabItem>) => {
    setData((prev) => ({
      ...prev,
      storyLab: prev.storyLab.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteStoryLabItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      storyLab: prev.storyLab.filter((s) => s.id !== id),
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
        addStoryLabItem,
        updateStoryLabItem,
        deleteStoryLabItem,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addBlogArticle,
        updateBlogArticle,
        deleteBlogArticle,
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

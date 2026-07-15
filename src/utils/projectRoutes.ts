export function getProjectRoute(idOrSlugOrTitle?: string): string {
  if (!idOrSlugOrTitle) return "/projects";
  
  const normalized = idOrSlugOrTitle.toLowerCase().trim();

  // Explicit static route maps for legacy hardcoded folders
  if (normalized === "untold-stories" || normalized.includes("untold")) return "/projects/untold-stories";
  if (normalized === "cursed-wings" || normalized === "cursed-wings-series" || normalized.includes("cursed")) return "/projects/cursed-wings";
  if (normalized === "3-days-journey" || normalized.includes("3 days") || normalized === "future-film") return "/projects/3-days-journey";
  if (normalized === "the-love" || normalized.includes("love")) return "/projects/the-love";

  // Auto-slug resolution: convert string/title to clean URL slug
  const cleanSlug = normalized
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `/projects/${cleanSlug || "untold-stories"}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function matchesSlug(item: { id: string; title: string; slug?: string }, slug: string): boolean {
  const normalizedSlug = slug.toLowerCase().trim();
  return (
    item.id.toLowerCase() === normalizedSlug ||
    (item.slug && item.slug.toLowerCase() === normalizedSlug) ||
    slugify(item.title) === normalizedSlug
  );
}

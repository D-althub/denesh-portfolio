import type { Metadata } from "next";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Capitalize slug for title
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | Denesh Satya Sai`,
    description: `Explore the cinematic dossier and production updates for ${formattedTitle} by Denesh Satya Sai.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}

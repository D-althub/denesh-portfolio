import type { Metadata } from "next";
import { UntoldStoriesClient } from "./UntoldStoriesClient";

export const metadata: Metadata = {
  title: "Untold Stories | Denesh Satya Sai",
  description:
    "Official production dossier for UNTOLD STORIES — a romantic drama feature film written and directed by Denesh Satya Sai.",
  openGraph: {
    title: "Untold Stories | Denesh Satya Sai",
    description:
      "A heartfelt romantic drama exploring how time, destiny, and love reunite two souls separated by life's quietest choices.",
    type: "website",
  },
};

export default function UntoldStoriesPage() {
  return <UntoldStoriesClient />;
}


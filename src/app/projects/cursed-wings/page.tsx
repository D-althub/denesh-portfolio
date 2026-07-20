import type { Metadata } from "next";
import { CursedWingsClient } from "./CursedWingsClient";

export const metadata: Metadata = {
  title: "Cursed Wings | Denesh Satya Sai",
  description:
    "Official dark fantasy series bible and interactive lore experience for CURSED WINGS by Denesh Satya Sai.",
  openGraph: {
    title: "Cursed Wings | Denesh Satya Sai",
    description:
      "Explore the Obsidian Citadel, sacrificial power systems, mythology, and ancient lore of Cursed Wings.",
    type: "website",
  },
};

export default function CursedWingsPage() {
  return <CursedWingsClient />;
}

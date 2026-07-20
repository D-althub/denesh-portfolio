import type { Metadata } from "next";
import { TheLoveClient } from "./TheLoveClient";

export const metadata: Metadata = {
  title: "The Love | Denesh Satya Sai",
  description:
    "Official production dossier for THE LOVE — a poetic romantic drama written and directed by Denesh Satya Sai.",
};

export default function TheLovePage() {
  return <TheLoveClient />;
}


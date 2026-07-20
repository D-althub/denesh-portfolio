import type { Metadata } from "next";
import { FutureFilmClient } from "../future-film/FutureFilmClient";

export const metadata: Metadata = {
  title: "3 Days Journey | Denesh Satya Sai",
  description:
    "Official production dossier for 3 DAYS JOURNEY — a road trip dramatic thriller written and directed by Denesh Satya Sai.",
  openGraph: {
    title: "3 Days Journey | Denesh Satya Sai",
    description:
      "A seventy-two hour road voyage that unravels unspoken secrets and transforms three lives.",
    type: "website",
  },
};

export default function ThreeDaysJourneyPage() {
  return <FutureFilmClient />;
}

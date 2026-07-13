import type { Metadata } from "next";
import { Space_Grotesk, Inter, Cinzel } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "DENESH SATYA SAI | Independent Filmmaker, Writer & Director",
  description:
    "Official production house website of Denesh Satya Sai — writer, director, and storyteller. Stories That Stay With You.",
  keywords: [
    "Filmmaker",
    "Writer",
    "Director",
    "Storyteller",
    "Denesh Satya Sai",
    "Untold stories",
    "3 Days journey",
    "Cursed wings",
  ],
  openGraph: {
    title: "DENESH SATYA SAI | Stories That Stay With You",
    description: "Writer • Director • Storyteller. Explore feature films, dramatic narratives, and immersive storytelling.",
    type: "website",
  },
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${cinzel.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#090909] text-zinc-100 font-sans selection:bg-[#D4AF37]/30 selection:text-white"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

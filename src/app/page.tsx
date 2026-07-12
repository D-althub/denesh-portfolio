import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CurrentProjectsSection } from "@/components/sections/CurrentProjectsSection";
import { DevelopingConceptsSection } from "@/components/sections/DevelopingConceptsSection";
import { StoryLabSection } from "@/components/sections/StoryLabSection";
import { VisualGallerySection } from "@/components/sections/VisualGallerySection";
import { ShowreelSection } from "@/components/sections/ShowreelSection";
import { FilmographySection } from "@/components/sections/FilmographySection";
import { WritingProcessSection } from "@/components/sections/WritingProcessSection";
import { BlogJournalSection } from "@/components/sections/BlogJournalSection";
import { CollaborationSection } from "@/components/sections/CollaborationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />
      <main className="relative overflow-hidden">
        <HeroSection />
        <AboutSection />
        <CurrentProjectsSection />
        <DevelopingConceptsSection />
        <StoryLabSection />
        <VisualGallerySection />
        <ShowreelSection />
        <FilmographySection />
        <WritingProcessSection />
        <BlogJournalSection />
        <CollaborationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

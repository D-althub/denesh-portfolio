import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectSection } from "@/components/sections/FeaturedProjectSection";
import { CurrentProjectsSection } from "@/components/sections/CurrentProjectsSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#D4AF37]/30 selection:text-white">
      <Navbar />
      <main className="relative overflow-hidden">
        <HeroSection />
        <FeaturedProjectSection />
        <CurrentProjectsSection />
      </main>
      <Footer />
    </div>
  );
}


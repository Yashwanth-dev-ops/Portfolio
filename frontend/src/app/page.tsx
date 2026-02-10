import dynamic from 'next/dynamic';
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";

// Dynamically import heavy components below the fold
const SkillsMarquee = dynamic(() => import("@/components/home/SkillsMarquee"), {
  loading: () => <div className="h-64 w-full bg-metallic-900/50 animate-pulse" />
});
const ExperienceSection = dynamic(() => import("@/components/home/ExperienceSection").then(mod => mod.ExperienceSection), {
  loading: () => <div className="h-96 w-full bg-metallic-900/50 animate-pulse" />
});
const CertificationsSection = dynamic(() => import("@/components/home/CertificationsSection").then(mod => mod.CertificationsSection), {
  loading: () => <div className="h-96 w-full bg-metallic-900/50 animate-pulse" />
});
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />



      <div className="relative z-10 -mt-20 mb-20">
        <SkillsMarquee />
      </div>

      <ExperienceSection />
      <CertificationsSection />
    </div >
  );
}

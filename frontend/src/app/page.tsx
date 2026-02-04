import { Hero } from "@/components/home/Hero";
import SkillsMarquee from "@/components/home/SkillsMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { ContactSection } from "@/components/home/ContactSection";

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
      <ContactSection />
    </div>
  );
}

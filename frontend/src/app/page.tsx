import { Hero } from "@/components/home/Hero";
import SkillsMarquee from "@/components/home/SkillsMarquee";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Core Competencies Section */}
      <section className="py-20 bg-metallic-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-azure-100 to-gray-400">
            Technical Proficiency
          </h2>
          <div className="w-16 h-1 bg-azure-500 rounded-full mx-auto mt-4 opacity-50" />
        </div>
        <SkillsMarquee />
      </section>
    </div>
  );
}

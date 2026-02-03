import { Hero } from "@/components/home/Hero";
import SkillsMarquee from "@/components/home/SkillsMarquee";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Short placeholder for content until next tasks */}
      <section className="py-20 bg-metallic-900">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Trusted Expertise</p>
        </div>
        <SkillsMarquee />
      </section>
    </div>
  );
}

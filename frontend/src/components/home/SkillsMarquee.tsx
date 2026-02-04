"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Database, Globe, Layers, Layout, Lock, Server, Settings, Shield, Terminal, Wifi } from "lucide-react";

const skills = [
    { name: "Azure Sentinel", icon: Shield },
    { name: "Terraform", icon: Layers },
    { name: "Microsoft Defender", icon: Lock },
    { name: "Azure AD", icon: Settings },
    { name: "FortiGate", icon: Wifi },
    { name: "Intune", icon: Layout },
    { name: "DevSecOps", icon: Code2 },
    { name: "Kubernetes", icon: Server },
    { name: "Splunk", icon: Database },
    { name: "CrowdStrike", icon: Shield },
    { name: "Tanium", icon: Terminal },
    { name: "Sophos Central", icon: Lock },
    { name: "PowerShell", icon: Terminal },
    { name: "CI/CD", icon: Cpu },
    { name: "Zero Trust", icon: Lock },
    { name: "Cloud Migration", icon: Globe },
];

export default function SkillsMarquee() {
    return (
        <div className="w-full relative py-10 overflow-hidden">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-metallic-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-metallic-900 to-transparent z-10" />

            <div className="flex flex-col gap-6">
                {/* Row 1: Right to Left */}
                <MarqueeRow items={skills.slice(0, 8)} direction="left" speed={25} />

                {/* Row 2: Left to Right */}
                <MarqueeRow items={skills.slice(8)} direction="right" speed={30} />
            </div>
        </div>
    );
}

function MarqueeRow({ items, direction, speed }: { items: typeof skills, direction: "left" | "right", speed: number }) {
    return (
        <div className="flex w-full overflow-hidden">
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 md:gap-6 flex-shrink-0"
            >
                {[...items, ...items, ...items, ...items].map((skill, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/10 hover:border-azure-500/30 transition-all duration-300 min-w-[200px]"
                    >
                        <div className="p-2 rounded-lg bg-black/50 text-azure-400 group-hover:text-azure-300 transition-colors">
                            <skill.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm md:text-base font-semibold text-gray-300 group-hover:text-white whitespace-nowrap">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

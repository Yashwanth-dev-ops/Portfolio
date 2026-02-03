"use client";

import { motion } from "framer-motion";

const skills = [
    "Azure Sentinel", "Terraform", "Microsoft Defender", "Azure AD", "FortiGate",
    "Intune", "DevSecOps", "Kubernetes", "Splunk", "CrowdStrike",
    "Tanium", "Sophos Central", "PowerShell", "CI/CD", "Zero Trust"
];

export default function SkillsMarquee() {
    return (
        <div className="w-full overflow-hidden bg-black border-y border-white/10 py-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

            <div className="flex gap-16 items-center">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex gap-16 whitespace-nowrap"
                >
                    {[...skills, ...skills, ...skills].map((skill, i) => (
                        <span key={i} className="text-2xl md:text-4xl font-bold text-white/20 uppercase tracking-tighter hover:text-white hover:scale-110 transition-all cursor-default">
                            {skill}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

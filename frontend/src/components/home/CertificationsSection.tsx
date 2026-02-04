"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import { BadgeCheck, Server, Shield, Globe, Terminal, Trophy, Award, Cpu, Network } from "lucide-react";

const skillGroups = [
    {
        category: "Cloud Architecture",
        icon: Globe,
        color: "text-azure-400",
        skills: ["Azure Solutions Architect", "Cost Management", "Virtual Desktop", "Cloud Migrations"]
    },
    {
        category: "Security & SIEM",
        icon: Shield,
        color: "text-emerald-400",
        skills: ["Azure Sentinel", "Microsoft Defender", "FortiGate", "Sophos Central", "Zero Trust"]
    },
    {
        category: "DevOps & Automation",
        icon: Terminal,
        color: "text-orange-400",
        skills: ["Terraform", "ARM Templates", "Azure DevOps", "CI/CD Pipelines", "PowerShell"]
    },
    {
        category: "Network & Identity",
        icon: Server,
        color: "text-purple-400",
        skills: ["Azure AD", "VPN Infrastructure", "Intune", "Firewall Management", "CISM Principles"]
    }
];

const certifications = [
    {
        name: "Azure Solutions Architect Expert",
        issuer: "Microsoft",
        id: "AZ-305",
        icon: Cpu
    },
    {
        name: "Azure Administrator Associate",
        issuer: "Microsoft",
        id: "AZ-104",
        icon: Server
    },
    {
        name: "Azure Virtual Desktop Specialty",
        issuer: "Microsoft",
        id: "AZ-140",
        icon: Network
    },
    {
        name: "CCNA Certification",
        issuer: "Cisco",
        id: "NETWORK",
        icon: Globe
    }
];

const awards = [
    { name: "GBG Annual Award | Best Employee - 2023", issuer: "Global Benefits Group", year: "2023" },
    { name: "GBG Annual Award | Best Partner Support", issuer: "Global Benefits Group", year: "2022" }
];

export function CertificationsSection() {
    return (
        <section id="certifications" className="min-h-screen bg-metallic-900 py-10 md:py-20 relative overflow-hidden">

            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-azure-500/5 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <SectionHeader
                    title="Technical Arsenal"
                    subtitle="Validated expertise across cloud architecture, security, and operations."
                />

                {/* Skills Grid - Integrated with TiltCard for subtle 3D feel */}
                <div className="grid md:grid-cols-2 gap-8 mb-24 mt-12">
                    {skillGroups.map((group, idx) => (
                        <TiltCard key={idx} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 h-full group hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/20 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                                        <group.icon className={`w-6 h-6 ${group.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-wide">{group.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-white/5 text-gray-300 text-xs font-mono uppercase tracking-wider rounded border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>

                {/* Certifications Block */}
                <div className="mt-20">
                    <SectionHeader
                        title="Certified Authority"
                        subtitle="Microsoft accredited milestones."
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 mb-12 md:mb-24">
                        {certifications.map((cert, idx) => (
                            <TiltCard key={idx} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    className="relative h-full bg-metallic-900 border border-metallic-800/50 p-8 rounded-xl overflow-hidden group hover:border-azure-500/30 transition-all duration-500"
                                >
                                    {/* Professional Glow Effect (No sweep) */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-azure-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-lg bg-metallic-800 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-azure-900/20 group-hover:border-azure-500/20 transition-all duration-300">
                                            <cert.icon className="w-7 h-7 text-azure-400/80 group-hover:text-azure-400 transition-colors" />
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-xl font-bold text-white group-hover:text-azure-100 transition-colors leading-tight min-h-[3.5rem] flex items-center">{cert.name}</h4>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <BadgeCheck className="w-4 h-4 text-azure-500" />
                                                    {cert.issuer}
                                                </div>
                                                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest border border-white/5 px-2 py-1 rounded">{cert.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>

                    <SectionHeader
                        title="Honors & Recognition"
                        subtitle="Detailed validation of performance and partnership."
                    />

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {awards.map((award, idx) => (
                            <TiltCard key={idx}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    className="flex items-center gap-6 p-6 bg-gradient-to-r from-metallic-800/50 to-black/50 border border-gold-500/10 hover:border-gold-500/30 rounded-xl group transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute right-0 top-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                    <div className="relative p-4 bg-black rounded-lg border border-gold-500/20 group-hover:border-gold-500/50 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                                        <Trophy className="w-8 h-8 text-gold-500" />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-lg font-bold text-white group-hover:text-gold-200 transition-colors">{award.name}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            <span>{award.issuer}</span>
                                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                            <span className="font-mono text-gold-500/80">{award.year}</span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Award className="w-12 h-12 text-gold-500/5 rotate-[-15deg]" />
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}

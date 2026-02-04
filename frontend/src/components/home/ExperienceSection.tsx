"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Building, MapPin } from "lucide-react";

const experiences = [
    {
        role: "Cloud Solution Architect & IT Manager",
        company: "TSS India Services Pvt Ltd",
        period: "Jan 2025 — Present",
        location: "Hyderabad",
        responsibilities: [
            "Spearheaded enterprise cloud transformation on Azure, delivering secure, scalable infrastructure.",
            "Engineered centralized SIEM operations using Azure Sentinel with custom KQL detection rules.",
            "Automated incident response via SOAR playbooks, slashing mean time to resolution (MTTR) by 40%.",
            "Fortified network perimeter with FortiGate firewalls, IPS, and SSL inspection.",
            "Orchestrated seamless cloud migrations, achieving 99.9% uptime and 30% cost reduction."
        ],
        skills: ["Azure Sentinel", "SOAR", "Terraform", "DevSecOps", "Cloud Architecture"]
    },
    {
        role: "Technical Architect (Asst. Consultant)",
        company: "TCS Pvt Ltd",
        period: "Aug 2024 — Jan 2025",
        location: "Hyderabad",
        responsibilities: [
            "Designed NIST-compliant Azure solutions, translating business needs into high-performance architectures.",
            "Deployed cloud-native microservices using Azure App Services and Functions.",
            "Hardened identity security with Azure AD RBAC and Conditional Access policies.",
            "Established continuous security monitoring using Azure Security Center and Sentinel.",
            "Implemented secure CI/CD pipelines via Azure DevOps for automated, zero-downtime deployments."
        ],
        skills: ["Azure AD", "Microservices", "Azure DevOps", "CrowdStrike", "Zero Trust"]
    },
    {
        role: "Azure Cloud Engineer",
        company: "Coretek Services India Pvt Ltd",
        period: "May 2024 — July 2024",
        location: "Hyderabad",
        responsibilities: [
            "Deployed production-grade Azure infrastructure adhering to ISO 27001 standards.",
            "Automated resource provisioning using Terraform and ARM templates (IaC).",
            "Secured sensitive data using Azure Key Vault and enforced network isolation via NSGs/VPNs.",
            "Architected robust Business Continuity plans with Azure Site Recovery and Backup."
        ],
        skills: ["Terraform", "IaC", "Microsoft Defender", "Azure Key Vault", "Compliance"]
    },
    {
        role: "Sr. Network & Systems Administrator",
        company: "GBG Services India Pvt Ltd",
        period: "Nov 2021 — Apr 2024",
        location: "Hyderabad",
        responsibilities: [
            "Implemented comprehensive Microsoft security stack: Sentinel, Defender 365, and Intune MDM.",
            "Enforced strict DLP and MFA policies across hybrid Azure/M365 environments.",
            "Automated threat hunting and system management using advanced PowerShell scripting.",
            "Led complex tenant migrations and implemented retention policies for regulatory compliance."
        ],
        skills: ["Azure Sentinel", "Intune", "PowerShell", "Hybrid Cloud", "Identity Mgmt"]
    },
    {
        role: "Systems Engineer",
        company: "Gavs Technologies Pvt Ltd",
        period: "May 2021 — Oct 2021",
        location: "Hyderabad",
        responsibilities: [
            "Monitored mission-critical infrastructure ensuring optimal availability and security posture.",
            "Developed SIEM detection logic in Azure Sentinel to identify emerging threats.",
            "Executed detailed root cause analysis (RCA) for complex system incidents.",
            "Managed enterprise patch deployment cycles and change management processes."
        ],
        skills: ["SIEM", "Incident Response", "ITSM", "System Hardening", "Disaster Recovery"]
    },
    {
        role: "Network Operations Specialist",
        company: "GA Digital Web World",
        period: "Dec 2020 — May 2021",
        location: "Hyderabad",
        responsibilities: [
            "Administered secure LAN/WAN networks and VPN solutions for remote workforce.",
            "Managed Office 365 environments and Windows Server deployments.",
            "Provided Tier-2 technical support resolving escalated infrastructure issues."
        ],
        skills: ["Network Security", "Office 365", "Windows Server", "Infrastructure Ops"]
    }
];

export function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" ref={containerRef} className="min-h-screen bg-metallic-900 py-16 md:py-24 relative overflow-hidden">

            {/* Background Title - Optimized for Mobile */}
            <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 select-none overflow-hidden opacity-10 md:opacity-20">
                <motion.h1 className="flex font-black leading-none tracking-tighter">
                    <motion.span
                        className="text-[15vw] md:text-[12vw] bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(to right, #6b7280 0%, #ffffff 50%, #6b7280 100%)",
                            backgroundSize: "200% auto",
                            textShadow: "0 0 30px rgba(255,255,255,0.1)"
                        }}
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        EXPERIENCE
                    </motion.span>
                </motion.h1>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeader
                    title="Professional Journey"
                    subtitle="A track record of delivering secure, scalable enterprise solutions."
                />

                <div className="relative mt-12 md:mt-20 md:ml-12">
                    {/* Timeline Line - Hidden on very small screens, visible on mobile+ */}
                    <div className="absolute left-4 md:left-0 top-2 bottom-0 w-[2px] bg-white/10 hidden sm:block" />
                    <motion.div
                        style={{ height }}
                        className="absolute left-4 md:left-0 top-2 w-[2px] bg-gradient-to-b from-azure-500 via-purple-500 to-azure-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-0 hidden sm:block"
                    />

                    <div className="space-y-12 sm:space-y-16">
                        {experiences.map((exp, idx) => (
                            <ExperienceCard key={idx} exp={exp} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    responsibilities: string[];
    skills: string[];
}

function ExperienceCard({ exp }: { exp: Experience }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="relative sm:pl-16 group"
        >
            {/* Timeline Dot - Mobile Optimized */}
            <div className="hidden sm:flex absolute left-[12px] md:-left-[9px] top-1.5 md:top-6 w-3 h-3 md:w-5 md:h-5 rounded-full border md:border-2 transition-all duration-500 z-10 items-center justify-center
                bg-black border-azure-500/50 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-azure-500" />
            </div>

            <div className="p-5 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-azure-500/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-6">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-azure-400 transition-colors">
                            {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-400 font-mono">
                            <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-azure-500" /> {exp.company}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-azure-500" /> {exp.location}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-azure-500/10 border border-azure-500/20 text-azure-200 text-xs md:text-sm font-mono w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                    </div>
                </div>

                <ul className="space-y-3 mb-6">
                    {exp.responsibilities.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm md:text-base text-gray-400 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-azure-500 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {exp.skills.map((skill, i) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-azure-500/30 transition-colors">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}


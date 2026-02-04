"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Building, MapPin } from "lucide-react";

const experiences = [
    {
        role: "Cloud Solution Architect - IT Manager",
        company: "TSS India Services Pvt Ltd",
        period: "Jan 2025 — Present",
        location: "Hyderabad, Telangana",
        responsibilities: [
            "Architected and delivered secure, scalable, and cost-effective cloud infrastructure solutions on Microsoft Azure, driving enterprise cloud transformation.",
            "Administered Microsoft Azure Sentinel for centralized SIEM operations, configuring custom KQL queries and detection rules.",
            "Deployed and managed SOAR automation via Sentinel playbooks, improving operational response times by 40%.",
            "Configured FortiGate firewalls with IPS, web filtering, and SSL inspection to enforce strict perimeter security.",
            "Managed VPN infrastructure (IPSec/SSL) and integration with Azure Virtual Network Gateways for secure connectivity.",
            "Oversaw enterprise-wide cloud migrations, improving uptime while reducing infrastructure costs by 30%.",
            "Led and mentored a multidisciplinary IT team, promoting continuous learning and cross-functional collaboration."
        ],
        skills: ["Azure Sentinel", "SOAR", "Terraform", "FortiGate", "DevSecOps", "Cloud Migration"]
    },
    {
        role: "Assistant Consultant - Technical Architect",
        company: "TCS Pvt Ltd",
        period: "Aug 2024 — Jan 2025",
        location: "Hyderabad, Telangana",
        responsibilities: [
            "Architected scalable, secure Azure cloud solutions aligned with business objectives and created detailed design documentation.",
            "Delivered cloud-native applications using Azure App Services, Functions, and microservices.",
            "Implemented Azure AD-based IAM with RBAC and Conditional Access to strengthen identity protection.",
            "Integrated Azure Security Center and Sentinel for 24/7 threat detection and regulatory compliance.",
            "Streamlined CI/CD with Azure DevOps and GitHub Actions, enabling secure, automated deployments.",
            "Administered CrowdStrike and Tanium for endpoint protection and patch compliance.",
            "Optimized resource performance and spend using Azure Monitor, Application Insights, and Log Analytics."
        ],
        skills: ["Azure AD", "Microservices", "Azure DevOps", "CrowdStrike", "Tanium", "Cost Management"]
    },
    {
        role: "Azure Engineer",
        company: "Coretek Services India Pvt Ltd",
        period: "May 2024 — July 2024",
        location: "Hyderabad, Telangana",
        responsibilities: [
            "Designed and deployed secure Azure infrastructure aligned with NIST, ISO 27001, and CIS standards.",
            "Automated Azure resource provisioning using Terraform, ARM templates, and Azure CLI.",
            "Managed networking (VNets, VPNs, NSGs) and implemented Microsoft Defender for Cloud for threat detection.",
            "Secured secrets and keys with Azure Key Vault to ensure data protection compliance.",
            "Built DR and backup strategies with Azure Site Recovery and Azure Backup.",
            "Resolved infrastructure issues via root cause analysis and incident response.",
            "Maintained ITIL-aligned documentation and mentored junior engineers."
        ],
        skills: ["Terraform", "ARM Templates", "Microsoft Defender", "Azure Key Vault", "ISO 27001"]
    },
    {
        role: "Senior Network & Systems Administrator",
        company: "GBG Services India Pvt Ltd",
        period: "Nov 2021 — Apr 2024",
        location: "Hyderabad, Telangana",
        responsibilities: [
            "Designed and implemented Microsoft security stack: Azure Sentinel, Microsoft Defender (Endpoint, Identity, 365), and Intune.",
            "Enforced security with MFA, PIM, SSO, passwordless authentication, DLP, and encryption across Azure and M365.",
            "Automated security monitoring with PowerShell/CLI and led incident response using threat intel and SIEM tools.",
            "Provisioned and managed Azure VMs, networking, NSGs, VPNs, and hybrid environments.",
            "Managed Exchange Online, SharePoint, OneDrive, Teams, and enforced Conditional Access and DLP.",
            "Executed cloud migrations, integrated on-premises AD, and enforced compliance using Azure Policy.",
            "Led tenant migrations, implemented retention, eDiscovery, and ensured regulatory compliance."
        ],
        skills: ["Azure Sentinel", "Intune", "PowerShell", "Cloud Migration", "M365", "Identity Protection"]
    },
    {
        role: "Engineer",
        company: "Gavs Technologies Pvt.Ltd",
        period: "May 2021 — Oct 2021",
        location: "Hyderabad, Telangana",
        responsibilities: [
            "Performed proactive monitoring of infrastructure and security systems to ensure optimal uptime and threat visibility.",
            "Configured and managed Azure Sentinel, developing detection rules and automating response tasks.",
            "Conducted first-line incident troubleshooting and collaborated on root cause analysis.",
            "Supported change management, patch deployment, and production environment updates.",
            "Executed system maintenance, backup, restoration, and disaster recovery activities.",
            "Applied incident models and diagnostic tools to support rapid issue resolution."
        ],
        skills: ["Incident Response", "SIEM", "Scripting", "ITSM", "Disaster Recovery"]
    },
    {
        role: "Multitask Operator (MTO)",
        company: "GA Digital Web World",
        period: "Dec 2020 — May 2021",
        location: "Hyderabad, Telangana",
        responsibilities: [
            "Managed LAN/WAN, internet, and intranet systems ensuring secure network operations.",
            "Proficient in Microsoft Windows OS deployment and Office 365 messaging environments.",
            "Implemented secure VPN solutions and conducted regular performance audits.",
            "Provided Tier-2 Help Desk support and drove IT initiatives aligned with compliance standards."
        ],
        skills: ["Network Admin", "Office 365", "VPN", "Windows Server", "Help Desk"]
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
        <section id="experience" ref={containerRef} className="min-h-screen bg-metallic-900 py-10 md:pt-10 md:pb-20 relative overflow-hidden">

            {/* Massive Background Typography - Liquid Platinum */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 select-none overflow-hidden opacity-20">
                <motion.h1 className="flex font-black leading-none tracking-tighter">
                    <motion.span
                        className="text-[12vw] bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(to right, #6b7280 0%, #ffffff 50%, #6b7280 100%)",
                            backgroundSize: "200% auto",
                            textShadow: "0 0 30px rgba(255,255,255,0.1)"
                        }}
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        NANDA KISHORE
                    </motion.span>
                </motion.h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <SectionHeader
                    title="Professional Journey"
                    subtitle="A timeline of solving complex problems and delivering enterprise value."
                />

                <div className="relative ml-3 md:ml-6 pl-8 md:pl-12 space-y-12">
                    {/* Tracing Beam Background Line */}
                    <div className="absolute left-[0px] top-2 bottom-0 w-[2px] bg-white/10" />

                    {/* Tracing Beam Active Line - Grows with Scroll */}
                    <motion.div
                        style={{ height }}
                        className="absolute left-[0px] top-2 w-[2px] bg-gradient-to-b from-azure-500 via-purple-500 to-azure-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-0"
                    />

                    {experiences.map((exp, idx) => (
                        <ExperienceCard key={idx} exp={exp} />
                    ))}
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
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    // Parallax & Transform Effects
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // Parallax movement
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]); // Fade in/out
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8]); // Scale in/out
    const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, -15]); // 3D rotation

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                scale,
                rotateX,
                y,
                perspective: 1000
            }}
            className="relative group pl-6 perspective-1000"
        >
            {/* Connection Line from Beam to Dot - Only visible when active */}
            <div className={`absolute left-0 top-8 w-8 h-[2px] transition-all duration-500 ${isInView ? "bg-azure-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" : "bg-transparent"}`} />

            {/* Timeline Dot with Active State */}
            <div className={`absolute -left-[41px] md:-left-[57px] top-6 w-5 h-5 md:w-7 md:h-7 rounded-full border-2 transition-all duration-500 z-10 flex items-center justify-center
                ${isInView
                    ? "bg-black border-azure-400 scale-125 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                    : "bg-black border-white/20 scale-100"
                }
            `}>
                <div className={`w-1.5 h-1.5 rounded-full bg-azure-500 transition-opacity duration-500 ${isInView ? "opacity-100" : "opacity-0"}`} />
            </div>

            {/* Card Content with Active Glow & Parallax Content */}
            <motion.div
                className={`
                    p-4 md:p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden backdrop-blur-sm
                    ${isInView
                        ? "bg-white/5 border-azure-500/50 shadow-[0_0_40px_-5px_rgba(59,130,246,0.15)] translate-x-2"
                        : "bg-black/40 border-white/5 hover:bg-white/5"
                    }
                `}
            >
                {/* Subtle Gradient Overlay for Depth */}
                <div className={`absolute inset-0 bg-gradient-to-br from-azure-500/5 via-transparent to-purple-500/5 transition-opacity duration-500 ${isInView ? "opacity-100" : "opacity-0"}`} />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 relative z-10">
                    <div>
                        <h3 className={`text-2xl font-bold transition-colors duration-500 ${isInView ? "text-azure-400" : "text-white"}`}>
                            {exp.role}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400 font-mono">
                            <span className={`flex items-center gap-2 transition-colors duration-500 ${isInView ? "text-gray-200" : ""}`}><Building className="w-4 h-4" /> {exp.company}</span>
                            <span className={`flex items-center gap-2 transition-colors duration-500 ${isInView ? "text-gray-200" : ""}`}><MapPin className="w-4 h-4" /> {exp.location}</span>
                        </div>
                    </div>

                    {/* Parallax Date Badge */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border w-fit shrink-0 transition-all duration-500 
                        ${isInView
                                ? "bg-azure-500/10 border-azure-500/30 text-azure-100"
                                : "bg-white/5 border-white/10 text-gray-300"
                            }
                    `}>
                        <Calendar className={`w-4 h-4 ${isInView ? "text-azure-400" : "text-gray-400"}`} />
                        <span className="text-sm font-mono">{exp.period}</span>
                    </motion.div>
                </div>

                <ul className="space-y-2 mb-6 text-gray-400 leading-relaxed list-disc list-outside pl-4 relative z-10">
                    {(exp.responsibilities || []).map((item, i) => (
                        <li key={i} className={`transition-colors duration-500 ${isInView ? "text-gray-300 marker:text-azure-500" : ""}`}>{item}</li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2 relative z-10">
                    {exp.skills.map((skill, i) => (
                        <span key={i} className={`text-xs font-mono px-2 py-1 rounded border transition-colors duration-500
                            ${isInView
                                ? "bg-azure-500/10 border-azure-500/30 text-azure-300"
                                : "text-gray-500 bg-white/5 border-white/5"
                            }
                        `}>
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

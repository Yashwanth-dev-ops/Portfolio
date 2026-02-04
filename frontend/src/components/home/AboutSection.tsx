"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Lightbulb, Shield } from "lucide-react";
import Image from "next/image";

const principles = [
    {
        title: "Excellence & Innovation",
        desc: "Recognized for delivering cutting-edge cloud solutions that drive business transformation.",
        icon: Lightbulb,
        color: "from-yellow-400/20 to-orange-500/20",
        border: "group-hover/card:border-yellow-500/50",
        text: "group-hover/card:text-yellow-400"
    },
    {
        title: "End-to-End Leadership",
        desc: "From architectural design to team management and project delivery.",
        icon: Target,
        color: "from-blue-400/20 to-cyan-500/20",
        border: "group-hover/card:border-cyan-500/50",
        text: "group-hover/card:text-cyan-400"
    },
    {
        title: "Security & Governance",
        desc: "Deep expertise in Azure Active Directory, Zero Trust, and Cloud Security.",
        icon: Shield,
        color: "from-emerald-400/20 to-green-500/20",
        border: "group-hover/card:border-emerald-500/50",
        text: "group-hover/card:text-emerald-400"
    },
];

export function AboutSection() {
    return (
        <section id="about" className="min-h-screen bg-metallic-900 flex items-center justify-center py-10 md:py-20 relative overflow-hidden">

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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="mb-12">
                    {/* Cinematic Tracking Title - Chapter 01 Removed */}
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "-0.05em", filter: "blur(12px)" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.15em", filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-6xl font-serif font-bold text-white uppercase mb-4"
                    >
                        The Architect
                    </motion.div>

                    <p className="text-gray-400 max-w-2xl text-lg font-light">
                        Experienced Azure Administrator | Infrastructure & Networking Specialist | Cloud Security Expert
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start pt-8 md:pt-12">

                    {/* Left Column: Photo with Cinematic Float */}
                    <div className="relative mx-auto lg:mx-0 max-w-md w-full">
                        {/* Ambient Glow */}
                        <div className="absolute -inset-4 bg-white/5 blur-2xl -z-10 opacity-60" />

                        {/* Entrance Wrapper */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            {/* Floating Card */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-metallic-900 via-transparent to-transparent z-10 opacity-40 mix-blend-overlay" />

                                <Image
                                    src="/profile.jpeg"
                                    alt="Nanda Kishore"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                <div className="absolute bottom-4 left-4">
                                    <div className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                        </span>
                                        <span className="text-xs font-medium text-white tracking-widest uppercase">Open to Work</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="space-y-12">
                        {/* Bio Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <p className="text-3xl md:text-4xl font-serif font-bold leading-tight text-white">
                                    Designing the <span className="text-gray-400">digital backbone</span> of the modern enterprise.
                                </p>

                                <div className="space-y-4 text-gray-400 text-lg leading-relaxed font-light">
                                    <p>
                                        Dynamic <strong className="text-white font-medium">Cloud & Security Architect</strong> with over 9 years of experience transforming IT infrastructure through secure and scalable cloud solutions!
                                    </p>
                                    <p>
                                        Specializing in <strong className="text-white font-medium">Azure Sentinel</strong> and <strong className="text-white font-medium">Microsoft Defender</strong>, I enhance threat detection and strengthen security protocols. I excel in designing compliant Azure infrastructures and executing cost-effective cloud migrations that boost operational efficiency.
                                    </p>
                                    <p>
                                        As an inspiring leader, I empower teams to innovate while aligning technology strategies with business goals for exceptional performance and security!
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {["Azure Architecture", "Zero Trust Security", "DevOps", "Cloud Migration", "Hybrid Cloud", "Identity Management"].map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-sm font-mono text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 cursor-default shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Principles Grid - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-20 space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h3 className="relative text-3xl font-serif font-bold text-white flex items-center justify-center gap-3">
                            <Trophy className="w-8 h-8 text-gold-500" />
                            <span className="tracking-wide">Core Competencies</span>
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto opacity-50" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {principles.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + (idx * 0.1), duration: 0.5 }}
                                className="group/card relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10"
                            >
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col h-full items-center text-center">
                                    <div className={`mb-6 p-4 rounded-xl bg-black/40 border border-white/10 ${item.border} transition-colors duration-300 shadow-lg group-hover:scale-110 transform duration-500`}>
                                        <item.icon className={`w-8 h-8 text-gray-400 ${item.text} transition-colors duration-300`} />
                                    </div>

                                    <h4 className={`text-2xl font-bold text-white mb-4 ${item.text} transition-colors duration-300`}>{item.title}</h4>
                                    <p className="text-gray-400 leading-relaxed group-hover/card:text-gray-200 transition-colors duration-300">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

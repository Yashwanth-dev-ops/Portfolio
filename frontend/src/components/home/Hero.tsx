"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, Download, Send } from "lucide-react";
import Link from "next/link";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { Cinematic3DButton } from "@/components/ui/Cinematic3DButton";

import { useRef, useEffect, useState } from "react";

export function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    // Delayed fade out for Main Hero (Text/Buttons): Starts fading at 20% scroll, fully transparent at 80%
    const opacityHero = useTransform(scrollYProgress, [0.2, 0.8], [1, 0]);

    // Stats vanish effect: Triggered much earlier (40% scroll) so it's GONE before overlap
    const opacityStats = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
    const scaleStats = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.6]);
    const yStats = useTransform(scrollYProgress, [0.4, 0.7], [0, 100]);

    return (
        <section ref={containerRef} className="relative min-h-[95svh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-metallic-900 pb-10 md:pb-0">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <NeuralBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-metallic-900/50 to-metallic-900" />
            </div>

            <div className="relative z-10 w-full max-w-[1800px] px-4 flex flex-col items-center text-center pt-10">
                <motion.div
                    style={{ y: yText }}
                    className="flex flex-col items-center relative z-20"
                >
                    <motion.div
                        style={{ opacity: opacityHero }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6 flex flex-col items-center"
                    >
                        {/* Role Text - Top Center */}
                        {/* Role Text - Cinematic Tracking Expansion */}
                        <motion.div
                            initial={{ opacity: 0, letterSpacing: "-0.05em" }}
                            animate={{ opacity: 1, letterSpacing: "0.3em" }}
                            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-xs md:text-xl font-mono text-azure-400 uppercase mb-4 text-center font-bold w-full"
                        >
                            Senior Cloud Solution Architect
                        </motion.div>

                        {/* MASSIVE TYPOGRAPHY - Optimized for Mobile Performance (No Blur) */}
                        <div className="flex flex-col items-center font-serif font-black leading-[0.9] tracking-tight select-none relative z-20 w-full overflow-visible">
                            <div className="overflow-hidden py-2 w-full flex justify-center">
                                <motion.div
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                                    className="text-[13vw] md:text-[11vw] text-white text-center"
                                    style={{ textShadow: "0 0 20px rgba(255,255,255,0.4)" }}
                                >
                                    NANDA
                                </motion.div>
                            </div>
                            <div className="overflow-hidden py-2 w-full flex justify-center">
                                <motion.div
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                                    className="text-[13vw] md:text-[11vw] text-white text-center"
                                    style={{ textShadow: "0 0 20px rgba(255,255,255,0.4)" }}
                                >
                                    KISHORE
                                </motion.div>
                            </div>
                        </div>


                        <motion.p
                            style={{ opacity: opacityHero }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-lg md:text-2xl text-gray-300 mt-8 max-w-2xl leading-relaxed font-light"
                        >
                            Designing the <span className="text-white font-medium shadow-cyan-500/50 drop-shadow-lg">digital backbone</span> of the modern enterprise.
                        </motion.p>

                        {/* Buttons - High priority, visible immediately */}
                        <motion.div
                            style={{ opacity: opacityHero }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 1 }}
                            className="flex flex-wrap justify-center gap-6 mt-10"
                        >
                            <Link href="/contact">
                                <Cinematic3DButton>
                                    <Send className="w-4 h-4" />
                                    <span className="font-bold tracking-wider">INITIATE CONTACT</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Cinematic3DButton>
                            </Link>

                            <a href="/api/cv" download>
                                <Cinematic3DButton className="bg-white/5 border-white/5 hover:bg-white/10">
                                    <Download className="w-4 h-4" />
                                    <span className="font-bold tracking-wider">DOWNLOAD CV</span>
                                </Cinematic3DButton>
                            </a>
                        </motion.div>

                        {/* Stats Block - Refined Glass Design */}
                        <motion.div
                            style={{ opacity: opacityStats, scale: scaleStats, y: yStats }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="mt-8 mb-10 md:mt-12 md:mb-20 flex flex-wrap justify-center gap-4 md:gap-20 px-4 md:px-12 py-4 md:py-6 relative group"
                        >
                            {/* Glass Background with Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-black/40 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 group-hover:border-azure-400/40 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)]" />

                            <div className="flex flex-wrap justify-center gap-8 md:gap-20 relative z-10">
                                <div className="flex flex-col items-center">
                                    <CountingNumber value={12} suffix="+" />
                                    <p className="text-[10px] md:text-xs text-azure-400 font-bold uppercase tracking-widest mt-2">Years Exp.</p>
                                </div>
                                <div className="hidden md:block w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <div className="flex flex-col items-center">
                                    <CountingNumber value={50} suffix="+" />
                                    <p className="text-[10px] md:text-xs text-azure-400 font-bold uppercase tracking-widest mt-2">Projects</p>
                                </div>
                                <div className="hidden md:block w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <div className="flex flex-col items-center">
                                    <CountingNumber value={3} suffix="x" />
                                    <p className="text-[10px] md:text-xs text-azure-400 font-bold uppercase tracking-widest mt-2">Certified</p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </div >
        </section >
    );
}

function CountingNumber({ value, suffix }: { value: number, suffix: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    // Tuned Spring: Stiffer and less damping to ensure it hits the target quickly without getting "stuck"
    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 15, // Reduced damping to prevent "slow tail"
        restDelta: 0.001
    });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            // Round to ensure we hit the integer target
            setDisplayValue(Math.round(latest));
        });
    }, [springValue]);

    return (
        <span ref={ref} className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 tabular-nums">
            {displayValue}{suffix}
        </span>
    );
}

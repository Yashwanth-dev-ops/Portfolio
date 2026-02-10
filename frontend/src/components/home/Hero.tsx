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

    // Responsive delay logic for sequential vs parallel animation
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const nameDelay = isMobile ? 0.5 : 0.1;
    const nameDelaySecondary = isMobile ? 0.6 : 0.2;

    return (
        <section ref={containerRef} className="relative min-h-[95svh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-metallic-900 pb-10 md:pb-0">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <NeuralBackground />
                {/* Refined gradient overlay: Less aggressive on mobile to prevent "black shade" covering the name */}
                <div className={`absolute inset-0 bg-gradient-to-b from-black/20 ${isMobile ? 'via-metallic-900/30' : 'via-metallic-900/50'} to-metallic-900/90`} />
            </div>

            <div className="relative z-10 w-full max-w-[1800px] px-4 flex flex-col items-center text-center pt-10">
                <motion.div
                    style={{ y: yText }}
                    className="flex flex-col items-center relative z-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center select-none"
                    >
                        {/* 1. Professional Designation (MOVED BACK TO TOP) - Chrome/Silver Gradient */}
                        <div className="mb-4 md:mb-6 relative z-40">
                            <motion.div
                                initial={{ opacity: 0, letterSpacing: "0.25em" }}
                                whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                className="text-sm md:text-xl font-sans uppercase text-center font-bold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 drop-shadow-sm"
                            >
                                Senior Cloud Solution Architect
                            </motion.div>
                        </div>

                        {/* 2. MASSIVE TYPOGRAPHY (NAME) - Minimal Gap - Cinematic Static Glow */}
                        <div className={`flex flex-col items-center font-['Times_New_Roman',_serif] font-bold md:font-extrabold leading-[0.9] tracking-tight relative z-30 overflow-visible w-full`}>
                            <div className="overflow-visible py-0 h-auto w-full flex justify-center">
                                <motion.div
                                    initial={{ opacity: 0, filter: "blur(20px)", y: 50 }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    viewport={{ once: false, margin: "-50px" }}
                                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: nameDelay + 0.1 }}
                                    className="text-[15vw] md:text-[12vw] text-white text-center uppercase"
                                    style={{
                                        // Multi-layer shadow for "Physical Light" feel: Core glow + Bloom + Ambient
                                        textShadow: "0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.1)",
                                        willChange: "transform, opacity, filter"
                                    }}
                                >
                                    NANDA
                                </motion.div>
                            </div>
                            <div className="overflow-visible py-0 h-auto -mt-2 md:-mt-5 w-full flex justify-center">
                                <motion.div
                                    initial={{ opacity: 0, filter: "blur(20px)", y: 50 }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    viewport={{ once: false, margin: "-50px" }}
                                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: nameDelaySecondary + 0.1 }}
                                    className="text-[15vw] md:text-[12vw] text-white text-center uppercase"
                                    style={{
                                        textShadow: "0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.1)",
                                        willChange: "transform, opacity, filter"
                                    }}
                                >
                                    KISHORE
                                </motion.div>
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 1.0, duration: 1 }}
                            className="text-lg md:text-2xl text-gray-500 mt-2 max-w-2xl leading-relaxed font-light px-6 md:px-0 relative z-30 text-center"
                        >
                            Designing the <span className="text-gray-300 font-medium">digital backbone</span> of the modern enterprise.
                        </motion.p>

                        {/* Buttons - Consistent spacing */}
                        <motion.div
                            className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 relative z-30 w-full px-4 md:px-0 max-w-md md:max-w-none"
                        >
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nanda.pandu5@gmail.com" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex justify-center relative">
                                <Cinematic3DButton as={motion.div} className="bg-white/5 border-white/5 hover:bg-white/10 w-full md:w-auto md:min-w-[180px]">
                                    <Send className="w-4 h-4" />
                                    <span className="font-bold tracking-wider">EMAIL ME</span>
                                </Cinematic3DButton>
                            </a>

                            <a href="/assets/Nanda_Kishore_Pasupuleti.pdf" download className="w-full md:w-auto flex justify-center relative">
                                <Cinematic3DButton as={motion.div} className="bg-white/5 border-white/5 hover:bg-white/10 w-full md:w-auto md:min-w-[180px]">
                                    <Download className="w-4 h-4" />
                                    <span className="font-bold tracking-wider">DOWNLOAD CV</span>
                                </Cinematic3DButton>
                            </a>
                        </motion.div>

                        {/* Stats Block - Refined Glass Design - No Scroll Vanish */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }} // Keep the repeating animation
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
    const isInView = useInView(ref, { once: false, margin: "-50px" }); // Allow re-triggering
    // Tuned Spring: Stiffer and less damping to ensure it hits the target quickly without getting "stuck"
    const springValue = useSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 15,
        restDelta: 0.001
    });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        } else {
            springValue.set(0); // Reset when out of view
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
    }, [springValue]);

    return (
        <span ref={ref} className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 tabular-nums">
            {displayValue}{suffix}
        </span>
    );
}

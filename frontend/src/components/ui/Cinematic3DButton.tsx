"use client";

import { motion } from "framer-motion";
import React from "react";

interface Cinematic3DButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    as?: any;
    floating?: boolean;
}

export function Cinematic3DButton({
    children,
    className = "",
    onClick,
    type = "button",
    disabled = false,
    as: Component = motion.button,
    floating = true
}: Cinematic3DButtonProps) {
    const isButton = Component === motion.button;

    return (
        <div className="relative group">
            {/* Ambient Background Glow (Persistent) */}
            <div className="absolute inset-x-4 inset-y-2 bg-azure-500/10 blur-2xl animate-pulse rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />

            <Component
                {...(isButton ? { type, disabled, onClick } : { onClick })}
                className={`relative z-10 px-10 py-5 rounded-full bg-black border border-white/10 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,130,246,0.15)] ${className}`}
                animate={floating && !disabled ? { y: [0, -5, 0] } : {}}
                transition={floating && !disabled ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
                whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
                whileTap={!disabled ? { scale: 0.98 } : {}}
            >
                {/* 1. Internal "Smoke" / Nebula Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-azure-500/20 via-purple-500/20 to-azure-500/20 blur-xl animate-pulse" />
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 group-hover:animate-shine" />
                </div>

                {/* 2. Top Highlight (Glass Bevel) */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70" />

                {/* 3. Bottom Shadow (Depth) */}
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-azure-500/50 to-transparent opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />

                {/* 4. Content with Glow */}
                <div className="relative z-10 flex items-center gap-3 text-white font-bold tracking-[0.2em] uppercase text-sm drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
                    {children}
                </div>

                {/* 5. Ambient Glow behind button (Internal focus) */}
                <div className="absolute inset-0 rounded-full blur-md bg-azure-500/0 group-hover:bg-azure-500/10 transition-colors duration-500 -z-10" />
            </Component>
        </div>
    );
}

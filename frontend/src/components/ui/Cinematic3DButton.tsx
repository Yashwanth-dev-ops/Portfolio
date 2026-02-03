"use client";

import { motion } from "framer-motion";
import React from "react";

interface Cinematic3DButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function Cinematic3DButton({ children, className = "", onClick, type = "button", disabled = false }: Cinematic3DButtonProps) {
    return (
        <motion.button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`relative group px-10 py-5 rounded-full bg-black border border-white/10 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            whileHover={!disabled ? { scale: 1.02 } : {}}
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

            {/* 5. Ambient Glow behind button */}
            <div className="absolute inset-0 rounded-full blur-md bg-azure-500/0 group-hover:bg-azure-500/10 transition-colors duration-500 -z-10" />
        </motion.button>
    );
}

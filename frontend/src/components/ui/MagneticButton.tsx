"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, {
        stiffness: 150,
        damping: 15,
        mass: 0.1
    });

    const mouseYSpring = useSpring(y, {
        stiffness: 150,
        damping: 15,
        mass: 0.1
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.35); // Magnetic strength
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x: mouseXSpring, y: mouseYSpring }}
            className={`relative group ${className}`}
        >
            <span className="relative z-10 block">{children}</span>

            {/* Hover visual bloom */}
            <motion.div
                className="absolute inset-0 rounded-sm bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-0"
                layoutId="glow"
            />
        </motion.button>
    );
}

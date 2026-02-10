"use client";

import { useEffect, useRef } from "react";

class Particle {
    x: number;
    y: number;
    z: number; // Depth factor
    baseX: number;
    baseY: number;
    size: number;
    color: string;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 1.5 + 0.5; // Depth factor between 0.5 and 2.0
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2.5; // Increased size for visibility
        // Varying opacity based on depth for realism - boosted for visibility
        const opacity = (this.z - 0.5) / 1.5 * 0.5 + 0.3;
        this.color = `rgba(255, 255, 255, ${opacity})`;
    }

    update(width: number, height: number, time: number, mouse: { x: number, y: number, active: boolean }) {
        // Simple flow field effect using sine waves based on position and time
        const flowX = Math.sin(this.y * 0.002 + time * 0.5) * 0.5 * this.z;
        const flowY = Math.cos(this.x * 0.002 + time * 0.3) * 0.2 * this.z;

        this.x += flowX;
        this.y += flowY - 0.2 * this.z; // Slight upward drift

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction (Repel/Swirl)
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distanceSq = dx * dx + dy * dy;
            const radiusSq = 25000; // 150px radius

            if (distanceSq < radiusSq) {
                const distance = Math.sqrt(distanceSq);
                const force = (150 - distance) / 150;

                // Gentle push away
                this.x -= (dx / distance) * force * 2 * this.z;
                this.y -= (dy / distance) * force * 2 * this.z;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        // Scale size by depth z
        ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let time = 0;

        // Detect high performant device or mobile
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 300 : 800; // Dense cloud

        let particles: Particle[] = [];
        const mouse = { x: 0, y: 0, active: false };

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(width, height));
            }
        };

        const animate = () => {
            time += 0.005; // Global time for flow
            ctx.clearRect(0, 0, width, height);

            // Optimization: No complex connection lines, just pure particles for "Nebula" look
            // Renders much faster even with high count
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(width, height, time, mouse);
                particles[i].draw(ctx);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        init();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
            aria-hidden="true"
        />
    );
}

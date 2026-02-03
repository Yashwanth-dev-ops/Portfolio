"use client";

import { useEffect, useRef } from "react";

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3; // Slower velocity for smoothness
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
    }

    update(width: number, height: number, mouseParams: { x: number, y: number, radius: number }) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (Using squared distance for performance)
        const dx = mouseParams.x - this.x;
        const dy = mouseParams.y - this.y;
        const distSq = dx * dx + dy * dy;
        const radSq = mouseParams.radius * mouseParams.radius;

        if (distSq < radSq) {
            const distance = Math.sqrt(distSq);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseParams.radius - distance) / mouseParams.radius;
            const directionX = forceDirectionX * force * this.size;
            const directionY = forceDirectionY * force * this.size;

            this.vx += directionX * 0.05;
            this.vy += directionY * 0.05;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
    }
}

export function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Debounced resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }, 200);
        };

        // Initial set
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        window.addEventListener("resize", handleResize);

        // Particles
        const particles: Particle[] = [];
        const particleCount = 45; // Reduced from 60 for performance
        const connectionDistance = 150;
        const connectionDistanceSq = connectionDistance * connectionDistance;
        const mouseParams = { x: 0, y: 0, radius: 200 };

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(width, height));
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(width, height, mouseParams);
                particles[i].draw(ctx);

                // Draw connections - O(N^2/2) check
                // Only checking j > i avoids double checking pairs
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < connectionDistanceSq) {
                        const opacity = 1 - Math.sqrt(distSq) / connectionDistance;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(160, 160, 160, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseParams.x = e.x;
            mouseParams.y = e.y;
        };
        window.addEventListener("mousemove", handleMouseMove);

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40 will-change-transform"
        />
    );
}

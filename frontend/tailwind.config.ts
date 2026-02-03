import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                metallic: {
                    900: "#0a0a0a", // Deepest black
                    800: "#171717", // Surface
                    700: "#262626", // Borders
                    100: "#e5e5e5", // Highlighting silver
                },
                azure: {
                    500: "#3b82f6", // Cloud Blue
                    400: "#60a5fa",
                },
                gold: {
                    500: "#eab308", // Awards
                }
            },
            backgroundImage: {
                'metallic-gradient': 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                'shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
};
export default config;

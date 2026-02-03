"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className="mb-12 md:mb-20">
            {/* Chapter removed by user request */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-azure-500 to-transparent mb-6"
            />
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 max-w-2xl text-lg"
            >
                {subtitle}
            </motion.p>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, Copy, Check, Send, Terminal } from "lucide-react";
import { useState } from "react";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";
import { Cinematic3DButton } from "@/components/ui/Cinematic3DButton";

export function ContactSection() {
    const [copied, setCopied] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const email = "nanda.pandu5@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Transmission failed.");
            }

            // Success
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormState({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error: unknown) {
            setIsSubmitting(false);
            const errorMessage = error instanceof Error ? error.message : "Failed to establish validation connection.";
            setErrorMessage(errorMessage);
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="contact" className="min-h-screen bg-metallic-900 flex items-center justify-center py-10 md:py-20 relative overflow-hidden selection:bg-azure-500/30 selection:text-white">

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-azure-900/20 via-transparent to-transparent opacity-40" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <InteractiveGrid />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start">

                    {/* Left Column: Context & Info */}
                    <div className="space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="space-y-6 flex flex-col items-center md:items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="hidden md:flex items-center gap-3 text-azure-400 font-mono text-xs tracking-[0.3em] uppercase"
                            >
                                <span className="w-8 h-[1px] bg-azure-500" />
                                Contact Interface
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-none text-balance"
                            >
                                Let&apos;s build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-cyan-200">future together.</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-md"
                            >
                                Ready to architect scalable cloud solutions or discuss your next big project? Initiating secure communication channel...
                            </motion.p>
                        </div>

                        <div className="space-y-6 w-full max-w-md mx-auto md:mx-0">
                            <ContactCard
                                icon={Mail}
                                label="Direct Communication"
                                value={email}
                                action={
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
                                        title="Copy Email"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                }
                                href={`mailto:${email}`}
                            />
                            <ContactCard
                                icon={Linkedin}
                                label="Professional Network"
                                value="Connect on LinkedIn"
                                href="https://www.linkedin.com/in/nanda-kishore-pasupuleti-80aa00124"
                                width="w-full"
                            />
                            <ContactCard
                                icon={MapPin}
                                label="Base of Operations"
                                value="Hyderabad, India"
                                width="w-full"
                            />
                        </div>
                    </div>

                    {/* Right Column: Interactive Form - Hidden on Mobile */}
                    <div className="relative hidden md:block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-azure-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative p-6 md:p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
                        >
                            <h3 className="text-2xl text-white font-medium mb-8 flex items-center gap-3">
                                <Terminal className="w-6 h-6 text-azure-400" />
                                <span>Send Message</span>
                            </h3>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                                        <Check className="w-10 h-10 text-green-400" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">Message Transmitted</h4>
                                    <p className="text-gray-400 max-w-xs">Thank you for reaching out. I will analyze your query and respond shortly.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-azure-400 hover:text-azure-300 text-sm font-mono tracking-wider uppercase mt-4"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup
                                            label="Name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                        />
                                        <InputGroup
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <InputGroup
                                        label="Subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                    />
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">Message</label>
                                        <textarea
                                            name="message"
                                            value={formState.message}
                                            onChange={handleChange}
                                            rows={5}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-azure-500/50 focus:bg-white/10 transition-all resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    {errorMessage && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-mono flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            {errorMessage}
                                        </div>
                                    )}

                                    <Cinematic3DButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center"
                                    >
                                        <span className="flex items-center gap-2">
                                            {isSubmitting ? "Transmitting..." : "Send Message"}
                                            {!isSubmitting && <Send className="w-4 h-4" />}
                                        </span>
                                    </Cinematic3DButton>
                                </form>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}


interface ContactCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    action?: React.ReactNode;
    href?: string;
    width?: string;
}

function ContactCard({ icon: Icon, label, value, action, href, width = "w-full" }: ContactCardProps) {
    const Component = href ? 'a' : 'div';
    return (
        <Component
            href={href}
            target={href ? "_blank" : undefined}
            rel={href ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-azure-500/50 hover:bg-white/[0.07] active:scale-[0.98] transition-all duration-300 group ${width}`}
        >
            <div className="p-3 rounded-full bg-azure-500/5 border border-white/5 text-azure-400 group-hover:bg-azure-500/20 group-hover:text-azure-300 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-4 overflow-hidden">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest shrink-0">{label}</p>
                <div className="hidden md:block w-px h-3 bg-white/10" />
                <p className="text-white font-medium group-hover:text-azure-100 transition-colors truncate text-sm md:text-base">{value}</p>
            </div>
            {action}
        </Component>
    );
}


interface InputGroupProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

function InputGroup({ label, name, type = "text", value, onChange, placeholder }: InputGroupProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest pl-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-azure-500/50 focus:bg-white/10 transition-all"
                placeholder={placeholder}
            />
        </div>
    );
}

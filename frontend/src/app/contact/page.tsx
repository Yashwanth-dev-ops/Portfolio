"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Cinematic3DButton } from "@/components/ui/Cinematic3DButton";
import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, Send, Loader2, ArrowRight, Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-metallic-900 pt-20 pb-20 relative overflow-hidden selection:bg-azure-500/30 selection:text-white">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-azure-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            {/* Massive Background Typography */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0 select-none overflow-hidden opacity-10">
                <motion.h1 className="flex font-black leading-none tracking-tighter">
                    <motion.span
                        className="text-[20vw] sm:text-[12vw] text-white"
                        style={{
                            textShadow: "0 0 50px rgba(255,255,255,0.1)"
                        }}
                    >
                        CONTACT
                    </motion.span>
                </motion.h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <SectionHeader
                    title="Initialize Connection"
                    subtitle="Secure channel ready. Transmit your objectives."
                />

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-12">

                    {/* Contact Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Terminal className="w-6 h-6 text-azure-400" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                    Communication Protocols
                                </span>
                            </h3>
                            <p className="text-gray-400 leading-relaxed max-w-md">
                                Available for freelance architecture, cloud infrastructure consulting, and cloud related missions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Mail,
                                    label: "Direct Feed",
                                    value: "nanda.pandu5@gmail.com",
                                    action: "copy",
                                    color: "text-azure-400"
                                },
                                {
                                    icon: Linkedin,
                                    label: "Professional Network",
                                    value: "/in/nanda-kishore-pasupuleti",
                                    href: "https://www.linkedin.com/in/nanda-kishore-pasupuleti-80aa00124",
                                    color: "text-blue-400"
                                },
                                {
                                    icon: MapPin,
                                    label: "Base of Operations",
                                    value: "Hyderabad, India",
                                    action: "copy",
                                    color: "text-emerald-400"
                                }
                            ].map((item, idx) => (
                                <ContactItem key={idx} item={item} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative background elements behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-azure-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50" />

                        <div className="relative bg-black/60 backdrop-blur-xl p-6 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                                        <div className="relative w-24 h-24 rounded-full bg-black/50 border border-green-500/50 flex items-center justify-center">
                                            <Send className="w-10 h-10 text-green-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Transmission Received</h3>
                                        <p className="text-gray-400 max-w-xs mx-auto">Your message has been encrypted and securely delivered to the server.</p>
                                    </div>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-azure-400 transition-colors"
                                    >
                                        Send another transmission
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                                    <div className="space-y-2 group">
                                        <label htmlFor="name" className="text-xs font-mono text-azure-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-azure-500/50 focus:bg-white/10 transition-all duration-300"
                                                placeholder="John Doe"
                                            />
                                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-azure-500 group-focus-within:w-full transition-all duration-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 group">
                                        <label htmlFor="email" className="text-xs font-mono text-azure-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-azure-500/50 focus:bg-white/10 transition-all duration-300"
                                                placeholder="john@example.com"
                                            />
                                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-azure-500 group-focus-within:w-full transition-all duration-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 group">
                                        <label htmlFor="message" className="text-xs font-mono text-azure-400 uppercase tracking-widest ml-1">Your Message</label>
                                        <div className="relative">
                                            <textarea
                                                id="message"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-azure-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                                                placeholder="How can we help you?"
                                            />
                                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-azure-500 group-focus-within:w-full transition-all duration-500" />
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-center">
                                        <Cinematic3DButton
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>ENCRYPTING...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>INITIATE UPLOAD</span>
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Cinematic3DButton>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}

interface ContactItemProps {
    item: {
        icon: React.ElementType;
        label: string;
        value: string;
        href?: string | null;
        action?: string;
        color: string;
    };
}

function ContactItem({ item }: ContactItemProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(item.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const Wrapper = item.href ? motion.a : motion.div;
    const props = item.href ? {
        href: item.href,
        target: item.href.startsWith("http") ? "_blank" : undefined,
        rel: "noopener noreferrer"
    } : {
        onClick: item.action === "copy" ? handleCopy : undefined
    };

    return (
        <Wrapper
            {...props}
            className={`block group relative ${item.action === "copy" || item.href ? "cursor-pointer" : "cursor-default"}`}
            whileHover={{ x: 10 }}
        >
            <div className="flex items-center gap-6 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10">
                <div className={`p-4 rounded-lg bg-black/40 border border-white/5 group-hover:border-${item.color.split('-')[1]}-500/50 transition-colors shadow-lg`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg text-white font-bold group-hover:text-azure-300 transition-colors">{item.value}</p>
                </div>
                {item.action === "copy" && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/10 rounded-full">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/50" />}
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

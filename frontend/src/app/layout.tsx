import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Senior Cloud Architect | Azure & Security Expert",
  description: "Portfolio of a Senior Azure Cloud Solution Architect specializing in enterprise security, Zero Trust, and cloud-native infrastructure.",
  keywords: ["Azure", "Cloud Architect", "Security", "Zero Trust", "DevOps", "Terraform", "Kubernetes"],
  authors: [{ name: "Cloud Architect" }],
  openGraph: {
    title: "Senior Cloud Architect | Azure & Security Expert",
    description: "Designing scalable, secure, and resilient cloud solutions for the enterprise.",
    url: "https://architect-portfolio.com",
    siteName: "Cloud Architect Portfolio",
    images: [
      {
        url: "https://architect-portfolio.com/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Cloud Architect | Azure & Security Expert",
    description: "Designing scalable, secure, and resilient cloud solutions for the enterprise.",
  },
};

import SmoothScroll from "@/components/ui/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="bg-metallic-900 text-white antialiased overflow-x-hidden selection:bg-azure-500/30 selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

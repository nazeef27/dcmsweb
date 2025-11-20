"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Critical components - load immediately
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/HeroSection";

// Lazy load non-critical components using dynamic imports
const ChatBot = dynamic(() => import("@/components/ChatBot").then(mod => ({ default: mod.ChatBot })), {
  ssr: false,
  loading: () => null
});

const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="w-full h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div></div>
});

const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(mod => ({ default: mod.StatsSection })), {
  loading: () => <div className="w-full h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div></div>
});

const InfrastructureSection = dynamic(() => import("@/components/sections/InfrastructureSection").then(mod => ({ default: mod.InfrastructureSection })), {
  loading: () => <div className="w-full h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div></div>
});

const DepartmentsSection = dynamic(() => import("@/components/sections/DepartmentsSection").then(mod => ({ default: mod.DepartmentsSection })), {
  loading: () => <div className="w-full h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div></div>
});

const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="w-full h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div></div>
});

const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="w-full h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div></div>
});

const Footer = dynamic(() => import("@/components/Footer").then(mod => ({ default: mod.Footer })), {
  loading: () => null
});

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop").then(mod => ({ default: mod.ScrollToTop })), {
  loading: () => null
});

export default function Home() {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Reduced delay for faster initial render
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {isMounted && <ChatBot />}
      <Header />
      <HeroSection />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isContentVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <AboutSection />
        <StatsSection />
        <InfrastructureSection />
        <DepartmentsSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
        <ScrollToTop />
      </motion.div>
    </main>
  );
}


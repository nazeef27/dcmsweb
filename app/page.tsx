"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  loading: () => null
});

const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(mod => ({ default: mod.StatsSection })), {
  loading: () => null
});

const InfrastructureSection = dynamic(() => import("@/components/sections/InfrastructureSection").then(mod => ({ default: mod.InfrastructureSection })), {
  loading: () => null
});

const DepartmentsSection = dynamic(() => import("@/components/sections/DepartmentsSection").then(mod => ({ default: mod.DepartmentsSection })), {
  loading: () => null
});

const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => null
});

const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => null
});

const Footer = dynamic(() => import("@/components/Footer").then(mod => ({ default: mod.Footer })), {
  loading: () => null
});

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop").then(mod => ({ default: mod.ScrollToTop })), {
  loading: () => null
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Reduce loading time - show content faster
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Loading Screen - Only render on client after mount */}
      {isMounted && isLoading && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[100]"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'transparent'
          }}
          suppressHydrationWarning
        >
          <div className="text-center relative z-10">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              DCMS
            </h2>
          </div>
        </div>
      )}

      {/* Main Content - Always render so video background shows immediately */}
      {isMounted && <ChatBot />}
      <Header />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <InfrastructureSection />
      <DepartmentsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}


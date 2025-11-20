"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, GraduationCap, Award, Users, Sparkles } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { MagneticButton } from "@/components/MagneticButton";
import { ParallaxSection } from "@/components/ParallaxSection";
import { GlassCard } from "@/components/GlassCard";
import { useState } from "react";

export function EnhancedHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3), transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <GlassCard className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-primary-700 dark:text-primary-300 text-sm font-semibold">
                    Established 1984
                  </span>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Deccan College</span>
              <br />
              <span className="text-gray-900 dark:text-white">of Medical Sciences</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              One of the oldest and most sought-after medical colleges in Telangana, producing 150 high-caliber medical graduates each year.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <MagneticButton className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all">
                <span>Explore Campus</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              
              <MagneticButton
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-4 glass-effect text-gray-900 dark:text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Video</span>
              </MagneticButton>
            </motion.div>

            {/* Quick Stats with Glass Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-12"
            >
              {[
                { icon: GraduationCap, value: "150", label: "Graduates/Year" },
                { icon: Award, value: "40+", label: "Years Excellence" },
                { icon: Users, value: "1000+", label: "Students" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <GlassCard hover={true} className="text-center p-4">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image/Visual with Enhanced Effects */}
          <ParallaxSection>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
                <SafeImage
                  src="https://dcms.ac.in/wp-content/uploads/2024/01/logo.png"
                  alt="DCMS Campus"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(14, 165, 233, 0.5)",
                      "0 0 40px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(14, 165, 233, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              
              {/* Enhanced Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6"
              >
                <GlassCard hover={true} className="p-4">
                  <div className="text-3xl font-bold gradient-text">NMC</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recognized</div>
                </GlassCard>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6"
              >
                <GlassCard hover={true} className="p-4">
                  <div className="text-3xl font-bold gradient-text">KNRUHS</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Affiliated</div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </ParallaxSection>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <GlassCard hover={false} className="p-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            />
          </motion.div>
        </GlassCard>
      </motion.div>
    </section>
  );
}




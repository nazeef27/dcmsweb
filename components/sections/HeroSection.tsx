"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, GraduationCap, Award, Users, BookOpen } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { useState } from "react";
import { useVideoTheme } from "@/components/VideoThemeManager";

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { isVideoDark } = useVideoTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-36">
      {/* Minimal backdrop - video should be clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10">
        <div className="absolute inset-0 bg-[url('https://dcms.ac.in/wp-content/uploads/2024/01/logo.png')] opacity-5 bg-center bg-no-repeat bg-contain"></div>
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cream/20 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-cream/20 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-1 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className={`px-4 py-2 backdrop-blur-sm rounded-full text-sm font-semibold border ${
                isVideoDark 
                  ? "bg-white/20 text-white border-white/30" 
                  : "bg-black/20 text-black border-black/30"
              }`}>
                Established 1984
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-shadow-premium ${
                isVideoDark ? "text-white" : "text-black"
              }`}
            >
              <span className="gradient-text-green">Deccan College</span>
              <br />
              <span className={isVideoDark ? "text-white" : "text-black"}>of Medical Sciences</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl drop-shadow-lg mb-8 leading-relaxed font-medium ${
                isVideoDark ? "text-white" : "text-black"
              }`}
            >
              One of the oldest and most sought-after medical colleges in Telangana, producing 150 high-caliber medical graduates each year.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <MagneticButton className="group px-8 py-4 bg-green-800 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-premium hover:shadow-glow hover:scale-110 hover:bg-green-900 transition-all cursor-pointer btn-premium ripple">
                <span>Explore Campus</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              
              <MagneticButton
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-4 bg-cream/90 text-black rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-premium hover:shadow-xl hover:scale-110 hover:bg-cream hover:text-black border-2 border-cream hover:border-cream transition-all cursor-pointer btn-premium ripple"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Video</span>
              </MagneticButton>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12"
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
                  className="text-center tilt-3d transform-3d"
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${isVideoDark ? "text-white" : "text-black"} animate-float-premium`} style={{ animationDelay: `${index * 0.2}s` }} />
                  <div className={`text-2xl font-bold gradient-text-green ${isVideoDark ? "" : ""}`}>{stat.value}</div>
                  <div className={`text-sm font-medium ${isVideoDark ? "text-white" : "text-black"}`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isVideoDark ? "border-white/50" : "border-black/50"
          }`}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-1 h-3 rounded-full mt-2 ${
              isVideoDark ? "bg-white" : "bg-black"
            }`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}


"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-effect rounded-2xl p-6 backdrop-blur-xl bg-white/10 dark:bg-slate-900/30 border border-white/20 dark:border-white/10 shadow-premium tilt-3d transform-3d ${className}`}
      whileHover={hover ? { scale: 1.03, y: -8, rotateX: 2, rotateY: 2 } : {}}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}




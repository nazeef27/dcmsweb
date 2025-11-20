"use client";

import { motion } from "framer-motion";

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Static Gradient Orbs - No animation for better performance */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-3" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-3" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-3" />
      
      {/* Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 dark:from-primary-950/20 dark:via-transparent dark:to-secondary-950/20" />
    </div>
  );
}



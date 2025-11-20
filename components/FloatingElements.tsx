"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Zap } from "lucide-react";

const floatingIcons = [
  { icon: Sparkles, delay: 0, duration: 3 },
  { icon: Star, delay: 0.5, duration: 4 },
  { icon: Zap, delay: 1, duration: 3.5 },
  { icon: Sparkles, delay: 1.5, duration: 4.5 },
  { icon: Star, delay: 2, duration: 3 },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;
        const left = 10 + index * 20;
        const top = 20 + (index % 3) * 30;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <Icon className="w-6 h-6 text-primary-400/30 dark:text-primary-500/20" />
          </motion.div>
        );
      })}
    </div>
  );
}




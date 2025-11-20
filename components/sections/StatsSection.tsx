"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/GlassCard";

import { Trophy, Building2, BookOpen, Award } from "lucide-react";

const stats = [
  { value: 40, suffix: "+", label: "History Of High Achievers", icon: Trophy },
  { value: 50, suffix: "+", label: "Total Acres of the Land", icon: Building2 },
  { value: 10, suffix: "+", label: "Kilometer's of Bookshelves", icon: BookOpen },
  { value: 100, suffix: "+", label: "Awards & Achievements", icon: Award },
];

function Counter({ end, suffix, inView }: { end: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <span className="text-6xl md:text-7xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="section-padding bg-green-800/60 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Most Interesting Facts</h2>
          <p className="text-xl text-white font-medium">
            To take a trivial example which of us ever undertakes laborious physical exercise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center"
            >
              <GlassCard hover={false} className="p-8 hover:bg-white/20 transition-all">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-white" />
                </div>
                <div className="mb-4">
                  <Counter end={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <h3 className="text-lg font-semibold">{stat.label}</h3>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


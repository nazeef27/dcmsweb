"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, GraduationCap, Award, Users, Globe, Zap } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { useVideoTheme } from "@/components/VideoThemeManager";

const features = [
  {
    icon: BookOpen,
    title: "E-Learning",
    description: "Our online learning platform for comprehensive education",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    link: "https://cimsstudentnewui.mastersofterp.in/",
    external: true,
  },
  {
    icon: Award,
    title: "JMAS",
    description: "Journal of Medical and Allied Sciences",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    link: "https://jmas.in/",
    external: true,
  },
  {
    icon: Globe,
    title: "NMC / University",
    description: "Details as per Clause B.1.11 of minimum standard requirement",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    link: "#",
  },
  {
    icon: Users,
    title: "Alumni",
    description: "Fill the form to register as alumni",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    link: "#",
  },
  {
    icon: Zap,
    title: "Dspace-CRIS",
    description: "Our Current Research Information System",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    link: "#",
  },
  {
    icon: GraduationCap,
    title: "Educational ERP",
    description: "Our Centralized institute Management System",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    link: "#",
  },
];

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isVideoDark } = useVideoTheme();

  return (
    <section id="academics" ref={ref} className="section-padding bg-transparent backdrop-blur-[1px]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className={`font-semibold uppercase tracking-wide ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            Useful Links
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 mb-6 ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            Explore Our <span>Resources</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isExternal = (feature as any).external;
            
            return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.03, rotateX: 2, rotateY: 2 }}
              className="group relative bg-cream/60 backdrop-blur-[1px] rounded-2xl overflow-hidden shadow-premium hover:shadow-glow hover:scale-105 hover:border-2 hover:border-green-800 transition-all cursor-pointer tilt-3d transform-3d"
              onClick={() => {
                if (isExternal) {
                  window.open(feature.link, '_blank', 'noopener,noreferrer');
                } else if (feature.link !== '#') {
                  if (feature.link.startsWith('#')) {
                    const element = document.querySelector(feature.link);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    window.location.href = feature.link;
                  }
                }
              }}
            >
              <div className="relative h-48 overflow-hidden bg-cream/30 image-overlay">
                <SafeImage
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover image-zoom group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-green-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 p-3 bg-white/20 backdrop-blur-md rounded-xl group-hover:bg-white/30 transition-all">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 group-hover:text-black transition-colors gradient-text-green ${
                  isVideoDark ? "" : ""
                }`}>
                  {feature.title}
                </h3>
                <p className={`font-medium ${
                  isVideoDark ? "text-white" : "text-black"
                }`}>
                  {feature.description}
                </p>
              </div>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 bg-green-800 rounded-lg">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


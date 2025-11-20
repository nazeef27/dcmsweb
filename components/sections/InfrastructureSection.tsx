"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SafeImage } from "@/components/SafeImage";
import { GraduationCap, BookOpen, Microscope, Trophy, Building2, Dumbbell, ChevronLeft, ChevronRight } from "lucide-react";
import { useVideoTheme } from "@/components/VideoThemeManager";
import { useState } from "react";

const facilities = [
  {
    name: "Lecture Halls",
    icon: GraduationCap,
    image: "/videos/deccanlecture-hall.webp",
    description: "State-of-the-art lecture halls with modern audio-visual equipment",
  },
  {
    name: "Examination Halls",
    icon: BookOpen,
    image: "/videos/deccan examinationhalls.webp",
    description: "Spacious examination halls for conducting various assessments",
  },
  {
    name: "Library",
    icon: BookOpen,
    image: "/lib deccan.webp",
    description: "Extensive collection of medical books and digital resources",
  },
  {
    name: "Research Facility",
    icon: Microscope,
    image: "/videos/deccan research.jpg",
    description: "Advanced research laboratories and equipment",
  },
  {
    name: "Laboratories",
    icon: Microscope,
    image: "/videos/deccanlaboratory.webp",
    description: "Well-equipped laboratories for practical learning",
  },
  {
    name: "Sports & Games",
    icon: Trophy,
    image: "/videos/deccan sports.avif",
    description: "Comprehensive sports facilities and recreational areas",
  },
];

export function InfrastructureSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isVideoDark } = useVideoTheme();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % facilities.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentFacility = facilities[currentIndex];
  const IconComponent = currentFacility.icon;

  return (
    <section id="facilities" ref={ref} className="section-padding bg-transparent backdrop-blur-[1px]">
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
            Our Infrastructure
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 mb-6 ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            World-Class <span>Facilities</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-medium ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            Modern infrastructure designed to provide the best learning environment for our students.
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Slideshow */}
          <div className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-premium-lg bg-cream/60 backdrop-blur-[1px] group cursor-pointer" onClick={nextSlide}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative h-full overflow-hidden image-overlay">
                  <SafeImage
                    src={currentFacility.image}
                    alt={currentFacility.name}
                    fill
                    className="object-cover image-zoom"
                    priority={currentIndex === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-premium">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className={`text-3xl md:text-4xl font-bold mb-4 gradient-text-cream text-shadow-premium ${
                        isVideoDark ? "" : ""
                      }`}>
                        {currentFacility.name}
                      </h3>
                      <p className={`text-lg md:text-xl font-medium text-white/90 max-w-2xl ${
                        isVideoDark ? "" : ""
                      }`}>
                        {currentFacility.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all shadow-premium hover:scale-110 z-10"
              aria-label="Previous facility"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all shadow-premium hover:scale-110 z-10"
              aria-label="Next facility"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {facilities.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-white shadow-glow'
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4">
            {facilities.map((facility, index) => {
              const ThumbnailIcon = facility.icon;
              return (
                <motion.button
                  key={facility.name}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-green-800 shadow-glow scale-105'
                      : 'border-cream/50 hover:border-green-600/50'
                  }`}
                >
                  <SafeImage
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      index === currentIndex ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-bold text-white text-center truncate">
                      {facility.name}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

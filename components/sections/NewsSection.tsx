"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SafeImage } from "@/components/SafeImage";
import { Calendar, ArrowRight } from "lucide-react";
import { useVideoTheme } from "@/components/VideoThemeManager";

const newsItems = [
  {
    title: "Quadrigenia 2025 Souvenir",
    date: "2025",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    category: "Event",
  },
  {
    title: "Deccan Gazette Volume 1, Issue 1",
    date: "2024",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    category: "Publication",
  },
  {
    title: "Deccan Gazette Volume 1, Issue 2",
    date: "2024",
    image: "https://dcms.ac.in/wp-content/uploads/2024/01/logo.png",
    category: "Publication",
  },
];

export function NewsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isVideoDark } = useVideoTheme();

  return (
    <section id="gallery" ref={ref} className="section-padding bg-transparent backdrop-blur-[1px]">
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
            Happening Now
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 mb-6 ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            Latest <span>Updates</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-medium ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            Stay updated with what&apos;s happening in the campus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group bg-cream/60 backdrop-blur-[1px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 hover:border-2 hover:border-green-800 transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden bg-cream/30">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-green-800 text-white text-sm font-semibold rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className={`flex items-center space-x-2 text-sm mb-3 ${
                  isVideoDark ? "text-white/70" : "text-black/70"
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <h3 className={`text-xl font-bold mb-4 group-hover:text-black transition-colors ${
                  isVideoDark ? "text-white" : "text-black"
                }`}>
                  {item.title}
                </h3>
                <div className={`flex items-center font-bold group-hover:gap-2 transition-all ${
                  isVideoDark ? "text-white" : "text-black"
                }`}>
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


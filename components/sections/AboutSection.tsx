"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SafeImage } from "@/components/SafeImage";
import { CheckCircle, Award, Users, BookOpen } from "lucide-react";
import { useVideoTheme } from "@/components/VideoThemeManager";

const features = [
  "Modern infrastructure with state-of-art equipment",
  "Highly qualified and motivated teaching staff",
  "150 high-caliber medical graduates each year",
  "Recognized by National Medical Commission",
  "Affiliated to KNRUHS, Telangana",
  "Muslim Minority institution with inclusive admissions",
];

const highlights = [
  { icon: Award, title: "NMC Recognized", description: "Fully recognized by National Medical Commission" },
  { icon: Users, title: "Experienced Faculty", description: "Highly qualified teaching staff" },
  { icon: BookOpen, title: "Modern Curriculum", description: "Updated medical education programs" },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isVideoDark } = useVideoTheme();

  return (
    <section id="about" ref={ref} className="section-padding bg-transparent backdrop-blur-[1px]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className={`font-semibold uppercase tracking-wide ${
                isVideoDark ? "text-white" : "text-black"
              }`}
            >
              About DCMS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className={`text-4xl md:text-5xl font-bold mt-4 mb-6 ${
                isVideoDark ? "text-white" : "text-black"
              }`}
            >
              Building Future
              <span className="block">Medical Leaders</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className={`text-lg mb-8 leading-relaxed font-medium ${
                isVideoDark ? "text-white" : "text-black"
              }`}
            >
              The Deccan College of Medical Sciences (DCMS) is one of the oldest and most sought-after medical colleges in State of Telangana. With its modern infrastructure, state-of-art equipment and highly qualified and motivated teaching staff, the college produces 150 high-caliber medical graduates each year.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-800 flex-shrink-0 mt-0.5" />
                  <span className={`font-medium ${isVideoDark ? "text-white" : "text-black"}`}>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-800 text-white rounded-xl font-semibold shadow-premium hover:shadow-glow hover:bg-green-900 transition-all cursor-pointer btn-premium ripple"
            >
              Read More
            </motion.button>
          </motion.div>

          {/* Right Image - Expanded Campus Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-premium-lg bg-cream/30 image-overlay tilt-3d"
          >
            <SafeImage
              src="/videos/deccan college.png"
              alt="DCMS Campus"
              fill
              className="object-cover image-zoom"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3 + index * 0.1 }}
              whileHover={{ y: -12, scale: 1.03, rotateX: 2, rotateY: 2 }}
              className="p-6 bg-cream/60 backdrop-blur-[1px] rounded-2xl border border-cream/50 hover:shadow-glow transition-all shadow-premium tilt-3d transform-3d"
            >
              <highlight.icon className="w-12 h-12 text-green-800 mb-4 animate-float-premium" style={{ animationDelay: `${index * 0.1}s` }} />
              <h3 className={`text-xl font-bold mb-2 gradient-text-green ${
                isVideoDark ? "" : ""
              }`}>
                {highlight.title}
              </h3>
              <p className={isVideoDark ? "text-white/80" : "text-black/80"}>
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision and Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20"
        >
          {/* Vision Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className={`font-semibold uppercase tracking-wide text-sm ${
              isVideoDark ? "text-white" : "text-black"
            }`}>
              Vision & Mission
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mt-4 mb-6 ${
              isVideoDark ? "text-white" : "text-black"
            }`}>
              VISION
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="p-8 bg-cream/60 backdrop-blur-[1px] rounded-2xl border border-cream/50 hover:shadow-glow transition-all shadow-premium tilt-3d transform-3d"
            >
              <h3 className={`text-3xl font-bold mb-6 gradient-text-green ${
                isVideoDark ? "" : ""
              }`}>Our Vision</h3>
              <p className={`text-lg leading-relaxed font-medium mb-4 ${
                isVideoDark ? "text-white/90" : "text-black/90"
              }`}>
                Our vision is to be global leaders in education and research. We are at the forefront of biomedical, clinical and applied research that shapes the future of healthcare. We nurture talent, ambition, and curiosity in an inclusive culture that embraces multi-professionalism and team science.
              </p>
              <p className={`text-lg leading-relaxed font-medium ${
                isVideoDark ? "text-white/90" : "text-black/90"
              }`}>
                Embracing Interdisciplinary Collaboration to Address Complex Medical Challenges
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.9, duration: 0.8 }}
              className="p-8 bg-cream/60 backdrop-blur-[1px] rounded-2xl border border-cream/50 hover:shadow-glow transition-all shadow-premium tilt-3d transform-3d"
            >
              <h3 className={`text-3xl font-bold mb-6 gradient-text-green ${
                isVideoDark ? "" : ""
              }`}>Our Mission</h3>
              <p className={`text-lg leading-relaxed font-medium mb-4 ${
                isVideoDark ? "text-white/90" : "text-black/90"
              }`}>
                Our goal is to enhance the health and well-being of individuals through exceptional education, innovative research, and dynamic knowledge sharing.
              </p>
              <ul className={`space-y-3 text-lg leading-relaxed font-medium mb-6 ${
                isVideoDark ? "text-white/90" : "text-black/90"
              }`}>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-800 flex-shrink-0 mt-1 mr-3" />
                  <span>Fostering the development of future health professionals who will provide technologically advanced, team-based care that combines person-centered compassion with scientific methods</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-800 flex-shrink-0 mt-1 mr-3" />
                  <span>Offering a comprehensive system of student support that emphasizes resilience, wellbeing, and a friendly community</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-800 flex-shrink-0 mt-1 mr-3" />
                  <span>Creating a global medical network dedicated to improving people&apos;s lives by embracing the values of equality, diversity, and inclusion in all facets of the medical curriculum</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* M.E.D.I.C.I.N.E. and Objectives Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-20 grid lg:grid-cols-2 gap-8"
        >
          {/* M.E.D.I.C.I.N.E. Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 2.2, duration: 0.8 }}
            whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: 2 }}
            className="p-8 bg-cream/60 backdrop-blur-[1px] rounded-2xl border border-cream/50 hover:shadow-glow transition-all shadow-premium tilt-3d transform-3d"
          >
            <h3 className={`text-3xl font-bold mb-6 gradient-text-green ${
              isVideoDark ? "" : ""
            }`}>M.E.D.I.C.I.N.E.</h3>
            <p className={`text-lg leading-relaxed font-medium mb-6 ${
              isVideoDark ? "text-white/90" : "text-black/90"
            }`}>
              To impart medical education inculcating
            </p>
            <div className={`space-y-2 text-lg leading-relaxed font-medium ${
              isVideoDark ? "text-white/90" : "text-black/90"
            }`}>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">M</span>oral and</p>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">E</span>thical values; practice healthcare delivery exuding professional</p>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">D</span>ecorum with all-</p>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">I</span>nclusiveness and</p>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">C</span>ompassion; working for</p>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">I</span>mprovement in skills, nurturing</p>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">N</span>ovel ideas and striving for</p>
              <p><span className="font-extrabold text-sky-500 dark:text-sky-400 text-xl">E</span>xcellence</p>
            </div>
          </motion.div>

          {/* Objectives Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 2.3, duration: 0.8 }}
            whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: 2 }}
            className="p-8 bg-cream/60 backdrop-blur-[1px] rounded-2xl border border-cream/50 hover:shadow-glow transition-all shadow-premium tilt-3d transform-3d"
          >
            <h3 className={`text-3xl font-bold mb-6 gradient-text-green ${
              isVideoDark ? "" : ""
            }`}>Objectives</h3>
            <div className={`space-y-4 text-lg leading-relaxed font-medium ${
              isVideoDark ? "text-white/90" : "text-black/90"
            }`}>
              <p>
                Deccan College of Medical Sciences is established by a Muslim Minority Trust i.e., Dar-Us-Salam Educational Trust which constituted to promote education and welfare of weaker sections of Muslims. Primarily benefits of this college goes to the Muslim Minority, no profit is involved in running the college.
              </p>
              <p>
                In order to provide Medical aid, Hospitals and Health Centres have been established attached to this college which are working for eradication of diseases and improvement of health of the poor public.
              </p>
              <p>
                A Research Centre for liver diseases has also been established in this college. The continuing of Medical Education Unit at the Deccan College of Medical Sciences recognizes its responsibility to promote lifelong learning through the provision of well-designed educational experiences for physicians, others involved in health care delivery, and benefit the community at large.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


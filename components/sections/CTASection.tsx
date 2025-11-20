"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Download, MapPin, Phone } from "lucide-react";

export function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section-padding bg-green-800/60 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 200, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -200, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white gradient-text-cream text-shadow-premium">
              Let's Build Your Future With DCMS
            </h2>
            <p className="text-xl text-white font-medium mb-8 leading-relaxed">
              Not sure what to study? Download Our Guide and explore the opportunities at Deccan College of Medical Sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-cream text-black rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-premium hover:shadow-glow hover:bg-cream/90 transition-all cursor-pointer btn-premium ripple"
              >
                <Download className="w-5 h-5" />
                <span>Download Guide</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/20 transition-all shadow-premium hover:shadow-glow btn-premium ripple"
              >
                <span>360° Campus Tour</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, x: 10, rotateX: 2, rotateY: 2 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-premium hover:shadow-glow tilt-3d transform-3d"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/20 rounded-xl shadow-glow animate-glow-pulse">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white gradient-text-cream">Visit Our Campus</h3>
                  <p className="text-white font-medium">
                    DMRL &apos;X&apos; Road, Kanchanbagh,<br />
                    Hyderabad–500058, Telangana, India.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, x: 10, rotateX: 2, rotateY: 2 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-premium hover:shadow-glow tilt-3d transform-3d"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/20 rounded-xl shadow-glow animate-glow-pulse">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white gradient-text-cream">Contact Us</h3>
                  <p className="text-white font-medium">
                    040-24340225<br />
                    040-24343129<br />
                    principal@dcms.ac.in
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



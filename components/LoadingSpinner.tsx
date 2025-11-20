"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white"
        >
          DCMS
        </motion.h2>
      </div>
    </div>
  );
}




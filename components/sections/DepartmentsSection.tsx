"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  ArrowRight, 
  Stethoscope, 
  Brain, 
  Microscope, 
  Heart, 
  Eye, 
  Baby, 
  Bone, 
  Pill, 
  FlaskConical,
  Activity,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { useVideoTheme } from "@/components/VideoThemeManager";
import { useState } from "react";

const departmentIcons: { [key: string]: any } = {
  "Anatomy": Brain,
  "Biochemistry": FlaskConical,
  "Physiology": Activity,
  "Pathology": Microscope,
  "Pharmacology": Pill,
  "Microbiology": Microscope,
  "Forensic Medicine": Stethoscope,
  "Community Medicine": Heart,
  "Ophthalmology": Eye,
  "Otorhinolaryngology": Stethoscope,
  "General Medicine": Stethoscope,
  "General Surgery": Stethoscope,
  "Pediatrics": Baby,
  "Orthopedics": Bone,
  "Obstetrics & Gynecology": Heart,
  "Cardiology": Heart,
  "Cardiothoracic Vascular Surgery": Heart,
  "Neurology": Brain,
  "Neurosurgery": Brain,
  "Medical Gastroenterology": Stethoscope,
  "Surgical Gastroenterology": Stethoscope,
  "Plastic Surgery": Stethoscope,
  "Nephrology": Stethoscope,
  "Urology": Stethoscope,
  "Pediatric Surgery": Baby,
  "Endocrinology": Activity,
  "Immunology & Rheumatology": Activity,
  "Oncology": Activity,
};

const departmentCategories = [
  {
    category: "Pre – Clinical",
    description: "Foundation of medical knowledge",
    departments: ["Anatomy", "Biochemistry", "Physiology"],
    gradient: "from-blue-600 to-cyan-600",
    icon: GraduationCap,
  },
  {
    category: "Para – Clinical",
    description: "Bridge between theory and practice",
    departments: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine"],
    gradient: "from-purple-600 to-pink-600",
    icon: Microscope,
  },
  {
    category: "Broad Speciality (Clinical)",
    description: "Comprehensive clinical expertise",
    departments: [
      "Community Medicine",
      "Ophthalmology",
      "Otorhinolaryngology",
      "General Medicine",
      "General Surgery",
      "Pediatrics",
      "Orthopedics",
      "Obstetrics & Gynecology",
    ],
    gradient: "from-green-600 to-emerald-600",
    icon: Stethoscope,
  },
  {
    category: "Super Speciality (Clinical)",
    description: "Advanced specialized care",
    departments: [
      "Cardiology",
      "Cardiothoracic Vascular Surgery",
      "Neurology",
      "Neurosurgery",
      "Medical Gastroenterology",
      "Surgical Gastroenterology",
      "Plastic Surgery",
      "Nephrology",
      "Urology",
      "Pediatric Surgery",
      "Endocrinology",
      "Immunology & Rheumatology",
      "Oncology",
    ],
    gradient: "from-orange-600 to-red-600",
    icon: Sparkles,
  },
];

export function DepartmentsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { isVideoDark } = useVideoTheme();

  return (
    <section id="departments" ref={ref} className="section-padding bg-transparent backdrop-blur-[1px] relative">
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
            Departments
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-4 mb-6 text-shadow-premium ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            Comprehensive <span className="gradient-text-green">Medical Education</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-medium ${
            isVideoDark ? "text-white" : "text-black"
          }`}>
            Explore our diverse range of medical departments offering specialized education and training.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {departmentCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => {
                  setSelectedCategory(selectedCategory === category.category ? null : category.category);
                  setShowAll(false);
                }}
                className={`group relative px-6 py-3 rounded-xl font-semibold flex items-center gap-3 overflow-hidden ${
                  selectedCategory === category.category
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-premium scale-105`
                    : `bg-cream/60 backdrop-blur-sm text-black dark:text-white hover:bg-cream/80 border border-cream/50`
                }`}
                style={{
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  color: selectedCategory === category.category ? 'white' : undefined
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon 
                  className="w-5 h-5 relative z-10" 
                  style={{ 
                    color: selectedCategory === category.category ? 'white' : '#166534',
                    transition: 'color 0.1s ease'
                  }} 
                />
                <span className="relative z-10" style={{ transition: 'color 0.1s ease' }}>
                  {category.category}
                </span>
                {selectedCategory === category.category && (
                  <motion.div
                    layoutId="activeCategory"
                    className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-xl`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: 0 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* View All Button - Moved under category buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={() => {
              setShowAll(!showAll);
              setSelectedCategory(null);
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-xl font-semibold shadow-premium hover:shadow-glow transition-all cursor-pointer btn-premium ripple ${
              showAll 
                ? 'bg-green-900 text-white hover:bg-green-800' 
                : 'bg-green-800 text-white hover:bg-green-900'
            }`}
          >
            {showAll ? 'Hide All Departments' : 'View All Departments'}
          </motion.button>
        </motion.div>

        {/* Departments Grid - Show when category is selected or showAll is true */}
        {(selectedCategory || showAll) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {showAll 
              ? // Show all departments from all categories
                departmentCategories.map((category, categoryIndex) => 
                  category.departments.map((dept, deptIndex) => {
                    const Icon = departmentIcons[dept] || Stethoscope;
                    const globalIndex = departmentCategories
                      .slice(0, categoryIndex)
                      .reduce((acc, cat) => acc + cat.departments.length, 0) + deptIndex;
                    
                    return (
                      <motion.div
                        key={`${category.category}-${dept}`}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: globalIndex * 0.03,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -8,
                          rotateX: 2,
                          rotateY: 2
                        }}
                        className="group relative bg-gradient-to-br from-white/90 to-cream/60 dark:from-slate-800/90 dark:to-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-premium hover:shadow-glow transition-all cursor-pointer tilt-3d transform-3d overflow-hidden"
                      >
                        {/* Gradient Background Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* Icon */}
                        <div className={`relative mb-4 p-4 rounded-xl bg-gradient-to-br ${category.gradient} w-16 h-16 flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                          <div className="absolute inset-0 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                        </div>
                        
                        {/* Department Name */}
                        <h3 className={`text-lg font-bold mb-2 relative z-10 gradient-text-green group-hover:text-green-800 transition-colors ${
                          isVideoDark ? "" : ""
                        }`}>
                          {dept}
                        </h3>
                        
                        {/* Category Badge */}
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${category.gradient} text-white shadow-sm mb-3`}>
                          {category.category.split(' ')[0]}
                        </div>
                        
                        {/* Arrow Indicator */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient} shadow-glow`}
                          >
                            <ArrowRight className="w-4 h-4 text-white" />
                          </motion.div>
                        </div>
                        
                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                      </motion.div>
                    );
                  })
                )
              : // Show only selected category's departments
                departmentCategories
                  .find(cat => cat.category === selectedCategory)
                  ?.departments.map((dept, deptIndex) => {
                    const Icon = departmentIcons[dept] || Stethoscope;
                    const category = departmentCategories.find(cat => cat.category === selectedCategory)!;
                    
                    return (
                      <motion.div
                        key={dept}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: deptIndex * 0.05,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -8,
                          rotateX: 2,
                          rotateY: 2
                        }}
                        className="group relative bg-gradient-to-br from-white/90 to-cream/60 dark:from-slate-800/90 dark:to-slate-700/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-premium hover:shadow-glow transition-all cursor-pointer tilt-3d transform-3d overflow-hidden"
                      >
                        {/* Gradient Background Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* Icon */}
                        <div className={`relative mb-4 p-4 rounded-xl bg-gradient-to-br ${category.gradient} w-16 h-16 flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                          <div className="absolute inset-0 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                        </div>
                        
                        {/* Department Name */}
                        <h3 className={`text-lg font-bold mb-2 relative z-10 gradient-text-green group-hover:text-green-800 transition-colors ${
                          isVideoDark ? "" : ""
                        }`}>
                          {dept}
                        </h3>
                        
                        {/* Category Badge */}
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${category.gradient} text-white shadow-sm mb-3`}>
                          {category.category.split(' ')[0]}
                        </div>
                        
                        {/* Arrow Indicator */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient} shadow-glow`}
                          >
                            <ArrowRight className="w-4 h-4 text-white" />
                          </motion.div>
                        </div>
                        
                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                      </motion.div>
                    );
                  })}
          </motion.div>
        )}

        {/* Empty State - Show when no category is selected and showAll is false */}
        {!selectedCategory && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-cream/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-cream/50 dark:border-white/10 shadow-premium">
              <Stethoscope className="w-16 h-16 mx-auto mb-4 text-green-800 dark:text-green-600" />
              <h3 className={`text-2xl font-bold mb-2 gradient-text-green ${
                isVideoDark ? "" : ""
              }`}>
                Select a Category
              </h3>
              <p className={`text-lg font-medium ${
                isVideoDark ? "text-white/80" : "text-black/80"
              }`}>
                Click on a category above to view the departments
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}



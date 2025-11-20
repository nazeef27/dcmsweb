"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useVideoTheme } from "./VideoThemeManager";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about", hasDropdown: true },
  { name: "Departments", href: "#departments", hasDropdown: true },
  { name: "Courses", href: "#courses" },
  { name: "Facilities", href: "#facilities" },
  { name: "Academics & Research", href: "#academics" },
  { name: "Contact", href: "#contact" },
];

const aboutUsOptions = [
  { name: "Vision", href: "#about" },
  { name: "Mission", href: "#about" },
  { name: "Administration", href: "#about", hasSubmenu: true },
  { name: "History & Timeline", href: "#about" },
  { name: "Darussalam Educational Trust", href: "#about" },
  { name: "Present Day", href: "#about" },
  { name: "Teaching Hospitals", href: "#about" },
  { name: "Affiliating University", href: "#about" },
  { name: "Other Institutions", href: "#about" },
];

const administrationOfficeBearers = [
  "Principal, Deccan College of Medical Sciences",
  "Dr. Ashfaq Hasan Professor, Department of Respiratory Medicine",
  "Chief Administrator, Deccan College of Medical Sciences and Allied Institutions",
  "Managing Director, Deccan College of Medical Sciences and Allied Institutions",
  "Chairman, Darussalam Educational Trust",
  "Vice-Principal, Deccan College of Medical Sciences",
  "Medical Superintendent, Owaisi Hospital and Research Center",
  "Medical Superintendent, Princess Esra Hospital",
  "Assistant Administrator – DCMS & AI",
  "Head – Central Stores and Purchase Department",
  "Head – Human Resources Department",
  "Prof. – Deccan School of Hospital Management",
];

const departmentCategories = [
  {
    category: "Pre – Clinical",
    departments: ["Anatomy", "Biochemistry", "Physiology"],
  },
  {
    category: "Para – Clinical",
    departments: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine"],
  },
  {
    category: "Broad Speciality (Clinical)",
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
  },
  {
    category: "Super Speciality (Clinical)",
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
  },
];

// Search data structure
type SearchItem = {
  title: string;
  href: string;
  category: string;
  keywords: string[];
};

const searchableItems: SearchItem[] = [
  // Main navigation
  ...navLinks.map(link => ({ 
    title: link.name, 
    href: link.href, 
    category: "Navigation",
    keywords: [link.name.toLowerCase()]
  })),
  // About Us options
  ...aboutUsOptions.map(option => ({ 
    title: option.name, 
    href: option.href, 
    category: "About Us",
    keywords: [option.name.toLowerCase(), "about", "vision", "mission", "administration", "history", "timeline", "trust", "hospitals", "university", "institutions"]
  })),
  // Departments
  ...departmentCategories.flatMap(category => 
    category.departments.map(dept => ({
      title: dept,
      href: "#departments",
      category: category.category,
      keywords: [dept.toLowerCase(), "department", "medical", category.category.toLowerCase()]
    }))
  ),
  // Administration office bearers
  ...administrationOfficeBearers.map(bearer => ({
    title: bearer,
    href: "#about",
    category: "Administration",
    keywords: [bearer.toLowerCase(), "administration", "office", "bearer", "principal", "director", "superintendent"]
  })),
  // Chatbot
  {
    title: "Ask me",
    href: "#chatbot",
    category: "Assistant",
    keywords: ["ask me", "chatbot", "chat", "assistant", "help", "faq", "questions", "ask", "me"]
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDepartmentsHovered, setIsDepartmentsHovered] = useState(false);
  const [isAboutUsHovered, setIsAboutUsHovered] = useState(false);
  const [isAdministrationModalOpen, setIsAdministrationModalOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredAboutOption, setHoveredAboutOption] = useState<string | null>(null);
  const [isMobileDepartmentsOpen, setIsMobileDepartmentsOpen] = useState(false);
  const [isMobileAboutUsOpen, setIsMobileAboutUsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const videoTheme = useVideoTheme();
  const isVideoDark = videoTheme.isVideoDark;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search functionality - Debounced for performance
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // Debounce search for better performance
    const timeoutId = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      const results = searchableItems.filter(item => {
        // Check if query matches title or any keyword
        const titleMatch = item.title.toLowerCase().includes(query);
        const keywordMatch = item.keywords.some(keyword => keyword.includes(query));
        return titleMatch || keywordMatch;
      });

      // Sort by relevance (exact matches first, then partial matches)
      results.sort((a, b) => {
        const aExact = a.title.toLowerCase() === query;
        const bExact = b.title.toLowerCase() === query;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        const aStarts = a.title.toLowerCase().startsWith(query);
        const bStarts = b.title.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return 0;
      });

      setSearchResults(results.slice(0, 10)); // Limit to 10 results
      setSelectedIndex(0);
    }, 200); // 200ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchNavigation = (href: string, title: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    
    // Special handling for Administration
    if (title.toLowerCase().includes("administration")) {
      setIsAdministrationModalOpen(true);
      return;
    }
    
    // Special handling for Chatbot
    if (href === "#chatbot" || title.toLowerCase().includes("ask me") || title.toLowerCase().includes("chatbot")) {
      // Dispatch custom event to open chatbot
      window.dispatchEvent(new CustomEvent('openChatbot'));
      return;
    }
    
    // Navigate to the section
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.location.href = href;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && searchResults.length > 0) {
      e.preventDefault();
      handleSearchNavigation(searchResults[selectedIndex].href, searchResults[selectedIndex].title);
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-premium-lg border-b border-white/10 dark:border-white/5"
            : "bg-transparent backdrop-blur-none"
        }`}
        style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
      >
        <nav className="container-custom">
          {/* Top Row - Logo and Mobile Menu */}
          <div className="flex items-center justify-between h-20 py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <img 
                src="/logo.webp" 
                alt="Deccan College of Medical Sciences" 
                className="h-12 w-auto object-contain"
              />
              <div className="hidden md:block">
                <h1 className={`text-lg md:text-xl font-bold font-display tracking-tight leading-tight whitespace-nowrap ${
                  isVideoDark ? "text-white" : "text-black"
                }`}>
                  Deccan College of Medical Sciences
                </h1>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 font-bold ${isVideoDark ? "text-white" : "text-black dark:text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 font-bold ${isVideoDark ? "text-white" : "text-black dark:text-white"}`} />
              )}
            </button>
          </div>

          {/* Second Row - Navigation, Search, and Dark Mode */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-6 flex-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.hasDropdown) {
                      if (link.name === "About Us") {
                        setIsAboutUsHovered(true);
                      } else if (link.name === "Departments") {
                        setIsDepartmentsHovered(true);
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.name === "About Us") {
                      setIsAboutUsHovered(false);
                      setHoveredAboutOption(null);
                    } else if (link.name === "Departments") {
                      setIsDepartmentsHovered(false);
                      setHoveredCategory(null);
                    }
                  }}
                >
                  <a
                  href={link.href}
                    className={`text-base font-bold hover:text-green-800 dark:hover:text-green-800 px-3 py-2 rounded-lg transition-all duration-300 relative group cursor-pointer block underline-animated ${
                      isVideoDark ? "text-white" : "text-black dark:text-white"
                    }`}
                >
                  {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-600 dark:to-green-800 group-hover:w-full transition-all duration-300 rounded-full shadow-glow"></span>
                  </a>
                  
                  {/* About Us Dropdown */}
                  {link.hasDropdown && link.name === "About Us" && (
                    <AnimatePresence>
                      {isAboutUsHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 bg-cream/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-cream/50 dark:border-slate-700 z-50"
                          onMouseLeave={() => {
                            setIsAboutUsHovered(false);
                            setHoveredAboutOption(null);
                          }}
                        >
                          <div className="p-2">
                            {aboutUsOptions.map((option) => (
                              <div
                                key={option.name}
                                className="relative"
                              >
                                {option.hasSubmenu ? (
                                  <button
                                    onClick={() => setIsAdministrationModalOpen(true)}
                                    className="w-full text-left block px-4 py-3 text-base font-bold text-black dark:text-white hover:text-green-800 dark:hover:text-green-400 hover:bg-green-800/10 dark:hover:bg-green-400/10 rounded-lg transition-all"
                                  >
                                    {option.name}
                                  </button>
                                ) : (
                                  <a
                                    href={option.href}
                                    className="block px-4 py-3 text-base font-bold text-black dark:text-white hover:text-green-800 dark:hover:text-green-400 hover:bg-green-800/10 dark:hover:bg-green-400/10 rounded-lg transition-all"
                                  >
                                    {option.name}
                                  </a>
                                )}
                                
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                  
                  {/* Departments Dropdown */}
                  {link.hasDropdown && link.name === "Departments" && (
                    <AnimatePresence>
                      {isDepartmentsHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-cream/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-cream/50 dark:border-slate-700 z-50"
                          onMouseLeave={() => {
                            setIsDepartmentsHovered(false);
                            setHoveredCategory(null);
                          }}
                        >
                          <div className="p-2">
                            {departmentCategories.map((category) => (
                              <div
                                key={category.category}
                                className="relative"
                                onMouseEnter={() => setHoveredCategory(category.category)}
                                onMouseLeave={() => setHoveredCategory(null)}
                              >
                                <a
                                  href="#departments"
                                  className="block px-4 py-3 text-base font-bold text-black dark:text-white hover:text-green-800 dark:hover:text-green-400 hover:bg-green-800/10 dark:hover:bg-green-400/10 rounded-lg transition-all"
                                >
                                  {category.category}
                                </a>
                                
                                {/* Nested Submenu */}
                                <AnimatePresence>
                                  {hoveredCategory === category.category && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute left-full top-0 ml-2 w-64 bg-cream/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-cream/50 dark:border-slate-700 z-50 p-3"
                                    >
                                      <ul className="space-y-1">
                                        {category.departments.map((dept) => (
                                          <li key={dept}>
                                            <a
                                              href="#departments"
                                              className="block px-3 py-2 text-sm text-black/80 dark:text-white/80 hover:text-green-800 dark:hover:text-green-400 hover:bg-green-800/10 dark:hover:bg-green-400/10 rounded-lg transition-all"
                                            >
                                              {dept}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Search and Dark Mode Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold transition-all cursor-pointer shadow-premium hover:shadow-glow btn-premium ripple"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm">Search</span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all cursor-pointer border-2 border-black/20 dark:border-white/20"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-black dark:text-white font-bold" />
                ) : (
                  <Sun className="w-5 h-5 text-black dark:text-white font-bold" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search and Dark Mode Row */}
          <div className="lg:hidden flex items-center justify-end space-x-3 pb-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold transition-all cursor-pointer shadow-md"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm">Search</span>
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all cursor-pointer border-2 border-black/20 dark:border-white/20"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-black dark:text-white font-bold" />
              ) : (
                <Sun className="w-5 h-5 text-black dark:text-white font-bold" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-slate-900 z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-black dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-black dark:text-white font-bold" />
                </button>
              </div>
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => {
                            if (link.name === "About Us") {
                              setIsMobileAboutUsOpen(!isMobileAboutUsOpen);
                            } else if (link.name === "Departments") {
                              setIsMobileDepartmentsOpen(!isMobileDepartmentsOpen);
                            }
                          }}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-green-800 dark:hover:bg-green-800 hover:text-white dark:hover:text-white transition-all font-bold text-base text-black dark:text-white border-l-4 border-transparent hover:border-green-800 dark:hover:border-green-800"
                        >
                          <span>{link.name}</span>
                          <span className="text-lg">
                            {(link.name === "About Us" && isMobileAboutUsOpen) || 
                             (link.name === "Departments" && isMobileDepartmentsOpen) ? "−" : "+"}
                          </span>
                        </button>
                        
                        {/* About Us Mobile Dropdown */}
                        {link.name === "About Us" && (
                          <AnimatePresence>
                            {isMobileAboutUsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 pr-4 py-2 space-y-2">
                                  {aboutUsOptions.map((option) => (
                                    <div key={option.name}>
                                      {option.hasSubmenu ? (
                                        <button
                                          onClick={() => {
                                            setIsAdministrationModalOpen(true);
                                            setIsMobileMenuOpen(false);
                                          }}
                                          className="w-full text-left block py-2 px-4 text-sm text-black/80 dark:text-white/80 hover:text-green-800 dark:hover:text-green-400 hover:bg-green-800/10 dark:hover:bg-green-400/10 rounded-lg transition-all border-l-2 border-green-800 dark:border-green-800 pl-4"
                                        >
                                          {option.name}
                                        </button>
                                      ) : (
                                        <a
                                          href={option.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="block py-2 px-4 text-sm text-black/80 dark:text-white/80 hover:text-green-800 dark:hover:text-green-400 hover:bg-green-800/10 dark:hover:bg-green-400/10 rounded-lg transition-all border-l-2 border-green-800 dark:border-green-800 pl-4"
                                        >
                                          {option.name}
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                        
                        {/* Departments Mobile Dropdown */}
                        {link.name === "Departments" && (
                          <AnimatePresence>
                            {isMobileDepartmentsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 pr-4 py-2 space-y-4">
                                  {departmentCategories.map((category) => (
                                    <div key={category.category} className="border-l-2 border-green-800 dark:border-green-800 pl-4">
                                      <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                                        {category.category}
                                      </h4>
                                      <ul className="space-y-1">
                                        {category.departments.map((dept) => (
                                          <li key={dept}>
                                            <a
                                              href="#departments"
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="block py-1.5 px-3 text-sm text-black/80 dark:text-white/80 hover:text-green-800 dark:hover:text-green-400 hover:bg-green-800/10 dark:hover:bg-green-400/10 rounded-lg transition-all"
                                            >
                                              {dept}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    ) : (
                      <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 rounded-lg hover:bg-green-800 dark:hover:bg-green-800 hover:text-white dark:hover:text-white transition-all font-bold text-base text-black dark:text-white border-l-4 border-transparent hover:border-green-800 dark:hover:border-green-800"
                    >
                      {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
              setSearchResults([]);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl mx-4 relative"
            >
              <div className="relative">
              <input
                type="text"
                  placeholder="Search for pages, departments, administration..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-6 py-4 pr-12 text-xl font-bold rounded-t-2xl bg-white dark:bg-slate-800 border-2 border-green-800 dark:border-green-800 focus:outline-none focus:ring-4 focus:ring-green-800/20 dark:focus:ring-green-800/20 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
                autoFocus
              />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-800 dark:text-green-400" />
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-b-2xl border-x-2 border-b-2 border-green-800 dark:border-green-800 max-h-96 overflow-y-auto shadow-2xl"
                >
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((result, index) => (
                        <button
                          key={`${result.title}-${index}`}
                          onClick={() => handleSearchNavigation(result.href, result.title)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                            index === selectedIndex
                              ? "bg-green-800/20 dark:bg-green-400/20 text-green-800 dark:text-green-400"
                              : "hover:bg-green-800/10 dark:hover:bg-green-400/10 text-black dark:text-white"
                          }`}
                        >
                          <div className="font-bold text-base">{result.title}</div>
                          <div className="text-xs text-black/60 dark:text-white/60 mt-1">
                            {result.category}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-lg font-bold text-black dark:text-white mb-2">
                        No results found
                      </p>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        Try searching for "Administration", "Departments", "Vision", "Mission", or department names
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Administration Modal */}
      <AnimatePresence>
        {isAdministrationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setIsAdministrationModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-cream/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-cream/50 dark:border-slate-700 p-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAdministrationModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-green-800 dark:hover:bg-green-600 text-black dark:text-white transition-all z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6 font-bold" />
              </button>

              {/* Administration Image */}
              <div className="w-full">
                <img
                  src="/abtus.webp"
                  alt="Administration - Deccan College of Medical Sciences"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



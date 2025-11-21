"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

// FAQ Database - College-related questions and answers
const faqDatabase = [
  {
    question: "What is Deccan College of Medical Sciences?",
    answer: "Deccan College of Medical Sciences (DCMS) is one of the oldest and most sought-after medical colleges in Telangana, producing high-caliber medical graduates. We offer comprehensive medical education with state-of-the-art facilities and experienced faculty.",
    keywords: ["what", "college", "deccan", "medical", "sciences", "about", "introduction"]
  },
  {
    question: "What courses are offered?",
    answer: "DCMS offers various medical courses including MBBS, postgraduate programs, and super-specialty courses. We have departments across Pre-Clinical, Para-Clinical, Broad Speciality (Clinical), and Super Speciality (Clinical) categories.",
    keywords: ["courses", "programs", "mbbs", "postgraduate", "education", "degrees", "what courses"]
  },
  {
    question: "What are the admission requirements?",
    answer: "Admission requirements vary by program. For MBBS, students typically need to qualify through NEET (National Eligibility cum Entrance Test). Please contact our admissions office for specific requirements and eligibility criteria for your desired program.",
    keywords: ["admission", "requirements", "eligibility", "neet", "how to apply", "apply", "entry"]
  },
  {
    question: "What departments are available?",
    answer: "We have multiple departments including Pre-Clinical (Anatomy, Biochemistry, Physiology), Para-Clinical (Pathology, Pharmacology, Microbiology, Forensic Medicine), Broad Speciality (General Medicine, General Surgery, Pediatrics, etc.), and Super Speciality departments (Cardiology, Neurology, Gastroenterology, etc.).",
    keywords: ["departments", "specialties", "branches", "what departments", "departments available"]
  },
  {
    question: "What facilities are available?",
    answer: "DCMS provides state-of-the-art facilities including modern lecture halls, examination halls, extensive library with digital resources, advanced research laboratories, well-equipped labs, and comprehensive sports facilities. We also have teaching hospitals for clinical training.",
    keywords: ["facilities", "infrastructure", "library", "labs", "laboratories", "sports", "what facilities"]
  },
  {
    question: "What are the teaching hospitals?",
    answer: "DCMS is associated with teaching hospitals including Owaisi Hospital and Research Center, and Princess Esra Hospital. These hospitals provide clinical training and hands-on experience for our students.",
    keywords: ["hospitals", "teaching hospitals", "owaisi", "princess esra", "clinical training", "hospitals affiliated"]
  },
  {
    question: "How can I contact the college?",
    answer: "You can contact Deccan College of Medical Sciences through our official website, email, or phone. Visit our Contact section for detailed contact information including address, phone numbers, and email addresses for different departments.",
    keywords: ["contact", "how to contact", "phone", "email", "address", "location", "reach", "get in touch"]
  },
  {
    question: "What is the history of DCMS?",
    answer: "Deccan College of Medical Sciences has a rich history and is one of the oldest medical colleges in Telangana. The college is managed by Darussalam Educational Trust and has been producing excellent medical professionals for many years.",
    keywords: ["history", "timeline", "established", "when", "founded", "background", "heritage"]
  },
  {
    question: "Who is the founder?",
    answer: "Deccan College of Medical Sciences is owned by the Dar-us-Salam Educational Trust, which was founded by the late Alhaj Sultan Salahuddin Owaisi. The trust is currently chaired by Asaduddin Owaisi, and the college is administered under his guidance as well as that of the Managing Director, Akbaruddin Owaisi.\n\nOwner: Dar-us-Salam Educational Trust\nFounder: Late Alhaj Sultan Salahuddin Owaisi\nCurrent Chairman: Asaduddin Owaisi\nManaging Director: Akbaruddin Owaisi",
    keywords: ["founder", "founders", "who is the founder", "who founded", "owner", "chairman", "managing director", "sultan salahuddin", "asaduddin", "akbaruddin", "dar-us-salam", "trust"]
  },
  {
    question: "Who is Salahuddin?",
    answer: "ALHAJ SULTAN SALAHUDDIN OWAISI\n\nThe Deccan College of Medical Sciences under the aegis of Dar-us-Salam Educational Trust, under the Chairmanship of ALHAJ SULTAN SALAHUDDIN OWAISI, EX. M.P., was started in the year 1984 with an intake of 100 seats in M.B;B.S. course.",
    keywords: ["salahuddin", "sultan salahuddin", "salahuddin owaisi", "sultan salahuddin owaisi", "alhaj sultan", "who is salahuddin", "about salahuddin"]
  },
  {
    question: "Who is the current owner?",
    answer: "Asaduddin Owaisi is an Indian politician and the President of the All India Majlis-e-Ittehadul Muslimeen (AIMIM) party. He has been a Member of Parliament (MP) representing the Hyderabad constituency in the Lok Sabha (the lower house of the Indian Parliament) since 2004, having been re-elected in 2024 for his fifth consecutive term.\n\nKey facts:\nRole: AIMIM party chief and five-time MP for Hyderabad.\nProfession: A barrister by training, having studied law at Lincoln's Inn in London.\nPolitical Stance: Known for his assertive and often fiery advocacy for Muslim and Dalit minority rights, secularism, and sharp criticism of Hindutva ideology and other mainstream political parties.\nAwards: Honored with the Sansad Ratna Award in 2014 and the Best Parliamentarian Award in 2022 for his active participation in debates and raising important questions in Parliament.\nBackground: He comes from a prominent political family in Hyderabad; his father and grandfather both led the AIMIM party before him.",
    keywords: ["current owner", "who is the current owner", "current chairman", "who is the chairman", "asaduddin", "asaduddin owaisi", "barrister asaduddin", "who is asaduddin", "about asaduddin", "aimim", "hyderabad mp"]
  },
  {
    question: "Who is Akbaruddin Owaisi?",
    answer: "Akbaruddin Owaisi is an Indian politician and a prominent leader of the All India Majlis-e-Ittehadul Muslimeen (AIMIM) party.\n\nHe is the floor leader of AIMIM in the Telangana Legislative Assembly and has served as a Member of the Legislative Assembly (MLA) for the Chandrayangutta constituency in Hyderabad for six consecutive terms since 1999. He is the younger brother of AIMIM President and Hyderabad MP, Asaduddin Owaisi.\n\nOwaisi is known for his influential speeches and is also the managing director of the Owaisi Hospital and runs the Salar-e-Millat Educational Trust, which operates a chain of schools providing free education.",
    keywords: ["akbaruddin", "akbaruddin owaisi", "akbar sir", "who is akbaruddin", "about akbaruddin", "managing director", "who is the managing director", "chandrayangutta", "telangana mla"]
  },
  {
    question: "What is the vision and mission?",
    answer: "Our vision is to be a leading medical institution producing high-caliber medical graduates. Our mission focuses on providing quality medical education, fostering research, and serving the community through healthcare excellence.",
    keywords: ["vision", "mission", "goals", "objectives", "purpose", "aim"]
  },
  {
    question: "Are there research opportunities?",
    answer: "Yes, DCMS has advanced research facilities and encourages research activities. We have dedicated research laboratories and support faculty and students in conducting medical research across various specialties.",
    keywords: ["research", "research opportunities", "research facilities", "studies", "publications"]
  },
  {
    question: "What is the academic calendar?",
    answer: "The academic calendar varies by program. Please contact the academic office or visit our website for the current academic calendar, including semester dates, examination schedules, and holidays.",
    keywords: ["academic calendar", "semester", "schedule", "dates", "exams", "holidays", "academic year"]
  },
  {
    question: "What scholarships are available?",
    answer: "DCMS may offer various scholarships and financial aid programs. Please contact our admissions or financial aid office for detailed information about available scholarships, eligibility criteria, and application procedures.",
    keywords: ["scholarships", "financial aid", "fees", "tuition", "grants", "funding", "financial assistance"]
  }
];

// Function to find best matching FAQ
function findBestMatch(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();
  
  // Direct question match
  const directMatch = faqDatabase.find(faq => 
    faq.question.toLowerCase().includes(query) || 
    query.includes(faq.question.toLowerCase().split('?')[0].toLowerCase())
  );
  
  if (directMatch) return directMatch.answer;
  
  // Keyword matching
  const queryWords = query.split(/\s+/);
  let bestMatch = null;
  let maxMatches = 0;
  
  for (const faq of faqDatabase) {
    const matchCount = faq.keywords.filter(keyword => 
      queryWords.some(word => word.includes(keyword) || keyword.includes(word))
    ).length;
    
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestMatch = faq;
    }
  }
  
  if (bestMatch && maxMatches > 0) {
    return bestMatch.answer;
  }
  
  // Default response
  return "I'm here to help you with information about Deccan College of Medical Sciences. Could you please rephrase your question? You can ask about courses, admissions, departments, facilities, or any other college-related information.";
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; timestamp: Date }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages after mount to prevent hydration error
  useEffect(() => {
    setIsMounted(true);
    setMessages([
      { text: "Hello! I'm your virtual assistant for Deccan College of Medical Sciences. How can I help you today?", sender: 'bot', timestamp: new Date() }
    ]);
  }, []);

  // Entrance animation - ball falls from top to bottom-left corner
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // After animation completes (1.5s), show final button
      setTimeout(() => {
        setHasAnimated(true);
      }, 1500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for open chatbot event from search
  useEffect(() => {
    const handleOpenChatbot = () => {
      if (hasAnimated) {
        setIsOpen(true);
      }
    };

    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, [hasAnimated]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = findBestMatch(inputValue);
      setMessages(prev => [...prev, {
        text: botResponse,
        sender: 'bot' as const,
        timestamp: new Date()
      }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Don't render until mounted to prevent hydration errors
  if (!isMounted) return null;

  return (
    <>
      {/* Animated Entrance Ball - Falls from top to bottom-left corner */}
      <AnimatePresence>
        {!hasAnimated && (
          <motion.div
            initial={{ scale: 0, opacity: 0, top: '-100px', left: '24px' }}
            animate={isVisible ? {
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1],
              top: ['-100px', 'calc(100vh - 88px)', 'calc(100vh - 88px)'],
              left: ['24px', '24px', '24px'],
            } : {}}
            transition={{
              duration: 1.5,
              times: [0, 0.7, 1],
              ease: ["easeOut", "easeIn", "easeOut"]
            }}
            className="fixed z-[100]"
          >
            <div className="relative w-16 h-16 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/50 to-green-600/50 animate-ping" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Button - Final position */}
      {hasAnimated && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className={`fixed bottom-6 left-6 ${isOpen ? 'z-[75]' : 'z-50'}`}
        >
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-auto min-w-[80px] h-16 px-4 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-full shadow-2xl flex items-center justify-center gap-2 border-4 border-white/20 hover:border-white/40 transition-all group"
            aria-label="Open chatbot"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <X className="w-5 h-5 text-white font-bold" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm">Ask me</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/30 to-green-600/30 group-hover:from-green-400/50 group-hover:to-green-600/50 transition-all" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-green-400/50"
            />
          </motion.button>
        </motion.div>
      )}

      {/* Backdrop Blur Overlay - Covers everything including header */}
      <AnimatePresence>
        {isOpen && hasAnimated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Chat Window - Clear and focused */}
      <AnimatePresence>
        {isOpen && hasAnimated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-24 left-6 w-80 sm:w-96 h-[460px] sm:h-[520px] max-h-[75vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-[70] flex flex-col border border-green-800/20 overflow-hidden backdrop-blur-none"
          >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">DCMS Assistant</h3>
                    <p className="text-white/80 text-xs">Online now</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/30 dark:bg-slate-800/30">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-700 text-black dark:text-white rounded-bl-none shadow-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-black/50 dark:text-white/50'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 focus:border-green-600 focus:outline-none bg-white dark:bg-slate-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!inputValue.trim()}
                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Ask about courses, admissions, departments, facilities, and more
                </p>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


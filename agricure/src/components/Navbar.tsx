"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const languages = [
    "English", "Hindi", "Punjabi", "Marathi", "Gujarati", 
    "Tamil", "Telugu", "Kannada", "Bengali", "Malayalam"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "Disease Detection", path: "/disease-detection" },
    { name: "Smart Irrigation", path: "/smart-irrigation" },
    { name: "Weather", path: "/weather" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Marketplace", path: "/marketplace" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 dark:bg-background/60 backdrop-blur-md shadow-sm py-1 border-b border-gray-200 dark:border-white/10" : "bg-transparent py-1.5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative mt-2">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary-light p-1.5 rounded-lg text-white shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-primary-dark">
              CROPLY
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav - Center */}
        <div className="hidden lg:flex items-center gap-4 font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <motion.div
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="text-foreground/80 hover:text-primary transition-colors text-sm whitespace-nowrap"
              >
                {link.name}
              </motion.div>
            </Link>
          ))}
        </div>
          
        {/* Desktop Actions - Right */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors text-base py-2 px-3 rounded-lg hover:bg-gray-100"
            >
              <Globe className="w-4 h-4" />
              {currentLang}
              <ChevronDown className={`w-4 h-4 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-background border border-gray-200 dark:border-white/10 rounded-xl shadow-lg overflow-hidden py-2"
                >
                  <div className="max-h-60 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${currentLang === lang ? "text-primary font-bold bg-primary/5" : "text-foreground"}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/auth/login"
            className="px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-all shadow-md text-base"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-t border-gray-200 dark:border-white/10 p-6 flex flex-col gap-4 shadow-xl lg:hidden"
          >
            {navLinks.map((link) => (
               <Link
               key={link.name}
               href={link.path}
               onClick={() => setMobileMenuOpen(false)}
               className="text-lg font-medium p-2 hover:bg-primary/10 rounded-lg text-foreground"
             >
               {link.name}
             </Link>
            ))}
            
            <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
            <p className="text-sm text-foreground/50 px-2 uppercase font-bold tracking-wider">Select Language</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.slice(0, 4).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setCurrentLang(lang);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left p-2 rounded-lg text-sm ${currentLang === lang ? "bg-primary text-white font-bold" : "bg-gray-50 dark:bg-gray-800 text-foreground"}`}
                >
                  {lang}
                </button>
              ))}
              <div className="text-xs text-foreground/50 p-2 flex items-center">+ 6 more (Desktop)</div>
            </div>

             <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 text-center px-6 py-3 rounded-xl bg-primary text-white font-medium"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

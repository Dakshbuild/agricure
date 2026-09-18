"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageSelector } from "./LanguageSelector";

const navLinks = [
  { name: "Scanner", href: "/disease-detection" },
  { name: "Chatbot", href: "/chatbot" },
  { name: "Satellite", href: "/satellite-monitoring" },
  { name: "Weather", href: "/weather-alerts" },
  { name: "Irrigation", href: "/smart-watering" },
  { name: "Prediction", href: "/disease-prediction" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Marketplace", href: "/farm-connect" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/20">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50 relative">
          <div className="bg-[var(--color-primary)] p-2 rounded-xl">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">AGRI CURE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
                pathname === link.href ? "text-[var(--color-primary)]" : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelector />
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button>Download App</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden z-50 relative p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl flex flex-col p-6 gap-4 lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium py-2 border-b border-gray-100 ${
                    pathname === link.href ? "text-[var(--color-primary)]" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Language</span>
                  <LanguageSelector />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
                <Button className="w-full">Download App</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

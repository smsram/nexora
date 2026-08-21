"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Logical order of active sections present on this page
const navLinks = [
  { name: "Services", href: "#services", id: "services" },
  { name: "Story", href: "#story", id: "story" },
  { name: "Team", href: "#team", id: "team" },
  { name: "Domains", href: "#domains", id: "domains" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [logoError, setLogoError] = useState(false);

  // Scroll spy / Intersection Observer for dynamic active nav state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 200;
      const sectionElements = navLinks.map((link) => ({
        id: link.id,
        element: document.getElementById(link.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.element) {
          const top = item.element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo (public/Nexora.png) */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative h-10 w-auto min-w-[130px] flex items-center">
            {!logoError ? (
              <Image
                src="/Nexora.png"
                alt="Nexora"
                width={145}
                height={42}
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              /* Fallback if logo file is pending placement */
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#00144A] border border-[#002277] shadow-[0_3px_0_#000B2B] flex items-center justify-center text-[#00D2FF]">
                  <span className="font-outfit font-black text-lg">N</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit text-xl font-black tracking-tight text-brand-navy leading-none">
                    NEXORA
                  </span>
                  <span className="font-outfit text-[9px] font-bold tracking-[0.2em] text-[#0099BE] uppercase">
                    Creations
                  </span>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Center: Desktop Navigation Links with Scroll Spy Active Indicator */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-semibold font-jakarta rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-brand-navy font-bold"
                    : "text-slate-600 hover:text-brand-navy"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-200 -z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />}
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Tactile CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="#contact"
            className="tactile-btn tactile-btn-navy text-xs py-2.5 px-5 flex items-center gap-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="md:hidden p-2 rounded-xl bg-white border border-slate-200 text-brand-navy shadow-tactile active:translate-y-[2px]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-outfit font-bold text-base py-2.5 px-4 rounded-xl transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-slate-100 text-brand-navy border border-slate-200"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />}
                      {link.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-100">
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="tactile-btn tactile-btn-cyan text-sm py-3 text-center w-full"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

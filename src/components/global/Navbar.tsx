"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NexoraLogo from "./NexoraLogo";
import ThemeToggle from "@/components/theme/ThemeToggle";

export interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check scroll position for header glassmorphic background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Home and nav clicks
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (item.href === "/") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nexora_skip_intro_trigger", "true");
      }
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (item.href === "/") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nexora_skip_intro_trigger", "true");
      }
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 180);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("nexora_skip_intro_trigger", "true");
    }
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Helper to determine if an item is active
  const isItemActive = (item: NavItem): boolean => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-white/95 dark:bg-[#000B2B]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-[#002277] shadow-sm py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center focus:outline-none"
        >
          <NexoraLogo showText={true} size="md" variant="auto" />
        </Link>

        {/* Center: Desktop Navigation Bar with Spring Active Pill */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-[#00144A]/90 border border-slate-200/80 dark:border-[#002277] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = isItemActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold font-jakarta rounded-full transition-colors duration-200 cursor-pointer select-none ${
                  isActive
                    ? "text-[#00144A] dark:text-white font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#00144A] dark:hover:text-[#00D2FF]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white dark:bg-[#002277] shadow-sm border border-slate-200 dark:border-[#00D2FF]/30 -z-0"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                  )}
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className="tactile-btn tactile-btn-navy text-xs py-2.5 px-5 flex items-center gap-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2.5 rounded-xl bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] text-[#00144A] dark:text-white shadow-tactile active:translate-y-[2px] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Tablet Menu Toggle */}
        <div className="hidden sm:flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2.5 rounded-xl bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] text-[#00144A] dark:text-white shadow-tactile active:translate-y-[2px] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Smoothly increases header height downwards) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.32,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="lg:hidden overflow-hidden border-t border-slate-200/60 dark:border-[#002277] mt-3"
          >
            <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 flex flex-col gap-2 bg-white/95 dark:bg-[#000B2B]/95 backdrop-blur-md">
              {navItems.map((item, idx) => {
                const isActive = isItemActive(item);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.035, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleMobileNavClick(e, item)}
                      className={`font-outfit font-bold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-slate-100 dark:bg-[#00144A] text-[#00144A] dark:text-white border border-slate-200 dark:border-[#002277] shadow-sm"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#00144A]/60 hover:text-[#00144A] dark:hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                        )}
                        {item.name}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isActive
                            ? "text-[#0099BE] translate-x-0.5"
                            : "text-slate-400"
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.035, duration: 0.2 }}
                className="pt-3 mt-1 border-t border-slate-100 dark:border-[#002277]"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="tactile-btn tactile-btn-cyan text-xs py-3 text-center w-full block"
                >
                  Schedule Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

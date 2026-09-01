"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] ${className}`} />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    if (theme === "light") {
      return <Sun className="w-4 h-4 text-amber-500 transition-transform rotate-0 scale-100" />;
    }
    if (theme === "dark") {
      return <Moon className="w-4 h-4 text-[#00D2FF] transition-transform rotate-0 scale-100" />;
    }
    return <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-300" />;
  };

  const getThemeLabel = () => {
    if (theme === "light") return "Light Theme";
    if (theme === "dark") return "Dark Theme";
    return "System Theme";
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ y: 2 }}
        onClick={cycleTheme}
        type="button"
        className={`relative p-2.5 rounded-xl bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] text-slate-700 dark:text-white shadow-tactile dark:shadow-tactile-dark transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] ${className}`}
        aria-label={`Switch Theme. Current: ${getThemeLabel()}`}
        title={`Current: ${getThemeLabel()} (Click to toggle)`}
      >
        {getThemeIcon()}
      </motion.button>
    </div>
  );
};

export default ThemeToggle;

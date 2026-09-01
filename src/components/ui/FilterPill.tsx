"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
  className?: string;
}

export const FilterPill: React.FC<FilterPillProps> = ({
  label,
  isActive,
  onClick,
  count,
  className,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ y: 2 }}
      className={cn(
        "relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-jakarta whitespace-nowrap overflow-hidden transition-all duration-200 cursor-pointer select-none focus:outline-none",
        isActive
          ? "bg-[#00144A] text-white dark:bg-[#001c4d] border border-[#00144A] dark:border-[#00D2FF]/40 shadow-tactile dark:shadow-tactile-dark"
          : "bg-white text-[#00144A] dark:bg-[#001133] dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-[#00144A] dark:hover:text-white",
        className
      )}
    >
      {/* 0.5-second Bright White/Cyan Line Sweep Flash Animation on Activation */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            key="flash-sweep"
            initial={{ x: "-100%", opacity: 0.9 }}
            animate={{ x: "200%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 dark:via-[#00D2FF]/80 to-transparent pointer-events-none -skew-x-12 z-20"
          />
        )}
      </AnimatePresence>

      {/* Active State Cyan Dot Indicator */}
      {isActive && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="w-2 h-2 rounded-full bg-[#00D2FF] flex-shrink-0 z-10"
        />
      )}

      {/* Label Text */}
      <span className="relative z-10">{label}</span>

      {/* Optional Count Tag */}
      {typeof count === "number" && (
        <span
          className={cn(
            "relative z-10 px-1.5 py-0.5 rounded-md text-[10px] font-mono leading-none",
            isActive
              ? "bg-white/20 text-[#00D2FF]"
              : "bg-slate-100 dark:bg-[#000517] text-slate-500 dark:text-slate-400"
          )}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
};

export default FilterPill;

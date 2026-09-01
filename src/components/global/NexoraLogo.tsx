"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NexoraLogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "auto";
  className?: string;
  animated?: boolean;
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({
  showText = true,
  size = "md",
  variant = "auto",
  className,
  animated = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimension mapping for the emblem badge and typography lockup
  const sizeMap = {
    sm: {
      badge: "w-8 h-8 rounded-lg p-1",
      img: 20,
      title: "text-sm sm:text-base",
      subtitle: "text-[8px] tracking-[0.18em]",
      gap: "gap-2",
    },
    md: {
      badge: "w-10 h-10 rounded-xl p-1.5",
      img: 26,
      title: "text-lg sm:text-xl",
      subtitle: "text-[9px] sm:text-[10px] tracking-[0.2em]",
      gap: "gap-2.5",
    },
    lg: {
      badge: "w-12 h-12 rounded-2xl p-2",
      img: 32,
      title: "text-2xl",
      subtitle: "text-xs tracking-[0.22em]",
      gap: "gap-3",
    },
    xl: {
      badge: "w-16 h-16 rounded-2xl p-2.5",
      img: 42,
      title: "text-3xl sm:text-4xl",
      subtitle: "text-sm tracking-[0.25em]",
      gap: "gap-3.5",
    },
  };

  const currentSize = sizeMap[size];

  // Dynamic text coloring based on variant & dark mode support
  let titleColor = "text-[#00144A] dark:text-white";
  let subtitleColor = "text-slate-600 dark:text-slate-300";

  if (variant === "dark") {
    titleColor = "text-white";
    subtitleColor = "text-slate-300";
  } else if (variant === "light") {
    titleColor = "text-[#00144A]";
    subtitleColor = "text-slate-700";
  }

  const content = (
    <div
      className={cn(
        "inline-flex items-center select-none group cursor-pointer",
        currentSize.gap,
        className
      )}
    >
      {/* Emblem Badge with Navy Brand Background for contrast */}
      <div
        className={cn(
          "relative flex items-center justify-center bg-[#00144A] border border-[#00D2FF]/40 shadow-[0_3px_0_#000B2B] dark:border-[#00D2FF]/60 dark:shadow-[0_0_14px_rgba(0,210,255,0.35)] transition-all duration-200 group-hover:border-[#00D2FF] group-hover:shadow-[0_0_16px_rgba(0,210,255,0.5)] flex-shrink-0 overflow-hidden",
          currentSize.badge
        )}
      >
        {/* Subtle ambient cyan glow inside badge */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D2FF]/25 via-transparent to-transparent opacity-70 pointer-events-none" />

        {!imageError ? (
          <Image
            src="/Nexora.png"
            alt="Nexora Logo Emblem"
            width={currentSize.img}
            height={currentSize.img}
            className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-110"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <span className="font-outfit font-black text-white text-sm sm:text-base">
            N
          </span>
        )}
      </div>

      {/* Brand Typography: "Nexora Creations" on line 1 and right-aligned "GROUP" on line 2 */}
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span
            className={cn(
              "font-outfit font-extrabold tracking-tight leading-tight transition-colors duration-200 group-hover:text-[#00D2FF]",
              currentSize.title,
              titleColor
            )}
          >
            Nexora Creations
          </span>
          <span
            className={cn(
              "font-outfit font-bold uppercase text-right mt-0.5 leading-none transition-colors duration-200 group-hover:text-[#00D2FF]",
              currentSize.subtitle,
              subtitleColor
            )}
          >
            GROUP
          </span>
        </div>
      )}
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className="inline-flex"
    >
      {content}
    </motion.div>
  );
};

export default NexoraLogo;

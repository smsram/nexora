"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  badge?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  variant?: "white" | "navy" | "cyan" | "dark";
  className?: string;
}

export const TactileCard: React.FC<TactileCardProps> = ({
  children,
  badge,
  icon,
  title,
  description,
  variant = "white",
  className,
  ...props
}) => {
  const variantStyles = {
    white:
      "bg-white dark:bg-[#001133] border-slate-200 dark:border-slate-800 text-[#00144A] dark:text-white shadow-tactile dark:shadow-tactile-dark",
    navy:
      "bg-[#00144A] dark:bg-[#001133] border-[#002277] dark:border-slate-800 text-white shadow-tactile dark:shadow-tactile-dark",
    cyan:
      "bg-[#F0FBFF] dark:bg-[#001133] border-[#BCEBFA] dark:border-slate-800 text-[#00144A] dark:text-white shadow-tactile dark:shadow-tactile-dark",
    dark:
      "bg-[#000B2B] dark:bg-[#001133] border-slate-800 text-white shadow-tactile dark:shadow-tactile-dark",
  };

  return (
    <div
      className={cn(
        "tactile-card group relative p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Decorative subtle top keycap highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 dark:via-cyan-400/40 to-transparent opacity-60 pointer-events-none" />

      {/* Card Header Content if passed */}
      {(icon || badge || title) && (
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            {icon && (
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200/90 dark:border-slate-800 flex items-center justify-center text-[#00144A] dark:text-white group-hover:bg-[#00D2FF]/15 group-hover:text-[#0099BE] group-hover:border-[#00D2FF]/40 transition-all duration-200">
                {icon}
              </div>
            )}
            {badge && (
              <span className="tactile-key-pill uppercase tracking-wider text-[10px]">
                {badge}
              </span>
            )}
          </div>

          {title && (
            <h3 className="font-outfit text-xl font-bold tracking-tight mb-2 text-[#00144A] dark:text-white group-hover:text-[#00D2FF] transition-colors duration-200">
              {title}
            </h3>
          )}

          {description && (
            <p className="font-jakarta text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Additional child contents */}
      {children}
    </div>
  );
};

export default TactileCard;

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import LikeButton from "./LikeButton";

export interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  badge?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  showLikeButton?: boolean;
  initialLikes?: number;
  variant?: "white" | "navy" | "cyan" | "dark";
  className?: string;
}

export const TactileCard: React.FC<TactileCardProps> = ({
  children,
  badge,
  icon,
  title,
  description,
  showLikeButton = true,
  initialLikes = 18,
  variant = "white",
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    white: "bg-white border-slate-200 text-brand-navy shadow-tactile",
    navy: "bg-[#00144A] border-[#002277] text-white shadow-tactile",
    cyan: "bg-[#F0FBFF] border-[#BCEBFA] text-brand-navy shadow-tactile",
    dark: "bg-[#000B2B] border-slate-800 text-white shadow-tactile",
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "tactile-card group relative p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Interactive Heart / Like Button in corner */}
      {showLikeButton && (
        <LikeButton
          initialCount={initialLikes}
          isCardHovered={isHovered}
        />
      )}

      {/* Decorative subtle top keycap highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-60 pointer-events-none" />

      {/* Card Header Content if passed */}
      {(icon || badge || title) && (
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            {icon && (
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-brand-navy group-hover:bg-[#00D2FF]/15 group-hover:text-[#0099BE] group-hover:border-[#00D2FF]/40 transition-all duration-200">
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
            <h3 className="font-outfit text-xl font-bold tracking-tight mb-2 group-hover:text-[#0099BE] transition-colors duration-200">
              {title}
            </h3>
          )}

          {description && (
            <p className="font-jakarta text-sm text-slate-600 leading-relaxed">
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

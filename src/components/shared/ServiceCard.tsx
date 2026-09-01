"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  TrendingUp,
  Search,
  Share2,
  Target,
  Palette,
  Layers,
  ArrowRight,
  Heart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceItem;
  onClick?: () => void;
  href?: string;
  isLiked?: boolean;
  onToggleLike?: (e: React.MouseEvent) => void;
  showCheckpoints?: boolean;
  className?: string;
}

export const getServiceIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case "Code2":
      return <Code2 className={cn(className, "text-[#00D2FF]")} />;
    case "TrendingUp":
      return <TrendingUp className={cn(className, "text-[#00D2FF]")} />;
    case "Search":
      return <Search className={cn(className, "text-emerald-400")} />;
    case "Palette":
      return <Palette className={cn(className, "text-[#FF4B72]")} />;
    case "Target":
      return <Target className={cn(className, "text-indigo-400")} />;
    case "Share2":
      return <Share2 className={cn(className, "text-amber-400")} />;
    case "Layers":
      return <Layers className={cn(className, "text-[#00D2FF]")} />;
    default:
      return <Sparkles className={cn(className, "text-[#00D2FF]")} />;
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onClick,
  href,
  isLiked: externalIsLiked,
  onToggleLike,
  showCheckpoints = true,
  className,
}) => {
  const [internalLiked, setInternalLiked] = useState(false);
  const isLiked = externalIsLiked !== undefined ? externalIsLiked : internalLiked;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onToggleLike) {
      onToggleLike(e);
    } else {
      setInternalLiked(!internalLiked);
    }
  };

  const cardContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Top Section */}
      <div>
        {/* Top Header: Custom Icon Badge on Left, Category Pill & Like Heart on Right */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#000517] dark:bg-[#000517] border border-slate-800 flex items-center justify-center shadow-sm group-hover:border-[#00D2FF]/50 transition-colors">
            {getServiceIcon(service.iconName)}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#000517] text-[#00D2FF] border border-slate-800 shadow-sm">
              {service.category}
            </span>

            <button
              onClick={handleLike}
              type="button"
              className="p-2 rounded-xl bg-[#000517] border border-slate-800 text-slate-400 hover:text-[#FF4B72] hover:border-[#FF4B72]/40 transition-all focus:outline-none cursor-pointer"
              aria-label="Bookmark service"
            >
              <Heart
                className={cn(
                  "w-3.5 h-3.5 transition-transform active:scale-125",
                  isLiked ? "fill-[#FF4B72] text-[#FF4B72] scale-110" : "text-slate-400"
                )}
              />
            </button>
          </div>
        </div>

        {/* Body: Bold Title & Concise Description */}
        <h3 className="font-outfit text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-[#00D2FF] transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="font-jakarta text-slate-300 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Checkpoints: Clean Vertical List with Electric Cyan Checkmarks */}
        {showCheckpoints && service.checkpoints && service.checkpoints.length > 0 && (
          <div className="space-y-2.5 mb-6 pt-3 pb-1 border-t border-slate-800/80">
            {service.checkpoints.map((checkpoint, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs font-jakarta text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#00D2FF] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{checkpoint}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action: Tactile Action Trigger */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-jakarta">
          {service.techStack?.[0] ? `${service.techStack.length} Integrated Specs` : "Architecture"}
        </span>

        <div className="flex items-center gap-1.5 text-xs font-bold text-[#00D2FF] group-hover:translate-x-1 transition-transform">
          <span>Inspect Specs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );

  const containerClasses = cn(
    "group relative bg-[#001133] dark:bg-[#000F2E] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-tactile dark:shadow-tactile-dark hover:shadow-tactile-hover hover:border-slate-700 transition-all duration-200 cursor-pointer select-none text-white",
    className
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        <motion.div
          layoutId={`service-card-${service.id}`}
          whileHover={{ y: -4 }}
          whileTap={{ y: 1 }}
          className={containerClasses}
        >
          {cardContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      layoutId={`service-card-${service.id}`}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ y: 1 }}
      className={containerClasses}
    >
      {cardContent}
    </motion.div>
  );
};

export default ServiceCard;

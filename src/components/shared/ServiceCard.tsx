"use client";

import React from "react";
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
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  service: ServiceItem;
  onClick?: () => void;
  href?: string;
  showCheckpoints?: boolean;
  showTags?: boolean;
  className?: string;
}

export const getServiceIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case "Code2":
      return <Code2 className={cn(className, "text-cyan-600 dark:text-[#00D2FF]")} />;
    case "TrendingUp":
      return <TrendingUp className={cn(className, "text-cyan-600 dark:text-[#00D2FF]")} />;
    case "Search":
      return <Search className={cn(className, "text-emerald-500 dark:text-emerald-400")} />;
    case "Palette":
      return <Palette className={cn(className, "text-[#FF4B72]")} />;
    case "Target":
      return <Target className={cn(className, "text-indigo-500 dark:text-indigo-400")} />;
    case "Share2":
      return <Share2 className={cn(className, "text-amber-500 dark:text-amber-400")} />;
    case "Layers":
      return <Layers className={cn(className, "text-cyan-600 dark:text-[#00D2FF]")} />;
    default:
      return <Sparkles className={cn(className, "text-cyan-600 dark:text-[#00D2FF]")} />;
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onClick,
  href,
  showCheckpoints = true,
  showTags = true,
  className,
}) => {
  const cardContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Top Section */}
      <div>
        {/* Top Header: Custom Icon Badge on Left, Category Pill on Right */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#00144A] text-[#00144A] dark:text-[#00D2FF] border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:border-[#00D2FF]/50 transition-colors">
            {getServiceIcon(service.iconName)}
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#00144A] text-[#00144A] dark:text-[#00D2FF] border border-slate-200 dark:border-[#002277] shadow-sm">
            {service.category}
          </span>
        </div>

        {/* Body: Bold Title & Concise Description */}
        <h3 className="font-outfit text-xl font-bold text-[#00144A] dark:text-white tracking-tight mb-2.5 group-hover:text-[#00D2FF] transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="font-jakarta text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Checkpoints: Clean Vertical List with Cyan Checkmarks */}
        {showCheckpoints && service.checkpoints && service.checkpoints.length > 0 && (
          <div className="space-y-2.5 mb-5 pt-3 pb-1 border-t border-slate-100 dark:border-slate-800/80">
            {service.checkpoints.map((checkpoint, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs font-jakarta text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-[#00D2FF] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{checkpoint}</span>
              </div>
            ))}
          </div>
        )}

        {/* Strategy / Tech Tags */}
        {showTags && service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {service.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-jakarta text-[10px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action: Tactile Action Trigger */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
        <div>
          {service.keyMetricValue ? (
            <div>
              <div className="font-outfit text-lg font-black text-[#00144A] dark:text-white">
                {service.keyMetricValue}
              </div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                {service.keyMetricLabel || "Benchmark"}
              </div>
            </div>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-jakarta">
              {service.techStack?.[0] ? `${service.techStack.length} Integrated Specs` : "Architecture"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-[#00144A] hover:text-cyan-600 dark:text-[#00D2FF] dark:hover:text-white group-hover:translate-x-1 transition-all">
          <span>Inspect Specs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );

  const containerClasses = cn(
    "group relative bg-white dark:bg-[#000F2E] text-[#00144A] dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-[#00144A]/30 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer select-none",
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

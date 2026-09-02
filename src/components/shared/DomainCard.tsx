"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  Stethoscope,
  Cloud,
  ShoppingBag,
  Building2,
  Building,
  Sparkles,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Target,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { DomainItem } from "@/data/domainsData";
import { cn } from "@/lib/utils";

export interface DomainCardProps {
  domain: DomainItem;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  showAction?: boolean;
}

export const getDomainIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case "CreditCard":
      return <CreditCard className={cn(className, "text-[#00144A] dark:text-[#00D2FF]")} />;
    case "Stethoscope":
      return <Stethoscope className={cn(className, "text-emerald-600 dark:text-emerald-400")} />;
    case "Cloud":
      return <Cloud className={cn(className, "text-[#0099BE] dark:text-[#00D2FF]")} />;
    case "ShoppingBag":
      return <ShoppingBag className={cn(className, "text-[#FF4B72]")} />;
    case "Building2":
    case "Building":
      return <Building2 className={cn(className, "text-amber-600 dark:text-amber-400")} />;
    case "Sparkles":
      return <Sparkles className={cn(className, "text-purple-600 dark:text-purple-400")} />;
    case "ShieldCheck":
      return <ShieldCheck className={cn(className, "text-cyan-600 dark:text-[#00D2FF]")} />;
    case "Zap":
      return <Zap className={cn(className, "text-yellow-500 dark:text-yellow-400")} />;
    case "Cpu":
      return <Cpu className={cn(className, "text-indigo-500 dark:text-indigo-400")} />;
    case "Layers":
      return <Layers className={cn(className, "text-[#0099BE] dark:text-[#00D2FF]")} />;
    case "Target":
      return <Target className={cn(className, "text-rose-500 dark:text-rose-400")} />;
    case "TrendingUp":
      return <TrendingUp className={cn(className, "text-[#00D2FF]")} />;
    default:
      return <Sparkles className={cn(className, "text-[#0099BE] dark:text-[#00D2FF]")} />;
  }
};

export const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  onClick,
  isActive = false,
  className,
  showAction = true,
}) => {
  const cardContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Top Header: Icon on Left, Domain Badge on Right */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#00144A] text-[#00144A] dark:text-[#00D2FF] border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:border-[#00D2FF]/50 transition-colors">
            {getDomainIcon(domain.iconName)}
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#00144A] text-[#00144A] dark:text-[#00D2FF] border border-slate-200 dark:border-[#002277] shadow-sm">
            {domain.badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-outfit text-xl font-bold text-[#00144A] dark:text-white tracking-tight mb-2.5 group-hover:text-[#00D2FF] transition-colors leading-snug">
          {domain.title}
        </h3>
        <p className="font-jakarta text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
          {domain.description}
        </p>
      </div>

      {/* Bottom Metric & Action */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5">
          <span className="font-outfit text-xs font-bold text-[#0099BE] dark:text-[#00D2FF]">
            {domain.highlightMetric}
          </span>
        </div>

        {showAction && (
          <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-[#00144A] dark:group-hover:text-white transition-colors">
            <span className="text-[11px] font-jakarta">Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </div>
  );

  const containerClasses = cn(
    "group relative bg-white dark:bg-[#000F2E] text-[#00144A] dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-[#00144A]/30 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer select-none",
    isActive ? "ring-2 ring-[#00D2FF] border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.2)]" : "",
    className
  );

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ y: 1 }}
      onClick={onClick}
      className={containerClasses}
    >
      {cardContent}
    </motion.div>
  );
};

export default DomainCard;

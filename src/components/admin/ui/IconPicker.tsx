"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Cpu,
  Globe,
  Layers,
  Database,
  Server,
  GitBranch,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Megaphone,
  Zap,
  Share2,
  Search,
  FileSearch,
  Compass,
  Scan,
  Palette,
  Sparkles,
  Brush,
  LayoutGrid,
  Shapes,
  Feather,
  CreditCard,
  Stethoscope,
  Cloud,
  ShoppingBag,
  Building2,
  Gem,
  ShieldCheck,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

export interface IconDefinition {
  name: string;
  label: string;
  category: "Engineering" | "Growth" | "Search" | "Creative" | "Domains";
  icon: React.ReactNode;
}

export const curatedIconsList: IconDefinition[] = [
  // Engineering & Dev
  { name: "Code2", label: "Web Code", category: "Engineering", icon: <Code2 className="w-4 h-4" /> },
  { name: "Terminal", label: "CLI / Terminal", category: "Engineering", icon: <Terminal className="w-4 h-4" /> },
  { name: "Cpu", label: "Compute / AI", category: "Engineering", icon: <Cpu className="w-4 h-4" /> },
  { name: "Globe", label: "Web Global", category: "Engineering", icon: <Globe className="w-4 h-4" /> },
  { name: "Layers", label: "Architecture", category: "Engineering", icon: <Layers className="w-4 h-4" /> },
  { name: "Database", label: "Database / Store", category: "Engineering", icon: <Database className="w-4 h-4" /> },
  { name: "Server", label: "Server / Backend", category: "Engineering", icon: <Server className="w-4 h-4" /> },
  { name: "GitBranch", label: "CI/CD / Git", category: "Engineering", icon: <GitBranch className="w-4 h-4" /> },

  // Growth & Marketing
  { name: "TrendingUp", label: "Growth / ROAS", category: "Growth", icon: <TrendingUp className="w-4 h-4" /> },
  { name: "BarChart3", label: "Analytics / Metrics", category: "Growth", icon: <BarChart3 className="w-4 h-4" /> },
  { name: "PieChart", label: "Attribution", category: "Growth", icon: <PieChart className="w-4 h-4" /> },
  { name: "Target", label: "CRO / Strategy", category: "Growth", icon: <Target className="w-4 h-4" /> },
  { name: "Megaphone", label: "Paid Ads", category: "Growth", icon: <Megaphone className="w-4 h-4" /> },
  { name: "Zap", label: "Velocity / Power", category: "Growth", icon: <Zap className="w-4 h-4" /> },
  { name: "Share2", label: "Viral / Social", category: "Growth", icon: <Share2 className="w-4 h-4" /> },

  // Search & SEO
  { name: "Search", label: "SEO / Search", category: "Search", icon: <Search className="w-4 h-4" /> },
  { name: "FileSearch", label: "Content Audit", category: "Search", icon: <FileSearch className="w-4 h-4" /> },
  { name: "Compass", label: "Discovery / Path", category: "Search", icon: <Compass className="w-4 h-4" /> },
  { name: "Scan", label: "Crawler / Index", category: "Search", icon: <Scan className="w-4 h-4" /> },

  // Creative & UI
  { name: "Palette", label: "Design / UI", category: "Creative", icon: <Palette className="w-4 h-4" /> },
  { name: "Sparkles", label: "Bespoke / Motion", category: "Creative", icon: <Sparkles className="w-4 h-4" /> },
  { name: "Brush", label: "Creative Art", category: "Creative", icon: <Brush className="w-4 h-4" /> },
  { name: "LayoutGrid", label: "Grid / Systems", category: "Creative", icon: <LayoutGrid className="w-4 h-4" /> },
  { name: "Shapes", label: "Design Tokens", category: "Creative", icon: <Shapes className="w-4 h-4" /> },
  { name: "Feather", label: "Editorial", category: "Creative", icon: <Feather className="w-4 h-4" /> },

  // Domains & Industry
  { name: "CreditCard", label: "FinTech / Banking", category: "Domains", icon: <CreditCard className="w-4 h-4" /> },
  { name: "Stethoscope", label: "Health / Medical", category: "Domains", icon: <Stethoscope className="w-4 h-4" /> },
  { name: "Cloud", label: "SaaS / Cloud", category: "Domains", icon: <Cloud className="w-4 h-4" /> },
  { name: "ShoppingBag", label: "E-Commerce / D2C", category: "Domains", icon: <ShoppingBag className="w-4 h-4" /> },
  { name: "Building2", label: "PropTech / Assets", category: "Domains", icon: <Building2 className="w-4 h-4" /> },
  { name: "Gem", label: "Luxury / Brand", category: "Domains", icon: <Gem className="w-4 h-4" /> },
  { name: "ShieldCheck", label: "Security / SLA", category: "Domains", icon: <ShieldCheck className="w-4 h-4" /> },
];

export interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
  className?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  label = "Select Icon Identifier",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedIcon = curatedIconsList.find((i) => i.name === value) || curatedIconsList[0];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleDocumentClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredIcons = curatedIconsList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Engineering", "Growth", "Search", "Creative", "Domains"];

  return (
    <div className={`space-y-1.5 relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] hover:bg-slate-100 dark:hover:bg-[#00081C] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white flex items-center justify-between gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00D2FF] cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-7 h-7 rounded-lg bg-[#00144A] text-[#00D2FF] flex items-center justify-center border border-[#00D2FF]/30 flex-shrink-0">
            {selectedIcon.icon}
          </div>
          <div className="text-left truncate">
            <span className="font-bold text-xs block truncate">{selectedIcon.label}</span>
            <span className="text-[10px] text-slate-400 font-mono leading-none block">{selectedIcon.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-[#001133] text-slate-600 dark:text-[#00D2FF]">
            {selectedIcon.category}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#0099BE] dark:text-[#00D2FF]" : ""
            }`}
          />
        </div>
      </button>

      {/* Popover Selection Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 p-3.5 rounded-2xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3 max-w-full"
          >
            {/* Search Input & Reset */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search icons (e.g. Code, Banking, Growth)..."
                  className="w-full pl-8 pr-7 py-2 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#000517]"
                      : "bg-slate-100 dark:bg-[#000517] text-slate-500 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1 scrollbar-none">
              {filteredIcons.map((item) => {
                const isSelected = item.name === value;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      onChange(item.name);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#00144A] text-[#00D2FF] border-[#00D2FF] shadow-tactile scale-[1.02] font-bold"
                        : "bg-slate-50 dark:bg-[#000517] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-medium text-center truncate w-full">
                      {item.label}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-mono text-[#00D2FF] flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> Selected
                      </span>
                    )}
                  </button>
                );
              })}

              {filteredIcons.length === 0 && (
                <div className="col-span-4 text-center py-6 text-xs text-slate-400">
                  No icons found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IconPicker;

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { getServiceIcon } from "@/components/shared/ServiceCard";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
}) => {
  // Lock body scroll while modal is open & listen for Escape key
  useEffect(() => {
    if (!service) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000B2B]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card with layoutId for smooth morphing */}
          <motion.div
            layoutId={`service-card-${service.id}`}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#000F2E] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto z-10 text-[#00144A] dark:text-white flex flex-col"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 bg-white/95 dark:bg-[#000F2E]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  {getServiceIcon(service.iconName, "w-4 h-4")}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#000517] text-[#0099BE] dark:text-[#00D2FF] border border-slate-200 dark:border-slate-800">
                  {service.category}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Enterprise SLA
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-full bg-slate-100 dark:bg-[#000517] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D2FF] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 md:p-10 space-y-8 flex-1">
              {/* Title & Overview Banner */}
              <div className="space-y-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-black text-[#00144A] dark:text-white tracking-tight">
                  {service.title}
                </h2>
                <p className="font-jakarta text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                  {service.description}
                </p>

                {/* Checkpoints Highlights */}
                {service.checkpoints && service.checkpoints.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {service.checkpoints.map((cp, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs font-bold text-[#00144A] dark:text-slate-200 font-jakarta"
                      >
                        <Check className="w-3.5 h-3.5 text-[#00D2FF]" />
                        {cp}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid: Deliverables Checklist */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#0099BE] dark:text-[#00D2FF]" />
                  <h3 className="font-outfit text-xl font-bold text-[#00144A] dark:text-white">
                    Deliverables & Technical Specifications
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-[#000517] border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#00D2FF] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-outfit font-bold text-sm text-[#00144A] dark:text-white mb-1.5">
                          {item.title}
                        </h4>
                        <p className="font-jakarta text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Tooling Chips */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-5 h-5 text-[#0099BE] dark:text-[#00D2FF]" />
                  <h3 className="font-outfit text-lg font-bold text-[#00144A] dark:text-white">
                    Integrated Technologies & Frameworks
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTA */}
            <div className="sticky bottom-0 px-6 sm:px-8 py-5 bg-white dark:bg-[#000F2E] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  Next Available Deployment Slot
                </span>
                <span className="font-outfit font-bold text-sm text-[#00144A] dark:text-white">
                  Starting within 5 Business Days
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  type="button"
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#000517] transition-colors cursor-pointer"
                >
                  Close View
                </button>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  onClick={onClose}
                  className="w-1/2 sm:w-auto tactile-btn tactile-btn-cyan text-xs py-2.5 px-6 flex items-center justify-center gap-2"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;

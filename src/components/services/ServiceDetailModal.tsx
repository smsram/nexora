"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Cpu,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export interface ServiceTimelinePhase {
  phase: string;
  duration: string;
  outcome: string;
}

export interface ServiceDeliverable {
  title: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  metric: string;
  metricLabel: string;
  iconName: string;
  deliverables: ServiceDeliverable[];
  techStack: string[];
  timeline: ServiceTimelinePhase[];
  typicalRoi: string;
}

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
            className="fixed inset-0 bg-[#000B2B]/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card with layoutId for smooth morphing */}
          <motion.div
            layoutId={`service-card-${service.id}`}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-y-auto z-10 text-[#00144A] flex flex-col"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 bg-white/95 backdrop-blur-md border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200">
                  {service.category}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Enterprise SLA
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-brand-navy transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 md:p-10 space-y-8 flex-1">
              
              {/* Title & Overview Banner */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="max-w-2xl">
                  <h2 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-black text-[#00144A] tracking-tight mb-3">
                    {service.title}
                  </h2>
                  <p className="font-jakarta text-slate-600 text-base sm:text-lg leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Primary Metric Pill */}
                <div className="flex-shrink-0 p-5 rounded-2xl bg-[#00144A] text-white border border-[#00D2FF]/40 shadow-tactile min-w-[200px] text-center">
                  <div className="font-outfit text-3xl font-black text-[#00D2FF] mb-1">
                    {service.metric}
                  </div>
                  <div className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                    {service.metricLabel}
                  </div>
                </div>
              </div>

              {/* Grid: Deliverables Checklist */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#0099BE]" />
                  <h3 className="font-outfit text-xl font-bold text-[#00144A]">
                    Key Deliverables & Architectural Specs
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-outfit font-bold text-sm text-[#00144A] mb-1">
                          {item.title}
                        </h4>
                        <p className="font-jakarta text-xs text-slate-600 leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Tooling Chips */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-5 h-5 text-[#0099BE]" />
                  <h3 className="font-outfit text-lg font-bold text-[#00144A]">
                    Engineered Tech Stack & Tooling
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Typical Timeline & Phased Milestone Roadmap */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#0099BE]" />
                  <h3 className="font-outfit text-lg font-bold text-[#00144A]">
                    Deployment Timeline & Typical ROI Surge
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {service.timeline.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative overflow-hidden"
                    >
                      <div className="text-[11px] font-bold text-[#0099BE] uppercase tracking-wider mb-1">
                        {phase.phase} • {phase.duration}
                      </div>
                      <div className="font-jakarta text-xs text-slate-700 font-medium">
                        {phase.outcome}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ROI Note */}
                <div className="mt-3 p-3.5 rounded-xl bg-cyan-50/60 border border-[#00D2FF]/30 flex items-center gap-3 text-xs text-[#00144A]">
                  <TrendingUp className="w-4 h-4 text-[#0099BE] flex-shrink-0" />
                  <span>
                    <strong className="font-bold">Projected ROI Benchmark:</strong>{" "}
                    {service.typicalRoi}
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Sticky Footer CTA */}
            <div className="sticky bottom-0 px-6 sm:px-8 py-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs text-slate-500 block">
                  Next Available Deployment Slot
                </span>
                <span className="font-outfit font-bold text-sm text-[#00144A]">
                  Starting within 5 Business Days
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  type="button"
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close View
                </button>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  onClick={onClose}
                  className="w-1/2 sm:w-auto tactile-btn tactile-btn-cyan text-xs py-2.5 px-6 flex items-center justify-center gap-2"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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

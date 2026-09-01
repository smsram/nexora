"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

export const GlobalLeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasPermanentlySubmitted = useRef<boolean>(false);

  // Clear any pending timer
  const clearActiveTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Schedule the 30-second re-trigger
  const scheduleRecurringTimer = () => {
    if (hasPermanentlySubmitted.current) return;
    clearActiveTimer();
    timerRef.current = setTimeout(() => {
      if (!hasPermanentlySubmitted.current) {
        setIsOpen(true);
      }
    }, 3000000);
  };

  // Initial 10-second trigger on mount (no localStorage check, resets on page refresh)
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!hasPermanentlySubmitted.current) {
        setIsOpen(true);
      }
    }, 10000);

    return () => {
      clearActiveTimer();
    };
  }, []);

  // Handle modal dismissal: closes and starts 30-second timer
  const handleDismiss = () => {
    setIsOpen(false);
    scheduleRecurringTimer();
  };

  // Handle form submission: permanently stops the timer for this session
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      hasPermanentlySubmitted.current = true;
      clearActiveTimer();

      // Automatically close success view after 2.5s
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }, 850);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-[#000517]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#001133] rounded-3xl p-6 sm:p-9 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 text-[#00144A] dark:text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]" />

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-[#000517] text-slate-500 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss modal"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-outfit text-2xl sm:text-3xl font-black">
                  Growth Blueprint En Route!
                </h3>
                <p className="font-jakarta text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-[#00144A] dark:text-[#00D2FF]">{fullName}</strong>. Our engineering leads have dispatched the 30-Point Audit to <strong className="text-[#00144A] dark:text-[#00D2FF]">{email}</strong>.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#000517] text-[#0099BE] border border-slate-200 dark:border-slate-800 mb-3 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Proprietary Architecture Audit
                  </span>
                  <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
                    Scale Your Revenue & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                      Outpace Competitors
                    </span>
                  </h2>
                  <p className="font-jakarta text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Receive our private 30-Point Next.js Web Architecture & High-ROAS Media Buying Checklist delivered straight to your inbox.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Marcus Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Hyperion AI Platforms"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full tactile-btn tactile-btn-cyan text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2 font-bold cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Dispatching Audit..." : "Grow My Business"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-3 px-1">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#0099BE]" />
                      Zero spam. Strict NDA.
                    </span>
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="hover:underline text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLeadModal;

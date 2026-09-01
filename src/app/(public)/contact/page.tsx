"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const serviceOptions = [
  "Web Architecture",
  "Paid Ads Scaling",
  "Algorithmic SEO",
  "Performance Social",
  "Brand Identity",
  "CRO Optimization",
];

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Web Architecture",
  ]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleCopyEmail = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText("growth@nexora.io");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000B2B] text-[#00144A] dark:text-white transition-colors duration-200">
      {/* Strategy Call Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="fixed inset-0 bg-[#000B2B]/75 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#00144A] rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-[#002277] z-10 text-[#00144A] dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#002277] mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0099BE]" />
                  <h3 className="font-outfit text-xl font-bold">
                    Book Architecture Discovery
                  </h3>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <p className="font-jakarta text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                Connect directly with our Lead Performance Architect for a 15-minute technical audit of your current stack and ad pipeline.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200 dark:border-[#002277] space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0099BE]" />
                    Session Duration:
                  </span>
                  <span className="font-bold text-[#00144A] dark:text-white">
                    15 Minutes (Google Meet)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Deliverable:
                  </span>
                  <span className="font-bold text-[#00144A] dark:text-white">
                    Live Architecture Teardown
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full tactile-btn tactile-btn-cyan text-xs py-3 px-6 flex items-center justify-center gap-2"
                >
                  <span>Open Interactive Calendar</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  type="button"
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-[#002277] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#000B2B] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-[#000B2B] dark:via-[#000B2B] dark:to-[#000B2B] border-b border-slate-200/80 dark:border-[#002277]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#00144A] text-[#0099BE] border border-slate-200 dark:border-[#002277] mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Accepting New Client Verticals for Q3/Q4
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] dark:text-white tracking-tight leading-[1.1] mb-6">
              Let&apos;s Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                High-Impact.
              </span>
            </h1>
            <p className="font-jakarta text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed">
              Whether you need a full-stack Next.js web application, a high-ROAS paid acquisition engine, or an enterprise SEO overhaul—our engineering leads respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Tactile 50/50 Split Bento Layout */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* Left Side: Conversion Inquiry Form (Streamlined: Budget selector removed) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] rounded-3xl p-7 sm:p-10 shadow-tactile dark:shadow-tactile-dark">
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="text-center py-16 px-4 space-y-5"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-outfit text-2xl sm:text-3xl font-black text-[#00144A] dark:text-white">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="font-jakarta text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#00144A] dark:text-[#00D2FF]">{fullName}</strong>. Our Lead Solutions Architect is reviewing your requirements and will reach out via <strong className="text-[#00144A] dark:text-[#00D2FF]">{email}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName("");
                    setEmail("");
                    setCompany("");
                    setMessage("");
                  }}
                  type="button"
                  className="tactile-btn tactile-btn-navy text-xs py-2.5 px-6"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-outfit text-2xl font-black text-[#00144A] dark:text-white mb-1">
                    Project Brief & Discovery
                  </h2>
                  <p className="font-jakarta text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Tell us about your company and project goals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Marcus Vance"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200 dark:border-[#002277] text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200 dark:border-[#002277] text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Hyperion AI Platforms"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200 dark:border-[#002277] text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Required Capabilities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-jakarta transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#00144A] shadow-sm border border-[#00144A] dark:border-[#00D2FF]"
                              : "bg-slate-50 dark:bg-[#000B2B] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#002277] hover:border-slate-300"
                          }`}
                        >
                          {isSelected && "✓ "}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Project Goals & Scope
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your objectives, existing tech stack, or target launch timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200 dark:border-[#002277] text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full tactile-btn tactile-btn-navy text-sm py-4 flex items-center justify-center gap-2 cursor-pointer font-bold disabled:opacity-50"
                >
                  <span>
                    {isSubmitting ? "Dispatching Brief..." : "Submit Project Brief"}
                  </span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* ========================================================================= */}
          {/* Right Side: Direct Channels & Office Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Strategy Call Card */}
            <div className="bg-[#00144A] dark:bg-[#00144A] text-white border border-[#00D2FF]/40 rounded-3xl p-7 shadow-tactile relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#00D2FF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                  Fast-Track Consultation
                </span>
              </div>

              <h3 className="font-outfit text-2xl font-bold tracking-tight mb-2">
                Need an immediate architectural evaluation?
              </h3>
              <p className="font-jakarta text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Skip the inquiry form and book a direct 15-minute Google Meet session with our technical team.
              </p>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                type="button"
                className="w-full tactile-btn tactile-btn-cyan text-xs py-3 px-6 flex items-center justify-center gap-2 font-bold cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 15-Min Strategy Call</span>
              </button>
            </div>

            {/* Direct Communication Channels */}
            <div className="bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] rounded-3xl p-7 shadow-tactile dark:shadow-tactile-dark space-y-5">
              <h3 className="font-outfit text-lg font-bold text-[#00144A] dark:text-white">
                Direct Communication Channels
              </h3>

              {/* Direct Email */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200/80 dark:border-[#002277] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] flex items-center justify-center text-[#0099BE] shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Direct Email
                    </div>
                    <div className="font-outfit font-bold text-xs sm:text-sm text-[#00144A] dark:text-white">
                      growth@nexora.io
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="p-2 rounded-lg bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] text-slate-500 dark:text-slate-300 hover:text-[#00144A] dark:hover:text-white text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer"
                  aria-label="Copy email"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {copiedEmail ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>

              {/* WhatsApp Instant Line */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200/80 dark:border-[#002277] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] flex items-center justify-center text-emerald-500 shadow-sm">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Instant WhatsApp
                    </div>
                    <div className="font-outfit font-bold text-xs sm:text-sm text-[#00144A] dark:text-white">
                      +1 (800) 840-NEXORA
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/18008406396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Physical Studio HQ */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000B2B] border border-slate-200/80 dark:border-[#002277] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#00144A] border border-slate-200 dark:border-[#002277] flex items-center justify-center text-[#0099BE] shadow-sm flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Studio Headquarters
                  </div>
                  <div className="font-jakarta text-xs text-slate-700 dark:text-slate-300">
                    Nexora Engineering Tower, 450 Innovation Way, Suite 800, Tech District
                  </div>
                </div>
              </div>
            </div>

            {/* Styled Navy Vector Map Card */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-[#00144A] via-[#002266] to-[#000B2B] text-white p-6 flex flex-col justify-between border border-slate-800 shadow-tactile">
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 backdrop-blur-md">
                  Active Innovation Node
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  37.7749° N, 122.4194° W
                </span>
              </div>

              <div className="relative z-10 flex items-center gap-3 my-auto">
                <div className="relative flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-[#00D2FF] animate-ping opacity-75" />
                  <span className="absolute w-3 h-3 rounded-full bg-[#00D2FF] shadow-[0_0_12px_#00D2FF]" />
                </div>
                <div>
                  <div className="font-outfit font-bold text-sm">
                    Global Engineering Center
                  </div>
                  <div className="text-[11px] text-slate-300">
                    24/7 Deployment & Monitoring Hub
                  </div>
                </div>
              </div>

              <div className="relative z-10 text-[10px] text-slate-400 border-t border-white/10 pt-2 flex items-center justify-between">
                <span>Enterprise SLA Guaranteed</span>
                <span className="text-emerald-400 font-bold">● Operational</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

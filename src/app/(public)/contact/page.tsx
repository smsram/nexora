"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const budgetOptions = [
  "$5k – $15k",
  "$15k – $35k",
  "$35k – $75k",
  "$75k+ Enterprise",
];

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
  const [selectedBudget, setSelectedBudget] = useState("$15k – $35k");
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
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Strategy Call Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 z-10 text-[#00144A]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0099BE]" />
                  <h3 className="font-outfit text-xl font-bold">
                    Book Architecture Discovery
                  </h3>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="font-jakarta text-slate-600 text-sm leading-relaxed mb-6">
                Connect directly with our Lead Performance Architect for a 15-minute technical audit of your current stack and ad pipeline.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0099BE]" />
                    Session Duration:
                  </span>
                  <span className="font-bold text-[#00144A]">15 Minutes (Google Meet)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Deliverable:
                  </span>
                  <span className="font-bold text-[#00144A]">Live Architecture Teardown</span>
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
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Accepting New Client Verticals for Q3/Q4
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] tracking-tight leading-[1.1] mb-6">
              Let&apos;s Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                High-Impact.
              </span>
            </h1>
            <p className="font-jakarta text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Whether you need a full-stack Next.js web application, a high-ROAS paid acquisition engine, or an enterprise SEO overhaul—our engineering leads respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Tactile 50/50 Split Bento Layout */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* Left Side (Direct Conversion Inquiry Form - 7 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-tactile">
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="text-center py-16 px-4 space-y-5"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-outfit text-2xl sm:text-3xl font-black text-[#00144A]">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="font-jakarta text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#00144A]">{fullName}</strong>. Our Lead Solutions Architect is reviewing your requirements and will reach out via <strong className="text-[#00144A]">{email}</strong> within 24 business hours.
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
                  <h2 className="font-outfit text-2xl font-black text-[#00144A] mb-1">
                    Project Brief & Discovery
                  </h2>
                  <p className="font-jakarta text-xs sm:text-sm text-slate-500">
                    Tell us about your company and project goals.
                  </p>
                </div>

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Marcus Vance"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00144A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00144A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Hyperion AI Platforms"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00144A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                </div>

                {/* Services Needed (Multi-Select Pills) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
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
                              ? "bg-[#00144A] text-white shadow-sm border border-[#00144A]"
                              : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {isSelected && "✓ "}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range (Single-Select Pills) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Project Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((opt) => {
                      const isSelected = selectedBudget === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedBudget(opt)}
                          className={`py-2 rounded-xl text-xs font-semibold font-jakarta text-center transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#00D2FF] text-[#00144A] font-bold shadow-sm border border-[#00D2FF]"
                              : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Scope / Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Project Goals & Scope
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your objectives, existing tech stack, or target launch timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00144A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] resize-none"
                  />
                </div>

                {/* Tactile Keycap Submit Button */}
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
          {/* Right Side (Direct Channels & Office Card - 5 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Strategy Call Card */}
            <div className="bg-[#00144A] text-white border border-[#00D2FF]/40 rounded-3xl p-7 shadow-tactile relative overflow-hidden">
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
            <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-tactile space-y-5">
              <h3 className="font-outfit text-lg font-bold text-[#00144A]">
                Direct Communication Channels
              </h3>

              {/* Direct Email */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0099BE] shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Direct Email
                    </div>
                    <div className="font-outfit font-bold text-xs sm:text-sm text-[#00144A]">
                      growth@nexora.io
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#00144A] text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer"
                  aria-label="Copy email"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {copiedEmail ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>

              {/* WhatsApp Instant Line */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-500 shadow-sm">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Instant WhatsApp
                    </div>
                    <div className="font-outfit font-bold text-xs sm:text-sm text-[#00144A]">
                      +1 (800) 840-NEXORA
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/18008406396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Physical Studio HQ */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0099BE] shadow-sm flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Studio Headquarters
                  </div>
                  <div className="font-jakarta text-xs text-slate-700">
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

              {/* Radar Beacon Ping Animation */}
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

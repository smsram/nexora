"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  CheckCircle2,
  ChevronRight,
  Mail,
  ArrowLeft,
  Sparkles,
  Server,
  UserCheck,
  AlertCircle,
  Menu,
} from "lucide-react";

interface TocSection {
  id: string;
  title: string;
}

const tocSections: TocSection[] = [
  { id: "data-collection", title: "1. Data Collection & Scope" },
  { id: "use-of-information", title: "2. Use of Information" },
  { id: "data-security", title: "3. Data Security & Storage" },
  { id: "user-rights", title: "4. User Rights & GDPR / CCPA" },
  { id: "third-party-integrations", title: "5. Integrations & Ad Pixels" },
  { id: "legal-contact", title: "6. Contact Legal Officer" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("data-collection");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = tocSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(tocSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocSections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header Strip */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-jakarta text-slate-500 mb-6">
            <Link href="/" className="hover:text-[#00144A] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Legal Governance</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0099BE] font-bold">Privacy Policy</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
                Security & Data Protection Framework
              </span>
              <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] tracking-tight leading-[1.1] mb-4">
                Privacy Architecture & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                  Data Governance
                </span>
              </h1>
              <p className="font-jakarta text-slate-600 text-base sm:text-lg leading-relaxed">
                How Nexora Creations GROUP collects, secures, encrypts, and processes client and visitor data in compliance with international privacy mandates.
              </p>
            </div>

            {/* Version & Date Metadata Pill */}
            <div className="flex-shrink-0 p-5 rounded-2xl bg-white border border-slate-200 shadow-tactile text-left sm:text-right min-w-[220px]">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Policy Telemetry
              </div>
              <div className="font-outfit text-lg font-black text-[#00144A]">
                Version 2.4 Active
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Effective: January 01, 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Table of Contents Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Sticky TOC Toggle */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            type="button"
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[#00144A] font-bold text-xs flex items-center justify-between shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Menu className="w-4 h-4 text-[#0099BE]" />
              <span>Table of Contents ({tocSections.length} Sections)</span>
            </span>
            <span className="text-[#0099BE]">
              {mobileTocOpen ? "Collapse" : "Expand"}
            </span>
          </button>

          {mobileTocOpen && (
            <div className="mt-2 p-4 rounded-2xl bg-white border border-slate-200 shadow-tactile space-y-1">
              {tocSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  type="button"
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold font-jakarta transition-all ${
                    activeSection === sec.id
                      ? "bg-[#00144A] text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* ========================================================================= */}
          {/* Desktop Sticky Sidebar TOC */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block w-1/4 sticky top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-tactile">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <FileText className="w-4 h-4 text-[#0099BE]" />
                <span className="font-outfit font-bold text-xs uppercase tracking-wider text-[#00144A]">
                  Contents
                </span>
              </div>

              <ul className="space-y-1.5">
                {tocSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        onClick={() => scrollToSection(sec.id)}
                        type="button"
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold font-jakarta transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isActive
                            ? "bg-[#00144A] text-white shadow-sm font-bold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-[#00144A]"
                        }`}
                      >
                        <span className="truncate">{sec.title}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] flex-shrink-0" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Contact Legal Card */}
            <div className="p-6 rounded-3xl bg-[#00144A] text-white border border-[#00D2FF]/30 shadow-tactile space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00D2FF]">
                <Lock className="w-3.5 h-3.5" />
                <span>Privacy Officer</span>
              </div>
              <p className="font-jakarta text-xs text-slate-300 leading-relaxed">
                Have specific data inquiry or CCPA/GDPR compliance questions?
              </p>
              <a
                href="mailto:legal@nexoracreations.com"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#00D2FF] hover:underline"
              >
                <span>legal@nexoracreations.com</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* Main Editorial Content Card */}
          {/* ========================================================================= */}
          <main className="w-full lg:w-3/4 bg-[#FAFBFD] border border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-tactile space-y-12 text-[#00144A]">
            {/* Section 1 */}
            <section id="data-collection" className="space-y-4 pt-2">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Section 01
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                1. Data Collection & Information Scope
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                Nexora Creations GROUP (&quot;Nexora&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates as a premier digital marketing, web engineering, and enterprise creative systems group. When you visit our website, submit discovery briefs, or engage our retainers, we collect information necessary to deliver our capabilities with maximum precision.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
                  <h3 className="font-outfit font-bold text-sm text-[#00144A] mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Directly Submitted Information
                  </h3>
                  <p className="font-jakarta text-xs text-slate-600 leading-relaxed">
                    Full name, work email address, company URL, project budget requirements, and custom brief parameters submitted via our contact forms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
                  <h3 className="font-outfit font-bold text-sm text-[#00144A] mb-1.5 flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#0099BE]" />
                    Automated Technical Telemetry
                  </h3>
                  <p className="font-jakarta text-xs text-slate-600 leading-relaxed">
                    Browser type, Time-to-First-Byte (TTFB) latency metrics, IP geography, device viewport dimensions, and anonymized session heatmaps.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="use-of-information" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Section 02
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                2. Use of Information & Zero Data-Broker Guarantee
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                We strictly utilize collected client and visitor information to deliver and optimize our engineering and media buying services.
              </p>

              <ul className="space-y-3 font-jakarta text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Architecture Discovery:</strong> Evaluating technical infrastructure, server load capacities, and ad attribution tracking setups.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Campaign Calibration:</strong> Building customized media buying strategies, creative testing matrices, and programmatic SEO hubs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Communications:</strong> Responding to discovery requests, scheduling strategy calls, and sending the weekly Nexora Growth Digest (with one-click unsubscribe).
                  </span>
                </li>
              </ul>

              {/* Cyan Highlight Callout */}
              <div className="p-5 rounded-2xl bg-cyan-50/80 border-2 border-[#00D2FF] flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#0099BE] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-outfit font-bold text-sm text-[#00144A]">
                    Zero Data-Broker Sale Commitment
                  </div>
                  <p className="font-jakarta text-xs text-slate-700 leading-relaxed">
                    Nexora does NOT sell, rent, or trade client or prospect personal data to third-party brokers, advertisers, or programmatic aggregators. All client telemetry remains strictly confidential.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="data-security" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Section 03
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                3. Data Security, Storage & Encryption Protocols
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                We employ military-grade TLS 1.3 encryption for all data in transit and AES-256 encryption for data at rest. Infrastructure is hosted on SOC2-certified multi-region cloud edge environments.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="font-outfit font-bold text-sm text-[#00144A]">
                  Infrastructure Security Standards
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="font-bold text-[#00144A]">TLS 1.3 & HSTS</div>
                    <div className="text-slate-500">Encrypted in Transit</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="font-bold text-[#00144A]">AES-256 Storage</div>
                    <div className="text-slate-500">Encrypted at Rest</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="font-bold text-[#00144A]">SOC2 & HIPAA Ready</div>
                    <div className="text-slate-500">Compliant Partners</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="user-rights" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Section 04
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                4. User Rights & International Compliance (GDPR / CCPA)
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                Under the European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the following statutory rights regarding your personal information:
              </p>

              <div className="space-y-3 font-jakarta text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <UserCheck className="w-4 h-4 text-[#0099BE] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00144A]">Right to Access & Portability:</strong> You may request a complete export of any data records associated with your email.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <UserCheck className="w-4 h-4 text-[#0099BE] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00144A]">Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request the permanent purge of your contact submissions and analytics history.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <UserCheck className="w-4 h-4 text-[#0099BE] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00144A]">Right to Opt-Out:</strong> You may disable non-essential analytics cookies through your browser settings or directly via written request.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="third-party-integrations" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Section 05
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                5. Third-Party Integrations & First-Party CAPI
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                In our paid media work, we engineer server-to-server Conversions API (CAPI) pipelines through Google Tag Manager and Meta Ads API. These connections process transaction events authenticated via client first-party domain cookies, eliminating invasive third-party cross-site trackers.
              </p>
            </section>

            {/* Section 6 */}
            <section id="legal-contact" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Section 06
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                6. Contact Legal & Privacy Officer
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                To exercise your privacy rights, file a data inquiry, or request policy clarifications, contact our designated privacy department:
              </p>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#00144A] text-[#00D2FF] font-outfit font-black text-sm flex items-center justify-center border border-[#00D2FF]/40 shadow-sm flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-outfit font-bold text-sm text-[#00144A]">
                      Nexora Legal & Compliance Office
                    </div>
                    <div className="text-xs text-slate-500 font-jakarta">
                      Direct Email: legal@nexoracreations.com
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:legal@nexoracreations.com?subject=Privacy%20Data%20Inquiry"
                  className="tactile-btn tactile-btn-navy text-xs py-2.5 px-5 whitespace-nowrap"
                >
                  Submit Privacy Request
                </a>
              </div>
            </section>
          </main>
        </div>
      </section>
    </div>
  );
}

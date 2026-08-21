"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scale,
  FileCheck,
  ShieldAlert,
  ChevronRight,
  Mail,
  CheckCircle2,
  AlertCircle,
  FileText,
  Menu,
  Sparkles,
  CreditCard,
  Lock,
} from "lucide-react";

interface TocSection {
  id: string;
  title: string;
}

const tocSections: TocSection[] = [
  { id: "scope-of-services", title: "1. Scope of Agency Services" },
  { id: "intellectual-property", title: "2. Intellectual Property Rights" },
  { id: "client-responsibilities", title: "3. Client Accounts & Ad Spend" },
  { id: "payment-schedules", title: "4. Payments, Retainers & SLAs" },
  { id: "limitation-of-liability", title: "5. Limitations & Disclaimers" },
  { id: "governing-law", title: "6. Governing Law & Arbitration" },
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("scope-of-services");
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
            <span className="text-[#0099BE] font-bold">Terms of Service</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
                <Scale className="w-4 h-4 text-[#00D2FF]" />
                Master Services Agreement & Engagement Terms
              </span>
              <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] tracking-tight leading-[1.1] mb-4">
                Terms of Service & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                  Engagement Framework
                </span>
              </h1>
              <p className="font-jakarta text-slate-600 text-base sm:text-lg leading-relaxed">
                Standard terms, intellectual property ownership guidelines, retainer conditions, and service level agreements governing work with Nexora Creations GROUP.
              </p>
            </div>

            {/* Version & Date Metadata Pill */}
            <div className="flex-shrink-0 p-5 rounded-2xl bg-white border border-slate-200 shadow-tactile text-left sm:text-right min-w-[220px]">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Agreement Status
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
                  Clauses
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

            {/* Inquiries Card */}
            <div className="p-6 rounded-3xl bg-[#00144A] text-white border border-[#00D2FF]/30 shadow-tactile space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00D2FF]">
                <Scale className="w-3.5 h-3.5" />
                <span>Contracts Counsel</span>
              </div>
              <p className="font-jakarta text-xs text-slate-300 leading-relaxed">
                Need enterprise MSA adjustments, custom NDA terms, or tailored vendor packets?
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
            <section id="scope-of-services" className="space-y-4 pt-2">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Clause 01
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                1. Scope of Agency Services
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                Nexora Creations GROUP (&quot;Nexora&quot;) provides high-performance web engineering, full-stack Next.js applications, paid media management, programmatic SEO engines, conversion rate optimization (CRO), and commercial visual production services as agreed upon in individual Statements of Work (SOW) or Retainer Agreements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 font-medium text-slate-700">
                  ✓ Full-Stack Web Development & Architecture
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 font-medium text-slate-700">
                  ✓ Paid Media Management (Meta, Google, TikTok)
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 font-medium text-slate-700">
                  ✓ Programmatic SEO & Topical Authority Maps
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 font-medium text-slate-700">
                  ✓ Commercial Photography & Vertical Video Reels
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="intellectual-property" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Clause 02
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                2. Intellectual Property Rights & Asset Transfer
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                The ownership of all creative, architectural, and written deliverables is governed strictly by the following allocation rules:
              </p>

              <div className="space-y-3 font-jakarta text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <FileCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00144A]">Client Deliverable Ownership:</strong> Upon full and final settlement of all applicable invoices, the client receives 100% full intellectual property ownership and commercial rights to bespoke source code, copy, logos, and raw assets created specifically for the project.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[#0099BE] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00144A]">Agency Core Tooling & Pre-Existing IP:</strong> Nexora retains all ownership rights to proprietary internal libraries, boilerplate scaffolding tools, algorithmic script engines, and generalized design frameworks developed prior to or independently of the engagement.
                  </div>
                </div>
              </div>

              {/* Cyan Highlight Callout */}
              <div className="p-5 rounded-2xl bg-cyan-50/80 border-2 border-[#00D2FF] flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#0099BE] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-outfit font-bold text-sm text-[#00144A]">
                    Portfolio Display Rights
                  </div>
                  <p className="font-jakarta text-xs text-slate-700 leading-relaxed">
                    Unless explicitly restricted by a signed Non-Disclosure Agreement (NDA), Nexora reserves the right to showcase non-confidential screenshots, performance metrics, and case studies in our public portfolio and visual archives.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="client-responsibilities" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Clause 03
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                3. Client Responsibilities & Direct Ad Spend Billing
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                To guarantee smooth deployment workflows and avoid media budget discrepancies:
              </p>

              <ul className="space-y-3 font-jakarta text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CreditCard className="w-4 h-4 text-[#0099BE] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Ad Spend Billing:</strong> All media spend (Meta Ads, Google Ads, TikTok Ads) must be billed directly from the platform to the client&apos;s own credit card or credit line. Nexora manages media accounts as an authorized agency partner and does NOT float third-party ad spend.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Credential & Access Provisioning:</strong> Clients agree to grant necessary administrative or partner-level access to domain registrars, hosting portals, and CRM systems within 3 business days of onboarding.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="payment-schedules" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Clause 04
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                4. Payment Schedules, Retainers & SLA Terms
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                All pricing is defined in specific SOW contracts. Standard billing practices include:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-jakarta">
                <div className="p-4 rounded-2xl bg-white border border-slate-200">
                  <h4 className="font-outfit font-bold text-sm text-[#00144A] mb-1">
                    Fixed Project Milestones
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Standard fixed-scope web builds require a 50% upfront initiation deposit, with the remaining 50% due upon successful staging deployment and QA sign-off prior to production DNS cutover.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200">
                  <h4 className="font-outfit font-bold text-sm text-[#00144A] mb-1">
                    Monthly Retainers & Cancellation
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Monthly marketing and SEO retainers are billed on the 1st of each calendar month on Net-15 terms. Retainers require a standard 30-day written cancellation notice.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="limitation-of-liability" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Clause 05
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                5. Limitation of Liability & Third-Party Platform Disclaimers
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                While Nexora implements industry-leading engineering practices and data-driven ad testing matrices:
              </p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 font-jakarta text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00144A]">Third-Party Algorithm Changes:</strong> Nexora cannot be held liable for sudden policy, ranking algorithm, or auction pricing shifts implemented by Google, Meta, Apple (ITP), or third-party ad networks.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#00144A]">Maximum Liability Cap:</strong> In no event shall Nexora&apos;s aggregate liability arising out of or related to this agreement exceed the total fees actually paid by the client in the three (3) months preceding the claim.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="governing-law" className="space-y-4 pt-4 border-t border-slate-200/80">
              <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider">
                Clause 06
              </span>
              <h2 className="font-outfit text-2xl sm:text-3xl font-black tracking-tight text-[#00144A]">
                6. Governing Law & Dispute Resolution
              </h2>
              <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed">
                These terms and any related Statements of Work shall be governed by and construed in accordance with standard commercial laws. Any dispute arising under this agreement shall be submitted to confidential binding arbitration prior to initiating formal litigation.
              </p>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#00144A] text-[#00D2FF] font-outfit font-black text-sm flex items-center justify-center border border-[#00D2FF]/40 shadow-sm flex-shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-outfit font-bold text-sm text-[#00144A]">
                      Nexora Contract Administration
                    </div>
                    <div className="text-xs text-slate-500 font-jakarta">
                      Direct Email: legal@nexoracreations.com
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:legal@nexoracreations.com?subject=Master%20Agreement%20Inquiry"
                  className="tactile-btn tactile-btn-navy text-xs py-2.5 px-5 whitespace-nowrap"
                >
                  Contact Legal Department
                </a>
              </div>
            </section>
          </main>
        </div>
      </section>
    </div>
  );
}

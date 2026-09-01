"use client";

import React from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Stethoscope, 
  Cloud, 
  ShoppingBag, 
  Building, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { TactileCard } from "@/components/ui/TactileCard";

interface DomainItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: string;
}

const domains: DomainItem[] = [
  {
    id: "fintech",
    badge: "Financial Tech",
    title: "FinTech & Banking Infrastructure",
    description: "Bank-grade security portals, sub-second ledger dashboards, and conversion-optimized KYC onboarding funnels.",
    icon: <CreditCard className="w-6 h-6 text-[#00144A] dark:text-[#00D2FF]" />,
    metrics: "$12B+ Processed Securely",
  },
  {
    id: "healthtech",
    badge: "Medical & Life Sciences",
    title: "Healthcare & Telemedicine",
    description: "HIPAA-compliant patient portals, automated booking engines, and authority-building medical SEO systems.",
    icon: <Stethoscope className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    metrics: "100% HIPAA Compliance",
  },
  {
    id: "saas-cloud",
    badge: "B2B Software",
    title: "Enterprise SaaS & Cloud",
    description: "Product-Led Growth (PLG) marketing funnels, interactive feature walkthroughs, and frictionless trial-to-paid conversions.",
    icon: <Cloud className="w-6 h-6 text-[#0099BE] dark:text-[#00D2FF]" />,
    metrics: "3.4x Free-to-Paid Lift",
  },
  {
    id: "ecommerce",
    badge: "Retail & D2C",
    title: "High-Volume Omnichannel E-Commerce",
    description: "Headless Next.js storefronts, sub-500ms cart flows, and real-time inventory synchronization across global channels.",
    icon: <ShoppingBag className="w-6 h-6 text-[#FF4B72]" />,
    metrics: "Sub-Second Global Checkout",
  },
  {
    id: "realestate",
    badge: "Property & Assets",
    title: "Real Estate & Asset Portals",
    description: "Ultra-high-definition interactive property viewers, geo-targeted search filters, and luxury investor inquiry pipelines.",
    icon: <Building className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    metrics: "Over $800M in Portfolio Value",
  },
  {
    id: "luxury",
    badge: "Bespoke Lifestyle",
    title: "Luxury & High-Touch D2C",
    description: "Editorial spatial design, tactile storytelling, and immersive visual campaigns crafted for discerning global clienteles.",
    icon: <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    metrics: "Top-Tier Brand Prestige",
  },
];

export const DomainGrid: React.FC = () => {
  return (
    <section id="domains" className="py-24 bg-slate-50/60 dark:bg-[#000517] border-t border-slate-200/80 dark:border-slate-800 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 shadow-tactile dark:shadow-tactile-dark mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span className="font-outfit text-xs font-bold uppercase tracking-wider text-[#00144A] dark:text-white">
              Domain Expertise
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-[#00144A] dark:text-white tracking-tight leading-tight mb-4">
            Specialized Solutions for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
              High-Stakes Verticals.
            </span>
          </h2>

          <p className="font-jakarta text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            We don&apos;t apply cookie-cutter formulas. Every industry operates under distinct compliance, user psychology, and competitive dynamics.
          </p>
        </div>

        {/* 6 Tactile Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain) => (
            <TactileCard
              key={domain.id}
              badge={domain.badge}
              icon={domain.icon}
              title={domain.title}
              description={domain.description}
              className="h-full flex flex-col justify-between"
            >
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-outfit text-xs font-bold text-[#0099BE]">
                  {domain.metrics}
                </span>

                <Link
                  href="/portfolio"
                  className="flex items-center gap-1.5 text-xs font-outfit font-bold text-[#00144A] dark:text-white group-hover:text-[#00D2FF] transition-colors"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </TactileCard>
          ))}
        </div>

        {/* Bottom CTA Banner inside Domain Section */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#00144A] dark:bg-[#001133] border border-[#002277] dark:border-slate-800 shadow-tactile dark:shadow-tactile-dark text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#00D2FF]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <span className="tactile-key-pill uppercase tracking-wider text-[11px] bg-white/10 text-[#00D2FF] border-[#00D2FF]/30 mb-3 inline-block">
              Custom Requirements?
            </span>
            <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Need an Enterprise-Grade Digital Solution for Your Specific Industry?
            </h3>
            <p className="font-jakarta text-sm text-slate-300 mt-2">
              Our architects will conduct a complimentary technical teardown of your current web platform and marketing funnel.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <Link
              href="/contact"
              className="tactile-btn tactile-btn-cyan text-sm py-3.5 px-8 flex items-center gap-2 font-bold"
            >
              <span>Request Technical Teardown</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DomainGrid;

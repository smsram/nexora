"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  Cpu,
  Layers,
  TrendingUp,
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";

export interface SubDeliverable {
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  metric: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  category: "SEO Strategy" | "Paid Ads" | "Web Architecture" | "Social Campaigns";
  industry: string;
  tagline: string;
  overview: string;
  coreMetric: string;
  coreMetricLabel: string;
  hasBeforeAfter: boolean;
  beforeStats: { label: string; value: string };
  afterStats: { label: string; value: string };
  techStack: string[];
  subDeliverables: SubDeliverable[];
  galleryImages: Array<{ title: string; subtitle: string; gradient: string }>;
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "hyperion-ai",
    clientName: "Hyperion AI Platform",
    category: "Web Architecture",
    industry: "Enterprise SaaS & AI",
    tagline: "Sub-50ms Edge Infrastructure & High-Converting Self-Serve Signup Funnel",
    overview:
      "Hyperion was struggling with high bounce rates on legacy single-page architecture. Nexora re-engineered their entire frontend into a high-speed Next.js 14 App Router platform with ISR edge streaming, reducing global TTFB to 38ms and increasing signup completions by 140%.",
    coreMetric: "38ms TTFB",
    coreMetricLabel: "Global Edge Latency",
    hasBeforeAfter: true,
    beforeStats: { label: "Legacy TTFB", value: "320ms" },
    afterStats: { label: "Nexora Edge TTFB", value: "38ms" },
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel Edge", "GraphQL", "Framer Motion"],
    subDeliverables: [
      {
        title: "Edge-Rendered Pricing Calculator",
        category: "Interactive Component",
        description: "Custom tactile seat calculator with real-time tier toggles and Stripe billing sync.",
        metric: "+64% Checkout Velocity",
      },
      {
        title: "Developer Documentation Engine",
        category: "Content Architecture",
        description: "Searchable API documentation hub with syntax highlighting and instant interactive sandboxes.",
        metric: "Sub-200ms Search Index",
      },
      {
        title: "Enterprise SSO Onboarding Flow",
        category: "Authentication UX",
        description: "Zero-friction single sign-on modal flow with automated team workspace provisioning.",
        metric: "+92% Activation Rate",
      },
    ],
    galleryImages: [
      {
        title: "Edge Platform Dashboard",
        subtitle: "Real-Time Telemetry & Core Web Vitals",
        gradient: "from-blue-900 via-indigo-950 to-[#00144A]",
      },
      {
        title: "Tactile Interactive Calculator",
        subtitle: "3D Keycap Pricing Tier Configuration",
        gradient: "from-cyan-950 via-slate-900 to-[#00144A]",
      },
      {
        title: "Enterprise Inbound Flow",
        subtitle: "Automated Lead Routing Architecture",
        gradient: "from-indigo-950 via-blue-950 to-[#00144A]",
      },
    ],
  },
  {
    id: "sterling-atelier",
    clientName: "Sterling Atelier Luxury",
    category: "Paid Ads",
    industry: "Luxury E-Commerce",
    tagline: "Algorithmic Media Buying Matrix & Server-Side CAPI First-Party Scaling",
    overview:
      "Sterling Atelier needed to break through an acquisition plateau caused by iOS tracking loss. Nexora deployed our 3x3 creative hook testing matrix and first-party Google Tag Manager CAPI pipeline, tripling their monthly revenue while scaling blended ROAS to 4.8x.",
    coreMetric: "4.8x ROAS",
    coreMetricLabel: "Blended Return on Ad Spend",
    hasBeforeAfter: true,
    beforeStats: { label: "Legacy Blended ROAS", value: "2.1x" },
    afterStats: { label: "Nexora Scaled ROAS", value: "4.8x" },
    techStack: ["Meta Conversions API", "Google Server GTM", "TikTok Ads API", "Triple Whale", "Looker Studio"],
    subDeliverables: [
      {
        title: "First-Party CAPI Event Pipeline",
        category: "Data Infrastructure",
        description: "Server-to-server transaction tracking with 9.4/10 Event Match Quality on Meta Ads.",
        metric: "99.2% Attribution Accuracy",
      },
      {
        title: "Weekly 3x3 Creative Matrix",
        category: "Creative Strategy",
        description: "Rapid production of 30+ high-converting UGC motion video hooks tested at low budget floors.",
        metric: "Sub-$1.15 Click Floor",
      },
      {
        title: "Post-Purchase One-Click Upsell",
        category: "CRO Architecture",
        description: "Dynamic post-checkout accessory offer boosting Average Order Value (AOV).",
        metric: "+28% AOV Surge",
      },
    ],
    galleryImages: [
      {
        title: "Meta Ads Dashboard Telemetry",
        subtitle: "Scale Curve & Real-Time ROAS Tracker",
        gradient: "from-slate-900 via-cyan-950 to-[#00144A]",
      },
      {
        title: "UGC Motion Creative Library",
        subtitle: "High-Retention Vertical Video Hooks",
        gradient: "from-blue-950 via-indigo-900 to-[#00144A]",
      },
      {
        title: "First-Party Server Container",
        subtitle: "Google Cloud CAPI Webhook Router",
        gradient: "from-indigo-950 via-slate-900 to-[#00144A]",
      },
    ],
  },
  {
    id: "aetheria-biotech",
    clientName: "Aetheria Biotech Lab",
    category: "SEO Strategy",
    industry: "Healthcare & Biotech",
    tagline: "Programmatic Search Architecture & HIPAA-Compliant Trial Intake",
    overview:
      "Aetheria required patient recruitment across 450+ distinct clinical trial search terms. We built an automated programmatic SEO directory with rich JSON-LD schema graphs, ranking them #1 across 450+ keywords and driving +310% in validated intake submissions.",
    coreMetric: "#1 Rank",
    coreMetricLabel: "450+ Keyword Dominance",
    hasBeforeAfter: true,
    beforeStats: { label: "Legacy Monthly Search", value: "2.4K" },
    afterStats: { label: "Nexora Programmatic Search", value: "38.5K" },
    techStack: ["Next.js Dynamic Routes", "Ahrefs API", "JSON-LD Schemas", "Google Search Console", "Vercel Edge"],
    subDeliverables: [
      {
        title: "Programmatic Landing Page Generator",
        category: "SEO Engineering",
        description: "Dynamic route architecture serving 10,000+ structured condition-specific trial hubs.",
        metric: "+310% Patient Intakes",
      },
      {
        title: "Medical Authority Schema Graph",
        category: "Technical SEO",
        description: "Comprehensive medical organization schema enhancing Google AI overview snippet eligibility.",
        metric: "88% Rich Snippet Rate",
      },
      {
        title: "HIPAA Patient Eligibility Screener",
        category: "Secure Web Application",
        description: "End-to-end encrypted questionnaire flow qualifying patients for active trials.",
        metric: "100% HIPAA Compliance",
      },
    ],
    galleryImages: [
      {
        title: "Programmatic SEO Cluster",
        subtitle: "Keyword Map & SERP Rank Telemetry",
        gradient: "from-teal-950 via-blue-950 to-[#00144A]",
      },
      {
        title: "Patient Intake Workflow",
        subtitle: "Encrypted Multi-Step Medical Screener",
        gradient: "from-slate-900 via-teal-950 to-[#00144A]",
      },
      {
        title: "Structured Schema Graph",
        subtitle: "JSON-LD Entity Relationship Tree",
        gradient: "from-blue-950 via-slate-900 to-[#00144A]",
      },
    ],
  },
  {
    id: "captable-fintech",
    clientName: "CapTable Fintech Systems",
    category: "Social Campaigns",
    industry: "Enterprise Fintech & B2B",
    tagline: "Viral LinkedIn B2B Loops & Creator Whitelisting Ecosystem",
    overview:
      "CapTable was looking to build an organic inbound pipeline for their equity management software. Nexora deployed executive ghostwriting funnels and creator affiliate partnerships, generating 1.8M monthly impressions and $18M in qualified loan pipeline.",
    coreMetric: "$18M+",
    coreMetricLabel: "Qualified Pipeline Generated",
    hasBeforeAfter: false,
    beforeStats: { label: "Monthly Impressions", value: "120K" },
    afterStats: { label: "Nexora Social Scale", value: "1.8M+" },
    techStack: ["LinkedIn Ads API", "ManyChat B2B", "CapCut Pro", "HubSpot CRM", "Looker Studio"],
    subDeliverables: [
      {
        title: "Executive Thought Leadership Engine",
        category: "Organic Distribution",
        description: "Weekly technical frameworks and teardowns distributed across executive founder channels.",
        metric: "1.8M Monthly Impressions",
      },
      {
        title: "Direct Message Lead Magnet Flow",
        category: "Conversational CRO",
        description: "Automated keyword triggers delivering financial models directly to prospective CFOs.",
        metric: "42% Inbound Response Rate",
      },
      {
        title: "B2B Creator Affiliate Program",
        category: "Influencer Acquisition",
        description: "Contracted 12 top financial influencers for organic product demonstrations.",
        metric: "$4.5M Attributed ARR",
      },
    ],
    galleryImages: [
      {
        title: "Social Growth Telemetry",
        subtitle: "Impression Curve & Inbound Funnel Graph",
        gradient: "from-indigo-950 via-slate-900 to-[#00144A]",
      },
      {
        title: "B2B Automation Hub",
        subtitle: "Lead Routing & CRM Webhook Trigger",
        gradient: "from-cyan-950 via-blue-950 to-[#00144A]",
      },
      {
        title: "Executive Teardown Kit",
        subtitle: "Viral Content Blueprint & Carousel Pack",
        gradient: "from-slate-900 via-indigo-950 to-[#00144A]",
      },
    ],
  },
];

const portfolioCategories = [
  "All",
  "Web Architecture",
  "Paid Ads",
  "SEO Strategy",
  "Social Campaigns",
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: Array<{ title: string; subtitle: string; gradient: string }>;
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  // Lock body scroll when any modal or lightbox is open
  useEffect(() => {
    const isModalActive = activeCaseStudy !== null || lightboxState.isOpen;
    if (isModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCaseStudy, lightboxState.isOpen]);

  // Lightbox keyboard navigation (Esc, ArrowLeft, ArrowRight)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxState.isOpen) {
        if (e.key === "Escape") {
          setLightboxState((prev) => ({ ...prev, isOpen: false }));
        } else if (e.key === "ArrowLeft") {
          setLightboxState((prev) => ({
            ...prev,
            currentIndex:
              prev.currentIndex === 0
                ? prev.images.length - 1
                : prev.currentIndex - 1,
          }));
        } else if (e.key === "ArrowRight") {
          setLightboxState((prev) => ({
            ...prev,
            currentIndex:
              prev.currentIndex === prev.images.length - 1
                ? 0
                : prev.currentIndex + 1,
          }));
        }
      } else if (activeCaseStudy) {
        if (e.key === "Escape") {
          setActiveCaseStudy(null);
        }
      }
    },
    [lightboxState.isOpen, activeCaseStudy]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (
    images: Array<{ title: string; subtitle: string; gradient: string }>,
    index: number
  ) => {
    setLightboxState({
      isOpen: true,
      images,
      currentIndex: index,
    });
  };

  const filteredCaseStudies =
    selectedCategory === "All"
      ? caseStudiesData
      : caseStudiesData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* ========================================================================= */}
      {/* Level 3: Fullscreen Zoomable Lightbox */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 select-none"
            onClick={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
          >
            {/* Top Bar: Counter + Close */}
            <div className="flex items-center justify-between text-white z-10">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                {lightboxState.currentIndex + 1} of {lightboxState.images.length}
              </span>

              <button
                onClick={() =>
                  setLightboxState((prev) => ({ ...prev, isOpen: false }))
                }
                type="button"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Image Display with Navigation Arrows */}
            <div
              className="relative max-w-5xl w-full mx-auto aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex items-center justify-center p-8 text-center text-white my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${lightboxState.images[lightboxState.currentIndex]?.gradient}`}
              />

              <div className="relative z-10 max-w-xl">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 mb-3 shadow-sm">
                  High-Resolution Production Artifact
                </span>
                <h3 className="font-outfit text-3xl sm:text-4xl font-black mb-2">
                  {lightboxState.images[lightboxState.currentIndex]?.title}
                </h3>
                <p className="font-jakarta text-sm sm:text-base text-slate-300">
                  {lightboxState.images[lightboxState.currentIndex]?.subtitle}
                </p>
              </div>

              {/* Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxState((prev) => ({
                    ...prev,
                    currentIndex:
                      prev.currentIndex === 0
                        ? prev.images.length - 1
                        : prev.currentIndex - 1,
                  }));
                }}
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxState((prev) => ({
                    ...prev,
                    currentIndex:
                      prev.currentIndex === prev.images.length - 1
                        ? 0
                        : prev.currentIndex + 1,
                  }));
                }}
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="text-center text-xs text-slate-400 z-10">
              Use <kbd className="px-2 py-0.5 rounded bg-white/10 text-white">←</kbd> and{" "}
              <kbd className="px-2 py-0.5 rounded bg-white/10 text-white">→</kbd> to navigate,{" "}
              <kbd className="px-2 py-0.5 rounded bg-white/10 text-white">ESC</kbd> to exit.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* Level 2: Project Breakdown Lightbox Modal */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCaseStudy(null)}
              className="fixed inset-0 bg-[#000B2B]/75 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              layoutId={`case-study-${activeCaseStudy.id}`}
              className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 text-[#00144A] flex flex-col overflow-hidden"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200">
                    {activeCaseStudy.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {activeCaseStudy.industry}
                  </span>
                </div>

                <button
                  onClick={() => setActiveCaseStudy(null)}
                  type="button"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-brand-navy transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 md:p-10 overflow-y-auto flex-1 space-y-8">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="max-w-2xl">
                    <h2 className="font-outfit text-3xl sm:text-4xl font-black text-[#00144A] tracking-tight mb-3">
                      {activeCaseStudy.clientName}
                    </h2>
                    <p className="font-jakarta text-slate-600 text-base sm:text-lg leading-relaxed">
                      {activeCaseStudy.overview}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#00144A] text-white border border-[#00D2FF]/40 shadow-tactile min-w-[200px] text-center flex-shrink-0">
                    <div className="font-outfit text-3xl font-black text-[#00D2FF] mb-1">
                      {activeCaseStudy.coreMetric}
                    </div>
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                      {activeCaseStudy.coreMetricLabel}
                    </div>
                  </div>
                </div>

                {/* Before & After Interactive Slider (if applicable) */}
                {activeCaseStudy.hasBeforeAfter && (
                  <div>
                    <h3 className="font-outfit text-lg font-bold text-[#00144A] mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0099BE]" />
                      Interactive Telemetry Comparison
                    </h3>
                    <BeforeAfterSlider
                      beforeLabel="Legacy Performance"
                      afterLabel="Nexora Architecture"
                      beforeStats={activeCaseStudy.beforeStats}
                      afterStats={activeCaseStudy.afterStats}
                      aspectRatio="aspect-[16/9]"
                    />
                  </div>
                )}

                {/* Sub-Project Deliverables Completed */}
                <div>
                  <h3 className="font-outfit text-xl font-bold text-[#00144A] mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#0099BE]" />
                    Sub-Project Deliverables Completed
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeCaseStudy.subDeliverables.map((deliverable, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-[#0099BE] uppercase tracking-wider block mb-1">
                            {deliverable.category}
                          </span>
                          <h4 className="font-outfit font-bold text-base text-[#00144A] mb-2">
                            {deliverable.title}
                          </h4>
                          <p className="font-jakarta text-xs text-slate-600 leading-relaxed mb-4">
                            {deliverable.description}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-200 text-xs font-bold text-[#00144A] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>{deliverable.metric}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zoomable Deliverable Gallery */}
                <div>
                  <h3 className="font-outfit text-lg font-bold text-[#00144A] mb-3 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-[#0099BE]" />
                    Production Artifacts Gallery (Click to Zoom)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeCaseStudy.galleryImages.map((img, iIdx) => (
                      <div
                        key={iIdx}
                        onClick={() =>
                          openLightbox(activeCaseStudy.galleryImages, iIdx)
                        }
                        className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br ${img.gradient} text-white p-5 flex flex-col justify-end border border-slate-800 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform`}
                      >
                        <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 text-slate-300 group-hover:text-white transition-colors">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <div className="relative z-10">
                          <div className="font-outfit font-bold text-sm leading-snug">
                            {img.title}
                          </div>
                          <div className="text-[11px] text-slate-300">
                            {img.subtitle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <h3 className="font-outfit text-sm font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                    Integrated Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeCaseStudy.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="sticky bottom-0 px-6 sm:px-8 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Interested in similar architectural results for your business?
                </span>
                <Link
                  href={`/contact?case_study=${encodeURIComponent(activeCaseStudy.clientName)}`}
                  onClick={() => setActiveCaseStudy(null)}
                  className="tactile-btn tactile-btn-cyan text-xs py-2.5 px-6 flex items-center gap-2 font-bold ml-auto"
                >
                  <span>Inquire About Similar Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* Level 1: Hero Header & Category Filter Pills */}
      {/* ========================================================================= */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
              Selected Works & Case Studies
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] tracking-tight leading-[1.1] mb-6">
              Proven Deployments. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                Measurable Velocity.
              </span>
            </h1>
            <p className="font-jakarta text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Explore our multi-level case studies across full-stack Next.js web applications, programmatic SEO networks, and algorithmic media engines.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-10 pb-2 scrollbar-none">
            {portfolioCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-jakarta whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#00144A] text-white shadow-tactile translate-y-0"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#00144A]"
                  }`}
                >
                  {isSelected && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D2FF] mr-2" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Level 1: Client Overview Cards Grid */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCaseStudies.map((study) => (
            <motion.div
              key={study.id}
              layoutId={`case-study-${study.id}`}
              onClick={() => setActiveCaseStudy(study)}
              whileHover={{ y: -4 }}
              whileTap={{ y: 2 }}
              className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-tactile hover:shadow-tactile-hover transition-all duration-200 cursor-pointer flex flex-col justify-between select-none"
            >
              <div>
                {/* Header Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200">
                    {study.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {study.industry}
                  </span>
                </div>

                {/* Client Name & Tagline */}
                <h3 className="font-outfit text-2xl sm:text-3xl font-black text-[#00144A] tracking-tight mb-2">
                  {study.clientName}
                </h3>
                <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {study.tagline}
                </p>

                {/* Embedded Before/After or Visual Preview */}
                {study.hasBeforeAfter ? (
                  <div
                    className="mb-6 pointer-events-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BeforeAfterSlider
                      beforeStats={study.beforeStats}
                      afterStats={study.afterStats}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                ) : (
                  <div className="mb-6 aspect-[16/10] rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#00144A] text-white p-6 flex flex-col justify-between border border-slate-800 shadow-inner">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 backdrop-blur-md w-max">
                      Multi-Channel Ecosystem
                    </span>
                    <div>
                      <div className="font-outfit text-3xl font-black text-[#00D2FF]">
                        {study.coreMetric}
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        {study.coreMetricLabel}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Row */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-outfit text-xl font-black text-[#00144A]">
                    {study.coreMetric}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {study.coreMetricLabel}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00144A] group-hover:text-[#00D2FF] transition-colors">
                  <span>Explore Deliverables</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#00144A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to engineer your next high-converting deployment?
            </h2>
            <p className="font-jakarta text-slate-300 text-base sm:text-lg">
              Book an architecture discovery session with our engineering leads to review your growth goals.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="tactile-btn tactile-btn-cyan text-sm py-3.5 px-8 flex items-center justify-center gap-2.5 font-bold shadow-lg"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

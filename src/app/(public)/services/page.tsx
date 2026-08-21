"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  TrendingUp,
  Search,
  Share2,
  Target,
  Layers,
  ArrowRight,
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import ServiceDetailModal, { ServiceItem } from "@/components/services/ServiceDetailModal";

const servicesData: ServiceItem[] = [
  {
    id: "web-architecture",
    title: "Full-Stack Web Architecture",
    category: "Web & Engineering",
    shortDesc:
      "Enterprise Next.js web applications, headless commerce systems, and ultra-low latency frontend architectures.",
    fullDesc:
      "We design, build, and deploy production-grade digital platforms engineered for sub-50ms response times, pixel-perfect tactile responsiveness, and resilient multi-region scaling. Built with Next.js 14 App Router, TypeScript, and modern headless CMS layers.",
    metric: "Sub-50ms",
    metricLabel: "Average TTFB Global Latency",
    iconName: "Code2",
    deliverables: [
      {
        title: "Next.js 14 Server-Side Architecture",
        desc: "Edge-rendered App Router components with optimized streaming and caching.",
      },
      {
        title: "Custom Tactile UI/UX Design System",
        desc: "Tailored component library with Framer Motion physics and zero generic templates.",
      },
      {
        title: "Headless CMS & API Orchestration",
        desc: "Seamless integration with Sanity, Strapi, or Shopify Storefront APIs.",
      },
      {
        title: "CI/CD & Lighthouse 95+ Performance Guarantee",
        desc: "Automated test suites, bundle-size analyzers, and perfect Core Web Vitals.",
      },
    ],
    techStack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "GraphQL",
      "Vercel Edge",
    ],
    timeline: [
      {
        phase: "Phase 1: Architecture",
        duration: "Weeks 1–2",
        outcome: "System blueprints, database schemas, and Figma high-fi interactive prototypes.",
      },
      {
        phase: "Phase 2: Core Engineering",
        duration: "Weeks 3–5",
        outcome: "Component scaffolding, API integration, and tactile micro-interaction tuning.",
      },
      {
        phase: "Phase 3: QA & Go-Live",
        duration: "Week 6",
        outcome: "Multi-device load testing, SEO pre-rendering, and zero-downtime global DNS deployment.",
      },
    ],
    typicalRoi: "+320% conversion speedup and 40% reduction in bounce rate within 30 days.",
  },
  {
    id: "paid-acquisition",
    title: "High-ROAS Paid Acquisition",
    category: "Paid Acquisition",
    shortDesc:
      "Multi-channel performance marketing engines spanning Meta, Google Ads, TikTok, and algorithmic retargeting.",
    fullDesc:
      "Precision-targeted ad campaigns engineered to turn ad spend into predictable, compounding revenue. We develop bespoke creative hooks, dynamic landing page variants, and algorithmic bidding scripts that systematically lower Customer Acquisition Cost (CAC).",
    metric: "4.2x",
    metricLabel: "Average Client ROAS Floor",
    iconName: "TrendingUp",
    deliverables: [
      {
        title: "Multi-Platform Media Buying Strategy",
        desc: "Full execution across Meta Ads, Google Search/PMax, TikTok, and LinkedIn.",
      },
      {
        title: "Dynamic Creative Hook Testing",
        desc: "Weekly batch production of high-converting UGC, motion graphics, and copy angles.",
      },
      {
        title: "First-Party Server-Side Tracking (CAPI)",
        desc: "Bypass iOS tracking drop-offs with Meta Conversions API and Google Server Tag Manager.",
      },
      {
        title: "Live Real-Time Performance Dashboard",
        desc: "Transparent attribution analytics with zero vanity metric fluff.",
      },
    ],
    techStack: [
      "Meta Ads Manager",
      "Google Ads Scripts",
      "TikTok Ads",
      "Triple Whale",
      "Google Tag Manager",
      "Looker Studio",
    ],
    timeline: [
      {
        phase: "Phase 1: Data Audit",
        duration: "Days 1–7",
        outcome: "Pixel tracking fix, audience segmentation, and baseline unit economics setup.",
      },
      {
        phase: "Phase 2: Creative Launch",
        duration: "Weeks 2–3",
        outcome: "Initial ad sets deployed across top 3 target segments with rapid hook iterations.",
      },
      {
        phase: "Phase 3: Scale & Optimize",
        duration: "Weeks 4+",
        outcome: "Budget scaling on winning hooks and continuous dynamic retargeting.",
      },
    ],
    typicalRoi: "2.5x to 5.0x return on ad spend within the first 60 days of campaign deployment.",
  },
  {
    id: "algorithmic-seo",
    title: "Algorithmic SEO & Content Engines",
    category: "Organic & SEO",
    shortDesc:
      "High-intent keyword dominance, programmatic content generation, and technical schema optimization.",
    fullDesc:
      "Dominate high-converting organic search intent with technical search engine optimization and programmatic content clusters. We engineer structured data schemas, deep topical authority maps, and automated internal linking networks.",
    metric: "+240%",
    metricLabel: "Avg. Organic Traffic Lift in 90 Days",
    iconName: "Search",
    deliverables: [
      {
        title: "Technical Core Web Vitals Audit",
        desc: "Eliminate indexing blocks, broken canonicals, and crawl budget inefficiencies.",
      },
      {
        title: "Programmatic SEO Architecture",
        desc: "Scalable template-driven landing page engines targeting hundreds of long-tail keywords.",
      },
      {
        title: "Topical Authority Content Strategy",
        desc: "High-value, expertly written editorial guides built to capture AI overview snippets.",
      },
      {
        title: "Structured JSON-LD Schema Graphs",
        desc: "Rich search snippet enhancements for products, FAQs, organizations, and reviews.",
      },
    ],
    techStack: [
      "Ahrefs",
      "SEMrush",
      "Screaming Frog",
      "Google Search Console",
      "Next.js Metadata API",
      "SurferSEO",
    ],
    timeline: [
      {
        phase: "Phase 1: Deep Site Audit",
        duration: "Week 1",
        outcome: "Exhaustive crawl report, indexation remediation, and keyword target matrix.",
      },
      {
        phase: "Phase 2: Content Cluster Build",
        duration: "Weeks 2–4",
        outcome: "First batch of pillar articles, programmatic hubs, and schema markup live.",
      },
      {
        phase: "Phase 3: Backlink Outreach",
        duration: "Month 2+",
        outcome: "High-domain authority contextual PR link placements and index expansion.",
      },
    ],
    typicalRoi: "3x organic lead volume growth with compounding long-term traffic value.",
  },
  {
    id: "performance-social",
    title: "Performance Social & Creator Scale",
    category: "Paid Acquisition",
    shortDesc:
      "Viral organic loops, brand amplification, and scalable influencer affiliate marketing networks.",
    fullDesc:
      "Transform brand perception into measurable sales velocity. We engineer high-octane social campaigns, creator whitelisting networks, and community-driven engagement loops that build lasting brand equity and direct-to-consumer demand.",
    metric: "1.8M+",
    metricLabel: "Monthly Organic Impressions Generated",
    iconName: "Share2",
    deliverables: [
      {
        title: "Creator Match & Whitelisting Program",
        desc: "Recruit, vet, and contract niche creators with full ad account whitelisting rights.",
      },
      {
        title: "Short-Form Video Production Pipeline",
        desc: "Scripted, edited, and sound-engineered vertical video assets optimized for retention.",
      },
      {
        title: "Social Funnel Automation",
        desc: "Direct message keyword triggers and lead-capture automation on Instagram and TikTok.",
      },
      {
        title: "Trend Surfing & Viral Hook Matrix",
        desc: "Real-time reactive marketing capturing trending cultural moments within your vertical.",
      },
    ],
    techStack: [
      "CapCut Pro",
      "Adobe Premiere",
      "ManyChat API",
      "Billo",
      "Grin",
      "Meta Graph API",
    ],
    timeline: [
      {
        phase: "Phase 1: Creator Onboarding",
        duration: "Weeks 1–2",
        outcome: "Briefing 15+ verified creators with product shipments and storyboards.",
      },
      {
        phase: "Phase 2: Asset Delivery",
        duration: "Weeks 3–4",
        outcome: "30+ video creative assets delivered, edited, and approved for distribution.",
      },
      {
        phase: "Phase 3: Amplification",
        duration: "Month 2+",
        outcome: "Whitelisted ad scaling and organic distribution across TikTok, Reels, and Shorts.",
      },
    ],
    typicalRoi: "+180% engagement lift and 35% reduction in blended CPA.",
  },
  {
    id: "cro-optimization",
    title: "Conversion Rate Optimization (CRO)",
    category: "Growth & CRO",
    shortDesc:
      "Empirical user testing, multi-variant A/B experiments, and frictionless checkout optimization.",
    fullDesc:
      "Maximize every single visit to your digital storefront. Using biometric heatmaps, session replays, and statistical split tests, we identify revenue leaks and engineer high-converting checkout flows that turn passive visitors into loyal customers.",
    metric: "+64%",
    metricLabel: "Average Checkout Rate Improvement",
    iconName: "Target",
    deliverables: [
      {
        title: "Behavioral Heatmap & Session Analysis",
        desc: "Identify friction points, drop-off cliffs, and rage-click hotspots across your user journeys.",
      },
      {
        title: "Statistical A/B & Multivariate Testing",
        desc: "Rapid testing of hero headlines, pricing tables, CTA buttons, and form layouts.",
      },
      {
        title: "Frictionless Checkout Redesign",
        desc: "Single-click Apple Pay/Google Pay integration, trust badge placement, and form pruning.",
      },
      {
        title: "Exit-Intent & Upsell Flow Architecture",
        desc: "Smart conditional post-purchase upsells and personalized retention overlays.",
      },
    ],
    techStack: [
      "Hotjar",
      "Microsoft Clarity",
      "Optimizely",
      "VWO",
      "Google Optimize / PostHog",
      "Figma",
    ],
    timeline: [
      {
        phase: "Phase 1: Friction Audit",
        duration: "Week 1",
        outcome: "Detailed quantitative drop-off report with top 10 revenue-leak hypotheses.",
      },
      {
        phase: "Phase 2: Variant Development",
        duration: "Weeks 2–3",
        outcome: "Development and live deployment of Test Batch 1 across primary sales pages.",
      },
      {
        phase: "Phase 3: Statistical Review",
        duration: "Week 4+",
        outcome: "Implementation of winning variants and launch of Phase 2 micro-experiments.",
      },
    ],
    typicalRoi: "+25% to +64% lift in sitewide conversion rate within 45 days.",
  },
  {
    id: "brand-identity",
    title: "Brand Identity & Motion Systems",
    category: "Creative Systems",
    shortDesc:
      "High-end visual identity, design token systems, interactive 3D elements, and bespoke typography.",
    fullDesc:
      "Elevate your brand into an unforgettable market leader. We construct tactile design languages, bespoke design tokens, fluid vector motion assets, and interactive brand components that establish immediate market authority.",
    metric: "100%",
    metricLabel: "Bespoke Design Token Systems",
    iconName: "Layers",
    deliverables: [
      {
        title: "Comprehensive Visual Brand Guidelines",
        desc: "Complete color palettes, typography scales, spacing tokens, and usage rules.",
      },
      {
        title: "Interactive Motion & Micro-Animation Library",
        desc: "Custom Framer Motion and Lottie assets that breathe life into your web interface.",
      },
      {
        title: "Marketing Deck & Sales Collateral Kits",
        desc: "Investor decks, case study templates, and social media component kits.",
      },
      {
        title: "Vector Logo Suite & Iconography Pack",
        desc: "Multi-resolution, theme-aware vector badges, favicons, and custom iconography.",
      },
    ],
    techStack: [
      "Figma",
      "Adobe Illustrator",
      "After Effects",
      "Framer Motion",
      "Spline 3D",
      "Tailwind Tokens",
    ],
    timeline: [
      {
        phase: "Phase 1: Moodboards & Identity",
        duration: "Weeks 1–2",
        outcome: "3 comprehensive creative directions, typography pairings, and tactile themes.",
      },
      {
        phase: "Phase 2: Design Token Scale",
        duration: "Weeks 3–4",
        outcome: "Complete component design system with responsive tokens and interactive states.",
      },
      {
        phase: "Phase 3: Production Assets",
        duration: "Week 5",
        outcome: "Final export of vector bundles, motion guidelines, and developer-ready tokens.",
      },
    ],
    typicalRoi: "Significant uplift in perceived enterprise valuation and premium brand positioning.",
  },
];

const categories = [
  "All Capabilities",
  "Web & Engineering",
  "Paid Acquisition",
  "Organic & SEO",
  "Creative Systems",
  "Growth & CRO",
];

const clientVerticals = [
  {
    title: "SaaS & AI Platforms",
    stat: "+340% MRR Surge",
    desc: "Engineered high-converting self-serve demo flows, onboarding funnels, and enterprise sales landing architecture.",
    tags: ["Product-Led Growth", "Sub-50ms Web", "B2B Funnels"],
  },
  {
    title: "Luxury & D2C E-Commerce",
    stat: "4.8x Blended ROAS",
    desc: "Custom headless storefronts, tactile product customizers, and high-velocity Meta/TikTok ad creative engines.",
    tags: ["Headless Shopify", "CAPI Tracking", "Dynamic Hooks"],
  },
  {
    title: "Healthcare & Biotech",
    stat: "99.4% SLA Compliance",
    desc: "HIPAA-compliant patient booking portals, programmatic local SEO hubs, and trusted authority brand systems.",
    tags: ["HIPAA Architecture", "Schema SEO", "Trust Systems"],
  },
  {
    title: "Enterprise B2B & Fintech",
    stat: "$45M+ Pipeline Generated",
    desc: "Account-based marketing funnels, interactive financial calculators, and high-security web platforms.",
    tags: ["ABM Ads", "SOC2 Readiness", "Lead Enrichment"],
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Capabilities");
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [likedServices, setLikedServices] = useState<Record<string, boolean>>({});

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredServices =
    selectedCategory === "All Capabilities"
      ? servicesData
      : servicesData.filter((item) => item.category === selectedCategory);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="w-6 h-6 text-[#0099BE]" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-[#0099BE]" />;
      case "Search":
        return <Search className="w-6 h-6 text-[#0099BE]" />;
      case "Share2":
        return <Share2 className="w-6 h-6 text-[#0099BE]" />;
      case "Target":
        return <Target className="w-6 h-6 text-[#0099BE]" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-[#0099BE]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0099BE]" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Expanded Service Detail Modal with layoutId */}
      <ServiceDetailModal
        service={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
      />

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
              Enterprise Solutions & Capabilities
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] tracking-tight leading-[1.1] mb-6">
              Engineered Growth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                Tactile Web Systems.
              </span>
            </h1>
            <p className="font-jakarta text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
              We bridge the gap between high-precision Next.js web engineering and high-ROAS performance marketing. Every capability is engineered to deliver measurable revenue compounding.
            </p>
          </div>

          {/* Filter Pills Row */}
          <div className="flex items-center gap-2 overflow-x-auto pt-10 pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-jakarta whitespace-nowrap transition-all duration-200 cursor-pointer ${
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

      {/* Keycap Services Bento Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const isLiked = likedServices[service.id];
            return (
              <motion.div
                key={service.id}
                layoutId={`service-card-${service.id}`}
                onClick={() => setActiveServiceModal(service)}
                whileHover={{ y: -4 }}
                whileTap={{ y: 2 }}
                className="group relative bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-tactile hover:shadow-tactile-hover transition-all duration-200 cursor-pointer select-none overflow-hidden"
              >
                {/* Top Row: Icon + Like Button */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-[#00D2FF] transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>

                    {/* Interactive Like/Bookmark Heart */}
                    <button
                      onClick={(e) => toggleLike(e, service.id)}
                      type="button"
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#FF4B72] hover:border-[#FF4B72]/40 transition-all focus:outline-none"
                      aria-label="Bookmark service"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isLiked
                            ? "fill-[#FF4B72] text-[#FF4B72] scale-110"
                            : "text-slate-400"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Category Pill */}
                  <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-2.5">
                    {service.category}
                  </span>

                  {/* Title & Short Description */}
                  <h3 className="font-outfit text-xl sm:text-2xl font-bold text-[#00144A] tracking-tight mb-2.5 group-hover:text-[#0099BE] transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-jakarta text-slate-600 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Section: Metric Badge & Expansion Prompt */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-outfit text-lg font-black text-[#00144A]">
                      {service.metric}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {service.metricLabel}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#00144A] group-hover:text-[#00D2FF] transition-colors">
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Client Verticals Bento Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#0099BE] border border-slate-200 mb-3 shadow-sm">
              Industry Experience
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-[#00144A] tracking-tight mb-4">
              Engineered for High-Stakes Verticals
            </h2>
            <p className="font-jakarta text-slate-600 text-base leading-relaxed">
              We tailor our engineering stacks and media strategies to the regulatory, conversion, and architectural demands of each industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientVerticals.map((vertical, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-tactile hover:-translate-y-1 hover:shadow-tactile-hover transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-outfit text-2xl font-bold text-[#00144A]">
                    {vertical.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#00144A] text-[#00D2FF] border border-[#00D2FF]/40 shadow-sm flex-shrink-0">
                    {vertical.stat}
                  </span>
                </div>

                <p className="font-jakarta text-slate-600 text-sm leading-relaxed mb-6">
                  {vertical.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {vertical.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#00144A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to deploy your next high-impact growth engine?
            </h2>
            <p className="font-jakarta text-slate-300 text-base sm:text-lg">
              Book an architecture discovery session with our engineering leads to discuss your bespoke deployment.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="tactile-btn tactile-btn-cyan text-sm py-3.5 px-8 flex items-center gap-2.5 font-bold shadow-lg"
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

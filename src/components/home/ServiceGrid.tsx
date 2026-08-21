"use client";

import React from "react";
import { 
  Code2, 
  Sparkles, 
  BarChart3, 
  Palette, 
  Target, 
  Megaphone,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { TactileCard } from "@/components/ui/TactileCard";

interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  features: string[];
  likes: number;
  featured?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "web-arch",
    badge: "Engineering",
    title: "Performance Web Architecture",
    description: "Ultra-fast Next.js web applications, headless CMS platforms, and tactile web interfaces engineered for maximum scalability.",
    icon: <Code2 className="w-6 h-6 text-[#00144A]" />,
    tags: ["Next.js", "TypeScript", "Tailwind", "Edge Compute"],
    features: ["Sub-500ms TTFB", "100/100 Lighthouse", "Bespoke Design Systems"],
    likes: 42,
    featured: true,
  },
  {
    id: "ai-marketing",
    badge: "Growth Engine",
    title: "AI-Powered Digital Marketing",
    description: "Predictive campaign automation and algorithmic media buying that multiplies customer acquisition efficiency.",
    icon: <Sparkles className="w-6 h-6 text-[#0099BE]" />,
    tags: ["Algorithmic Bidding", "Audience Clustering", "Automated Attribution"],
    features: ["4.2x ROAS Benchmark", "Real-Time Funnel Reallocation", "LTV Maximization"],
    likes: 38,
  },
  {
    id: "seo-growth",
    badge: "Organic Search",
    title: "Hyper-Growth SEO & Content",
    description: "Programmatic search engine dominance, technical indexability audits, and high-intent semantic content clusters.",
    icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
    tags: ["Technical SEO", "Semantic Clustering", "Authority Building"],
    features: ["First-Page Rankings", "Zero-Click Search Capture", "Entity SEO"],
    likes: 29,
  },
  {
    id: "brand-uiux",
    badge: "Creative Studio",
    title: "Brand Identity & Tactile UI/UX",
    description: "Bespoke digital brand identities, responsive component libraries, and tactile micro-interactions that leave an imprint.",
    icon: <Palette className="w-6 h-6 text-[#FF4B72]" />,
    tags: ["Design Systems", "Tactile Micro-UX", "Motion Design"],
    features: ["Complete Brand Bible", "Figma Token Repositories", "Interactive Prototypes"],
    likes: 56,
  },
  {
    id: "cro-funnels",
    badge: "Optimization",
    title: "Scientific Conversion Rate (CRO)",
    description: "Data-backed multivariate split tests, scroll heatmaps, and psychological checkout flows that turn traffic into revenue.",
    icon: <Target className="w-6 h-6 text-indigo-600" />,
    tags: ["Multivariate A/B Testing", "Heatmap Forensics", "Checkout Optimization"],
    features: ["+45% Avg Lift", "Zero Friction Funnels", "Session Replay Insights"],
    likes: 31,
  },
  {
    id: "paid-media",
    badge: "Scale Channel",
    title: "Omnichannel Paid Media & Ads",
    description: "Full-funnel paid media campaigns across Google Search, Meta Ads, LinkedIn B2B, and TikTok video performance engines.",
    icon: <Megaphone className="w-6 h-6 text-amber-600" />,
    tags: ["Google Ads", "Meta Ads", "LinkedIn B2B", "TikTok Performance"],
    features: ["Creative Fatigue Guard", "Granular Retargeting", "Custom Dashboards"],
    likes: 47,
  },
];

export const ServiceGrid: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-slate-100 border border-slate-300 shadow-[0_2px_0_#94a3b8] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />
              <span className="font-outfit text-xs font-bold uppercase tracking-wider text-brand-navy">
                Capabilities & Solutions
              </span>
            </div>
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              Precision Solutions Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] to-[#00D2FF]">
                Unfair Market Advantage.
              </span>
            </h2>
          </div>

          <p className="font-jakarta text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            Every service is architected like a precision instrument—leveraging data-backed mechanics, high-fidelity engineering, and continuous refinement.
          </p>
        </div>

        {/* 6 Tactile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <TactileCard
              key={service.id}
              badge={service.badge}
              icon={service.icon}
              title={service.title}
              description={service.description}
              initialLikes={service.likes}
              showLikeButton={true}
              className="h-full flex flex-col justify-between"
            >
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                {/* Feature checklist */}
                <div className="space-y-1.5">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-jakarta text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0099BE] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-jakarta text-[11px] font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-3 flex items-center justify-between text-xs font-outfit font-bold text-brand-navy group-hover:text-[#0099BE] transition-colors">
                  <span>Explore Architecture</span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-[#00144A] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </TactileCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceGrid;

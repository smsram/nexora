"use client";

import React from "react";
import { Check, Award, Sparkles } from "lucide-react";
import { TactileCard } from "@/components/ui/TactileCard";

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-slate-50/70 dark:bg-[#000517] border-t border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors duration-200">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00D2FF]/10 dark:bg-[#00D2FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Brand Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 shadow-tactile dark:shadow-tactile-dark mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span className="font-outfit text-xs font-bold uppercase tracking-wider text-[#00144A] dark:text-white">
                The Nexora Ethos
              </span>
            </div>

            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-[#00144A] dark:text-white tracking-tight leading-[1.12] mb-6">
              Rejecting Commodity Templates.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                Engineering Tactile Excellence.
              </span>
            </h2>

            <div className="space-y-4 font-jakarta text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              <p>
                The digital landscape is saturated with lookalike websites, generic ad copy, and fragile agency promises. Nexora was founded on a contrary principle: <strong className="text-[#00144A] dark:text-[#00D2FF]">digital platforms should feel as physical, tactile, and deliberate as Swiss horology.</strong>
              </p>
              <p>
                We fuse senior full-stack web engineering with aggressive algorithmic growth marketing. We don&apos;t just deliver clicks or pretty mockups—we engineer revenue pipelines, sub-second web platforms, and unmistakable category authority.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-sm text-[#00144A] dark:text-white">
                    Zero Outsourcing
                  </h4>
                  <p className="font-jakarta text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Direct collaboration with dedicated senior architects and growth leaders.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-[#0099BE] dark:text-[#00D2FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-sm text-[#00144A] dark:text-white">
                    Bespoke Codebases
                  </h4>
                  <p className="font-jakarta text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Proprietary Next.js design systems tailored specifically to your conversion funnel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tactile Proof Card Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TactileCard
              variant="white"
              badge="Scale Metric"
              title="$48.5M+"
              description="Verifiable revenue generated across our portfolio of high-growth partners in the last 24 months."
              initialLikes={84}
            />

            <TactileCard
              variant="cyan"
              badge="Speed Benchmark"
              title="340ms"
              description="Average global load time achieved via edge caching and streamlined React server components."
              initialLikes={62}
            />

            <TactileCard
              variant="navy"
              badge="Retention"
              title="98.2%"
              description="Long-term annual client retention rate driven by transparent weekly ROI attribution dashboards."
              initialLikes={71}
            />

            <TactileCard
              variant="white"
              badge="Execution"
              title="14 Days"
              description="From rapid discovery sprint to production deployment of high-converting enterprise funnels."
              initialLikes={59}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default StorySection;

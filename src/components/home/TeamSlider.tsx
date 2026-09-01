"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Sparkles,
  Award
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  badge: string;
  quote: string;
  bio: string;
  specializations: string[];
  metrics: string;
  image: string;
  avatarBg: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Devon Vance",
    role: "Chief Architect & Co-Founder",
    badge: "Engineering Lead",
    quote: "A website is not an online business card. It is a precision revenue machine with physical mechanics.",
    bio: "Former Lead Infrastructure Engineer at hyper-scale fintechs. Devon oversees Nexora's core Next.js architectural patterns, sub-second latency standards, and custom tactile component systems.",
    specializations: ["Distributed Systems", "Next.js App Router", "Sub-Second UX", "Design Systems"],
    metrics: "12+ Years Enterprise Architecture",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    avatarBg: "bg-gradient-to-br from-[#00144A] to-[#0099BE]",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Head of Growth & Performance Media",
    badge: "Algorithmic Growth",
    quote: "We don't buy cheap traffic. We build self-funding acquisition flywheels that dominate search and social feeds.",
    bio: "Ex-Director of Paid Acquisition for Y-Combinator scaleups. Elena orchestrates multi-million dollar ad deployments, algorithmic retargeting funnels, and predictive LTV campaigns.",
    specializations: ["Algorithmic Media Buying", "B2B LinkedIn Engines", "Predictive Analytics", "High-ROAS Funnels"],
    metrics: "$35M+ Ad Spend Managed",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    avatarBg: "bg-gradient-to-br from-[#00144A] to-[#FF4B72]",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Principal UI/UX & Motion Designer",
    badge: "Design Craftsmanship",
    quote: "Tactility creates trust. When digital surfaces react with weight and friction, customers convert effortlessly.",
    bio: "A veteran of award-winning digital design studios. Marcus leads tactile interface design, micro-interactions, Figma component pipelines, and spatial brand systems at Nexora.",
    specializations: ["Tactile Micro-Interactions", "Framer Motion", "Figma Design Systems", "High-Fidelity Prototyping"],
    metrics: "18+ Global Design Honors",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    avatarBg: "bg-gradient-to-br from-[#00144A] to-[#00D2FF]",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export const TeamSlider: React.FC = () => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    let nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) nextIndex = teamMembers.length - 1;
    if (nextIndex >= teamMembers.length) nextIndex = 0;
    setPage([nextIndex, newDirection]);
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <section id="team" className="py-24 bg-white dark:bg-[#000517] relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-slate-100 dark:bg-[#001133] border border-slate-200 dark:border-slate-800 shadow-[0_2px_0_#94a3b8] dark:shadow-[0_2px_0_#00030d] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#0099BE]" />
              <span className="font-outfit text-xs font-bold uppercase tracking-wider text-[#00144A] dark:text-white">
                Leadership & Craft
              </span>
            </div>
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-[#00144A] dark:text-white tracking-tight leading-tight">
              Architects Behind the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                Machine.
              </span>
            </h2>
          </div>

          {/* Navigation Arrows with Tactile Mechanics */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="tactile-btn tactile-btn-white p-3 rounded-2xl"
              aria-label="Previous Team Member"
            >
              <ChevronLeft className="w-5 h-5 text-[#00144A] dark:text-white" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="tactile-btn tactile-btn-navy p-3 rounded-2xl"
              aria-label="Next Team Member"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[480px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 350, damping: 30 },
                opacity: { duration: 0.25 },
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#001133] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-tactile dark:shadow-tactile-dark p-6 sm:p-10 lg:p-12"
            >
              {/* Left: Image / Portrait Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-[0_5px_0_#000B2B] dark:shadow-[0_5px_0_#00030d] overflow-hidden bg-slate-900 group">
                  <Image
                    src={currentMember.image}
                    alt={currentMember.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00144A] via-transparent to-transparent opacity-70" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="tactile-key-pill uppercase tracking-wider text-[11px] bg-white/90 dark:bg-[#001133]/90 backdrop-blur-md">
                      {currentMember.badge}
                    </span>
                  </div>

                  {/* Bottom Portrait Name Strip */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-outfit text-xl font-bold text-white leading-tight">
                      {currentMember.name}
                    </h3>
                    <p className="font-jakarta text-xs text-[#00D2FF]">
                      {currentMember.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Bio & Editorial Quote */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                {/* Quote */}
                <div className="relative pl-6 border-l-4 border-[#00D2FF]">
                  <Quote className="w-8 h-8 text-[#00D2FF]/40 absolute -top-4 -left-3 rotate-180" />
                  <p className="font-outfit text-xl sm:text-2xl font-bold text-[#00144A] dark:text-white italic leading-snug">
                    &quot;{currentMember.quote}&quot;
                  </p>
                </div>

                {/* Biography */}
                <p className="font-jakarta text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {currentMember.bio}
                </p>

                {/* Specialization Tags */}
                <div>
                  <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    Core Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentMember.specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-[#00144A] dark:text-white font-jakarta text-xs font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metric Strip & Slider Indicators */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#0099BE]" />
                    <span className="font-outfit font-bold text-xs text-[#00144A] dark:text-white">
                      {currentMember.metrics}
                    </span>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-2">
                    {teamMembers.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPage([idx, idx > currentIndex ? 1 : -1])}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-200 ${
                          idx === currentIndex
                            ? "w-8 bg-[#00144A] dark:bg-[#00D2FF]"
                            : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default TeamSlider;

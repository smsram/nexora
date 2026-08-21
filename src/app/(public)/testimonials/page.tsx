"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  Heart,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Quote,
  CheckCircle2,
} from "lucide-react";

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  industry: string;
  avatarInitials: string;
  rating: number;
  headlineQuote: string;
  fullReview: string;
  outcomes: Array<{ metric: string; label: string }>;
  videoDuration: string;
  videoPosterGradient: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "alexandra-vance-saas",
    clientName: "Alexandra Vance",
    clientRole: "Chief Marketing Officer",
    companyName: "Hyperion AI Platform",
    industry: "SaaS & AI",
    avatarInitials: "AV",
    rating: 5,
    headlineQuote:
      "Nexora rebuilt our entire enterprise web architecture from scratch. Our signup conversion rate surged by 140% in the first 45 days.",
    fullReview:
      "Before partnering with Nexora, our demo booking flow was suffering from severe latency and fragmented ad tracking. Their engineering team migrated us to a bespoke Next.js 14 stack with edge-rendered landing variants. Combined with their programmatic search clusters, our organic pipeline is now our #1 revenue driver.",
    outcomes: [
      { metric: "+140%", label: "Demo Conversion Surge" },
      { metric: "38ms", label: "Global Edge TTFB" },
      { metric: "$2.8M", label: "Attributed ARR" },
    ],
    videoDuration: "0:52",
    videoPosterGradient: "from-blue-900 via-indigo-950 to-[#00144A]",
  },
  {
    id: "david-sterling-ecom",
    clientName: "David Sterling",
    clientRole: "Founder & CEO",
    companyName: "Sterling Atelier Luxury",
    industry: "Luxury E-Commerce",
    avatarInitials: "DS",
    rating: 5,
    headlineQuote:
      "Their media buying engine scaled our blended ROAS from 2.1x to 4.8x while reducing our customer acquisition cost by 32%.",
    fullReview:
      "The precision of Nexora's creative testing matrix is unlike any agency we've ever worked with. They don't guess—they test 30+ hook variants weekly and deploy first-party server CAPI tracking that bypassed all our iOS attribution headaches. Truly world-class operators.",
    outcomes: [
      { metric: "4.8x", label: "Blended Paid ROAS" },
      { metric: "-32%", label: "CAC Reduction" },
      { metric: "$1.4M", label: "Q2 Net Revenue" },
    ],
    videoDuration: "1:15",
    videoPosterGradient: "from-slate-900 via-cyan-950 to-[#00144A]",
  },
  {
    id: "sarah-lin-fintech",
    clientName: "Sarah Lin",
    clientRole: "VP of Growth & Strategy",
    companyName: "CapTable Fintech Systems",
    industry: "Fintech & B2B",
    avatarInitials: "SL",
    rating: 5,
    headlineQuote:
      "The tactile keypress UI they designed for our loan calculator increased completion rates by 64%.",
    fullReview:
      "In fintech, every micro-friction kills conversion momentum. Nexora applied their tactile design system to our multi-step qualification funnel. Users love the instant mechanical feedback, and our enterprise sales team has never had a richer inbound pipeline.",
    outcomes: [
      { metric: "+64%", label: "Funnel Completion Lift" },
      { metric: "$18M+", label: "Loan Pipeline Originated" },
      { metric: "99.99%", label: "Platform Uptime SLA" },
    ],
    videoDuration: "0:48",
    videoPosterGradient: "from-indigo-950 via-slate-900 to-[#00144A]",
  },
  {
    id: "marcus-thorne-biotech",
    clientName: "Dr. Marcus Thorne",
    clientRole: "Managing Director",
    companyName: "Aetheria Biotech Lab",
    industry: "Healthcare & Biotech",
    avatarInitials: "MT",
    rating: 5,
    headlineQuote:
      "Programmatic SEO and HIPAA-compliant patient intake architecture delivered with surgical precision.",
    fullReview:
      "Finding an engineering partner that understands strict regulatory compliance while delivering state-of-the-art web performance is nearly impossible. Nexora exceeded all expectations—ranking us #1 for over 450 high-intent clinical trial search terms.",
    outcomes: [
      { metric: "#1 Rank", label: "450+ Search Queries" },
      { metric: "+310%", label: "Intake Bookings" },
      { metric: "100%", label: "HIPAA Compliant" },
    ],
    videoDuration: "1:04",
    videoPosterGradient: "from-teal-950 via-blue-950 to-[#00144A]",
  },
];

const categories = [
  "All Verdicts",
  "SaaS & AI",
  "Luxury E-Commerce",
  "Fintech & B2B",
  "Healthcare & Biotech",
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Verdicts");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const togglePlay = (id: string) => {
    setPlayingVideoId((prev) => (prev === id ? null : id));
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredTestimonials =
    selectedCategory === "All Verdicts"
      ? testimonialsData
      : testimonialsData.filter((item) => item.industry === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header & Verified Trust Metrics */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
              Executive Testimonials & Verified Case Verdicts
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] tracking-tight leading-[1.1] mb-6">
              Client Verdicts & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                Verified Impact.
              </span>
            </h1>
            <p className="font-jakarta text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Real results from verified enterprise founders, CMOs, and growth directors scaling with Nexora&apos;s tactile web platforms and algorithmic media engines.
            </p>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-tactile">
              <div className="font-outfit text-3xl font-black text-[#00144A] mb-1">
                99.4%
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Client SLA Retention
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-tactile">
              <div className="font-outfit text-3xl font-black text-[#00144A] mb-1">
                4.2x
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Average ROAS Surge
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-tactile">
              <div className="font-outfit text-3xl font-black text-[#00144A] mb-1">
                150+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Platforms Delivered
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#00144A] text-white border border-[#00D2FF]/40 shadow-tactile">
              <div className="font-outfit text-3xl font-black text-[#00D2FF] mb-1">
                $45M+
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Client Revenue Scaled
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-10 pb-2 scrollbar-none">
            {categories.map((cat) => {
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

      {/* Split-Layout Bento Testimonials Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredTestimonials.map((item) => {
          const isPlaying = playingVideoId === item.id;
          const isLiked = likedReviews[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-tactile hover:shadow-tactile-hover transition-all duration-300 flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch"
            >
              {/* Left 50%: Video Reel Container */}
              <div className="w-full lg:w-[45%] flex-shrink-0">
                <div
                  className={`relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${item.videoPosterGradient} text-white p-6 flex flex-col justify-between border border-slate-800 shadow-inner group`}
                >
                  {/* Top Video Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#000B2B]/80 text-[#00D2FF] border border-[#00D2FF]/40 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Founder Reel
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-black/60 text-slate-300 backdrop-blur-sm">
                      {item.videoDuration}
                    </span>
                  </div>

                  {/* Center Play/Pause Trigger & Simulated Video State */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                    <button
                      onClick={() => togglePlay(item.id)}
                      type="button"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00D2FF] text-[#00144A] flex items-center justify-center shadow-[0_0_25px_rgba(0,210,255,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer mb-3"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7 fill-[#00144A]" />
                      ) : (
                        <Play className="w-7 h-7 fill-[#00144A] translate-x-0.5" />
                      )}
                    </button>

                    <div className="text-xs font-bold text-slate-200 tracking-wide uppercase">
                      {isPlaying ? "Playing Executive Reel" : "Watch Full Video Verdict"}
                    </div>
                  </div>

                  {/* Simulated Waveform & Audio Controls */}
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1 h-3 rounded-full ${isPlaying ? "bg-[#00D2FF] animate-pulse" : "bg-white/40"}`} />
                      <span className={`w-1 h-5 rounded-full ${isPlaying ? "bg-[#00D2FF] animate-pulse delay-75" : "bg-white/40"}`} />
                      <span className={`w-1 h-4 rounded-full ${isPlaying ? "bg-[#00D2FF] animate-pulse delay-150" : "bg-white/40"}`} />
                      <span className={`w-1 h-6 rounded-full ${isPlaying ? "bg-[#00D2FF] animate-pulse" : "bg-white/40"}`} />
                      <span className="text-[11px] text-slate-300 font-mono ml-2">
                        {isPlaying ? "Live Audio Stream" : "Muted Preview"}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      type="button"
                      className="p-1.5 rounded-lg bg-black/40 text-slate-300 hover:text-white"
                      aria-label="Toggle mute"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 50%: Endorsement & Quantified Results */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Bar: Stars + Like Button */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, rIdx) => (
                        <Star
                          key={rIdx}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                      <span className="ml-2 text-xs font-bold text-slate-600">
                        5.0 Verified Rating
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleLike(e, item.id)}
                      type="button"
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#FF4B72] hover:border-[#FF4B72]/40 transition-all focus:outline-none"
                      aria-label="Bookmark review"
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

                  {/* Headline Pull Quote */}
                  <div className="relative mb-4">
                    <Quote className="w-8 h-8 text-[#0099BE]/20 absolute -top-4 -left-2 pointer-events-none" />
                    <h3 className="font-outfit text-xl sm:text-2xl font-extrabold text-[#00144A] tracking-tight leading-snug">
                      &ldquo;{item.headlineQuote}&rdquo;
                    </h3>
                  </div>

                  {/* Full Client Review Text */}
                  <p className="font-jakarta text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {item.fullReview}
                  </p>

                  {/* Key Outcome Metric Pills */}
                  <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    {item.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="text-center sm:text-left">
                        <div className="font-outfit text-lg sm:text-xl font-black text-[#00144A]">
                          {outcome.metric}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-[#0099BE] uppercase tracking-wider">
                          {outcome.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Profile Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#00144A] text-[#00D2FF] font-outfit font-black text-sm flex items-center justify-center border border-[#00D2FF]/40 shadow-sm flex-shrink-0">
                      {item.avatarInitials}
                    </div>
                    <div>
                      <div className="font-outfit font-bold text-sm text-[#00144A] flex items-center gap-1.5">
                        <span>{item.clientName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {item.clientRole} •{" "}
                        <span className="font-bold text-slate-700">
                          {item.companyName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {item.industry}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Bottom Consultation CTA */}
      <section className="py-20 bg-[#00144A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to write your own verified growth case study?
            </h2>
            <p className="font-jakarta text-slate-300 text-base sm:text-lg">
              Partner with Nexora to engineer your high-converting digital platform and algorithmic media engine.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="tactile-btn tactile-btn-cyan text-sm py-3.5 px-8 flex items-center justify-center gap-2.5 font-bold shadow-lg"
            >
              <span>Schedule Strategic Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

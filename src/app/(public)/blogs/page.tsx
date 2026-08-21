"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  Calendar,
  Heart,
  ArrowRight,
  Sparkles,
  BookOpen,
  Send,
  CheckCircle2,
} from "lucide-react";
import PaperModal, { BlogPost } from "@/components/blogs/PaperModal";

const blogPostsData: BlogPost[] = [
  {
    id: "sub-50ms-ttfb-ecommerce",
    title: "Why Sub-50ms TTFB is the New Conversion Standard for High-Growth E-Commerce",
    excerpt:
      "A deep technical breakdown of edge rendering, ISR caching, and zero-bundle hydration strategies that yielded a +34% lift in completed checkout rates.",
    category: "Web Engineering",
    readTime: "6 min read",
    publishedAt: "Aug 18, 2026",
    author: {
      name: "Marcus Vance",
      role: "Lead Performance Architect",
      avatarInitials: "MV",
    },
    gradient: "from-blue-900 via-indigo-950 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "In modern digital commerce, milliseconds represent direct revenue leaks. Every additional 100ms of latency at the edge introduces a measurable 1.1% drop-off in completed checkout transactions. Standard monolithic architectures and bloated single-page applications struggle to hit under 300ms Time-to-First-Byte (TTFB) on global CDN nodes.",
      },
      {
        type: "heading",
        text: "The Edge-Rendering Paradigm in Next.js 14",
      },
      {
        type: "paragraph",
        text: "By migrating from standard containerized Node.js clusters to Vercel's global edge runtime combined with Incremental Static Regeneration (ISR), we pre-compute 95% of static marketing layouts at the edge while streaming dynamic personalized price tags via React Server Components (RSC).",
      },
      {
        type: "quote",
        text: "Speed is not merely a feature—it is the foundational prerequisite of user trust and conversion momentum.",
        author: "Marcus Vance, Nexora Engineering",
      },
      {
        type: "callout",
        text: "Migrating to Edge RSC reduced our average First Contentful Paint (FCP) from 1.4s to 0.28s across 40 global regions.",
      },
      {
        type: "heading",
        text: "Key Architectural Implementations",
      },
      {
        type: "bullet_list",
        items: [
          "Zero-JavaScript static hero pre-rendering for instant perceptual load.",
          "Sub-resource integrity and critical CSS inlining to eliminate render-blocking waterfalls.",
          "Selective client component hydration using Framer Motion layoutId boundaries.",
        ],
      },
      {
        type: "paragraph",
        text: "When combined with a tactile, keypress-inspired design system, user interaction velocity surges. Visitors feel immediate tactile confirmation with zero perceptual input lag.",
      },
    ],
  },
  {
    id: "meta-capi-server-tagging",
    title: "The Death of Third-Party Cookies: Mastering Meta CAPI & Server-Side Tagging",
    excerpt:
      "How we engineered resilient first-party data pipelines that restored 99.2% ad attribution accuracy and lowered blended CAC by 28%.",
    category: "Ad Performance",
    readTime: "8 min read",
    publishedAt: "Aug 12, 2026",
    author: {
      name: "Elena Rostova",
      role: "Head of Algorithmic Media",
      avatarInitials: "ER",
    },
    gradient: "from-slate-900 via-cyan-950 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "Browser-side pixel tracking has lost up to 40% of signal fidelity due to ad blockers, private relay proxies, and strict intelligent tracking prevention (ITP). Brands relying solely on browser events are essentially flying blind on paid ad platforms.",
      },
      {
        type: "heading",
        text: "Building the First-Party Server Pipeline",
      },
      {
        type: "paragraph",
        text: "The solution is direct server-to-server synchronization. By routing transaction webhooks and user interactions through a dedicated Google Cloud Server Tag Manager container directly to the Meta Conversions API (CAPI), events are authenticated via first-party domain cookies.",
      },
      {
        type: "callout",
        text: "Implementing Server CAPI with advanced event deduplication restored attribution match quality from 4.8/10 to 9.2/10 in under 14 days.",
      },
      {
        type: "heading",
        text: "Algorithmic Media Buying Impact",
      },
      {
        type: "paragraph",
        text: "With high-fidelity purchase signals flowing back into the bidding algorithm, Meta's Advantage+ campaign architecture can accurately locate high-LTV purchasers rather than burning ad spend on low-intent clickers.",
      },
    ],
  },
  {
    id: "programmatic-seo-nextjs",
    title: "Programmatic SEO in Next.js 14: Generating 10,000 High-Intent Landing Pages",
    excerpt:
      "A step-by-step blueprint for building automated, indexable programmatic content hubs that captured +240% organic traffic.",
    category: "SEO Tactics",
    readTime: "7 min read",
    publishedAt: "Aug 06, 2026",
    author: {
      name: "Devon Chen",
      role: "SEO & Growth Systems Lead",
      avatarInitials: "DC",
    },
    gradient: "from-blue-950 via-teal-950 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "Traditional manual copywriting cannot keep up with thousands of long-tail search variations. Programmatic SEO enables engineering teams to construct dynamic metadata and content templates that automatically ingest database entities to generate thousands of unique, high-value landing pages.",
      },
      {
        type: "heading",
        text: "Next.js generateStaticParams at Scale",
      },
      {
        type: "paragraph",
        text: "Using Next.js App Router dynamic routes with generateStaticParams, we build out entire directory trees with structured JSON-LD schemas, breadcrumb graphs, and dynamic OpenGraph preview images on demand.",
      },
      {
        type: "quote",
        text: "Programmatic SEO succeeds when the dynamic page provides genuinely superior structured data compared to generic top-10 listicles.",
        author: "Devon Chen, Nexora",
      },
      {
        type: "bullet_list",
        items: [
          "Automated schema graph generation for rich Google SERP snippet eligibility.",
          "Dynamic OpenGraph image generation using Next.js @vercel/og at the edge.",
          "Automated canonical link generation to prevent duplicate content penalties.",
        ],
      },
    ],
  },
  {
    id: "tactile-design-systems",
    title: "Tactile UI/UX Design: Why Keyboard-Key Physics Increase Engagement by 42%",
    excerpt:
      "Exploring the psychology of tactile feedback, mechanical spring damping, and physical button depression in high-converting SaaS interfaces.",
    category: "Design Systems",
    readTime: "5 min read",
    publishedAt: "Jul 29, 2026",
    author: {
      name: "Marcus Vance",
      role: "Lead Performance Architect",
      avatarInitials: "MV",
    },
    gradient: "from-indigo-950 via-slate-900 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "Flat, generic web templates have stripped web interfaces of tactile joy. When every button looks like a flat pastel rectangle, users interact passively. Tactile design reintroduces subtle 3D depth, bottom keycap shadows, and instant mechanical feedback.",
      },
      {
        type: "heading",
        text: "The Biomechanics of Visual Depression",
      },
      {
        type: "paragraph",
        text: "By pairing a subtle bottom border shadow (box-shadow: 0 6px 0 #000B2B) with an active translate-y depression on click, users receive immediate perceptual confirmation that their action has been registered.",
      },
      {
        type: "callout",
        text: "Tactile card systems achieved a 42% higher click-through rate on primary pricing tables compared to flat outline cards.",
      },
    ],
  },
  {
    id: "algorithmic-funnel-roas",
    title: "Algorithmic Funnel Architecture: Tripling ROAS with Dynamic Hook Testing",
    excerpt:
      "The rapid creative matrix strategy we use to test 30+ angle variations weekly without blowing media budgets.",
    category: "Ad Performance",
    readTime: "9 min read",
    publishedAt: "Jul 21, 2026",
    author: {
      name: "Elena Rostova",
      role: "Head of Algorithmic Media",
      avatarInitials: "ER",
    },
    gradient: "from-slate-950 via-blue-900 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "In algorithmic media buying, creative is your targeting. Media buyers no longer win by fiddling with complex interest overlaps; they win by producing hyper-relevant creative hooks that force the algorithm to identify the optimal consumer cohort.",
      },
      {
        type: "heading",
        text: "The 3x3 Creative Iteration Matrix",
      },
      {
        type: "paragraph",
        text: "We test 3 distinct problem-aware hooks against 3 visual pacing variants, resulting in 9 dynamic assets per testing batch. Only winners with sub-$1.20 Cost Per Unique Click (CPUC) graduate to scaling ad sets.",
      },
    ],
  },
  {
    id: "checkout-micro-frictions",
    title: "Bypassing Checkout Drop-Offs: 7 Biometric Micro-Frictions Hurting Your CRO",
    excerpt:
      "Biometric heatmap telemetry reveals the exact form field mistakes and layout micro-frictions that cost online businesses millions annually.",
    category: "Conversion Architecture",
    readTime: "6 min read",
    publishedAt: "Jul 15, 2026",
    author: {
      name: "Devon Chen",
      role: "SEO & Growth Systems Lead",
      avatarInitials: "DC",
    },
    gradient: "from-cyan-950 via-slate-900 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "Over 68% of shopping carts and lead forms are abandoned during the final checkout step. The majority of these losses stem not from price hesitation, but from unexpected cognitive micro-friction.",
      },
      {
        type: "heading",
        text: "The 7 Deadly Checkout Frictions",
      },
      {
        type: "bullet_list",
        items: [
          "Forced account creation before payment method selection.",
          "Lack of explicit auto-fill optimization for mobile keyboards.",
          "Hidden shipping or fee recalculations after card entry.",
          "Missing visual trust badges directly beneath the primary purchase CTA.",
        ],
      },
    ],
  },
];

const blogCategories = [
  "All Articles",
  "Web Engineering",
  "Ad Performance",
  "SEO Tactics",
  "Design Systems",
  "Conversion Architecture",
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReadingModal, setActiveReadingModal] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Articles" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Paper-Like Reading Modal with layoutId */}
      <PaperModal
        post={activeReadingModal}
        onClose={() => setActiveReadingModal(null)}
      />

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                Technical Publications & Growth Telemetry
              </span>
              <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] tracking-tight leading-[1.1] mb-4">
                Algorithmic Growth & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                  Engineering Insights
                </span>
              </h1>
              <p className="font-jakarta text-slate-600 text-base sm:text-lg leading-relaxed">
                Technical blueprints, media buying frameworks, and tactile design paradigms documented by the architects and growth engineers at Nexora.
              </p>
            </div>

            {/* Live Search Input Bar */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, tactics, tags..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-[#00144A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-10 pb-2 scrollbar-none">
            {blogCategories.map((cat) => {
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

      {/* Bento Blog Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-outfit text-xl font-bold text-[#00144A] mb-2">
              No matching articles found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Try adjusting your search query or selecting &quot;All Articles&quot; to browse our full archive.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Articles");
                setSearchQuery("");
              }}
              type="button"
              className="tactile-btn tactile-btn-navy text-xs py-2 px-5"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => {
              const isLiked = likedPosts[post.id];
              return (
                <motion.div
                  key={post.id}
                  layoutId={`blog-card-${post.id}`}
                  onClick={() => setActiveReadingModal(post)}
                  whileHover={{ y: -4 }}
                  whileTap={{ y: 2 }}
                  className="group relative bg-white border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-tactile hover:shadow-tactile-hover transition-all duration-200 cursor-pointer select-none overflow-hidden"
                >
                  <div>
                    {/* Top Meta: Category + Like Button */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200">
                        {post.category}
                      </span>

                      {/* Interactive Like Button */}
                      <button
                        onClick={(e) => toggleLike(e, post.id)}
                        type="button"
                        className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-[#FF4B72] hover:border-[#FF4B72]/40 transition-all focus:outline-none"
                        aria-label="Like article"
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

                    {/* Article Title */}
                    <h3 className="font-outfit text-xl sm:text-2xl font-bold text-[#00144A] tracking-tight leading-snug mb-3 group-hover:text-[#0099BE] transition-colors">
                      {post.title}
                    </h3>

                    {/* Article Excerpt */}
                    <p className="font-jakarta text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Bottom Meta & Author Card */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#00144A] text-[#00D2FF] font-outfit font-black text-xs flex items-center justify-center border border-[#00D2FF]/40 shadow-sm flex-shrink-0">
                        {post.author.avatarInitials}
                      </div>
                      <div>
                        <div className="font-outfit font-bold text-xs text-[#00144A]">
                          {post.author.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {post.publishedAt} • {post.readTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#00144A] group-hover:text-[#00D2FF] transition-colors">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Architecture Digest Newsletter CTA Banner */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-tactile">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0099BE] border border-slate-200 mb-4 shadow-sm">
              Weekly Technical Telemetry
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-[#00144A] tracking-tight mb-3">
              Subscribe to the Nexora Growth Digest
            </h2>
            <p className="font-jakarta text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Every Tuesday, we publish one tactical breakdown of paid ad arbitrage, Next.js performance optimizations, or conversion rate experiments. Zero spam.
            </p>

            {newsletterSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>You are subscribed! Welcome to the architecture digest.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your work email address..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00144A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto tactile-btn tactile-btn-navy text-xs py-3 px-6 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

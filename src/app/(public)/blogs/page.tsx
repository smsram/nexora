"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";
import PaperModal, { BlogPost } from "@/components/blogs/PaperModal";
import FilterPill from "@/components/ui/FilterPill";

const blogPostsData: BlogPost[] = [
  {
    id: "sub-50ms-web-architecture",
    title: "Sub-50ms Web Architecture: How We Scaled Next.js App Router for 10M+ Requests",
    excerpt:
      "A deep technical breakdown of edge streaming, granular ISR, and cache tag invalidation strategies that deliver instant page transitions at global scale.",
    category: "Architecture",
    readTime: "8 min read",
    publishedAt: "Aug 12, 2026",
    author: {
      name: "Marcus Vance",
      role: "Lead Performance Architect",
      avatarInitials: "MV",
    },
    gradient: "from-blue-900 via-indigo-950 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "In modern web engineering, speed is not merely a metric—it is the direct multiplier of conversion rate and user retention. Over the past six months, we re-architected our client deployment pipelines to target a strict sub-50ms Time-to-First-Byte (TTFB) globally.",
      },
      {
        type: "heading",
        text: "The Edge Streaming Paradigm",
      },
      {
        type: "paragraph",
        text: "Traditional monolithic server-side rendering forces the user to wait for the entire data payload before any HTML is sent down the wire. By decoupling slow database queries into Suspense boundaries with React Server Components, we stream critical UI scaffolds in under 20ms.",
      },
      {
        type: "callout",
        text: "Key Takeaway: Never block the root layout render on asynchronous database calls. Isolate dynamic slots with streaming boundaries.",
      },
      {
        type: "callout",
        text: "Architecture Example: Isolate data queries within React Server Component streaming boundaries to unlock sub-20ms first paint metrics.",
      },
      {
        type: "heading",
        text: "Granular Incremental Static Regeneration (ISR)",
      },
      {
        type: "paragraph",
        text: "Using Next.js revalidateTag APIs, we eliminate cache thrashing by only invalidating modified sub-trees rather than purging entire CDN deployments on content updates.",
      },
    ],
  },
  {
    id: "programmatic-seo-scale",
    title: "The Programmatic SEO Blueprint: 0 to 450,000 Monthly Organic Visitors",
    excerpt:
      "How to build high-intent semantic keyword engines using structured JSON-LD schemas, dynamic routes, and automated topical cluster graphs.",
    category: "SEO Strategy",
    readTime: "11 min read",
    publishedAt: "Aug 04, 2026",
    author: {
      name: "Devon Chen",
      role: "SEO & Growth Systems Lead",
      avatarInitials: "DC",
    },
    gradient: "from-teal-950 via-slate-900 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "Traditional SEO content publishing is too slow to capture massive long-tail search intent. By combining headless CMS datasets with Next.js dynamic routing, we programmatically generated 12,000 indexable landing pages with 100% unique schema graphs.",
      },
      {
        type: "heading",
        text: "Topical Authority Clustering",
      },
      {
        type: "paragraph",
        text: "Search algorithms reward comprehensive domain depth. Rather than targeting isolated head keywords, build dense semantic clusters where child pages reinforce the topical authority of master pillar pages.",
      },
      {
        type: "bullet_list",
        items: [
          "Automated JSON-LD schema generation with BreadcrumbList and FAQPage entities.",
          "Dynamic canonical link injection to prevent duplicate parameter penalties.",
          "Zero-latency edge pre-rendering for Googlebot instant crawling.",
        ],
      },
    ],
  },
  {
    id: "tactile-bento-design-systems",
    title: "Tactile Bento Design Systems: Why Physicality Converts Better Than Flat Minimalism",
    excerpt:
      "Exploring the psychological mechanics of 3D keycap button depression, subtle micro-shadows, and tactile UI feedback on modern web conversion funnels.",
    category: "Design & UX",
    readTime: "7 min read",
    publishedAt: "Jul 28, 2026",
    author: {
      name: "Sophia Sterling",
      role: "Principal Product Designer",
      avatarInitials: "SS",
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
  {
    id: "server-side-capi-scale",
    title: "First-Party Server-Side CAPI: Bypassing iOS 14.5+ Attribution Blindspots",
    excerpt:
      "Why browser-side tracking pixels are obsolete and how direct Google Tag Manager Cloud CAPI pipelines restore 99%+ attribution accuracy.",
    category: "Architecture",
    readTime: "10 min read",
    publishedAt: "Jul 08, 2026",
    author: {
      name: "Marcus Vance",
      role: "Lead Performance Architect",
      avatarInitials: "MV",
    },
    gradient: "from-blue-950 via-indigo-900 to-[#00144A]",
    contentBlocks: [
      {
        type: "paragraph",
        text: "With browser tracking prevention (ITP) and ad-blockers neutralizing up to 35% of client-side tracking pixels, media buying without server-side attribution is operating blindfolded.",
      },
      {
        type: "heading",
        text: "Server-to-Server Conversions API Architecture",
      },
      {
        type: "paragraph",
        text: "By provisioning a dedicated Google Cloud server container that authenticates transaction events directly to Meta and Google Ads APIs, we achieved a 9.4/10 Event Match Quality score.",
      },
    ],
  },
];

const blogCategories = [
  "All Articles",
  "Architecture",
  "SEO Strategy",
  "Ad Performance",
  "Design & UX",
  "Conversion Architecture",
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReadingModal, setActiveReadingModal] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Articles" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000517] text-[#00144A] dark:text-white transition-colors duration-200">
      {/* Paper-Like Reading Modal with layoutId */}
      <PaperModal
        post={activeReadingModal}
        onClose={() => setActiveReadingModal(null)}
      />

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-[#000517] dark:via-[#000517] dark:to-[#000517] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#001133] text-[#0099BE] border border-slate-200 dark:border-slate-800 mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                Technical Publications & Growth Telemetry
              </span>
              <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] dark:text-white tracking-tight leading-[1.1] mb-4">
                Algorithmic Growth & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                  Engineering Insights
                </span>
              </h1>
              <p className="font-jakarta text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills with 0.5s White Line Flash */}
          <div className="flex items-center gap-2 overflow-x-auto pt-10 pb-2 scrollbar-none">
            {blogCategories.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bento Blog Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 dark:bg-[#001133] rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-outfit text-xl font-bold text-[#00144A] dark:text-white mb-2">
              No matching articles found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
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
              return (
                <motion.div
                  key={post.id}
                  layoutId={`blog-card-${post.id}`}
                  onClick={() => setActiveReadingModal(post)}
                  whileHover={{ y: -4 }}
                  whileTap={{ y: 2 }}
                  className="group relative bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 rounded-3xl p-7 flex flex-col justify-between shadow-tactile dark:shadow-tactile-dark hover:shadow-tactile-hover transition-all duration-200 cursor-pointer select-none overflow-hidden"
                >
                  <div>
                    {/* Top Meta: Category */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#000517] text-[#0099BE] border border-slate-200 dark:border-slate-800">
                        {post.category}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-outfit text-xl sm:text-2xl font-bold text-[#00144A] dark:text-white tracking-tight leading-snug mb-3 group-hover:text-[#00D2FF] transition-colors">
                      {post.title}
                    </h3>

                    {/* Article Excerpt */}
                    <p className="font-jakarta text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Bottom Meta & Author Card */}
                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#00144A] dark:bg-[#000517] text-[#00D2FF] font-outfit font-black text-xs flex items-center justify-center border border-[#00D2FF]/40 shadow-sm flex-shrink-0">
                        {post.author.avatarInitials}
                      </div>
                      <div>
                        <div className="font-outfit font-bold text-xs text-[#00144A] dark:text-white">
                          {post.author.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {post.publishedAt}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-[#0099BE]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Newsletter Digest Subscription Bento Box */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#00144A] dark:bg-[#001133] rounded-3xl border border-[#002277] dark:border-slate-800 p-8 sm:p-12 shadow-tactile dark:shadow-tactile-dark text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#00D2FF]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#00D2FF] border border-[#00D2FF]/30 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Weekly Growth Telemetry
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-2">
              Subscribe to the Nexora Architectural Digest
            </h2>
            <p className="font-jakarta text-slate-300 text-sm sm:text-base leading-relaxed">
              Every Tuesday, we deliver zero-fluff breakdowns of Next.js edge caching paradigms, first-party CAPI scripts, and high-ROAS ad angles.
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto flex-shrink-0">
            {isSubscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-outfit text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You&apos;re subscribed to weekly growth telemetry.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#00D2FF] min-w-[260px]"
                />
                <button
                  type="submit"
                  className="tactile-btn tactile-btn-cyan text-xs py-3 px-6 flex items-center justify-center gap-2 font-bold whitespace-nowrap"
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

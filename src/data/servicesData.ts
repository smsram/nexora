export interface ServiceItem {
  id: string;
  slug: string; // e.g., 'web-architecture'
  title: string;
  category: string; // e.g., 'ENGINEERING'
  description: string;
  checkpoints: string[]; // Exactly 3 short bullet points for the card front
  deliverables: { title: string; description: string }[]; // For the expanded modal
  techStack: string[]; // e.g., ['Next.js 14', 'TypeScript', 'Tailwind']
  iconName: string; // Lucide icon identifier
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-architecture",
    slug: "web-architecture",
    title: "Full-Stack Web Architecture",
    category: "ENGINEERING",
    description:
      "Enterprise Next.js web applications, headless commerce systems, and ultra-low latency frontend architectures engineered for speed.",
    checkpoints: [
      "Sub-50ms Global TTFB on Edge",
      "100/100 Lighthouse Performance",
      "Bespoke Tactile Component Systems",
    ],
    deliverables: [
      {
        title: "Next.js 14 Server-Side Edge Architecture",
        description: "App router architecture with streaming SSR, dynamic ISR caching, and edge-rendered middleware.",
      },
      {
        title: "Custom Tactile UI/UX Design System",
        description: "Tailored component library with Framer Motion spring physics, dark mode tokens, and zero generic boilerplate.",
      },
      {
        title: "Headless CMS & Commerce API Orchestration",
        description: "Unified GraphQL & REST data layers integrating Sanity, Strapi, or Shopify Storefront APIs.",
      },
      {
        title: "CI/CD & Lighthouse Performance Guarantee",
        description: "Automated regression testing, bundle size budgets, and zero-compromise Core Web Vitals score.",
      },
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GraphQL", "Vercel Edge"],
    iconName: "Code2",
  },
  {
    id: "paid-acquisition",
    slug: "paid-acquisition",
    title: "High-ROAS Paid Acquisition",
    category: "GROWTH ENGINE",
    description:
      "Multi-channel performance marketing engines spanning Meta, Google Ads, TikTok, and algorithmic retargeting architectures.",
    checkpoints: [
      "4.2x Client ROAS Performance Floor",
      "Real-Time Dynamic Budget Reallocation",
      "Server-Side First-Party CAPI Tracking",
    ],
    deliverables: [
      {
        title: "Multi-Platform Media Buying Strategy",
        description: "Full-funnel campaign architecture across Meta Ads, Google Search/PMax, TikTok, and LinkedIn.",
      },
      {
        title: "Dynamic Creative Hook Testing Pipeline",
        description: "High-velocity 3x3 creative testing matrix with tailored motion graphics, static angles, and copy variations.",
      },
      {
        title: "First-Party Server-Side Tracking (CAPI)",
        description: "Mitigate signal loss with Meta Conversions API and server-side Google Tag Manager containers.",
      },
      {
        title: "Live Attributed Revenue Dashboards",
        description: "Consolidated multi-touch attribution analytics connecting ad spend directly to bottom-line revenue.",
      },
    ],
    techStack: ["Meta Ads Manager", "Google Ads Scripts", "TikTok Ads", "Triple Whale", "Server GTM", "Looker Studio"],
    iconName: "TrendingUp",
  },
  {
    id: "algorithmic-seo",
    slug: "algorithmic-seo",
    title: "Hyper-Growth SEO & Content",
    category: "ORGANIC SEARCH",
    description:
      "High-intent keyword dominance, programmatic content generation systems, and technical JSON-LD schema graphs.",
    checkpoints: [
      "First-Page High-Intent Search Rankings",
      "AI Search Overview & Snippet Capture",
      "Programmatic Long-Tail Directory Pages",
    ],
    deliverables: [
      {
        title: "Technical Indexability & Core Web Vitals Audit",
        description: "Eradicate crawl budget waste, broken canonical chains, and rendering bottlenecks sitewide.",
      },
      {
        title: "Programmatic SEO Directory Architecture",
        description: "Dynamic Next.js template systems generating hundreds of indexable, high-intent landing pages.",
      },
      {
        title: "Topical Authority Content Strategy",
        description: "Deep, domain-expert pillar articles structured to earn citations and dominate AI answer engines.",
      },
      {
        title: "Structured JSON-LD Schema Graphs",
        description: "Rich search snippet enhancements for products, organizations, FAQs, and service entities.",
      },
    ],
    techStack: ["Ahrefs", "SEMrush", "Screaming Frog", "Google Search Console", "Next.js Metadata API", "SurferSEO"],
    iconName: "Search",
  },
  {
    id: "brand-identity",
    slug: "brand-identity",
    title: "Brand Identity & Tactile UI/UX",
    category: "CREATIVE STUDIO",
    description:
      "High-end visual identity, design token systems, interactive 3D elements, and bespoke typography for premium brands.",
    checkpoints: [
      "Comprehensive Digital Brand Bible",
      "Figma Design Token Repositories",
      "Interactive Micro-Interactions & Motion",
    ],
    deliverables: [
      {
        title: "Comprehensive Visual Brand Guidelines",
        description: "Complete color hierarchies, typography scales, spacing scales, and multi-resolution vector marks.",
      },
      {
        title: "Interactive Motion & Micro-Animation Suite",
        description: "Production-ready Framer Motion and Lottie assets crafted for responsive tactile feedback.",
      },
      {
        title: "Marketing Deck & Sales Collateral Kits",
        description: "Investor decks, key visual templates, and social media layout component packs.",
      },
      {
        title: "Vector Logo Suite & Iconography Pack",
        description: "Theme-aware SVG assets, favicons, and bespoke iconography tailored to dark and light modes.",
      },
    ],
    techStack: ["Figma", "Adobe Illustrator", "After Effects", "Framer Motion", "Spline 3D", "Tailwind Tokens"],
    iconName: "Palette",
  },
  {
    id: "cro-optimization",
    slug: "cro-optimization",
    title: "Scientific Conversion Rate (CRO)",
    category: "OPTIMIZATION",
    description:
      "Empirical user testing, multi-variant A/B experiments, and frictionless checkout optimization that unlock hidden revenue.",
    checkpoints: [
      "+45% to +64% Sitewide Conversion Lift",
      "Frictionless One-Click Checkout Flows",
      "Behavioral Heatmap & Session Forensics",
    ],
    deliverables: [
      {
        title: "Behavioral Heatmap & Telemetry Forensics",
        description: "Pinpoint drop-off cliffs, rage-click clusters, and navigation friction across core conversion paths.",
      },
      {
        title: "Statistical A/B & Multivariate Testing",
        description: "Rapid iteration cycles testing hero value propositions, pricing matrices, and CTA button hierarchy.",
      },
      {
        title: "Frictionless Checkout Redesign",
        description: "Apple Pay/Google Pay express checkout integration, trust badge placement, and simplified form inputs.",
      },
      {
        title: "Exit-Intent & Dynamic Upsell Architecture",
        description: "Contextual post-purchase upsells and personalized retention overlays engineered to maximize AOV.",
      },
    ],
    techStack: ["Hotjar", "Microsoft Clarity", "Optimizely", "VWO", "PostHog", "Figma"],
    iconName: "Target",
  },
  {
    id: "performance-social",
    slug: "performance-social",
    title: "Performance Social & Creator Scale",
    category: "SCALE CHANNEL",
    description:
      "Viral organic loops, brand amplification, and scalable influencer affiliate marketing networks that drive compounding reach.",
    checkpoints: [
      "Verified Creator Whitelisting Network",
      "High-Retention Vertical Video Pipeline",
      "Automated Social DM Keyword Funnels",
    ],
    deliverables: [
      {
        title: "Creator Match & Whitelisting Program",
        description: "Vetted creator partnerships with full advertiser ad-account access for high-credibility dark posts.",
      },
      {
        title: "Short-Form Vertical Video Production",
        description: "Scripted, retention-optimized vertical video assets engineered for TikTok, Instagram Reels, and YouTube Shorts.",
      },
      {
        title: "Social Funnel & DM Automation",
        description: "Direct message keyword triggers and lead-capture pipelines converting social engagement into pipeline.",
      },
      {
        title: "Trend Surfing & Reactive Marketing Matrix",
        description: "Rapid turnaround creative deployment leveraging emergent cultural trends within your vertical.",
      },
    ],
    techStack: ["CapCut Pro", "Adobe Premiere", "ManyChat API", "Billo", "Grin", "Meta Graph API"],
    iconName: "Share2",
  },
];

export default servicesData;

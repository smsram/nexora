export interface DomainItem {
  id: string;
  slug: string; // e.g. 'fintech-banking'
  title: string; // e.g. 'FinTech & Banking Infrastructure'
  badge: string; // e.g. 'FINANCIAL TECH'
  description: string; // e.g. 'Bank-grade security portals, sub-second ledger dashboards...'
  highlightMetric: string; // e.g. '$12B+ Processed Securely', '100% HIPAA Compliance'
  iconName: string; // e.g. 'CreditCard', 'Stethoscope', 'Cloud', 'ShoppingBag', 'Building2', 'Sparkles'
  caseStudySlug?: string; // Optional target case study link
}

export const domainsData: DomainItem[] = [
  {
    id: "fintech-banking",
    slug: "fintech-banking",
    title: "FinTech & Banking Infrastructure",
    badge: "FINANCIAL TECH",
    description:
      "Bank-grade security portals, sub-second ledger dashboards, ISO 27001 compliant architecture, and conversion-optimized KYC onboarding funnels.",
    highlightMetric: "$12B+ Processed Securely",
    iconName: "CreditCard",
    caseStudySlug: "fintech-core-banking",
  },
  {
    id: "healthcare-med",
    slug: "healthcare-med",
    title: "HealthTech & Life Sciences",
    badge: "MEDICAL & HEALTH",
    description:
      "HIPAA-compliant telemedicine platforms, decentralized clinical trial dashboards, and authority-building medical SEO systems.",
    highlightMetric: "100% HIPAA Compliance",
    iconName: "Stethoscope",
    caseStudySlug: "telehealth-platform",
  },
  {
    id: "enterprise-saas",
    slug: "enterprise-saas",
    title: "Enterprise SaaS & Cloud Systems",
    badge: "B2B SOFTWARE",
    description:
      "Multi-tenant B2B platforms, real-time telemetry streaming, SOC-2 compliant authentication pipelines, and global edge deployments.",
    highlightMetric: "99.999% SLA Uptime",
    iconName: "Cloud",
    caseStudySlug: "cloud-telemetry-saas",
  },
  {
    id: "high-volume-ecommerce",
    slug: "high-volume-ecommerce",
    title: "High-Volume Omnichannel Commerce",
    badge: "RETAIL & D2C",
    description:
      "Headless Next.js Shopify storefronts, sub-500ms cart checkout flows, dynamic product visualizers, and real-time inventory synchronization.",
    highlightMetric: "0.8s Checkout Speed",
    iconName: "ShoppingBag",
    caseStudySlug: "luxury-apparel-storefront",
  },
  {
    id: "proptech-realestate",
    slug: "proptech-realestate",
    title: "Real Estate & Asset Portals",
    badge: "PROPTECH & ASSETS",
    description:
      "Ultra-high-definition interactive 3D digital twins, geo-targeted programmatic MLS search filters, and luxury investor inquiry pipelines.",
    highlightMetric: "$4.5B+ Asset Value",
    iconName: "Building2",
    caseStudySlug: "proptech-asset-exchange",
  },
  {
    id: "ai-autonomous-systems",
    slug: "ai-autonomous-systems",
    title: "AI & Autonomous Computing Systems",
    badge: "ARTIFICIAL INTELLIGENCE",
    description:
      "LLM fine-tuning dashboards, vector search pipelines, multi-agent orchestration platforms, and GPU compute telemetry monitors.",
    highlightMetric: "<20ms Inference Latency",
    iconName: "Sparkles",
    caseStudySlug: "ai-agent-orchestrator",
  },
];

export default domainsData;

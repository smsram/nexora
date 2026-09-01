"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";
import ServiceCard from "@/components/shared/ServiceCard";
import FilterPill from "@/components/ui/FilterPill";
import DomainGrid from "@/components/home/DomainGrid";
import { servicesData, ServiceItem } from "@/data/servicesData";

const categoryFilters = [
  "All Capabilities",
  "Engineering",
  "Growth Engine",
  "Organic Search",
  "Creative Studio",
  "Optimization",
  "Scale Channel",
];

const categoryKeyMap: Record<string, string> = {
  "Engineering": "ENGINEERING",
  "Growth Engine": "GROWTH ENGINE",
  "Organic Search": "ORGANIC SEARCH",
  "Creative Studio": "CREATIVE STUDIO",
  "Optimization": "OPTIMIZATION",
  "Scale Channel": "SCALE CHANNEL",
};

function ServicesContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All Capabilities");
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [likedServices, setLikedServices] = useState<Record<string, boolean>>({});

  // Deep-link auto-opening logic when navigating with ?service=[slug]
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      const normalizedQuery = serviceParam.toLowerCase();
      const matched = servicesData.find(
        (s) =>
          s.slug.toLowerCase() === normalizedQuery ||
          s.id.toLowerCase() === normalizedQuery ||
          s.title.toLowerCase() === normalizedQuery
      );
      if (matched) {
        setActiveServiceModal(matched);
      }
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setActiveServiceModal(null);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/services");
    }
  };

  const handleOpenModal = (service: ServiceItem) => {
    setActiveServiceModal(service);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/services?service=${service.slug}`);
    }
  };

  const toggleLike = (id: string) => {
    setLikedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredServices =
    selectedCategory === "All Capabilities"
      ? servicesData
      : servicesData.filter((item) => {
          const mappedKey = categoryKeyMap[selectedCategory];
          return item.category === mappedKey || item.category === selectedCategory;
        });

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#000517] text-[#00144A] dark:text-white transition-colors duration-300">
      {/* Expanded Service Detail Modal with layoutId */}
      <ServiceDetailModal
        service={activeServiceModal}
        onClose={handleCloseModal}
      />

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-[#FAFBFD] to-[#FAFBFD] dark:from-[#000517] dark:via-[#000517] dark:to-[#000517] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#000F2E] text-[#0099BE] dark:text-[#00D2FF] border border-slate-200 dark:border-slate-800 mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
              Enterprise Solutions & Capabilities
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] dark:text-white tracking-tight leading-[1.1] mb-6">
              Engineered Growth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                Tactile Web Systems.
              </span>
            </h1>
            <p className="font-jakarta text-slate-600 dark:text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed">
              We bridge the gap between high-precision Next.js web engineering and high-ROAS performance marketing. Every capability is engineered to deliver measurable revenue compounding.
            </p>
          </div>

          {/* Filter Pills Row with 0.5s White Line Flash */}
          <div className="flex items-center gap-2 overflow-x-auto pt-10 pb-2 scrollbar-none">
            {categoryFilters.map((cat) => (
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

      {/* Keycap Services Bento Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => handleOpenModal(service)}
              isLiked={likedServices[service.id]}
              onToggleLike={() => toggleLike(service.id)}
              showCheckpoints={true}
            />
          ))}
        </div>
      </section>

      {/* Standardized Domains Component: Specialized Solutions for High-Stakes Verticals */}
      <DomainGrid />

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#00144A] dark:bg-[#000F2E] text-white relative overflow-hidden border-t border-[#002277] dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to deploy your next high-impact growth engine?
            </h2>
            <p className="font-jakarta text-slate-300 dark:text-slate-400 text-base sm:text-lg">
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

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFBFD] dark:bg-[#000517]" />}>
      <ServicesContent />
    </Suspense>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import { servicesData } from "@/data/servicesData";

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-[#000517] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl bg-slate-100 dark:bg-[#000F2E] border border-slate-300 dark:border-slate-800 shadow-[0_2px_0_#94a3b8] dark:shadow-[0_2px_0_#00030d] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />
              <span className="font-outfit text-xs font-bold uppercase tracking-wider text-[#00144A] dark:text-white">
                Capabilities & Solutions
              </span>
            </div>
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-[#00144A] dark:text-white tracking-tight leading-tight">
              Precision Solutions Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                Unfair Market Advantage.
              </span>
            </h2>
          </div>

          <p className="font-jakarta text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            Every service is architected like a precision instrument—leveraging data-backed mechanics, high-fidelity engineering, and continuous refinement.
          </p>
        </div>

        {/* 6 Unified Tactile Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              href={`/services?service=${service.slug}`}
              showCheckpoints={true}
            />
          ))}
        </div>

        {/* Bottom Discovery Link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-outfit font-bold text-[#00144A] dark:text-white hover:text-[#00D2FF] dark:hover:text-[#00D2FF] transition-colors"
          >
            <span>Explore All 6 Enterprise Capabilities & Full Technical Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

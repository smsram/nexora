"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";

const overviewStats = [
  {
    label: "Active Production Services",
    value: "6 Capabilities",
    change: "+100% SLA Guarantee",
    icon: <Briefcase className="w-5 h-5 text-[#00D2FF]" />,
  },
  {
    label: "Avg. Lighthouse Performance",
    value: "99.2/100",
    change: "Sub-50ms Global TTFB",
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
  },
  {
    label: "Client Inbound Inquiries",
    value: "148 Leads",
    change: "+34% this month",
    icon: <TrendingUp className="w-5 h-5 text-[#FF4B72]" />,
  },
  {
    label: "Verified Case Studies",
    value: "12 Live",
    change: "Across 4 Verticals",
    icon: <Globe className="w-5 h-5 text-indigo-400" />,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 select-none">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-[#000B2B] dark:bg-[#000F2E] border border-slate-800 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(0,210,255,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00144A] text-[#00D2FF] border border-[#002277] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Management Console</span>
          </div>

          <h1 className="font-outfit text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Welcome to the Nexora Admin Portal.
          </h1>

          <p className="font-jakarta text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Directly orchestrate production capabilities, case studies, media archives, and content systems with instant real-time live preview synchronization.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/services"
              className="tactile-btn tactile-btn-cyan text-xs py-2.5 px-5 flex items-center gap-2 font-bold"
            >
              <span>Launch Services Editor</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors"
            >
              View Public Website
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 shadow-tactile dark:shadow-tactile-dark space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-jakarta uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>

            <div className="font-outfit text-2xl font-black text-[#00144A] dark:text-white">
              {stat.value}
            </div>

            <div className="text-xs font-medium text-[#0099BE] dark:text-[#00D2FF]">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Active Capabilities Summary Grid */}
      <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-tactile dark:shadow-tactile-dark space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-outfit text-xl font-bold text-[#00144A] dark:text-white">
              Active Capability Modules
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-jakarta">
              Real-time sync with single source of truth (`src/data/servicesData.ts`)
            </p>
          </div>

          <Link
            href="/admin/services"
            className="text-xs font-bold text-[#0099BE] dark:text-[#00D2FF] hover:underline flex items-center gap-1"
          >
            <span>Edit All Capabilities</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesData.map((s) => (
            <Link
              key={s.id}
              href="/admin/services"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 hover:border-[#00D2FF] transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-[#00144A] text-[#00144A] dark:text-[#00D2FF]">
                  {s.category}
                </span>
                <span className="text-xs font-bold text-slate-400 font-outfit">
                  {s.keyMetricValue}
                </span>
              </div>
              <h3 className="font-outfit font-bold text-sm text-[#00144A] dark:text-white group-hover:text-[#0099BE] dark:group-hover:text-[#00D2FF] transition-colors">
                {s.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-jakarta line-clamp-2 mt-1">
                {s.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

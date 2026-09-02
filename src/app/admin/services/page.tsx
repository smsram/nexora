"use client";

import React, { useState } from "react";
import {
  Code2,
  TrendingUp,
  Search,
  Palette,
  Target,
  Share2,
  Layers,
  Sparkles,
  Cpu,
  ShieldCheck,
  Plus,
  Trash2,
  RotateCcw,
  Sun,
  Moon,
  Eye,
  Save,
  Zap,
  Tag,
  CheckCircle2,
  Globe,
  Briefcase,
  Grid3X3,
  Square,
  ExternalLink,
} from "lucide-react";
import { servicesData, ServiceItem, ServiceDeliverable } from "@/data/servicesData";
import { domainsData, DomainItem } from "@/data/domainsData";
import ServiceCard from "@/components/shared/ServiceCard";
import DomainCard from "@/components/shared/DomainCard";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";
import CustomDropdown from "@/components/admin/ui/CustomDropdown";
import IconPicker from "@/components/admin/ui/IconPicker";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";
import { useToast } from "@/components/admin/ui/NotificationHub";

type SectionTab = "capabilities" | "domains";

const availableCategories = [
  "ENGINEERING",
  "GROWTH ENGINE",
  "ORGANIC SEARCH",
  "CREATIVE STUDIO",
  "OPTIMIZATION",
  "SCALE CHANNEL",
];

const portfolioCaseStudyOptions = [
  { value: "none", label: "None (Standard Link)" },
  { value: "fintech-core-banking", label: "FinTech Core Banking Ledger (VancePay)" },
  { value: "telehealth-platform", label: "Telehealth AI Diagnostics (CuraSync)" },
  { value: "cloud-telemetry-saas", label: "Cloud Telemetry Engine (HyperScale)" },
  { value: "luxury-apparel-storefront", label: "Headless Luxury Fashion (Aura)" },
  { value: "proptech-asset-exchange", label: "PropTech 3D Asset Exchange (Aether)" },
  { value: "ai-agent-orchestrator", label: "Autonomous LLM Platform (Nexus AI)" },
];

export default function AdminServicesManagerPage() {
  const toast = useToast();

  // Top Section Switcher: Core Capabilities vs Domain Expertise
  const [activeSectionTab, setActiveSectionTab] = useState<SectionTab>("capabilities");

  // ===========================================================================
  // STATE: SECTION 1 (Capabilities)
  // ===========================================================================
  const [allServices, setAllServices] = useState<ServiceItem[]>(servicesData);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(servicesData[0].slug);
  const [serviceFormState, setServiceFormState] = useState<ServiceItem>({ ...servicesData[0] });

  // Inputs for adding capability sub-items
  const [newCheckpoint, setNewCheckpoint] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newDeliverableTitle, setNewDeliverableTitle] = useState("");
  const [newDeliverableDesc, setNewDeliverableDesc] = useState("");

  // Capabilities Canvas Options & Modals
  const [servicePreviewTheme, setServicePreviewTheme] = useState<"dark" | "light">("dark");
  const [serviceDetailModalOpen, setServiceDetailModalOpen] = useState(false);
  const [discardServiceModalOpen, setDiscardServiceModalOpen] = useState(false);
  const [deleteServiceModalOpen, setDeleteServiceModalOpen] = useState(false);

  // ===========================================================================
  // STATE: SECTION 2 (Domain Expertise)
  // ===========================================================================
  const [allDomains, setAllDomains] = useState<DomainItem[]>(domainsData);
  const [selectedDomainSlug, setSelectedDomainSlug] = useState<string>(domainsData[0].slug);
  const [domainFormState, setDomainFormState] = useState<DomainItem>({ ...domainsData[0] });

  // Domain Section Header Metadata State
  const [domainSectionBadge, setDomainSectionBadge] = useState("DOMAIN EXPERTISE");
  const [domainSectionHeadline, setDomainSectionHeadline] = useState("Specialized Solutions for High-Stakes Verticals.");
  const [domainSectionDesc, setDomainSectionDesc] = useState(
    "We don't apply cookie-cutter formulas. Every industry operates under distinct compliance, user psychology, and competitive dynamics."
  );

  // Domains Canvas Options & Modals
  const [domainPreviewTheme, setDomainPreviewTheme] = useState<"dark" | "light">("dark");
  const [domainPreviewMode, setDomainPreviewMode] = useState<"focus" | "grid">("focus");
  const [discardDomainModalOpen, setDiscardDomainModalOpen] = useState(false);
  const [deleteDomainModalOpen, setDeleteDomainModalOpen] = useState(false);

  // ===========================================================================
  // HANDLERS: SECTION 1 (Capabilities)
  // ===========================================================================
  const handleSelectService = (slug: string) => {
    setSelectedServiceSlug(slug);
    const target = allServices.find((s) => s.slug === slug);
    if (target) {
      setServiceFormState({ ...target });
    }
  };

  const handleAddNewService = () => {
    const newId = `service-${Date.now().toString(36)}`;
    const newService: ServiceItem = {
      id: newId,
      slug: `new-capability-${allServices.length + 1}`,
      title: `New Capability #${allServices.length + 1}`,
      category: "ENGINEERING",
      description: "Bespoke engineered production capability tailored for high-growth client deployments.",
      keyMetricValue: "Sub-50ms",
      keyMetricLabel: "Performance SLA Benchmark",
      checkpoints: ["Edge-Optimized Architecture", "Bespoke Component Library", "Zero-Latency Caching"],
      deliverables: [
        {
          title: "Technical Specification Document",
          description: "Full architectural breakdown with integration endpoints and security SLAs.",
        },
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      tags: ["High Performance", "Tactile UI"],
      iconName: "Code2",
    };

    setAllServices((prev) => [...prev, newService]);
    setSelectedServiceSlug(newService.slug);
    setServiceFormState({ ...newService });
    toast.success("Capability Created", `Added "${newService.title}" to active services.`);
  };

  const handleDeleteService = () => {
    if (allServices.length <= 1) {
      toast.warning("Cannot Delete", "At least one service capability must remain active.");
      setDeleteServiceModalOpen(false);
      return;
    }

    const remaining = allServices.filter((s) => s.slug !== selectedServiceSlug);
    setAllServices(remaining);
    setSelectedServiceSlug(remaining[0].slug);
    setServiceFormState({ ...remaining[0] });
    setDeleteServiceModalOpen(false);
    toast.info("Service Removed", `Deleted "${serviceFormState.title}".`);
  };

  const handleConfirmDiscardService = () => {
    const original = servicesData.find((s) => s.slug === selectedServiceSlug) || allServices.find((s) => s.slug === selectedServiceSlug);
    if (original) {
      setServiceFormState({ ...original });
    }
    setDiscardServiceModalOpen(false);
    toast.info("Changes Discarded", `Reverted "${serviceFormState.title}" back to saved state.`);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    setAllServices((prev) =>
      prev.map((item) => (item.slug === selectedServiceSlug ? { ...serviceFormState } : item))
    );
    toast.success("Capability Saved & Published", `"${serviceFormState.title}" changes published live.`);
  };

  const handleAddCheckpoint = () => {
    if (!newCheckpoint.trim()) return;
    setServiceFormState((prev) => ({
      ...prev,
      checkpoints: [...prev.checkpoints, newCheckpoint.trim()],
    }));
    setNewCheckpoint("");
  };

  const handleRemoveCheckpoint = (index: number) => {
    setServiceFormState((prev) => ({
      ...prev,
      checkpoints: prev.checkpoints.filter((_, i) => i !== index),
    }));
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    const currentTags = serviceFormState.tags || [];
    if (currentTags.includes(newTag.trim())) return;
    setServiceFormState((prev) => ({
      ...prev,
      tags: [...currentTags, newTag.trim()],
    }));
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setServiceFormState((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((t: string) => t !== tagToRemove),
    }));
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableTitle.trim()) return;
    const newDeliv: ServiceDeliverable = {
      title: newDeliverableTitle.trim(),
      description: newDeliverableDesc.trim() || "Engineered production deliverable.",
    };

    setServiceFormState((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, newDeliv],
    }));

    setNewDeliverableTitle("");
    setNewDeliverableDesc("");
  };

  const handleRemoveDeliverable = (index: number) => {
    setServiceFormState((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  // ===========================================================================
  // HANDLERS: SECTION 2 (Domain Expertise)
  // ===========================================================================
  const handleSelectDomain = (slug: string) => {
    setSelectedDomainSlug(slug);
    const target = allDomains.find((d) => d.slug === slug);
    if (target) {
      setDomainFormState({ ...target });
    }
  };

  const handleAddNewDomain = () => {
    const newId = `domain-${Date.now().toString(36)}`;
    const newDomain: DomainItem = {
      id: newId,
      slug: `new-vertical-${allDomains.length + 1}`,
      title: `New High-Stakes Vertical #${allDomains.length + 1}`,
      badge: "NEW VERTICAL",
      description: "Engineered solutions, security compliance, and conversion-optimized architectures for high-stakes industry operations.",
      highlightMetric: "$500M+ Processed",
      iconName: "ShieldCheck",
      caseStudySlug: "none",
    };

    setAllDomains((prev) => [...prev, newDomain]);
    setSelectedDomainSlug(newDomain.slug);
    setDomainFormState({ ...newDomain });
    toast.success("Vertical Created", `Added "${newDomain.title}" to active domains.`);
  };

  const handleDeleteDomain = () => {
    if (allDomains.length <= 1) {
      toast.warning("Cannot Delete", "At least one domain vertical must remain active.");
      setDeleteDomainModalOpen(false);
      return;
    }

    const remaining = allDomains.filter((d) => d.slug !== selectedDomainSlug);
    setAllDomains(remaining);
    setSelectedDomainSlug(remaining[0].slug);
    setDomainFormState({ ...remaining[0] });
    setDeleteDomainModalOpen(false);
    toast.info("Vertical Removed", `Deleted "${domainFormState.title}".`);
  };

  const handleConfirmDiscardDomain = () => {
    const original = domainsData.find((d) => d.slug === selectedDomainSlug) || allDomains.find((d) => d.slug === selectedDomainSlug);
    if (original) {
      setDomainFormState({ ...original });
    }
    setDiscardDomainModalOpen(false);
    toast.info("Changes Discarded", `Reverted "${domainFormState.title}" back to saved state.`);
  };

  const handleSaveDomain = (e: React.FormEvent) => {
    e.preventDefault();
    setAllDomains((prev) =>
      prev.map((item) => (item.slug === selectedDomainSlug ? { ...domainFormState } : item))
    );
    toast.success("Domain Vertical Saved", `"${domainFormState.title}" updates are published.`);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Capability Modals */}
      <ConfirmModal
        isOpen={discardServiceModalOpen}
        title="Discard Capability Changes?"
        description={`Are you sure you want to revert all changes made to "${serviceFormState.title}"?`}
        confirmText="Yes, Discard"
        cancelText="Keep Editing"
        variant="destructive"
        onConfirm={handleConfirmDiscardService}
        onCancel={() => setDiscardServiceModalOpen(false)}
      />

      <ConfirmModal
        isOpen={deleteServiceModalOpen}
        title="Delete Capability Module?"
        description={`Are you sure you want to delete "${serviceFormState.title}" from the public site?`}
        confirmText="Delete Service"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleDeleteService}
        onCancel={() => setDeleteServiceModalOpen(false)}
      />

      <ServiceDetailModal
        service={serviceDetailModalOpen ? serviceFormState : null}
        onClose={() => setServiceDetailModalOpen(false)}
      />

      {/* Domain Modals */}
      <ConfirmModal
        isOpen={discardDomainModalOpen}
        title="Discard Domain Changes?"
        description={`Are you sure you want to revert all changes made to "${domainFormState.title}"?`}
        confirmText="Yes, Discard"
        cancelText="Keep Editing"
        variant="destructive"
        onConfirm={handleConfirmDiscardDomain}
        onCancel={() => setDiscardDomainModalOpen(false)}
      />

      <ConfirmModal
        isOpen={deleteDomainModalOpen}
        title="Delete Domain Vertical?"
        description={`Are you sure you want to delete "${domainFormState.title}" from the public domains grid?`}
        confirmText="Delete Vertical"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleDeleteDomain}
        onCancel={() => setDeleteDomainModalOpen(false)}
      />

      {/* ========================================================================= */}
      {/* Top Header & Section Tab Switcher */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-outfit text-2xl sm:text-3xl font-black text-[#00144A] dark:text-white tracking-tight">
              Services & Verticals Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-jakarta mt-1">
              Configure capabilities and high-stakes domain verticals with real-time live preview synchronization.
            </p>
          </div>

          {/* Quick link to public page */}
          <a
            href="/services"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0099BE] dark:text-[#00D2FF] hover:underline"
          >
            <span>View Public Services Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tactile Keycap Section Tab Switcher */}
        <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 w-fit">
          <button
            type="button"
            onClick={() => setActiveSectionTab("capabilities")}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-jakarta transition-all flex items-center gap-2.5 cursor-pointer ${
              activeSectionTab === "capabilities"
                ? "bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#000517] shadow-tactile dark:shadow-tactile-dark"
                : "text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Core Capabilities</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeSectionTab === "capabilities"
                  ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#000517]"
                  : "bg-slate-200 dark:bg-[#000517] text-slate-500"
              }`}
            >
              {allServices.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSectionTab("domains")}
            className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-jakarta transition-all flex items-center gap-2.5 cursor-pointer ${
              activeSectionTab === "domains"
                ? "bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#000517] shadow-tactile dark:shadow-tactile-dark"
                : "text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Domain Expertise</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeSectionTab === "domains"
                  ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#000517]"
                  : "bg-slate-200 dark:bg-[#000517] text-slate-500"
              }`}
            >
              {allDomains.length}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CORE CAPABILITIES TAB */}
      {/* ========================================================================= */}
      {activeSectionTab === "capabilities" && (
        <div className="space-y-6">
          {/* Capabilities Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Capability Selector Tab Row + Add Button */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-1">
              {allServices.map((service) => {
                const isSelected = service.slug === selectedServiceSlug;
                return (
                  <button
                    key={service.slug}
                    onClick={() => handleSelectService(service.slug)}
                    type="button"
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-jakarta whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? "bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#000517] border-[#00144A] dark:border-[#00D2FF] shadow-sm font-bold"
                        : "bg-white dark:bg-[#000F2E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <span>{service.title}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                        isSelected
                          ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#000517]"
                          : "bg-slate-100 dark:bg-[#000517] text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {service.category}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleAddNewService}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-xs font-bold text-[#00144A] dark:text-[#00D2FF] border border-dashed border-slate-300 dark:border-[#00D2FF]/40 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Capability</span>
              </button>
            </div>

            {/* Capability Actions */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setDeleteServiceModalOpen(true)}
                className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-900/60 text-xs font-bold transition-colors cursor-pointer"
                title="Delete this capability"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setDiscardServiceModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-[#00144A] dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>

              <button
                type="button"
                onClick={handleSaveService}
                className="tactile-btn tactile-btn-cyan text-xs py-2.5 px-4 sm:px-5 flex items-center gap-2 font-bold cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Capability</span>
              </button>
            </div>
          </div>

          {/* 2-Column Split View for Capabilities */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            {/* Left Column: Form Editor */}
            <div className="space-y-6">
              {/* 1. Core Specs */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Zap className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                  <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                    1. Core Capability Specs
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={serviceFormState.title}
                      onChange={(e) =>
                        setServiceFormState({ ...serviceFormState, title: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      URL Parameter Slug
                    </label>
                    <input
                      type="text"
                      value={serviceFormState.slug}
                      onChange={(e) =>
                        setServiceFormState({ ...serviceFormState, slug: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF] font-mono"
                    />
                  </div>
                </div>

                <CustomDropdown
                  label="Industry Category Tag"
                  options={availableCategories}
                  value={serviceFormState.category}
                  onChange={(val) => setServiceFormState({ ...serviceFormState, category: val })}
                />

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Concise Overview Description
                  </label>
                  <textarea
                    rows={3}
                    value={serviceFormState.description}
                    onChange={(e) =>
                      setServiceFormState({ ...serviceFormState, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF] leading-relaxed"
                  />
                </div>
              </div>

              {/* 2. Key Metrics & Benchmarks */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <TrendingUp className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                  <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                    2. Key Metrics & Value Benchmarks
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Primary Metric Value
                    </label>
                    <input
                      type="text"
                      value={serviceFormState.keyMetricValue || ""}
                      onChange={(e) =>
                        setServiceFormState({ ...serviceFormState, keyMetricValue: e.target.value })
                      }
                      placeholder="e.g. Sub-50ms or 4.2x"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Metric Description Label
                    </label>
                    <input
                      type="text"
                      value={serviceFormState.keyMetricLabel || ""}
                      onChange={(e) =>
                        setServiceFormState({ ...serviceFormState, keyMetricLabel: e.target.value })
                      }
                      placeholder="e.g. Average TTFB Global Latency"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Projected ROI Benchmark Summary
                  </label>
                  <input
                    type="text"
                    value={serviceFormState.roiTimeline || ""}
                    onChange={(e) =>
                      setServiceFormState({ ...serviceFormState, roiTimeline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                </div>
              </div>

              {/* 3. Checkpoints */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                    <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                      3. Bulleted Keycap Checkpoints
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {serviceFormState.checkpoints.length} Checkpoints
                  </span>
                </div>

                <div className="space-y-2">
                  {serviceFormState.checkpoints.map((cp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs text-[#00144A] dark:text-slate-200 font-jakarta"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                        <span>{cp}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCheckpoint(idx)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newCheckpoint}
                    onChange={(e) => setNewCheckpoint(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCheckpoint();
                      }
                    }}
                    placeholder="e.g. Sub-50ms Global TTFB"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCheckpoint}
                    className="px-4 py-2 rounded-xl bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#000517] text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:opacity-90"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* 4. Deliverables */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                    <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                      4. Expanded Deliverables (Modal View)
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {serviceFormState.deliverables.length} Deliverables
                  </span>
                </div>

                <div className="space-y-3">
                  {serviceFormState.deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#00144A] dark:text-white mb-0.5">
                          {deliv.title}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 leading-relaxed">
                          {deliv.description}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <input
                    type="text"
                    value={newDeliverableTitle}
                    onChange={(e) => setNewDeliverableTitle(e.target.value)}
                    placeholder="Deliverable Title"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                  <input
                    type="text"
                    value={newDeliverableDesc}
                    onChange={(e) => setNewDeliverableDesc(e.target.value)}
                    placeholder="Deliverable Description"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-xs font-bold text-[#00144A] dark:text-white flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Deliverable Item</span>
                  </button>
                </div>
              </div>

              {/* 5. Strategy Tags */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                    <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                      5. Tech Stack & Strategy Tags
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {(serviceFormState.tags || []).length} Tags
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(serviceFormState.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#000517] text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 text-slate-400 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="e.g. Next.js 14"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#000517] text-xs font-bold cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* 6. Icon Identifier using Reusable IconPicker */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Layers className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                  <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                    6. Capability Icon Identifier
                  </h2>
                </div>

                <IconPicker
                  label="Selected Lucide Icon"
                  value={serviceFormState.iconName}
                  onChange={(name) =>
                    setServiceFormState({ ...serviceFormState, iconName: name })
                  }
                />
              </div>
            </div>

            {/* Right Column: Sticky Live Preview Canvas with Isolated Theme Switcher */}
            <div className="sticky top-24 space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <div className="font-outfit font-bold text-xs text-[#00144A] dark:text-white">
                    Capability Card Live Canvas
                  </div>
                  <div className="text-[10px] text-slate-400 font-jakarta">
                    Updates in real-time as specs are modified
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceDetailModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#000517] hover:bg-slate-200 dark:hover:bg-[#001133] text-[11px] font-bold text-[#00144A] dark:text-white border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0099BE] dark:text-[#00D2FF]" />
                    <span>Test Modal</span>
                  </button>

                  <div className="flex items-center bg-slate-100 dark:bg-[#000517] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setServicePreviewTheme("dark")}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        servicePreviewTheme === "dark"
                          ? "bg-[#00144A] text-[#00D2FF] shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Test on Dark Theme Canvas"
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setServicePreviewTheme("light")}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        servicePreviewTheme === "light"
                          ? "bg-white text-[#00144A] shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Test on Light Theme Canvas"
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Isolated Preview Canvas Wrapper with Immediate Ancestor .dark class */}
              <div className={servicePreviewTheme === "dark" ? "dark" : ""}>
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFBFD] dark:bg-[#000517] text-[#00144A] dark:text-white border border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-inner dark:shadow-none">
                  <div className="mb-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>SLOT: /services?service={serviceFormState.slug}</span>
                    <span className="text-[#00D2FF]">● Interactive Card</span>
                  </div>

                  <ServiceCard
                    service={serviceFormState}
                    onClick={() => setServiceDetailModalOpen(true)}
                    showCheckpoints={true}
                    showTags={true}
                  />

                  <div className="mt-4 text-center">
                    <span className="text-[10px] text-slate-400 font-jakarta">
                      Clicking the card opens the full architectural modal view.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: DOMAIN EXPERTISE TAB */}
      {/* ========================================================================= */}
      {activeSectionTab === "domains" && (
        <div className="space-y-6">
          {/* Domains Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Domain Selector Tab Row + Add Button */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-1">
              {allDomains.map((dom) => {
                const isSelected = dom.slug === selectedDomainSlug;
                return (
                  <button
                    key={dom.slug}
                    onClick={() => handleSelectDomain(dom.slug)}
                    type="button"
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-jakarta whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? "bg-[#00144A] text-white dark:bg-[#00D2FF] dark:text-[#000517] border-[#00144A] dark:border-[#00D2FF] shadow-sm font-bold"
                        : "bg-white dark:bg-[#000F2E] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <span>{dom.title}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                        isSelected
                          ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#000517]"
                          : "bg-slate-100 dark:bg-[#000517] text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {dom.badge}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleAddNewDomain}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-xs font-bold text-[#00144A] dark:text-[#00D2FF] border border-dashed border-slate-300 dark:border-[#00D2FF]/40 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Vertical</span>
              </button>
            </div>

            {/* Domain Actions */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setDeleteDomainModalOpen(true)}
                className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-900/60 text-xs font-bold transition-colors cursor-pointer"
                title="Delete this domain vertical"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setDiscardDomainModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-[#00144A] dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>

              <button
                type="button"
                onClick={handleSaveDomain}
                className="tactile-btn tactile-btn-cyan text-xs py-2.5 px-4 sm:px-5 flex items-center gap-2 font-bold cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Vertical</span>
              </button>
            </div>
          </div>

          {/* 2-Column Split View for Domain Verticals */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            {/* Left Column: Domain Editor */}
            <div className="space-y-6">
              {/* Section Header Controls */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                  <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                    Section Header & Headline
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Section Eyebrow Badge
                    </label>
                    <input
                      type="text"
                      value={domainSectionBadge}
                      onChange={(e) => setDomainSectionBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Section Headline
                    </label>
                    <input
                      type="text"
                      value={domainSectionHeadline}
                      onChange={(e) => setDomainSectionHeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Section Subtitle Description
                  </label>
                  <textarea
                    rows={2}
                    value={domainSectionDesc}
                    onChange={(e) => setDomainSectionDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                  />
                </div>
              </div>

              {/* Active Domain Card Form */}
              <div className="bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-tactile dark:shadow-tactile-dark space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Globe className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                  <h2 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                    Vertical Card Specifications
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Vertical Title
                    </label>
                    <input
                      type="text"
                      value={domainFormState.title}
                      onChange={(e) =>
                        setDomainFormState({ ...domainFormState, title: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Category Badge Pill
                    </label>
                    <input
                      type="text"
                      value={domainFormState.badge}
                      onChange={(e) =>
                        setDomainFormState({ ...domainFormState, badge: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Highlight Metric Value
                    </label>
                    <input
                      type="text"
                      value={domainFormState.highlightMetric}
                      onChange={(e) =>
                        setDomainFormState({ ...domainFormState, highlightMetric: e.target.value })
                      }
                      placeholder="e.g. $12B+ Processed Securely"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      URL Parameter Slug
                    </label>
                    <input
                      type="text"
                      value={domainFormState.slug}
                      onChange={(e) =>
                        setDomainFormState({ ...domainFormState, slug: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF] font-mono"
                    />
                  </div>
                </div>

                <CustomDropdown
                  label="Target Case Study Link"
                  options={portfolioCaseStudyOptions}
                  value={domainFormState.caseStudySlug || "none"}
                  onChange={(val) => setDomainFormState({ ...domainFormState, caseStudySlug: val })}
                />

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Vertical Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={domainFormState.description}
                    onChange={(e) =>
                      setDomainFormState({ ...domainFormState, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#00144A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00D2FF] leading-relaxed"
                  />
                </div>

                {/* Domain Icon Picker using Reusable IconPicker */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <IconPicker
                    label="Vertical Icon Identifier"
                    value={domainFormState.iconName}
                    onChange={(name) =>
                      setDomainFormState({ ...domainFormState, iconName: name })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Live Domain Preview with Isolated Theme Switcher */}
            <div className="sticky top-24 space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <div className="font-outfit font-bold text-xs text-[#00144A] dark:text-white">
                    Domain Expertise Live Canvas
                  </div>
                  <div className="text-[10px] text-slate-400 font-jakarta">
                    Real-time preview of public domain cards
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* View Mode Toggle: Focus Card vs Full 6-Card Grid */}
                  <div className="flex items-center bg-slate-100 dark:bg-[#000517] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setDomainPreviewMode("focus")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                        domainPreviewMode === "focus"
                          ? "bg-[#00144A] text-[#00D2FF] dark:bg-[#00144A] dark:text-[#00D2FF] shadow-sm"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      }`}
                      title="Focus on active card"
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDomainPreviewMode("grid")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                        domainPreviewMode === "grid"
                          ? "bg-[#00144A] text-[#00D2FF] dark:bg-[#00144A] dark:text-[#00D2FF] shadow-sm"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      }`}
                      title="Preview in 6-card vertical grid"
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                      <span>Grid</span>
                    </button>
                  </div>

                  {/* Theme Simulator */}
                  <div className="flex items-center bg-slate-100 dark:bg-[#000517] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setDomainPreviewTheme("dark")}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        domainPreviewTheme === "dark"
                          ? "bg-[#00144A] text-[#00D2FF] shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Test on Dark Theme Canvas"
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDomainPreviewTheme("light")}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        domainPreviewTheme === "light"
                          ? "bg-white text-[#00144A] shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Test on Light Theme Canvas"
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Isolated Simulated Canvas Viewport with Immediate Ancestor .dark class */}
              <div className={domainPreviewTheme === "dark" ? "dark" : ""}>
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFBFD] dark:bg-[#000517] text-[#00144A] dark:text-white border border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-inner dark:shadow-none">
                  {/* Section header simulator when in grid mode */}
                  {domainPreviewMode === "grid" && (
                    <div className="mb-8 text-center max-w-md mx-auto">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00144A] text-[#00D2FF] text-[10px] font-bold uppercase tracking-wider mb-2">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{domainSectionBadge}</span>
                      </span>
                      <h3 className="font-outfit text-lg font-black text-[#00144A] dark:text-white">
                        {domainSectionHeadline}
                      </h3>
                    </div>
                  )}

                  {domainPreviewMode === "focus" ? (
                    <div className="max-w-md mx-auto">
                      <div className="mb-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>VERTICAL: {domainFormState.slug}</span>
                        <span className="text-[#00D2FF]">● Active Focus</span>
                      </div>

                      <DomainCard domain={domainFormState} isActive={true} />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-1 scrollbar-none">
                      {allDomains.map((dom) => {
                        const isEditing = dom.slug === selectedDomainSlug;
                        const activeData = isEditing ? domainFormState : dom;
                        return (
                          <DomainCard
                            key={dom.slug}
                            domain={activeData}
                            isActive={isEditing}
                            onClick={() => handleSelectDomain(dom.slug)}
                          />
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4 text-center">
                    <span className="text-[10px] text-slate-400 font-jakarta">
                      Card reflects live styling matching public /services and home page.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

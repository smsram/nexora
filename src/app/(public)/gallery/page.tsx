"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Play,
} from "lucide-react";
import InstagramSplitModal, {
  MediaItem,
} from "@/components/gallery/InstagramSplitModal";

export interface GalleryFolder {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  mediaType: "Photos" | "Videos" | "Mixed";
  previewGradient: string;
  items: MediaItem[];
}

const galleryFoldersData: GalleryFolder[] = [
  {
    id: "brand-shoots",
    title: "Editorial Brand Shoots",
    description: "High-fashion product photography, physical brand collateral, and luxury lighting sets.",
    itemCount: 4,
    mediaType: "Photos",
    previewGradient: "from-blue-900 via-indigo-950 to-[#00144A]",
    items: [
      {
        id: "brand-1",
        title: "Sterling Atelier Luxury Watch Launch",
        type: "photo",
        aspectRatio: "landscape",
        gradient: "from-blue-900 via-indigo-950 to-[#00144A]",
        caption: "Studio macro capture of the titanium chassis and mechanical bezel for Sterling Atelier's Q3 campaign.",
        date: "Aug 14, 2026",
        client: "Sterling Atelier",
        cameraOrTool: "Sony A7S III • 90mm Macro f/2.8",
        tags: ["Luxury", "Macro", "StudioLighting", "Watches"],
        likesCount: 142,
      },
      {
        id: "brand-2",
        title: "Tactile Keycap Packaging System",
        type: "photo",
        aspectRatio: "portrait",
        gradient: "from-slate-900 via-cyan-950 to-[#00144A]",
        caption: "Unboxing experience and matte foil stamped packaging design for developer hardware kit.",
        date: "Aug 02, 2026",
        client: "Nexora Internal",
        cameraOrTool: "Hasselblad X2D 100C • 55mm f/2.5",
        tags: ["Packaging", "TactileDesign", "FoilStamp"],
        likesCount: 98,
      },
      {
        id: "brand-3",
        title: "Aetheria Biotech Medical Device",
        type: "photo",
        aspectRatio: "landscape",
        gradient: "from-teal-950 via-blue-950 to-[#00144A]",
        caption: "Clinical environment hero photography showcasing the next-generation microfluidic sequencer.",
        date: "Jul 28, 2026",
        client: "Aetheria Biotech",
        cameraOrTool: "Canon R5 • 24-70mm f/2.8L",
        tags: ["Biotech", "Clinical", "IndustrialDesign"],
        likesCount: 114,
      },
      {
        id: "brand-4",
        title: "Monochrome Editorial Portraiture",
        type: "photo",
        aspectRatio: "portrait",
        gradient: "from-indigo-950 via-slate-900 to-[#00144A]",
        caption: "Executive portrait series capturing the founding partners of CapTable Fintech.",
        date: "Jul 19, 2026",
        client: "CapTable Fintech",
        cameraOrTool: "Sony A1 • 50mm f/1.2 GM",
        tags: ["Editorial", "Portraits", "Executive"],
        likesCount: 187,
      },
    ],
  },
  {
    id: "campaign-reels",
    title: "High-Retention Campaign Reels",
    description: "Vertical 9:16 short-form video hooks engineered for paid ad algorithmic scaling.",
    itemCount: 4,
    mediaType: "Videos",
    previewGradient: "from-cyan-950 via-slate-900 to-[#00144A]",
    items: [
      {
        id: "reel-1",
        title: "The 3-Second Hook: Speed Comparison",
        type: "video",
        aspectRatio: "portrait",
        gradient: "from-cyan-950 via-slate-900 to-[#00144A]",
        caption: "Side-by-side frame comparison demonstrating sub-50ms page load versus legacy 3-second load.",
        date: "Aug 10, 2026",
        client: "Hyperion AI",
        cameraOrTool: "After Effects • RED Komodo 6K",
        tags: ["HighRetention", "PaidAds", "HookTesting", "VideoMotion"],
        likesCount: 320,
      },
      {
        id: "reel-2",
        title: "Tactile Button Sound Engineering",
        type: "video",
        aspectRatio: "square",
        gradient: "from-blue-950 via-indigo-900 to-[#00144A]",
        caption: "ASMR acoustic sound design sync paired with physical keyboard-key spring physics in UI.",
        date: "Jul 31, 2026",
        client: "Nexora Studio",
        cameraOrTool: "Sennheiser MKH 416 • Ableton Live",
        tags: ["ASMR", "SoundDesign", "TactileUI"],
        likesCount: 450,
      },
      {
        id: "reel-3",
        title: "Dynamic UGC Founder Teardown",
        type: "video",
        aspectRatio: "portrait",
        gradient: "from-indigo-950 via-slate-900 to-[#00144A]",
        caption: "High-converting founder selfie video ad explaining the 7 deadly checkout micro-frictions.",
        date: "Jul 22, 2026",
        client: "Sterling Atelier",
        cameraOrTool: "iPhone 15 Pro Max ProRes Log",
        tags: ["UGC", "CRO", "FounderLedAds"],
        likesCount: 290,
      },
      {
        id: "reel-4",
        title: "Programmatic Search Visualization",
        type: "video",
        aspectRatio: "landscape",
        gradient: "from-slate-900 via-blue-900 to-[#00144A]",
        caption: "3D node graph animation visualizing 10,000 dynamic URLs generated via Next.js ISR.",
        date: "Jul 15, 2026",
        client: "Aetheria Biotech",
        cameraOrTool: "Cinema 4D • Octane Render",
        tags: ["3DMotion", "SEOArchitecture", "DataViz"],
        likesCount: 215,
      },
    ],
  },
  {
    id: "ui-systems",
    title: "Tactile UI/UX Design Systems",
    description: "Component libraries, interactive design tokens, and mechanical spring prototypes.",
    itemCount: 4,
    mediaType: "Photos",
    previewGradient: "from-indigo-950 via-slate-900 to-[#00144A]",
    items: [
      {
        id: "ui-1",
        title: "Tactile Keycap Design System v2.4",
        type: "photo",
        aspectRatio: "landscape",
        gradient: "from-indigo-950 via-slate-900 to-[#00144A]",
        caption: "Master component token sheet defining 0 6px 0 bottom shadows and physical state transitions.",
        date: "Aug 16, 2026",
        client: "Nexora Core",
        cameraOrTool: "Figma Tokens • Tailwind CSS",
        tags: ["DesignSystem", "Tokens", "KeycapPhysics"],
        likesCount: 380,
      },
      {
        id: "ui-2",
        title: "CapTable Real-Time Equity Map",
        type: "photo",
        aspectRatio: "portrait",
        gradient: "from-slate-900 via-cyan-950 to-[#00144A]",
        caption: "High-density financial data grid with interactive dilution sliders and SVG vector graphs.",
        date: "Aug 05, 2026",
        client: "CapTable Fintech",
        cameraOrTool: "Figma • Framer Motion",
        tags: ["Fintech", "DataGrid", "InteractiveUI"],
        likesCount: 210,
      },
      {
        id: "ui-3",
        title: "Hyperion Global Telemetry HUD",
        type: "photo",
        aspectRatio: "landscape",
        gradient: "from-blue-950 via-teal-950 to-[#00144A]",
        caption: "Sub-50ms edge monitoring heads-up display built with dark navy glassmorphism.",
        date: "Jul 25, 2026",
        client: "Hyperion AI",
        cameraOrTool: "Next.js 14 • Canvas API",
        tags: ["Telemetry", "HUD", "Glassmorphism"],
        likesCount: 310,
      },
      {
        id: "ui-4",
        title: "Bespoke Mobile Checkout Flow",
        type: "photo",
        aspectRatio: "portrait",
        gradient: "from-teal-950 via-slate-900 to-[#00144A]",
        caption: "Single-thumb optimized checkout screen with biometric Apple Pay instant trigger.",
        date: "Jul 12, 2026",
        client: "Sterling Atelier",
        cameraOrTool: "Figma Prototype",
        tags: ["MobileUX", "OneClickCheckout", "CRO"],
        likesCount: 275,
      },
    ],
  },
  {
    id: "bts-moments",
    title: "Behind the Scenes & Field R&D",
    description: "Production sets, design crits, hardware testing, and late-night engineering sessions.",
    itemCount: 4,
    mediaType: "Mixed",
    previewGradient: "from-teal-950 via-blue-950 to-[#00144A]",
    items: [
      {
        id: "bts-1",
        title: "4K Studio Lighting Rig Configuration",
        type: "photo",
        aspectRatio: "landscape",
        gradient: "from-teal-950 via-blue-950 to-[#00144A]",
        caption: "Overhead motorized boom rig calibrated for the Sterling Atelier titanium watch shoot.",
        date: "Aug 12, 2026",
        client: "Nexora Studio",
        cameraOrTool: "Aputure 600d Pro • Nanlite Tubes",
        tags: ["ProductionSet", "StudioLighting", "Cinematography"],
        likesCount: 165,
      },
      {
        id: "bts-2",
        title: "Physical Mechanical Switch Teardown",
        type: "photo",
        aspectRatio: "portrait",
        gradient: "from-blue-900 via-slate-900 to-[#00144A]",
        caption: "Testing spring compression force curves to replicate tactile keypresses in digital CSS.",
        date: "Aug 01, 2026",
        client: "Nexora R&D",
        cameraOrTool: "Digital Force Gauge • 4K Macro",
        tags: ["TactilePhysics", "Hardware", "R&D"],
        likesCount: 340,
      },
      {
        id: "bts-3",
        title: "All-Hands Architecture War Room",
        type: "photo",
        aspectRatio: "landscape",
        gradient: "from-indigo-950 via-cyan-950 to-[#00144A]",
        caption: "Whiteboarding the multi-region edge cache invalidation protocol for Hyperion AI.",
        date: "Jul 20, 2026",
        client: "Nexora Engineering",
        cameraOrTool: "Sony A7S III",
        tags: ["WarRoom", "Engineering", "Architecture"],
        likesCount: 190,
      },
      {
        id: "bts-4",
        title: "Field Location Shoot: Coastal Highway",
        type: "photo",
        aspectRatio: "portrait",
        gradient: "from-slate-900 via-indigo-950 to-[#00144A]",
        caption: "Golden hour anamorphic video recording for luxury automotive campaign asset package.",
        date: "Jul 08, 2026",
        client: "Commercial Client",
        cameraOrTool: "RED Komodo • Atlas Anamorphic",
        tags: ["LocationShoot", "GoldenHour", "Anamorphic"],
        likesCount: 225,
      },
    ],
  },
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const [selectedFolder, setSelectedFolder] = useState<GalleryFolder | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    currentIndex: number;
    items: MediaItem[];
  }>({
    isOpen: false,
    currentIndex: 0,
    items: [],
  });

  // Deep-link auto-opening logic when navigating with ?folder=[slug] or ?media=[id]
  useEffect(() => {
    const folderParam = searchParams.get("folder");
    const mediaParam = searchParams.get("media");

    let activeFolder: GalleryFolder | null = null;

    if (folderParam) {
      const found = galleryFoldersData.find(
        (f) => f.id.toLowerCase() === folderParam.toLowerCase()
      );
      if (found) {
        activeFolder = found;
        setSelectedFolder(found);
      }
    } else {
      setSelectedFolder(null);
    }

    if (mediaParam) {
      const targetFolders = activeFolder ? [activeFolder] : galleryFoldersData;
      let foundFolder: GalleryFolder | null = null;
      let foundIdx = -1;

      for (const folder of targetFolders) {
        const idx = folder.items.findIndex(
          (item) => item.id.toLowerCase() === mediaParam.toLowerCase()
        );
        if (idx !== -1) {
          foundFolder = folder;
          foundIdx = idx;
          break;
        }
      }

      if (foundIdx === -1) {
        for (const folder of galleryFoldersData) {
          const idx = folder.items.findIndex(
            (item) => item.id.toLowerCase() === mediaParam.toLowerCase()
          );
          if (idx !== -1) {
            foundFolder = folder;
            foundIdx = idx;
            break;
          }
        }
      }

      if (foundFolder && foundIdx !== -1) {
        setSelectedFolder(foundFolder);
        setModalState({
          isOpen: true,
          currentIndex: foundIdx,
          items: foundFolder.items,
        });
      }
    } else {
      setModalState((prev) => ({ ...prev, isOpen: false }));
    }
  }, [searchParams]);

  const handleSelectFolder = (folder: GalleryFolder) => {
    setSelectedFolder(folder);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/gallery?folder=${folder.id}`);
    }
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/gallery");
    }
  };

  const handleOpenMedia = (folder: GalleryFolder, index: number) => {
    setModalState({
      isOpen: true,
      currentIndex: index,
      items: folder.items,
    });
    const item = folder.items[index];
    if (typeof window !== "undefined" && item) {
      window.history.pushState(null, "", `/gallery?folder=${folder.id}&media=${item.id}`);
    }
  };

  const handleCloseMediaModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (typeof window !== "undefined") {
      if (selectedFolder) {
        window.history.pushState(null, "", `/gallery?folder=${selectedFolder.id}`);
      } else {
        window.history.pushState(null, "", "/gallery");
      }
    }
  };

  const handleNavigateMedia = (newIndex: number) => {
    setModalState((prev) => ({ ...prev, currentIndex: newIndex }));
    const item = modalState.items[newIndex];
    if (typeof window !== "undefined" && item) {
      const folderSlug = selectedFolder?.id;
      if (folderSlug) {
        window.history.pushState(null, "", `/gallery?folder=${folderSlug}&media=${item.id}`);
      } else {
        window.history.pushState(null, "", `/gallery?media=${item.id}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#000517] text-[#00144A] dark:text-white transition-colors duration-300">
      {/* Instagram-Style Desktop Split Modal */}
      <InstagramSplitModal
        isOpen={modalState.isOpen}
        mediaList={modalState.items}
        currentIndex={modalState.currentIndex}
        onClose={handleCloseMediaModal}
        onNavigate={handleNavigateMedia}
      />

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-slate-50 via-[#FAFBFD] to-[#FAFBFD] dark:from-[#000517] dark:via-[#000517] dark:to-[#000517] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#000F2E] text-[#0099BE] dark:text-[#00D2FF] border border-slate-200 dark:border-slate-800 mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                Media Hub & Creative Vault
              </span>
              <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-black text-[#00144A] dark:text-white tracking-tight leading-[1.1] mb-4">
                Visual Vault & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] dark:from-white via-[#0099BE] to-[#00D2FF]">
                  Creative Archives.
                </span>
              </h1>
              <p className="font-jakarta text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                A curated repository of 4K studio photography, high-retention video reels, tactile design systems, and behind-the-scenes production moments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 shadow-tactile dark:shadow-tactile-dark text-center min-w-[140px]">
                <div className="font-outfit text-2xl font-black text-[#00144A] dark:text-white">
                  48+
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Curated Artifacts
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#00144A] dark:bg-[#000F2E] text-white border border-[#00D2FF]/40 shadow-tactile dark:shadow-tactile-dark text-center min-w-[140px]">
                <div className="font-outfit text-2xl font-black text-[#00D2FF]">
                  4K UHD
                </div>
                <div className="text-[10px] font-bold text-slate-300 dark:text-slate-400 uppercase tracking-wider">
                  Master Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedFolder ? (
            /* View 1: Google Photos-Style Multi-Layered Folder Grid */
            <motion.div
              key="folder-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-outfit text-2xl sm:text-3xl font-black text-[#00144A] dark:text-white">
                    Organized Media Collections
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-jakarta">
                    Select a folder collection to explore high-res artifacts and production details.
                  </p>
                </div>

                <span className="text-xs font-bold text-[#0099BE] dark:text-[#00D2FF] bg-slate-100 dark:bg-[#000F2E] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                  {galleryFoldersData.length} Folders Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryFoldersData.map((folder) => {
                  return (
                    <motion.div
                      key={folder.id}
                      onClick={() => handleSelectFolder(folder)}
                      whileHover={{ y: -6 }}
                      whileTap={{ y: 2 }}
                      className="group relative bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-tactile dark:shadow-tactile-dark hover:shadow-tactile-hover transition-all duration-200 cursor-pointer select-none flex flex-col justify-between"
                    >
                      <div>
                        {/* Multi-Layered Folder Stack Visual */}
                        <div className="relative w-full aspect-[4/3] mb-5">
                          {/* Back Stack Layer 2 */}
                          <div className="absolute top-0 left-3 right-3 h-full rounded-2xl bg-slate-200/80 dark:bg-[#00144A]/60 scale-[0.92] -translate-y-2 opacity-60 border border-slate-300 dark:border-slate-800" />
                          {/* Back Stack Layer 1 */}
                          <div className="absolute top-0 left-1.5 right-1.5 h-full rounded-2xl bg-slate-300/80 dark:bg-[#00144A]/90 scale-[0.96] -translate-y-1 opacity-80 border border-slate-400 dark:border-slate-700" />

                          {/* Front Primary Folder Card */}
                          <div
                            className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${folder.previewGradient} text-white p-5 flex flex-col justify-between border border-slate-800 shadow-md overflow-hidden`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#00D2FF] border border-white/20">
                                <Folder className="w-4 h-4 fill-current" />
                              </div>

                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 text-slate-200 backdrop-blur-sm border border-white/10">
                                {folder.mediaType}
                              </span>
                            </div>

                            <div>
                              <div className="font-outfit font-black text-lg text-white group-hover:text-[#00D2FF] transition-colors">
                                {folder.items.length} Artifacts
                              </div>
                              <div className="text-[11px] text-slate-300">
                                Click to open folder
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Folder Info */}
                        <div className="mb-2">
                          <h3 className="font-outfit text-lg font-bold text-[#00144A] dark:text-white group-hover:text-[#00D2FF] transition-colors">
                            {folder.title}
                          </h3>
                        </div>

                        <p className="font-jakarta text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                          {folder.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#00144A] dark:text-white group-hover:text-[#00D2FF] transition-colors">
                        <span>Browse Media</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* View 2: Media Items Grid inside Selected Folder */
            <motion.div
              key="media-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Back to Folders Button & Breadcrumb */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBackToFolders}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#000F2E] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-jakarta text-xs font-bold transition-all cursor-pointer shadow-sm hover:-translate-x-0.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Folders</span>
                  </button>

                  <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />

                  <span className="font-outfit text-xl font-extrabold text-[#00144A] dark:text-white">
                    {selectedFolder.title}
                  </span>
                </div>

                <span className="text-xs font-bold text-[#0099BE] dark:text-[#00D2FF] bg-slate-50 dark:bg-[#000F2E] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 w-max">
                  {selectedFolder.items.length} Production Artifacts
                </span>
              </div>

              {/* Bento Grid of Child Media Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedFolder.items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    onClick={() => handleOpenMedia(selectedFolder, idx)}
                    whileHover={{ y: -4 }}
                    whileTap={{ y: 2 }}
                    className="group relative bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-tactile dark:shadow-tactile-dark hover:shadow-tactile-hover transition-all duration-200 cursor-pointer select-none flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Media Thumbnail Canvas */}
                      <div
                        className={`relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.gradient} text-white p-4 flex flex-col justify-between border border-slate-800 shadow-inner mb-4 overflow-hidden group-hover:scale-[1.02] transition-transform`}
                      >
                        <div className="flex items-center justify-between z-10">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/40 text-[#00D2FF] border border-white/10 backdrop-blur-sm">
                            {item.type === "video" ? "4K Video" : "Photo"}
                          </span>

                          <div className="p-1 rounded-md bg-black/40 text-white">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-[#00D2FF] text-[#00144A] flex items-center justify-center shadow-lg">
                              <Play className="w-4 h-4 fill-[#00144A] translate-x-0.5" />
                            </div>
                          </div>
                        )}

                        <div className="z-10 text-[11px] text-slate-300 font-medium line-clamp-1">
                          {item.client}
                        </div>
                      </div>

                      {/* Title & Caption */}
                      <h4 className="font-outfit font-bold text-base text-[#00144A] dark:text-white group-hover:text-[#00D2FF] transition-colors line-clamp-1 mb-1.5">
                        {item.title}
                      </h4>
                      <p className="font-jakarta text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>{item.date}</span>
                      <span className="text-[#00144A] dark:text-[#00D2FF] font-bold">
                        {item.client}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#00144A] dark:bg-[#000F2E] text-white relative overflow-hidden border-t border-[#002277] dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Need custom visual production for your brand?
            </h2>
            <p className="font-jakarta text-slate-300 dark:text-slate-400 text-base sm:text-lg">
              Our in-house studio produces commercial photography, vertical motion ad sets, and tailored design token libraries.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="tactile-btn tactile-btn-cyan text-sm py-3.5 px-8 flex items-center justify-center gap-2.5 font-bold shadow-lg"
            >
              <span>Inquire About Studio Production</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFBFD] dark:bg-[#000517]" />}>
      <GalleryContent />
    </Suspense>
  );
}

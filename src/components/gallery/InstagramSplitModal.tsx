"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Calendar,
  Camera,
  Tag,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export interface MediaItem {
  id: string;
  title: string;
  type: "photo" | "video";
  aspectRatio: "portrait" | "landscape" | "square";
  imageUrl?: string;
  videoUrl?: string;
  gradient: string;
  caption: string;
  date: string;
  client: string;
  cameraOrTool: string;
  tags: string[];
  likesCount: number;
}

interface InstagramSplitModalProps {
  mediaList: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const InstagramSplitModal: React.FC<InstagramSplitModalProps> = ({
  mediaList,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentItem = mediaList[currentIndex];
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync likes state when active media changes
  useEffect(() => {
    if (currentItem) {
      setLikes(currentItem.likesCount);
      setIsLiked(false);
      setCopiedLink(false);
      setIsPlaying(true);
    }
  }, [currentItem]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation (Esc, ArrowLeft, ArrowRight)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        const prevIndex = currentIndex === 0 ? mediaList.length - 1 : currentIndex - 1;
        onNavigate(prevIndex);
      } else if (e.key === "ArrowRight") {
        const nextIndex = currentIndex === mediaList.length - 1 ? 0 : currentIndex + 1;
        onNavigate(nextIndex);
      }
    },
    [isOpen, currentIndex, mediaList.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleToggleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleCopyShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
        />

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Left Arrow */}
        <button
          onClick={() => {
            const prevIndex = currentIndex === 0 ? mediaList.length - 1 : currentIndex - 1;
            onNavigate(prevIndex);
          }}
          type="button"
          className="fixed left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer hidden sm:flex items-center justify-center"
          aria-label="Previous media"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Floating Right Arrow */}
        <button
          onClick={() => {
            const nextIndex = currentIndex === mediaList.length - 1 ? 0 : currentIndex + 1;
            onNavigate(nextIndex);
          }}
          type="button"
          className="fixed right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer hidden sm:flex items-center justify-center"
          aria-label="Next media"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Instagram Split Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-6xl h-[88vh] bg-white dark:bg-[#000F2E] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 text-[#00144A] dark:text-white flex flex-col lg:flex-row overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side: Fixed Media Canvas */}
          <div
            className={`w-full lg:w-[60%] h-[45%] lg:h-full bg-gradient-to-br ${currentItem.gradient} relative flex items-center justify-center p-6 text-white overflow-hidden`}
          >
            {currentItem.imageUrl ? (
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.title}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="relative z-10 text-center max-w-md p-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#00D2FF] border border-[#00D2FF]/40 backdrop-blur-md mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  {currentItem.type === "video" ? "4K Video Reel" : "High-Res Editorial Photo"}
                </span>

                <h3 className="font-outfit text-2xl sm:text-3xl font-black mb-2 text-white">
                  {currentItem.title}
                </h3>
                <p className="font-jakarta text-xs sm:text-sm text-slate-300">
                  {currentItem.client}
                </p>

                {currentItem.type === "video" && (
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      type="button"
                      className="w-14 h-14 rounded-full bg-[#00D2FF] text-[#00144A] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-[#00144A]" />
                      ) : (
                        <Play className="w-6 h-6 fill-[#00144A] translate-x-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      type="button"
                      className="p-3 rounded-full bg-black/40 text-white border border-white/20 hover:bg-black/60 transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Bottom Navigation Bar */}
            <div className="lg:hidden absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
              <button
                onClick={() => {
                  const prevIndex = currentIndex === 0 ? mediaList.length - 1 : currentIndex - 1;
                  onNavigate(prevIndex);
                }}
                className="px-3 py-1 rounded-lg bg-black/60 text-white text-xs font-bold"
              >
                ← Prev
              </button>
              <span className="text-xs font-mono bg-black/60 px-2 py-0.5 rounded text-slate-300">
                {currentIndex + 1} / {mediaList.length}
              </span>
              <button
                onClick={() => {
                  const nextIndex = currentIndex === mediaList.length - 1 ? 0 : currentIndex + 1;
                  onNavigate(nextIndex);
                }}
                className="px-3 py-1 rounded-lg bg-black/60 text-white text-xs font-bold"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Right Side: Scrollable Details & Context */}
          <div className="w-full lg:w-[40%] h-[55%] lg:h-full bg-white dark:bg-[#000B26] border-l border-slate-200 dark:border-slate-800 text-[#00144A] dark:text-slate-200 flex flex-col justify-between overflow-hidden">
            {/* Top Bar: Creator Info & Verification */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-white dark:bg-[#000B26] z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00144A] dark:bg-[#000517] text-[#00D2FF] font-outfit font-black text-xs flex items-center justify-center border border-[#00D2FF]/40 shadow-sm flex-shrink-0">
                  NC
                </div>
                <div>
                  <div className="font-outfit font-bold text-sm text-[#00144A] dark:text-white flex items-center gap-1.5">
                    <span>Nexora Creative Studio</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Verified Production Archive
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#00144A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#002277]">
                {currentIndex + 1} / {mediaList.length}
              </span>
            </div>

            {/* Middle Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div>
                <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#00144A] text-[#0099BE] dark:text-[#00D2FF] border border-slate-200 dark:border-[#002277] inline-block mb-2">
                  {currentItem.client}
                </span>
                <h2 className="font-outfit text-xl sm:text-2xl font-black text-[#00144A] dark:text-white tracking-tight mb-2">
                  {currentItem.title}
                </h2>
                <p className="font-jakarta text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {currentItem.caption}
                </p>
              </div>

              {/* Technical Metadata Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#000517] border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-[#0099BE] dark:text-[#00D2FF]" />
                    Date Recorded:
                  </span>
                  <span className="font-bold text-[#00144A] dark:text-white">{currentItem.date}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-500 dark:text-slate-400">
                    <Camera className="w-3.5 h-3.5 text-[#0099BE] dark:text-[#00D2FF]" />
                    Equipment / Stack:
                  </span>
                  <span className="font-bold text-[#00144A] dark:text-white">{currentItem.cameraOrTool}</span>
                </div>
              </div>

              {/* Tag Cloud */}
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0099BE] dark:text-[#00D2FF]" />
                  Campaign Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#00144A] text-[11px] font-semibold text-slate-700 dark:text-[#00D2FF] hover:bg-slate-200 dark:hover:bg-[#002277] transition-colors border border-transparent dark:border-[#002277]/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Engagement Action Bar */}
            <div className="p-5 bg-slate-50/80 dark:bg-[#00081C] border-t border-slate-100 dark:border-slate-800/80 z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Like Button */}
                  <button
                    onClick={handleToggleLike}
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#00144A] dark:text-slate-400 dark:hover:text-[#00D2FF] transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform active:scale-125 ${
                        isLiked ? "fill-[#FF4B72] text-[#FF4B72]" : "text-slate-500 dark:text-slate-400"
                      }`}
                    />
                    <span>{likes} Likes</span>
                  </button>

                  {/* Share Link Button */}
                  <button
                    onClick={handleCopyShare}
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#00144A] dark:text-slate-400 dark:hover:text-[#00D2FF] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                  </button>
                </div>

                <button
                  onClick={handleCopyShare}
                  type="button"
                  className="p-2 rounded-xl bg-white dark:bg-[#00144A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#00144A] dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Download asset"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Production artifact archived under Nexora Client Commercial Rights.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InstagramSplitModal;

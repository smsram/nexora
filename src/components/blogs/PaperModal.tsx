"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ArrowLeft,
  User,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface BlogContentBlock {
  type: "paragraph" | "heading" | "quote" | "callout" | "bullet_list";
  text?: string;
  items?: string[];
  author?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  gradient: string;
  contentBlocks: BlogContentBlock[];
}

interface PaperModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const PaperModal: React.FC<PaperModalProps> = ({ post, onClose }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll & handle Escape key
  useEffect(() => {
    if (!post) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  // Track reading progress within the modal body
  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const progress = (scrollTop / totalScroll) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  return (
    <AnimatePresence>
      {post && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Paper-Like Elevated Reading Card */}
          <motion.div
            layoutId={`blog-card-${post.id}`}
            className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#000B26] text-[#00144A] dark:text-slate-200 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 flex flex-col overflow-hidden transition-colors duration-300"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Real-Time Reading Progress Bar at Top Edge */}
            <div className="w-full h-1 bg-slate-200/80 dark:bg-slate-800 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]"
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Modal Top Floating Header Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 bg-white/95 dark:bg-[#000B26]/95 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 z-20">
              <button
                onClick={onClose}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-[#00144A] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Articles</span>
              </button>

              {/* Action Buttons: Bookmark, Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  type="button"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isBookmarked
                      ? "bg-cyan-50 dark:bg-[#00144A] border-[#00D2FF]/40 text-[#0099BE] dark:text-[#00D2FF]"
                      : "bg-white dark:bg-[#000F2E] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#0099BE] dark:hover:text-[#00D2FF]"
                  }`}
                  aria-label="Bookmark article"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-[#0099BE] dark:fill-[#00D2FF]" : ""}`} />
                </button>

                <button
                  onClick={onClose}
                  type="button"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-[#000F2E] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-slate-600 dark:text-slate-300 hover:text-[#00144A] dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close reading view"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Editorial Content Body */}
            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="p-6 sm:p-10 md:p-14 overflow-y-auto flex-1 space-y-8 max-w-3xl mx-auto w-full"
            >
              {/* Article Meta Bar */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#00144A] text-[#0099BE] dark:text-[#00D2FF] border border-slate-200 dark:border-[#002277]">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishedAt}
                  </span>
                </div>

                <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black text-[#00144A] dark:text-white tracking-tight leading-[1.15]">
                  {post.title}
                </h1>

                <p className="font-jakarta text-slate-600 dark:text-slate-300 text-lg sm:text-xl font-medium leading-relaxed pb-6 border-b border-slate-200 dark:border-slate-800">
                  {post.excerpt}
                </p>
              </div>

              {/* Author Bio Header Snippet */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-[#000F2E] border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#00144A] dark:bg-[#000517] text-[#00D2FF] font-outfit font-black text-sm flex items-center justify-center border border-[#00D2FF]/40 shadow-tactile dark:shadow-tactile-dark flex-shrink-0">
                  {post.author.avatarInitials}
                </div>
                <div>
                  <div className="font-outfit font-bold text-sm text-[#00144A] dark:text-white">
                    {post.author.name}
                  </div>
                  <div className="font-jakarta text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {post.author.role} • Technical Contributor at Nexora
                  </div>
                </div>
              </div>

              {/* Dynamic Content Rendering */}
              <div className="space-y-6 font-jakarta text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-[1.8]">
                {post.contentBlocks.map((block, idx) => {
                  switch (block.type) {
                    case "heading":
                      return (
                        <h2
                          key={idx}
                          className="font-outfit text-2xl sm:text-3xl font-black text-[#00144A] dark:text-white tracking-tight pt-6 pb-1 border-t border-slate-100 dark:border-slate-800"
                        >
                          {block.text}
                        </h2>
                      );

                    case "paragraph":
                      return (
                        <p key={idx} className="text-slate-700 dark:text-slate-300">
                          {block.text}
                        </p>
                      );

                    case "quote":
                      return (
                        <blockquote
                          key={idx}
                          className="p-6 rounded-2xl bg-slate-50 dark:bg-[#000F2E] border-l-4 border-[#00D2FF] border-y border-r border-slate-200/80 dark:border-slate-800 shadow-sm italic text-slate-800 dark:text-slate-200 font-medium my-6"
                        >
                          &ldquo;{block.text}&rdquo;
                          {block.author && (
                            <cite className="block text-xs font-bold not-italic text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">
                              — {block.author}
                            </cite>
                          )}
                        </blockquote>
                      );

                    case "callout":
                      return (
                        <div
                          key={idx}
                          className="p-6 rounded-2xl bg-cyan-50/70 dark:bg-[#00144A]/40 border border-[#00D2FF]/30 my-6 flex items-start gap-4"
                        >
                          <Sparkles className="w-6 h-6 text-[#0099BE] dark:text-[#00D2FF] flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-outfit font-bold text-sm text-[#00144A] dark:text-white mb-1">
                              Key Architectural Takeaway
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {block.text}
                            </p>
                          </div>
                        </div>
                      );

                    case "bullet_list":
                      return (
                        <ul key={idx} className="space-y-3 my-4">
                          {block.items?.map((item, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );

                    default:
                      return null;
                  }
                })}
              </div>

              {/* Article Footer & Author Card */}
              <div className="pt-10 mt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="p-7 rounded-3xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-[#00144A] dark:bg-[#000517] text-[#00D2FF] font-outfit font-black text-lg flex items-center justify-center border border-[#00D2FF]/40 shadow-tactile dark:shadow-tactile-dark flex-shrink-0">
                    {post.author.avatarInitials}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                      Written by {post.author.name}
                    </div>
                    <p className="font-jakarta text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {post.author.role} specializing in Next.js performance scaling, algorithmic advertising infrastructure, and high-converting tactile interfaces at Nexora.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaperModal;

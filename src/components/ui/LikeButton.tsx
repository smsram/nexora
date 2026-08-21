"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  initialCount?: number;
  className?: string;
  isCardHovered?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  initialCount = 12,
  className,
  isCardHovered = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (liked) {
      setCount((prev) => prev - 1);
      setLiked(false);
    } else {
      setCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isCardHovered || liked
          ? { scale: 1, opacity: 1 }
          : { scale: 0, opacity: 0 }
      }
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "absolute top-3.5 right-3.5 z-20 pointer-events-auto",
        className
      )}
    >
      <button
        onClick={handleLike}
        type="button"
        aria-label={liked ? "Unlike this card" : "Like this card"}
        className={cn(
          "relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-outfit shadow-sm backdrop-blur-md transition-all duration-200 cursor-pointer select-none",
          liked
            ? "bg-[#FF4B72] text-white border border-[#B82245] shadow-glow-accent shadow-md"
            : "bg-white/90 text-brand-navy border border-slate-200 hover:border-[#FF4B72]/50 hover:bg-white"
        )}
      >
        <motion.div
          animate={liked ? { scale: [1, 1.45, 1] } : { scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Heart
            className={cn(
              "w-3.5 h-3.5 transition-colors duration-200",
              liked ? "fill-white text-white" : "text-slate-400 group-hover:text-[#FF4B72]"
            )}
          />
        </motion.div>
        
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="tabular-nums"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default LikeButton;

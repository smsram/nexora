"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete?: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isSkipped, setIsSkipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Check one-time manual navigation skip flag (set when user clicks "Home" or Logo in Navbar)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const skipTrigger = sessionStorage.getItem("nexora_skip_intro_trigger");
      if (skipTrigger === "true") {
        // Consume the flag so next page reload/visit plays the intro normally
        sessionStorage.removeItem("nexora_skip_intro_trigger");
        setIsFinished(true);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        return;
      }
    }

    // Lock scrolling while the intro curtain is active
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    window.scrollTo(0, 0);

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const handleFinish = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    setIsFinished(true);
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  };

  if (isFinished) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="brand-intro-curtain"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={
          isSkipped
            ? { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
            : { delay: 2.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        }
        onAnimationComplete={() => {
          handleFinish();
        }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#00144A] text-white overflow-hidden select-none pointer-events-auto touch-none"
        style={{ willChange: "transform" }}
      >
        {/* Ambient Radial Depth Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.12)_0%,rgba(0,20,74,0)_70%)] pointer-events-none" />

        {/* Top Right Skip Button */}
        <button
          onClick={() => setIsSkipped(true)}
          type="button"
          className="absolute top-8 right-8 z-30 text-xs font-outfit uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 hover:border-[#00D2FF] text-slate-300 hover:text-[#00D2FF] transition-all bg-black/30 backdrop-blur-md cursor-pointer"
        >
          Skip ✕
        </button>

        {/* Central Animated Content */}
        <div className="relative flex flex-col items-center justify-center px-4">
          
          {/* Emblem Badge Container with Expanding Glow Aura */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-6">
            
            {/* Backglow Aura */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.2, 1], opacity: [0, 0.7, 0.5] }}
              transition={{ delay: 0.25, duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-[#00D2FF] blur-3xl pointer-events-none"
            />

            {/* Glowing Shield Ring */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 22 }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[#000B2B] border-2 border-[#00D2FF]/50 shadow-[0_0_25px_rgba(0,210,255,0.4)] flex items-center justify-center p-5 overflow-hidden"
            >
              {/* Internal subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D2FF]/25 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* High-Resolution Nexora Emblem Image */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/Nexora.png"
                  alt="Nexora Emblem"
                  width={90}
                  height={90}
                  priority
                  className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,210,255,0.7)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Typography Snap: "Nexora Creations" on line 1, right-aligned "GROUP" on line 2 */}
          <div className="overflow-hidden flex flex-col items-center">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.0,
                type: "spring",
                stiffness: 380,
                damping: 24,
              }}
              className="flex flex-col items-end"
            >
              {/* Line 1: Nexora Creations */}
              <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none mb-1">
                Nexora Creations
              </h1>

              {/* Line 2: GROUP right-aligned */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.15, duration: 0.3 }}
                className="font-outfit text-xs sm:text-sm font-bold tracking-[0.24em] text-[#00D2FF] uppercase leading-none pr-1"
              >
                GROUP
              </motion.span>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete?: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<"loading" | "curtainRise" | "done">("loading");
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFinish = () => {
    setStage("curtainRise");
    setTimeout(() => {
      setStage("done");
      if (onComplete) onComplete();
    }, 900);
  };

  useEffect(() => {
    // If video fails or takes too long (e.g., file not yet copied into /public), fallback gracefully after 4.5 seconds
    const fallbackTimer = setTimeout(() => {
      if (stage === "loading") {
        handleFinish();
      }
    }, 4500);

    return () => clearTimeout(fallbackTimer);
  }, [stage]);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-video-curtain"
        initial={{ y: 0 }}
        animate={stage === "curtainRise" ? { y: "-100%" } : { y: 0 }}
        exit={{ y: "-100%" }}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1], // Cinematic smooth curtain lift
        }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#00144A] text-white overflow-hidden select-none"
      >
        {/* Skip Intro Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={handleFinish}
          className="absolute top-8 right-8 z-30 text-xs font-outfit uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 hover:border-[#00D2FF] text-slate-300 hover:text-[#00D2FF] transition-all bg-black/30 backdrop-blur-md"
        >
          Skip ✕
        </motion.button>

        {/* Video Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {!videoFailed ? (
            <video
              ref={videoRef}
              src="/Nexora Loading.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleFinish}
              onError={() => {
                setVideoFailed(true);
              }}
              className="w-full h-full object-cover max-w-5xl max-h-[85vh] rounded-2xl"
            />
          ) : (
            /* High-End Fallback Visual when video file is not yet copied */
            <div className="flex flex-col items-center justify-center text-center p-6">
              <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#00D2FF]/20 blur-xl animate-pulse" />
                <div className="w-20 h-20 rounded-2xl bg-[#000B2B] border border-[#00D2FF]/40 shadow-tactile flex items-center justify-center text-[#00D2FF]">
                  <span className="font-outfit font-black text-3xl">N</span>
                </div>
              </div>
              <h2 className="font-outfit text-3xl font-black tracking-tight text-white mb-2">
                NEXORA
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#000B2B] border border-slate-700 text-[11px] font-outfit uppercase tracking-widest text-[#00D2FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-ping" />
                Loading Experience...
              </div>
            </div>
          )}
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#000B2B]">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#00D2FF] via-[#FF4B72] to-[#00D2FF]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;

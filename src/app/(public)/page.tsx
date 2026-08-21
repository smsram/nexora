"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import IntroAnimation from "@/components/global/IntroAnimation";
import HeroSection from "@/components/home/HeroSection";
import TrustMarquee from "@/components/home/TrustMarquee";
import ServiceGrid from "@/components/home/ServiceGrid";
import StorySection from "@/components/home/StorySection";
import TeamSlider from "@/components/home/TeamSlider";
import DomainGrid from "@/components/home/DomainGrid";

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <>
      {/* Seamless Cinema-Grade Brand Reveal */}
      {!introFinished && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* Main Home Page Sequence with Smooth Hero Fade-in */}
      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <HeroSection />
        <TrustMarquee />
        <ServiceGrid />
        <StorySection />
        <TeamSlider />
        <DomainGrid />
      </motion.div>
    </>
  );
}

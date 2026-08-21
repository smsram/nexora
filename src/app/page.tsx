"use client";

import React, { useState } from "react";
import IntroAnimation from "@/components/global/IntroAnimation";
import HeroSection from "@/components/home/HeroSection";
import TrustMarquee from "@/components/home/TrustMarquee";
import ServiceGrid from "@/components/home/ServiceGrid";
import StorySection from "@/components/home/StorySection";
import TeamSlider from "@/components/home/TeamSlider";
import DomainGrid from "@/components/home/DomainGrid";

export default function HomePage() {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <>
      {/* High-End Intro Animation with Curtain Reveal */}
      <IntroAnimation onComplete={() => setIntroCompleted(true)} />

      {/* Page Content */}
      <div className="relative">
        <HeroSection />
        <TrustMarquee />
        <ServiceGrid />
        <StorySection />
        <TeamSlider />
        <DomainGrid />
      </div>
    </>
  );
}

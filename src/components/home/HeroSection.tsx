"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  Code2, 
  TrendingUp, 
  Target, 
  Cpu 
} from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export const HeroSection: React.FC = () => {
  const [particlesInit, setParticlesInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 190,
            links: {
              opacity: 0.85,
              color: "#00D2FF",
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: ["#00144A", "#00D2FF", "#0099BE"],
        },
        links: {
          color: "#00D2FF",
          distance: 145,
          enable: true,
          opacity: 0.32,
          width: 1.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 750,
            height: 750,
          },
          value: 60,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 2.5, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section id="hero" className="relative min-h-[88vh] pt-32 pb-20 overflow-hidden bg-white bg-grid-pattern flex items-center">
      {/* Ambient background light gradients */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-[#00144A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Refined Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Main Headline with optimized leading and balanced line breaks */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="font-outfit text-4xl sm:text-5xl md:text-6xl lg:text-[4.15rem] font-black tracking-tight text-brand-navy leading-tight max-w-2xl mb-6"
            >
              High-Impact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                Digital Marketing
              </span>{" "}
              & Web Solutions.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="font-jakarta text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed mb-8"
            >
              Nexora engineers bespoke digital ecosystems. We combine tactile web architecture, precision performance marketing, and conversion-first creative systems to scale category leaders.
            </motion.p>

            {/* Action Buttons with Tactile Keycap Physics */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto mb-10"
            >
              <Link
                href="#services"
                className="tactile-btn tactile-btn-navy text-sm py-3.5 px-7 flex items-center gap-2 group w-full sm:w-auto"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00D2FF]" />
              </Link>

              <Link
                href="#contact"
                className="tactile-btn tactile-btn-white text-sm py-3.5 px-7 flex items-center gap-2 group w-full sm:w-auto"
              >
                <Play className="w-3.5 h-3.5 fill-[#00144A] text-[#00144A]" />
                <span>Book Discovery Call</span>
              </Link>
            </motion.div>

            {/* Bottom Trust Metrics with Clean Navy Accents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-xl"
            >
              <div>
                <p className="font-outfit font-black text-2xl sm:text-3xl text-brand-navy tracking-tight">
                  150+
                </p>
                <p className="font-jakarta text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Delivered Platforms
                </p>
              </div>

              <div>
                <p className="font-outfit font-black text-2xl sm:text-3xl text-[#0099BE] tracking-tight">
                  340%
                </p>
                <p className="font-jakarta text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Average ROI Surge
                </p>
              </div>

              <div>
                <p className="font-outfit font-black text-2xl sm:text-3xl text-brand-navy tracking-tight">
                  99.4%
                </p>
                <p className="font-jakarta text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Client Retention
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Interactive Tech Particle Web Canvas with Floating Marketing Nodes */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px]">
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl bg-gradient-to-b from-slate-50/90 to-slate-100/70 border border-slate-200 shadow-tactile overflow-hidden flex items-center justify-center">
              
              {/* Particle Canvas */}
              {particlesInit && (
                <Particles
                  id="hero-particles"
                  className="absolute inset-0 w-full h-full cursor-crosshair z-0"
                  options={particlesOptions}
                />
              )}

              {/* Floating Tech & Marketing Node Pills */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm pointer-events-none"
              >
                <div className="w-6 h-6 rounded-lg bg-[#00144A] text-[#00D2FF] flex items-center justify-center">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-outfit font-bold text-xs text-brand-navy">
                  Web Architecture
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-8 right-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm pointer-events-none"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="font-outfit font-bold text-xs text-brand-navy">
                  Growth & SEO
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-8 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm pointer-events-none"
              >
                <div className="w-6 h-6 rounded-lg bg-cyan-50 text-[#0099BE] border border-[#00D2FF]/40 flex items-center justify-center">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span className="font-outfit font-bold text-xs text-brand-navy">
                  High-ROAS Ads
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
                className="absolute bottom-6 right-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm pointer-events-none"
              >
                <div className="w-6 h-6 rounded-lg bg-[#00144A] text-[#00D2FF] flex items-center justify-center">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <span className="font-outfit font-bold text-xs text-brand-navy">
                  AI Marketing
                </span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

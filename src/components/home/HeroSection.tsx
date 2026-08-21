"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
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
            distance: 200,
            links: {
              opacity: 0.9,
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
          value: ["#00144A", "#00D2FF", "#0099BE", "#FF4B72"],
        },
        links: {
          color: "#00144A",
          distance: 140,
          enable: true,
          opacity: 0.28,
          width: 1.6,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1.6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 800,
            height: 800,
          },
          value: 65,
        },
        opacity: {
          value: { min: 0.35, max: 0.85 },
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 2.5, max: 5.5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section id="hero" className="relative min-h-[88vh] pt-32 pb-20 overflow-hidden bg-white bg-grid-pattern flex items-center">
      {/* Ambient background light gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-[#00144A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Refined Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Main Headline with optimized leading and wrapping */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-outfit text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight text-brand-navy leading-tight max-w-2xl mb-6"
            >
              High-Impact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]">
                Digital Marketing
              </span>{" "}
              & Web Solutions.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-jakarta text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed mb-8"
            >
              Nexora engineers bespoke digital ecosystems. We combine tactile web architecture, precision performance marketing, and conversion-first creative systems to scale category leaders.
            </motion.p>

            {/* Action Buttons with Tactile Physics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
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

            {/* Trust Metric Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-xl"
            >
              <div>
                <p className="font-outfit font-black text-2xl sm:text-3xl text-brand-navy tracking-tight">
                  120+
                </p>
                <p className="font-jakarta text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Delivered Platforms
                </p>
              </div>

              <div>
                <p className="font-outfit font-black text-2xl sm:text-3xl text-[#0099BE] tracking-tight">
                  340%
                </p>
                <p className="font-jakarta text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Average ROI Surge
                </p>
              </div>

              <div>
                <p className="font-outfit font-black text-2xl sm:text-3xl text-[#FF4B72] tracking-tight">
                  99.4%
                </p>
                <p className="font-jakarta text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Client Retention
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Interactive Tech-Themed Particle Web Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            <div className="relative w-full h-[450px] sm:h-[520px] rounded-3xl bg-gradient-to-b from-slate-50/90 to-slate-100/70 border border-slate-200 shadow-tactile overflow-hidden flex items-center justify-center">
              {particlesInit && (
                <Particles
                  id="hero-particles"
                  className="absolute inset-0 w-full h-full cursor-crosshair"
                  options={particlesOptions}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

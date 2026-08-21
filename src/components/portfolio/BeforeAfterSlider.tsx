"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { MoveHorizontal, Sparkles } from "lucide-react";

export interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeStats?: { label: string; value: string };
  afterStats?: { label: string; value: string };
  aspectRatio?: string; // e.g. "aspect-[16/10]"
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before Nexora",
  afterLabel = "After Optimization",
  beforeStats,
  afterStats,
  aspectRatio = "aspect-[16/10]",
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-200 shadow-tactile ${className}`}
    >
      {/* Background (After State - Right Layer) */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#00144A] via-[#002266] to-[#000B2B] text-white p-6 flex flex-col justify-between">
        {afterImage ? (
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            className="object-cover"
          />
        ) : (
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 backdrop-blur-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {afterLabel}
              </span>
              {afterStats && (
                <div className="text-right">
                  <div className="font-outfit text-2xl sm:text-3xl font-black text-[#00D2FF]">
                    {afterStats.value}
                  </div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {afterStats.label}
                  </div>
                </div>
              )}
            </div>

            {/* Visual Simulated Growth Graph */}
            <div className="space-y-2">
              <div className="h-16 sm:h-24 w-full bg-gradient-to-t from-[#00D2FF]/20 to-transparent rounded-xl border-b-2 border-[#00D2FF] flex items-end justify-between px-3 pb-1">
                <div className="w-2 h-6 bg-[#00D2FF] rounded-t" />
                <div className="w-2 h-10 bg-[#00D2FF] rounded-t" />
                <div className="w-2 h-14 bg-[#00D2FF] rounded-t" />
                <div className="w-2 h-18 bg-[#00D2FF] rounded-t" />
                <div className="w-2 h-24 bg-[#00D2FF] rounded-t shadow-[0_0_12px_#00D2FF]" />
              </div>
              <div className="text-xs text-slate-300 font-jakarta flex items-center justify-between">
                <span>Nexora High-Performance Funnel</span>
                <span className="text-emerald-400 font-bold">+340% Lift</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Foreground (Before State - Left Layer clipped by sliderPosition) */}
      <div
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-800 p-6 flex flex-col justify-between overflow-hidden"
        style={{
          clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
        }}
      >
        {beforeImage ? (
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className="object-cover"
          />
        ) : (
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-white shadow-sm">
                {beforeLabel}
              </span>
              {beforeStats && (
                <div className="text-right">
                  <div className="font-outfit text-2xl sm:text-3xl font-bold text-slate-700">
                    {beforeStats.value}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {beforeStats.label}
                  </div>
                </div>
              )}
            </div>

            {/* Visual Simulated Stagnant Graph */}
            <div className="space-y-2">
              <div className="h-16 sm:h-24 w-full bg-slate-300/60 rounded-xl border-b-2 border-slate-500 flex items-end justify-between px-3 pb-1">
                <div className="w-2 h-6 bg-slate-400 rounded-t" />
                <div className="w-2 h-5 bg-slate-400 rounded-t" />
                <div className="w-2 h-7 bg-slate-400 rounded-t" />
                <div className="w-2 h-4 bg-slate-400 rounded-t" />
                <div className="w-2 h-6 bg-slate-500 rounded-t" />
              </div>
              <div className="text-xs text-slate-600 font-jakarta flex items-center justify-between">
                <span>Legacy Architecture (Flat Growth)</span>
                <span className="text-slate-500 font-medium">Stagnant</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Central Draggable Vertical Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#00144A] border-2 border-[#00D2FF] shadow-lg flex items-center justify-center text-white">
          <MoveHorizontal className="w-4 h-4 text-[#00D2FF]" />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;

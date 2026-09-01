"use client";

import React from "react";
import { 
  Building2, 
  Cpu, 
  Globe2, 
  Layers, 
  Rocket, 
  Shield, 
  Zap, 
  Compass, 
  Flame, 
  Radio 
} from "lucide-react";

interface ClientBrand {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const clientBrands: ClientBrand[] = [
  { name: "Apex Global", category: "FinTech Scaleup", icon: <Building2 className="w-4 h-4" /> },
  { name: "Lumina Intelligence", category: "AI Systems", icon: <Cpu className="w-4 h-4" /> },
  { name: "Vertex Media", category: "Omnichannel Commerce", icon: <Layers className="w-4 h-4" /> },
  { name: "Nova Growth", category: "SaaS Enterprise", icon: <Rocket className="w-4 h-4" /> },
  { name: "Pulse Technologies", category: "HealthTech Platform", icon: <Radio className="w-4 h-4" /> },
  { name: "Zenith Core", category: "Cyber Infrastructure", icon: <Shield className="w-4 h-4" /> },
  { name: "Hyperion Web", category: "Web3 Protocol", icon: <Globe2 className="w-4 h-4" /> },
  { name: "Stratos Labs", category: "Deep Learning", icon: <Zap className="w-4 h-4" /> },
  { name: "Vanguard Studio", category: "Luxury D2C", icon: <Compass className="w-4 h-4" /> },
  { name: "Ignite Venture", category: "Growth Capital", icon: <Flame className="w-4 h-4" /> },
];

export const TrustMarquee: React.FC = () => {
  return (
    <section className="py-14 bg-slate-50/60 dark:bg-[#000517] border-y border-slate-200/80 dark:border-slate-800 overflow-hidden relative select-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7 text-center">
        <p className="font-outfit text-xs font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
          Trusted by Industry Innovators & Global Brands
        </p>
      </div>

      {/* Marquee Viewport with Left/Right Edge Fades and Hover-Pause */}
      <div className="relative w-full overflow-hidden marquee-container">
        
        {/* Left Edge Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-slate-50 dark:from-[#000517] via-slate-50/80 dark:via-[#000517]/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right Edge Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-slate-50 dark:from-[#000517] via-slate-50/80 dark:via-[#000517]/80 to-transparent z-10 pointer-events-none" />

        {/* Dual-Track 100% Seamless Infinite Loop */}
        <div className="marquee-group flex">
          {/* Primary Track */}
          <div className="marquee-track flex items-center">
            {clientBrands.map((client, idx) => (
              <div
                key={`marquee-track1-${idx}`}
                className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#00D2FF] hover:shadow-md transition-all duration-200 cursor-pointer flex-shrink-0"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#00144A] dark:text-[#00D2FF] group-hover:text-[#0099BE] flex-shrink-0">
                  {client.icon}
                </div>
                <div className="flex flex-col text-left pr-1">
                  <span className="font-outfit font-bold text-xs text-[#00144A] dark:text-white whitespace-nowrap leading-tight">
                    {client.name}
                  </span>
                  <span className="font-jakarta text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight whitespace-nowrap">
                    {client.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Exact Clone Track for 100% Seamless Infinite Wrapping */}
          <div aria-hidden="true" className="marquee-track flex items-center">
            {clientBrands.map((client, idx) => (
              <div
                key={`marquee-track2-${idx}`}
                className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white dark:bg-[#001133] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#00D2FF] hover:shadow-md transition-all duration-200 cursor-pointer flex-shrink-0"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#00144A] dark:text-[#00D2FF] group-hover:text-[#0099BE] flex-shrink-0">
                  {client.icon}
                </div>
                <div className="flex flex-col text-left pr-1">
                  <span className="font-outfit font-bold text-xs text-[#00144A] dark:text-white whitespace-nowrap leading-tight">
                    {client.name}
                  </span>
                  <span className="font-jakarta text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight whitespace-nowrap">
                    {client.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustMarquee;

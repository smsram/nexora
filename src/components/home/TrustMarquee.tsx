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
  { name: "Apex Global", category: "FinTech Scaleup", icon: <Building2 className="w-5 h-5" /> },
  { name: "Lumina Intelligence", category: "AI Systems", icon: <Cpu className="w-5 h-5" /> },
  { name: "Vertex Media", category: "Omnichannel Commerce", icon: <Layers className="w-5 h-5" /> },
  { name: "Nova Growth", category: "SaaS Enterprise", icon: <Rocket className="w-5 h-5" /> },
  { name: "Pulse Technologies", category: "HealthTech Platform", icon: <Radio className="w-5 h-5" /> },
  { name: "Zenith Core", category: "Cyber Infrastructure", icon: <Shield className="w-5 h-5" /> },
  { name: "Hyperion Web", category: "Web3 Protocol", icon: <Globe2 className="w-5 h-5" /> },
  { name: "Stratos Labs", category: "Deep Learning", icon: <Zap className="w-5 h-5" /> },
  { name: "Vanguard Studio", category: "Luxury D2C", icon: <Compass className="w-5 h-5" /> },
  { name: "Ignite Venture", category: "Growth Capital", icon: <Flame className="w-5 h-5" /> },
];

export const TrustMarquee: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50/70 border-y border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="font-outfit text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
          Trusted by Industry Innovators & Global Brands
        </p>
      </div>

      {/* Marquee Wrapper with Smooth Pause-on-Hover */}
      <div className="relative w-full overflow-hidden marquee-container group">
        
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

        {/* Track 1 (Right to Left) */}
        <div className="marquee-track flex items-center gap-6">
          {clientBrands.map((client, idx) => (
            <div
              key={`marquee-1-${idx}`}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-[0_5px_0_#000B2B] hover:border-[#00D2FF] hover:translate-y-[2px] hover:shadow-[0_3px_0_#000B2B] transition-all duration-150 cursor-pointer min-w-[210px] select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-navy group-hover:text-[#0099BE]">
                {client.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-extrabold text-sm text-brand-navy whitespace-nowrap">
                  {client.name}
                </span>
                <span className="font-jakarta text-[10px] font-medium text-slate-500">
                  {client.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Track 2 (Seamless Duplicate) */}
        <div aria-hidden="true" className="marquee-track flex items-center gap-6">
          {clientBrands.map((client, idx) => (
            <div
              key={`marquee-2-${idx}`}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-[0_5px_0_#000B2B] hover:border-[#00D2FF] hover:translate-y-[2px] hover:shadow-[0_3px_0_#000B2B] transition-all duration-150 cursor-pointer min-w-[210px] select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-navy group-hover:text-[#0099BE]">
                {client.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-extrabold text-sm text-brand-navy whitespace-nowrap">
                  {client.name}
                </span>
                <span className="font-jakarta text-[10px] font-medium text-slate-500">
                  {client.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustMarquee;

"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

// Authentic WhatsApp SVG Path Icon
const WhatsAppSvgIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.677.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.527-.075-.15-.677-1.633-.927-2.235-.244-.586-.492-.507-.677-.516l-.577-.01c-.2 0-.526.075-.802.376s-1.053 1.028-1.053 2.508c0 1.48 1.078 2.909 1.228 3.11.15.2 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.78-.727 2.03-1.43.251-.702.251-1.304.175-1.43-.075-.125-.276-.201-.577-.351z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95a.75.75 0 0 0 .937.937l4.782-1.388A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 1.5a8.5 8.5 0 0 1 8.5 8.5c0 4.694-3.806 8.5-8.5 8.5a8.46 8.46 0 0 1-4.223-1.12.75.75 0 0 0-.546-.073l-3.567 1.035 1.035-3.567a.75.75 0 0 0-.073-.546A8.46 8.46 0 0 1 3.5 12 8.5 8.5 0 0 1 12 3.5z"
    />
  </svg>
);

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = "+1234567890",
  defaultMessage = "Hello Nexora team, I'd like to discuss a digital marketing & web project!",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Quick message preview popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 bg-white rounded-2xl border border-slate-200 shadow-tactile p-4 text-brand-navy"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-700">
                  Nexora Direct Line
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-brand-navy transition-colors p-0.5"
                aria-label="Close message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="font-jakarta text-xs text-slate-600 mb-3.5 leading-relaxed">
              Have questions about your web architecture or marketing campaigns? Connect directly on WhatsApp with our senior strategists.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tactile-btn tactile-btn-navy w-full py-2.5 text-xs font-bold gap-2 flex items-center justify-center"
            >
              <WhatsAppSvgIcon className="w-4 h-4 fill-emerald-400" />
              <span>Start WhatsApp Chat</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with Ambient Ripple */}
      <div className="relative group">
        {/* Continuous ambient expanding ripple ring */}
        <span className="absolute -inset-2 rounded-full bg-emerald-500/25 whatsapp-ripple pointer-events-none" />
        
        {/* Tooltip on hover */}
        {!isOpen && !hasInteracted && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 text-brand-navy font-outfit text-xs font-bold px-3 py-1.5 rounded-xl shadow-[0_4px_0_#000B2B] whitespace-nowrap hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            Chat on WhatsApp
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border-r border-t border-slate-200 rotate-45" />
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          aria-label="Toggle WhatsApp chat"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white border border-emerald-400 shadow-tactile hover:translate-y-[2px] hover:shadow-tactile-hover active:translate-y-[4px] active:shadow-tactile-pressed transition-all duration-150 cursor-pointer"
        >
          <WhatsAppSvgIcon className="w-7 h-7 fill-white drop-shadow-sm" />
          
          {/* Online green indicator badge */}
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;

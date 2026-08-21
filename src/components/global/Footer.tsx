"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Send, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Github, 
  Mail, 
  MapPin, 
  Phone,
  CheckCircle2
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="bg-[#00144A] text-white pt-20 pb-12 border-t-4 border-[#00D2FF] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Teardown Strip */}
        <div className="bg-[#000B2B] rounded-3xl border border-slate-800 p-8 sm:p-10 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="tactile-key-pill uppercase tracking-wider text-[10px] bg-[#00144A] text-[#00D2FF] border-[#002277] mb-3 inline-block">
              Nexora Weekly Insights
            </span>
            <h3 className="font-outfit text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Stay Ahead of Algorithmic Marketing & Next.js Architecture.
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-slate-400 mt-2">
              Curated breakdowns of modern web engineering, conversion frameworks, and paid media breakthroughs.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-outfit text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You're in. Welcome to the inner circle!</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 min-w-[280px]">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-slate-700 text-white placeholder-slate-400 font-jakarta text-sm focus:outline-none focus:border-[#00D2FF] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="tactile-btn tactile-btn-cyan text-xs py-3 px-6 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              {!logoError ? (
                <Image
                  src="/Nexora.png"
                  alt="Nexora"
                  width={150}
                  height={42}
                  className="h-10 w-auto object-contain brightness-0 invert"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00D2FF] text-[#00144A] flex items-center justify-center font-outfit font-black text-xl shadow-[0_4px_0_#0099BE]">
                    N
                  </div>
                  <div>
                    <span className="font-outfit text-2xl font-black tracking-tight text-white block leading-none">
                      NEXORA
                    </span>
                    <span className="font-outfit text-[10px] font-bold tracking-[0.25em] text-[#00D2FF] uppercase">
                      Creations GROUP
                    </span>
                  </div>
                </div>
              )}
            </Link>

            <p className="font-jakarta text-sm text-slate-400 leading-relaxed max-w-sm">
              Nexora is a premier digital marketing and web solutions group. We engineer high-performance platforms, tactile interfaces, and self-funding acquisition flywheels.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#00D2FF]/20 hover:border-[#00D2FF] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#00D2FF]/20 hover:border-[#00D2FF] transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#00D2FF]/20 hover:border-[#00D2FF] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#00D2FF]/20 hover:border-[#00D2FF] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 font-jakarta text-xs text-slate-400">
              <li><Link href="#services" className="hover:text-[#00D2FF] transition-colors">Performance Web Architecture</Link></li>
              <li><Link href="#services" className="hover:text-[#00D2FF] transition-colors">AI Digital Marketing</Link></li>
              <li><Link href="#services" className="hover:text-[#00D2FF] transition-colors">Hyper-Growth SEO</Link></li>
              <li><Link href="#services" className="hover:text-[#00D2FF] transition-colors">Brand Identity & Tactile UI/UX</Link></li>
              <li><Link href="#services" className="hover:text-[#00D2FF] transition-colors">Conversion Rate Optimization</Link></li>
              <li><Link href="#services" className="hover:text-[#00D2FF] transition-colors">Paid Social & Ads</Link></li>
            </ul>
          </div>

          {/* Col 3: Domains */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white mb-4">
              Domains
            </h4>
            <ul className="space-y-2.5 font-jakarta text-xs text-slate-400">
              <li><Link href="#domains" className="hover:text-[#00D2FF] transition-colors">FinTech & Web3</Link></li>
              <li><Link href="#domains" className="hover:text-[#00D2FF] transition-colors">Healthcare & Telemed</Link></li>
              <li><Link href="#domains" className="hover:text-[#00D2FF] transition-colors">Enterprise SaaS</Link></li>
              <li><Link href="#domains" className="hover:text-[#00D2FF] transition-colors">High-Volume E-Commerce</Link></li>
              <li><Link href="#domains" className="hover:text-[#00D2FF] transition-colors">Real Estate Portals</Link></li>
              <li><Link href="#domains" className="hover:text-[#00D2FF] transition-colors">Luxury Brands</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 font-jakarta text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00D2FF] flex-shrink-0 mt-0.5" />
                <span>Nexora Global Tech Center, Innovation Hub</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                <a href="mailto:contact@nexoracreations.com" className="hover:text-[#00D2FF] transition-colors">
                  contact@nexoracreations.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00D2FF] flex-shrink-0" />
                <span>+1 (800) 450-NEXORA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-jakarta text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Nexora Creations GROUP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Security Architecture</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

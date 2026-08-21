"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  CheckCircle2
} from "lucide-react";
import NexoraLogo from "./NexoraLogo";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#00144A] text-white pt-20 pb-12 border-t-4 border-[#00D2FF] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Newsletter Strip */}
        <div className="bg-[#000B2B] rounded-3xl border border-slate-800 p-8 sm:p-10 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="uppercase tracking-wider text-[10px] bg-[#00144A] text-[#00D2FF] border border-[#002277] px-3 py-1 rounded-full mb-3 inline-block font-semibold">
              Nexora Insights
            </span>
            <h3 className="font-outfit text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Stay Ahead of Algorithmic Marketing & Modern Web Systems.
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-slate-400 mt-2">
              Curated breakdowns of modern web engineering, conversion frameworks, and paid media breakthroughs.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-outfit text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You're subscribed to Nexora Insights!</span>
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
                  className="bg-[#00D2FF] hover:bg-[#00b8e6] text-[#00144A] font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:translate-y-0.5"
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
              <NexoraLogo showText={true} size="lg" variant="dark" />
            </Link>

            <p className="font-jakarta text-sm text-slate-400 leading-relaxed max-w-sm">
              Nexora is a premier digital marketing and web solutions group engineering high-performance platforms, tactile interfaces, and self-funding growth engines.
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
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 font-jakarta text-xs text-slate-400">
              <li><Link href="/services" className="hover:text-[#00D2FF] transition-colors">Web Architecture</Link></li>
              <li><Link href="/services" className="hover:text-[#00D2FF] transition-colors">AI Digital Marketing</Link></li>
              <li><Link href="/services" className="hover:text-[#00D2FF] transition-colors">Hyper-Growth SEO</Link></li>
              <li><Link href="/services" className="hover:text-[#00D2FF] transition-colors">Brand & Tactile UI/UX</Link></li>
              <li><Link href="/services" className="hover:text-[#00D2FF] transition-colors">Paid Ads & Scaling</Link></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 font-jakarta text-xs text-slate-400">
              <li><Link href="/portfolio" className="hover:text-[#00D2FF] transition-colors">Case Studies</Link></li>
              <li><Link href="/testimonials" className="hover:text-[#00D2FF] transition-colors">Client Verdicts</Link></li>
              <li><Link href="/gallery" className="hover:text-[#00D2FF] transition-colors">Visual Archives</Link></li>
              <li><Link href="/blogs" className="hover:text-[#00D2FF] transition-colors">Articles & Guides</Link></li>
              <li><Link href="/#story" className="hover:text-[#00D2FF] transition-colors">Our Story</Link></li>
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
                <span>Nexora Global Innovation Hub</span>
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
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
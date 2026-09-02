"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import NexoraLogo from "@/components/global/NexoraLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@nexoracreations.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate 1-second secure authentication delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/admin/services");
      }, 700);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#000517] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Ambient Radial Cyan Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.12)_0%,transparent_65%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #002277 1px, transparent 1px), linear-gradient(to bottom, #002277 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Centered Keycap Bento Login Card */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-md bg-[#000B2B] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl z-10 overflow-hidden"
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00144A] via-[#0099BE] to-[#00D2FF]" />

        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-4">
            <NexoraLogo showText={true} size="lg" variant="dark" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#00144A] text-[#00D2FF] border border-[#002277] shadow-sm mb-3">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Admin Gateway • Internal Access</span>
          </div>

          <p className="font-jakarta text-xs sm:text-sm text-slate-400">
            Sign in with verified administrator credentials to access the production management console.
          </p>
        </div>

        {/* Success Confirmation State */}
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8 space-y-3"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-outfit text-xl font-bold text-white">
              Authentication Verified
            </h3>
            <p className="text-xs text-slate-400 font-jakarta">
              Loading Administrative Portal & Component Engine...
            </p>
          </motion.div>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Work Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexoracreations.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#000517] border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Security Passkey
                </label>
                <button
                  type="button"
                  onClick={() => alert("Mock password reset token dispatched to administrative email.")}
                  className="text-[11px] text-[#00D2FF] hover:underline cursor-pointer"
                >
                  Forgot Key?
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#000517] border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Session Checkbox */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#000517] border-slate-700 text-[#00D2FF] focus:ring-0 cursor-pointer"
                />
                <span>Maintain 30-Day Session</span>
              </label>

              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3" />
                TLS 1.3 Active
              </span>
            </div>

            {/* Mechanical Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full tactile-btn tactile-btn-cyan text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2 font-bold cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Administrative Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Security Disclaimers */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500 font-jakarta">
          Protected by Nexora Military-Grade Gateway Architecture. <br />
          Unauthorized access attempts are logged with client telemetry.
        </div>
      </motion.div>

      {/* Return to Public Site Link */}
      <div className="mt-6 z-10">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-[#00D2FF] transition-colors flex items-center gap-1.5 font-jakarta"
        >
          <span>← Return to Public Website</span>
        </Link>
      </div>
    </div>
  );
}

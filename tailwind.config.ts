import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#00144A",
          "navy-dark": "#000B2B",
          "navy-light": "#002070",
          cyan: "#00D2FF",
          "cyan-dark": "#0099BE",
          "cyan-glow": "#00D2FF33",
          accent: "#FF4B72",
          "accent-dark": "#D92E54",
          surface: "#F8FAFC",
          "surface-card": "#FFFFFF",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        tactile: "0 6px 0 #000B2B",
        "tactile-hover": "0 4px 0 #000B2B",
        "tactile-pressed": "0 2px 0 #000B2B",
        "tactile-cyan": "0 6px 0 #0099BE",
        "tactile-cyan-hover": "0 4px 0 #0099BE",
        "tactile-cyan-pressed": "0 2px 0 #0099BE",
        "tactile-accent": "0 6px 0 #D92E54",
        "glow-cyan": "0 0 25px rgba(0, 210, 255, 0.4)",
        "glow-accent": "0 0 25px rgba(255, 75, 114, 0.4)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "ripple-slow": "ripple 3s cubic-bezier(0, 0.2, 0.8, 1) infinite",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;

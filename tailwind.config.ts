import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter:  ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        outfit: ["var(--font-outfit)", "Outfit", "system-ui", "sans-serif"],
        sans:   ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          primary:   "#08091a",
          secondary: "#0c0e22",
          card:      "#0f1128",
          elevated:  "#141630",
        },
        gold: {
          DEFAULT: "#f5c518",
          dim:     "#d4a017",
          light:   "#fde68a",
        },
        accent: {
          blue:   "#3b82f6",
          bright: "#60a5fa",
          indigo: "#6366f1",
        },
      },
      backgroundImage: {
        "gold-gradient":    "linear-gradient(135deg, #f5c518 0%, #e8a900 100%)",
        "blue-gradient":    "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        "hero-gradient":    "linear-gradient(180deg, rgba(8,9,26,0) 0%, rgba(8,9,26,0.85) 70%, #08091a 100%)",
        "card-gradient":    "linear-gradient(180deg, transparent 40%, rgba(8,9,26,0.98) 100%)",
        "section-gradient": "linear-gradient(90deg, #f5c518, #3b82f6, transparent)",
      },
      animation: {
        "fade-in":      "fadeIn 0.5s cubic-bezier(0.4,0,0.2,1) both",
        "slide-up":     "slideUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in":     "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
        "float":        "floatY 3.5s ease-in-out infinite",
        "gold-shimmer": "goldShimmer 4s linear infinite",
        "spin-slow":    "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn:      { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideUp:     { from: { opacity: "0", transform: "translateY(32px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn:     { from: { opacity: "0", transform: "scale(0.88)" }, to: { opacity: "1", transform: "scale(1)" } },
        floatY:      { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        goldShimmer: { "0%": { backgroundPosition: "0% center" }, "100%": { backgroundPosition: "200% center" } },
      },
      boxShadow: {
        gold:       "0 0 24px rgba(245,197,24,0.35), 0 0 80px rgba(245,197,24,0.12)",
        "gold-sm":  "0 0 14px rgba(245,197,24,0.3)",
        blue:       "0 0 24px rgba(59,130,246,0.4),  0 0 80px rgba(59,130,246,0.15)",
        "blue-sm":  "0 0 14px rgba(59,130,246,0.3)",
        card:       "0 4px 24px rgba(0,0,0,0.5)",
        "card-hover": "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.3), 0 0 40px rgba(59,130,246,0.12)",
        poster:     "0 0 0 1px rgba(59,130,246,0.15), 0 12px 48px rgba(0,0,0,0.7)",
        elevated:   "0 8px 32px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;

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
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        primary: "#0A0A0A",
        accent: "#D4AF37",
        "accent-light": "#F5E6A3",
        "accent-dark": "#B8960C",
        surface: "#1A1A1A",
        "surface-light": "#242424",
        textSecondary: "#A0A0A0",
        success: "#2ECC71",
        error: "#E74C3C",
        warning: "#F39C12",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        "hero-gradient": "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.8) 60%, #0A0A0A 100%)",
      },
      boxShadow: {
        "gold": "0 0 20px rgba(212, 175, 55, 0.15)",
        "gold-lg": "0 0 40px rgba(212, 175, 55, 0.25)",
        "gold-xl": "0 10px 60px rgba(212, 175, 55, 0.3)",
        "dark": "0 10px 40px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      "xs": "390px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "xs": "0.75rem",
      "sm": ["0.825rem", "1.15rem"],
      "base": ["0.875rem", "1.275rem"],
      "lg": ["0.925rem", "1.05rem"],
      "xl": "1rem",
      "2xl": "1.1rem",
      "3xl": ["1.3rem", "1.7rem"],
      "4xl": "1.6rem",
      "5xl": "2rem",
      "6xl": "3rem",
      "max": "4rem",
    },
    extend: {
      colors: {
        // https://nipponcolors.com/
        "harakurenai": "#D0104C", // red-500
        "kurenai": "#CB1B45", // red-400
        "kon": "#0F2540", // slate-800
        "kachi": "#08192D", // slate-900
        "shironeri": "#FCFAF2", // white
        "gofun": "#FFFFFB", // gray-100
        "shironezumi": "#BDC0BA", // gray-200
        "hainezumi": "#9D9FA3", // gray-300
        "ginnezumi": "#91989F", // gray-400
        "hai": "#828282", // gray-500
        "namari": "#787878", // gray-600
        "tokusa": "#2D6D4B", // green-600
        "shinbashi": "#0089A7", // blue-600

      },
      fontFamily: {
        "mono": ["var(--font-ibm-plex-mono)", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        "home-hero": "url('/assets/photographer.png')",
        "footer": "url('/assets/camera.webp')",
      },
      animation: {
        "rotate-pulse":
          "rotate-pulse 0.75s linear infinite normal both running",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": "fadeIn 1.5s ease-out infinite",
        "neon": "neon 5s steps(1) infinite",
      },
      keyframes: {
        "rotate-pulse": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(0.8)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fadeIn" : {
          from: {opacity: 0, transform: "scale(1.3)"},
          to: {opacity : 1, transform: "scale(1)"},
        },
        "neon": {
          "5%, 9%, 13%, 25%" : {
            background: "none",
            color: "rgba(255, 255,255, 0.5)",
            textShadow: "none",
          },
          "7%, 11%, 15%, 19%, 30%, 100%": {
            color: "#668cf5",
            // eslint-disable-next-line max-len
            textShadow: "0px 0px 5px #668cf5, 0px 0px 20px #0b2902, 0px 0px 50px #188998",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};

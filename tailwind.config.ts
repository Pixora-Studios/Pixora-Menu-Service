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
        background: "#F7F3EE",
        primary: "#C96A3B",
        secondary: "#7A9E7E",
        "text-primary": "#1C1A17",
        "text-muted": "#7A6F65",
        glass: "rgba(255,255,255,0.55)",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        sans: ["var(--font-dm-sans)"],
      },
      boxShadow: {
        clay: "0 8px 32px rgba(180,120,80,0.10)",
      },
      borderRadius: {
        "20": "20px",
        "14": "14px",
      },
    },
  },
  plugins: [],
};
export default config;

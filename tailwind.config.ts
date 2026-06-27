import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bgSecondary: "var(--bg-secondary)",
        accent: "var(--accent)",
        accentMuted: "var(--accent-muted)",
        text: "var(--text)",
        textMuted: "var(--text-muted)",
        cardBg: "var(--card-bg)",
        border: "var(--border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;

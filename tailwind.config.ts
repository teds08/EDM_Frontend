import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EDEBE2",
        "paper-raised": "#F7F5EF",
        ink: "#1C1A15",
        "ink-soft": "#635F52",
        "ink-faint": "#948F7E",
        line: "#D6D1C1",
        brand: { DEFAULT: "#1F3A5F", dark: "#142942", soft: "#E6EAEF" },
        sev: {
          critical: "#7A1F1B",
          high: "#B23A2E",
          medium: "#B4791C",
          low: "#5F6B54",
        },
        good: { DEFAULT: "#2F6F5C", soft: "#E4EEEA" },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};
export default config;

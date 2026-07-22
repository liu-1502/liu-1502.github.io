import type { Config } from "tailwindcss";

// Tailwind is set up for NEW work you add going forward.
// The original Yuzu design system lives in styles/yuzu.css (imported globally)
// and is untouched, so the existing UI stays pixel-identical.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

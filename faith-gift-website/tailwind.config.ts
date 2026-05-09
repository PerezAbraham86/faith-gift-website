import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fbf6ec",
        linen: "#f2e7d5",
        sand: "#dfceb4",
        clay: "#8b6b4f",
        cocoa: "#4d3829",
        gold: "#b88a35",
        "gold-dark": "#926b26",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(77, 56, 41, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

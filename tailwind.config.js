/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          bg: "#0a0f0d",
          card: "#111916",
          border: "#1e2e26",
          green: "#2d6a4f",
          light: "#40916c",
          accent: "#52b788",
        },
        amber: {
          warn: "#d4a843",
        },
        danger: "#c1121f",
      },
    },
  },
  plugins: [],
};

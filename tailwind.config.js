/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Rajdhani"', "sans-serif"],
        content: ['"PT Sans"', "sans-serif"],
      },
      colors: {
        forest: {
          bg: "#ffffff",
          card: "#ffffff",
          border: "#e2e8f0",
          header: "#0b2434",
          blue: "#0b4279",
          teal: "#1f5a59",
          green: "#428b6F",
          accent: "#428b6F",
          light: "#1f5a59",
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

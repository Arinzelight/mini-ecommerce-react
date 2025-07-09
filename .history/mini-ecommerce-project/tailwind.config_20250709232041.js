import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          : "#07484A", // main primary
          light: "#70908B", // lighter variant
        },

        // Secondary Colors
        secondary: {
          mint: "#CAF3E5",
          sky: "#E0EFF6",
          lavender: "#EEEBFF",
          peach: "#FFF4E7",
          blush: "#FDFBF8",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

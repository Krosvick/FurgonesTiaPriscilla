import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",
],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),
    nextui(), 
  ],
  darkMode: "class",
  daisyui: {
    themes : ['light']
  },
} satisfies Config;

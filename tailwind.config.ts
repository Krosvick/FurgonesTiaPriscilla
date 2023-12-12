import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./node_modules/flowbite-react/**/*.js",
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
    require("flowbite/plugin"),
    require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes : ['light']
  },
} satisfies Config;

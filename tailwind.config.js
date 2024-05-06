/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "spin-reverse": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        spin: "spin 2s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

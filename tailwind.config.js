/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mum: {
          purple: "#B57EDC",
          purpleDeep: "#6E3F9C",
          purpleSoft: "#C9A5E4",
          /** Light pink page background */
          bg: "#fdf2f8",
          shell: "#fdf2f8",
          surface: "#fdf2f8",
          ink: "#2A1B3D",
          inkDeep: "#3D2A55",
          blush: "#fdf2f8",
          mist: "#faf5ff",
          petal: "#fce7f3",
          lilac: "#e9d5ff",
        },
      },
    },
  },
  plugins: [],
}

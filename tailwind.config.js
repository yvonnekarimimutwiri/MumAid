/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.tsx",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				mum: {
					purple: "var(--color-mum-purple, #B57EDC)",
					purpleDeep: "var(--color-mum-purpleDeep, #6E3F9C)",
					purpleSoft: "#C9A5E4",
					bg: "var(--color-mum-bg, #fdf2f8)",
					shell: "#fdf2f8",
					surface: "#fdf2f8",
					ink: "var(--color-mum-ink, #2A1B3D)",
					inkDeep: "#3D2A55",
					blush: "#fdf2f8",
					mist: "var(--color-mum-mist, #faf5ff)",
					petal: "var(--color-mum-petal, #fce7f3)",
					lilac: "#e9d5ff",
				},
			},
		},
	},
	plugins: [],
}

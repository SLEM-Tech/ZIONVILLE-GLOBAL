import { nextui } from "@nextui-org/react";
export const content = [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = "class";
export const theme = {
	extend: {
		fontFamily: {
			poppins: ["var(--font-poppins)", "sans-serif"],
		},

		colors: {
			light: "#F3F3F3",
			background: "#F3F3F3",
			gray: {
				100: "#FDF7FD",
				200: "#CCCCCC",
				300: "#F7F7F7",
				400: "#FAFAFA",
			},
			primary: "#B6349A",
			effect: "#F8F9FA",
			primaryColor: {
				100: "#B6349A",
				200: "#9B2C83",
				300: "#80236D",
				400: "#661B56",
				500: "#4B1240",
			},
			dark: "#131117",
			text_color: "#19191D",
			secondary: {
				200: "#333",
				300: "#777",
				400: "#242424",
				500: "#848484",
				600: "#BFBFBF",
				700: "#E4E4E4",
				800: "#D9DADC",
			},
			orange: "#FB5646",
		},
		animation: {
			"spin-slow": "spin 8s linear infinite",
		},
	},
	screens: {
		xs: "400px",
		slg: "999px", // @media (min-width: 999px
		xmd: "800px", // @media (min-width: 800px)
		...require("tailwindcss/defaultTheme").screens,
	},
};
export const plugins = [nextui()];

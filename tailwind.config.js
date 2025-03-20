/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	darkMode: "media", // or 'class' for manual dark mode
	theme: {
		extend: {
			colors: {
				// Use CSS variables for theme colors
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: "var(--primary)",
			},
			fontFamily: {
				sans: [
					"var(--font-instrument-sans)",
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"sans-serif",
				],
			},
			height: {
				"7/8": "87.5%",
			},
			width: {
				"7/8": "87.5%",
				"1/8": "12.5%",
			},
			animation: {
				gradient: "gradient 8s ease infinite",
				"ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
			},
			keyframes: {
				gradient: {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
			},
			typography: {
				DEFAULT: {
					css: {
						color: "var(--foreground)",
						a: {
							color: "var(--primary)",
							"&:hover": {
								color: "var(--primary-hover)",
							},
						},
					},
				},
			},
			transitionDuration: {
				2000: "2000ms",
			},
			blur: {
				xs: "2px",
			},
			screens: {
				xs: "480px",
			},
		},
	},
	plugins: [],
	// Reduce file size in production
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	experimental: {
		optimizeUniversalDefaults: true,
	},
};

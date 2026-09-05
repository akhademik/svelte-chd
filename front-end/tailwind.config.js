/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				sand: {
					DEFAULT: '#D6CBAE',
					alt: '#C7BB98',
					card: '#DFD5B9',
				},
				stone: {
					50: '#DFD5B9',
					100: '#D6CBAE',
					200: '#C7BB98',
					300: '#B0A27E',
					400: '#8A7E64',
					500: '#5C5646',
					600: '#484336',
					700: '#363229',
					800: '#2A2720',
					900: '#2B2A24',
					950: '#1E1D19',
				},
				charcoal: {
					DEFAULT: '#2B2A24',
					dark: '#1E1D19',
				},
				moss: {
					DEFAULT: '#5F6E56',
					hover: '#4A5642',
					dark: '#353E2F',
				},
				ochre: {
					DEFAULT: '#A3764A',
					hover: '#8C633C',
				},
				ocher: {
					DEFAULT: '#A3764A',
					hover: '#8C633C',
				},
				forest: {
					DEFAULT: '#5F6E56',
					hover: '#4A5642',
				},
				terracotta: '#A3764A',
				primary: '#2A2720',
				secondary: '#A3764A',
				accent: '#5F6E56',
				'accent-deep': '#4A5642',
				'accent-warm': '#A3764A',
			},
			fontFamily: {
				heading: ['"Sora"', 'sans-serif'],
				serif: ['"Sora"', 'sans-serif'],
				sans: ['"Plus Jakarta Sans"', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

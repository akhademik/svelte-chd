/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				sand: {
					DEFAULT: '#EAE3D3',
					alt: '#DFD6BF',
					card: '#F3EEE0',
				},
				stone: {
					50: '#F3EEE0',
					100: '#EAE3D3',
					200: '#DFD6BF',
					300: '#C8BEA8',
					400: '#9C9482',
					500: '#6B6455',
					600: '#524C3F',
					700: '#3D382E',
					800: '#2E2B24',
					900: '#2B2A24',
					950: '#1E1D19',
				},
				moss: {
					DEFAULT: '#6B7A5E',
					hover: '#52604A',
					dark: '#3D4836',
				},
				ocher: {
					DEFAULT: '#B8875A',
					hover: '#9E7147',
				},
				forest: {
					DEFAULT: '#6B7A5E',
					hover: '#52604A',
				},
				terracotta: '#B8875A',
				primary: '#2E2B24',
				secondary: '#B8875A',
			},
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['"Plus Jakarta Sans"', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				stone: {
					50: '#FAF9F6',
					100: '#F5F4F0',
					200: '#E7E5E0',
					300: '#D5D2CA',
					800: '#2A2A28',
					900: '#191918',
				},
				forest: {
					DEFAULT: '#2D3E35',
					hover: '#223029',
				},
				terracotta: '#A65B44',
				primary: '#191918',
				secondary: '#A65B44',
			},
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['"Plus Jakarta Sans"', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

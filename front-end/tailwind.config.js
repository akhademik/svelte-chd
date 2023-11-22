/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#003851',
				secondary: '#e77916',
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				figtree: ['Figtree', 'sans-serif'],
			},
		},
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
		},
	},
	plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// === 1. SEMANTIC BRAND TOKENS ===
				primary: {
					DEFAULT: '#5F6E56',
					hover: '#4A5642',
					dark: '#353E2F',
				},
				secondary: {
					DEFAULT: '#A3764A',
					hover: '#8C633C',
				},

				// === 2. SEMANTIC SURFACE TOKENS ===
				background: '#D6CBAE',
				surface: {
					DEFAULT: '#DFD5B9',
					muted: '#C7BB98',
				},

				// === 3. SEMANTIC CONTENT TOKENS ===
				foreground: {
					DEFAULT: '#2A2720',
					muted: '#5C5646',
					subtle: '#8A7E64',
				},

				// === 4. SEMANTIC BORDER TOKENS ===
				border: {
					DEFAULT: '#C7BB98',
					strong: '#B0A27E',
				},

				// === 5. SEMANTIC INVERSE TOKENS (Dark/Footer/Hero) ===
				inverse: {
					DEFAULT: '#2B2A24',
					dark: '#1E1D19',
					foreground: '#DFD5B9',
				},

				// === 6. INTERNAL PRIMITIVE SCALE (Reference only, do not use in UI) ===
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

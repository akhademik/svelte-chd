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

				// === 6. BRAND PALETTE ALIASES (For clear visual naming & backward compatibility) ===
				sand: {
					DEFAULT: '#D6CBAE',
					alt: '#C7BB98',
					card: '#DFD5B9',
				},
				moss: {
					DEFAULT: '#5F6E56',
					hover: '#4A5642',
					dark: '#353E2F',
				},
				terracotta: '#A3764A',
				ochre: {
					DEFAULT: '#A3764A',
					hover: '#8C633C',
				},
				charcoal: {
					DEFAULT: '#2B2A24',
					dark: '#1E1D19',
				},

				// === 7. TONAL SCALE (Internal Stone Scale) ===
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

				// === 8. COMPATIBILITY ALIASES ===
				accent: {
					DEFAULT: '#5F6E56',
					deep: '#4A5642',
					warm: '#A3764A',
				},
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

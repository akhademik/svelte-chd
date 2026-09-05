import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$assets: './src/lib/assets/',
			$base: './src/lib/base/',
			$utils: './src/lib/utils/',
			$modules: './src/lib/modules/',
			$i18n: './src/i18n/',
			$stores: './src/lib/stores/',
			$types: './src/lib/types/',
		},
	},
	vitePlugin: {
		inspector: true,
	},
}

export default config

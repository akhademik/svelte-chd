# Graph Report - .  (2026-09-02)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 700 nodes · 1093 edges · 69 communities (61 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `25076690`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- front-end/src/i18n/i18n-svelte.ts
- front-end2/src/i18n/i18n-svelte.ts
- front-end2/src/lib/utils/sanity.ts
- helper-functions.ts
- front-end2/src/lib/base/index.ts
- scripts
- back-end/package.json
- front-end/src/i18n/fr/index.ts
- compilerOptions
- devDependencies
- compilerOptions
- scripts
- front-end/src/lib/types/tour.type.ts
- front-end/src/lib/stores/nav-store.ts
- front-end2/src/i18n/en/index.ts
- front-end/src/i18n/en/index.ts
- front-end/src/lib/base/index.ts
- front-end/src/lib/utils/sanity.ts
- front-end2/src/i18n/fr/index.ts
- front-end2/src/i18n/vn/index.ts
- front-end2/src/routes/[lang]/contact/+page.server.ts
- devDependencies
- devDependencies
- front-end/src/lib/stores/seo-store.ts
- $app/stores
- front-end2/src/routes/api/tours/+server.ts
- front-end/src/routes/[lang]/contact/+page.server.ts
- front-end/src/routes/api/tours/+server.ts
- front-end/src/routes/[lang]/[tourtype]/[slug]/+page.svelte
- svelte-typewriter
- autoprefixer
- eslint-config-prettier
- eslint-plugin-svelte
- knip
- postcss
- prettier-plugin-svelte
- prettier-plugin-tailwindcss
- svelte-check
- svelte-eslint-parser
- @sveltejs/adapter-auto
- @sveltejs/vite-plugin-svelte
- sveltekit-superforms
- tailwindcss
- tslib
- @types/node
- @typescript-eslint/eslint-plugin
- vite
- zod
- front-end2/.typesafe-i18n.json
- front-end/.typesafe-i18n.json
- front-end2/src/routes/[lang]/+layout.ts
- front-end2/svelte.config.js
- front-end/src/routes/[lang]/+layout.ts
- front-end/svelte.config.js

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `Locales` - 12 edges
3. `Locales` - 12 edges
4. `scripts` - 11 edges
5. `scripts` - 11 edges
6. `compilerOptions` - 9 edges
7. `compilerOptions` - 9 edges
8. `loadLocaleAsync()` - 7 edges
9. `loadLocaleAsync()` - 7 edges
10. `add_thousand_separator()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/day-tours.ts → back-end/components/c-number-input.tsx
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/highland-tours.ts → back-end/components/c-number-input.tsx
- `gen_price_range()` --indirect_call--> `CNumberInput()`  [INFERRED]
  back-end/schemas/helper-functions.ts → back-end/components/c-number-input.tsx
- `Locals` --references--> `Locales`  [EXTRACTED]
  front-end/src/app.d.ts → front-end/src/i18n/i18n-types.ts
- `load()` --calls--> `loadLocaleAsync()`  [EXTRACTED]
  front-end/src/routes/+layout.ts → front-end/src/i18n/i18n-util.async.ts

## Import Cycles
- None detected.

## Communities (69 total, 8 thin omitted)

### Community 0 - "front-end/src/i18n/i18n-svelte.ts"
Cohesion: 0.07
Nodes (36): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+28 more)

### Community 1 - "front-end2/src/i18n/i18n-svelte.ts"
Cohesion: 0.07
Nodes (35): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+27 more)

### Community 2 - "front-end2/src/lib/utils/sanity.ts"
Cohesion: 0.07
Nodes (20): booking_modal, BookingModalState, tour_index_store, GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String (+12 more)

### Community 3 - "helper-functions.ts"
Cohesion: 0.09
Nodes (28): add_thousand_separator(), CNumberInput(), parseNumber(), prepare(), prepare(), BASE_FIELDS, Field, GenerateField (+20 more)

### Community 4 - "front-end2/src/lib/base/index.ts"
Cohesion: 0.05
Nodes (14): Translation, menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg, nav_mobile, seo_description (+6 more)

### Community 5 - "scripts"
Cohesion: 0.06
Nodes (37): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, @sanity/client, @sanity/image-url (+29 more)

### Community 6 - "back-end/package.json"
Cohesion: 0.07
Nodes (30): dependencies, react, react-dom, react-is, sanity, @sanity/vision, styled-components, keywords (+22 more)

### Community 7 - "front-end/src/i18n/fr/index.ts"
Cohesion: 0.10
Nodes (14): contact_page, home_page, nav_bar, seo, tours, Translation, contact_page, home_page (+6 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+15 more)

### Community 10 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+13 more)

### Community 11 - "scripts"
Cohesion: 0.11
Nodes (17): author, name, name, private, scripts, all, build, check (+9 more)

### Community 12 - "front-end/src/lib/types/tour.type.ts"
Cohesion: 0.15
Nodes (9): GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price, Tour, format_price() (+1 more)

### Community 13 - "front-end/src/lib/stores/nav-store.ts"
Cohesion: 0.19
Nodes (3): nav_animate_hidden, nav_deg, nav_mobile

### Community 14 - "front-end2/src/i18n/en/index.ts"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 15 - "front-end/src/i18n/en/index.ts"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 16 - "front-end/src/lib/base/index.ts"
Cohesion: 0.18
Nodes (3): Icon, Icons, NOTE:

### Community 17 - "front-end/src/lib/utils/sanity.ts"
Cohesion: 0.23
Nodes (7): logger, builder, config, get_length_and_index(), get_tour_slug(), persist_data, tour_by_index()

### Community 18 - "front-end2/src/i18n/fr/index.ts"
Cohesion: 0.27
Nodes (5): contact_page, home_page, nav_bar, seo, tours

### Community 19 - "front-end2/src/i18n/vn/index.ts"
Cohesion: 0.27
Nodes (5): contact_page, home_page, nav_bar, seo, tours

### Community 20 - "front-end2/src/routes/[lang]/contact/+page.server.ts"
Cohesion: 0.28
Nodes (4): form_schema, actions, TODO: Do something with the validated form.data, actions

### Community 21 - "devDependencies"
Cohesion: 0.25
Nodes (8): devDependencies, prettier, svelte, @typescript-eslint/parser, svelte, @typescript-eslint/parser, prettier, @typescript-eslint/parser

### Community 22 - "devDependencies"
Cohesion: 0.25
Nodes (8): @sveltejs/kit, devDependencies, prettier, svelte, @sveltejs/kit, prettier, svelte, @sveltejs/kit

### Community 23 - "front-end/src/lib/stores/seo-store.ts"
Cohesion: 0.25
Nodes (3): seo_description, seo_keywords, seo_title

### Community 25 - "front-end2/src/routes/api/tours/+server.ts"
Cohesion: 0.47
Nodes (5): client, config, fetch_data(), fetch_exchange_rate(), GET()

### Community 26 - "front-end/src/routes/[lang]/contact/+page.server.ts"
Cohesion: 0.40
Nodes (3): form_schema, actions, TODO: Do something with the validated form.data

### Community 27 - "front-end/src/routes/api/tours/+server.ts"
Cohesion: 0.47
Nodes (5): client, config, fetch_data(), fetch_exchange_rate(), GET()

### Community 29 - "svelte-typewriter"
Cohesion: 0.50
Nodes (3): svelte-typewriter, svelte-typewriter, svelte-typewriter

### Community 30 - "autoprefixer"
Cohesion: 0.67
Nodes (3): autoprefixer, autoprefixer, autoprefixer

### Community 31 - "eslint-config-prettier"
Cohesion: 0.67
Nodes (3): eslint-config-prettier, eslint-config-prettier, eslint-config-prettier

### Community 32 - "eslint-plugin-svelte"
Cohesion: 0.67
Nodes (3): eslint-plugin-svelte, eslint-plugin-svelte, eslint-plugin-svelte

### Community 33 - "knip"
Cohesion: 0.67
Nodes (3): knip, knip, knip

### Community 34 - "postcss"
Cohesion: 0.67
Nodes (3): postcss, postcss, postcss

### Community 35 - "prettier-plugin-svelte"
Cohesion: 0.67
Nodes (3): prettier-plugin-svelte, prettier-plugin-svelte, prettier-plugin-svelte

### Community 36 - "prettier-plugin-tailwindcss"
Cohesion: 0.67
Nodes (3): prettier-plugin-tailwindcss, prettier-plugin-tailwindcss, prettier-plugin-tailwindcss

### Community 37 - "svelte-check"
Cohesion: 0.67
Nodes (3): svelte-check, svelte-check, svelte-check

### Community 38 - "svelte-eslint-parser"
Cohesion: 0.67
Nodes (3): svelte-eslint-parser, svelte-eslint-parser, svelte-eslint-parser

### Community 39 - "@sveltejs/adapter-auto"
Cohesion: 0.67
Nodes (3): @sveltejs/adapter-auto, @sveltejs/adapter-auto, @sveltejs/adapter-auto

### Community 40 - "@sveltejs/vite-plugin-svelte"
Cohesion: 0.67
Nodes (3): @sveltejs/vite-plugin-svelte, @sveltejs/vite-plugin-svelte, @sveltejs/vite-plugin-svelte

### Community 41 - "sveltekit-superforms"
Cohesion: 0.67
Nodes (3): sveltekit-superforms, sveltekit-superforms, sveltekit-superforms

### Community 42 - "tailwindcss"
Cohesion: 0.67
Nodes (3): tailwindcss, tailwindcss, tailwindcss

### Community 43 - "tslib"
Cohesion: 0.67
Nodes (3): tslib, tslib, tslib

### Community 44 - "@types/node"
Cohesion: 0.67
Nodes (3): @types/node, @types/node, @types/node

### Community 45 - "@typescript-eslint/eslint-plugin"
Cohesion: 0.67
Nodes (3): @typescript-eslint/eslint-plugin, @typescript-eslint/eslint-plugin, @typescript-eslint/eslint-plugin

### Community 46 - "vite"
Cohesion: 0.67
Nodes (3): vite, vite, vite

### Community 47 - "zod"
Cohesion: 0.67
Nodes (3): zod, zod, zod

## Knowledge Gaps
- **176 isolated node(s):** `locale_translations`, `target`, `dom`, `dom.iterable`, `esnext` (+171 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `devDependencies`, `scripts`, `devDependencies`, `svelte-typewriter`, `autoprefixer`, `eslint-config-prettier`, `eslint-plugin-svelte`, `knip`, `postcss`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte-check`, `svelte-eslint-parser`, `@sveltejs/adapter-auto`, `@sveltejs/vite-plugin-svelte`, `sveltekit-superforms`, `tailwindcss`, `tslib`, `@types/node`, `@typescript-eslint/eslint-plugin`, `vite`, `zod`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `devDependencies`, `devDependencies`, `svelte-typewriter`, `autoprefixer`, `eslint-config-prettier`, `eslint-plugin-svelte`, `knip`, `postcss`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte-check`, `svelte-eslint-parser`, `@sveltejs/adapter-auto`, `@sveltejs/vite-plugin-svelte`, `sveltekit-superforms`, `tailwindcss`, `tslib`, `@types/node`, `@typescript-eslint/eslint-plugin`, `vite`, `zod`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **What connects `locale_translations`, `target`, `dom` to the rest of the system?**
  _176 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `front-end/src/i18n/i18n-svelte.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0670762928827445 - nodes in this community are weakly interconnected._
- **Should `front-end2/src/i18n/i18n-svelte.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06927551560021153 - nodes in this community are weakly interconnected._
- **Should `front-end2/src/lib/utils/sanity.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `helper-functions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09302325581395349 - nodes in this community are weakly interconnected._
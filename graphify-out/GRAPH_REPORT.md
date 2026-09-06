# Graph Report - svelte-chd  (2026-09-06)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 627 nodes · 948 edges · 78 communities (20 shown, 28 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `61d1edf7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sanity.ts
- i18n-svelte.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- seo-store.ts
- sanity-client.ts
- compilerOptions
- [lang]/+page.server.ts
- nav-store.ts
- devDependencies
- en/index.ts
- fr/index.ts
- vn/index.ts
- i18n-helper.ts
- compilerOptions
- devDependencies
- tours/+server.ts
- icons.ts
- blog/+server.ts
- .typesafe-i18n.json
- eslint-config-prettier
- eslint-plugin-svelte
- jsdom
- knip
- postcss
- prettier-plugin-svelte
- prettier-plugin-tailwindcss
- svelte
- svelte-check
- svelte-eslint-parser
- svelte-typewriter
- @sveltejs/adapter-auto
- @sveltejs/adapter-cloudflare
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- sveltekit-superforms
- @testing-library/svelte
- tslib
- @types/node
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- vite
- vitest
- zod
- [lang]/+layout.ts
- svelte.config.js

## God Nodes (most connected - your core abstractions)
1. `scripts` - 30 edges
2. `compilerOptions` - 15 edges
3. `scripts` - 14 edges
4. `Locales` - 11 edges
5. `sendMail()` - 10 edges
6. `compilerOptions` - 9 edges
7. `scripts` - 9 edges
8. `Tour` - 8 edges
9. `fetchToursByType()` - 8 edges
10. `loadLocaleAsync()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `TourModalState` --references--> `Tour`  [EXTRACTED]
  front-end/src/lib/stores/modal-store.ts → front-end/src/lib/types/tour.type.ts
- `Locals` --references--> `Locales`  [EXTRACTED]
  front-end/src/app.d.ts → front-end/src/i18n/i18n-types.ts
- `load()` --calls--> `loadLocaleAsync()`  [EXTRACTED]
  front-end/src/routes/+layout.ts → front-end/src/i18n/i18n-util.async.ts
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/day-tours.ts → back-end/components/c-number-input.tsx
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/highland-tours.ts → back-end/components/c-number-input.tsx

## Import Cycles
- None detected.

## Communities (78 total, 28 thin omitted)

### Community 0 - "sanity.ts"
Cohesion: 0.05
Nodes (34): DEFAULT_EXCHANGE_RATES, booking_modal, BookingModalState, defaultRates, exchange_rates_store, ExchangeRates, blog_modal, BlogModalState (+26 more)

### Community 1 - "i18n-svelte.ts"
Cohesion: 0.06
Nodes (27): App, Locals, initFormatters(), { locale, LL, setLocale }, BaseLocale, Formatters, Locales, RootTranslation (+19 more)

### Community 2 - "schemas/index.ts"
Cohesion: 0.07
Nodes (34): add_thousand_separator(), CNumberInput(), parseNumber(), sanity, keywords, prepare(), prepare(), BASE_FIELDS (+26 more)

### Community 3 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (34): description, name, private, scripts, build, build:all, build:be, build:fe (+26 more)

### Community 5 - "back-end/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react, react-dom, react-is, sanity-plugin-media, @sanity/vision, styled-components, license (+25 more)

### Community 6 - "seo-store.ts"
Cohesion: 0.08
Nodes (11): if(), seo_description, seo_keywords, seo_og_image, seo_title, SeoState, url_for(), ./$types (+3 more)

### Community 7 - "sanity-client.ts"
Cohesion: 0.13
Nodes (18): cachedFetch(), ExchangeRatesData, EXTRACT_BLOG_FIELDS, EXTRACT_TOUR_FIELDS, fetchAllBlogs(), fetchFeaturedBlogs(), fetchLatestExchangeRates(), fetchSingleTourBySlug() (+10 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.16
Nodes (15): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, form_schema, FormSchema (+7 more)

### Community 10 - "nav-store.ts"
Cohesion: 0.11
Nodes (8): Translation, menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg, nav_mobile, ./$types

### Community 11 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+13 more)

### Community 12 - "en/index.ts"
Cohesion: 0.19
Nodes (8): en, blog_page, contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 13 - "fr/index.ts"
Cohesion: 0.21
Nodes (7): fr, blog_page, contact_page, home_page, nav_bar, seo, tours

### Community 14 - "vn/index.ts"
Cohesion: 0.21
Nodes (7): vn, blog_page, contact_page, home_page, nav_bar, seo, tours

### Community 15 - "i18n-helper.ts"
Cohesion: 0.32
Nodes (9): handle(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale(), REGEX_START_WITH_BASE, replace_locale_in_url(), detectLocale() (+1 more)

### Community 16 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @playwright/test, prettier, tailwindcss, prettier, tailwindcss (+1 more)

### Community 18 - "tours/+server.ts"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 19 - "icons.ts"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

## Knowledge Gaps
- **207 isolated node(s):** `BookingModalState`, `BlogModalState`, `GeneralKeyString`, `Highlights`, `Img_Cover` (+202 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 286 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `devDependencies`, `eslint-config-prettier`, `eslint-plugin-svelte`, `jsdom`, `knip`, `postcss`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte`, `svelte-check`, `svelte-eslint-parser`, `svelte-typewriter`, `@sveltejs/adapter-auto`, `@sveltejs/adapter-cloudflare`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `sveltekit-superforms`, `@testing-library/svelte`, `tslib`, `@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `vite`, `vitest`, `zod`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `back-end/package.json`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `BookingModalState`, `BlogModalState`, `GeneralKeyString` to the rest of the system?**
  _207 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sanity.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05146242132543503 - nodes in this community are weakly interconnected._
- **Should `i18n-svelte.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06001984126984127 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
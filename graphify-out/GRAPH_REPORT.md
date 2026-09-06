# Graph Report - svelte-chd  (2026-09-06)

## Corpus Check
- 188 files · ~88,887 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 667 nodes · 989 edges · 92 communities (24 shown, 35 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6b38476d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sanity.ts
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- blog-page.svelte
- sanity-client.ts
- compilerOptions
- [lang]/+page.server.ts
- nav-store.ts
- dependencies
- en/index.ts
- fr/index.ts
- vn/index.ts
- seo-store.ts
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
- tour.type.ts
- @sveltejs/adapter-auto
- @sveltejs/adapter-cloudflare
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- format-data.ts
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
- i18n-svelte.ts
- base/index.ts
- details-navigation.svelte
- type-others.ts
- eslint
- @playwright/test
- prettier
- typescript
- portable-text-components.ts
- +layout.svelte
- portable-text-block-render.tsx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 30 edges
2. `compilerOptions` - 15 edges
3. `scripts` - 14 edges
4. `Locales` - 11 edges
5. `sendMail()` - 10 edges
6. `scripts` - 9 edges
7. `compilerOptions` - 9 edges
8. `fetchToursByType()` - 8 edges
9. `Tour` - 8 edges
10. `loadLocaleAsync()` - 7 edges

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

## Communities (92 total, 35 thin omitted)

### Community 0 - "sanity.ts"
Cohesion: 0.27
Nodes (9): DEFAULT_EXCHANGE_RATES, defaultRates, exchange_rates_store, ExchangeRates, builder, config, get_length_and_index(), get_tour_slug() (+1 more)

### Community 1 - "i18n-types.ts"
Cohesion: 0.07
Nodes (38): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+30 more)

### Community 2 - "schemas/index.ts"
Cohesion: 0.07
Nodes (33): add_thousand_separator(), CNumberInput(), parseNumber(), COLOR_PALETTE, keywords, prepare(), prepare(), BASE_FIELDS (+25 more)

### Community 3 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (34): description, name, private, scripts, build, build:all, build:be, build:fe (+26 more)

### Community 5 - "back-end/package.json"
Cohesion: 0.05
Nodes (39): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+31 more)

### Community 6 - "blog-page.svelte"
Cohesion: 0.25
Nodes (3): if(), url_for(), ./$types

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
Cohesion: 0.20
Nodes (3): nav_animate_hidden, nav_deg, nav_mobile

### Community 11 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+13 more)

### Community 12 - "en/index.ts"
Cohesion: 0.19
Nodes (8): en, blog_page, contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 13 - "fr/index.ts"
Cohesion: 0.21
Nodes (7): fr, blog_page, contact_page, home_page, nav_bar, seo, tours

### Community 14 - "vn/index.ts"
Cohesion: 0.21
Nodes (7): vn, blog_page, contact_page, home_page, nav_bar, seo, tours

### Community 15 - "seo-store.ts"
Cohesion: 0.11
Nodes (8): seo_description, seo_keywords, seo_og_image, seo_title, SeoState, ./$types, ./$types, ./$types

### Community 16 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, svelte-typewriter, sveltekit-superforms, tailwindcss, svelte-typewriter, tailwindcss (+1 more)

### Community 18 - "tours/+server.ts"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 19 - "icons.ts"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

### Community 32 - "tour.type.ts"
Cohesion: 0.15
Nodes (12): blog_modal, BlogModalState, tour_modal, TourModalState, GeneralKeyString, Highlights, Img_Cover, Locale_Array (+4 more)

### Community 37 - "format-data.ts"
Cohesion: 0.21
Nodes (8): Testimonial, EN_MONTHS, format_pax_no(), format_price(), format_price_object(), format_review_date(), FR_MONTHS, get_exchange_rate()

### Community 78 - "i18n-svelte.ts"
Cohesion: 0.15
Nodes (4): { locale, LL, setLocale }, booking_modal, BookingModalState, ./$types

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

## Knowledge Gaps
- **216 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `name`, `private`, `version` (+211 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 308 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `eslint-config-prettier`, `eslint-plugin-svelte`, `jsdom`, `knip`, `postcss`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte`, `svelte-check`, `svelte-eslint-parser`, `@sveltejs/adapter-auto`, `@sveltejs/adapter-cloudflare`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `@testing-library/svelte`, `tslib`, `@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `vite`, `vitest`, `zod`, `eslint`, `@playwright/test`, `prettier`, `typescript`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `name` to the rest of the system?**
  _216 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06715063520871144 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07337526205450734 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
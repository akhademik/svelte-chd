# Graph Report - svelte-chd  (2026-09-06)

## Corpus Check
- 171 files · ~84,105 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 630 nodes · 945 edges · 87 communities (23 shown, 32 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0c767b5b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- schemas/index.ts
- i18n-types.ts
- scripts
- back-end/package.json
- scripts
- sanity-client.ts
- compilerOptions
- [lang]/+page.server.ts
- devDependencies
- nav-store.ts
- fr/index.ts
- base/index.ts
- base-tour-detail-modal.svelte
- en/index.ts
- eslint
- vn/index.ts
- i18n-svelte.ts
- @playwright/test
- compilerOptions
- prettier
- typescript
- devDependencies
- tour.type.ts
- tours/+server.ts
- format-data.ts
- sanity.ts
- blog/+server.ts
- seo-store.ts
- svelte.config.js
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
- icons.ts
- @sveltejs/adapter-auto
- @sveltejs/adapter-cloudflare
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- home-page/index.ts
- @testing-library/svelte
- tslib
- @types/node
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- vite
- vitest
- zod
- [lang]/+layout.ts

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

## Communities (87 total, 32 thin omitted)

### Community 0 - "schemas/index.ts"
Cohesion: 0.08
Nodes (33): add_thousand_separator(), CNumberInput(), parseNumber(), keywords, prepare(), prepare(), BASE_FIELDS, Field (+25 more)

### Community 1 - "i18n-types.ts"
Cohesion: 0.08
Nodes (34): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+26 more)

### Community 2 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 3 - "back-end/package.json"
Cohesion: 0.06
Nodes (35): dependencies, react, react-dom, react-is, sanity, sanity-plugin-media, @sanity/vision, styled-components (+27 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (34): description, name, private, scripts, build, build:all, build:be, build:fe (+26 more)

### Community 5 - "sanity-client.ts"
Cohesion: 0.11
Nodes (22): DEFAULT_EXCHANGE_RATES, cachedFetch(), ExchangeRatesData, EXTRACT_BLOG_FIELDS, EXTRACT_TOUR_FIELDS, fetchAllBlogs(), fetchFeaturedBlogs(), fetchLatestExchangeRates() (+14 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 7 - "[lang]/+page.server.ts"
Cohesion: 0.16
Nodes (15): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, form_schema, FormSchema (+7 more)

### Community 8 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+11 more)

### Community 9 - "nav-store.ts"
Cohesion: 0.12
Nodes (5): nav_animate_hidden, nav_deg, nav_mobile, tour_index_store, logger

### Community 10 - "fr/index.ts"
Cohesion: 0.14
Nodes (11): fr, blog_page, contact_page, home_page, nav_bar, seo, tours, Translation (+3 more)

### Community 12 - "base-tour-detail-modal.svelte"
Cohesion: 0.15
Nodes (5): close(), booking_modal, BookingModalState, ./$types, ./$types

### Community 13 - "en/index.ts"
Cohesion: 0.19
Nodes (8): en, blog_page, contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 15 - "vn/index.ts"
Cohesion: 0.21
Nodes (7): vn, blog_page, contact_page, home_page, nav_bar, seo, tours

### Community 16 - "i18n-svelte.ts"
Cohesion: 0.13
Nodes (3): { locale, LL, setLocale }, ./$types, ./$types

### Community 18 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 21 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, svelte-typewriter, sveltekit-superforms, tailwindcss, svelte-typewriter, tailwindcss (+1 more)

### Community 22 - "tour.type.ts"
Cohesion: 0.15
Nodes (12): blog_modal, BlogModalState, tour_modal, TourModalState, GeneralKeyString, Highlights, Img_Cover, Locale_Array (+4 more)

### Community 23 - "tours/+server.ts"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 24 - "format-data.ts"
Cohesion: 0.23
Nodes (8): Testimonial, EN_MONTHS, format_pax_no(), format_price(), format_price_object(), format_review_date(), FR_MONTHS, get_exchange_rate()

### Community 25 - "sanity.ts"
Cohesion: 0.26
Nodes (7): if(), builder, config, get_length_and_index(), get_tour_slug(), tour_by_index(), url_for()

### Community 27 - "seo-store.ts"
Cohesion: 0.18
Nodes (6): seo_description, seo_keywords, seo_og_image, seo_title, SeoState, ./$types

### Community 41 - "icons.ts"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

## Knowledge Gaps
- **210 isolated node(s):** `name`, `private`, `version`, `main`, `type` (+205 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 289 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `eslint`, `@playwright/test`, `prettier`, `typescript`, `eslint-config-prettier`, `eslint-plugin-svelte`, `jsdom`, `knip`, `postcss`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte`, `svelte-check`, `svelte-eslint-parser`, `@sveltejs/adapter-auto`, `@sveltejs/adapter-cloudflare`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `@testing-library/svelte`, `tslib`, `@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `vite`, `vitest`, `zod`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _210 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `back-end/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
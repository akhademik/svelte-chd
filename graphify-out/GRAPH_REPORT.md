# Graph Report - .  (2026-09-05)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 522 nodes · 772 edges · 38 communities (33 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `69045b1d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- schemas/index.ts
- devDependencies
- i18n-util.ts
- back-end/package.json
- scripts
- scripts
- compilerOptions
- seo-store.ts
- i18n-svelte.ts
- devDependencies
- base/index.ts
- tour.type.ts
- fr/index.ts
- contact/+page.server.ts
- Tour Data Formatting & Display
- sanity.ts
- compilerOptions
- vn/index.ts
- modal-store.ts
- tours/+server.ts
- icons.ts
- [slug]/+page.svelte
- exchange-rates-store.ts
- blog/+server.ts
- .typesafe-i18n.json
- [lang]/+layout.ts
- svelte.config.js

## God Nodes (most connected - your core abstractions)
1. `scripts` - 26 edges
2. `compilerOptions` - 15 edges
3. `Locales` - 12 edges
4. `scripts` - 11 edges
5. `compilerOptions` - 9 edges
6. `scripts` - 9 edges
7. `loadLocaleAsync()` - 7 edges
8. `add_thousand_separator()` - 6 edges
9. `generate_field()` - 6 edges
10. `CNumberInput()` - 5 edges

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

## Communities (38 total, 5 thin omitted)

### Community 0 - "schemas/index.ts"
Cohesion: 0.08
Nodes (33): add_thousand_separator(), CNumberInput(), parseNumber(), sanity, keywords, prepare(), prepare(), BASE_FIELDS (+25 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (49): autoprefixer, eslint-config-prettier, eslint-plugin-svelte, devDependencies, autoprefixer, eslint-config-prettier, eslint-plugin-svelte, knip (+41 more)

### Community 2 - "i18n-util.ts"
Cohesion: 0.09
Nodes (30): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+22 more)

### Community 3 - "back-end/package.json"
Cohesion: 0.06
Nodes (33): dependencies, react, react-dom, react-is, sanity-plugin-media, @sanity/vision, styled-components, license (+25 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (32): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+24 more)

### Community 5 - "scripts"
Cohesion: 0.06
Nodes (30): description, name, private, scripts, build, build:all, build:be, build:fe (+22 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 7 - "seo-store.ts"
Cohesion: 0.10
Nodes (7): seo_description, seo_keywords, seo_title, BlogPost, client, config, ./$types

### Community 8 - "i18n-svelte.ts"
Cohesion: 0.14
Nodes (6): { locale, LL, setLocale }, BaseLocale, Formatters, RootTranslation, TranslationFunctions, Translations

### Community 9 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+13 more)

### Community 10 - "base/index.ts"
Cohesion: 0.12
Nodes (3): nav_animate_hidden, nav_deg, nav_mobile

### Community 11 - "tour.type.ts"
Cohesion: 0.15
Nodes (10): GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price, Tag, Tour (+2 more)

### Community 12 - "fr/index.ts"
Cohesion: 0.17
Nodes (9): contact_page, home_page, nav_bar, seo, tours, Translation, menu_items, MenuItem (+1 more)

### Community 14 - "contact/+page.server.ts"
Cohesion: 0.17
Nodes (6): form_schema, FormSchema, actions, SubmissionData, actions, SubmissionData

### Community 15 - "Tour Data Formatting & Display"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 16 - "sanity.ts"
Cohesion: 0.23
Nodes (7): logger, builder, config, get_length_and_index(), get_tour_slug(), persist_data, tour_by_index()

### Community 17 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 18 - "vn/index.ts"
Cohesion: 0.27
Nodes (5): contact_page, home_page, nav_bar, seo, tours

### Community 19 - "modal-store.ts"
Cohesion: 0.16
Nodes (6): booking_modal, BookingModalState, blog_modal, BlogModalState, tour_modal, TourModalState

### Community 20 - "tours/+server.ts"
Cohesion: 0.39
Nodes (7): client, config, fallback_exchange_rate_from_sanity(), fetch_data(), fetch_exchange_rate(), GET(), sync_rate_to_sanity()

### Community 21 - "icons.ts"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

### Community 23 - "exchange-rates-store.ts"
Cohesion: 0.50
Nodes (3): defaultRates, exchange_rates_store, ExchangeRates

## Knowledge Gaps
- **189 isolated node(s):** `target`, `dom`, `dom.iterable`, `esnext`, `allowJs` (+184 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `devDependencies`, `scripts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `back-end/package.json`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `target`, `dom`, `dom.iterable` to the rest of the system?**
  _189 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `i18n-util.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08562367864693446 - nodes in this community are weakly interconnected._
- **Should `back-end/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
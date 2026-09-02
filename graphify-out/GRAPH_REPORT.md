# Graph Report - .  (2026-09-02)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 431 nodes · 628 edges · 34 communities (29 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e89f855`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n-types.ts
- helper-functions.ts
- devDependencies
- compilerOptions
- scripts
- back-end/package.json
- compilerOptions
- devDependencies
- tour.type.ts
- fr/index.ts
- nav-store.ts
- sanity.ts
- en/index.ts
- i18n-svelte.ts
- vn/index.ts
- seo-store.ts
- $app/stores
- +page.server.ts
- +server.ts
- icons.ts
- .typesafe-i18n.json
- [lang]/+layout.ts
- svelte.config.js

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `Locales` - 12 edges
3. `scripts` - 11 edges
4. `compilerOptions` - 11 edges
5. `paths` - 9 edges
6. `loadLocaleAsync()` - 7 edges
7. `add_thousand_separator()` - 6 edges
8. `scripts` - 6 edges
9. `CNumberInput()` - 5 edges
10. `prettier` - 5 edges

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

## Communities (34 total, 5 thin omitted)

### Community 0 - "i18n-types.ts"
Cohesion: 0.08
Nodes (34): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+26 more)

### Community 1 - "helper-functions.ts"
Cohesion: 0.09
Nodes (31): add_thousand_separator(), CNumberInput(), parseNumber(), sanity, keywords, prepare(), prepare(), BASE_FIELDS (+23 more)

### Community 2 - "devDependencies"
Cohesion: 0.05
Nodes (43): autoprefixer, eslint-config-prettier, eslint-plugin-svelte, devDependencies, autoprefixer, eslint-config-prettier, eslint-plugin-svelte, @ianvs/prettier-plugin-sort-imports (+35 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (29): compilerOptions, allowJs, baseUrl, checkJs, esModuleInterop, forceConsistentCasingInFileNames, paths, resolveJsonModule (+21 more)

### Community 4 - "scripts"
Cohesion: 0.07
Nodes (28): concurrently, author, name, dependencies, concurrently, @sanity/client, @sanity/image-url, svelte-french-toast (+20 more)

### Community 5 - "back-end/package.json"
Cohesion: 0.07
Nodes (27): dependencies, react, react-dom, react-is, @sanity/vision, styled-components, license, main (+19 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 7 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+13 more)

### Community 8 - "tour.type.ts"
Cohesion: 0.16
Nodes (8): index(), tour_index_store, GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price

### Community 9 - "fr/index.ts"
Cohesion: 0.17
Nodes (9): contact_page, home_page, nav_bar, seo, tours, Translation, menu_items, MenuItem (+1 more)

### Community 10 - "nav-store.ts"
Cohesion: 0.18
Nodes (3): nav_animate_hidden, nav_deg, nav_mobile

### Community 11 - "sanity.ts"
Cohesion: 0.18
Nodes (6): Tour, format_price(), builder, config, get_exchange_rate(), persist_data

### Community 13 - "en/index.ts"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 15 - "vn/index.ts"
Cohesion: 0.27
Nodes (5): contact_page, home_page, nav_bar, seo, tours

### Community 16 - "seo-store.ts"
Cohesion: 0.22
Nodes (4): seo_description, seo_keywords, seo_title, ./$types

### Community 18 - "+page.server.ts"
Cohesion: 0.40
Nodes (3): form_schema, actions, TODO: Do something with the validated form.data

### Community 19 - "+server.ts"
Cohesion: 0.47
Nodes (5): client, config, fetch_data(), fetch_exchange_rate(), GET()

### Community 20 - "icons.ts"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

## Knowledge Gaps
- **144 isolated node(s):** `name`, `private`, `version`, `main`, `license` (+139 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `devDependencies`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `back-end/package.json`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _144 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08244897959183674 - nodes in this community are weakly interconnected._
- **Should `helper-functions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0851063829787234 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
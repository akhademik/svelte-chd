# Graph Report - .  (2026-09-02)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 415 nodes · 613 edges · 27 communities (24 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2675afbc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- tour.type.ts
- helper-functions.ts
- i18n-svelte.ts
- base/index.ts
- back-end/package.json
- scripts
- compilerOptions
- devDependencies
- fr/index.ts
- i18n-helper.ts
- en/index.ts
- compilerOptions
- vn/index.ts
- +page.server.ts
- +server.ts
- .typesafe-i18n.json
- [lang]/+layout.ts
- svelte.config.js

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `Locales` - 12 edges
3. `scripts` - 11 edges
4. `compilerOptions` - 9 edges
5. `loadLocaleAsync()` - 7 edges
6. `add_thousand_separator()` - 6 edges
7. `scripts` - 6 edges
8. `CNumberInput()` - 5 edges
9. `generate_field()` - 5 edges
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

## Communities (27 total, 3 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.04
Nodes (47): autoprefixer, eslint-config-prettier, eslint-plugin-svelte, devDependencies, autoprefixer, eslint-config-prettier, eslint-plugin-svelte, knip (+39 more)

### Community 1 - "tour.type.ts"
Cohesion: 0.07
Nodes (21): index(), index(), seo_description, seo_keywords, seo_title, tour_index_store, GeneralKeyString, Highlights (+13 more)

### Community 2 - "helper-functions.ts"
Cohesion: 0.09
Nodes (28): add_thousand_separator(), CNumberInput(), parseNumber(), prepare(), prepare(), BASE_FIELDS, Field, GenerateField (+20 more)

### Community 3 - "i18n-svelte.ts"
Cohesion: 0.10
Nodes (26): App, Locals, initFormatters(), { locale, LL, setLocale }, BaseLocale, Formatters, Locales, RootTranslation (+18 more)

### Community 4 - "base/index.ts"
Cohesion: 0.08
Nodes (6): nav_animate_hidden, nav_deg, nav_mobile, Icon, Icons, NOTE:

### Community 5 - "back-end/package.json"
Cohesion: 0.07
Nodes (30): dependencies, react, react-dom, react-is, sanity, @sanity/vision, styled-components, keywords (+22 more)

### Community 6 - "scripts"
Cohesion: 0.06
Nodes (30): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, @sanity/client, @sanity/image-url (+22 more)

### Community 7 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 8 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+13 more)

### Community 9 - "fr/index.ts"
Cohesion: 0.14
Nodes (10): contact_page, home_page, nav_bar, seo, tours, Translation, active, menu_items (+2 more)

### Community 10 - "i18n-helper.ts"
Cohesion: 0.32
Nodes (9): handle(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale(), REGEX_START_WITH_BASE, replace_locale_in_url(), detectLocale() (+1 more)

### Community 11 - "en/index.ts"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 12 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 13 - "vn/index.ts"
Cohesion: 0.27
Nodes (5): contact_page, home_page, nav_bar, seo, tours

### Community 14 - "+page.server.ts"
Cohesion: 0.40
Nodes (3): form_schema, actions, TODO: Do something with the validated form.data

### Community 15 - "+server.ts"
Cohesion: 0.47
Nodes (5): client, config, fetch_data(), fetch_exchange_rate(), GET()

## Knowledge Gaps
- **138 isolated node(s):** `locale_translations`, `target`, `dom`, `dom.iterable`, `esnext` (+133 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `devDependencies`, `scripts`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `back-end/package.json`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `sanity` connect `back-end/package.json` to `helper-functions.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `locale_translations`, `target`, `dom` to the rest of the system?**
  _138 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `tour.type.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06845513413506013 - nodes in this community are weakly interconnected._
- **Should `helper-functions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09302325581395349 - nodes in this community are weakly interconnected._
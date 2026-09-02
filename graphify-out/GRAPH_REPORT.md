# Graph Report - .  (2026-09-02)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 414 nodes · 610 edges · 26 communities (23 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `24007c5b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- i18n-svelte.ts
- devDependencies
- helper-functions.ts
- i18n-types.ts
- back-end/package.json
- scripts
- compilerOptions
- devDependencies
- sanity.ts
- fr/index.ts
- i18n-helper.ts
- en/index.ts
- compilerOptions
- vn/index.ts
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

## Communities (26 total, 3 thin omitted)

### Community 0 - "i18n-svelte.ts"
Cohesion: 0.05
Nodes (16): { locale, LL, setLocale }, active, index(), nav_animate_hidden, nav_deg, nav_mobile, seo_description, seo_keywords (+8 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (47): autoprefixer, eslint-config-prettier, eslint-plugin-svelte, devDependencies, autoprefixer, eslint-config-prettier, eslint-plugin-svelte, knip (+39 more)

### Community 2 - "helper-functions.ts"
Cohesion: 0.09
Nodes (28): add_thousand_separator(), CNumberInput(), parseNumber(), prepare(), prepare(), BASE_FIELDS, Field, GenerateField (+20 more)

### Community 3 - "i18n-types.ts"
Cohesion: 0.11
Nodes (25): App, Locals, initFormatters(), BaseLocale, Formatters, Locales, RootTranslation, TranslationFunctions (+17 more)

### Community 4 - "back-end/package.json"
Cohesion: 0.07
Nodes (30): dependencies, react, react-dom, react-is, sanity, @sanity/vision, styled-components, keywords (+22 more)

### Community 5 - "scripts"
Cohesion: 0.06
Nodes (30): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, @sanity/client, @sanity/image-url (+22 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 7 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+13 more)

### Community 8 - "sanity.ts"
Cohesion: 0.16
Nodes (10): Tour, format_price(), logger, builder, config, get_exchange_rate(), get_length_and_index(), get_tour_slug() (+2 more)

### Community 9 - "fr/index.ts"
Cohesion: 0.17
Nodes (9): contact_page, home_page, nav_bar, seo, tours, Translation, menu_items, MenuItem (+1 more)

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

### Community 16 - "icons.ts"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

## Knowledge Gaps
- **138 isolated node(s):** `locale_translations`, `target`, `dom`, `dom.iterable`, `esnext` (+133 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `devDependencies`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `back-end/package.json`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `sanity` connect `back-end/package.json` to `helper-functions.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `locale_translations`, `target`, `dom` to the rest of the system?**
  _138 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n-svelte.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05336951605608322 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `helper-functions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09302325581395349 - nodes in this community are weakly interconnected._
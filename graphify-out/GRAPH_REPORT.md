# Graph Report - .  (2026-09-05)

## Corpus Check
- 150 files · ~65,493 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 541 nodes · 806 edges · 54 communities (27 shown, 27 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 42
- Community 43

## God Nodes (most connected - your core abstractions)
1. `scripts` - 26 edges
2. `compilerOptions` - 15 edges
3. `Locales` - 12 edges
4. `scripts` - 11 edges
5. `scripts` - 9 edges
6. `compilerOptions` - 9 edges
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

## Communities (54 total, 27 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (29): close(), booking_modal, BookingModalState, defaultRates, exchange_rates_store, ExchangeRates, blog_modal, BlogModalState (+21 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (33): add_thousand_separator(), CNumberInput(), parseNumber(), keywords, prepare(), prepare(), BASE_FIELDS, Field (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (34): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (9): { locale, LL, setLocale }, seo_description, seo_keywords, seo_title, BlogPost, client, config, ./$types (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (35): dependencies, react, react-dom, react-is, sanity, sanity-plugin-media, @sanity/vision, styled-components (+27 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (32): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+24 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (30): description, name, private, scripts, build, build:all, build:be, build:fe (+22 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (7): nav_animate_hidden, nav_deg, nav_mobile, Icon, Icons, NOTE:, ./$types

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (14): contact_page, home_page, nav_bar, seo, tours, Translation, contact_page, home_page (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (19): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.16
Nodes (8): form_schema, FormSchema, actions, SubmissionData, actions, sanityClient, sanityConfig, SubmissionData

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 13 - "Community 13"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (7): autoprefixer, devDependencies, autoprefixer, eslint, tailwindcss, eslint, tailwindcss

## Knowledge Gaps
- **193 isolated node(s):** `name`, `private`, `version`, `main`, `type` (+188 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 15` to `Community 5`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 40`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `keywords` connect `Community 1` to `Community 4`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _193 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05146242132543503 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07764876632801161 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07507507507507508 - nodes in this community are weakly interconnected._
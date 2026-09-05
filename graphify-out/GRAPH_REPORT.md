# Graph Report - .  (2026-09-05)

## Corpus Check
- 149 files · ~65,464 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 540 nodes · 804 edges · 55 communities (28 shown, 27 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Modals & Dialogs
- French Localization (i18n)
- Sanity Studio Schema
- Sanity Studio Studio/Components
- French Localization (i18n)
- Contact Form & Actions
- Contact Form & Actions
- French Localization (i18n)
- Sanity Studio Studio/Components
- Editorial & Content Pages
- Sanity Studio Studio/Components
- Contact Form & Actions
- French Localization (i18n)
- French Localization (i18n)
- TypeScript Configuration
- Tour Modules & Routing
- Dependencies & Config
- Editorial & Content Pages
- French Localization (i18n)
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Contact Form & Actions
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Dependencies & Config
- Core Module 43
- Core Module 44

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

## Communities (55 total, 27 thin omitted)

### Community 0 - "UI Modals & Dialogs"
Cohesion: 0.05
Nodes (29): close(), booking_modal, BookingModalState, defaultRates, exchange_rates_store, ExchangeRates, blog_modal, BlogModalState (+21 more)

### Community 1 - "French Localization (i18n)"
Cohesion: 0.08
Nodes (26): App, Locals, initFormatters(), { locale, LL, setLocale }, BaseLocale, Formatters, Locales, RootTranslation (+18 more)

### Community 2 - "Sanity Studio Schema"
Cohesion: 0.08
Nodes (33): add_thousand_separator(), CNumberInput(), parseNumber(), keywords, prepare(), prepare(), BASE_FIELDS, Field (+25 more)

### Community 3 - "Sanity Studio Studio/Components"
Cohesion: 0.06
Nodes (35): dependencies, react, react-dom, react-is, sanity, sanity-plugin-media, @sanity/vision, styled-components (+27 more)

### Community 4 - "French Localization (i18n)"
Cohesion: 0.06
Nodes (32): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+24 more)

### Community 5 - "Contact Form & Actions"
Cohesion: 0.06
Nodes (30): description, name, private, scripts, build, build:all, build:be, build:fe (+22 more)

### Community 6 - "Contact Form & Actions"
Cohesion: 0.08
Nodes (7): nav_animate_hidden, nav_deg, nav_mobile, Icon, Icons, NOTE:, ./$types

### Community 7 - "French Localization (i18n)"
Cohesion: 0.10
Nodes (14): contact_page, home_page, nav_bar, seo, tours, Translation, contact_page, home_page (+6 more)

### Community 8 - "Sanity Studio Studio/Components"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "Editorial & Content Pages"
Cohesion: 0.10
Nodes (8): seo_description, seo_keywords, seo_title, BlogPost, client, config, ./$types, ./$types

### Community 10 - "Sanity Studio Studio/Components"
Cohesion: 0.11
Nodes (19): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+11 more)

### Community 11 - "Contact Form & Actions"
Cohesion: 0.16
Nodes (8): form_schema, FormSchema, actions, SubmissionData, actions, sanityClient, sanityConfig, SubmissionData

### Community 12 - "French Localization (i18n)"
Cohesion: 0.32
Nodes (9): handle(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale(), REGEX_START_WITH_BASE, replace_locale_in_url(), detectLocale() (+1 more)

### Community 13 - "French Localization (i18n)"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 14 - "TypeScript Configuration"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 15 - "Tour Modules & Routing"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 16 - "Dependencies & Config"
Cohesion: 0.29
Nodes (7): autoprefixer, eslint-plugin-svelte, devDependencies, autoprefixer, eslint-plugin-svelte, tailwindcss, tailwindcss

## Knowledge Gaps
- **193 isolated node(s):** `name`, `private`, `version`, `main`, `type` (+188 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dependencies & Config` to `French Localization (i18n)`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Contact Form & Actions`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`, `Dependencies & Config`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `keywords` connect `Sanity Studio Schema` to `Sanity Studio Studio/Components`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _193 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Modals & Dialogs` be split into smaller, more focused modules?**
  _Cohesion score 0.05060882800608828 - nodes in this community are weakly interconnected._
- **Should `French Localization (i18n)` be split into smaller, more focused modules?**
  _Cohesion score 0.07547169811320754 - nodes in this community are weakly interconnected._
- **Should `Sanity Studio Schema` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `Sanity Studio Studio/Components` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
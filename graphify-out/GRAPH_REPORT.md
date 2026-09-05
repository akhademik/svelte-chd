# Graph Report - svelte-chd  (2026-09-05)

## Corpus Check
- 159 files · ~69,313 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 571 nodes · 867 edges · 58 communities (18 shown, 27 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
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
- Community 41
- Community 42
- Community 43
- Community 44

## God Nodes (most connected - your core abstractions)
1. `scripts` - 26 edges
2. `compilerOptions` - 15 edges
3. `Locales` - 12 edges
4. `scripts` - 11 edges
5. `scripts` - 9 edges
6. `sendMail()` - 9 edges
7. `compilerOptions` - 9 edges
8. `fetchToursByType()` - 8 edges
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

## Communities (58 total, 27 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (30): close(), booking_modal, BookingModalState, defaultRates, exchange_rates_store, ExchangeRates, blog_modal, BlogModalState (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (31): add_thousand_separator(), CNumberInput(), parseNumber(), prepare(), prepare(), BASE_FIELDS, Field, GenerateField (+23 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (26): App, Locals, initFormatters(), { locale, LL, setLocale }, BaseLocale, Formatters, Locales, RootTranslation (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (28): getAdminNotifyEmail(), getFromEmail(), sendMail(), SendMailOptions, cachedFetch(), EXTRACT_BLOG_FIELDS, EXTRACT_TOUR_FIELDS, fetchAllBlogs() (+20 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (37): dependencies, react, react-dom, react-is, sanity, sanity-plugin-media, @sanity/vision, styled-components (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (11): Translation, menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg, nav_mobile, Icon (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (32): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+24 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (30): description, name, private, scripts, build, build:all, build:be, build:fe (+22 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (10): if(), seo_description, seo_keywords, seo_og_image, seo_title, SeoState, url_for(), ./$types (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (19): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (7): en, contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 12 - "Community 12"
Cohesion: 0.32
Nodes (9): handle(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale(), REGEX_START_WITH_BASE, replace_locale_in_url(), detectLocale() (+1 more)

### Community 13 - "Community 13"
Cohesion: 0.24
Nodes (6): fr, contact_page, home_page, nav_bar, seo, tours

### Community 14 - "Community 14"
Cohesion: 0.24
Nodes (6): vn, contact_page, home_page, nav_bar, seo, tours

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 17 - "Community 17"
Cohesion: 0.29
Nodes (7): autoprefixer, devDependencies, autoprefixer, eslint, sveltekit-superforms, eslint, sveltekit-superforms

## Knowledge Gaps
- **194 isolated node(s):** `name`, `private`, `version`, `main`, `type` (+189 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 256 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 17` to `Community 6`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `sanity` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _194 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.051577152600170505 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08244897959183674 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08383838383838384 - nodes in this community are weakly interconnected._
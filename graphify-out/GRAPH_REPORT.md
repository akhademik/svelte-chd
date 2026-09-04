# Graph Report - .  (2026-09-04)

## Corpus Check
- 227 files · ~104,543 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 792 nodes · 1181 edges · 103 communities (50 shown, 53 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.55)
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
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 89

## God Nodes (most connected - your core abstractions)
1. `scripts` - 33 edges
2. `compilerOptions` - 15 edges
3. `Locales` - 12 edges
4. `Locales` - 12 edges
5. `scripts` - 11 edges
6. `scripts` - 11 edges
7. `scripts` - 9 edges
8. `compilerOptions` - 9 edges
9. `compilerOptions` - 9 edges
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

## Communities (103 total, 53 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (35): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+27 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (31): add_thousand_separator(), CNumberInput(), parseNumber(), keywords, prepare(), prepare(), BASE_FIELDS, Field (+23 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (29): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+21 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (37): description, name, private, scripts, build, build:all, build:be, build:fe (+29 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (32): dependencies, react, react-dom, react-is, sanity, @sanity/vision, styled-components, license (+24 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (7): Translation, menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg, nav_mobile

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (30): author, name, dependencies, concurrently, @portabletext/svelte, @sanity/client, @sanity/image-url, svelte-french-toast (+22 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (30): author, name, dependencies, concurrently, @portabletext/svelte, @sanity/client, @sanity/image-url, svelte-french-toast (+22 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (15): contact_page, home_page, nav_bar, seo, tours, Translation, contact_page, home_page (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 10 - "Community 10"
Cohesion: 0.16
Nodes (7): booking_modal, BookingModalState, tour_modal, TourModalState, Tour, format_price(), get_exchange_rate()

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (19): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.19
Nodes (6): { locale, LL, setLocale }, BaseLocale, Formatters, RootTranslation, TranslationFunctions, Translations

### Community 13 - "Community 13"
Cohesion: 0.17
Nodes (10): defaultRates, exchange_rates_store, ExchangeRates, logger, builder, config, get_length_and_index(), get_tour_slug() (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.16
Nodes (6): GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (7): GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price, Tag

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (3): Icon, Icons, NOTE:

### Community 17 - "Community 17"
Cohesion: 0.19
Nodes (3): nav_animate_hidden, nav_deg, nav_mobile

### Community 18 - "Community 18"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.24
Nodes (6): contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 21 - "Community 21"
Cohesion: 0.23
Nodes (7): logger, builder, config, get_length_and_index(), get_tour_slug(), persist_data, tour_by_index()

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.27
Nodes (5): contact_page, home_page, nav_bar, seo, tours

### Community 24 - "Community 24"
Cohesion: 0.27
Nodes (5): contact_page, home_page, nav_bar, seo, tours

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (4): seo_description, seo_keywords, seo_title, tour_index_store

### Community 26 - "Community 26"
Cohesion: 0.28
Nodes (4): form_schema, actions, TODO: Do something with the validated form.data, actions

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (4): seo_description, seo_keywords, seo_title, ./$types

### Community 28 - "Community 28"
Cohesion: 0.39
Nodes (7): client, config, fallback_exchange_rate_from_sanity(), fetch_data(), fetch_exchange_rate(), GET(), sync_rate_to_sanity()

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (7): devDependencies, autoprefixer, svelte, @sveltejs/vite-plugin-svelte, autoprefixer, svelte, @sveltejs/vite-plugin-svelte

### Community 31 - "Community 31"
Cohesion: 0.29
Nodes (7): devDependencies, autoprefixer, eslint, @sveltejs/vite-plugin-svelte, autoprefixer, eslint, @sveltejs/vite-plugin-svelte

### Community 32 - "Community 32"
Cohesion: 0.40
Nodes (3): Tour, format_price(), get_exchange_rate()

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (3): form_schema, actions, TODO: Do something with the validated form.data

### Community 34 - "Community 34"
Cohesion: 0.47
Nodes (5): client, config, fetch_data(), fetch_exchange_rate(), GET()

### Community 35 - "Community 35"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

## Knowledge Gaps
- **282 isolated node(s):** `name`, `private`, `version`, `main`, `license` (+277 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 31` to `Community 7`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 70`, `Community 71`, `Community 72`, `Community 73`, `Community 74`, `Community 75`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 80`, `Community 81`, `Community 82`, `Community 83`, `Community 84`, `Community 85`, `Community 86`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 29` to `Community 6`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `keywords` connect `Community 1` to `Community 4`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _282 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07049180327868852 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08078231292517007 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0951219512195122 - nodes in this community are weakly interconnected._
# Graph Report - svelte-chd  (2026-09-06)

## Corpus Check
- 167 files · ~77,359 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 656 nodes · 971 edges · 75 communities (23 shown, 34 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3058a33a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tour.type.ts
- schemas/index.ts
- i18n-types.ts
- sanity-client.ts
- back-end/package.json
- nav-store.ts
- scripts
- scripts
- compilerOptions
- seo-store.ts
- devDependencies
- en/index.ts
- eslint
- [lang]/+page.server.ts
- compilerOptions
- tours/+server.ts
- devDependencies
- blog/+server.ts
- svelte.config.js
- .typesafe-i18n.json
- eslint-config-prettier
- eslint-plugin-svelte
- knip
- postcss
- prettier
- prettier-plugin-svelte
- prettier-plugin-tailwindcss
- svelte
- svelte-check
- svelte-eslint-parser
- jsdom
- @sveltejs/adapter-auto
- @sveltejs/adapter-cloudflare
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- @playwright/test
- tslib
- @types/node
- typescript
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- vite
- zod
- [lang]/+layout.ts
- CHD Travel — Design System & Layout Architecture Concept
- 🛠️ Development
- 🧪 HỆ THỐNG KIỂM THỬ VÀ KIỂM TRA CHẤT LƯỢNG (TESTING & QUALITY WORKFLOW)
- back-end/README.md
- base/index.ts
- i18n-svelte.ts
- sanity.ts
- @testing-library/svelte
- base-tour-detail-modal.svelte
- vitest
- icons.ts
- home-page/index.ts
- fr/index.ts

## God Nodes (most connected - your core abstractions)
1. `scripts` - 29 edges
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

## Communities (75 total, 34 thin omitted)

### Community 0 - "tour.type.ts"
Cohesion: 0.14
Nodes (16): blog_modal, BlogModalState, tour_modal, TourModalState, GeneralKeyString, Highlights, Img_Cover, Locale_Array (+8 more)

### Community 1 - "schemas/index.ts"
Cohesion: 0.08
Nodes (33): add_thousand_separator(), CNumberInput(), parseNumber(), keywords, prepare(), prepare(), BASE_FIELDS, Field (+25 more)

### Community 2 - "i18n-types.ts"
Cohesion: 0.08
Nodes (34): App, Locals, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base(), get_preferred_locale() (+26 more)

### Community 3 - "sanity-client.ts"
Cohesion: 0.15
Nodes (16): cachedFetch(), ExchangeRatesData, EXTRACT_BLOG_FIELDS, EXTRACT_TOUR_FIELDS, fetchAllBlogs(), fetchLatestExchangeRates(), fetchSingleTourBySlug(), fetchToursByType() (+8 more)

### Community 4 - "back-end/package.json"
Cohesion: 0.06
Nodes (35): dependencies, react, react-dom, react-is, sanity, sanity-plugin-media, @sanity/vision, styled-components (+27 more)

### Community 5 - "nav-store.ts"
Cohesion: 0.12
Nodes (5): nav_animate_hidden, nav_deg, nav_mobile, tour_index_store, logger

### Community 6 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 7 - "scripts"
Cohesion: 0.06
Nodes (33): description, name, private, scripts, build, build:all, build:be, build:fe (+25 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "seo-store.ts"
Cohesion: 0.11
Nodes (8): seo_description, seo_keywords, seo_og_image, seo_title, SeoState, ./$types, ./$types, ./$types

### Community 10 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+11 more)

### Community 11 - "en/index.ts"
Cohesion: 0.19
Nodes (8): en, blog_page, contact_page, home_page, nav_bar, seo, tours, BaseTranslation

### Community 13 - "[lang]/+page.server.ts"
Cohesion: 0.15
Nodes (17): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, fetchFeaturedBlogs(), form_schema (+9 more)

### Community 15 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+3 more)

### Community 16 - "tours/+server.ts"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, svelte-typewriter, sveltekit-superforms, tailwindcss, svelte-typewriter, tailwindcss (+1 more)

### Community 58 - "CHD Travel — Design System & Layout Architecture Concept"
Cohesion: 0.06
Nodes (30): 🔒 1. Quy tắc Quản lý Gói (Package Manager Rule), 🧱 2. Chu trình Chỉnh Sửa Code Chuẩn (Quality Gate Loop), ⚡ 3. Bảng Lệnh Kiểm Tra Theo Module, 🗺️ 4. Quy định Sau Khi Edit Code, Backend (`back-end/`), Frontend (`front-end/`), 🚀 Lệnh Nhanh Tại Thư Mục Gốc (Root Scripts):, 📋 QUY TRÌNH PHÁT TRIỂN & CHẤT LƯỢNG MÃ NGUỒN (DEVELOPMENT WORKFLOW) (+22 more)

### Community 59 - "🛠️ Development"
Cohesion: 0.22
Nodes (8): CHD Travel - Frontend, Commands, 🛠️ Development, Environment Variables, Prerequisites, 📂 Project Structure, Setup, 🚀 Tech Stack

### Community 60 - "🧪 HỆ THỐNG KIỂM THỬ VÀ KIỂM TRA CHẤT LƯỢNG (TESTING & QUALITY WORKFLOW)"
Cohesion: 0.50
Nodes (3): 🎯 1. Danh Sách Kiểm Tra Bắt Buộc (Quality Checklist), 🔄 2. Quy Trình Phản Hồi & Commit, 🧪 HỆ THỐNG KIỂM THỬ VÀ KIỂM TRA CHẤT LƯỢNG (TESTING & QUALITY WORKFLOW)

### Community 65 - "sanity.ts"
Cohesion: 0.18
Nodes (10): if(), defaultRates, exchange_rates_store, ExchangeRates, builder, config, get_length_and_index(), get_tour_slug() (+2 more)

### Community 67 - "base-tour-detail-modal.svelte"
Cohesion: 0.15
Nodes (4): close(), booking_modal, BookingModalState, ./$types

### Community 69 - "icons.ts"
Cohesion: 0.40
Nodes (3): Icon, Icons, NOTE:

### Community 75 - "fr/index.ts"
Cohesion: 0.08
Nodes (18): fr, blog_page, contact_page, home_page, nav_bar, seo, tours, Translation (+10 more)

## Knowledge Gaps
- **235 isolated node(s):** `name`, `private`, `version`, `main`, `type` (+230 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 303 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `eslint`, `eslint-config-prettier`, `eslint-plugin-svelte`, `knip`, `postcss`, `prettier`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte`, `svelte-check`, `svelte-eslint-parser`, `jsdom`, `@sveltejs/adapter-auto`, `@sveltejs/adapter-cloudflare`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `@playwright/test`, `tslib`, `@types/node`, `typescript`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `vite`, `zod`, `@testing-library/svelte`, `vitest`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _235 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tour.type.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1380952380952381 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07619738751814223 - nodes in this community are weakly interconnected._
- **Should `sanity-client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14666666666666667 - nodes in this community are weakly interconnected._
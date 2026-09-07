# Graph Report - svelte-chd  (2026-09-07)

## Corpus Check
- 187 files · ~86,846 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 695 nodes · 1050 edges · 84 communities (19 shown, 36 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `23424d17`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- vi/index.ts
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- base-tour-detail-modal.svelte
- sanity-client.ts
- compilerOptions
- [lang]/+page.server.ts
- i18n-svelte.ts
- dependencies
- home-page.svelte
- fr/index.ts
- contact-form-inputs.svelte
- $app/state
- compilerOptions
- devDependencies
- home-testimonials.svelte
- blog/+server.ts
- .typesafe-i18n.json
- eslint-config-prettier
- eslint-plugin-svelte
- jsdom
- knip
- @cloudflare/workers-types
- prettier-plugin-svelte
- prettier-plugin-tailwindcss
- svelte
- svelte-check
- svelte-eslint-parser
- nav-store.ts
- @sveltejs/adapter-auto
- postcss
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- sanity.ts
- @testing-library/svelte
- tslib
- @types/node
- @typescript-eslint/parser
- vite
- vitest
- zod
- [lang]/+layout.ts
- svelte.config.js
- 🌲 CHD Travel Monorepo
- seo-store.ts
- sveltekit-superforms
- type-others.ts
- eslint
- @playwright/test
- prettier
- tailwindcss
- portable-text-block-render.tsx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 30 edges
2. `compilerOptions` - 15 edges
3. `scripts` - 14 edges
4. `Locales` - 11 edges
5. `sendMail()` - 10 edges
6. `fetchToursByType()` - 10 edges
7. `Tour` - 10 edges
8. `compilerOptions` - 10 edges
9. `scripts` - 9 edges
10. `sendClientConfirmation()` - 8 edges

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

## Communities (84 total, 36 thin omitted)

### Community 0 - "vi/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, vn, nav_bar, seo, tours

### Community 1 - "i18n-types.ts"
Cohesion: 0.05
Nodes (44): App, Locals, Platform, handle(), about_page, blog_page, contact_page, home_page (+36 more)

### Community 2 - "schemas/index.ts"
Cohesion: 0.07
Nodes (33): add_thousand_separator(), CNumberInput(), parseNumber(), COLOR_PALETTE, keywords, prepare(), prepare(), BASE_FIELDS (+25 more)

### Community 3 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (34): description, name, private, scripts, build, build:all, build:be, build:fe (+26 more)

### Community 5 - "back-end/package.json"
Cohesion: 0.05
Nodes (39): devDependencies, eslint, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui, @types/react (+31 more)

### Community 6 - "base-tour-detail-modal.svelte"
Cohesion: 0.11
Nodes (5): booking_modal, BookingModalState, ./$types, ./$types, ./$types

### Community 7 - "sanity-client.ts"
Cohesion: 0.10
Nodes (32): cachedFetch(), ExchangeRatesData, fetchAllBlogs(), fetchFeaturedBlogs(), fetchLatestExchangeRates(), fetchSingleTourBySlug(), fetchToursByType(), memoryCache (+24 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.09
Nodes (27): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, EmailTemplateProps, generateClientEmailHtml() (+19 more)

### Community 11 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+13 more)

### Community 13 - "fr/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, fr, nav_bar, seo, tours

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @sveltejs/adapter-cloudflare, typescript, @typescript-eslint/eslint-plugin, typescript, @sveltejs/adapter-cloudflare (+1 more)

### Community 32 - "nav-store.ts"
Cohesion: 0.13
Nodes (7): Translation, menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg, nav_mobile

### Community 37 - "sanity.ts"
Cohesion: 0.06
Nodes (29): DEFAULT_EXCHANGE_RATES, defaultRates, exchange_rates_store, ExchangeRates, blog_modal, BlogModalState, tour_modal, TourModalState (+21 more)

### Community 71 - "🌲 CHD Travel Monorepo"
Cohesion: 0.18
Nodes (10): 1. Cài đặt toàn bộ dependencies, 2. Cấu hình biến môi trường, **Backend (`back-end/`)**, 🌲 CHD Travel Monorepo, ⚙️ Cài Đặt & Khởi Chạy (Getting Started), 🚀 Công Nghệ & Stack (Tech Stack), 🏗️ Cấu Trúc Dự Án (Project Architecture), 💻 Danh Sách Lệnh Quản Trị (Root Scripts) (+2 more)

### Community 78 - "seo-store.ts"
Cohesion: 0.15
Nodes (6): seo_description, seo_keywords, seo_og_image, seo_title, SeoState, ./$types

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

## Knowledge Gaps
- **224 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `name`, `private`, `version` (+219 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 312 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Tour` connect `sanity.ts` to `sanity-client.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `name` to the rest of the system?**
  _224 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05472837022132797 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07337526205450734 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
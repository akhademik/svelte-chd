# Graph Report - svelte-chd  (2026-09-07)

## Corpus Check
- 194 files · ~88,421 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 712 nodes · 1081 edges · 85 communities (24 shown, 32 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `504e5235`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- vi/index.ts
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- base/index.ts
- sanity-client.ts
- compilerOptions
- [lang]/+page.server.ts
- en/index.ts
- dependencies
- tour.type.ts
- nav-store.ts
- portable-text-components.ts
- format-data.ts
- compilerOptions
- devDependencies
- fr/index.ts
- jobs.md
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
- base-tour-detail-modal.svelte
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
- i18n-svelte.ts
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
5. `Logger` - 11 edges
6. `sendMail()` - 10 edges
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

## Communities (85 total, 32 thin omitted)

### Community 0 - "vi/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, vn, nav_bar, seo, tours

### Community 1 - "i18n-types.ts"
Cohesion: 0.08
Nodes (35): App, Locals, Platform, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base() (+27 more)

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

### Community 6 - "base/index.ts"
Cohesion: 0.15
Nodes (4): booking_modal, BookingModalState, ./$types, ./$types

### Community 7 - "sanity-client.ts"
Cohesion: 0.06
Nodes (40): withKvSnapshot(), cachedFetch(), memoryCache, fetchAllBlogs, fetchFeaturedBlogs, fetchLatestExchangeRates, fetchSingleTourBySlug, fetchToursByType (+32 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.13
Nodes (17): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, EmailTemplateProps, generateClientEmailHtml() (+9 more)

### Community 10 - "en/index.ts"
Cohesion: 0.17
Nodes (9): about_page, blog_page, contact_page, home_page, en, nav_bar, seo, tours (+1 more)

### Community 11 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+13 more)

### Community 12 - "tour.type.ts"
Cohesion: 0.25
Nodes (7): GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price, Tag

### Community 13 - "nav-store.ts"
Cohesion: 0.12
Nodes (8): Translation, menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg, nav_mobile, ./$types

### Community 15 - "format-data.ts"
Cohesion: 0.36
Nodes (7): EN_MONTHS, format_pax_no(), format_price(), format_price_object(), format_review_date(), FR_MONTHS, get_exchange_rate()

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @sveltejs/adapter-cloudflare, typescript, @typescript-eslint/eslint-plugin, typescript, @sveltejs/adapter-cloudflare (+1 more)

### Community 18 - "fr/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, fr, nav_bar, seo, tours

### Community 19 - "jobs.md"
Cohesion: 0.29
Nodes (6): fetchToursByType('foo'), Frontend không cần biết Sanity tồn tại., -> hiện frontend đang làm việc này, vậy hãy chỉnh lại backend bỏ luôn field generate slug đi, ko cần thiết nữa, mọi capability đều có consumer thực sự., Đây là thay đổi tôi đánh giá P0/P1., Đây là thứ tôi sẽ ưu tiên trước khi public mạnh.

### Community 32 - "base-tour-detail-modal.svelte"
Cohesion: 0.20
Nodes (5): blog_modal, BlogModalState, tour_modal, TourModalState, Tour

### Community 37 - "sanity.ts"
Cohesion: 0.24
Nodes (9): DEFAULT_EXCHANGE_RATES, defaultRates, exchange_rates_store, ExchangeRates, builder, config, get_length_and_index(), get_tour_slug() (+1 more)

### Community 71 - "🌲 CHD Travel Monorepo"
Cohesion: 0.18
Nodes (10): 1. Cài đặt toàn bộ dependencies, 2. Cấu hình biến môi trường, **Backend (`back-end/`)**, 🌲 CHD Travel Monorepo, ⚙️ Cài Đặt & Khởi Chạy (Getting Started), 🚀 Công Nghệ & Stack (Tech Stack), 🏗️ Cấu Trúc Dự Án (Project Architecture), 💻 Danh Sách Lệnh Quản Trị (Root Scripts) (+2 more)

### Community 78 - "i18n-svelte.ts"
Cohesion: 0.06
Nodes (11): { locale, LL, setLocale }, seo_description, seo_keywords, seo_og_image, seo_title, SeoState, Testimonial, ./$types (+3 more)

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

## Knowledge Gaps
- **235 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `name`, `private`, `version` (+230 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 329 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Tour` connect `base-tour-detail-modal.svelte` to `sanity.ts`, `tour.type.ts`, `format-data.ts`, `sanity-client.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `name` to the rest of the system?**
  _235 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07547169811320754 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07337526205450734 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
# Graph Report - svelte-chd  (2026-09-07)

## Corpus Check
- 199 files · ~91,827 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 713 nodes · 1053 edges · 89 communities (24 shown, 35 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dead953d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sanity.ts
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- Layer 2: Snapshot Backup bằng Cloudflare Workers KV
- sanity-client.ts
- compilerOptions
- [lang]/+page.server.ts
- nav-store.ts
- dependencies
- en/index.ts
- fr/index.ts
- vn/index.ts
- seo-store.ts
- compilerOptions
- devDependencies
- tours/+server.ts
- base-tour-detail-modal.svelte
- blog/+server.ts
- .typesafe-i18n.json
- eslint-config-prettier
- eslint-plugin-svelte
- jsdom
- knip
- base/index.ts
- prettier-plugin-svelte
- prettier-plugin-tailwindcss
- svelte
- svelte-check
- svelte-eslint-parser
- tour.type.ts
- @sveltejs/adapter-auto
- @sveltejs/adapter-cloudflare
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- format-data.ts
- @testing-library/svelte
- tslib
- @types/node
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- vite
- vitest
- zod
- [lang]/+layout.ts
- svelte.config.js
- 🌲 CHD Travel Monorepo
- i18n-svelte.ts
- svelte-typewriter
- sveltekit-superforms
- type-others.ts
- eslint
- @playwright/test
- prettier
- tailwindcss
- portable-text-components.ts
- portable-text-block-render.tsx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 30 edges
2. `compilerOptions` - 15 edges
3. `scripts` - 14 edges
4. `Locales` - 11 edges
5. `sendMail()` - 10 edges
6. `compilerOptions` - 10 edges
7. `scripts` - 9 edges
8. `fetchToursByType()` - 9 edges
9. `Tour` - 9 edges
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

## Communities (89 total, 35 thin omitted)

### Community 0 - "sanity.ts"
Cohesion: 0.33
Nodes (6): builder, config, get_length_and_index(), get_tour_slug(), tour_by_index(), ./$types

### Community 1 - "i18n-types.ts"
Cohesion: 0.07
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

### Community 6 - "Layer 2: Snapshot Backup bằng Cloudflare Workers KV"
Cohesion: 0.13
Nodes (14): 1.1. Vấn đề cần biết trước khi code, 1.2. Việc cần code (phần a), 1.3. Việc cần làm tay trên dashboard Cloudflare (KHÔNG code được, chỉ ghi chú lại trong PR description hoặc README để người vận hành tự làm), 1.4. Lưu ý khi code AI cần biết, 2.1. Nguyên lý, 2.2. Cấu hình binding KV, 2.3. Sửa `front-end/src/lib/server/sanity-client.ts`, 2.4. Sửa phân loại lỗi 404 thật vs lỗi kết nối (bắt buộc, liên quan trực tiếp tới Layer 2) (+6 more)

### Community 7 - "sanity-client.ts"
Cohesion: 0.12
Nodes (22): DEFAULT_EXCHANGE_RATES, cachedFetch(), ExchangeRatesData, EXTRACT_BLOG_FIELDS, EXTRACT_TOUR_FIELDS, fetchAllBlogs(), fetchLatestExchangeRates(), fetchSingleTourBySlug() (+14 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.13
Nodes (19): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, EmailTemplateProps, generateClientEmailHtml() (+11 more)

### Community 10 - "nav-store.ts"
Cohesion: 0.06
Nodes (13): Translation, menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg, nav_mobile, tour_index_store (+5 more)

### Community 11 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+13 more)

### Community 12 - "en/index.ts"
Cohesion: 0.17
Nodes (9): about_page, blog_page, contact_page, home_page, en, nav_bar, seo, tours (+1 more)

### Community 13 - "fr/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, fr, nav_bar, seo, tours

### Community 14 - "vn/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, vn, nav_bar, seo, tours

### Community 15 - "seo-store.ts"
Cohesion: 0.08
Nodes (11): if(), seo_description, seo_keywords, seo_og_image, seo_title, SeoState, url_for(), ./$types (+3 more)

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, @cloudflare/workers-types, devDependencies, autoprefixer, @cloudflare/workers-types, postcss, typescript, typescript (+1 more)

### Community 18 - "tours/+server.ts"
Cohesion: 0.39
Nodes (7): client, config, fetch_data(), fetch_exchange_rate(), GET(), get_latest_exchange_rate_from_sanity(), sync_rate_to_sanity()

### Community 19 - "base-tour-detail-modal.svelte"
Cohesion: 0.20
Nodes (5): blog_modal, BlogModalState, tour_modal, TourModalState, Tour

### Community 32 - "tour.type.ts"
Cohesion: 0.12
Nodes (9): booking_modal, BookingModalState, GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price (+1 more)

### Community 37 - "format-data.ts"
Cohesion: 0.21
Nodes (8): Testimonial, EN_MONTHS, format_pax_no(), format_price(), format_price_object(), format_review_date(), FR_MONTHS, get_exchange_rate()

### Community 71 - "🌲 CHD Travel Monorepo"
Cohesion: 0.18
Nodes (10): 1. Cài đặt toàn bộ dependencies, 2. Cấu hình biến môi trường, **Backend (`back-end/`)**, 🌲 CHD Travel Monorepo, ⚙️ Cài Đặt & Khởi Chạy (Getting Started), 🚀 Công Nghệ & Stack (Tech Stack), 🏗️ Cấu Trúc Dự Án (Project Architecture), 💻 Danh Sách Lệnh Quản Trị (Root Scripts) (+2 more)

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

## Knowledge Gaps
- **238 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `name`, `private`, `version` (+233 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 330 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `eslint-config-prettier`, `eslint-plugin-svelte`, `jsdom`, `knip`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte`, `svelte-check`, `svelte-eslint-parser`, `@sveltejs/adapter-auto`, `@sveltejs/adapter-cloudflare`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `@testing-library/svelte`, `tslib`, `@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `vite`, `vitest`, `zod`, `svelte-typewriter`, `sveltekit-superforms`, `eslint`, `@playwright/test`, `prettier`, `tailwindcss`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `name` to the rest of the system?**
  _238 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07272727272727272 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07337526205450734 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
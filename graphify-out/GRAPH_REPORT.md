# Graph Report - svelte-chd  (2026-09-07)

## Corpus Check
- 198 files · ~88,829 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 738 nodes · 1135 edges · 91 communities (22 shown, 38 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb20ae96`
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
- blog.service.ts
- compilerOptions
- [lang]/+page.server.ts
- tour-details.svelte
- front-end/knip.json
- format-data.ts
- fr/index.ts
- portable-text-components.ts
- dependencies
- compilerOptions
- devDependencies
- i18n-svelte.ts
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
- nav-bar-logic.ts
- @sveltejs/adapter-auto
- postcss
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- en/index.ts
- @testing-library/svelte
- tslib
- entry
- home-page.svelte
- @typescript-eslint/parser
- vite
- vitest
- zod
- [lang]/+layout.ts
- svelte.config.js
- 🌲 CHD Travel Monorepo
- contact-form-inputs.svelte
- typescript
- sveltekit-superforms
- type-others.ts
- eslint
- @playwright/test
- prettier
- tailwindcss
- seo-store.ts
- blog-page.svelte
- home-testimonials.svelte
- portable-text-block-render.tsx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 31 edges
2. `compilerOptions` - 15 edges
3. `scripts` - 14 edges
4. `Locales` - 12 edges
5. `Logger` - 12 edges
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

## Communities (91 total, 38 thin omitted)

### Community 0 - "vi/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, vn, nav_bar, seo, tours

### Community 1 - "i18n-types.ts"
Cohesion: 0.08
Nodes (35): App, Locals, Platform, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base() (+27 more)

### Community 2 - "schemas/index.ts"
Cohesion: 0.07
Nodes (32): add_thousand_separator(), CNumberInput(), parseNumber(), COLOR_PALETTE, keywords, prepare(), prepare(), BASE_FIELDS (+24 more)

### Community 3 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (35): description, name, private, scripts, build, build:all, build:be, build:fe (+27 more)

### Community 5 - "back-end/package.json"
Cohesion: 0.05
Nodes (41): devDependencies, eslint, knip, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui (+33 more)

### Community 7 - "blog.service.ts"
Cohesion: 0.12
Nodes (16): withKvSnapshot(), cachedFetch(), memoryCache, sanityClient, sanityConfig, mapSanityToBlogPost(), mapSanityToBlogPosts(), ALL_BLOGS_QUERY (+8 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.09
Nodes (29): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, EmailTemplateProps, generateClientEmailHtml() (+21 more)

### Community 10 - "tour-details.svelte"
Cohesion: 0.29
Nodes (3): booking_modal, BookingModalState, ./$types

### Community 11 - "front-end/knip.json"
Cohesion: 0.12
Nodes (17): entry, ignore, ignoreDependencies, ignoreExportsUsedInFile, project, $schema, svelte, entry (+9 more)

### Community 12 - "format-data.ts"
Cohesion: 0.07
Nodes (44): DEFAULT_EXCHANGE_RATES, mapSanityToTour(), mapSanityToTours(), EXTRACT_TOUR_FIELDS, getSingleTourQuery(), TOURS_BY_DAY_QUERY, TOURS_BY_HIGHLAND_QUERY, TourService (+36 more)

### Community 13 - "fr/index.ts"
Cohesion: 0.18
Nodes (8): about_page, blog_page, contact_page, home_page, fr, nav_bar, seo, tours

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+13 more)

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @sveltejs/adapter-cloudflare, @types/node, @typescript-eslint/eslint-plugin, @sveltejs/adapter-cloudflare, @types/node (+1 more)

### Community 32 - "nav-bar-logic.ts"
Cohesion: 0.12
Nodes (9): Translation, #each(), get_menu_url(), menu_items, MenuItem, MenuLink, nav_animate_hidden, nav_deg (+1 more)

### Community 37 - "en/index.ts"
Cohesion: 0.17
Nodes (9): about_page, blog_page, contact_page, home_page, en, nav_bar, seo, tours (+1 more)

### Community 40 - "entry"
Cohesion: 0.25
Nodes (10): entry, ignoreDependencies, project, $schema, components/**/*.{ts,tsx}, react-is, sanity.cli.ts, sanity.config.ts (+2 more)

### Community 71 - "🌲 CHD Travel Monorepo"
Cohesion: 0.20
Nodes (9): 1. **Clean Layered Architecture (Backend & Frontend Server)**, 2. **Bảo Mật & Chống Spam Toàn Diện (Security & Anti-Spam)**, 3. **Hệ Thống SEO & Rich Snippets (Structured Data)**, 4. **Centralized Logging System**, 🌲 CHD Travel Monorepo, 🏗️ Cấu Trúc Dự Án (Project Architecture), 💻 Danh Sách Lệnh Quản Trị (Root Scripts), 📋 Quy Chuẩn Chất Lượng (Quality Gates) (+1 more)

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

### Community 86 - "seo-store.ts"
Cohesion: 0.22
Nodes (5): seo_description, seo_keywords, seo_og_image, seo_title, ./$types

## Knowledge Gaps
- **243 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `$schema`, `react-is`, `@types/styled-components` (+238 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 333 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `eslint-config-prettier`, `eslint-plugin-svelte`, `jsdom`, `knip`, `@cloudflare/workers-types`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte`, `svelte-check`, `svelte-eslint-parser`, `@sveltejs/adapter-auto`, `postcss`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `@testing-library/svelte`, `tslib`, `@typescript-eslint/parser`, `vite`, `vitest`, `zod`, `typescript`, `sveltekit-superforms`, `eslint`, `@playwright/test`, `prettier`, `tailwindcss`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `$schema` to the rest of the system?**
  _243 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07547169811320754 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07474600870827286 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
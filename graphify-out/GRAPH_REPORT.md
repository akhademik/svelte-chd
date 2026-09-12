# Graph Report - svelte-chd  (2026-09-12)

## Corpus Check
- 207 files · ~109,868 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 769 nodes · 1226 edges · 85 communities (22 shown, 33 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c53f119c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sanity.ts
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- devDependencies
- compilerOptions
- [lang]/+page.server.ts
- seo-store.ts
- front-end/knip.json
- fr/index.ts
- portable-text-components.ts
- vi/index.ts
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
- +layout.svelte
- @sveltejs/adapter-auto
- postcss
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- en/index.ts
- @testing-library/svelte
- tslib
- entry
- base-tour-detail-modal.svelte
- @typescript-eslint/parser
- vite
- vitest
- zod
- format-data.ts
- svelte.config.js
- 🌲 CHD Travel Monorepo
- typescript
- sveltekit-superforms
- type-others.ts
- eslint
- @playwright/test
- prettier
- tailwindcss
- home-page.svelte
- portable-text-block-render.tsx

## God Nodes (most connected - your core abstractions)
1. `scripts` - 31 edges
2. `compilerOptions` - 15 edges
3. `scripts` - 14 edges
4. `Logger` - 13 edges
5. `Locales` - 12 edges
6. `sendMail()` - 10 edges
7. `Tour` - 10 edges
8. `compilerOptions` - 10 edges
9. `scripts` - 9 edges
10. `loadLocaleAsync()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `#each()` --calls--> `get_menu_url()`  [EXTRACTED]
  front-end/src/lib/modules/nav-bar/components/nav-menu-items.svelte → front-end/src/lib/modules/nav-bar/nav-bar-logic.ts
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/day-tours.ts → back-end/components/c-number-input.tsx
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/highland-tours.ts → back-end/components/c-number-input.tsx
- `gen_price_range()` --indirect_call--> `CNumberInput()`  [INFERRED]
  back-end/schemas/helper-functions.ts → back-end/components/c-number-input.tsx
- `Locals` --references--> `Locales`  [EXTRACTED]
  front-end/src/app.d.ts → front-end/src/i18n/i18n-types.ts

## Import Cycles
- None detected.

## Communities (85 total, 33 thin omitted)

### Community 0 - "sanity.ts"
Cohesion: 0.06
Nodes (45): DEFAULT_EXCHANGE_RATES, if(), withKvSnapshot(), cachedFetch(), memoryCache, sanityClient, sanityConfig, mapSanityToBlogPost() (+37 more)

### Community 1 - "i18n-types.ts"
Cohesion: 0.07
Nodes (37): App, Locals, Platform, handle(), initFormatters(), extract_url(), get_lang_cookie(), get_path_name_without_base() (+29 more)

### Community 2 - "schemas/index.ts"
Cohesion: 0.07
Nodes (31): add_thousand_separator(), CNumberInput(), parseNumber(), COLOR_PALETTE, keywords, prepare(), prepare(), BASE_FIELDS (+23 more)

### Community 3 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (35): description, name, private, scripts, build, build:all, build:be, build:fe (+27 more)

### Community 5 - "back-end/package.json"
Cohesion: 0.05
Nodes (41): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+33 more)

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, eslint, knip, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.09
Nodes (29): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, EmailTemplateProps, generateClientEmailHtml() (+21 more)

### Community 10 - "seo-store.ts"
Cohesion: 0.12
Nodes (7): seo_description, seo_keywords, seo_og_image, seo_title, ./$types, ./$types, ./$types

### Community 11 - "front-end/knip.json"
Cohesion: 0.12
Nodes (17): entry, ignore, ignoreDependencies, ignoreExportsUsedInFile, project, $schema, svelte, entry (+9 more)

### Community 13 - "fr/index.ts"
Cohesion: 0.15
Nodes (10): about_page, blog_page, contact_page, error_page, home_page, fr, nav_bar, seo (+2 more)

### Community 15 - "vi/index.ts"
Cohesion: 0.16
Nodes (9): about_page, blog_page, contact_page, error_page, home_page, vn, nav_bar, seo (+1 more)

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @sveltejs/adapter-cloudflare, @types/node, @typescript-eslint/eslint-plugin, @sveltejs/adapter-cloudflare, @types/node (+1 more)

### Community 32 - "+layout.svelte"
Cohesion: 0.11
Nodes (7): #each(), is_locale_transitioning, nav_animate_hidden, nav_deg, nav_mobile, opacity, ./$types

### Community 37 - "en/index.ts"
Cohesion: 0.15
Nodes (10): about_page, blog_page, contact_page, error_page, home_page, en, nav_bar, seo (+2 more)

### Community 40 - "entry"
Cohesion: 0.25
Nodes (10): entry, ignoreDependencies, project, $schema, components/**/*.{ts,tsx}, react-is, sanity.cli.ts, sanity.config.ts (+2 more)

### Community 41 - "base-tour-detail-modal.svelte"
Cohesion: 0.12
Nodes (4): booking_modal, BookingModalState, ./$types, ./$types

### Community 47 - "format-data.ts"
Cohesion: 0.09
Nodes (33): get_menu_url(), is_menu_active(), menu_items, MenuItem, MenuLink, TourService, blog_modal, BlogModalState (+25 more)

### Community 71 - "🌲 CHD Travel Monorepo"
Cohesion: 0.20
Nodes (9): 1. **Clean Layered Architecture (Backend & Frontend Server)**, 2. **Bảo Mật & Chống Spam Toàn Diện (Security & Anti-Spam)**, 3. **Hệ Thống SEO & Rich Snippets (Structured Data)**, 4. **Centralized Logging System**, 🌲 CHD Travel Monorepo, 🏗️ Cấu Trúc Dự Án (Project Architecture), 💻 Danh Sách Lệnh Quản Trị (Root Scripts), 📋 Quy Chuẩn Chất Lượng (Quality Gates) (+1 more)

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

## Knowledge Gaps
- **245 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `$schema`, `react-is`, `@types/styled-components` (+240 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 336 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `Locales` connect `i18n-types.ts` to `i18n-svelte.ts`, `format-data.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `$schema` to the rest of the system?**
  _245 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sanity.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.058496853017400964 - nodes in this community are weakly interconnected._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07467532467532467 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07197763801537387 - nodes in this community are weakly interconnected._
# Graph Report - svelte-chd  (2026-09-13)

## Corpus Check
- 229 files · ~120,273 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 815 nodes · 1308 edges · 86 communities (22 shown, 35 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `19d59d12`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- blog.service.ts
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- dependencies
- base-tour-detail-modal.svelte
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
- nav-bar-logic.ts
- @sveltejs/adapter-auto
- postcss
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- en/index.ts
- @testing-library/svelte
- tslib
- entry
- +layout.svelte
- @typescript-eslint/parser
- vite
- vitest
- zod
- format-data.ts
- svelte.config.js
- 🚀 Tính Năng Nổi Bật & Kiến Trúc Kỹ Thuật
- contact-page.svelte
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
8. `resolve_canonical_category()` - 10 edges
9. `compilerOptions` - 10 edges
10. `scripts` - 9 edges

## Surprising Connections (you probably didn't know these)
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/day-tours.ts → back-end/components/c-number-input.tsx
- `prepare()` --calls--> `add_thousand_separator()`  [EXTRACTED]
  back-end/schemas/category/highland-tours.ts → back-end/components/c-number-input.tsx
- `gen_price_range()` --indirect_call--> `CNumberInput()`  [INFERRED]
  back-end/schemas/helper-functions.ts → back-end/components/c-number-input.tsx
- `Locals` --references--> `Locales`  [EXTRACTED]
  front-end/src/app.d.ts → front-end/src/i18n/i18n-types.ts
- `replace_locale_in_url()` --calls--> `get_category_slug()`  [EXTRACTED]
  front-end/src/i18n/i18n-helper.ts → front-end/src/lib/utils/format-data.ts

## Import Cycles
- None detected.

## Communities (86 total, 35 thin omitted)

### Community 0 - "blog.service.ts"
Cohesion: 0.06
Nodes (29): calculateHeroSlotIndex(), getHeroRotationInterval(), HERO_ROTATION_DEV_MS, HERO_ROTATION_PROD_MS, if(), bgImageUrl, currentHero, currentIndex (+21 more)

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
Nodes (41): devDependencies, eslint, knip, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui (+33 more)

### Community 6 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.09
Nodes (30): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, EmailTemplateProps, generateClientEmailHtml() (+22 more)

### Community 10 - "seo-store.ts"
Cohesion: 0.12
Nodes (6): seo_description, seo_keywords, seo_og_image, seo_title, ./$types, ./$types

### Community 11 - "front-end/knip.json"
Cohesion: 0.12
Nodes (17): entry, ignore, ignoreDependencies, ignoreExportsUsedInFile, project, $schema, svelte, entry (+9 more)

### Community 13 - "fr/index.ts"
Cohesion: 0.11
Nodes (13): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, fr (+5 more)

### Community 15 - "vi/index.ts"
Cohesion: 0.11
Nodes (13): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, vn (+5 more)

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @sveltejs/adapter-cloudflare, @types/node, @typescript-eslint/eslint-plugin, @sveltejs/adapter-cloudflare, @types/node (+1 more)

### Community 32 - "nav-bar-logic.ts"
Cohesion: 0.10
Nodes (11): Translation, #each(), get_menu_url(), is_menu_active(), menu_items, MenuItem, MenuLink, is_locale_transitioning (+3 more)

### Community 37 - "en/index.ts"
Cohesion: 0.11
Nodes (14): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, en (+6 more)

### Community 40 - "entry"
Cohesion: 0.25
Nodes (10): entry, ignoreDependencies, project, $schema, components/**/*.{ts,tsx}, react-is, sanity.cli.ts, sanity.config.ts (+2 more)

### Community 41 - "+layout.svelte"
Cohesion: 0.15
Nodes (4): ./$types, ./$types, opacity, ./$types

### Community 47 - "format-data.ts"
Cohesion: 0.06
Nodes (52): DEFAULT_EXCHANGE_RATES, sanityClient, sanityConfig, mapSanityToTour(), mapSanityToTours(), EXTRACT_TOUR_FIELDS, getSingleTourQuery(), TOURS_BY_DAY_QUERY (+44 more)

### Community 71 - "🚀 Tính Năng Nổi Bật & Kiến Trúc Kỹ Thuật"
Cohesion: 0.18
Nodes (10): 1. **Clean Layered Architecture (Backend & Frontend Server)**, 2. **Chuyển Đổi Ngôn Ngữ Thông Minh & Mapping Slug Động (Smart Multilingual Route Translation)**, 3. **Bảo Mật & Chống Spam Toàn Diện (Security & Anti-Spam)**, 4. **Hệ Thống Trang Pháp Lý, Tiện Ích & SEO Hoàn Thiện**, 5. **Centralized Logging System**, 🌲 CHD Travel Monorepo, 🏗️ Cấu Trúc Dự Án (Project Architecture), 💻 Danh Sách Lệnh Quản Trị (Root Scripts) (+2 more)

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

## Knowledge Gaps
- **252 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `$schema`, `react-is`, `@types/styled-components` (+247 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 344 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `eslint-config-prettier`, `eslint-plugin-svelte`, `jsdom`, `knip`, `@cloudflare/workers-types`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte`, `svelte-check`, `svelte-eslint-parser`, `@sveltejs/adapter-auto`, `postcss`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `@testing-library/svelte`, `tslib`, `@typescript-eslint/parser`, `vite`, `vitest`, `zod`, `typescript`, `sveltekit-superforms`, `eslint`, `@playwright/test`, `prettier`, `tailwindcss`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `$schema` to the rest of the system?**
  _252 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `blog.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06386066763425254 - nodes in this community are weakly interconnected._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07456140350877193 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07197763801537387 - nodes in this community are weakly interconnected._
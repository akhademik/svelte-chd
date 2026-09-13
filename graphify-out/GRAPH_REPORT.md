# Graph Report - svelte-chd  (2026-09-13)

## Corpus Check
- 242 files · ~121,741 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 832 nodes · 1373 edges · 92 communities (29 shown, 33 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ab4c875d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- hero-image.service.ts
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- back-end/package.json
- dependencies
- seo-store.ts
- compilerOptions
- [lang]/+page.server.ts
- format-data.ts
- front-end/knip.json
- blog.service.ts
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
- nav-store.ts
- @sveltejs/adapter-auto
- postcss
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- en/index.ts
- @testing-library/svelte
- tslib
- entry
- base/index.ts
- @typescript-eslint/parser
- vite
- vitest
- zod
- tour.type.ts
- svelte.config.js
- 🚀 Tính Năng Nổi Bật & Kiến Trúc Kỹ Thuật
- tour.service.ts
- exchange.service.ts
- typescript
- sveltekit-superforms
- type-others.ts
- eslint
- @playwright/test
- prettier
- tailwindcss
- blog-page.svelte
- home-page.svelte
- sanity.ts
- contact-page.svelte
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
- 3-file cycle: `front-end/src/lib/base/base-tour-detail-modal.svelte -> front-end/src/lib/modules/tour-page/components/tour-detail-modal.svelte -> front-end/src/lib/base/index.ts -> front-end/src/lib/base/base-tour-detail-modal.svelte`

## Communities (92 total, 33 thin omitted)

### Community 0 - "hero-image.service.ts"
Cohesion: 0.14
Nodes (17): calculateHeroSlotIndex(), getHeroRotationInterval(), getNextHeroRotationDelay(), HERO_ROTATION_DEV_MS, HERO_ROTATION_PROD_MS, currentHero, currentIndex, effectiveImages (+9 more)

### Community 1 - "i18n-types.ts"
Cohesion: 0.07
Nodes (39): App, Locals, Platform, handle(), en, initFormatters(), fr, extract_url() (+31 more)

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

### Community 6 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+13 more)

### Community 7 - "seo-store.ts"
Cohesion: 0.10
Nodes (6): seo_description, seo_keywords, seo_og_image, seo_title, ./$types, ./$types

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "[lang]/+page.server.ts"
Cohesion: 0.09
Nodes (29): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, EmailTemplateProps, generateClientEmailHtml() (+21 more)

### Community 10 - "format-data.ts"
Cohesion: 0.09
Nodes (31): #each(), get_menu_url(), is_menu_active(), menu_items, MenuItem, MenuLink, TourService, blog_modal (+23 more)

### Community 11 - "front-end/knip.json"
Cohesion: 0.12
Nodes (17): entry, ignore, ignoreDependencies, ignoreExportsUsedInFile, project, $schema, svelte, entry (+9 more)

### Community 12 - "blog.service.ts"
Cohesion: 0.24
Nodes (8): mapSanityToBlogPost(), mapSanityToBlogPosts(), ALL_BLOGS_QUERY, EXTRACT_BLOG_FIELDS, FALLBACK_BLOGS_QUERY, FEATURED_BLOGS_QUERY, BlogService, BlogPost

### Community 13 - "fr/index.ts"
Cohesion: 0.11
Nodes (13): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, nav_bar (+5 more)

### Community 15 - "vi/index.ts"
Cohesion: 0.11
Nodes (13): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, vn (+5 more)

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @sveltejs/adapter-cloudflare, @types/node, @typescript-eslint/eslint-plugin, @sveltejs/adapter-cloudflare, @types/node (+1 more)

### Community 32 - "nav-store.ts"
Cohesion: 0.18
Nodes (4): is_locale_transitioning, nav_animate_hidden, nav_deg, nav_mobile

### Community 37 - "en/index.ts"
Cohesion: 0.11
Nodes (13): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, nav_bar (+5 more)

### Community 40 - "entry"
Cohesion: 0.25
Nodes (10): entry, ignoreDependencies, project, $schema, components/**/*.{ts,tsx}, react-is, sanity.cli.ts, sanity.config.ts (+2 more)

### Community 41 - "base/index.ts"
Cohesion: 0.12
Nodes (3): ./$types, opacity, ./$types

### Community 47 - "tour.type.ts"
Cohesion: 0.16
Nodes (8): GeneralKeyString, Highlights, Img_Cover, Locale_Array, Locale_String, Price, Tag, ./$types

### Community 71 - "🚀 Tính Năng Nổi Bật & Kiến Trúc Kỹ Thuật"
Cohesion: 0.18
Nodes (10): 1. **Clean Layered Architecture (Backend & Frontend Server)**, 2. **Chuyển Đổi Ngôn Ngữ Thông Minh & Mapping Slug Động (Smart Multilingual Route Translation)**, 3. **Bảo Mật & Chống Spam Toàn Diện (Security & Anti-Spam)**, 4. **Hệ Thống Trang Pháp Lý, Tiện Ích & SEO Hoàn Thiện**, 5. **Centralized Logging System**, 🌲 CHD Travel Monorepo, 🏗️ Cấu Trúc Dự Án (Project Architecture), 💻 Danh Sách Lệnh Quản Trị (Root Scripts) (+2 more)

### Community 77 - "tour.service.ts"
Cohesion: 0.27
Nodes (8): withKvSnapshot(), mapSanityToTour(), mapSanityToTours(), EXTRACT_TOUR_FIELDS, getSingleTourQuery(), TOURS_BY_DAY_QUERY, TOURS_BY_HIGHLAND_QUERY, TourType

### Community 78 - "exchange.service.ts"
Cohesion: 0.21
Nodes (7): cachedFetch(), memoryCache, sanityClient, sanityConfig, EXCHANGE_RATES_QUERY, ExchangeRatesData, ExchangeService

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

### Community 86 - "blog-page.svelte"
Cohesion: 0.33
Nodes (3): if(), bgImageUrl, url_for()

### Community 87 - "home-page.svelte"
Cohesion: 0.17
Nodes (3): booking_modal, BookingModalState, Testimonial

### Community 88 - "sanity.ts"
Cohesion: 0.23
Nodes (13): DEFAULT_EXCHANGE_RATES, matchesBlogSlug(), matchesTourSlug(), defaultRates, exchange_rates_store, ExchangeRates, slugify(), builder (+5 more)

## Knowledge Gaps
- **251 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `$schema`, `react-is`, `@types/styled-components` (+246 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 340 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `keywords` connect `schemas/index.ts` to `back-end/package.json`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `Logger` connect `[lang]/+page.server.ts` to `hero-image.service.ts`, `format-data.ts`, `blog.service.ts`, `tour.service.ts`, `exchange.service.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `$schema` to the rest of the system?**
  _251 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hero-image.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13666666666666666 - nodes in this community are weakly interconnected._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07071887784921099 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0707070707070707 - nodes in this community are weakly interconnected._
# Graph Report - svelte-chd  (2026-09-14)

## Corpus Check
- 289 files · ~124,964 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 903 nodes · 1552 edges · 94 communities (30 shown, 34 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `689ede8d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- back-end/package.json
- i18n-types.ts
- schemas/index.ts
- scripts
- scripts
- seo-store.ts
- i18n-svelte.ts
- compilerOptions
- rate-limiter.ts
- tour.type.ts
- front-end/knip.json
- devDependencies
- fr/index.ts
- base/index.ts
- vi/index.ts
- compilerOptions
- devDependencies
- format-data.ts
- hero-image.service.ts
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
- [lang]/+page.server.ts
- @sveltejs/adapter-auto
- postcss
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- en/index.ts
- @testing-library/svelte
- tslib
- entry
- home-hero.svelte
- @typescript-eslint/parser
- vite
- vitest
- zod
- logger.ts
- svelte.config.js
- 🚀 Tính Năng Nổi Bật & Kiến Trúc Kỹ Thuật
- format-data.test.ts
- portable-text-components.ts
- typescript
- sveltekit-superforms
- type-others.ts
- eslint
- @playwright/test
- prettier
- tailwindcss
- nav-bar-logic.ts
- testimonial.ts
- tour.service.ts
- contact/+page.server.ts
- blog-detail-modal.svelte
- portable-text-block-render.tsx
- email-template.ts
- home-page.svelte

## God Nodes (most connected - your core abstractions)
1. `scripts` - 31 edges
2. `compilerOptions` - 15 edges
3. `scripts` - 14 edges
4. `Locales` - 14 edges
5. `Tour` - 14 edges
6. `Logger` - 14 edges
7. `sendMail()` - 10 edges
8. `checkRateLimitAsync()` - 10 edges
9. `resolveCanonicalCategory()` - 10 edges
10. `getTourSlug()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `load()` --calls--> `selectDailyHeroImage()`  [EXTRACTED]
  front-end/src/routes/[lang]/+page.server.ts → front-end/src/lib/server/services/hero-image.service.ts
- `SubmissionData` --inherits--> `FormSchema`  [EXTRACTED]
  front-end/src/routes/[lang]/+page.server.ts → front-end/src/lib/utils/form-schema.ts
- `prepare()` --calls--> `addThousandSeparator()`  [EXTRACTED]
  back-end/schemas/category/day-tours.ts → back-end/components/c-number-input.tsx
- `prepare()` --calls--> `addThousandSeparator()`  [EXTRACTED]
  back-end/schemas/category/highland-tours.ts → back-end/components/c-number-input.tsx
- `genPriceRange()` --indirect_call--> `CNumberInput()`  [INFERRED]
  back-end/schemas/helper-functions.ts → back-end/components/c-number-input.tsx

## Import Cycles
- None detected.

## Communities (94 total, 34 thin omitted)

### Community 0 - "back-end/package.json"
Cohesion: 0.05
Nodes (41): dependencies, react, react-dom, react-is, sanity, @sanity/color-input, @sanity/image-url, sanity-plugin-media (+33 more)

### Community 1 - "i18n-types.ts"
Cohesion: 0.06
Nodes (45): App, Locals, Platform, handle(), initFormatters(), extractUrl(), getLangCookie(), getPathNameWithoutBase() (+37 more)

### Community 2 - "schemas/index.ts"
Cohesion: 0.07
Nodes (32): addThousandSeparator(), CNumberInput(), parseNumber(), COLOR_PALETTE, structure(), keywords, prepare(), prepare() (+24 more)

### Community 3 - "scripts"
Cohesion: 0.06
Nodes (35): concurrently, author, name, dependencies, concurrently, @portabletext/svelte, resend, @sanity/client (+27 more)

### Community 4 - "scripts"
Cohesion: 0.06
Nodes (35): description, name, private, scripts, build, build:all, build:be, build:fe (+27 more)

### Community 6 - "seo-store.ts"
Cohesion: 0.13
Nodes (5): seoDescription, seoKeywords, seoOgImage, seoTitle, ./$types

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx, lib (+15 more)

### Community 9 - "rate-limiter.ts"
Cohesion: 0.23
Nodes (10): checkRateLimit(), checkRateLimitAsync(), cleanupExpiredRecords(), getClientIp(), ipLimits, KVNamespaceLike, lastCleanup, RateLimitOptions (+2 more)

### Community 10 - "tour.type.ts"
Cohesion: 0.17
Nodes (7): bookingModal, BookingModalState, GoodToKnowItem, Locale_Array, Locale_String, Price, TourGoodToKnow

### Community 11 - "front-end/knip.json"
Cohesion: 0.12
Nodes (17): entry, ignore, ignoreDependencies, ignoreExportsUsedInFile, project, $schema, svelte, entry (+9 more)

### Community 12 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, eslint, knip, prettier, react-icons, @sanity/eslint-config-studio, sanity-plugin-asset-source-unsplash, @sanity/ui (+13 more)

### Community 13 - "fr/index.ts"
Cohesion: 0.11
Nodes (14): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, fr (+6 more)

### Community 14 - "base/index.ts"
Cohesion: 0.13
Nodes (5): index(), SITE_CONFIG, builder, config, ./$types

### Community 15 - "vi/index.ts"
Cohesion: 0.11
Nodes (13): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, vn (+5 more)

### Community 16 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, checkJs, esModuleInterop, forceConsistentCasingInFileNames, resolveJsonModule, skipLibCheck, sourceMap (+5 more)

### Community 17 - "devDependencies"
Cohesion: 0.22
Nodes (9): autoprefixer, devDependencies, autoprefixer, @sveltejs/adapter-cloudflare, @types/node, @typescript-eslint/eslint-plugin, @sveltejs/adapter-cloudflare, @types/node (+1 more)

### Community 20 - "hero-image.service.ts"
Cohesion: 0.24
Nodes (10): calculateHeroSlotIndex(), getHeroRotationInterval(), getNextHeroRotationDelay(), HERO_ROTATION_DEV_MS, HERO_ROTATION_PROD_MS, withKvSnapshot(), EXTRACT_HERO_IMAGE_FIELDS, HERO_IMAGES_QUERY (+2 more)

### Community 32 - "[lang]/+page.server.ts"
Cohesion: 0.20
Nodes (12): ClientConfirmationData, getAdminNotifyEmail(), getFromEmail(), sendClientConfirmation(), sendMail(), SendMailOptions, HeroImageService, sendEmail() (+4 more)

### Community 37 - "en/index.ts"
Cohesion: 0.11
Nodes (14): about_page, blog_page, contact_page, error_page, faq_page, footer, home_page, en (+6 more)

### Community 40 - "entry"
Cohesion: 0.25
Nodes (10): entry, ignoreDependencies, project, $schema, components/**/*.{ts,tsx}, react-is, sanity.cli.ts, sanity.config.ts (+2 more)

### Community 41 - "home-hero.svelte"
Cohesion: 0.18
Nodes (9): if(), bgImageUrl, currentHero, currentIndex, effectiveImages, scheduleNextRotation(), stickyImage, syncToClock() (+1 more)

### Community 47 - "logger.ts"
Cohesion: 0.24
Nodes (5): isSpamSubmission(), isDebugEnabled, Logger, LogLevel, POST()

### Community 71 - "🚀 Tính Năng Nổi Bật & Kiến Trúc Kỹ Thuật"
Cohesion: 0.17
Nodes (11): 1. **Clean Layered Architecture (Backend & Frontend Server)**, 2. **Chuyển Đổi Ngôn Ngữ Thông Minh & Mapping Slug Động (Smart Multilingual Route Translation)**, 3. **Quy Chuẩn Đặt Tên Mã Nguồn (Code Style & Naming Conventions)**, 4. **Bảo Mật & Chống Spam Toàn Diện (Security & Anti-Spam)**, 5. **Hệ Thống Trang Pháp Lý, Tiện Ích & SEO Hoàn Thiện**, 6. **Centralized Logging System**, 🌲 CHD Travel Monorepo, 🏗️ Cấu Trúc Dự Án (Project Architecture) (+3 more)

### Community 77 - "format-data.test.ts"
Cohesion: 0.16
Nodes (13): defaultRates, ExchangeRates, exchangeRatesStore, getAvatarInitials(), filterLocalizedItems(), getLocalizedField(), hasLocalizedTitle(), formatPaxNo() (+5 more)

### Community 81 - "type-others.ts"
Cohesion: 0.23
Nodes (9): AlignCenterRender(), AlignJustifyRender(), AlignRightRender(), COLOR_DECORATORS, createColorIcon(), createColorRender(), HighlightRender(), PortableTextImagePreview() (+1 more)

### Community 86 - "nav-bar-logic.ts"
Cohesion: 0.10
Nodes (15): #each(), getMenuUrl(), isMenuActive(), MenuItem, menuItems, MenuLink, TourService, isLocaleTransitioning (+7 more)

### Community 87 - "testimonial.ts"
Cohesion: 0.33
Nodes (4): mapTestimonial(), mapTestimonials(), TestimonialViewModel, Testimonial

### Community 88 - "tour.service.ts"
Cohesion: 0.06
Nodes (48): DEFAULT_EXCHANGE_RATES, cachedFetch(), memoryCache, sanityClient, sanityConfig, mapSanityToBlogPost(), mapSanityToBlogPosts(), SanityBlogPostRaw (+40 more)

### Community 89 - "contact/+page.server.ts"
Cohesion: 0.33
Nodes (4): BookingApiSchema, FormSchema, actions, SubmissionData

### Community 92 - "email-template.ts"
Cohesion: 0.48
Nodes (3): EmailTemplateProps, generateClientEmailHtml(), escapeHtml()

## Knowledge Gaps
- **253 isolated node(s):** `COLOR_PALETTE`, `BlockRenderProps`, `$schema`, `react-is`, `@types/styled-components` (+248 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 364 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Logger` connect `logger.ts` to `[lang]/+page.server.ts`, `rate-limiter.ts`, `hero-image.service.ts`, `nav-bar-logic.ts`, `tour.service.ts`, `contact/+page.server.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `Locales` connect `i18n-types.ts` to `format-data.ts`, `format-data.test.ts`, `nav-bar-logic.ts`, `i18n-svelte.ts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `sanity` connect `schemas/index.ts` to `type-others.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `COLOR_PALETTE`, `BlockRenderProps`, `$schema` to the rest of the system?**
  _253 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `back-end/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `i18n-types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06151062867480778 - nodes in this community are weakly interconnected._
- **Should `schemas/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06578947368421052 - nodes in this community are weakly interconnected._
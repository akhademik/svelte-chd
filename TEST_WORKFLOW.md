# 🧪 HỆ THỐNG KIỂM THỬ VÀ KIỂM TRA CHẤT LƯỢNG (TESTING & QUALITY WORKFLOW)

> **Mục tiêu**: Đảm bảo mọi thay đổi trong `front-end/` và `back-end/` luôn vượt qua đầy đủ các tầng kiểm tra chất lượng (Format -> Lint -> Type Check -> Unit Test -> E2E -> Dead Code -> Build -> Graphify).

---

## 🎯 1. Danh Sách Kiểm Tra Bắt Buộc (Quality Checklist)

Sau mỗi lần sửa đổi code, thực hiện lần lượt các bước sau từ thư mục gốc:

1. **Auto Format (`pnpm format:all`)**:
   - Tự động chuẩn hóa toàn bộ file code theo quy chuẩn Prettier.
2. **Linting (`pnpm lint:all`)**:
   - Frontend: `prettier --check . && eslint .`
   - Backend: `eslint .`
3. **Type Checking (`pnpm check:all`)**:
   - Frontend: `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`
   - Backend: `tsc --noEmit`
4. **Unit Testing (`pnpm test` / Vitest)**:
   - i18n URL & Slug Translation: [`i18n-helper.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/i18n/i18n-helper.test.ts) (8 tests)
   - Form Schema Validation: [`form-schema.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/form-schema.test.ts) (8 tests)
   - Data & Image Formatters & Multilingual Filter: [`format-data.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/format-data.test.ts) (19 tests)
   - Slug Resolution & Mapping: [`slug.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/slug.test.ts) (14 tests)
   - Gallery Image Collection & PortableText: [`gallery.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/gallery.test.ts) (8 tests)
   - Testimonial Utilities: [`testimonial.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/modules/testimonials/testimonial.test.ts) (4 tests)
   - Navigation Link Helpers: [`navigation.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/navigation.test.ts) (3 tests)
   - Navigation Bar & Active Route Logic: [`nav-bar-logic.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/modules/nav-bar/nav-bar-logic.test.ts) (6 tests)
   - Tour Service Layer: [`tour.service.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/tour.service.test.ts) (9 tests)
   - Blog Service Layer: [`blog.service.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/blog.service.test.ts) (8 tests)
   - Exchange Service Layer: [`exchange.service.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/exchange.service.test.ts) (3 tests)
   - Hero Image Deterministic Rotation & Sticky Logic: [`hero-image.service.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/hero-image.service.test.ts) (5 tests)
   - Sanity Tour Mapper: [`tour.mapper.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/sanity/mappers/tour.mapper.test.ts) (4 tests)
   - Sanity Blog Mapper: [`blog.mapper.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/sanity/mappers/blog.mapper.test.ts) (4 tests)
   - IP Rate Limiter: [`rate-limiter.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/security/rate-limiter.test.ts) (4 tests)
   - Anti-Spam Honeypot Traps: [`anti-spam.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/security/anti-spam.test.ts) (3 tests)
   - HTML Sanitizer / Escaper: [`html-escape.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/security/html-escape.test.ts) (2 tests)
   - Email Template Compiler: [`email-template.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/email-template.test.ts) (1 test)
   - **Tổng cộng: 113/113 unit tests passing across 18 suites.**
5. **Dead Code & Dependency Analysis (`pnpm knip:all`)**:
   - Quét và loại bỏ dead code, file mồ côi, export/type và package không sử dụng trên toàn bộ monorepo (`front-end` và `back-end`).
6. **E2E Testing (`pnpm test:e2e` / Playwright)**:
   - Chạy kiểm thử tương tác người dùng, điều hướng đa ngôn ngữ, chuyển đổi slug tour động, form submission, SEO metadata (**6/6 tests passing**).
7. **Production Build (`pnpm build:all`)**:
   - Biên dịch kiểm tra Cloudflare Workers adapter và Sanity Studio build.
8. **Đồng Bộ Knowledge Graph (`graphify update .`)**:
   - Cập nhật đồ thị phụ thuộc kiến trúc mã nguồn trong `graphify-out/`.

---

## 🔄 2. Quy Trình Phản Hồi & Commit

1. **Thực hiện sửa đổi** (Single-pass edit bằng native tool, không dùng patch vặt, tuân thủ `camelCase` cho functions/methods).
2. **Chạy toàn bộ chuỗi kiểm tra & CI/CD Verification**:
   - Format: `pnpm format:all`
   - Linting: `pnpm lint:all`
   - Type Checking: `pnpm check:all`
   - Unit Tests: `pnpm test` (Vitest 113/113 across 18 suites)
   - E2E Tests: `pnpm test:e2e` (Playwright 6/6 — Kiểm tra và đảm bảo toàn bộ CI/CD GitHub Actions pass 100%)
   - Dead Code: `pnpm knip:all`
   - Build Check: `pnpm build:all`
3. **Chạy `graphify update .`** cập nhật graph tri thức mã nguồn.
4. **Báo cáo kết quả đầy đủ, rõ ràng cho User**.
5. **Khi User phê duyệt (OK)** -> Thực hiện Git Commit & Push theo chuẩn Conventional Commits.



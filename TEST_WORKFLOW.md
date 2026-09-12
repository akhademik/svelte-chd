# 🧪 HỆ THỐNG KIỂM THỬ VÀ KIỂM TRA CHẤT LƯỢNG (TESTING & QUALITY WORKFLOW)

> **Mục tiêu**: Đảm bảo mọi thay đổi trong `front-end/` và `back-end/` luôn vượt qua đầy đủ các tầng kiểm tra chất lượng (Format -> Lint -> Type Check -> Unit Test -> Graphify).

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
   - Form Schema Validation: [`form-schema.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/form-schema.test.ts) (4 tests)
   - Data & Image Formatters & Multilingual Filter: [`format-data.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/format-data.test.ts) (14 tests)
   - Sanity URL Builder & Helpers: [`sanity.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/sanity.test.ts) (16 tests)
   - Navigation Bar & Active Route Logic: [`nav-bar-logic.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/modules/nav-bar/nav-bar-logic.test.ts) (6 tests)
   - Hero Image Daily Rotation & Sticky Logic: [`hero-image.service.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/hero-image.service.test.ts) (3 tests)
   - IP Rate Limiter: [`rate-limiter.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/security/rate-limiter.test.ts) (3 tests)
   - Anti-Spam Honeypot Traps: [`anti-spam.test.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/security/anti-spam.test.ts) (3 tests)
   - **Tổng cộng: 49/49 unit tests passing across 7 suites.**
5. **Dead Code & Dependency Analysis (`pnpm knip:all`)**:
   - Quét và loại bỏ dead code, file mồ côi, export/type và package không sử dụng trên toàn bộ monorepo (`front-end` và `back-end`).
6. **E2E Testing (`pnpm test:e2e` / Playwright)**:
   - Chạy kiểm thử tương tác người dùng, điều hướng đa ngôn ngữ, form submission.
7. **Đồng Bộ Knowledge Graph (`graphify update .`)**:
   - Cập nhật đồ thị phụ thuộc kiến trúc mã nguồn trong `graphify-out/`.

---

## 🔄 2. Quy Trình Phản Hồi & Commit

1. **Thực hiện sửa đổi** (Single-pass edit bằng native tool, không dùng patch vặt).
2. **Chạy toàn bộ chuỗi kiểm tra & CI/CD Verification**:
   - Format: `pnpm format:all`
   - Linting: `pnpm lint:all`
   - Type Checking: `pnpm check:all`
   - Unit Tests: `pnpm test` (Vitest 49/49)
   - E2E Tests: `pnpm test:e2e` (Playwright 5/5 — Kiểm tra và đảm bảo toàn bộ CI/CD GitHub Actions pass 100%)
   - Dead Code: `pnpm knip:all`
   - Build Check: `pnpm build:all`
3. **Chạy `graphify update .`** cập nhật graph tri thức mã nguồn.
4. **Báo cáo kết quả đầy đủ, rõ ràng cho User**.
5. **Khi User phê duyệt (OK)** -> Thực hiện Git Commit & Push theo chuẩn Conventional Commits.


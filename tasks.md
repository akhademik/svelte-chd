# 📋 DANH SÁCH NHIỆM VỤ & HẠNG MỤC CẦN LÀM (TASK LIST)

> **Tài liệu theo dõi tiến độ kỹ thuật & refactor** cho dự án `svelte-chd`.  
> Tuân thủ các quy chuẩn từ `DEVELOPMENT_WORKFLOW.md`, `LAYOUT_DESIGN_CONCEPT.md`, và `TEST_WORKFLOW.md`.

---

## 🚨 P0 — Ưu Tiên Cao Nhất (Bug Fixes, Critical Async & Package Hygiene)

- [x] **1. Đồng bộ Lockfile (Package Manager Hygiene)**
  - [x] Xóa bỏ `package-lock.json` thừa trong `back-end/`.
  - [x] Đảm bảo toàn bộ workspace chuẩn hóa 100% bằng `pnpm` (`pnpm-lock.yaml`).
- [x] **2. Sửa Lỗi Bất Đồng Bộ Trong Form Submission (`sendMail` / Notifications)**
  - [x] `await` toàn bộ `Promise.allSettled([sendClientConfirmation(...), sendToDiscord(...)])` trong route action trước khi return response để tránh bị cancel giữa chừng trên Cloudflare Pages/Edge runtime.
  - [ ] Xem xét cơ chế queue / background retry an toàn cho email và Discord notification.
- [x] **3. Đơn Giản Hóa Logic Điều Hướng Locale (Locale Redirection Refactor)**
  - [x] Tối ưu hóa điều kiện kiểm tra `url_lang` & `isLocale(url_lang)` trong `hooks` / route guards để loại bỏ logic dư thừa/redundant redirect.

---

## ⚡ P1 — Ưu Tiên Cao (Kiến Trúc Dữ Liệu, CMS Adapter & Central Logger)

- [ ] **4. Triển Khai Centralized Logger System**
  - [ ] Tạo module `front-end/src/lib/utils/logger.ts` (hỗ trợ các level `INFO`, `WARN`, `ERROR`, `DEBUG`, `perf`).
  - [ ] Tự động bật debug trong môi trường Vite dev (`import.meta.env.DEV`), ẩn log chi tiết ở Production.
  - [ ] Thay thế các lệnh gọi `console.log`, `console.warn`, `console.error` rải rác sang `Logger.*`.
- [ ] **5. Tách Lớp Sanity Adapter Khỏi Domain Model (Decoupling CMS Schema)**
  - [ ] Tạo cấu trúc kiến trúc rõ ràng: `server/sanity/queries/` và `server/sanity/mappers/`.
  - [ ] Xây dựng **Canonical Domain Models** (chuẩn hóa model `Tour`, `Blog`, `Review`).
  - [ ] Chuyển toàn bộ logic xử lý schema legacy (`day-tours`, `tourDaily`, `tourSlug.en`, `tour_slug.vn`...) vào tầng **Mapper/Adapter**, không để rò rỉ vào Frontend UI components.
  - [ ] Canonical hóa schema phía Sanity Studio backend nếu khả thi (`_type: "tour"`, `tourType: "day" | "multi-day"`, `slug: { vi, en, fr }`).
- [ ] **6. Chuẩn Hóa Naming Convention Sang CamelCase**
  - [ ] Refactor các hàm/biến mang phong cách snake_case sang chuẩn TypeScript camelCase:
    - `send_to_discord` ➔ `sendToDiscord`
    - `send_email` ➔ `sendEmail`
    - `clone_request` ➔ `requestClone`
    - `last_val` ➔ `submission` / `formPayload`
    - `discord_body` ➔ `discordBody`

---

## 📈 P2 — Tối Ưu SEO Nâng Cao & Trải Nghiệm Người Dùng (SEO & UX Polish)

- [ ] **7. Nâng Cấp Toàn Diện Hệ Thống SEO & Structured Data (Rich Snippets)**
  - [ ] Bổ sung thẻ đa ngôn ngữ `hreflang` tương ứng cho toàn bộ tour (`/vi/...`, `/en/...`, `/fr/...`).
  - [ ] Tích hợp Schema.org Structured Data (JSON-LD) cho từng loại trang:
    - `TouristTrip` & `Product` (cho trang chi tiết Tour)
    - `BreadcrumbList` (cho thanh điều hướng breadcrumb)
    - `Organization` & `LocalBusiness` (cho toàn bộ website)
  - [ ] Chuẩn hóa metadata đầy đủ: `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph, Twitter Cards.
- [ ] **8. Đảm Bảo Chuẩn Layout & Quality Gate Loop**
  - [ ] Tuân thủ Mobile-first container padding (`mx-auto max-w-6xl px-6 py-12`).
  - [ ] Tuân thủ quy chuẩn lowercase chữ đa ngôn ngữ trên Header/Navbar theo `LAYOUT_DESIGN_CONCEPT.md`.
  - [ ] Chạy trọn vẹn Quality Gate sau khi sửa đổi: `Lint` ➔ `Type Check` ➔ `Format` ➔ `Test` ➔ `Knip` ➔ `/graphify`.


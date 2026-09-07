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
- [x] **4. Khắc Phục Logic Phân Biệt Lỗi & Kết Quả Hợp Lệ Trong `withKvSnapshot`**
  - [x] Tách biệt rõ giữa **fetch failed / exception** với **valid empty result (`[]` hoặc empty array)**.
  - [x] Tránh trường hợp khi cố ý xóa hết tour/blog trên Sanity mà hệ thống lại nhận diện nhầm là lỗi và fallback ngược lại snapshot KV cũ.
  - [x] Thêm TTL `expirationTtl: 60 * 60 * 24 * 14` (14 ngày) khi ghi `kv.put` để snapshot đóng vai trò disaster recovery đúng nghĩa.

---

## ⚡ P1 — Ưu Tiên Cao (Kiến Trúc Dữ Liệu, CMS Adapter & Central Logger)

- [x] **5. Triển Khai Centralized Logger System**
  - [x] Tạo module `front-end/src/lib/utils/logger.ts` (hỗ trợ các level `INFO`, `WARN`, `ERROR`, `DEBUG`, `perf`).
  - [x] Tự động bật debug trong môi trường Vite dev (`import.meta.env.DEV`), ẩn log chi tiết ở Production.
  - [x] Thay thế các lệnh gọi `console.log`, `console.warn`, `console.error` rải rác sang `Logger.*`.
- [x] **6. Tách Lớp Sanity Adapter Khỏi Domain Model (Decoupling CMS Schema)**
  - [x] Tạo cấu trúc kiến trúc rõ ràng: `server/sanity/queries/` và `server/sanity/mappers/`.
  - [x] Xây dựng **Canonical Domain Models** (chuẩn hóa model `Tour`, `Blog`, `Review`).
  - [x] Chuyển toàn bộ logic xử lý schema legacy (`day-tours`, `tourDaily`, `tourSlug.en`, `tour_slug.vn`...) vào tầng **Mapper/Adapter**, không để rò rỉ vào Frontend UI components.
- [x] **7. Chuẩn Hóa Naming Convention Sang CamelCase**
  - [x] Refactor các hàm/biến mang phong cách snake_case sang chuẩn TypeScript camelCase:
    - `send_to_discord` ➔ `sendToDiscord`
    - `send_email` ➔ `sendEmail`
    - `clone_request` ➔ `requestClone`
    - `last_val` ➔ `submission` / `formPayload`
    - `discord_body` ➔ `discordBody`
- [x] **8. Chuẩn Hóa Type Safety & Xóa Fallback Không An Toàn Trong `fetchToursByType`**
  - [x] Định nghĩa `export type TourType = 'day-tours' | 'highland-tours'`.
  - [x] Áp dụng strict type cho `fetchToursByType(tourType: TourType, kv?: KVNamespace)`.
  - [x] Loại bỏ nhánh fallback không kiểm soát `ALL_TOURS_QUERY` khi truyền sai type để tăng tính deterministic.
- [x] **9. Kiểm Tra & Tinh Chỉnh Cơ Chế Tỉ Giá (Exchange Rate Sync)**
  - [x] Kiểm tra lại GitHub Actions `.github/workflows/sync-rates.yml` và script `scripts/sync-rates.js`.
  - [x] Đảm bảo cron job cập nhật tỉ giá vào `exchange-rates-latest` trong Sanity hoạt động ổn định hàng ngày.
  - [x] Rà soát các secret cần thiết (`SANITY_WRITE_TOKEN`, `EXCHANGE_API_KEY`, `VITE_SANITY_ID`).
- [x] **10. Tinh Gọn Cấu Trúc Module Server (Clean Layered Architecture)**
  - [x] Đưa `memory-cache` và `kv-snapshot` thành các utility cache riêng biệt (`front-end/src/lib/server/cache/`).
  - [x] Tổ chức các service cụ thể: `tour.service.ts`, `blog.service.ts`, `exchange.service.ts` tách biệt hoàn toàn với Sanity adapter (`front-end/src/lib/server/services/`).

---

## 📈 P2 — Tối Ưu SEO Nâng Cao, Bảo Mật & Trải Nghiệm Người Dùng (SEO & Security Polish)

- [x] **11. Nâng Cấp Toàn Diện Hệ Thống SEO & Structured Data (Rich Snippets)**
  - [x] Bổ sung thẻ đa ngôn ngữ `hreflang` tương ứng cho toàn bộ tour (`/vi/...`, `/en/...`, `/fr/...`).
  - [x] Tích hợp Schema.org Structured Data (JSON-LD) cho từng loại trang:
    - `TouristTrip` & `Product` (cho trang chi tiết Tour)
    - `BreadcrumbList` (cho thanh điều hướng breadcrumb)
    - `Organization` & `LocalBusiness` (cho toàn bộ website)
  - [x] Chuẩn hóa metadata đầy đủ: `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph, Twitter Cards.
- [x] **12. Đảm Bảo Chuẩn Layout & Quality Gate Loop**
  - [x] Tuân thủ Mobile-first container padding (`mx-auto max-w-6xl px-6 py-12`).
  - [x] Tuân thủ quy chuẩn lowercase chữ đa ngôn ngữ trên Header/Navbar theo `LAYOUT_DESIGN_CONCEPT.md`.
  - [x] Chạy trọn vẹn Quality Gate sau khi sửa đổi: `Lint` ➔ `Type Check` ➔ `Format` ➔ `Test` ➔ `Knip` ➔ `/graphify`.
- [x] **13. Thêm Rate Limiting & Anti-Spam Cơ Bản Cho Contact / Booking Action**
  - [x] Xây dựng module Rate Limiter (`front-end/src/lib/server/security/rate-limiter.ts`) giới hạn 5 submissions / 10 phút / IP.
  - [x] Xây dựng Honeypot Anti-Spam (`front-end/src/lib/server/security/anti-spam.ts`) và tích hợp input ẩn trên UI Contact & Booking Modal.
  - [x] Ngăn ngừa bot spam email và bảo vệ Discord webhook chống flood.




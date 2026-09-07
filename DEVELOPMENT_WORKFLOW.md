# 📋 QUY TRÌNH PHÁT TRIỂN & CHẤT LƯỢNG MÃ NGUỒN (DEVELOPMENT WORKFLOW)

> **Tài liệu quy chuẩn bắt buộc** cho dự án `svelte-chd` (Frontend: SvelteKit + TailwindCSS + Sanity Client; Backend: Sanity Studio v3).

---

## 🔒 1. Quy tắc Quản lý Gói (Package Manager Rule)

- **BẮT BUỘC DÙNG `pnpm`** (Tuyệt đối không dùng `npm` hoặc `yarn`).
- Dự án gồm 2 workspace chính:
  - `front-end/`: SvelteKit (Svelte 5 Runes), TypeScript, TailwindCSS Minimalist UI, Typesafe-i18n, Multi-layer Cache & Disaster Recovery, Security (Rate Limiting & Honeypot).
  - `back-end/`: Sanity Content Studio v3, React 18, TypeScript schemas (`tourDaily`, `tourCentral`, `blogPost`, `exchangeRates`).

```bash
# Cài đặt toàn bộ dự án từ thư mục gốc
pnpm install
```

### 🚀 Lệnh Nhanh Tại Thư Mục Gốc (Root Scripts):
- **Dev Frontend**: `pnpm dev` (hoặc `pnpm dev:fe`)
- **Dev Backend (Sanity Studio)**: `pnpm dev:be`
- **Dev Cả 2 Cùng Lúc**: `pnpm dev:all`
- **Build Production**: `pnpm build:all`
- **Kiểm tra Type & Diagnostics**: `pnpm check:all` (`svelte-check` + `tsc --noEmit`)
- **Kiểm tra Linting & Format**: `pnpm lint:all`
- **Tự động Format Code**: `pnpm format:all`
- **Chạy Test Suites**: `pnpm test` (Unit tests) & `pnpm test:e2e` (Playwright)
- **Kiểm tra Dead Code & Unused**: `pnpm knip:all`
- **Đồng bộ Tỷ Giá Ngoại Tệ (Cron / Script)**: `pnpm sync:rates`
- **Đồng bộ i18n**: `pnpm i18n` (Typesafe-i18n)
- **Cập nhật Knowledge Graph**: `graphify update .`

---

## 🧱 2. Chu trình Chỉnh Sửa Code Chuẩn (Quality Gate Loop)

Mỗi khi chỉnh sửa mã nguồn, bắt buộc tuân thủ đúng 5 bước sau:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Chỉnh sửa code dứt điểm trong 1 lần (Single-pass edit)   │
│    - Sử dụng native tool, không dùng shell patch vặt        │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Chạy toàn bộ bộ kiểm tra chất lượng (Quality Gates)      │
│    - pnpm format:all                                        │
│    - pnpm lint:all                                          │
│    - pnpm check:all (Svelte & TypeScript diagnostics)       │
│    - pnpm test (Vitest 22/22 unit test suites)              │
│    - pnpm knip:all (Dead Code & Unused Dependencies)        │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Chạy `graphify update .` để cập nhật Knowledge Graph     │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Báo cáo và trình bày kết quả rõ ràng cho User            │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Đợi User xác nhận -> Đề xuất Commit Git                  │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ 3. Kiến Trúc Phân Tầng & Quy Định Kỹ Thuật (Architecture Standards)

1. **Clean Service Layer (`front-end/src/lib/server/services/`)**:
   - Mọi thao tác truy xuất dữ liệu CMS phải qua `TourService`, `BlogService`, hoặc `ExchangeService`.
   - Route load (`+page.server.ts`, `+layout.server.ts`) không được gọi trực tiếp Sanity query cấp thấp.

2. **Decoupled Sanity Adapters (`front-end/src/lib/server/sanity/`)**:
   - `queries/`: Chỉ chứa GROQ queries chuẩn khớp với schema backend (`tourDaily`, `tourCentral`, `blogPost`).
   - `mappers/`: Chuyển đổi dữ liệu thô từ Sanity thành Domain Model (`Tour`, `BlogPost`).

3. **Multi-layer Cache & Disaster Recovery (`front-end/src/lib/server/cache/`)**:
   - `memory-cache.ts`: Cache in-memory theo TTL cho Worker isolates (bỏ qua trong chế độ Dev).
   - `kv-snapshot.ts`: Lưu snapshot dự phòng 14 ngày trên Cloudflare KV. Khi Sanity gặp sự cố, hệ thống tự động fallback snapshot để web vẫn phục vụ bình thường.

4. **Security & Anti-Spam (`front-end/src/lib/server/security/`)**:
   - Mọi form submission (Contact, Booking) phải qua `checkRateLimit` (5 requests / 10 phút / IP) và `isSpamSubmission` (Honeypot trap).
   - Toàn bộ email/Discord notification phải được xử lý qua `Promise.allSettled` trước khi return response.

5. **Central Logger (`front-end/src/lib/utils/logger.ts`)**:
   - Tuyệt đối không dùng `console.log` / `console.error` rải rác. Luôn sử dụng `Logger.info`, `Logger.warn`, `Logger.error`, `Logger.debug`.

6. **Batch Jobs & Cron Synchronization (`front-end/scripts/sync-rates.js`)**:
   - Mọi tác vụ mutate/sync dữ liệu định kỳ (ví dụ: lấy tỷ giá ngoại tệ từ bên thứ ba và ghi vào Sanity) **bắt buộc chạy dưới dạng script độc lập** (`pnpm sync:rates`), không nhúng logic write token vào HTTP routes công khai.
   - Khi cấu hình GitHub Action Cron hoặc Cloudflare Cron, trigger trực tiếp script này cùng các biến môi trường `SANITY_WRITE_TOKEN`, `VITE_SANITY_ID`, `EXCHANGE_API_KEY`, `EXCHANGE_URL`.


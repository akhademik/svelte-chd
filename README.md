# 🌲 CHD Travel Monorepo

> Du lịch trải nghiệm bản địa Tây Nguyên — *Go local · See local · Eat local*

Monorepo chứa toàn bộ mã nguồn của dự án **CHD Travel**, bao gồm ứng dụng Web Frontend (SvelteKit) và hệ thống Quản trị nội dung CMS Backend (Sanity Studio v3).

---

## 🏗️ Cấu Trúc Dự Án (Project Architecture)

```
svelte-chd/
├── front-end/               # Ứng dụng Web chính (SvelteKit + Svelte 5 Runes + TailwindCSS)
│   ├── e2e/                 # Test end-to-end (Playwright)
│   ├── scripts/             # Batch scripts & Cron Workers (sync-rates.js)
│   ├── src/
│   │   ├── i18n/            # Hệ thống đa ngôn ngữ typesafe-i18n (vn, en, fr)
│   │   ├── lib/             # Modules, Base UI components, Stores
│   │   │   └── server/      # Clean Server Layer:
│   │   │       ├── cache/   # Memory Cache & Cloudflare KV Disaster Recovery Snapshot
│   │   │       ├── sanity/  # Sanity Client, GROQ Queries, Canonical Mappers
│   │   │       ├── services/# Domain Services (TourService, BlogService, ExchangeService)
│   │   │       ├── security/# IP Rate Limiting & Anti-Spam Honeypot Traps
│   │   │       └── email/   # Resend Email Service & Admin/Client Templates
│   │   └── routes/          # SvelteKit SSR Routes theo ngôn ngữ /[lang]/ & API endpoints
│   └── static/              # Favicon, static assets, schema icons
├── back-end/                # Sanity Content Studio v3 (React + TypeScript)
├── schemas/             # Sanity Document & Object Schemas (Tours, Blog, Rates)
│   ├── components/          # Custom Sanity Studio UI Components
│   └── sanity.config.ts     # Cấu hình Sanity Studio workspace
├── graphify-out/            # Persistent Knowledge Graph & Codebase Reports
├── DEVELOPMENT_WORKFLOW.md  # Quy chuẩn phát triển & Quality Gate bắt buộc
├── LAYOUT_DESIGN_CONCEPT.md # Hệ thống Design tokens & Quy chuẩn UI/UX
├── TEST_WORKFLOW.md         # Quy trình kiểm thử Vitest, Playwright & Quality Gates
└── tasks.md                 # Nhật ký theo dõi & hoàn thành hạng mục dự án
```

---

## 🚀 Tính Năng Nổi Bật & Kiến Trúc Kỹ Thuật

### 1. **Clean Layered Architecture (Backend & Frontend Server)**
- **Decoupled CMS Adapter**: Phân tách hoàn toàn Sanity schema khỏi tầng domain thông qua **Canonical Mappers** ([`tour.mapper.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/sanity/mappers/tour.mapper.ts), [`blog.mapper.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/sanity/mappers/blog.mapper.ts)).
- **Domain Services**: [`TourService`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/tour.service.ts), [`BlogService`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/blog.service.ts), [`ExchangeService`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/exchange.service.ts) đóng gói toàn bộ nghiệp vụ truy xuất dữ liệu.
- **Tách Biệt Luồng Batch Sync (Cron)**: Toàn bộ quá trình fetch tỷ giá ngoại tệ từ bên thứ ba và seal vào Sanity CMS được chuyển giao cho [`scripts/sync-rates.js`](file:///home/hajtran/dev/svelte-chd/front-end/scripts/sync-rates.js) (chạy qua GitHub Action cron), loại bỏ hoàn toàn quyền write/delete Sanity khỏi public HTTP routes của frontend.
- **Multi-layer Caching & Disaster Recovery**:
  - Tầng 1: In-memory cache với TTL cho Worker isolates ([`memory-cache.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/cache/memory-cache.ts)).
  - Tầng 2: Cloudflare KV Snapshot 14-ngày đảm bảo website vẫn hoạt động 100% khi Sanity bảo trì hoặc gặp sự cố ([`kv-snapshot.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/cache/kv-snapshot.ts)).

### 2. **Bảo Mật & Chống Spam Toàn Diện (Security & Anti-Spam)**
- **IP Rate Limiting**: Giới hạn 5 submissions / 10 phút / IP đối với mọi hành động gửi Contact & Booking ([`rate-limiter.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/security/rate-limiter.ts)).
- **Invisible Honeypot Protection**: Bẫy bot ngầm chống spam email và ngăn tràn webhook Discord ([`anti-spam.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/security/anti-spam.ts)).
- **Async Settled Notification**: Đảm bảo `Promise.allSettled` hoàn thành gửi Admin Email, Client Confirmation, và Discord Webhook trước khi trả response trên Edge runtime.

### 3. **Hệ Thống SEO & Rich Snippets (Structured Data)**
- Tự động tạo JSON-LD Schema.org chuẩn cho mọi trang: `TravelAgency`, `TouristTrip`, `Product`, `BreadcrumbList`.
- Tự động sinh thẻ `hreflang` 3 ngôn ngữ (`/vi/`, `/en/`, `/fr/`) cho toàn bộ Tour và Sitemap XML ([`sitemap.xml/+server.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/routes/sitemap.xml/+server.ts)).

### 4. **Centralized Logging System**
- Module [`logger.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/utils/logger.ts) chuẩn hóa các mức `INFO`, `WARN`, `ERROR`, `DEBUG`, tự động ẩn log nhạy cảm trên Production.

---

## 💻 Danh Sách Lệnh Quản Trị (Root Scripts)

Tại thư mục gốc dự án, bạn có thể thực hiện mọi tác vụ qua các lệnh sau:

| Lệnh | Mục đích |
| :--- | :--- |
| `pnpm dev` / `pnpm dev:fe` | Khởi chạy server phát triển Frontend (SvelteKit) tại `http://localhost:5173` |
| `pnpm dev:be` | Khởi chạy Sanity Studio Backend tại `http://localhost:3333` |
| `pnpm dev:all` | Chạy đồng thời cả Frontend và Backend qua `concurrently` |
| `pnpm build:all` | Build production cho cả Frontend (Cloudflare) và Backend |
| `pnpm check:all` | Chạy Type Check toàn dự án (`svelte-check` + `tsc --noEmit`) |
| `pnpm lint:all` | Kiểm tra Lint & Prettier format cho toàn bộ monorepo |
| `pnpm format:all` | Tự động định dạng code chuẩn Prettier cho toàn bộ files |
| `pnpm test` | Chạy toàn bộ Unit test suites (Vitest: form schema, formatters, rate-limiter, anti-spam, sanity) |
| `pnpm test:e2e` | Chạy Playwright End-to-End tests |
| `pnpm knip:all` | Quét Dead Code, Unused Files & Unused Exports |
| `pnpm sync:rates` | Đồng bộ tỷ giá ngoại tệ từ Exchange API vào Sanity CMS (dùng cho GitHub Action Cron) |
| `pnpm i18n` | Đồng bộ và sinh types tự động cho `typesafe-i18n` |
| `graphify update .` | Cập nhật Knowledge Graph & báo cáo phân tích kiến trúc |

---

## 📋 Quy Chuẩn Chất Lượng (Quality Gates)

Mỗi thay đổi mã nguồn phải tuân thủ nghiêm ngặt theo tài liệu [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) và đảm bảo vượt qua:
1. `pnpm format:all`
2. `pnpm lint:all`
3. `pnpm check:all`
4. `pnpm test`
5. `graphify update .`


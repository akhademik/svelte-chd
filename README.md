# 🌲 CHD Travel Monorepo

> Du lịch trải nghiệm bản địa Tây Nguyên — *Go local · See local · Eat local*

Monorepo chứa toàn bộ mã nguồn của dự án **CHD Travel**, bao gồm ứng dụng Web Frontend (SvelteKit) và hệ thống Quản trị nội dung CMS Backend (Sanity Studio v3).

---

## 🏗️ Cấu Trúc Dự Án (Project Architecture)

```
svelte-chd/
├── front-end/               # Ứng dụng Web chính (SvelteKit + Svelte 5 + TailwindCSS)
│   ├── e2e/                 # Test end-to-end (Playwright)
│   ├── src/
│   │   ├── i18n/            # Hệ thống đa ngôn ngữ typesafe-i18n (vn, en, fr)
│   │   ├── lib/             # Modules, Base UI components, Stores, Server utils
│   │   └── routes/          # SvelteKit SSR Routes theo ngôn ngữ /[lang]/
│   └── static/              # Favicon, static assets, schema icons
├── back-end/                # Sanity Content Studio v3 (React + TypeScript)
│   ├── schemas/             # Sanity Document & Object Schemas (Tours, Blog, Rates)
│   ├── components/          # Custom Sanity Studio UI Components
│   └── sanity.config.ts     # Cấu hình Sanity Studio workspace
├── graphify-out/            # Persistent Knowledge Graph & Codebase Reports
├── DEVELOPMENT_WORKFLOW.md  # Quy chuẩn phát triển & Quality Gate bắt buộc
└── LAYOUT_DESIGN_CONCEPT.md # Hệ thống Design tokens & Quy chuẩn UI/UX
```

---

## 🚀 Công Nghệ & Stack (Tech Stack)

### **Frontend (`front-end/`)**
- **Framework**: SvelteKit 2 + **Svelte 5 (Runes)** + TypeScript.
- **Deployment**: `@sveltejs/adapter-cloudflare` (Cloudflare Pages / Workers SSR).
- **Styling**: Tailwind CSS v3 với Semantic Design Tokens (rừng rêu `primary`, đất nung `secondary`, cát ấm `surface/background`).
- **i18n**: `typesafe-i18n` hỗ trợ đầy đủ 3 ngôn ngữ: Tiếng Việt (`vn`), Tiếng Anh (`en`), Tiếng Pháp (`fr`).
- **Data & CMS Client**: `@sanity/client`, `@sanity/image-url`, `@portabletext/svelte`.
- **Forms & Validation**: `sveltekit-superforms`, `zod`, `svelte-french-toast`.
- **Testing**: `vitest` (Unit tests), `@playwright/test` (E2E tests).
- **Email Service**: Resend API (`resend`).

### **Backend (`back-end/`)**
- **CMS**: Sanity Studio v3 (React 18 + TypeScript).
- **Schemas**: Quản lý Day Tours, Highland Tours, Blog Posts (`CHD Journal`), Tỷ giá ngoại tệ (`Exchange Rates`), Tags, và Category metadata.

---

## ⚙️ Cài Đặt & Khởi Chạy (Getting Started)

> **Lưu ý**: Dự án **bắt buộc sử dụng `pnpm`** (không dùng `npm` hoặc `yarn`).

### 1. Cài đặt toàn bộ dependencies
```bash
pnpm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env` tại thư mục `front-end/`:
```bash
cp front-end/.env.example front-end/.env
```
Cấu hình các biến chính:
- `VITE_SANITY_ID`: Project ID của Sanity.
- `RESEND_API_KEY`: API key gửi mail Resend.
- `NOTIFY_EMAIL`: Email quản trị nhận thông báo đặt tour (`info@chdtravel.com`).

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
| `pnpm test` | Chạy toàn bộ Unit test suites (Vitest) |
| `pnpm test:e2e` | Chạy Playwright End-to-End tests |
| `pnpm i18n` | Đồng bộ và sinh types tự động cho `typesafe-i18n` |

---

## 📋 Quy Chuẩn Chất Lượng (Quality Gates)

Mỗi thay đổi mã nguồn phải tuân thủ nghiêm ngặt theo tài liệu [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) và đảm bảo vượt qua:
1. `pnpm format:all`
2. `pnpm lint:all`
3. `pnpm check:all`
4. `pnpm test`
5. `graphify update .`

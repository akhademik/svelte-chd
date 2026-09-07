# 📋 Danh Sách Nhiệm Vụ & Kế Hoạch Triển Khai (Tasks Backlog)

> **Mục tiêu**: Tối ưu hóa trải nghiệm biên tập và SEO đa ngôn ngữ thông qua cơ chế **Virtual Derived Slugs** (Tự sinh Slug & Category URL theo từng ngôn ngữ ở Frontend, loại bỏ trường slug thủ công ở Backend).

---

## 🎯 Đề Xuất & Thiết Kế Kiến Trúc (Architectural Blueprint)

### 1. Bảng ánh xạ URL Đa ngôn ngữ (Localized Category & Tour URLs)

| Ngôn ngữ | URL Danh mục (`tourtype`) | URL Chi tiết Tour (`tourtype/slug`) |
| :--- | :--- | :--- |
| **Tiếng Việt (`vi`)** | `/vi/tour-trong-ngay`<br>`/vi/tour-tay-nguyen` | `/vi/tour-trong-ngay/kham-pha-ho-lak`<br>`/vi/tour-tay-nguyen/hanh-trinh-dai-ngan` |
| **Tiếng Anh (`en`)** | `/en/day-tours`<br>`/en/highland-tours` | `/en/day-tours/lak-lake-discovery`<br>`/en/highland-tours/misty-highlands-journey` |
| **Tiếng Pháp (`fr`)** | `/fr/excursions`<br>`/fr/hauts-plateaux` | `/fr/excursions/decouverte-du-lac-lak`<br>`/fr/hauts-plateaux/voyage-au-coeur-des-hauts-plateaux` |

---

## 📌 Hạng Mục Triển Khai Chi Tiết (Implementation Tasks)

### 🧱 Phase 1: Backend Simplification (Sanity Studio)
- [x] **Task 1.1**: Xóa bỏ hoàn toàn định nghĩa trường `tour_slug` trong [`back-end/schemas/common/type-tour.ts`](file:///home/hajtran/dev/svelte-chd/back-end/schemas/common/type-tour.ts).
- [x] **Task 1.2**: Cập nhật [`back-end/schemas/common/base-fields.ts`](file:///home/hajtran/dev/svelte-chd/back-end/schemas/common/base-fields.ts) loại bỏ `tour_slug` khỏi danh sách `BASE_FIELDS`.
- [x] **Task 1.3**: Kiểm tra lại toàn bộ Schema Sanity Backend (`pnpm check:be` & `pnpm build:be`).

---

### ⚡ Phase 2: Frontend Virtual Slug & Type Resolver Utility
- [x] **Task 2.1**: Xây dựng module tiện ích `slugify` chuẩn SEO hỗ trợ tiếng Việt có dấu, tiếng Pháp ký tự đặc biệt (Accents/Diacritics removal).
- [x] **Task 2.2**: Xây dựng bảng ánh xạ danh mục 2 chiều `TOUR_CATEGORY_MAP` giữa Canonical Category (`day-tours`, `highland-tours`) và Localized Slug (`tour-trong-ngay`, `tour-tay-nguyen`, `excursions`, `hauts-plateaux`):
  - Hàm `getCategorySlug(canonicalType, lang)` $\rightarrow$ trả về slug localized trên URL.
  - Hàm `resolveCanonicalType(urlType, lang)` $\rightarrow$ nhận diện category chuẩn từ URL (kèm fallback alias cũ).
- [x] **Task 2.3**: Xây dựng hàm `getTourVirtualSlug(tour, lang)`:
  - Tự sinh slug từ `tour.tour_name[lang]` (hoặc fallback `vi`, `en`, `fr`).
  - Hỗ trợ backward-compatibility nếu document Sanity cũ vẫn còn trường `tour_slug` hoặc `tourID`.

---

### 🌐 Phase 3: Route Handling, Direct URL Navigation & Deep-linking
- [x] **Task 3.1**: Cập nhật Category Route [`front-end/src/routes/[lang]/[tourtype]/+page.server.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/routes/[lang]/[tourtype]/+page.server.ts):
  - Nhận diện `params.tourtype` qua `resolveCanonicalType` để load đúng `TourService.getToursByType`.
- [x] **Task 3.2**: Cập nhật Tour Detail Route [`front-end/src/routes/[lang]/[tourtype]/[slug]/+page.server.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/routes/[lang]/[tourtype]/[slug]/+page.server.ts):
  - Cập nhật [`TourService.getTourBySlug`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/server/services/tour.service.ts) để tìm tour khớp với `slug` trên URL (so sánh virtual slug của từng tour trong category).
  - Đảm bảo khi người dùng gõ trực tiếp URL bất kỳ ngôn ngữ nào đều trả về đúng Tour (200 OK).
- [x] **Task 3.3**: Cập nhật các liên kết và Navigation:
  - [`TourCard.svelte`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/modules/tour-page/tour-card.svelte)
  - [`BaseTourDetailModal.svelte`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/base/base-tour-detail-modal.svelte)
  - [`BaseNavbar.svelte`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/base) / Menu navigation
  - [`sitemap.xml/+server.ts`](file:///home/hajtran/dev/svelte-chd/front-end/src/routes/sitemap.xml/+server.ts) & JSON-LD Breadcrumbs
- [x] **Task 3.4**: Cập nhật bộ chuyển ngôn ngữ [`BaseLocaleSwitcher.svelte`](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/base/base-locale-switcher.svelte) để khi đổi ngôn ngữ trên trang chi tiết tour, URL tự động dịch cả `tourtype` và `slug` sang ngôn ngữ mới.

---

### 🧪 Phase 4: Verification & Quality Gates
- [x] **Task 4.1**: Viết Unit Tests đầy đủ cho:
  - Slugify utility (tiếng Việt, tiếng Anh, tiếng Pháp).
  - Category resolver & Fallback aliases.
  - Virtual slug matching & Language switching.
- [x] **Task 4.2**: Chạy toàn bộ bộ kiểm tra chất lượng monorepo:
  - `pnpm format:all`
  - `pnpm lint:all`
  - `pnpm check:all`
  - `pnpm test`
  - `pnpm knip:all`
  - `graphify update .`

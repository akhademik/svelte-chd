# 📋 BẢNG THEO DÕI NHIỆM VỤ (TASKS TRACKER)

> **Dự án**: `svelte-chd` (Frontend: SvelteKit + TailwindCSS; Backend: Sanity Studio v3)  
> **Quy chuẩn chất lượng**: Tuân thủ [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md) & [TEST_WORKFLOW.md](TEST_WORKFLOW.md)  
> **Kiến trúc & Đồ thị tri thức**: [GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md)

---

## 🎯 QUY TRÌNH THỰC THI CHUẨN CHO TỪNG TASK (QUALITY GATES)

Mỗi khi triển khai một task, cần thực hiện trọn vẹn chu trình:
1. **Chỉnh sửa code tập trung**: Thực hiện dứt điểm, đúng ngữ cảnh TypeScript/Svelte 5 runes.
2. **Kiểm tra chất lượng (Quality Gates)**:
   - Frontend: `cd front-end && pnpm lint && pnpm check && pnpm format`
   - Backend: `cd back-end && pnpm eslint . && pnpm tsc --noEmit && pnpm prettier --write .`
   - Dead code: `pnpm knip`
   - Test: `pnpm test` (khi có test suite)
3. **Cập nhật Knowledge Graph**: Chạy `/graphify` tại thư mục gốc.
4. **Báo cáo & Đợi User xác nhận** trước khi đề xuất Git Commit.

---

## 🔴 NHÓM 1: CẢI THIỆN KIẾN TRÚC & SEO (Ưu tiên cao nhất)

### 1.1. Chuyển đổi Fetching Tour sang SSR & Khắc phục Client-only Render
- [x] **1.1.1. SSR cho Trang chủ (`routes/[lang]/+page.server.ts`)**
  - Chuyển logic query Sanity tour nổi bật / bài viết vào `load()` server.
  - Loại bỏ wrapper `{#if loaded}` và `BaseLoading` full-page không cần thiết.
- [x] **1.1.2. SSR cho Trang Danh Sách Tour (`routes/[lang]/[tourtype]/+page.server.ts`)**
  - Chuyển fetch tour theo category sang `load()` server.
  - Bỏ fetch trong `onMount`/`$effect` ở client.
- [x] **1.1.3. SSR & Query tối ưu cho Trang Chi Tiết Tour (`routes/[lang]/[tourtype]/[slug]/+page.server.ts`)**
  - Thay đổi GROQ query: Chỉ truy vấn đúng 1 tour theo `slug` hiện tại thay vì tải toàn bộ danh sách tour rồi lọc ở client.
  - Xử lý trả về dữ liệu chuẩn qua `PageData`.

### 1.2. Nâng cấp Hệ Thống SEO & Meta Tags
- [x] **1.2.1. Đưa SEO Tags về Server-rendered**
  - Thay vì chỉ cập nhật qua writable store `seo-store.ts` ở `$effect` (chỉ chạy client), đưa `title`, `description`, `og:image`, `og:title` vào `PageData` từ `load()`.
  - Render thẻ `<svelte:head>` trực tiếp từ SSR để Googlebot / Facebook / Zalo crawler đọc được đầy đủ meta.
- [x] **1.2.2. Sửa lỗi hard-code Year & Cấu hình SEO mặc định**
  - Xoá chuỗi hard-code `" - 2023"` trong `seo-store.ts`, cập nhật năm động hoặc chuẩn hoá theo thương hiệu CHD Travel.
- [x] **1.2.3. Tạo Dynamic `sitemap.xml` & `robots.txt`**
  - Tạo route endpoint `routes/sitemap.xml/+server.ts` tự động query danh sách tour/blog từ Sanity để sinh XML sitemap.
  - Thêm `routes/robots.txt/+server.ts` trỏ đúng sitemap URL.
- [x] **1.2.4. Tích hợp Structured Data (JSON-LD)**
  - Bổ sung schema `TouristTrip` / `Product` cho trang chi tiết tour giúp Google hiển thị rich snippet (giá, hành trình, rating).

---

## 🟡 NHÓM 2: CODE QUALITY, TYPE SAFETY & SECURITY

### 2.1. Đồng bộ Cú pháp Svelte 5 Runes & Loại bỏ Flash of Loading
- [ ] **2.1.1. Refactor Contact Page (`contact-page.svelte`)**
  - Chuyển đổi từ cú pháp Svelte 4 (`export let data`) sang Svelte 5 runes (`let { data }: Props = $props()`).
  - Gỡ bỏ `{#if loaded}` sau `onMount` gây chớp trắng (CLS) vì dữ liệu form đã có sẵn từ SSR `load()`.
- [x] **2.1.2. Dọn dẹp Cache thủ công trong `sanity.ts`**
  - Gỡ bỏ cơ chế `localStorage` cache (24h TTL) phức tạp hóa; chuyển sang Cloudflare Edge Cache (`s-maxage`, `stale-while-revalidate`) và In-Memory Isolate Cache.

### 2.2. Type Safety & TypeScript Strictness
- [ ] **2.2.1. Định nghĩa Type chuẩn cho Props & PageData**
  - Rà soát và thay thế toàn bộ `Props { data?: any }` / `data: any` bằng các interface/type TypeScript rõ ràng (sử dụng `./$types`).

### 2.3. Bảo mật & Cấu hình Email (Resend & Environment)
- [ ] **2.3.1. Chuyển Fallback Email vào Biến Môi Trường**
  - Loại bỏ email cá nhân hard-coded (`hajtran@gmail.com`) trong mã nguồn; đưa vào `.env` (`ADMIN_NOTIFICATION_EMAIL` / `FALLBACK_EMAIL`).
- [ ] **2.3.2. Cấu hình Domain gửi Email Production**
  - Chuyển `from: onboarding@resend.dev` sang domain chính thức (ví dụ: `noreply@chd.travel` hoặc theo biến môi trường `RESEND_FROM_EMAIL`).

---

## 🔵 NHÓM 3: TÍNH NĂNG MỞ RỘNG (FEATURES & UX)

### 3.1. Trải nghiệm Đặt Tour & Form Liên Hệ
- [ ] **3.1.1. Email Tự Động Xác Nhận (Auto-reply cho khách)**
  - Gửi email xác nhận tự động tới khách hàng sau khi gửi form đặt tour/liên hệ thành công (bên cạnh email/Discord thông báo cho admin).
- [ ] **3.1.2. URL & Routing Trang Chi Tiết Tour Độc Lập**
  - Nâng cấp trải nghiệm từ fullscreen modal sang route trang độc lập chuẩn `/[lang]/[tourtype]/[slug]` có thể chia sẻ link trực tiếp và tối ưu SEO.

### 3.2. Tìm kiếm, Lọc & Tỷ Giá Tiền Tệ
- [ ] **3.2.1. Bộ lọc & Tìm kiếm Tour**
  - Xây dựng thanh tìm kiếm và bộ lọc theo giá, thời lượng, địa điểm tại trang danh sách tour.
- [ ] **3.2.2. Hoàn thiện / Dọn dẹp Switcher Tỷ Giá Hối Đoái**
  - Đánh giá store `exchange-rates-store`: Hoặc hoàn thiện UI currency switcher cho khách quốc tế, hoặc dọn dẹp code dư thừa nếu không dùng.

---

## 🟢 NHÓM 4: DỌN DẸP & TÀI LIỆU DỰ ÁN

- [ ] **4.1. Cập nhật `README.md` Front-end**
  - Viết lại `front-end/README.md` đúng thông tin dự án CHD Travel (thay thế boilerplate cũ).
- [ ] **4.2. Xoá/Lưu trữ `job-need-do.md`**
  - Nội dung padding mobile Contact đã được fix; toàn bộ nhiệm vụ đã được chuyển thành bảng `tasks.md` này để quản lý.

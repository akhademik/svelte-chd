# 📋 BẢNG THEO DÕI NHIỆM VỤ (TASKS TRACKER)

> **Dự án**: `svelte-chd` (Frontend: SvelteKit + TailwindCSS; Backend: Sanity Studio v3)  
> **Quy chuẩn chất lượng**: Tuân thủ [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)  
> **Quy chuẩn thiết kế UI/UX**: Tuân thủ [LAYOUT_DESIGN_CONCEPT.md](LAYOUT_DESIGN_CONCEPT.md)  
> **Kiến trúc & Đồ thị tri thức**: [GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md)

---

## 🎯 QUY TRÌNH THỰC THI CHUẨN CHO TỪNG TASK (QUALITY GATES)

Mỗi khi triển khai một task, cần thực hiện trọn vẹn chu trình theo [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md):
1. **Chỉnh sửa code tập trung**: Thực hiện dứt điểm, đúng ngữ cảnh TypeScript/Svelte 5 runes (`$props()`, `$state()`, `$derived()`).
2. **Kiểm tra chất lượng (Quality Gates)**:
   - Frontend: `cd front-end && pnpm lint && pnpm check && pnpm format`
   - Backend: `cd back-end && pnpm eslint . && pnpm tsc --noEmit && pnpm prettier --write .`
   - Dead code: `pnpm knip`
   - Test: `pnpm test` (khi có test suite)
3. **Cập nhật Knowledge Graph**: Chạy `/graphify` tại thư mục gốc.
4. **Báo cáo & Đợi User xác nhận** trước khi đề xuất Git Commit.

---

## 🔴 NHÓM 1: CẢI THIỆN SEO & SSR (ƯU TIÊN KHẨN CẤP)

### 1.1. Khắc phục `<title>` & `<meta description>` không hiển thị trong SSR
- [x] **1.1.1. Sửa cơ chế SEO Tags cho Trang Chi Tiết Tour (`routes/[lang]/[tourtype]/[slug]/+page.svelte`)**
  - Đã nâng cấp `BaseSeo` nhận props trực tiếp từ SSR `data` (title, ogImage).
  - Loại bỏ `$effect` gọi `set_seo`, đảm bảo `<title>` & `<meta>` được render trực tiếp trong HTML gốc SSR.
- [x] **1.1.2. Sửa cơ chế SEO Tags cho Trang Chi Tiết Blog (`routes/[lang]/blog/[slug]/+page.svelte`)**
  - Đã tích hợp `BaseSeo` với props `title`, `description` (excerpt), `ogImage` (primaryCoverUrl), `ogType="article"`.
  - Loại bỏ `$effect` gọi `set_seo`.

### 1.2. Sửa lỗi sinh URL Blog trong `sitemap.xml`
- [x] **1.2.1. Cập nhật URL Blog Route trong `routes/sitemap.xml/+server.ts`**
  - Đã sửa URL sinh ra cho blog từ `${siteUrl}/${lang}/blog#${slug}` thành `${siteUrl}/${lang}/blog/${slug}` khớp 100% với route SSR độc lập.

---

## 🟡 NHÓM 2: CẤU HÌNH HỆ THỐNG & GỬI EMAIL PRODUCTION (GHI NHẬN THÊM)

### 2.1. Cấu hình Domain gửi Email Resend
- [ ] **2.1.1. Chuẩn bị & Cập nhật Sender Domain trong `front-end/src/lib/server/email.ts`**
  - **Hiện trạng**: Đang dùng sender mặc định `from: 'onboarding@resend.dev'`.
  - **Kế hoạch**: Cấu hình và xác thực domain chính thức (`chdtravel.com`) trước khi deploy production để tránh email rơi vào hòm thư spam.

---

## 🟢 NHÓM 3: KIỂM THỬ, ĐỒ THỊ TRI THỨC & DỌN DẸP

- [x] **3.1. Chạy toàn bộ Quality Gates sau khi hoàn thiện**
  - Frontend: `pnpm lint`, `pnpm check`, `pnpm format`, `pnpm build` (đều pass 0 error/warning).
  - Backend: `eslint`, `tsc --noEmit` pass.
- [x] **3.2. Cập nhật Knowledge Graph**
  - Đã chạy `/graphify` tái tạo [GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md) và `graph.json` (571 nodes, 867 edges).
- [ ] **3.3. Dọn dẹp tệp `job-need-do.md`**
  - Xóa hoặc lưu trữ `job-need-do.md` sau khi toàn bộ task đã hoàn thành và nghiệm thu.

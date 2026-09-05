# 📋 BẢNG THEO DÕI NHIỆM VỤ (TASKS TRACKER)

> **Dự án**: `svelte-chd` (Frontend: SvelteKit + TailwindCSS; Backend: Sanity Studio v3)  
> **Quy chuẩn chất lượng**: Tuân thủ [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md) & [LAYOUT_DESIGN_CONCEPT.md](LAYOUT_DESIGN_CONCEPT.md)  
> **Kiến trúc & Đồ thị tri thức**: [GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md)

---

## 🎯 QUY TRÌNH THỰC THI CHUẨN CHO TỪNG TASK (QUALITY GATES)

Mỗi khi triển khai một task, cần thực hiện trọn vẹn chu trình:
1. **Chỉnh sửa code tập trung**: Thực hiện dứt điểm, đúng ngữ cảnh TypeScript / Svelte 5 runes.
2. **Kiểm tra chất lượng (Quality Gates)**:
   - Frontend: `cd front-end && pnpm lint && pnpm check && pnpm format`
   - Backend: `cd back-end && pnpm eslint . && pnpm tsc --noEmit && pnpm prettier --write .`
   - Test: `pnpm test` (khi đã cấu hình bộ test)
   - Dead code: `pnpm knip`
3. **Cập nhật Knowledge Graph**: Chạy `/graphify` tại thư mục gốc.
4. **Báo cáo & Đợi User xác nhận** trước khi đề xuất Git Commit.

---

## 🔴 NHÓM 1: THIẾT LẬP BỘ KIỂM THỬ TỰ ĐỘNG & E2E TESTING (ƯU TIÊN CAO NHẤT)

> Mục tiêu: Bảo vệ các luồng "ra tiền" (Booking, Contact, Điều hướng) tránh mất khách hàng và lỗi âm thầm.

### 1.1. Cấu hình Hạ tầng Test cho Dự án (Vitest & Playwright)
- [ ] **1.1.1. Cài đặt & Cấu hình Vitest cho Frontend**
  - Cài đặt `vitest` và `@testing-library/svelte`.
  - Thêm script `"test:unit": "vitest run"` vào `front-end/package.json` và root `package.json`.
- [ ] **1.1.2. Cài đặt & Cấu hình Playwright cho E2E Testing**
  - Cài đặt `@playwright/test` và thiết lập `playwright.config.ts`.
  - Thêm script `"test:e2e": "playwright test"` vào `front-end/package.json` và root `package.json`.
  - Thiết lập command `pnpm test` chạy tổng hợp unit & e2e test.

### 1.2. Viết E2E Test cho Luồng Nghiệp Vụ Trọng Yếu (Playwright)
- [ ] **1.2.1. Test Luồng Gửi Form Liên Hệ (Contact Form E2E)**
  - Kiểm tra nhập dữ liệu form liên hệ (`/vn/contact`, `/en/contact`, `/fr/contact`).
  - Submit form → Mock/Xác nhận API trả về thành công → Hiển thị thông báo Toast/Success message.
- [ ] **1.2.2. Test Luồng Đặt Tour (Booking Modal E2E)**
  - Mở modal đặt tour từ trang chi tiết hoặc thẻ tour.
  - Điền thông tin đặt tour → Gửi yêu cầu → Xác nhận API `/api/booking` nhận và xử lý thành công.
- [ ] **1.2.3. Test Hiển Thị Dữ Liệu Trang Chi Tiết Tour & Blog (SSR E2E)**
  - Truy cập trực tiếp URL tour chi tiết (`/[lang]/[tourtype]/[slug]`) và bài viết blog (`/[lang]/blog/[slug]`).
  - Xác thực đúng tên, giá, hình ảnh, thẻ `<title>`, `<meta description>`, JSON-LD schema được render chuẩn.
- [ ] **1.2.4. Test Chuyển Đổi Đa Ngôn Ngữ (i18n Switcher E2E)**
  - Chuyển đổi qua lại giữa VN, EN, FR.
  - Xác nhận URL thay đổi đúng tiền tố ngôn ngữ và toàn bộ nhãn/nội dung được dịch chính xác.

---

## 🟡 NHÓM 2: UNIT TEST LOGIC XỬ LÝ DỮ LIỆU & RỦI RO (VITEST)

> Mục tiêu: Ngăn chặn lỗi xử lý ngầm trong logic tính toán, chuyển đổi tiền tệ và fallback schema.

### 2.1. Unit Test Logic Fallback & Schema Data
- [ ] **2.1.1. Unit Test Hàm Trích Xuất & Fallback Slug (`sanity-client.ts`, `sitemap.xml`)**
  - Test các trường hợp `tour_slug` đa tầng (`tour_slug.current`, `tour_slug[lang].current`, `tourSlug`, string raw).
  - Đảm bảo không bao giờ bị `undefined` hoặc sinh sai URL khi cấu trúc Sanity thay đổi.
- [ ] **2.1.2. Unit Test Form Validation (`form-schema.ts`)**
  - Test validation Zod: chặn các trường hợp email sai cú pháp, số điện thoại không hợp lệ, tên rỗng, v.v.
- [ ] **2.1.3. Unit Test Logic Tỷ Giá & Định Dạng Giá Tiền (`exchange-rates-store.ts`, `format-data.ts`)**
  - Test chuyển đổi tiền tệ VND ↔ USD ↔ EUR và hàm rút gọn hiển thị giá tour (tránh sai giá cho khách).

---

## 🟢 NHÓM 3: ĐO LƯỜNG LIGHTHOUSE, CORE WEB VITALS & CI AUTOMATION

> Mục tiêu: Tự động hóa kiểm soát hiệu năng (LCP, INP, CLS) và chất lượng SEO trên từng commit.

### 3.1. Thiết Lập Đo Lường & Giám Sát Tự Động
- [ ] **3.1.1. Chạy Đo Lường & Tối Ưu Core Web Vitals Thực Tế (Lighthouse)**
  - Đo lường chỉ số LCP (< 2.5s), INP (< 200ms), CLS (< 0.1) trên Mobile & Desktop cho các trang chính (Home, Tour Details, Blog Details, Contact).
  - Khắc phục các điểm trừ về Accessibility (alt ảnh, contrast ratio, aria labels) và Best Practices nếu có.
- [ ] **3.1.2. Tích Hợp Lighthouse CI (GitHub Actions)**
  - Thêm workflow `.github/workflows/lighthouse.yml` tự động audit hiệu năng mỗi khi tạo Pull Request hoặc Push lên branch `svelte`/`main`.

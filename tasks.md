# 📋 Danh Sách Nhiệm Vụ & Kế Hoạch Triển Khai (Tasks Backlog)

> **Mục tiêu**: Hoàn thiện toàn bộ các vấn đề kiến trúc, SEO, logic và dọn dẹp hệ thống được nêu trong `jobs.md`:
> 1. Đánh giá & xử lý tính ổn định SEO cho Virtual Derived Slugs (hỗ trợ định danh ổn định qua `tourID`).
> 2. Refactor `TourService.getTourBySlug()` để loại bỏ logic trùng lặp và tối ưu hóa lookup.
> 3. Xử lý triệt để suy luận Category trong Modal (`BaseTourDetailModal.svelte` & `HomeFeaturedSlider.svelte`).
> 4. Rà soát & dọn dẹp triệt để `locale_slug` trong backend Sanity (chuyển Blog sang tự động slug nếu cần, hoặc dọn schema).
> 5. Đánh giá `tour_tags` trong Backend & Frontend.
> 6. Xác nhận & dọn dẹp triệt để Legacy API (`/api/tours` đã được dọn sang cron script `scripts/sync-rates.js`).

---

## 🎯 Đánh Giá & Phân Tích Kỹ Thuật (Architectural Analysis)

### 1. Vấn đề SEO URL & Virtual Slug (`tourID` Stable Identity)
- **Hiện trạng**: URL hiện tại là `/[lang]/[tourtype]/[slug]` trong đó `slug` được sinh từ `tour_name[lang]`. Nếu biên tập viên đổi tên tour trong Sanity, URL sẽ đổi theo và URL cũ sẽ trả về 404 nếu không còn khớp.
- **Giải pháp**: 
  - `TourService.getTourBySlug` hỗ trợ lookup theo `tour_id` và tiền tố `{tour_id}-{slug}`.
  - Khi người dùng hoặc crawler truy cập link có `tour_id` hoặc URL cũ có chứa mã tour (hoặc khi đổi title tour), hệ thống vẫn resolve chính xác tour (HTTP 200) mà không bị chết link.

### 2. Tối ưu `TourService.getTourBySlug()` & DRY Matching
- **Hiện trạng**: Vòng lặp `find` bị lặp lại code 2 lần (trong category và cross-category) với 7 điều kiện slug/name/id.
- **Giải pháp**:
  - Trích xuất helper function `matchesTourSlug(tour: Tour, targetSlug: string): boolean`.
  - Hỗ trợ match qua:
    - Virtual slug từng ngôn ngữ (`vi`, `en`, `fr`).
    - Raw name slugified từng ngôn ngữ.
    - `tour_id` (ví dụ `CHD-DT-01` hoặc `chd-dt-01`).
    - Prefix `tour_id` từ slug dạng `chd-001-kham-pha-ho-lak` hoặc `chd-dt-01`.

### 3. Sửa Logic Phán Đoán Category Trong Modal & Sliders
- **Hiện trạng**: `base-tour-detail-modal.svelte` và `home-featured-slider.svelte` dùng biểu thức kiểm tra chuỗi duration (`includes('day') === false || includes('ngày') === false`) với toán tử `||` dễ gây sai lệch khi thiếu locale.
- **Giải pháp**:
  - Bỏ hoàn toàn việc đoán category dựa vào chuỗi duration.
  - Phân loại trực tiếp dựa vào `tour._type === 'tourCentral' ? 'highland-tours' : 'day-tours'` kết hợp `resolve_canonical_category($page.params.tourtype)`.

### 4. Đánh Giá `tour_tags` Trong Hệ Thống
- **Đánh giá**:
  - `tour_tags` hiện đang được định nghĩa trong Sanity (`category/tour-tags.ts`), được tham chiếu trong `tourDaily` / `tourCentral` qua `tour_tags_ref`, và được render dạng hashtag trên giao diện chi tiết tour (`tour-details.svelte` và `base-tour-detail-modal.svelte`).
  - **Kết luận**: `tour_tags` là tính năng hiển thị hashtag hữu ích trên UI cho tour. Ta giữ lại phần hiển thị và schema, đồng thời đảm bảo schema gọn gàng và không phụ thuộc vào `slug`.

### 5. Đánh Giá & Dọn Dẹp Slug Còn Lại Trong Backend (`locale_slug`)
- **Đánh giá**:
  - File `back-end/schemas/common/type-locale.ts` vẫn còn định nghĩa `locale_slug` và được dùng ở `blogPost.ts` (`slug`).
  - Blog post có thể bỏ trường `slug` nhập tay để Frontend tự động sinh slug từ blog `title` tương tự Tour:
    - Chuyển `blogPost.ts` sang bỏ trường `slug`.
    - Cập nhật `BlogService` và `get_blog_slug()` tương tự `get_tour_slug()`.
    - Xóa bỏ hoàn toàn `locale_slug` khỏi `back-end/schemas/common/type-locale.ts` và `back-end/schemas/index.ts`.

### 6. Đánh Giá Legacy `/api/tours` & Cron Job Tỷ Giá
- **Đánh giá**: 
  - Route `/api/tours` đã được loại bỏ hoàn toàn.
  - Toàn bộ logic cập nhật tỷ giá Sanity bằng Token Write đã được tách thành script độc lập [scripts/sync-rates.js](file:///home/hajtran/dev/svelte-chd/front-end/scripts/sync-rates.js) kích hoạt qua lệnh `pnpm sync:rates` (hoặc GitHub Actions cron).
  - Kiến trúc hiện tại đã an toàn 100%, không còn lỗ hổng write capability trên public GET endpoint.

---

## 📌 Hạng Mục Triển Khai Chi Tiết (Implementation Tasks)

### 🧱 Phase 1: Clean Backend Schemas & Remove All Unnecessary Slugs
- [x] **Task 1.1**: Xóa bỏ hoàn toàn `locale_slug` khỏi `back-end/schemas/common/type-locale.ts` và `back-end/schemas/index.ts`.
- [x] **Task 1.2**: Cập nhật `back-end/schemas/category/blog-post.ts` (loại bỏ trường slug, đồng bộ sang virtual slug cho bài viết blog).
- [x] **Task 1.3**: Rà soát schema `tour_tags` trong `back-end/schemas/category/tour-tags.ts` để tối ưu cấu trúc lưu trữ gọn nhẹ.
- [x] **Task 1.4**: Chạy kiểm tra schema backend (`pnpm check:be` & `pnpm build:be`).

---

### ⚡ Phase 2: Refactor TourService & Modal Logic
- [x] **Task 2.1**: Refactor `front-end/src/lib/server/services/tour.service.ts`:
  - Trích xuất hàm `matchesTourSlug(tour: Tour, targetSlug: string): boolean`.
  - Hỗ trợ match theo virtual slug, name slugify, `tour_id`, và hybrid slug `{tour_id}-{slug}` (ví dụ `dl-01-kham-pha-ho-lak-1-ngay` hoặc `hl-02-con-duong-xanh`).
- [x] **Task 2.2**: Sửa logic phân loại `canonicalCategory` trong `front-end/src/lib/base/base-tour-detail-modal.svelte` & `front-end/src/lib/modules/home-page/components/home-featured-slider.svelte` (dựa trên `_type` và `resolve_canonical_category`, không parse chuỗi `tour_duration`).
- [x] **Task 2.3**: Cập nhật `BlogService` & Blog routes để đồng bộ cơ chế virtual derived slug cho Blog Post.

---

### 🧪 Phase 3: Verification & Quality Gates
- [x] **Task 3.1**: Bổ sung Unit Tests trong `sanity.test.ts` & `format-data.test.ts` kiểm tra:
  - Match tour theo hybrid `tour_id-slug` và `tour_id`.
  - Phân loại `canonicalCategory` không phụ thuộc duration string.
- [x] **Task 3.2**: Chạy toàn bộ bộ kiểm tra chất lượng monorepo:
  - `pnpm format:all`
  - `pnpm lint:all`
  - `pnpm check:all`
  - `pnpm test`
  - `pnpm knip:all`
  - `graphify update .`

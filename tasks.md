# 📋 BẢNG CÔNG VIỆC CẦN THỰC HIỆN (TASKS & ROADMAP)

> **Tài liệu theo dõi tiến độ công việc** được tổng hợp từ [job-need-do.md](file:///home/hajtran/dev/svelte-chd/job-need-do.md), đối chiếu với [DEVELOPMENT_WORKFLOW.md](file:///home/hajtran/dev/svelte-chd/DEVELOPMENT_WORKFLOW.md), [LAYOUT_DESIGN_CONCEPT.md](file:///home/hajtran/dev/svelte-chd/LAYOUT_DESIGN_CONCEPT.md), [TEST_WORKFLOW.md](file:///home/hajtran/dev/svelte-chd/TEST_WORKFLOW.md), và [GRAPH_REPORT.md](file:///home/hajtran/dev/svelte-chd/graphify-out/GRAPH_REPORT.md).

---

## 🎯 Tổng quan các hạng mục (Summary of Epics)

| Epic ID | Tên Hạng Mục | Mức Độ Ưu Tiên | Trạng Thái |
| :--- | :--- | :--- | :--- |
| **EPIC-1** | Plan Your Trip / Tour Enquiry Integration | 🔴 P0 (Cao nhất / High ROI) | ✅ Hoàn thành (Done) |
| **EPIC-2** | Tái Cấu Trúc Thứ Tự Section Trang Chủ (Homepage Flow) | 🟠 P1 (Quan trọng) | ⏳ Sẵn sàng thực hiện (To Do) |
| **EPIC-3** | Nâng Cấp Content & Brand Positioning "Why CHD" | 🟠 P1 (Quan trọng) | ⏳ Sẵn sàng thực hiện (To Do) |
| **EPIC-4** | Chuẩn Hóa Kiến Trúc Dữ Liệu Testimonials | 🟡 P2 (Trung bình) | ⏳ Sẵn sàng thực hiện (To Do) |
| **EPIC-5** | Cải Thiện Trợ Năng (Accessibility) & Reduced Motion cho Testimonials | 🟡 P2 (Trung bình) | ⏳ Sẵn sàng thực hiện (To Do) |
| **EPIC-6** | Tinh Chỉnh Xử Lý Email & Discord Notifications (Backend Server) | 🟢 P3 (Dọn dẹp mã) | ⏳ Sẵn sàng thực hiện (To Do) |
| **EPIC-7** | Kiểm Thử Trải Nghiệm Thực Tế Trên Mobile (Mobile View & UX) | 🟠 P1 (Quan trọng) | ⏳ Sẵn sàng thực hiện (To Do) |
| **EPIC-8** | Đóng Băng & Giản Lược Hiệu Ứng (Animation Freeze) | 🟢 P3 (Bảo trì) | ⏳ Sẵn sàng thực hiện (To Do) |

---

## 📝 Chi tiết Danh sách Công việc (Detailed Task Breakdown)

### 🔴 EPIC-1: "Plan Your Trip" - Tour Enquiry Integration (Ưu tiên #1)
- [x] **TASK-1.1**: Cập nhật modal/CTA tại trang chi tiết tour ([BaseTourDetailModal](file:///home/hajtran/dev/svelte-chd/front-end/src/lib/components/common/base-tour-detail-modal.svelte)): Đổi từ nút chung chung `[ Book / Enquire ]` sang `[ PLAN THIS TRIP ]`.
- [x] **TASK-1.2**: Tích hợp truyền `selectedTour` (slug / tên tour / id) vào form liên hệ / modal đặt tour.
- [x] **TASK-1.3**: Tinh chỉnh UI form enquiry:
  - Trường quan tâm: `I'm interested in: [ Tên Tour được chọn ]` (pre-filled).
  - Thời gian dự kiến: `When are you travelling?`
  - Số lượng người: `How many people?`
  - Ghi chú: `Anything you'd like us to know?`
  - Nút gửi: `[ Send enquiry ]`.
- [x] **TASK-1.4**: Cập nhật typesafe-i18n cho các nhãn form mới trong `t-contact.ts` / `t-tour.ts` (VN, EN, FR) theo quy chuẩn [LAYOUT_DESIGN_CONCEPT.md](file:///home/hajtran/dev/svelte-chd/LAYOUT_DESIGN_CONCEPT.md).

---

### 🟠 EPIC-2: Tái cấu trúc Luồng Trang Chủ (Homepage Flow Reordering)
- [ ] **TASK-2.1**: Tái cấu trúc thứ tự các section trong trang chủ ([+page.svelte](file:///home/hajtran/dev/svelte-chd/front-end/src/routes/[lang]/+page.svelte)) theo conversion flow tự nhiên:
  1. `HERO`: Slogan *"Go local. See local. Eat local."* + CTA `[ Explore tours ]`
  2. `WHY CHD`: Điểm nhấn định vị thương hiệu *"Go local / See local / Eat local"*
  3. `FEATURED EXPERIENCES`: Trải nghiệm nổi bật (Coffee / Food / People / Nature)
  4. `DAY TOURS`: Danh sách 3–4 day tours tiêu biểu
  5. `MULTI-DAY TOURS` (Highland Tours): Danh sách 2–3 highland tours
  6. `TRAVELER STORIES` (Testimonials): Dời xuống sau danh sách tour (chứng thực sau khi khách đã thấy sản phẩm)
  7. `CHD JOURNAL` (Blog / Stories): Bài viết chia sẻ văn hóa, ẩm thực, con người
  8. `PLAN YOUR TRIP` (CTA Section): Mời gọi thiết kế tour riêng *"Tell us what you want to experience"*
  9. `FOOTER`

---

### 🟠 EPIC-3: Nâng cấp Content & Brand Positioning "Why CHD"
- [ ] **TASK-3.1**: Cập nhật lại nội dung section "Why CHD" theo triết lý thương hiệu, tránh cảm giác corporate values:
  - **Tagline chính**: *"We don't take you to the Highlands. We take you into it."*
  - **01 GO LOCAL**: *"Meet the people who call this place home."*
  - **02 SEE LOCAL**: *"Go beyond the places listed in guidebooks."*
  - **03 EAT LOCAL**: *"Taste what people here actually eat."*
  - **04 TRAVEL SLOW**: *"Small groups. More time. Less rushing."*
- [ ] **TASK-3.2**: Bổ sung và đồng bộ các chuỗi dịch đa ngôn ngữ tương ứng trong i18n (`t-home.ts` cho `vn`, `en`, `fr`).
- [ ] **TASK-3.3**: Đảm bảo giữ vững phong cách Editorial Layout: Typography serif `font-serif`, màu `sand / moss / terracotta`, giữ cấu trúc đánh số `01 / 02 / 03 / 04`.

---

### 🟡 EPIC-4: Chuẩn hóa Kiến trúc Dữ liệu Testimonials
- [ ] **TASK-4.1**: Duy trì nạp dữ liệu Testimonials mặc định an toàn tại Server Load (`+page.server.ts`), tránh phụ thuộc cứng hoặc lỗi fetch khi không qua Sanity.
- [ ] **TASK-4.2**: Đảm bảo cấu trúc data schema cho Testimonial rõ ràng, hỗ trợ mở rộng thêm trường đa ngôn ngữ (VN/EN/FR).

---

### 🟡 EPIC-5: Trợ Năng (Accessibility) & Reduced Motion cho Testimonials Carousel
- [ ] **TASK-5.1**: Bổ sung `aria-live="polite"` / `aria-roledescription="carousel"` phù hợp cho Testimonial Carousel.
- [ ] **TASK-5.2**: Bổ sung tương tác bàn phím (Keyboard navigation: ArrowLeft, ArrowRight).
- [ ] **TASK-5.3**: Tạm dừng (Pause) auto-rotation khi focus hoặc hover chuột vào slider container.
- [ ] **TASK-5.4**: Hỗ trợ CSS media query `@media (prefers-reduced-motion: reduce)`: Vô hiệu hóa auto-play và các transition trượt mạnh đối với người dùng chọn reduced-motion.
- [ ] **TASK-5.5**: Đảm bảo các dot navigation có nhãn accessible (`aria-label`, `aria-current`).

---

### 🟢 EPIC-6: Tinh chỉnh Backend Server Actions (Email & Discord Delivery)
- [ ] **TASK-6.1**: Tinh chỉnh logic xử lý phản hồi trong `[lang]/+page.server.ts`:
  - Phân định rõ **Primary Delivery** (Email gửi về CHD admin) vs **Secondary Delivery** (Email confirmation gửi khách + Discord webhook notification).
  - Nếu Primary Email gửi thành công -> Xem form submission là `success`.
  - Nếu Secondary (khách xác nhận / Discord) thất bại -> Ghi log lỗi riêng (console error / structured log) mà không chặn kết quả báo thành công cho người dùng.

---

### 🟠 EPIC-7: Mobile UX & Responsive Polish
- [ ] **TASK-7.1**: Kiểm tra Hero Section trên màn hình di động: Tránh để hình ảnh và typography quá lớn chiếm tràn màn hình gây cản trở scroll xem nội dung.
- [ ] **TASK-7.2**: Kiểm tra và tối ưu touch/swipe gesture mượt mà cho Testimonials Carousel trên thiết bị di động.
- [ ] **TASK-7.3**: Đảm bảo toàn bộ wrapper tuân thủ đúng quy chuẩn padding `mx-auto max-w-6xl px-6 py-12` (theo [LAYOUT_DESIGN_CONCEPT.md](file:///home/hajtran/dev/svelte-chd/LAYOUT_DESIGN_CONCEPT.md)), không để phần tử dính sát mép trên mobile.

---

### 🟢 EPIC-8: Animation Freeze & Giản Lược Visual
- [ ] **TASK-8.1**: Đóng băng (Freeze) animation: Tuyệt đối không bổ sung các hiệu ứng phức tạp (parallax, scroll reveal dồn dập, text splitting, cursor effects).
- [ ] **TASK-8.2**: Giữ nguyên nhịp điệu tĩnh lặng, mộc mạc và nhẹ nhàng (*"quiet / slow / natural"*) phù hợp với nhận diện CHD Travel.

---

## 🔒 Quy trình Kiểm tra Chất lượng Bắt Buộc (Quality Gate Checklist)

Trước khi bàn giao hoặc hoàn tất mỗi task, tuân thủ đúng [DEVELOPMENT_WORKFLOW.md](file:///home/hajtran/dev/svelte-chd/DEVELOPMENT_WORKFLOW.md) & [TEST_WORKFLOW.md](file:///home/hajtran/dev/svelte-chd/TEST_WORKFLOW.md):
1. **Linting**: `pnpm lint` (hoặc `pnpm prettier --check . && eslint .`)
2. **Type Checking**: `pnpm check` (`svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`) & `tsc --noEmit`
3. **Format**: `pnpm format`
4. **Testing**: `pnpm test` / `pnpm test:unit` / `pnpm test:e2e`
5. **Dead Code**: `pnpm knip`
6. **Knowledge Graph**: Chạy cập nhật tri thức `graphify` khi có thay đổi cấu trúc code.

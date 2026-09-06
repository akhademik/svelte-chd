# 📋 Kế Hoạch Hoàn Thiện Hệ Thống Token Màu Sắc (Color Tokens Architectural Cleanup)

> **Mục tiêu**: Thực hiện đầy đủ các khuyến nghị từ [job-need-do.md](file:///home/hajtran/dev/svelte-chd/job-need-do.md):
> 1. Xóa bỏ hoàn toàn tình trạng "1 màu → nhiều tên" (loại bỏ aliases thừa: `moss`, `terracotta`, `ochre`, `accent`, `sand`, `charcoal` sau khi hoàn tất migration).
> 2. Quy chuẩn hóa dải `stone-*` thành Internal Primitive Palette (chỉ phục vụ định nghĩa nội bộ, không dùng trực tiếp trong component).
> 3. Chuẩn hóa ngữ nghĩa Typography: `foreground` là màu chữ/heading mặc định, `primary` dành riêng cho CTA/Interactive/Brand accent.
> 4. Phân định rõ ràng giữa `inverse` (#2B2A24 - Footer) và `inverse-dark` (#1E1D19 - Hero/Contrast cao).
> 5. Rà soát & dọn dẹp các màu chưa chuẩn hóa như Gold (`#B8862E`) và Teal (`#3D6E7C`).

---

## 🏗️ I. Kiến Trúc Hệ Thống Màu 3 Tầng (3-Tier Design System Architecture)

```mermaid
graph TD
    subgraph Tier 1: Primitive Palette (Internal Only)
        P1[Stone Scale: stone-50 -> stone-950]
        P2[Brand Primitives: Moss #5F6E56, Terracotta #A3764A, Charcoal #2B2A24/#1E1D19]
    end

    subgraph Tier 2: Semantic Tokens (Used in Components)
        S1[Brand: primary, primary-hover, primary-dark, secondary, secondary-hover]
        S2[Surface: background, surface, surface-muted]
        S3[Content: foreground, foreground-muted, foreground-subtle]
        S4[Border: border, border-strong]
        S5[Inverse: inverse, inverse-dark, inverse-foreground]
    end

    subgraph Tier 3: Component Layer
        C1[Buttons, Links, CTAs: bg-primary, text-secondary]
        C2[Cards, Panels, Modals: bg-surface, border-border]
        C3[Headings, Body: text-foreground, text-foreground-muted]
        C4[Footers, Dark Bars: bg-inverse, bg-inverse-dark]
    end

    Tier 1 --> Tier 2
    Tier 2 --> Tier 3
```

---

## 📋 II. Bảng Quy Đổi & Nguyên Tắc Semantic Chuẩn (Semantic Guidelines)

### 1. Typography & Interactive Rule
- ❌ **Không dùng**: `<h1 class="text-primary">` cho heading thông thường (gây hiểu nhầm primary là màu heading).
- ✅ **Chuẩn semantic**: `<h1 class="text-foreground">` (hoặc font-serif mặc định). Chỉ dùng `text-primary` khi có chủ ý nhấn mạnh thương hiệu đặc biệt (editorial emphasis) hoặc link/CTA.

### 2. Surface & Background Rule
- ❌ **Không dùng**: `bg-stone-50`, `bg-sand-card`, `bg-sand`, `bg-sand-alt`.
- ✅ **Chuẩn semantic**: `bg-background` (nền trang), `bg-surface` (nền thẻ/modal), `bg-surface-muted` (khối xen kẽ).

### 3. Inverse Rule
- `bg-inverse` (`#2B2A24`): Dành cho Footer, thanh điều hướng phụ, card tối.
- `bg-inverse-dark` (`#1E1D19`): Dành cho Hero banner tối, media viewer container, overlay độ tương phản cao.
- `text-inverse-foreground` (`#DFD5B9`): Chữ sáng hiển thị trên nền `bg-inverse` hoặc `bg-inverse-dark`.

### 4. Gold & Teal Palette Audit
- Kiểm tra thực tế: Cả `#B8862E` (Gold) và `#3D6E7C` (Teal) **không được sử dụng trong bất kỳ file code Svelte nào**, chỉ xuất hiện trong tài liệu nháp.
- **Quyết định**: Không đưa vào `tailwind.config.js` để tránh làm phình global palette không cần thiết.

---

## 📝 III. Danh Sách Công Việc (Actionable Tasks)

### Phase 1: Migrate Toàn Bộ Codebase Còn Lại Sang Semantic Tokens
- [x] **Task 1.1**: Rà soát và chuyển đổi các component Base còn dùng `stone-*` / `sand-*` / `charcoal-*`:
  - `src/lib/base/base-blog-detail-modal.svelte` (bg-stone-50, text-stone-900, bg-stone-900...)
  - `src/lib/base/base-booking-modal.svelte` (bg-white/bg-stone-50, border-stone-200...)
  - `src/lib/base/base-tour-detail-modal.svelte`
  - `src/lib/base/base-footer.svelte` (chuyển các class text-stone-300/700/800 còn lại sang semantic token)
  - `src/lib/base/base-portable-text-list-item.svelte`
- [x] **Task 1.2**: Rà soát và chuyển đổi các module trang còn lại:
  - `src/routes/[lang]/blog/[slug]/+page.svelte` (chuyển đổi toàn bộ stone-900, stone-200, sand-card, terracotta...)
  - `src/lib/modules/tour-page/components/details-left-panel.svelte`
  - `src/lib/modules/contact-page/components/contact-form.svelte`
- [x] **Task 1.3**: Rà soát lại việc dùng `text-primary` trên các heading H1/H2, đưa về `text-foreground` trừ các điểm nhấn editorial CTA đặc thù.

### Phase 2: Dọn Dẹp Aliases Trong `tailwind.config.js`
- [x] **Task 2.1**: Sau khi Phase 1 hoàn tất và không còn file `.svelte` nào phụ thuộc vào alias cũ:
  - Loại bỏ các alias: `sand`, `moss`, `terracotta`, `ochre`, `charcoal`, `accent`, `accent-deep`, `accent-warm`.
  - Giữ lại `primary`, `secondary`, `background`, `surface`, `foreground`, `border`, `inverse` làm public tokens.
  - Chú thích rõ ràng `stone: { ... }` là **Internal Primitive Scale** chỉ dành cho nội bộ config.

### Phase 3: Cập Nhật Tài Liệu [LAYOUT_DESIGN_CONCEPT.md](file:///home/hajtran/dev/svelte-chd/LAYOUT_DESIGN_CONCEPT.md)
- [x] **Task 3.1**: Cập nhật mục Typography quy định rõ `foreground` là màu chữ mặc định.
- [x] **Task 3.2**: Phân định rõ mục đích `inverse` vs `inverse-dark`.
- [x] **Task 3.3**: Gỡ bỏ các màu không dùng (Gold, Teal) khỏi danh sách bảng màu cốt lõi.

### Phase 4: Kiểm Thử & Quality Gates
- [x] **Task 4.1**: Chạy `pnpm check` (Svelte-check & TypeScript) đảm bảo 0 lỗi.
- [x] **Task 4.2**: Chạy `pnpm lint:all` và `pnpm format:all`.
- [x] **Task 4.3**: Chạy `pnpm test` (Unit & Playwright E2E) đảm bảo toàn bộ test case pass.
- [x] **Task 4.4**: Chạy `pnpm build` xác nhận bundle CSS được tối ưu sạch sẽ.
- [x] **Task 4.5**: Chạy `/graphify` cập nhật knowledge graph.

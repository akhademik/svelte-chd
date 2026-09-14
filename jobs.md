# 📝 NHẬT KÝ THEO DÕI HẠNG MỤC DỰ ÁN (PROJECT JOBS & MILESTONES)

---

## 🎯 Hoàn Thành (Completed Milestones)

### 1. **Kiến Trúc & Tầng Dịch Vụ (Service Layer & Domain Isolation)**
- [x] **Refactor Sitemap sang Service Layer**:
  - Chuyển toàn bộ truy xuất dữ liệu trong `src/routes/sitemap.xml/+server.ts` từ `sanityClient.fetch()` sang `TourService.getToursByType(kv)` và `BlogService.getAllBlogs(kv)`.
  - Tích hợp Cloudflare KV snapshot disaster recovery cho sitemap.
- [x] **SEO Lastmod Tối Ưu Hóa**:
  - Sitemap sử dụng `blog.updatedAt ?? blog.publishedAt` thay vì chỉ `publishedAt`, giúp crawler nhận diện chính xác các bản cập nhật nội dung.
- [x] **Đơn giản hóa `matchesTourSlug()` & Bỏ rule heuristic thứ 5**:
  - Xóa bỏ heuristic `startsWith` chuỗi lỏng lẻo.
  - Chuẩn hóa phân giải 4 tầng xác định: Direct ID -> Multilingual Virtual Slug -> Raw Title Slug -> Prefixed ID (`${rawTourId}-`).

### 2. **Type-Safety & Form Validation Refactor**
- [x] **Loại bỏ `zod(formSchema as any) as any` double-cast**:
  - Đóng gói và export `formAdapter: ValidationAdapter<FormSchema>` tập trung tại `src/lib/utils/form-schema.ts`.
  - Chuẩn hóa `superValidate(formAdapter)` và `superValidate(request, formAdapter)` tại `routes/[lang]/+page.server.ts` và `routes/[lang]/contact/+page.server.ts`, đảm bảo `form.data` có kiểu `FormSchema` chính xác 100%.
- [x] **Cloudflare KV Type Binding**:
  - Bổ sung `RATE_LIMIT_KV?: KVNamespace` vào `Platform.env` trong `src/app.d.ts`, loại bỏ `(platform as any)?.env?.RATE_LIMIT_KV` trong route handlers.

### 3. **Hệ Thống Kiểm Thử & CI/CD Quality Gates**
- [x] **Unit Testing (Vitest)**: 19 test suites, 120 unit tests passed.
- [x] **E2E Testing (Playwright)**: 6 E2E test scenarios passed 100%.
- [x] **Knip & Type Check**: 0 dead code, 0 type errors trên cả 2 workspaces (`front-end` và `back-end`).
- [x] **Production Build**: Biên dịch Cloudflare Workers adapter và Sanity Studio thành công.
- [x] **Knowledge Graph**: Đồng bộ `graphify update .` thành công.

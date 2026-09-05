# 🧪 HỆ THỐNG KIỂM THỬ VÀ KIỂM TRA CHẤT LƯỢNG (TESTING & QUALITY WORKFLOW)

> **Mục tiêu**: Đảm bảo mọi thay đổi trong `front-end/` và `back-end/` luôn vượt qua đầy đủ các tầng kiểm tra chất lượng (Lint, Type, Format, Test, Knip).

---

## 🎯 1. Danh Sách Kiểm Tra Bắt Buộc (Quality Checklist)

Sau mỗi lần sửa đổi code, thực hiện lần lượt các bước sau:

1. **Linting (`pnpm lint`)**:
   - Frontend: `cd front-end && pnpm lint`
   - Backend: `cd back-end && pnpm eslint .`
2. **Type Checking (`pnpm check` / `tsc`)**:
   - Frontend: `cd front-end && pnpm check`
   - Backend: `cd back-end && pnpm tsc --noEmit`
3. **Formatting (`pnpm format` / Prettier)**:
   - Frontend: `cd front-end && pnpm format`
   - Backend: `cd back-end && pnpm prettier --write .`
4. **Testing (`pnpm test`)**:
   - Chạy các bài test đơn vị hoặc tích hợp khi có test suite.
5. **Dead Code & Dependency Analysis (`knip`)**:
   - Frontend: `cd front-end && pnpm knip`
   - Backend: `cd back-end && pnpm knip`
6. **Đồng Bộ Knowledge Graph (`/graphify`)**:
   - Chạy `/graphify` tại thư mục gốc dự án để cập nhật đồ thị kiến trúc, phân tích phụ thuộc.

---

## 🔄 2. Quy Trình Phản Hồi & Commit

1. **Thực hiện sửa đổi** (tránh lệnh thử nghiệm nhỏ lẻ `node -e`).
2. **Chạy toàn bộ chuỗi kiểm tra** (Lint -> Type -> Format -> Test -> Knip).
3. **Chạy `/graphify`** cập nhật graph tri thức.
4. **Thông báo kết quả cho User**.
5. **Khi User phê duyệt (OK)** -> Đề xuất thông điệp Git Commit và hỗ trợ commit.

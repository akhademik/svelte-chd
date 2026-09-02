# 📋 QUY TRÌNH PHÁT TRIỂN & CHẤT LƯỢNG MÃ NGUỒN (DEVELOPMENT WORKFLOW)

> **Tài liệu quy chuẩn bắt buộc** cho dự án `svelte-chd` (Frontend: SvelteKit + TailwindCSS + Sanity Client; Backend: Sanity Studio v3).

---

## 🔒 1. Quy tắc Quản lý Gói (Package Manager Rule)

- **BẮT BUỘC DÙNG `pnpm`** (Tuyệt đối không dùng `npm` hoặc `yarn`).
- Dự án gồm các khu vực:
  - `front-end/`: SvelteKit, TypeScript, TailwindCSS, Typesafe-i18n (Legacy)
  - `front-end2/`: SvelteKit (Svelte 5 runes), TypeScript, TailwindCSS Minimalist UI, Mobile-first responsive
  - `back-end/`: Sanity Content Studio v3, React, TypeScript

```bash
# Cài đặt toàn bộ dự án từ thư mục gốc
pnpm install

# Hoặc cài riêng từng phần:
cd front-end2 && pnpm install
cd back-end && pnpm install
```

### 🚀 Lệnh Nhanh Tại Thư Mục Gốc (Root Scripts):
- **Dev Frontend (front-end2)**: `pnpm dev` (hoặc `pnpm dev:fe2`)
- **Dev Backend (Sanity Studio)**: `pnpm dev:be`
- **Build**: `pnpm build` (hoặc `pnpm build:all`)
- **Kiểm tra toàn bộ (Check & Lint)**: `pnpm check:all` & `pnpm lint:all`
- **Format toàn bộ**: `pnpm format:all`
- **i18n Watch/Sync**: `pnpm i18n` (chạy typesafe-i18n cho front-end2)


---

## 🧱 2. Chu trình Chỉnh Sửa Code Chuẩn (Quality Gate Loop)

Mỗi khi chỉnh sửa mã nguồn, tuân thủ đúng trình tự sau:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Chỉnh sửa code dứt điểm trong 1 lần (không node -e nhỏ)  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Chạy toàn bộ bộ kiểm tra chất lượng (Quality Gates)      │
│    - Lint (ESLint)                                          │
│    - Type Check (TypeScript / Svelte-check)                 │
│    - Format (Prettier)                                      │
│    - Test (Unit / Test Suites)                              │
│    - Knip (Dead Code / Unused dependencies)                 │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Chạy `/graphify` để cập nhật Knowledge Graph             │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Thông báo và trình bày kết quả cho User                  │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Đợi User xác nhận -> Đề xuất Commit Git                  │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ 3. Bảng Lệnh Kiểm Tra Theo Module

### Frontend (`front-end2/` & `front-end/`)
- **Lint**: `pnpm lint` (hoặc `pnpm prettier --check . && eslint .`)
- **Type Check**: `pnpm check` (`svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`)
- **Format**: `pnpm format` / `pnpm prettier --write .`
- **Test**: `pnpm test` (khi có test suite)
- **Knip**: `pnpm knip` (hoặc `npx knip`)

### Backend (`back-end/`)
- **Lint**: `pnpm eslint .`
- **Type Check**: `pnpm tsc --noEmit`
- **Format**: `pnpm prettier --write .` / `pnpm prettier --check .`
- **Knip**: `pnpm knip` (hoặc `npx knip`)

---

## 🗺️ 4. Quy định Sau Khi Edit Code

1. **Chỉnh sửa gọn gàng**: Thay đổi chính xác, trọn vẹn theo ngữ cảnh, tránh gọi các lệnh thử nghiệm vặt lặp đi lặp lại (`node -e`).
2. **Quality Gates**: Đảm bảo vượt qua toàn bộ lint, type, format, test, knip.
3. **Graphify Sync**: Thực thi cập nhật đồ thị kiến trúc tri thức `/graphify`.
4. **Báo cáo & Commit**: Báo cáo rõ ràng các tệp đã sửa, nếu user đồng ý mới tiến hành commit.

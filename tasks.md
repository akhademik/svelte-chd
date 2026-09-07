# Danh sách công việc còn lại (Pending Tasks)

1. **UX / Design Suggestion (Phiên bản sau)**:
   - Slider tour nổi bật trang chủ: Cân nhắc gom Slider tour làm một phần trong Hero hoặc dùng luôn 2 khối Day/Highland Tours làm sản phẩm hero để tránh trùng lặp khi có thêm nhiều tour.

2. **Cloudflare Operations (Thực hiện thủ công trên Cloudflare Dashboard)**:
   - **Layer 1 CDN Cache Rules**: Tạo Cache Rule cho domain trên Cloudflare Dashboard (Eligible for Cache, Edge TTL: Respect origin).
   - **Layer 2 KV Namespace Binding**: Tạo KV namespace `SANITY_SNAPSHOT` trên Cloudflare Dashboard / Wrangler và gắn biến môi trường binding `SANITY_SNAPSHOT_KV` vào Cloudflare Pages project (Settings -> Functions -> KV namespace bindings).

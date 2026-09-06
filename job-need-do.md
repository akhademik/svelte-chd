⚠️ Phát hiện mới #1 — ci.yml đang nhét thừa secret có quyền ghi vào job chỉ chạy lint/test

Tôi kiểm tra 3 file dùng các biến này (email.ts, booking/+server.ts, api/tours/+server.ts) — cả 3 đều chỉ cần biến tồn tại (để $env/static/private không lỗi), code đã tự guard if (!X) return/skip. Nghĩa là job lint/typecheck/unit/e2e không cần giá trị thật của SANITY_WRITE_TOKEN, RESEND_API_KEY, DISCORD_WEBHOOK_URL — chuỗi rỗng/giả cũng chạy pass y hệt.

Vậy đang có rủi ro thừa: job này chạy cho mọi push/PR vào main/svelte (kể cả PR từ cộng tác viên bạn add sau này), và bất kỳ package nào trong pnpm install bị compromise (supply-chain attack qua postinstall script) đều có thể đọc front-end/.env lúc đó và exfiltrate luôn SANITY_WRITE_TOKEN thật — dù job này vốn dĩ chả cần dùng nó.

Đề xuất: đổi 3 dòng đó thành giá trị giả cố định, không kéo secret thật vào job CI:

yaml
SANITY_WRITE_TOKEN="dummy-for-typecheck"
RESEND_API_KEY="dummy-for-typecheck"
DISCORD_WEBHOOK_URL=""

Giữ nguyên secrets.SANITY_WRITE_TOKEN thật chỉ cho sync-rates.yml (nơi thực sự cần ghi Sanity) — không cần cho ci.yml.

🚩 Phát hiện mới #2 — testimonials.json: đây là copy nguyên văn TripAdvisor, có vài rủi ro thật

Tôi đọc file này (front-end/src/lib/constants/testimonials.json, 36 review, ~38KB) và thấy đây là copy full-text 100% nguyên văn review + hotlink thẳng ảnh avatar từ dynamic-media-cdn.tripadvisor.com. 3 vấn đề cụ thể:

Bản quyền/ToS: đây không phải 1-2 câu trích dẫn ngắn kèm link (như tôi gợi ý trước đó) mà là toàn văn review dài (có cái >150 từ), của tác giả gốc, publish thẳng lên domain thương mại của bạn. Rủi ro thấp về mặt thực tế (business dùng review khách để làm testimonial là thông lệ phổ biến), nhưng an toàn hơn nên rút mỗi review còn 1-2 câu nổi bật + nút "Đọc full trên TripAdvisor" trỏ về url sẵn có trong data — vừa gọn UI, vừa giảm rủi ro pháp lý.
Hotlink ảnh avatar từ CDN TripAdvisor: dynamic-media-cdn.tripadvisor.com/... có thể bị họ chặn hotlink/đổi URL bất cứ lúc nào (ảnh vỡ hàng loạt không báo trước), và về nguyên tắc là dùng tài nguyên host bởi bên thứ 3 trên domain của bạn. Nên tự tải về lưu trong static/ hoặc dùng avatar chữ cái đầu tên khách (kiểu placeholder) thay vì hotlink trực tiếp.
Bundle size: file này được import trực tiếp trong home-testimonials.svelte và contact-review.svelte (dòng 4-5 mỗi file) — nghĩa là toàn bộ 38KB JSON này bị Vite đóng gói vào client-side JS bundle, gửi xuống trình duyệt mọi khách ghé site, dù bạn đã có +page.server.ts load riêng để truyền props xuống rồi. Sửa: bỏ import defaultTestimonials from '$lib/constants/testimonials.json' trong 2 file .svelte, chỉ giữ fallback = [] (rỗng), vì dữ liệu thật đã luôn được truyền qua props từ server load — không cần import tĩnh JSON ở phía component nữa.

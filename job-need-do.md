Flow gốc (đúng như bạn mô tả) hoạt động thế nào
Có route /api/tours (fetch_exchange_rate): kiểm tra Sanity đã có tỷ giá của hôm nay chưa → nếu chưa, gọi API tỷ giá ngoại (EXCHANGE_URL) → lấy VND→USD, VND→EUR.
Ghi ngược tỷ giá đó vào Sanity qua sync_rate_to_sanity (document exchangeRates, id cố định exchange-rates-latest), đồng thời dọn tỷ giá cũ.
Client gọi exchange_rates_store.setRates(...) để nạp tỷ giá vào store.
format_price() trong format-data.ts lấy giá tour (VND) nhân với tỷ giá từ store → ra giá USD (locale en) hoặc EUR (locale fr); riêng VN thì hiển thị thẳng VND/1000.
Vấn đề: nó đang KHÔNG chạy nữa

Mình grep toàn repo và xác nhận: không còn chỗ nào gọi exchange_rates_store.setRates(...), và không còn chỗ nào fetch tới /api/tours cả. Route đó giờ là code mồ côi (orphaned) — tồn tại nhưng không ai gọi.

Lý do: khi mình chuyển tour sang SSR (+page.server.ts → sanity-client.ts), luồng fetch mới không hề đụng tới logic tỷ giá — sanity-client.ts không có dòng nào liên quan exchange/rate. Trước đây currency conversion sống ký sinh trên route /api/tours (route cũ, client-side fetch) — giờ route đó bị "cho nghỉ hưu" nhưng logic tỷ giá đi kèm nó cũng bị nghỉ hưu theo, không ai chuyển nó sang chỗ mới.

Hậu quả thực tế: get_exchange_rate() trong sanity.ts luôn đọc store, mà store không bao giờ được setRates, nên nó luôn rơi vào giá trị mặc định hard-code:

USD: 0.00003841 (~ 1 USD = 26.035 VND)
EUR: 0.00003317 (~ 1 EUR = 30.147 VND)

tức là mọi khách xem giá USD/EUR hiện tại đều đang thấy tỷ giá cứng từ lúc code này được viết, không phải tỷ giá thật hôm nay — dù bạn vẫn có cơ chế cập nhật Sanity, nó chỉ chưa bao giờ được trigger sau refactor.

Đánh giá thiết kế: ý tưởng hợp lý, nhưng có 2 điểm chưa ổn ngay cả khi hoạt động
Cách trigger sai chỗ: tỷ giá chỉ được cập nhật khi có ai đó vô tình gọi trúng route /api/tours — phụ thuộc vào traffic, không đảm bảo. Nếu cả ngày không ai gọi route đó, tỷ giá không bao giờ tự cập nhật. Đúng ra việc "gọi API tỷ giá 1 lần/ngày, ghi vào Sanity" nên là một cron job độc lập (Cloudflare Cron Trigger, GitHub Action scheduled, hoặc Sanity webhook) — chạy đúng giờ mỗi ngày, không phụ thuộc khách có ghé web hay không.
Đọc tỷ giá ở client store thay vì server load(): giống hệt lỗi SEO mình vừa sửa — format_price đọc từ exchange_rates_store (client-side writable), nên nếu có sửa lại cho chạy, nó vẫn sẽ gặp vấn đề hiển thị sai lúc SSR (server render ra giá theo rate mặc định trong HTML gốc, rồi mới "nhảy" sang giá đúng sau khi client hydrate) — gây flash giá sai + không nhất quán với kiến trúc SSR mới bạn vừa chuyển sang.
Đề xuất sửa
Tạo 1 hàm getLatestExchangeRate() trong sanity-client.ts (server, giống các hàm fetchToursByType khác) — chỉ đọc tỷ giá mới nhất từ Sanity (không tự gọi API ngoại từ đây).
Trong +page.server.ts (trang chủ/tour/chi tiết), gọi hàm đó song song với fetch tour, trả rates ra cùng data từ load().
format_price(price, locale, rates) nhận rates làm tham số thay vì đọc store toàn cục → chạy đúng cả SSR lẫn client, không còn phụ thuộc $effect/store.
Việc gọi API tỷ giá ngoại + ghi vào Sanity (fetch_exchange_rate + sync_rate_to_sanity) tách riêng thành 1 cron job/scheduled function chạy 1 lần/ngày, độc lập với người dùng — có thể giữ nguyên logic bên trong api/tours/+server.ts, chỉ cần đổi cách trigger (cron gọi thay vì chờ khách vô tình ghé).

Tóm lại: concept "fetch 1 lần/ngày, cache vào Sanity, tính giá lúc hiển thị" là hợp lý và tiết kiệm (không gọi API tỷ giá mỗi lần có người xem trang) — chỉ là cách trigger (dựa vào traffic ngẫu nhiên) và cách đọc dữ liệu (client store thay vì SSR data) chưa đúng, và hiện tại đã đứt hoàn toàn nên giá hiển thị sai. Bạn có muốn mình sửa luôn phần này (nối sanity-client.ts + đưa rates vào load()) không?

Đổi cách trigger cập nhật — từ "phụ thuộc traffic ngẫu nhiên vào /api/tours" sang cron job cố định 1 lần/ngày (Cloudflare Cron Trigger hoặc GitHub Action scheduled workflow), độc lập hoàn toàn với lượt khách ghé web.
Đổi cách đọc tỷ giá ở frontend — từ client store ($effect) sang đọc thẳng field đã cache trong Sanity ngay trong +page.server.ts load(), trả về cùng data với tour → vừa đúng SSR, vừa không tốn thêm request nào tới API tỷ giá ngoại khi khách xem trang (vì lúc đó chỉ đọc Sanity, không đụng tới exchangerate-api.com nữa).

Nói cách khác: giữ nguyên kiến trúc "cache trong Sanity", chỉ sửa cách nó được nạp và cách nó được đọc — đó là hướng tối ưu nhất, giống hệt logic bạn đã đồng ý áp dụng cho phần tour/HTML (edge cache 30-60 phút) chứ không phải gọi Sanity mỗi lượt khách.

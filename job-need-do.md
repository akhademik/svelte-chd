Vấn đề kỹ thuật đáng lo nhất: gần như toàn bộ nội dung tour render phía client

Đây là lỗ hổng lớn nhất tôi thấy:

Trang chủ, trang danh sách tour (/[lang]/[tourtype]), và trang chi tiết tour (/[lang]/[tourtype]/[slug]) — tức các trang "bán hàng" quan trọng nhất — không có +page.server.ts, mà fetch dữ liệu tour hoàn toàn trong onMount/$effect (client-only), che bằng BaseLoading full-page cho tới khi JS chạy xong.
Trang chi tiết 1 tour lại tải toàn bộ danh sách tour cùng loại rồi mới tìm ra tour theo slug, thay vì query đúng 1 tour — tốn băng thông không cần thiết.
SEO (set_seo trong seo-store.ts) là một writable store được set trong $effect, chỉ chạy ở client sau khi hydrate. Nghĩa là HTML server-render ban đầu (thứ Googlebot/crawler mạng xã hội đọc) luôn có title/description mặc định giống nhau cho mọi tour, mọi bài blog — rất bất lợi cho SEO và preview chia sẻ Facebook/Zalo của một trang du lịch sống nhờ tìm kiếm tự nhiên.
Title mặc định còn hard-code " - 2023" trong seo-store.ts — lỗi/sót, hiện tại đã là 2026.
Nhiều trang khác (contact-page.svelte) cũng bọc nội dung trong {#if loaded} sau onMount dù dữ liệu đã có sẵn từ load() server — gây chớp trắng, tăng CLS, không cần thiết vì SvelteKit SSR sẵn có thể render ngay.

Đề xuất: chuyển fetch tour (Sanity) sang +page.server.ts/load() cho 3 route này, set title/meta ngay trong load() trả về qua data, xoá phần logic đọc localStorage/cache thủ công (SvelteKit + Sanity CDN đã có cache tầng HTTP).

Vấn đề nhỏ hơn / code smell
Mixed style: contact-page.svelte dùng cú pháp Svelte 4 (export let data) trong khi phần còn lại dùng runes Svelte 5 — nên đồng bộ.
Nhiều type Props { data?: any } / data: any — mất type-safety dù dự án đã có TypeScript đầy đủ; nên định nghĩa type cho PageData.
Email gửi từ onboarding@resend.dev (domain test mặc định của Resend) — production nên verify domain riêng (vd noreply@chd.travel) để tránh vào spam.
Fallback email cứng hajtran@gmail.com (email cá nhân) nằm trực tiếp trong source — nên chuyển hẳn vào biến môi trường, không để giá trị mặc định là email thật trong code.
Đặt tour hiện chỉ là "gửi yêu cầu" (lead-gen) qua email/Discord, chưa có xác nhận tự động cho khách (auto-reply), chưa có lưu trữ booking nào ngoài Discord/email.
Đề xuất thêm tính năng
Tìm kiếm & lọc tour: hiện không có search bar hay filter (theo giá, thời lượng, điểm đến) ở trang danh sách — với nhiều tour sẽ cần.
Trang chi tiết tour cần URL chia sẻ tốt hơn: hiện là modal fullscreen phủ lên route cha thay vì trang độc lập có SEO riêng — nên cân nhắc route thật (đã có [slug] rồi, chỉ cần SSR hoá + meta riêng như trên).
Auto-reply email cho khách sau khi gửi form liên hệ/đặt tour (hiện chỉ noti cho admin, khách không nhận được xác nhận).
Sitemap.xml & robots.txt động theo danh sách tour/blog từ Sanity — chưa thấy trong routes/, cần cho SEO.
Structured data (JSON-LD) cho TouristTrip/Product — giúp Google hiện rich snippet (giá, đánh giá) cho tour.
Hiển thị tỷ giá quy đổi (đã có store exchange-rates-store sẵn) ra UI cho khách quốc tế, hiện logic có nhưng không thấy component nào dùng để hiển thị switcher — có vẻ tính năng dang dở, nên hoàn thiện hoặc bỏ.
Đề xuất bớt / dọn dẹp
Bỏ cơ chế cache thủ công qua localStorage trong sanity.ts (24h TTL) — phức tạp hoá không cần thiết, nên để SvelteKit/Sanity CDN cache lo.
README của front-end vẫn là README boilerplate gốc (sveltekit-boilerplate, link git clone sai) — cần viết lại mô tả đúng dự án CHD Travel.
job-need-do.md về padding mobile ở Contact có vẻ đã được xử lý (container đã dùng đúng mx-auto max-w-6xl px-6 py-12 giống Day/Highland Tours) — có thể xoá file to-do này nếu đã fix, tránh gây nhầm cho người sau.

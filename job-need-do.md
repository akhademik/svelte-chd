⚠️ Vấn đề còn sót — quan trọng nhất

<title>/<meta description> vẫn chưa thực sự SSR. Trong [slug]/+page.svelte và blog/[slug]/+page.svelte, set_seo(...) vẫn được gọi bên trong $effect(...):

ts
$effect(() => {
if (tour) set_seo(title, ...)
return () => set_seo('default')
})

Trong Svelte 5, $effect không chạy trong SSR (chỉ chạy sau khi hydrate ở client) — khác với $derived mà bạn đã dùng đúng cho JSON-LD. Nghĩa là: nội dung tour (giá, mô tả, ảnh...) đã hiện đúng trong HTML gốc rồi (tốt), nhưng riêng <title> và <meta name="description"> trong HTML gốc mà Googlebot/Facebook bot đọc vẫn là DEFAULT_TITLE/DEFAULT_DESC chung, chưa phải tên/tiêu đề riêng của từng tour hay bài blog. Đây chính là phần SEO quan trọng nhất (title là yếu tố xếp hạng + là dòng chữ hiện trên kết quả tìm kiếm) nên cần sửa tiếp.

Cách sửa: đổi set_seo từ gọi trong $effect sang tính bằng $derived giống base-jsonld.svelte, hoặc tốt hơn — bỏ hẳn cơ chế store toàn cục, truyền title/description xuống thẳng <BaseSeo title={...} description={...} /> như prop tính từ data (đã có sẵn từ load()), để chắc chắn nó là part of render tree chạy được cả SSR lẫn client, không phụ thuộc runtime của $effect.

❌ Bug mới phát sinh

sitemap.xml/+server.ts sinh URL cho blog là:

${siteUrl}/${lang}/blog#${slug}

— dùng hash fragment (#slug), trong khi commit này đã tạo ra route thật /[lang]/blog/[slug]/+page.svelte (+page.server.ts riêng, SSR hẳn hoi). Hai cái không khớp: sitemap đang khai với Google một URL không tồn tại/không phải trang thật (hash không được server xử lý, không SSR riêng), còn trang blog chi tiết SSR thật lại nằm ở /${lang}/blog/${slug}. Cần sửa dòng generate URL blog trong sitemap thành /${lang}/blog/${slug} để khớp với route mới, nếu không Google sẽ index sai URL hoặc bỏ qua.

Còn lại (không khẩn, ghi nhận thêm)
from: 'onboarding@resend.dev' trong email.ts vẫn là domain test mặc định của Resend — nên verify domain riêng (chdtravel.com) trước khi lên production thật, tránh vào spam.
+page.server.ts trang chi tiết tour vẫn gọi thêm fetchToursByType(tourtype) song song để phục vụ "related/prev-next tour" — hợp lý, không phải bug, chỉ nêu để bạn biết đó là chủ đích chứ không phải sót lại code cũ.

Tóm lại: phần khó nhất (SSR data + cache 2 tầng + JSON-LD + bỏ localStorage) đã làm đúng và tốt. Còn 2 việc cần làm nốt: (1) sửa set_seo để title/description thật sự vào HTML lúc SSR, (2) sửa link blog trong sitemap từ #slug thành /slug.

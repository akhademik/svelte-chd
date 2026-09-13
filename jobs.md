Đây là đoạn code để chèn vào base-footer.svelte, dùng đúng token màu (text-inverse-foreground, border-inverse-dark) đang có sẵn trong file, không hardcode màu mới:

1. Thêm route + link vào footer — chèn đoạn này giữa <!-- Navigation Links --> và <!-- Bottom Copyright -->:

svelte

<!-- Legal / Utility Links -->
<div class="flex justify-center border-t border-inverse-dark/60 pt-3.5">
	<div class="flex flex-wrap items-center justify-center gap-5 text-[11px] font-light text-inverse-foreground/50">
		
			href={`/${$locale}/faq`}
			class="transition-colors hover:text-inverse-foreground/80">
			{$LL.footer.faq()}
		</a>
		
			href={`/${$locale}/terms`}
			class="transition-colors hover:text-inverse-foreground/80">
			{$LL.footer.terms()}
		</a>
		
			href={`/${$locale}/privacy`}
			class="transition-colors hover:text-inverse-foreground/80">
			{$LL.footer.privacy()}
		</a>
	</div>
</div>

2. Thêm key i18n mới — tạo file src/i18n/en/footer.i18n.ts (và tương ứng vi/, fr/):

ts
export const footer = {
faq: 'FAQ',
terms: 'terms of service',
privacy: 'privacy policy',
}

Bản tiếng Việt (src/i18n/vi/footer.i18n.ts):

ts
export const footer = {
faq: 'Câu hỏi thường gặp',
terms: 'Điều khoản dịch vụ',
privacy: 'Chính sách bảo mật',
}

Rồi export footer trong src/i18n/en/index.ts (và vi/index.ts, fr/index.ts) giống cách các module khác (nav_bar, about_page...) đang được gộp vào object dịch chính, để $LL.footer.faq() chạy được.

Ba route /faq, /terms, /privacy thì cần tạo tương ứng dưới src/routes/[lang]/ theo đúng pattern các trang tĩnh khác như about — nếu bạn muốn mình dựng luôn khung 3 trang đó (kèm nội dung mẫu điều khoản/bảo mật cho công ty du lịch VN) thì nói mình làm tiếp.

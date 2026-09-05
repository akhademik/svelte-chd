<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { locale } from '$i18n/i18n-svelte'
</script>

<div class="space-y-16 pb-20">
	<!-- Hero Section -->
	<section class="border-b border-stone-200/80 bg-white py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
				<div class="lg:col-span-7">
					<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
						{$locale === 'vn'
							? 'Về chúng tôi'
							: $locale === 'fr'
								? 'À propos de nous'
								: 'About CHD Travel'}
					</span>
					<h1
						class="font-serif text-3xl font-normal leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
						{$locale === 'vn'
							? 'Chúng tôi lớn lên cùng đất bazan này'
							: $locale === 'fr'
								? 'Nous avons grandi avec cette terre de basalte'
								: 'Born and raised in the heart of the Central Highlands'}
					</h1>
					<p class="mt-6 text-base font-light leading-relaxed text-stone-600 sm:text-lg">
						{$locale === 'vn'
							? 'CHD Travel do một nhóm bạn sinh ra ở Buôn Ma Thuột lập nên, sau nhiều năm dẫn khách quen đi những nơi mà bản đồ du lịch thông thường không ghi. Chúng tôi không bán lịch trình đóng gói công nghiệp — chúng tôi chia sẻ đúng vùng đất và văn hoá mình đang sống.'
							: $locale === 'fr'
								? 'Fondé par des passionnés locaux de Buon Ma Thuot, CHD Travel vous fait découvrir les sentiers authentiques et les secrets des Hauts Plateaux.'
								: 'Founded by Buon Ma Thuot locals, CHD Travel shares the untouched beauty, vibrant ethnic cultures, and rich coffee traditions of Dak Lak through genuine local journeys.'}
					</p>

					<!-- Key Stats -->
					<div class="mt-10 flex flex-wrap gap-8 border-t border-stone-200 pt-8 sm:gap-12">
						<div>
							<span class="block text-xs uppercase tracking-wider text-stone-400">
								{$locale === 'vn' ? 'Hoạt động từ' : 'Active Since'}
							</span>
							<b class="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">2019</b>
						</div>
						<div>
							<span class="block text-xs uppercase tracking-wider text-stone-400">
								{$locale === 'vn' ? 'Đoàn khách đón' : 'Groups Hosted'}
							</span>
							<b class="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">400+</b>
						</div>
						<div>
							<span class="block text-xs uppercase tracking-wider text-stone-400">
								{$locale === 'vn' ? 'HDV Bản địa' : 'Local Guides'}
							</span>
							<b class="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">7+</b>
						</div>
					</div>
				</div>

				<!-- Hero Visual Card -->
				<div class="relative lg:col-span-5">
					<div
						class="overflow-hidden border border-stone-200 bg-stone-900 p-8 text-stone-100 shadow-xl sm:p-10">
						<span class="text-xs uppercase tracking-widest text-terracotta"
							>CHD Travel Philosophy</span>
						<blockquote
							class="mt-4 font-serif text-xl font-normal italic leading-relaxed text-stone-100">
							"Go local — See local — Eat local"
						</blockquote>
						<p class="mt-4 text-xs font-light leading-relaxed text-stone-300">
							{$locale === 'vn'
								? 'Tôn trọng bản sắc buôn làng, gìn giữ môi trường rừng tự nhiên và đồng hành bảo tồn văn hoá cồng chiêng Tây Nguyên.'
								: 'Respecting indigenous villages, preserving natural forests, and fostering the authentic gong culture of the Highlands.'}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Timeline Story Section -->
	<section class="py-12 sm:py-16">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-12 max-w-2xl">
				<span class="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
					01 / Timeline
				</span>
				<h2 class="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">
					{$locale === 'vn' ? 'Câu chuyện hình thành & phát triển' : 'Our Story & Journey'}
				</h2>
				<p class="mt-3 text-sm font-light leading-relaxed text-stone-600">
					{$locale === 'vn'
						? 'Từ nhóm bạn dẫn khách quen truyền miệng đến đơn vị lữ hành uy tín tại Đắk Lắk.'
						: 'From guiding close friends to becoming a licensed local tour operator.'}
				</p>
			</div>

			<div class="relative space-y-10 border-l border-stone-200 pl-6 sm:pl-10">
				<!-- 2019 -->
				<div class="relative">
					<div
						class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-stone-900 sm:-left-[47px]">
					</div>
					<span class="font-serif text-xl font-normal text-terracotta">2019</span>
					<h3 class="mt-1 font-serif text-lg font-medium text-stone-900">
						{$locale === 'vn' ? 'Những chuyến đi đầu tiên' : 'First Journeys'}
					</h3>
					<p class="mt-2 text-sm font-light leading-relaxed text-stone-600 sm:max-w-3xl">
						{$locale === 'vn'
							? 'Khởi đầu bằng việc dẫn bạn bè và khách quen đi khám phá thác Dray Nur, vườn quốc gia Yok Đôn và những rẫy cà phê bạt ngàn tại Cư M’gar.'
							: 'Started by taking friends and referrals to Dray Nur Waterfall, Yok Don National Park, and organic coffee estates in Cu M’gar.'}
					</p>
				</div>

				<!-- 2021 -->
				<div class="relative">
					<div
						class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-stone-900 sm:-left-[47px]">
					</div>
					<span class="font-serif text-xl font-normal text-terracotta">2021</span>
					<h3 class="mt-1 font-serif text-lg font-medium text-stone-900">
						{$locale === 'vn'
							? 'Mở rộng tour văn hoá & cộng đồng'
							: 'Community & Highland Expeditions'}
					</h3>
					<p class="mt-2 text-sm font-light leading-relaxed text-stone-600 sm:max-w-3xl">
						{$locale === 'vn'
							? 'Hợp tác cùng đồng bào Ê Đê, M’nông quanh hồ Lắk và Buôn Đôn để tổ chức tour trải nghiệm nhà dài, giao lưu cồng chiêng và bảo tồn voi bán hoang dã.'
							: 'Partnered with Ede and M’nong communities around Lak Lake and Buon Don for homestays, gong performances, and ethical elephant experiences.'}
					</p>
				</div>

				<!-- 2023 -->
				<div class="relative">
					<div
						class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-stone-900 sm:-left-[47px]">
					</div>
					<span class="font-serif text-xl font-normal text-terracotta">2023</span>
					<h3 class="mt-1 font-serif text-lg font-medium text-stone-900">
						{$locale === 'vn'
							? 'Chính thức hoá giấy phép lữ hành'
							: 'Licensed Operator & Standards'}
					</h3>
					<p class="mt-2 text-sm font-light leading-relaxed text-stone-600 sm:max-w-3xl">
						{$locale === 'vn'
							? 'Được Sở Văn hoá, Thể thao & Du lịch Đắk Lắk cấp giấy phép lữ hành nội địa, chuẩn hoá quy trình bảo hiểm và đào tạo nghiệp vụ hướng dẫn viên.'
							: 'Officially licensed with comprehensive travel insurance policies, safety protocols, and certified local guides.'}
					</p>
				</div>

				<!-- Today -->
				<div class="relative">
					<div
						class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-terracotta sm:-left-[47px]">
					</div>
					<span class="font-serif text-xl font-normal text-terracotta">
						{$locale === 'vn' ? 'Hôm nay' : 'Today'}
					</span>
					<h3 class="mt-1 font-serif text-lg font-medium text-stone-900">
						{$locale === 'vn'
							? 'Đồng hành cùng mọi hành trình'
							: 'Your Trusted Companion in the Highlands'}
					</h3>
					<p class="mt-2 text-sm font-light leading-relaxed text-stone-600 sm:max-w-3xl">
						{$locale === 'vn'
							? 'Đội ngũ hơn 7 hướng dẫn viên bản địa am hiểu từng ngóc ngách, phục vụ hàng trăm đoàn khách quốc tế và trong nước với chất lượng cao nhất.'
							: 'A dedicated team of local guides bringing you unforgettable, tailor-made adventures across Dak Lak.'}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Team Section -->
	<section class="border-t border-stone-200/80 bg-stone-100/60 py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-12 max-w-2xl">
				<span class="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
					02 / People
				</span>
				<h2 class="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">
					{$locale === 'vn' ? 'Đội ngũ hướng dẫn viên & điều hành' : 'Our Team & Local Guides'}
				</h2>
				<p class="mt-3 text-sm font-light leading-relaxed text-stone-600">
					{$locale === 'vn'
						? 'Những người con sinh ra và gắn bó với Tây Nguyên — am hiểu sâu sắc văn hoá và con người nơi đây.'
						: 'Native guides who grew up with the land, passionate about sharing their culture.'}
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<!-- Member 1 -->
				<div class="border border-stone-200 bg-white p-6 transition-all hover:border-stone-400">
					<div
						class="flex h-12 w-12 items-center justify-center bg-stone-900 font-serif text-lg font-medium text-stone-100">
						YT
					</div>
					<h3 class="mt-4 font-serif text-lg font-medium text-stone-900">Y Thịnh Ê Ban</h3>
					<span class="mt-1 block text-xs font-medium uppercase tracking-wider text-terracotta">
						{$locale === 'vn' ? 'HDV Văn hoá & Buôn làng' : 'Culture & Village Guide'}
					</span>
					<p class="mt-3 text-xs font-light leading-relaxed text-stone-600">
						{$locale === 'vn'
							? 'Người M’nông, thông thạo tiếng Ê Đê, am hiểu sâu về phong tục tập quán và âm vang cồng chiêng.'
							: 'M’nong native, fluent in ethnic languages, expert on indigenous traditions and gong music.'}
					</p>
				</div>

				<!-- Member 2 -->
				<div class="border border-stone-200 bg-white p-6 transition-all hover:border-stone-400">
					<div
						class="flex h-12 w-12 items-center justify-center bg-stone-900 font-serif text-lg font-medium text-stone-100">
						TN
					</div>
					<h3 class="mt-4 font-serif text-lg font-medium text-stone-900">Trần Hoài Nam</h3>
					<span class="mt-1 block text-xs font-medium uppercase tracking-wider text-terracotta">
						{$locale === 'vn' ? 'Đồng sáng lập & Điều phối tour' : 'Co-Founder & Operations'}
					</span>
					<p class="mt-3 text-xs font-light leading-relaxed text-stone-600">
						{$locale === 'vn'
							? 'Hơn 10 năm gắn bó với nông nghiệp cà phê đặc sản trước khi phát triển các tour du lịch sinh thái bản địa.'
							: '10+ years working with specialty coffee farms before crafting sustainable eco-tours.'}
					</p>
				</div>

				<!-- Member 3 -->
				<div class="border border-stone-200 bg-white p-6 transition-all hover:border-stone-400">
					<div
						class="flex h-12 w-12 items-center justify-center bg-stone-900 font-serif text-lg font-medium text-stone-100">
						HL
					</div>
					<h3 class="mt-4 font-serif text-lg font-medium text-stone-900">H’Linh Niê</h3>
					<span class="mt-1 block text-xs font-medium uppercase tracking-wider text-terracotta">
						{$locale === 'vn' ? 'HDV Thiên nhiên & Trekking' : 'Eco-Trek & Nature Guide'}
					</span>
					<p class="mt-3 text-xs font-light leading-relaxed text-stone-600">
						{$locale === 'vn'
							? 'Nhiều năm kinh nghiệm trekking tại Yok Đôn, nhiệt huyết và tận tình hướng dẫn an toàn cho từng đoàn khách.'
							: 'Years of jungle experience in Yok Don, passionate about wildlife conservation and trekking safety.'}
					</p>
				</div>

				<!-- Member 4 -->
				<div class="border border-stone-200 bg-white p-6 transition-all hover:border-stone-400">
					<div
						class="flex h-12 w-12 items-center justify-center bg-stone-900 font-serif text-lg font-medium text-stone-100">
						LD
					</div>
					<h3 class="mt-4 font-serif text-lg font-medium text-stone-900">Lê Anh Dũng</h3>
					<span class="mt-1 block text-xs font-medium uppercase tracking-wider text-terracotta">
						{$locale === 'vn' ? 'Hậu cần & Hỗ trợ khách hàng' : 'Logistics & Support'}
					</span>
					<p class="mt-3 text-xs font-light leading-relaxed text-stone-600">
						{$locale === 'vn'
							? 'Phụ trách sắp xếp phương tiện di chuyển, chỗ ở và phản hồi tư vấn nhanh chóng cho du khách 24/7.'
							: 'Coordinates logistics, transport, accommodations, and prompt guest support 24/7.'}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Legal & Commitment Section -->
	<section class="py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
				<div class="lg:col-span-6">
					<span class="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
						03 / Trust & Legal
					</span>
					<h2 class="font-serif text-2xl font-normal text-stone-900 sm:text-3xl">
						{$locale === 'vn'
							? 'Pháp lý minh bạch & Cam kết chất lượng'
							: 'Legal Licensing & Commitments'}
					</h2>
					<div class="mt-8 space-y-6 text-sm text-stone-600">
						<div class="flex items-start gap-4">
							<div class="mt-1 h-2 w-2 rounded-full bg-terracotta"></div>
							<div>
								<h4 class="font-medium text-stone-900">
									{$locale === 'vn'
										? 'Giấy phép lữ hành nội địa chính thức'
										: 'Licensed Tour Operator'}
								</h4>
								<p class="mt-1 text-xs font-light leading-relaxed">
									{$locale === 'vn'
										? 'Được cấp phép bởi Sở Du lịch tỉnh Đắk Lắk, hoạt động tuân thủ nghiêm ngặt Luật Du lịch Việt Nam.'
										: 'Registered under Dak Lak Tourism Authority, strictly compliant with national tourism laws.'}
								</p>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="mt-1 h-2 w-2 rounded-full bg-terracotta"></div>
							<div>
								<h4 class="font-medium text-stone-900">
									{$locale === 'vn'
										? 'Bảo hiểm du lịch đầy đủ cho mọi du khách'
										: 'Comprehensive Travel Insurance'}
								</h4>
								<p class="mt-1 text-xs font-light leading-relaxed">
									{$locale === 'vn'
										? 'Mọi hành khách tham gia tour đều được áp dụng bảo hiểm du lịch tự động với quyền lợi tối đa.'
										: 'All guests are automatically covered by comprehensive domestic travel insurance.'}
								</p>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="mt-1 h-2 w-2 rounded-full bg-terracotta"></div>
							<div>
								<h4 class="font-medium text-stone-900">
									{$locale === 'vn'
										? 'Trách nhiệm với cộng đồng & môi trường'
										: 'Sustainable & Respectful Tourism'}
								</h4>
								<p class="mt-1 text-xs font-light leading-relaxed">
									{$locale === 'vn'
										? 'Cam kết chia sẻ lợi nhuận công bằng cho bà con buôn làng và bảo vệ thiên nhiên bản địa.'
										: 'Directly benefiting indigenous communities and practicing Leave No Trace eco-principles.'}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Legal Info Card -->
				<div class="lg:col-span-6">
					<div class="border border-stone-200 bg-white p-8">
						<h3 class="font-serif text-lg font-medium text-stone-900">
							{$locale === 'vn' ? 'Thông tin đăng ký doanh nghiệp' : 'Company Registration'}
						</h3>
						<div class="mt-6 divide-y divide-stone-200 text-xs text-stone-700">
							<div class="flex justify-between py-3">
								<span class="text-stone-400"
									>{$locale === 'vn' ? 'Tên doanh nghiệp' : 'Company Name'}</span>
								<span class="font-medium text-stone-900">CHD Travel Agency</span>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-stone-400"
									>{$locale === 'vn' ? 'Trụ sở chính' : 'Headquarters'}</span>
								<span class="font-medium text-stone-900"
									>09 Nguyễn Bính, TP. Buôn Ma Thuột, Đắk Lắk</span>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-stone-400">{$locale === 'vn' ? 'Hotline' : 'Hotline'}</span>
								<span class="font-medium text-stone-900">0262 396 68 68</span>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-stone-400">Email</span>
								<span class="font-medium text-stone-900">info@chdtravel.com</span>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-stone-400"
									>{$locale === 'vn' ? 'Loại hình dịch vụ' : 'Services'}</span>
								<span class="font-medium text-stone-900"
									>Day Tours, Highland Expeditions, Custom Travel</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Call To Action Band -->
	<section class="border-t border-stone-200/80 bg-stone-900 py-16 text-center text-white">
		<div class="mx-auto max-w-4xl px-6">
			<h2 class="font-serif text-2xl font-normal sm:text-3xl">
				{$locale === 'vn'
					? 'Bạn muốn đồng hành cùng chúng tôi trên hành trình Tây Nguyên?'
					: 'Ready to experience the authentic Central Highlands with us?'}
			</h2>
			<p
				class="mx-auto mt-4 max-w-2xl text-xs font-light leading-relaxed text-stone-400 sm:text-sm">
				{$locale === 'vn'
					? 'Hãy liên hệ ngay để nhận tư vấn lịch trình riêng hoặc giải đáp mọi thắc mắc về chuyến đi.'
					: 'Reach out to our local team for custom itineraries and personalized travel advice.'}
			</p>
			<div class="mt-8 flex justify-center gap-4">
				<a
					href={`/${$locale}/contact`}
					class="bg-terracotta px-8 py-4 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#8e4c38]">
					{$LL.nav_bar.contact()}
				</a>
			</div>
		</div>
	</section>
</div>

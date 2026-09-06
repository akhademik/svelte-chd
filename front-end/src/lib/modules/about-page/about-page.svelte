<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { locale } from '$i18n/i18n-svelte'
</script>

<div class="space-y-16 pb-20">
	<!-- Hero Section -->
	<section class="border-border/80 bg-surface border-b py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
				<div class="lg:col-span-7">
					<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-secondary">
						{$locale === 'vn'
							? 'Về chúng tôi — CHD Travel'
							: $locale === 'fr'
								? 'À propos de nous — CHD Travel'
								: 'About Us — CHD Travel'}
					</span>
					<h1
						class="text-foreground font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
						{$locale === 'vn'
							? 'Khám phá Tây Nguyên nguyên bản cùng những người con đất đỏ'
							: $locale === 'fr'
								? 'Découvrez les Hauts Plateaux authentiques avec des passionnés locaux'
								: 'Discover the Authentic Central Highlands with Local Explorers'}
					</h1>
					<p class="text-foreground-muted mt-6 text-base font-light leading-relaxed sm:text-lg">
						{$locale === 'vn'
							? 'Ra đời từ tình yêu sâu đậm với vùng đất bazan đại ngàn và khát vọng mang vẻ đẹp đích thực của Tây Nguyên đến với bạn bè bốn phương, CHD Travel tự hào là đơn vị lữ hành tiên phong trong các hành trình trải nghiệm thiên nhiên nguyên sơ, văn hóa bản địa chân thực và du lịch bền vững có trách nhiệm.'
							: $locale === 'fr'
								? 'Né d’une passion profonde pour la terre de basalte et le désir de partager la beauté authentique des Hauts Plateaux, CHD Travel est un pionnier des voyages immersifs, de la culture indigène vivante et de l’éco-tourisme responsable.'
								: 'Born from a deep love for the red basalt soil and a passion to share the pristine beauty of the Central Highlands, CHD Travel pioneers authentic journeys, indigenous cultural immersion, and responsible, ethical tourism.'}
					</p>
				</div>

				<!-- Hero Visual Card / Philosophy -->
				<div class="relative lg:col-span-5">
					<div
						class="border-border bg-inverse text-inverse-foreground overflow-hidden border p-8 shadow-xl sm:p-10">
						<span class="text-xs uppercase tracking-widest text-secondary"
							>CHD Travel Philosophy</span>
						<blockquote
							class="text-inverse-foreground mt-4 font-serif text-xl font-normal italic leading-relaxed">
							"Go local — See local — Eat local"
						</blockquote>
						<p class="text-inverse-foreground/80 mt-4 text-xs font-light leading-relaxed">
							{$locale === 'vn'
								? 'Chúng tôi tin rằng du lịch không chỉ là đặt chân đến một địa danh, mà là sự thấu hiểu và kết nối: kết nối giữa con người với thiên nhiên, giữa các nền văn hóa, và giữa lữ khách với nhịp thở mộc mạc của buôn làng.'
								: $locale === 'fr'
									? 'Le voyage n’est pas seulement une destination, mais une connexion intime entre l’humain, la nature sauvage et la vie simple des villages traditionnels.'
									: 'Travel is more than visiting a place — it is a genuine connection between people, wild nature, and the rhythmic heartbeat of indigenous villages.'}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Difference / Pillars Section -->
	<section class="mx-auto max-w-6xl px-6">
		<div class="mb-10">
			<h2 class="text-foreground font-serif text-2xl font-normal sm:text-3xl">
				{$locale === 'vn'
					? 'Điều gì làm nên sự khác biệt tại CHD Travel?'
					: $locale === 'fr'
						? 'Ce qui fait la différence chez CHD Travel'
						: 'What Sets CHD Travel Apart?'}
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			<!-- Pillar 1 -->
			<div class="border-border bg-surface border p-6 sm:p-8">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
					<span class="text-lg">🗣️</span>
				</div>
				<h3 class="text-foreground mt-5 font-serif text-lg font-medium">
					{$locale === 'vn'
						? 'Chuyên môn & Đa ngôn ngữ'
						: $locale === 'fr'
							? 'Expertise & Multilingue'
							: 'Multilingual & Deep Insight'}
				</h3>
				<p class="text-foreground-muted mt-3 text-xs font-light leading-relaxed sm:text-sm">
					{$locale === 'vn'
						? 'Thông thạo tiếng Anh và tiếng Pháp chuẩn xác, am hiểu tâm lý lữ khách quốc tế cùng phong tục tập quán các buôn làng Ê-đê, M’Nông.'
						: $locale === 'fr'
							? 'Maîtrise fluide du français et de l’anglais, compréhension approfondie des voyageurs internationaux et des traditions des ethnies Ede et M’nong.'
							: 'Fluent in English and French, with deep understanding of international travel styles and indigenous ethnic heritage.'}
				</p>
			</div>

			<!-- Pillar 2 -->
			<div class="border-border bg-surface border p-6 sm:p-8">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
					<span class="text-lg">✨</span>
				</div>
				<h3 class="text-foreground mt-5 font-serif text-lg font-medium">
					{$locale === 'vn'
						? 'Linh hoạt & Tận tâm'
						: $locale === 'fr'
							? 'Sur Mesure & Dévoué'
							: 'Tailor-Made & Flexible'}
				</h3>
				<p class="text-foreground-muted mt-3 text-xs font-light leading-relaxed sm:text-sm">
					{$locale === 'vn'
						? 'Không bán các tour công nghiệp đóng gói sẵn; mỗi hành trình đều được may đo tinh chỉnh theo sở thích, sức khỏe và thời gian riêng của bạn.'
						: $locale === 'fr'
							? 'Aucun forfait industriel standardisé. Chaque circuit est conçu sur mesure selon vos préférences, votre rythme et votre temps.'
							: 'No rigid industrial packages. We handcraft and personalize each itinerary to suit your pace, fitness, and specific interests.'}
				</p>
			</div>

			<!-- Pillar 3 -->
			<div class="border-border bg-surface border p-6 sm:p-8">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
					<span class="text-lg">🐘</span>
				</div>
				<h3 class="text-foreground mt-5 font-serif text-lg font-medium">
					{$locale === 'vn'
						? 'Bền vững & Đạo đức'
						: $locale === 'fr'
							? 'Éthique & Durable'
							: 'Ethical & Eco-Conscious'}
				</h3>
				<p class="text-foreground-muted mt-3 text-xs font-light leading-relaxed sm:text-sm">
					{$locale === 'vn'
						? 'Mô hình trải nghiệm thân thiện với động vật (chăm sóc, tắm cùng voi thay vì cưỡi voi), thăm nông trại cà phê bền vững và hỗ trợ sinh kế bản địa.'
						: $locale === 'fr'
							? 'Expériences éthiques et respectueuses des éléphants (soins et baignades sans monte), fermes de café durables et soutien direct aux communautés locales.'
							: 'Pioneering ethical wildlife interactions (elephant care over riding), organic coffee & cacao farm tours, and supporting local livelihood.'}
				</p>
			</div>
		</div>
	</section>

	<!-- Team Section (Founders & Key Personnel) -->
	<section class="border-border bg-surface/60 border-t py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="mb-12 max-w-2xl">
				<h2 class="text-foreground font-serif text-2xl font-normal sm:text-3xl">
					{$locale === 'vn'
						? 'Đội ngũ sáng lập & điều hành'
						: $locale === 'fr'
							? 'Équipe Fondatrice & Direction'
							: 'Founding Team & Tour Leaders'}
				</h2>
				<p class="text-foreground-muted mt-3 text-sm font-light leading-relaxed">
					{$locale === 'vn'
						? 'Đằng sau mỗi chuyến đi đáng nhớ của bạn là sự đồng hành trực tiếp từ bộ ba sáng lập tâm huyết — những người đã đưa CHD Travel trở thành một trong những cái tên được yêu mến hàng đầu trên TripAdvisor.'
						: $locale === 'fr'
							? 'Derrière chaque voyage inoubliable se trouve l’engagement direct de notre trio fondateur — chaleureusement salué par les voyageurs du monde entier sur TripAdvisor.'
							: 'Behind every memorable expedition is our dedicated founding trio — acclaimed by travelers worldwide on TripAdvisor for their passion, warmth, and expertise.'}
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
				<!-- Member 1: Mr Đức Lê -->
				<div
					class="border-border bg-surface hover:border-border-strong flex h-full flex-col border p-6 transition-all sm:p-8">
					<div
						class="bg-inverse text-inverse-foreground flex h-14 w-14 items-center justify-center font-serif text-lg font-medium">
						ĐL
					</div>
					<h3 class="text-foreground mt-5 font-serif text-xl font-medium">Đức Lê (Mr. Duc)</h3>
					<span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-secondary">
						{$locale === 'vn'
							? 'Nhà Sáng Lập & Giám Đốc Điều Hành'
							: $locale === 'fr'
								? 'Fondateur & Directeur Général'
								: 'Founder & Managing Director'}
					</span>
					<p class="text-foreground-muted mt-3 flex-1 text-xs font-light leading-relaxed">
						{$locale === 'vn'
							? 'Với tầm nhìn chiến lược và bề dày kinh nghiệm lữ hành, anh Đức là người kết nối mạng lưới cộng đồng, nghiên cứu văn hóa và thiết kế các tuyến tour độc bản. Phong thái điềm đạm, khả năng giao tiếp song ngữ Anh – Pháp mượt mà cùng mạng lưới quan hệ sâu rộng với giới nghiên cứu và các nông hộ cà phê bản địa mang lại những góc nhìn vừa học thuật vừa sống động.'
							: $locale === 'fr'
								? 'Fondateur et stratège de CHD Travel, il conçoit des itinéraires exclusifs grâce à sa maîtrise de l’anglais et du français, ses recherches culturelles và ses liens étroits avec les producteurs de café locaux.'
								: 'Leading strategic vision and unique route design. His seamless bilingual fluency (EN/FR) and deep network with indigenous coffee growers bring profound cultural insight to every journey.'}
					</p>
					<div class="border-border mt-6 border-t pt-4">
						<div class="mb-2 text-[11px] font-medium text-secondary">
							{$locale === 'vn'
								? 'Khách công ty & B2B'
								: $locale === 'fr'
									? 'Groupes & Entreprises (B2B)'
									: 'Corporate & Groups (B2B)'}
						</div>
						<div class="flex flex-wrap items-center justify-between gap-3">
							<a
								href="tel:0913471352"
								class="text-foreground inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-secondary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5 text-secondary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									><path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									></path
									></svg>
								<span>0913.471.352</span>
							</a>
							<div class="flex items-center gap-1.5">
								<a
									href="https://wa.me/84913471352"
									target="_blank"
									rel="noopener noreferrer"
									title="WhatsApp: 0913.471.352"
									aria-label="WhatsApp Mr. Đức"
									class="border-border bg-surface text-foreground-muted inline-flex h-7 items-center justify-center border px-2 text-[10px] font-semibold transition-all hover:border-secondary hover:bg-secondary hover:text-white">
									WhatsApp
								</a>
								<a
									href="https://zalo.me/0913471352"
									target="_blank"
									rel="noopener noreferrer"
									title="Zalo: 0913.471.352"
									aria-label="Zalo Mr. Đức"
									class="border-border bg-surface text-foreground-muted inline-flex h-7 items-center justify-center border px-2 text-[10px] font-semibold transition-all hover:border-secondary hover:bg-secondary hover:text-white">
									Zalo
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Member 2: Mr Độ Hoàng -->
				<div
					class="border-border bg-surface hover:border-border-strong flex h-full flex-col border p-6 transition-all sm:p-8">
					<div
						class="bg-inverse text-inverse-foreground flex h-14 w-14 items-center justify-center font-serif text-lg font-medium">
						ĐH
					</div>
					<h3 class="text-foreground mt-5 font-serif text-xl font-medium">Độ Hoàng (Mr. Do)</h3>
					<span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-secondary">
						{$locale === 'vn'
							? 'Đồng Sáng Lập & HDV Tiếng Pháp'
							: $locale === 'fr'
								? 'Co-fondateur & Guide Francophone'
								: 'Co-Founder & French-Speaking Guide'}
					</span>
					<p class="text-foreground-muted mt-3 flex-1 text-xs font-light leading-relaxed">
						{$locale === 'vn'
							? 'Gương mặt "vàng" được đông đảo du khách Pháp và quốc tế ngợi ca trên TripAdvisor. Với năng lượng tích cực, sự dí dỏm và kiến thức bản địa như một cuốn từ điển sống, anh Độ biến mỗi cung đường trekking, chèo thuyền vượt thác hay chuyến thăm buôn làng thành một câu chuyện lôi cuốn và gắn kết.'
							: $locale === 'fr'
								? 'Guide vedette plébiscité par les voyageurs francophones sur TripAdvisor. Énergique et chaleureux, il transforme chaque trek, descente en rivière et immersion villageoise en une histoire captivante.'
								: 'Highly acclaimed on TripAdvisor by international travelers. With boundless energy, wit, and encyclopedia-level local knowledge, he turns every trek, rafting trip, and village visit into an inspiring story.'}
					</p>
					<div class="border-border mt-6 border-t pt-4">
						<div class="mb-2 text-[11px] font-medium text-secondary">
							{$locale === 'vn'
								? 'Khách lẻ tiếng Pháp (FIT)'
								: $locale === 'fr'
									? 'Voyageurs Francophones (FIT)'
									: 'French-Speaking Travelers (FIT)'}
						</div>
						<div class="flex flex-wrap items-center justify-between gap-3">
							<a
								href="tel:0905413303"
								class="text-foreground inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-secondary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5 text-secondary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									><path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									></path
									></svg>
								<span>0905.413.303</span>
							</a>
							<div class="flex items-center gap-1.5">
								<a
									href="https://wa.me/84905413303"
									target="_blank"
									rel="noopener noreferrer"
									title="WhatsApp: 0905.413.303"
									aria-label="WhatsApp Mr. Do"
									class="border-border bg-surface text-foreground-muted inline-flex h-7 items-center justify-center border px-2 text-[10px] font-semibold transition-all hover:border-secondary hover:bg-secondary hover:text-white">
									WhatsApp
								</a>
								<a
									href="https://zalo.me/0905413303"
									target="_blank"
									rel="noopener noreferrer"
									title="Zalo: 0905.413.303"
									aria-label="Zalo Mr. Do"
									class="border-border bg-surface text-foreground-muted inline-flex h-7 items-center justify-center border px-2 text-[10px] font-semibold transition-all hover:border-secondary hover:bg-secondary hover:text-white">
									Zalo
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Member 3: Mr Hạ Trần -->
				<div
					class="border-border bg-surface hover:border-border-strong flex h-full flex-col border p-6 transition-all sm:p-8">
					<div
						class="bg-inverse text-inverse-foreground flex h-14 w-14 items-center justify-center font-serif text-lg font-medium">
						HT
					</div>
					<h3 class="text-foreground mt-5 font-serif text-xl font-medium">Hạ Trần (Mr. Ha)</h3>
					<span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-secondary">
						{$locale === 'vn'
							? 'Đồng Sáng Lập & HDV Tiếng Anh'
							: $locale === 'fr'
								? 'Co-fondateur & Guide Anglophone'
								: 'Co-Founder & English-Speaking Guide'}
					</span>
					<p class="text-foreground-muted mt-3 flex-1 text-xs font-light leading-relaxed">
						{$locale === 'vn'
							? 'Được mệnh danh là "người giải quyết vấn đề" đầy tinh tế và tận tâm từ trái tim. Anh Hạ đặc biệt ghi dấu ấn với du khách quốc tế nhờ khả năng tiếng Anh xuất sắc, sự chu đáo tối đa trong từng khâu tổ chức, và là người dẫn dắt các tour trải nghiệm voi thân thiện đầy cảm xúc tại Hồ Lắk.'
							: $locale === 'fr'
								? 'Reconnu pour son dévouement absolu et sa bienveillance. Maîtrisant parfaitement l’anglais, il orchestre les détails logistiques và guide les immersions éthiques auprès des éléphants du Lac Lak.'
								: 'The attentive "problem-solver" beloved for his heartfelt care and excellent English. Masterfully organizing logistics and leading unforgettable ethical elephant encounters around Lak Lake.'}
					</p>
					<div class="border-border mt-6 border-t pt-4">
						<div class="mb-2 text-[11px] font-medium text-secondary">
							{$locale === 'vn'
								? 'Khách lẻ tiếng Anh (FIT)'
								: $locale === 'fr'
									? 'Voyageurs Anglophones (FIT)'
									: 'English-Speaking Travelers (FIT)'}
						</div>
						<div class="flex flex-wrap items-center justify-between gap-3">
							<a
								href="tel:0971864864"
								class="text-foreground inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-secondary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5 text-secondary"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									><path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									></path
									></svg>
								<span>0971.864.864</span>
							</a>
							<div class="flex items-center gap-1.5">
								<a
									href="https://wa.me/84971864864"
									target="_blank"
									rel="noopener noreferrer"
									title="WhatsApp: 0971.864.864"
									aria-label="WhatsApp Mr. Ha"
									class="border-border bg-surface text-foreground-muted inline-flex h-7 items-center justify-center border px-2 text-[10px] font-semibold transition-all hover:border-secondary hover:bg-secondary hover:text-white">
									WhatsApp
								</a>
								<a
									href="https://zalo.me/0971864864"
									target="_blank"
									rel="noopener noreferrer"
									title="Zalo: 0971.864.864"
									aria-label="Zalo Mr. Ha"
									class="border-border bg-surface text-foreground-muted inline-flex h-7 items-center justify-center border px-2 text-[10px] font-semibold transition-all hover:border-secondary hover:bg-secondary hover:text-white">
									Zalo
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Legal & Company Information Section -->
	<section class="py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="border-border bg-surface border p-8 sm:p-12">
				<div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
					<!-- Left: Core Commitments -->
					<div class="lg:col-span-6">
						<span class="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-secondary">
							{$locale === 'vn'
								? 'Pháp lý & Cam kết'
								: $locale === 'fr'
									? 'Légalité & Engagements'
									: 'Legal & Commitments'}
						</span>
						<h2 class="text-foreground font-serif text-2xl font-normal sm:text-3xl">
							{$locale === 'vn'
								? 'Pháp lý minh bạch & Cam kết chất lượng'
								: $locale === 'fr'
									? 'Légalité Transparente & Engagements'
									: 'Transparent Licensing & Commitments'}
						</h2>
						<div class="text-foreground-muted mt-8 space-y-6 text-sm">
							<div class="flex items-start gap-3.5">
								<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary"></div>
								<div>
									<h4 class="text-foreground font-medium">
										{$locale === 'vn'
											? 'Doanh nghiệp lữ hành chính thống'
											: $locale === 'fr'
												? 'Opérateur de Voyage Officiel'
												: 'Licensed Tour Operator'}
									</h4>
									<p class="mt-1 text-xs font-light leading-relaxed">
										{$locale === 'vn'
											? 'Công ty TNHH Dịch vụ Du lịch Khám phá Tây Nguyên (CHD TRAVEL Co., Ltd) hoạt động tuân thủ nghiêm ngặt Luật Du lịch Việt Nam.'
											: $locale === 'fr'
												? 'Central Highlands Discovery Travel Co., Ltd opère en stricte conformité avec la loi vietnamienne sur le tourisme.'
												: 'Central Highlands Discovery Travel Co., Ltd is registered and operates in strict compliance with Vietnamese tourism law.'}
									</p>
								</div>
							</div>

							<div class="flex items-start gap-3.5">
								<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary"></div>
								<div>
									<h4 class="text-foreground font-medium">
										{$locale === 'vn'
											? 'Bảo hiểm du lịch đầy đủ & An toàn tối đa'
											: $locale === 'fr'
												? 'Assurance Voyage Complète & Sécurité'
												: 'Comprehensive Travel Insurance & Safety'}
									</h4>
									<p class="mt-1 text-xs font-light leading-relaxed">
										{$locale === 'vn'
											? 'Mọi hành khách tham gia tour đều được bảo đảm quy trình an toàn và áp dụng bảo hiểm du lịch với quyền lợi tốt nhất.'
											: $locale === 'fr'
												? 'Tous les participants bénéficient de protocoles de sécurité stricts et d’une assurance voyage complète.'
												: 'All guests are protected by strict safety procedures and comprehensive travel insurance coverage.'}
									</p>
								</div>
							</div>

							<div class="flex items-start gap-3.5">
								<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary"></div>
								<div>
									<h4 class="text-foreground font-medium">
										{$locale === 'vn'
											? 'Trách nhiệm với cộng đồng & Môi trường'
											: $locale === 'fr'
												? 'Tourisme Responsable & Écologique'
												: 'Sustainable & Respectful Tourism'}
									</h4>
									<p class="mt-1 text-xs font-light leading-relaxed">
										{$locale === 'vn'
											? 'Góp phần bảo tồn cảnh quan, gìn giữ văn hóa truyền thống và chia sẻ giá trị kinh tế trực tiếp đến bà con buôn làng.'
											: $locale === 'fr'
												? 'Soutien direct aux communautés ethniques locales et préservation active du patrimoine naturel et culturel.'
												: 'Directly supporting indigenous ethnic communities and actively protecting natural ecology.'}
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Right: Company Registration Details -->
					<div
						class="border-border flex flex-col justify-between border-t pt-8 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
						<div>
							<span
								class="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-secondary">
								{$locale === 'vn'
									? 'Hồ sơ pháp lý'
									: $locale === 'fr'
										? 'Détails Juridiques'
										: 'Registration Details'}
							</span>
							<h3 class="text-foreground font-serif text-2xl font-normal sm:text-3xl">
								{$locale === 'vn'
									? 'Thông tin doanh nghiệp'
									: $locale === 'fr'
										? 'Informations sur l’Entreprise'
										: 'Company Information'}
							</h3>
							<div class="divide-border text-foreground mt-6 divide-y text-xs">
								<div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
									<span class="text-foreground-subtle"
										>{$locale === 'vn'
											? 'Tên doanh nghiệp'
											: $locale === 'fr'
												? 'Nom de la Société'
												: 'Company Name'}</span>
									<span class="text-foreground font-medium sm:text-right"
										>Công ty TNHH Dịch vụ Du lịch Khám phá Tây Nguyên<br />
										<span class="text-foreground-muted text-[11px] font-normal"
											>Central Highlands Discovery Travel Co., Ltd</span>
									</span>
								</div>
								<div class="flex justify-between py-3">
									<span class="text-foreground-subtle"
										>{$locale === 'vn'
											? 'Mã số doanh nghiệp (MST)'
											: $locale === 'fr'
												? 'N° d’enregistrement'
												: 'Business Registration No.'}</span>
									<span class="text-foreground font-medium">6001577023</span>
								</div>
								<div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
									<span class="text-foreground-subtle"
										>{$locale === 'vn'
											? 'Giấy phép lữ hành quốc tế'
											: $locale === 'fr'
												? 'Licence Tour Opérateur'
												: 'International Tour License'}</span>
									<span class="text-foreground font-medium sm:text-right"
										>66-007/2017/TCDL-GP LHQT</span>
								</div>
								<div class="flex justify-between py-3">
									<span class="text-foreground-subtle"
										>{$locale === 'vn'
											? 'Ban điều hành'
											: $locale === 'fr'
												? 'Direction'
												: 'Management'}</span>
									<span class="text-foreground font-medium">Mr Đức Lê (Director)</span>
								</div>
								<div class="flex justify-between py-3">
									<span class="text-foreground-subtle"
										>{$locale === 'vn' ? 'Hotline điều hành' : 'Hotline'}</span>
									<a
										href="tel:0913471352"
										class="text-foreground font-medium transition-colors hover:text-secondary"
										>0913.471.352</a>
								</div>
								<div class="flex justify-between py-3">
									<span class="text-foreground-subtle">Email</span>
									<a
										href="mailto:info@chdtravel.com"
										class="text-foreground font-medium transition-colors hover:text-secondary"
										>info@chdtravel.com</a>
								</div>
								<div class="flex justify-between py-3">
									<span class="text-foreground-subtle"
										>{$locale === 'vn'
											? 'Loại hình dịch vụ'
											: $locale === 'fr'
												? 'Services'
												: 'Services'}</span>
									<span class="text-foreground font-medium"
										>Day Tours, Highland Tours, Eco-Tours, Custom Travel</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Call To Action Band -->
	<section class="border-border/80 bg-inverse border-t py-16 text-center text-white">
		<div class="mx-auto max-w-4xl px-6">
			<blockquote
				class="text-inverse-foreground/90 mx-auto mb-6 max-w-3xl font-serif text-lg font-light italic leading-relaxed sm:text-xl">
				{$locale === 'vn'
					? '“Đến với CHD Travel, bạn không đơn thuần là một du khách, bạn là người bạn tri kỷ cùng chúng tôi bước vào không gian đại ngàn chân thực và giàu cảm hứng nhất.”'
					: $locale === 'fr'
						? '« Avec CHD Travel, vous n’êtes pas seulement un visiteur, mais un compagnon privilégié qui s’immerge dans l’âme authentique et inspirante des Hauts Plateaux. »'
						: '“With CHD Travel, you are not merely a visitor — you are a kindred companion joining us on an authentic and deeply inspiring journey into the heart of the Highlands.”'}
			</blockquote>
			<p
				class="text-inverse-foreground/75 mx-auto mt-2 max-w-2xl text-xs font-light leading-relaxed sm:text-sm">
				{$locale === 'vn'
					? 'Hãy liên hệ ngay để nhận tư vấn lịch trình riêng hoặc cùng chúng tôi thiết kế chuyến đi của bạn.'
					: $locale === 'fr'
						? 'Contactez notre équipe fondatrice pour concevoir votre itinéraire sur mesure.'
						: 'Reach out to our founding team for custom itineraries and personalized travel advice.'}
			</p>
			<div class="mt-8 flex justify-center gap-4">
				<a
					href={`/${$locale}/contact`}
					class="hover:bg-secondary-hover bg-secondary px-8 py-4 text-xs font-medium uppercase tracking-widest text-white transition-colors">
					{$LL.nav_bar.contact()}
				</a>
			</div>
		</div>
	</section>
</div>

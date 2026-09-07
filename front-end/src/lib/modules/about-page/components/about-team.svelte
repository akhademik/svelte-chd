<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<section class="border-t border-border bg-surface/60 py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mb-12 max-w-2xl">
			<h2 class="font-serif text-2xl font-normal text-foreground sm:text-3xl">
				{$LL.about_page.team.title()}
			</h2>
			<p class="mt-3 text-sm font-light leading-relaxed text-foreground-muted">
				{$LL.about_page.team.subtitle()}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			<!-- Member 1: Mr Đức Lê -->
			<div
				class="flex h-full flex-col border border-border bg-surface p-6 transition-all hover:border-border-strong sm:p-8">
				<div
					class="flex h-14 w-14 items-center justify-center bg-inverse font-serif text-lg font-medium text-inverse-foreground">
					ĐL
				</div>
				<h3 class="mt-5 font-serif text-xl font-medium text-foreground">Đức Lê (Mr. Duc)</h3>
				<span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-secondary">
					{$LL.about_page.team.member_1_role()}
				</span>
				<p class="mt-3 flex-1 text-xs font-light leading-relaxed text-foreground-muted">
					{$LL.about_page.team.member_1_desc()}
				</p>
				<div class="mt-6 border-t border-border pt-4">
					<div class="mb-2 text-[11px] font-medium text-secondary">
						{$LL.about_page.team.member_1_tag()}
					</div>
					<div class="flex flex-wrap items-center justify-between gap-2.5">
						<a
							href="tel:0913471352"
							class="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3.5 w-3.5 text-secondary"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2">
								<path
									d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
								></path>
							</svg>
							<span>0913.471.352</span>
						</a>
						<div class="flex items-center gap-1.5">
							<a
								href="https://wa.me/84913471352"
								target="_blank"
								rel="noopener noreferrer"
								title="WhatsApp: 0913.471.352"
								aria-label="WhatsApp Mr. Đức"
								class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
								WhatsApp
							</a>
							<a
								href="https://zalo.me/0913471352"
								target="_blank"
								rel="noopener noreferrer"
								title="Zalo: 0913.471.352"
								aria-label="Zalo Mr. Đức"
								class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
								Zalo
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Member 2: Mr Độ Hoàng -->
			<div
				class="flex h-full flex-col border border-border bg-surface p-6 transition-all hover:border-border-strong sm:p-8">
				<div
					class="flex h-14 w-14 items-center justify-center bg-inverse font-serif text-lg font-medium text-inverse-foreground">
					ĐH
				</div>
				<h3 class="mt-5 font-serif text-xl font-medium text-foreground">Độ Hoàng (Mr. Do)</h3>
				<span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-secondary">
					{$LL.about_page.team.member_2_role()}
				</span>
				<p class="mt-3 flex-1 text-xs font-light leading-relaxed text-foreground-muted">
					{$LL.about_page.team.member_2_desc()}
				</p>
				<div class="mt-6 border-t border-border pt-4">
					<div class="mb-2 text-[11px] font-medium text-secondary">
						{$LL.about_page.team.member_2_tag()}
					</div>
					<div class="flex flex-wrap items-center justify-between gap-2.5">
						<a
							href="tel:0905413303"
							class="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3.5 w-3.5 text-secondary"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2">
								<path
									d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
								></path>
							</svg>
							<span>0905.413.303</span>
						</a>
						<div class="flex items-center gap-1.5">
							<a
								href="https://wa.me/84905413303"
								target="_blank"
								rel="noopener noreferrer"
								title="WhatsApp: 0905.413.303"
								aria-label="WhatsApp Mr. Do"
								class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
								WhatsApp
							</a>
							<a
								href="https://zalo.me/0905413303"
								target="_blank"
								rel="noopener noreferrer"
								title="Zalo: 0905.413.303"
								aria-label="Zalo Mr. Do"
								class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
								Zalo
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Member 3: Mr Hạ Trần -->
			<div
				class="flex h-full flex-col border border-border bg-surface p-6 transition-all hover:border-border-strong sm:p-8">
				<div
					class="flex h-14 w-14 items-center justify-center bg-inverse font-serif text-lg font-medium text-inverse-foreground">
					HT
				</div>
				<h3 class="mt-5 font-serif text-xl font-medium text-foreground">Hạ Trần (Mr. Ha)</h3>
				<span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-secondary">
					{$LL.about_page.team.member_3_role()}
				</span>
				<p class="mt-3 flex-1 text-xs font-light leading-relaxed text-foreground-muted">
					{$LL.about_page.team.member_3_desc()}
				</p>
				<div class="mt-6 border-t border-border pt-4">
					<div class="mb-2 text-[11px] font-medium text-secondary">
						{$LL.about_page.team.member_3_tag()}
					</div>
					<div class="flex flex-wrap items-center justify-between gap-2.5">
						<a
							href="tel:0971864864"
							class="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-secondary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3.5 w-3.5 text-secondary"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2">
								<path
									d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
								></path>
							</svg>
							<span>0971.864.864</span>
						</a>
						<div class="flex items-center gap-1.5">
							<a
								href="https://wa.me/84971864864"
								target="_blank"
								rel="noopener noreferrer"
								title="WhatsApp: 0971.864.864"
								aria-label="WhatsApp Mr. Ha"
								class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
								WhatsApp
							</a>
							<a
								href="https://zalo.me/0971864864"
								target="_blank"
								rel="noopener noreferrer"
								title="Zalo: 0971.864.864"
								aria-label="Zalo Mr. Ha"
								class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
								Zalo
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

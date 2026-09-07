<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<section class="py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-6">
		<div class="border border-border bg-surface p-8 sm:p-12">
			<div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
				<!-- Left: Core Commitments -->
				<div class="lg:col-span-6">
					<span class="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-secondary">
						{$LL.about_page.legal.subtitle()}
					</span>
					<h2 class="font-serif text-2xl font-normal text-foreground sm:text-3xl">
						{$LL.about_page.legal.title()}
					</h2>
					<div class="mt-8 space-y-6 text-sm text-foreground-muted">
						<div class="flex items-start gap-3.5">
							<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary"></div>
							<div>
								<h4 class="font-medium text-foreground">
									{$LL.about_page.legal.commitment_1_title()}
								</h4>
								<p class="mt-1 text-xs font-light leading-relaxed">
									{$LL.about_page.legal.commitment_1_desc()}
								</p>
							</div>
						</div>

						<div class="flex items-start gap-3.5">
							<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary"></div>
							<div>
								<h4 class="font-medium text-foreground">
									{$LL.about_page.legal.commitment_2_title()}
								</h4>
								<p class="mt-1 text-xs font-light leading-relaxed">
									{$LL.about_page.legal.commitment_2_desc()}
								</p>
							</div>
						</div>

						<div class="flex items-start gap-3.5">
							<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary"></div>
							<div>
								<h4 class="font-medium text-foreground">
									{$LL.about_page.legal.commitment_3_title()}
								</h4>
								<p class="mt-1 text-xs font-light leading-relaxed">
									{$LL.about_page.legal.commitment_3_desc()}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Right: Company Registration Details -->
				<div
					class="flex flex-col justify-between border-t border-border pt-8 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
					<div>
						<span class="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-secondary">
							{$LL.about_page.legal.reg_subtitle()}
						</span>
						<h3 class="font-serif text-2xl font-normal text-foreground sm:text-3xl">
							{$LL.about_page.legal.reg_title()}
						</h3>
						<div class="mt-6 divide-y divide-border text-xs text-foreground">
							<div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
								<span class="text-foreground-subtle">
									{$LL.about_page.legal.company_name_label()}
								</span>
								<span class="font-medium text-foreground sm:text-right">
									{$LL.about_page.legal.company_name_vn()}<br />
									<span class="text-[11px] font-normal text-foreground-muted">
										{$LL.about_page.legal.company_name_en()}
									</span>
								</span>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-foreground-subtle">
									{$LL.about_page.legal.tax_id_label()}
								</span>
								<span class="font-medium text-foreground">
									{$LL.about_page.legal.tax_id()}
								</span>
							</div>
							<div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
								<span class="text-foreground-subtle">
									{$LL.about_page.legal.license_label()}
								</span>
								<span class="font-medium text-foreground sm:text-right">
									{$LL.about_page.legal.license_no()}
								</span>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-foreground-subtle">
									{$LL.about_page.legal.management_label()}
								</span>
								<span class="font-medium text-foreground">
									{$LL.about_page.legal.management_val()}
								</span>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-foreground-subtle">
									{$LL.about_page.legal.hotline_label()}
								</span>
								<a
									href={`tel:${$LL.about_page.legal.hotline_val().replaceAll('.', '')}`}
									class="font-medium text-foreground transition-colors hover:text-secondary">
									{$LL.about_page.legal.hotline_val()}
								</a>
							</div>
							<div class="flex justify-between py-3">
								<span class="text-foreground-subtle">
									{$LL.about_page.legal.email_label()}
								</span>
								<a
									href={`mailto:${$LL.about_page.legal.email_val()}`}
									class="font-medium text-foreground transition-colors hover:text-secondary">
									{$LL.about_page.legal.email_val()}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

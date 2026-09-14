<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
	<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
		{$LL.tours.good_to_know.title()}
	</h2>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">🌤</span>
				<h4>{$LL.tours.good_to_know.season_title()}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{$LL.tours.good_to_know.season_desc()}
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">🎒</span>
				<h4>{$LL.tours.good_to_know.packing_title()}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{$LL.tours.good_to_know.packing_desc()}
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">🚐</span>
				<h4>{$LL.tours.good_to_know.pickup_title()}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{$LL.tours.good_to_know.pickup_desc()}
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">🥗</span>
				<h4>{$LL.tours.good_to_know.diet_title()}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{$LL.tours.good_to_know.diet_desc()}
			</p>
		</div>
	</div>
</div>

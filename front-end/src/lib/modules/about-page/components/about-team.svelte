<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import AboutTeamMember, { type TeamMember } from './about-team-member.svelte'

	const teamMembers = $derived<TeamMember[]>([
		{
			initials: 'ĐL',
			name: 'Đức Lê (Mr. Duc)',
			role: $LL.about_page.team.member_1_role(),
			desc: $LL.about_page.team.member_1_desc(),
			tag: $LL.about_page.team.member_1_tag(),
			phone: '0913471352',
			phoneDisplay: '0913.471.352',
			whatsapp: '84913471352',
			zalo: '0913471352',
		},
		{
			initials: 'ĐH',
			name: 'Độ Hoàng (Mr. Do)',
			role: $LL.about_page.team.member_2_role(),
			desc: $LL.about_page.team.member_2_desc(),
			tag: $LL.about_page.team.member_2_tag(),
			phone: '0905413303',
			phoneDisplay: '0905.413.303',
			whatsapp: '84905413303',
			zalo: '0905413303',
		},
		{
			initials: 'HT',
			name: 'Hạ Trần (Mr. Ha)',
			role: $LL.about_page.team.member_3_role(),
			desc: $LL.about_page.team.member_3_desc(),
			tag: $LL.about_page.team.member_3_tag(),
			phone: '0971864864',
			phoneDisplay: '0971.864.864',
			whatsapp: '84971864864',
			zalo: '0971864864',
		},
	])
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
			{#each teamMembers as member (member.name)}
				<AboutTeamMember {member} />
			{/each}
		</div>
	</div>
</section>

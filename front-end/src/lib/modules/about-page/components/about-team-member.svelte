<script lang="ts">
	export interface TeamMember {
		initials: string
		name: string
		role: string
		desc: string
		tag: string
		phone: string
		phoneDisplay: string
		whatsapp: string
		zalo: string
	}

	interface Props {
		member: TeamMember
	}

	let { member }: Props = $props()
</script>

<div
	class="flex h-full flex-col border border-border bg-surface p-6 transition-all hover:border-border-strong sm:p-8">
	<div
		class="flex h-14 w-14 items-center justify-center bg-inverse font-serif text-lg font-medium text-inverse-foreground">
		{member.initials}
	</div>
	<h3 class="mt-5 font-serif text-xl font-medium text-foreground">{member.name}</h3>
	<span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-secondary">
		{member.role}
	</span>
	<p class="mt-3 flex-1 text-xs font-light leading-relaxed text-foreground-muted">
		{member.desc}
	</p>
	<div class="mt-6 border-t border-border pt-4">
		<div class="mb-2 text-[11px] font-medium text-secondary">
			{member.tag}
		</div>
		<div class="flex flex-wrap items-center justify-between gap-2.5">
			<a
				href={`tel:${member.phone}`}
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
				<span>{member.phoneDisplay}</span>
			</a>
			<div class="flex items-center gap-1.5">
				<a
					href={`https://wa.me/${member.whatsapp}`}
					target="_blank"
					rel="noopener noreferrer"
					title={`WhatsApp: ${member.phoneDisplay}`}
					aria-label={`WhatsApp ${member.name}`}
					class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
					WhatsApp
				</a>
				<a
					href={`https://zalo.me/${member.zalo}`}
					target="_blank"
					rel="noopener noreferrer"
					title={`Zalo: ${member.phoneDisplay}`}
					aria-label={`Zalo ${member.name}`}
					class="inline-flex h-7 items-center justify-center border border-border bg-surface px-2 text-[10px] font-semibold text-foreground-muted transition-all hover:border-secondary hover:bg-secondary hover:text-white">
					Zalo
				</a>
			</div>
		</div>
	</div>
</div>

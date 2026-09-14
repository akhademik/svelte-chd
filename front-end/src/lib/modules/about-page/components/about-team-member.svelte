<script lang="ts">
	import { IconPhone } from '$lib/icons'
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
				<IconPhone class="h-3.5 w-3.5 text-secondary" />
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

<script lang="ts">
	import text_bg from '$assets/imgs/text-bg.png'
	import LL from '$i18n/i18n-svelte'
	import { onMount } from 'svelte'

	let headline: HTMLElement

	const moving_background = (event: MouseEvent, _headline: HTMLElement) => {
		if (_headline != null) {
			const _sensitivity = 80
			const _offset = 40

			const _hlf_scr_width = window.innerWidth / 2
			const _hlf_scr_height = window.innerHeight / 2
			const _x_mouse_position = event.pageX
			const _y_mouse_position = event.pageY

			const _x_movement = (_hlf_scr_width - _x_mouse_position) / _sensitivity
			const _y_movement = (_hlf_scr_height - _y_mouse_position) / _sensitivity

			_headline.style.backgroundPosition = `${_offset + _x_movement}% ${_offset + _y_movement}%`
		}
	}

	onMount(() => {
		document.addEventListener('mousemove', mouse_event => moving_background(mouse_event, headline))

		return () => {
			document.removeEventListener('mousemove', mouse_event =>
				moving_background(mouse_event, headline)
			)
		}
	})
</script>

<p
	bind:this={headline}
	style={`background-image: url(${text_bg})`}
	class="flex flex-col bg-clip-text bg-center bg-no-repeat py-2 text-center font-figtree text-[10vmin] font-bold uppercase leading-none tracking-wide text-transparent [transition:font-size_700ms] sm:text-[12vmin] md:text-[7vmin]">
	<span>{$LL.home_page.h_land()}</span>
	<span>{$LL.home_page.expert()}</span>
</p>

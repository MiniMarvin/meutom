<!-- Reference: https://svelte.dev/playground/a363db348ba4485d965c5b5464428a73?version=3.31.2 -->
<script lang="ts" generics="T">
	import Siema from 'siema';
	import type { Snippet } from 'svelte';

	type Props = {
		elements: T[];
		perPage?: number | Record<string, number>;
		loop?: boolean;
		autoplay?: number;
		duration?: number;
		easing?: string;
		startIndex?: number;
		draggable?: boolean;
		multipleDrag?: boolean;
		dots?: boolean;
		controls?: boolean;
		threshold?: number;
		rtl?: boolean;
		onchange?: (detail: { currentSlide: number; slideCount: number }) => void;
		factory: Snippet<[{ item: T }]>;
		leftControl: Snippet;
		rightControl: Snippet;
	};

	let {
		elements = [],
		perPage = 3,
		loop = true,
		autoplay = 0,
		duration = 200,
		easing = 'ease-out',
		startIndex = 0,
		draggable = true,
		multipleDrag = true,
		dots = true,
		controls = true,
		threshold = 20,
		rtl = false,
		onchange,
		factory,
		leftControl,
		rightControl
	}: Props = $props();

	function rotateMath(i: number) {
		return (i + elements.length) % elements.length;
	}

	let currentIndex = $state(startIndex);

	let siema: HTMLDivElement;
	let controller: Siema | undefined = $state();
	let timer: NodeJS.Timeout;

	const currentPerPage = $derived(controller ? controller.perPage : Number(perPage));
	const totalDots = $derived(
		controller ? Math.ceil(controller.innerElements.length / currentPerPage) : 0
	);

	$effect(() => {
		controller = new Siema({
			selector: siema,
			perPage: typeof perPage === 'object' ? perPage : Number(perPage),
			loop,
			duration,
			easing,
			startIndex: rotateMath(startIndex - 1),
			draggable,
			multipleDrag,
			threshold,
			rtl,
			onChange: handleChange
		});

		if (autoplay) {
			timer = setInterval(right, autoplay);
		}

		return () => {
			autoplay && clearInterval(timer);
			controller.destroy();
		};
	});

	export function left() {
		controller?.prev();
	}

	export function right() {
		controller?.next();
	}

	export function go(index: number) {
		controller?.goTo(index);
	}

	export function pause() {
		clearInterval(timer);
	}

	export function resume() {
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}

	function handleChange() {
		currentIndex = rotateMath(controller!.currentSlide + 1);
		console.log({
			baseIndex: controller!.currentSlide,
			currentIndex,
			l: controller!.innerElements.length
		});

		onchange?.({
			currentSlide: controller!.currentSlide,
			slideCount: controller!.innerElements.length
		});
	}

	function resetInterval(node, condition) {
		function handleReset(event) {
			pause();
			resume();
		}

		if (condition) {
			node.addEventListener('click', handleReset);
		}

		return {
			destroy() {
				node.removeEventListener('click', handleReset);
			}
		};
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="carousel">
	<div class="slides" bind:this={siema}>
		{#each elements as element, index}
			<div class="item-container">
				{@render factory?.({ item: element })}
			</div>
		{/each}
	</div>
	{#if controls}
		<button class="left" onclick={left} use:resetInterval={autoplay} aria-label="left">
			{@render leftControl?.()}
		</button>
		<button class="right" onclick={right} use:resetInterval={autoplay} aria-label="right">
			{@render rightControl?.()}
		</button>
	{/if}
	{#if dots}
		<ul>
			{#each { length: totalDots } as _, i}
				{@const isActive =
					currentIndex >= i * currentPerPage && currentIndex < i * currentPerPage + currentPerPage}
				<li class:active={isActive}>
					<button
						onclick={() => go(i * currentPerPage)}
						use:resetInterval={autoplay}
						aria-label={`go to slide ${i + 1}`}
						aria-current={isActive}
					></button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;
		mask: linear-gradient(to right, transparent, black, black, black, black, transparent);
		backdrop-filter: blur(8px);
	}

	button {
		position: absolute;
		width: 40px;
		height: 40px;
		top: 50%;
		z-index: 50;
		margin-top: -20px;
		border: none;
		background-color: transparent;
	}
	button:focus {
		outline: none;
	}

	.left {
		left: 2vw;
	}

	.right {
		right: 2vw;
	}
	ul {
		list-style-type: none;
		position: absolute;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -30px;
		padding: 0;
	}
	ul li {
		margin: 6px;
		border-radius: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		height: 8px;
		width: 8px;
	}
	ul li:hover {
		background-color: rgba(255, 255, 255, 0.85);
	}
	ul li.active {
		background-color: rgba(255, 255, 255, 1);
	}
	ul li button {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		border-radius: 100%;
	}
	ul li button:focus {
		outline-offset: 2px;
	}

	.item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>

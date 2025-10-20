<!-- Reference: https://stackoverflow.com/questions/33451683/pen-highlighter-effect-in-css -->
<script lang="ts">
	import type { Color } from 'src/types';
	import type { Snippet } from 'svelte';

	const props: {
		markerColor: Color;
		children?: Snippet;
	} & HTMLSpanElement = $props();
</script>

<span
	style={`font-weight: bolder;
		background:
			linear-gradient(
				104deg,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0) 0.9%,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 1.25) 2.4%,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0.5) 5.8%,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0.1) 93%,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0.7) 96%,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0) 98%
			),
			linear-gradient(
				183deg,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0) 0%,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0.3) 7.9%,
				rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0) 15%
			);
		padding: 0.3em 10px;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
		margin: 0;
		border-radius: 7.5px;
		text-shadow:
			-12px 12px 9.8px rgba(${props.markerColor.r}, ${props.markerColor.g}, ${props.markerColor.b}, 0.7),
			12px -12.1px 7.3px rgba(255, 255, 255, 1),
			-12.1px -27.3px 30px rgba(255, 255, 255, 1); ${props.style}`}
>
	{@render props.children?.()}
</span>

<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ImageSelector from '$lib/removebg/ImageSelector.svelte';

	const { Story } = defineMeta({
		title: 'Components/ImageSelector',
		component: ImageSelector,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<div class="story-wrapper">
		<ImageSelector id="storybook-image-selector"></ImageSelector>
	</div>
</Story>

<style>
	.story-wrapper {
		font-family: sans-serif;
		padding: 2rem;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

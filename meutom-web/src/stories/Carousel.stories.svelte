<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Carousel from '$lib/clothe-selector/Carousel.svelte';

	const { Story } = defineMeta({
		title: 'Components/Carousel',
		component: Carousel,
		tags: ['autodocs'],
		argTypes: {
			width: { control: 'text' },
			height: { control: 'text' }
		},
		render: template
	});

	let item = 2;
</script>

{#snippet template(args)}
	{@const colors = ['red', 'green', 'blue', 'orange', 'purple']}
	<div class="story-wrapper">
		<Carousel {...args.props} dots={false} scroll={true} elements={colors}>
			{#snippet factory(data)}
				<div
					style="background-color: {data.item}; width:160px; height:160px; border-radius:12px"
				></div>
			{/snippet}
		</Carousel>
	</div>
{/snippet}

<Story
	name="Default"
	args={{
		props: {
			width: '100%',
			height: '220px'
		}
	}}
/>

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

<script>
	export let data;
</script>

<div class="layout-container">
	<slot />
	<div class="post-navigation">
		{#if data.previousPost}
			<a href={data.previousPost.link} class="prev-post">← Post Anterior</a>
		{/if}
		{#if data.nextPost}
			<a href={data.nextPost.link} class="next-post">Próximo Post →</a>
		{/if}
	</div>
</div>

<style>
	.layout-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Garante que o layout ocupe toda a altura da página */
		justify-content: space-between; /* Mantém o conteúdo e a navegação no fim */
	}

	.post-navigation {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
	}

	.post-navigation a {
		color: var(--primary-deep-purple);
		font-weight: bold;
		text-decoration: none;
	}

	.post-navigation a:hover {
		text-decoration: underline;
	}
</style>

<!-- Reference: https://svelte.dev/playground/b17c13d4f1bb40799ccf09e0841ddd90?version=5.41.4 -->
<script>
	import ImageSelector from 'src/lib/removebg/ImageSelector.svelte';
</script>

<div class="container">
	<h1>Deixar Imagem Transparente</h1>
	<ImageSelector id="transparentfy"></ImageSelector>
</div>

<style>
	.container {
		padding: 20px;
	}

	h1 {
		width: 100%;
		text-align: center;
	}
</style>

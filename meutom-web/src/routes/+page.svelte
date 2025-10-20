<script>
	import TextMarkerHightlight from 'src/lib/text-marker-hightlight.svelte';
	import background from '$lib/assets/background.png?enhanced';

	TextMarkerHightlight;
</script>

<section class="head">
	<enhanced:img
		src={background}
		alt="duas pessoas com seus looks olhando para frente"
		width="100%"
		class="top"
	></enhanced:img>
	<div class="center">
		<div class="centered">
			<h1>Digitalize seu guarda roupas!</h1>
			<h3>
				Monte looks com as peças que você tem e encontre roupas de brechós com facilidade, <TextMarkerHightlight
					markerColor={{ r: 255, g: 176, b: 209 }}
				>
					compre suas peças com o novo look em mente!
				</TextMarkerHightlight>
			</h3>
		</div>
	</div>
</section>

<style>
	h1,
	h3 {
		color: white;
	}

	h1 {
		font-size: calc(max(4vw, 36px));
		text-align: center;
	}

	h3 {
		padding: 0px 0px;
		margin: 14px 0px;
		text-align: center;
	}

	.top {
		top: 0;
		max-width: 100vw;
		max-height: 100%;
		width: 100%;
		object-fit: cover;
		position: absolute;
		z-index: -1;
		filter: blur(2px);
	}

	.center {
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.centered {
		max-width: 800px;
		padding-bottom: 80px;
	}

	.head {
		/* max-height: 50vh; */
		overflow: hidden;
		position: relative;
		background-color: #333;
		z-index: -2;
	}
</style>

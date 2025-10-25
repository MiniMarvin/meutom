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
			<h1 class="title">Digitalize seu guarda roupas!</h1>
			<h3 class="subtitle">
				Monte looks com as peças que você tem e encontre roupas de brechós com facilidade, <TextMarkerHightlight
					markerColor={{ r: 255, g: 176, b: 209 }}
				>
					compre suas peças com o novo look em mente!
				</TextMarkerHightlight>
			</h3>
		</div>
	</div>
</section>
<section class="showcase">
	<div class="center">
		<div class="centered">
			<div class="split-screen">
				<div class="split-left">
					<h1>E como isso funciona?</h1>
					<p>
						Primeiro você <TextMarkerHightlight markerColor={{ r: 255, g: 176, b: 209 }}>
							digitaliza suas roupas
						</TextMarkerHightlight>, com uma foto mesmo, e adiciona as informações sobre ela como.
						Vamos precisar saber se é uma calça, uma camisa, sapato ou acessório. Depois que tudo
						estiver digitalizado certinho, você consegue <TextMarkerHightlight
							markerColor={{ r: 255, g: 176, b: 209 }}
						>
							montar os looks com um seletor digital
						</TextMarkerHightlight> super simples! Mas pra que falar muito? Testa aí!
					</p>
				</div>
				<div class="split-right"></div>
			</div>
		</div>
	</div>
</section>

<style>
	.title,
	.subtitle {
		color: white;
	}

	.title {
		font-size: calc(max(4vw, 36px));
		text-align: center;
	}

	.subtitle {
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
		overflow: hidden;
		position: relative;
		background-color: #333;
		z-index: -2;
		padding: 0px;
	}

	section {
		padding: 12px;
	}

	.split-screen {
		display: flex;
		flex-direction: row;
	}

	.split-left {
		max-width: 320px;
	}

	.split-right {
		width: 100%;
	}

	@media (max-width: 800px) {
		.split-left {
			width: 100%;
		}
		.split-screen {
			flex-direction: column;
		}
	}
</style>

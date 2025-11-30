<script>
	import { browser } from '$app/environment';
	import Card, { Content } from '@smui/card';
	import Button from '@smui/button';
	import Carousel from 'svelte-carousel';
	import Hero from '$lib/assets/hero.png?enhanced';
	import Blog1 from '$lib/assets/blog 1.png?enhanced';
	import Blog2 from '$lib/assets/blog 2.png?enhanced';
	import Blog3 from '$lib/assets/blog 3.png?enhanced';
	import TryOut1 from '$lib/assets/try out 1.png?enhanced';
	import TryOut2 from '$lib/assets/try out 2.png?enhanced';
	import TryOut3 from '$lib/assets/try out 3.png?enhanced';

	let carousel;

	console.log(Hero);

	const carouselItems = [
		{
			src: TryOut1,
			alt: 'Upcycling'
		},
		{
			src: TryOut2,
			alt: 'Swapping'
		},
		{
			src: TryOut3,
			alt: 'Thrifting'
		}
	];
</script>

<svelte:head>
	<title>Meu Tom - Seu guarda-roupa digital</title>
	<meta
		name="description"
		content="Digitalize seu guarda-roupa, crie looks incríveis e conecte-se com a moda sustentável em Belo Horizonte."
	/>
</svelte:head>

<div class="page-wrapper">
	<!-- Hero Section -->
	<section class="hero" style={`background-image: url('${Hero.img.src}');`}>
		<div class="hero-content">
			<h1>Seu guarda-roupa, reinventado.</h1>
			<p>
				Com Meu Tom, você digitaliza suas peças, cria looks incríveis e entra no mundo da moda
				circular.
			</p>
			<Button
				href="https://docs.google.com/forms/d/e/1FAIpQLSdx_IFhlR53VD7CuQXo79_X3v2HnO4Q_Z-NWt7YlOamVW6WQA/viewform?usp=dialog"
				variant="raised"
				target="_blank">Quero fazer parte!</Button
			>
		</div>
	</section>

	<!-- How it Works Section -->
	<section class="how-it-works">
		<h2>Como funciona?</h2>
		<div class="steps">
			<div class="step">
				<div class="step-icon">1</div>
				<h3>Digitalize suas peças</h3>
				<p>Tire fotos das suas roupas e envie para o app. Nós cuidamos do resto!</p>
			</div>
			<div class="step">
				<div class="step-icon">2</div>
				<h3>Crie looks</h3>
				<p>Combine suas peças e crie looks para qualquer ocasião.</p>
			</div>
			<div class="step">
				<div class="step-icon">3</div>
				<h3>Conecte-se</h3>
				<p>Contrate stylists, troque peças e faça parte da comunidade.</p>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="features">
		<h2>Funcionalidades</h2>
		<div class="feature-cards">
			<Card class="feature-card">
				<Content>
					<div class="card-icon">📱</div>
					<h3>Guarda-roupa Digital</h3>
					<p>Tenha seu guarda-roupa na palma da sua mão. Acesse suas peças de qualquer lugar.</p>
				</Content>
			</Card>
			<Card class="feature-card">
				<Content>
					<div class="card-icon">✨</div>
					<h3>Personal Stylist</h3>
					<p>
						Receba ajuda de profissionais para montar looks e fazer a digitalização inicial do seu
						closet.
					</p>
				</Content>
			</Card>
			<Card class="feature-card">
				<Content>
					<div class="card-icon">♻️</div>
					<h3>Troca de Peças</h3>
					<p>
						Dê uma nova vida para as suas roupas! Troque com outras pessoas da comunidade com
						segurança.
					</p>
				</Content>
			</Card>
			<Card class="feature-card">
				<Content>
					<div class="card-icon">📅</div>
					<h3>Crie Coleções</h3>
					<p>Organize seus looks em coleções e planeje o que vestir na semana.</p>
				</Content>
			</Card>
		</div>
	</section>

	<!-- Try it out Section -->
	<section class="try-it-out">
		<h2>Experimente</h2>
		<div class="carousel-wrapper">
			{#if browser}
				<Carousel {carouselItems} bind:this={carousel}>
					{#each carouselItems as item}
						<div class="carousel-item">
							<enhanced:img
								src={item.src}
								alt={item.alt}
								sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
							/>
						</div>
					{/each}
				</Carousel>
			{/if}
		</div>
	</section>

	<!-- Blog Section -->
	<section class="blog">
		<h2>Fique por dentro</h2>
		<div class="blog-posts">
			<div class="post-card">
				<enhanced:img
					src={Blog1}
					alt="Dicas de moda sustentável"
					sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
				/>
				<h3>Dicas de moda sustentável para o dia a dia</h3>
				<p>Pequenas mudanças que fazem uma grande diferença para o planeta e para o seu estilo.</p>
				<a href="/blog/dicas-moda-sustentavel">Leia mais</a>
			</div>
			<div class="post-card">
				<enhanced:img
					src={Blog2}
					alt="Guarda-roupa cápsula"
					sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
				/>
				<h3>Como montar um guarda-roupa cápsula</h3>
				<p>Menos peças, mais looks. Aprenda a montar um guarda-roupa versátil e funcional.</p>
				<a href="/blog/guarda-roupa-capsula">Leia mais</a>
			</div>
			<div class="post-card">
				<enhanced:img
					src={Blog3}
					alt="Moda circular em BH"
					sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
				/>
				<h3>A história da moda circular em BH</h3>
				<p>Conheça os brechós e iniciativas que estão transformando a cena da moda em BH.</p>
				<a href="/blog/moda-circular-bh">Leia mais</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer">
		<div class="footer-content">
			<p>&copy; 2025 Meu Tom. Todos os direitos reservados.</p>
			<div class="social-links">
				<a href="https://www.instagram.com/meutom.app" target="_blank">Instagram</a>
				<a href="https://www.instagram.com/meutom.app" target="_blank">TikTok</a>
				<a href="https://www.instagram.com/meutom.app" target="_blank">Pinterest</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.page-wrapper {
		background-color: var(--background-main);
		color: var(--text-dark);
		font-family: 'Varela Round', sans-serif;
	}

	h1,
	h2,
	h3 {
		font-family: 'Quicksand', sans-serif;
		font-weight: bold;
	}

	section {
		padding: 4rem 2rem;
		text-align: center; /* Default for mobile */
	}

	.hero {
		/* background-image: url('{Hero.src}'); */
		background-size: cover;
		background-position: center;
		color: var(--text-dark);
		padding: 8rem 2rem;
		min-height: 400px;
		border-radius: 24px;
		display: flex; /* Make hero a flex container */
		align-items: center; /* Vertically center content */
		justify-content: flex-start; /* Align content to the start (left) */
		width: 100%;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: left; /* Align text left for hero content */
		/* Define text highlight variables here, scoped to .hero-content */
		--hero-highlight-r: 249; /* R of #f9f8f2 (light background in light mode) */
		--hero-highlight-g: 248; /* G of #f9f8f2 */
		--hero-highlight-b: 242; /* B of #f9f8f2 */
		width: 100%;
	}

	html[data-theme='dark'] .hero-content {
		--hero-highlight-r: 51; /* R of #333333 (dark background in dark mode) */
		--hero-highlight-g: 51; /* G of #333333 */
		--hero-highlight-b: 51; /* B of #333333 */
	}

	@media (min-width: 801px) {
		.hero-content {
			margin-left: 0; /* Align to the left on desktop */
			margin-right: auto;
		}
	}

	.hero h1 {
		font-size: 3.5rem;
		margin-bottom: 1rem;
		width: 100%;
	}

	.hero p {
		font-size: 1.25rem;
		margin-bottom: 2rem;
	}

	@media (max-width: 800px) {
		.hero-content h1,
		.hero-content p {
			background-color: rgba(
				var(--hero-highlight-r),
				var(--hero-highlight-g),
				var(--hero-highlight-b),
				0.7
			);
			padding: 0.2em 0.5em;
			border-radius: 0.2em;
			display: inline-block; /* To make padding work */
			line-height: 1.3; /* Adjust line height for better appearance with background */
			-webkit-box-decoration-break: clone; /* For multi-line text highlight */
			box-decoration-break: clone;
		}
	}

	.how-it-works h2 {
		color: var(--primary-deep-purple);
	}

	.steps {
		display: flex;
		justify-content: space-around;
		gap: 2rem;
		margin-top: 3rem;
	}

	.step {
		max-width: 300px;
	}

	.step-icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: var(--action-mint-green);
		color: var(--primary-deep-purple);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0 auto 1rem;
	}

	.features {
		background-color: var(--accent-sand);
	}

	.features h2 {
		color: var(--primary-deep-purple);
	}

	.feature-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.feature-card {
		background-color: var(--background-main);
		border-radius: 24px;
	}

	.try-it-out h2 {
		color: var(--primary-deep-purple);
	}

	.carousel-wrapper {
		max-width: 800px;
		margin: 3rem auto 0;
	}
	img {
		height: auto;
	}

	.carousel-item img {
		width: 100%;
		border-radius: 24px;
	}

	.blog h2 {
		color: var(--primary-deep-purple);
	}

	.blog-posts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.post-card {
		background-color: var(--accent-sand);
		border-radius: 24px;
		overflow: hidden;
		text-align: left;
	}

	.post-card img {
		width: 100%;
	}

	.post-card h3,
	.post-card p,
	.post-card a {
		padding: 0 1.5rem;
	}

	.post-card a {
		display: inline-block;
		margin: 1rem 1.5rem;
		color: var(--primary-deep-purple);
		font-weight: bold;
	}

	.footer {
		background-color: var(--primary-deep-purple);
		color: var(--text-light);
		padding: 2rem;
		border-radius: 24px;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.social-links a {
		color: var(--text-light);
		text-decoration: none;
		margin-left: 1rem;
	}

	@media (max-width: 800px) {
		.steps,
		.feature-cards,
		.blog-posts {
			flex-direction: column;
		}

		.footer-content {
			flex-direction: column;
		}

		.social-links {
			margin-top: 1rem;
		}
	}
</style>

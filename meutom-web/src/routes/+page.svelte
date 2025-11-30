<script>
	import { browser } from '$app/environment';
	import Card, { Content } from '@smui/card';
	import Button from '@smui/button';
	import Carousel from 'svelte-carousel';
	// import 'svelte-carousel/dist/svelte-carousel.css'; // Certifique-se de importar o CSS do carrossel
	import Hero from '$lib/assets/hero.png?enhanced';
	import Blog1 from '$lib/assets/blog 1.png?enhanced';
	import Blog2 from '$lib/assets/blog 2.png?enhanced';
	import Blog3 from '$lib/assets/blog 3.png?enhanced';
	import TryOut1 from '$lib/assets/try out 1.png?enhanced';
	import TryOut2 from '$lib/assets/try out 2.png?enhanced';
	import TryOut3 from '$lib/assets/try out 3.png?enhanced';

	let carousel;

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

	const blogPosts = [
		{
			title: 'Dicas de moda sustentável para o dia a dia',
			description:
				'Pequenas mudanças que fazem uma grande diferença para o planeta e para o seu estilo.',
			link: '/blog/dicas-moda-sustentavel',
			image: Blog1
		},
		{
			title: 'Como montar um guarda-roupa cápsula',
			description:
				'Menos peças, mais looks. Aprenda a montar um guarda-roupa versátil e funcional.',
			link: '/blog/guarda-roupa-capsula',
			image: Blog2
		},
		{
			title: 'A história da moda circular em BH',
			description: 'Conheça os brechós e iniciativas que estão transformando a cena da moda em BH.',
			link: '/blog/moda-circular-bh',
			image: Blog3
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
			<div class="hero-entry">
				<h1>Seu guarda-roupa, reinventado</h1>
			</div>
			<div class="hero-entry">
				<p>
					Com Meu Tom, você digitaliza suas peças, cria looks incríveis e entra no mundo da moda
					circular.
				</p>
			</div>
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
				<p>Combine suas peças e crie looks para qualquer ocasião</p>
			</div>
			<div class="step">
				<div class="step-icon">3</div>
				<h3>Conecte-se</h3>
				<p>Contrate stylists, troque peças e faça parte da comunidade</p>
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
					<p>Tenha seu guarda-roupa na palma da sua mão. Acesse suas peças de qualquer lugar</p>
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
					<p>Organize seus looks em coleções e planeje o que vestir na semana</p>
				</Content>
			</Card>
		</div>
	</section>

	<!-- Try it out Section -->
	<section class="try-it-out">
		<h2>Experimente</h2>
		<div class="carousel-wrapper">
			{#if browser}
				<Carousel bind:this={carousel} itemsToShow={1} autoplay={true} autoplaySpeed={3000}>
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
			{#each blogPosts as post}
				<div class="post-card">
					<enhanced:img
						src={post.image}
						alt={post.title}
						sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
					/>
					<h3>{post.title}</h3>
					<p>{post.description}</p>
					<a href={post.link}>Leia mais</a>
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer">
		<div class="footer-content">
			<p>&copy; 2025 Meu Tom. Todos os direitos reservados</p>
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
		color: var(--text-dark); /* Cor padrão para texto */
		padding: 8rem 2rem;
		min-height: 400px;
		border-radius: 24px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: left;
		width: 100%;
		color: var(--text-dark); /* Garante que o texto mantenha a cor no modo claro */
		padding: 1.5rem; /* Adiciona espaçamento interno */
		border-radius: 8px; /* Bordas arredondadas para o fundo */
	}

	@media (prefers-color-scheme: dark) {
		.hero-content {
			color: var(--text-light); /* Ajusta a cor do texto para o modo escuro */
		}
	}

	@media (min-width: 801px) {
		.hero-content {
			margin-left: 0; /* Align to the left on desktop */
			margin-right: auto;
		}
	}

	.hero-entry {
		background-color: rgba(
			248,
			248,
			231,
			0.8
		); /* Fundo escuro com opacidade de 80% no modo escuro */
		border-radius: 1em;
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

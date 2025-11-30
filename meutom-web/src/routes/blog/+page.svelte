<script>
	export let posts = [
		{
			title: 'Dicas de moda sustentável para o dia a dia',
			description:
				'Pequenas mudanças que fazem uma grande diferença para o planeta e para o seu estilo.',
			link: '/blog/dicas-moda-sustentavel',
			image: '/src/lib/assets/blog 1.png?enhanced'
		},
		{
			title: 'Como montar um guarda-roupa cápsula',
			description:
				'Menos peças, mais looks. Aprenda a montar um guarda-roupa versátil e funcional.',
			link: '/blog/guarda-roupa-capsula',
			image: '/src/lib/assets/blog 2.png?enhanced'
		},
		{
			title: 'A história da moda circular em BH',
			description: 'Conheça os brechós e iniciativas que estão transformando a cena da moda em BH.',
			link: '/blog/moda-circular-bh',
			image: '/src/lib/assets/blog 3.png?enhanced'
		}
	];
</script>

<section class="blog-list">
	<h1>Blog</h1>
	<div class="posts">
		{#each posts as post}
			<div class="post-card">
				<img src={post.image} alt={post.title} />
				<h2>{post.title}</h2>
				<p>{post.description}</p>
				<a href={post.link}>Leia mais</a>
			</div>
		{/each}
	</div>
</section>

<style>
	.blog-list {
		padding: 2rem;
	}

	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.post-card {
		background: var(--background-main);
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		text-align: left;
	}

	.post-card img {
		width: 100%;
		border-radius: 8px;
	}

	.post-card h2 {
		margin: 1rem 0 0.5rem;
	}

	.post-card p {
		margin: 0 0 1rem;
	}

	.post-card a {
		color: var(--primary-deep-purple);
		font-weight: bold;
		text-decoration: none;
	}
</style>

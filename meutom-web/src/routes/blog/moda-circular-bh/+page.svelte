<script>
	import Blog3 from '$lib/assets/blog 3.png?enhanced';
	export let title = 'A história da moda circular em BH';
</script>

<article>
	<enhanced:img
		src={Blog3}
		alt="Moda circular em Belo Horizonte"
		class="article-image"
		sizes="(min-width: 1024px) 800px, 100vw"
	/>
	<h1>{title}</h1>
	<p>
		Belo Horizonte tem se destacado como um polo de moda circular, com iniciativas que promovem a
		sustentabilidade e o reaproveitamento de peças. A moda circular, que busca prolongar o ciclo de
		vida das roupas e reduzir o desperdício, é uma resposta ao impacto ambiental causado pelo
		consumismo desenfreado. Segundo a <strong>Ellen MacArthur Foundation</strong>, menos de 1% do
		material usado para produzir roupas é reciclado em novas peças, o que representa uma perda de
		500 bilhões de dólares por ano.
		<small
			><a href="https://www.ellenmacarthurfoundation.org/" target="_blank"
				>Fonte: Ellen MacArthur Foundation</a
			></small
		>
	</p>
	<p>
		Em BH, brechós, feiras de troca e marcas locais têm transformado a forma como consumimos moda.
		Essas iniciativas não apenas promovem a sustentabilidade, mas também fortalecem a economia local
		e incentivam a criatividade na reutilização de peças.
	</p>

	<h2>O que é moda circular?</h2>
	<p>
		A moda circular é um modelo de produção e consumo que prioriza o reaproveitamento de recursos e
		a redução de resíduos. Diferente do modelo linear tradicional (produzir, consumir, descartar), a
		moda circular busca criar um ciclo fechado, onde as roupas são reutilizadas, recicladas ou
		transformadas em novos produtos.
	</p>
	<p>
		Esse conceito está alinhado com os princípios da economia circular, que visam minimizar o
		impacto ambiental e maximizar o uso de recursos. De acordo com a <strong
			>ONU Meio Ambiente</strong
		>, a indústria da moda é responsável por cerca de 20% da poluição global de águas residuais e
		10% das emissões de carbono.
		<small><a href="https://www.unep.org/" target="_blank">Fonte: ONU Meio Ambiente</a></small>
	</p>

	<h2>Iniciativas de moda circular em BH</h2>
	<p>
		Belo Horizonte tem se tornado um exemplo de como a moda circular pode ser implementada na
		prática. Aqui estão algumas das principais iniciativas que estão transformando a cena da moda na
		cidade:
	</p>

	<h3>1. Brechós colaborativos</h3>
	<p>
		Os brechós colaborativos são espaços onde as pessoas podem vender, trocar ou doar roupas. Em BH,
		alguns dos brechós mais conhecidos incluem o <strong>Brechó da Praça</strong> e o
		<strong>Brechó Colaborativo BH</strong>. Esses espaços não apenas incentivam o reaproveitamento
		de peças, mas também criam uma comunidade em torno da moda sustentável.
	</p>

	<h3>2. Feiras de troca</h3>
	<p>
		As feiras de troca são eventos onde as pessoas podem levar roupas que não usam mais e trocá-las
		por outras peças. Em Belo Horizonte, eventos como o <strong>Troca BH</strong> têm ganhado popularidade,
		promovendo o consumo consciente e reduzindo o desperdício.
	</p>

	<h3>3. Marcas locais sustentáveis</h3>
	<p>
		Algumas marcas locais têm adotado práticas sustentáveis, como o uso de tecidos reciclados e a
		produção sob demanda. Exemplos incluem a <strong>Flavia Aranha</strong>, que utiliza tingimentos
		naturais, e a <strong>Insecta Shoes</strong>, que transforma materiais reciclados em calçados
		únicos.
	</p>

	<h2>Como você pode fazer parte do movimento?</h2>
	<p>
		Participar da moda circular em BH é mais fácil do que você imagina. Aqui estão algumas dicas
		para começar:
	</p>
	<ul>
		<li>
			<strong>Visite brechós:</strong> Explore os brechós locais para encontrar peças únicas e acessíveis.
		</li>
		<li>
			<strong>Participe de feiras de troca:</strong> Leve roupas que você não usa mais e troque por outras
			peças.
		</li>
		<li>
			<strong>Doe ou venda suas roupas:</strong> Em vez de descartar roupas, doe para instituições de
			caridade ou venda em plataformas online.
		</li>
		<li>
			<strong>Invista em marcas sustentáveis:</strong> Apoie marcas que adotam práticas éticas e sustentáveis.
		</li>
	</ul>

	<h2>O impacto da moda circular</h2>
	<p>
		A adoção da moda circular pode ter um impacto significativo no meio ambiente e na sociedade. De
		acordo com um relatório da <strong>Global Fashion Agenda</strong>, a implementação de práticas
		circulares na indústria da moda poderia reduzir as emissões de carbono em até 39% até 2030.
		<small
			><a href="https://globalfashionagenda.org/" target="_blank">Fonte: Global Fashion Agenda</a
			></small
		>
	</p>
	<p>
		Além disso, a moda circular promove a inclusão social, criando oportunidades para pequenos
		empreendedores e fortalecendo a economia local. Em Belo Horizonte, isso é evidente no
		crescimento de brechós e marcas independentes que valorizam a criatividade e a sustentabilidade.
	</p>

	<h2>Conclusão</h2>
	<p>
		A moda circular é mais do que uma tendência; é uma necessidade em um mundo onde os recursos são
		finitos e o impacto ambiental da indústria da moda é inegável. Em Belo Horizonte, as iniciativas
		locais mostram que é possível adotar práticas mais sustentáveis e criar um futuro mais
		consciente para a moda.
	</p>
	<p>
		Que tal começar hoje mesmo? Visite um brechó, participe de uma feira de troca ou apoie uma marca
		local sustentável. Cada pequena ação conta para construir um mundo melhor.
	</p>
</article>

<style>
	article {
		padding: 2rem;
		line-height: 1.8;
		font-family: 'Georgia', serif;
		background-color: var(--background-main); /* Suporte para temas */
		color: var(--text-dark); /* Suporte para temas */
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition:
			background-color 0.3s,
			color 0.3s; /* Suavizar transições entre temas */
	}

	article[data-theme='dark'] {
		background-color: var(--background-dark); /* Fundo para modo escuro */
		color: var(--text-light); /* Texto para modo escuro */
	}

	.article-image {
		width: 100%;
		height: auto;
		border-radius: 8px;
		margin-bottom: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Destaque para a imagem */
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		color: var(--primary-dark-blue); /* Ajuste dinâmico para temas */
	}

	h2 {
		font-size: 2rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: var(--primary-green); /* Ajuste dinâmico para temas */
	}

	h3 {
		font-size: 1.5rem;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		color: var(--primary-dark-blue); /* Ajuste dinâmico para temas */
	}

	p {
		margin-bottom: 1.5rem;
	}

	ul {
		margin-left: 1.5rem;
		list-style: disc;
	}

	ul li {
		margin-bottom: 0.5rem;
	}

	strong {
		color: var(--primary-red); /* Ajuste dinâmico para temas */
	}
</style>

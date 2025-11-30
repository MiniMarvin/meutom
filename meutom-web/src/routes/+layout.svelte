<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar">
	<a href="/" class="navbar-logo" use:link>
		<img src={favicon} alt="Home" />
		<span class="navbar-title">meutom</span>
	</a>
</nav>

{@render children?.()}

<style>
	.navbar {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: var(--background-main);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.navbar-logo {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: inherit;
	}

	.navbar-logo img {
		width: 32px;
		height: 32px;
		cursor: pointer;
	}

	.navbar-title {
		margin-left: 0.5rem;
		font-size: 1.25rem;
		font-weight: bold;
		color: var(--primary-deep-purple); /* Cor roxa da paleta */
	}
</style>

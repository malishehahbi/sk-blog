<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		children: import('svelte').Snippet;
		data: {
			categories: { name: string; count: number }[];
		};
	}

	let { children, data }: Props = $props();
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="A minimal, Swiss-design inspired personal blog" />
</svelte:head>

<div class="app">
	<Navbar />
	<main class="main">
		{@render children()}
	</main>
	<Footer categories={data.categories} />
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main {
		flex: 1;
	}
</style>

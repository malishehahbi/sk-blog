<script lang="ts">
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';
	import type { PostSummary } from '$lib/types/post';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	
	const allPosts = data.allPosts as PostSummary[];
	
	let inputValue = $state(
		browser ? (new URL(window.location.href).searchParams.get('q') || '') : ''
	);
	
	let query = $derived(inputValue.trim());
	
	let results = $derived.by(() => {
		if (!query) return [];
		const lowerQuery = query.toLowerCase();
		
		return allPosts.filter((post) => {
			const titleMatch = post.title.toLowerCase().includes(lowerQuery);
			const excerptMatch = post.excerpt?.toLowerCase().includes(lowerQuery);
			const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
			const categoryMatch = post.categories?.some((cat) => cat.toLowerCase().includes(lowerQuery));
			return titleMatch || excerptMatch || tagMatch || categoryMatch;
		});
	});

	$effect(() => {
		if (!browser) return;
		const url = query ? `?q=${encodeURIComponent(query)}` : window.location.pathname;
		pushState(url, {});
	});

	function handleClear() {
		inputValue = '';
	}
</script>

<svelte:head>
	<title>{query ? `Search: ${query}` : 'Search'} - Blog</title>
	<meta name="description" content="Search posts" />
</svelte:head>

<div class="search-page">
	<header class="page-header container container-narrow">
		<h1 class="page-title">Search</h1>
		<div class="search-container">
			<div class="search-form">
				<div class="search-input-wrapper">
					<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.35-4.35" />
					</svg>
					<input
						type="text"
						class="search-input"
						placeholder="Search posts..."
						bind:value={inputValue}
					/>
					{#if inputValue}
						<button type="button" class="clear-btn" onclick={handleClear} aria-label="Clear search">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M18 6 6 18M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<section class="results-section container">
		{#if query}
			<div class="results-header">
				<p class="results-count">
					{#if results.length === 0}
						No results found for "{query}"
					{:else}
						Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
					{/if}
				</p>
			</div>

			{#if results.length > 0}
				<div class="results-grid">
					{#each results as post (post.slug)}
						<PostCard {post} />
					{/each}
				</div>
			{:else}
				<div class="empty-state">
					<p>Try searching for something else.</p>
				</div>
			{/if}
		{:else}
			<div class="empty-state">
				<p>Start typing to search posts.</p>
			</div>
		{/if}
	</section>
</div>

<style>
	.search-page {
		padding: 48px 0;
	}

	.page-header {
		text-align: center;
		margin-bottom: 64px;
	}

	.page-title {
		font-size: 3rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		margin-bottom: 32px;
	}

	.search-container {
		max-width: 600px;
		margin: 0 auto;
	}

	.search-form {
		display: flex;
		gap: 12px;
		width: 100%;
	}

	.search-input-wrapper {
		position: relative;
		flex: 1;
	}

	.search-icon {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		color: var(--color-gray-400);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 14px 48px 14px 48px;
		font-size: 1rem;
		font-family: inherit;
		border: 1px solid var(--color-gray-200);
		background-color: var(--color-white);
		transition: border-color var(--transition-fast);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-black);
	}

	.search-input::placeholder {
		color: var(--color-gray-400);
	}

	.clear-btn {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		padding: 4px;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-gray-400);
		transition: color var(--transition-fast);
	}

	.clear-btn:hover {
		color: var(--color-gray-600);
	}

	.clear-btn svg {
		width: 16px;
		height: 16px;
	}

	.results-header {
		margin-bottom: 32px;
		padding-bottom: 24px;
		border-bottom: 1px solid var(--color-gray-200);
	}

	.results-count {
		font-size: 0.9rem;
		color: var(--color-gray-500);
	}

	.results-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
	}

	.empty-state {
		text-align: center;
		padding: 48px;
		background-color: var(--color-gray-50);
		border: 1px solid var(--color-gray-200);
	}

	.empty-state p {
		color: var(--color-gray-500);
	}

	@media (max-width: 1024px) {
		.results-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.results-grid {
			grid-template-columns: 1fr;
		}

		.page-title {
			font-size: 2rem;
		}
	}
</style>

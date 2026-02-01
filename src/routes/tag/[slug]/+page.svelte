<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { tag, posts } = data;

	// Format tag name
	const tagName = tag.charAt(0).toUpperCase() + tag.slice(1);
</script>

<svelte:head>
	<title>#{tagName} - Blog</title>
	<meta name="description" content={`Browse all posts tagged with ${tagName}`} />
</svelte:head>

<div class="tag-page">
	<header class="page-header container">
		<p class="page-label">Tag</p>
		<h1 class="page-title">#{tagName}</h1>
		<p class="page-count">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
	</header>

	<section class="posts-section container">
		<div class="posts-grid">
			{#each posts as post}
				<PostCard {post} />
			{/each}
		</div>
	</section>
</div>

<style>
	.tag-page {
		padding: 48px 0;
	}

	.page-header {
		text-align: center;
		margin-bottom: 64px;
		padding-bottom: 48px;
		border-bottom: 1px solid var(--color-gray-200);
	}

	.page-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gray-500);
		margin-bottom: 8px;
	}

	.page-title {
		font-size: 3rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		margin-bottom: 12px;
	}

	.page-count {
		font-size: 0.9rem;
		color: var(--color-gray-500);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
	}

	@media (max-width: 1024px) {
		.posts-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.posts-grid {
			grid-template-columns: 1fr;
		}

		.page-title {
			font-size: 2rem;
		}
	}
</style>

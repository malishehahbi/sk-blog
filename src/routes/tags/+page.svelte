<script lang="ts">
	import TagBadge from '$lib/components/TagBadge.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { tags } = data;
</script>

<svelte:head>
	<title>Tags - Blog</title>
	<meta name="description" content="Browse all tags" />
</svelte:head>

<div class="tags-page">
	<header class="page-header container container-narrow">
		<h1 class="page-title">Tags</h1>
		<p class="page-description">Browse posts by tag</p>
	</header>

	<section class="tags-section container container-narrow">
		{#if tags.length === 0}
			<div class="empty-state">
				<p>No tags yet. Add tags to your posts to see them here.</p>
			</div>
		{:else}
			<div class="tags-grid">
				{#each tags as tag}
					<TagBadge name={tag.name} count={tag.count} type="tag" />
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.tags-page {
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
		margin-bottom: 12px;
	}

	.page-description {
		font-size: 1.1rem;
		color: var(--color-gray-500);
	}

	.tags-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
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

	@media (max-width: 640px) {
		.page-title {
			font-size: 2rem;
		}
	}
</style>

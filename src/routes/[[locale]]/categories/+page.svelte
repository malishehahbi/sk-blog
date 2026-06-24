<script lang="ts">
	import { t } from '$lib/useT.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { categories } = data;
</script>

<svelte:head>
	<title>{t('Categories - Blog')}</title>
	<meta name="description" content={t('Browse all categories')} />
</svelte:head>

<div class="categories-page">
	<header class="page-header container container-narrow">
		<h1 class="page-title">Categories</h1>
		<p class="page-description">{t('Browse posts by category')}</p>
	</header>

	<section class="categories-section container container-narrow">
		{#if categories.length === 0}
			<div class="empty-state">
				<p>{t('No categories yet. Add categories to your posts to see them here.')}</p>
			</div>
		{:else}
			<div class="categories-grid">
				{#each categories as category}
					<TagBadge name={category.name} count={category.count} type="category" />
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.categories-page {
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

	.categories-grid {
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

<script lang="ts">
	import { base } from '$app/paths';
	import { formatDate } from '$lib/utils/date';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { post, relatedPosts } = data;
</script>

<svelte:head>
	<title>{post.title} - Blog</title>
	<meta name="description" content={post.excerpt || `Read ${post.title} on our blog`} />
	{#if post.featuredImage}
		<meta property="og:image" content={post.featuredImage} />
	{/if}
</svelte:head>

<article class="article">
	<!-- Header -->
	<header class="article-header container container-narrow">
		{#if post.categories && post.categories.length > 0}
			<div class="article-meta">
				<a href="{base}/category/{post.categories[0].toLowerCase()}/" class="article-category">
					{post.categories[0]}
				</a>
			</div>
		{/if}

		<h1 class="article-title">{post.title}</h1>

		<div class="article-info">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			<span class="divider">·</span>
			<span>{post.readingTime} min read</span>
			{#if post.author}
				<span class="divider">·</span>
				<span>By {post.author}</span>
			{/if}
		</div>
	</header>

	<!-- Featured Image -->
	{#if post.featuredImage}
		<figure class="article-image container">
			<img src={post.featuredImage} alt={post.title} />
		</figure>
	{/if}

	<!-- Content -->
	<div class="article-content container container-narrow">
		<div class="prose">
			{@html post.content}
		</div>
	</div>

	<!-- Tags -->
	{#if post.tags && post.tags.length > 0}
		<div class="article-tags container container-narrow">
			<span class="tags-label">Tags:</span>
			<div class="tags-list">
				{#each post.tags as tag}
					<a href="{base}/tag/{tag.toLowerCase()}/" class="tag">{tag}</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Related Posts -->
	{#if relatedPosts.length > 0}
		<section class="related-posts container">
			<h2 class="section-title">Related Posts</h2>
			<div class="related-grid">
				{#each relatedPosts as relatedPost}
					<PostCard post={relatedPost} />
				{/each}
			</div>
		</section>
	{/if}
</article>

<style>
	.article {
		padding: 48px 0;
	}

	.article-header {
		text-align: center;
		margin-bottom: 48px;
	}

	.article-meta {
		margin-bottom: 16px;
	}

	.article-category {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gray-500);
		transition: color var(--transition-fast);
	}

	.article-category:hover {
		color: var(--color-black);
	}

	.article-title {
		font-size: 3rem;
		font-weight: 600;
		line-height: 1.15;
		letter-spacing: -0.03em;
		margin-bottom: 24px;
	}

	.article-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		font-size: 0.9rem;
		color: var(--color-gray-500);
	}

	.divider {
		color: var(--color-gray-300);
	}

	.article-image {
		margin: 0 auto 48px;
		max-width: 1000px;
	}

	.article-image img {
		width: 100%;
		height: auto;
		filter: grayscale(100%);
		transition: filter var(--transition-base);
	}

	.article-image:hover img {
		filter: grayscale(0%);
	}

	.article-content {
		margin-bottom: 48px;
	}

	.article-tags {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-top: 32px;
		border-top: 1px solid var(--color-gray-200);
	}

	.tags-label {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-gray-500);
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.related-posts {
		margin-top: 80px;
		padding-top: 48px;
		border-top: 1px solid var(--color-gray-200);
	}

	.section-title {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gray-500);
		margin-bottom: 32px;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
	}

	@media (max-width: 1024px) {
		.related-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.article-title {
			font-size: 2rem;
		}

		.article-info {
			flex-wrap: wrap;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

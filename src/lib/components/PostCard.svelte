<script lang="ts">
	import { base } from '$app/paths';
	import type { PostSummary } from '$lib/types/post';
	import { formatDate } from '$lib/utils/date';

	interface Props {
		post: PostSummary;
		variant?: 'default' | 'featured' | 'compact';
	}

	let { post, variant = 'default' }: Props = $props();
</script>

{#if variant === 'featured'}
	<article class="post-card featured">
		{#if post.featuredImage}
			<a href="{base}/post/{post.slug}/" class="post-image-link">
				<img src={post.featuredImage} alt={post.title} class="post-image" />
			</a>
		{/if}
		<div class="post-content">
			{#if post.categories && post.categories.length > 0}
				<div class="post-meta">
					<a href="{base}/category/{post.categories[0].toLowerCase()}/" class="post-category">
						{post.categories[0]}
					</a>
				</div>
			{/if}
			<h2 class="post-title">
				<a href="{base}/post/{post.slug}/">{post.title}</a>
			</h2>
			{#if post.excerpt}
				<p class="post-excerpt">{post.excerpt}</p>
			{/if}
			<div class="post-footer">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span class="divider-dot">·</span>
				<span>{post.readingTime} min read</span>
			</div>
		</div>
	</article>
{:else if variant === 'compact'}
	<article class="post-card compact">
		<div class="post-content">
			<h3 class="post-title">
				<a href="{base}/post/{post.slug}/">{post.title}</a>
			</h3>
			<div class="post-footer">
				<time datetime={post.date}>{formatDate(post.date)}</time>
			</div>
		</div>
	</article>
{:else}
	<article class="post-card">
		{#if post.featuredImage}
			<a href="{base}/post/{post.slug}/" class="post-image-link">
				<img src={post.featuredImage} alt={post.title} class="post-image" />
			</a>
		{/if}
		<div class="post-content">
			{#if post.categories && post.categories.length > 0}
				<div class="post-meta">
					<a href="{base}/category/{post.categories[0].toLowerCase()}/" class="post-category">
						{post.categories[0]}
					</a>
				</div>
			{/if}
			<h3 class="post-title">
				<a href="{base}/post/{post.slug}/">{post.title}</a>
			</h3>
			{#if post.excerpt}
				<p class="post-excerpt">{post.excerpt}</p>
			{/if}
			<div class="post-footer">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span class="divider-dot">·</span>
				<span>{post.readingTime} min read</span>
			</div>
		</div>
	</article>
{/if}

<style>
	.post-card {
		display: flex;
		flex-direction: column;
	}

	.post-card.featured {
		grid-column: 1 / -1;
	}

	.post-card.featured .post-image-link {
		aspect-ratio: 21 / 9;
	}

	.post-card.featured .post-title {
		font-size: 2rem;
	}

	.post-card.featured .post-excerpt {
		font-size: 1.1rem;
	}

	.post-image-link {
		display: block;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		margin-bottom: 16px;
	}

	.post-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%);
		transition: filter var(--transition-base), transform var(--transition-base);
	}

	.post-card:hover .post-image {
		filter: grayscale(0%);
		transform: scale(1.02);
	}

	.post-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.post-meta {
		margin-bottom: 8px;
	}

	.post-category {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gray-500);
		transition: color var(--transition-fast);
	}

	.post-category:hover {
		color: var(--color-black);
	}

	.post-title {
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.3;
		margin-bottom: 8px;
	}

	.post-title a {
		color: var(--color-black);
		transition: color var(--transition-fast);
	}

	.post-title a:hover {
		color: var(--color-gray-600);
	}

	.post-excerpt {
		color: var(--color-gray-600);
		font-size: 0.95rem;
		line-height: 1.6;
		margin-bottom: 12px;
		flex: 1;
	}

	.post-footer {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.8rem;
		color: var(--color-gray-500);
	}

	.divider-dot {
		color: var(--color-gray-300);
	}

	/* Compact variant */
	.post-card.compact {
		padding: 16px 0;
		border-bottom: 1px solid var(--color-gray-100);
	}

	.post-card.compact:last-child {
		border-bottom: none;
	}

	.post-card.compact .post-title {
		font-size: 1rem;
		margin-bottom: 4px;
	}

	.post-card.compact .post-footer {
		font-size: 0.75rem;
	}

	@media (max-width: 768px) {
		.post-card.featured .post-title {
			font-size: 1.5rem;
		}

		.post-card.featured .post-image-link {
			aspect-ratio: 16 / 10;
		}
	}
</style>

<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { posts } = data;

	const featuredPost = posts.length > 0 ? posts[0] : null;
	const recentPosts = posts.slice(1);
</script>

<svelte:head>
	<title>Blog - Home</title>
</svelte:head>

<div class="home">
	{#if posts.length === 0}
		<section class="empty-state container container-narrow">
			<div class="empty-content">
				<h1>Welcome to Your Blog</h1>
				<p>No posts yet. Add your first markdown file to <code>content/posts/</code> to get started.</p>
				
				<div class="instructions">
					<h2>How to Add Posts</h2>
					<p>Create a <code>.md</code> file in the <code>content/posts/</code> directory with the following format:</p>
					
					<pre><code>---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
featuredImage: "https://example.com/image.jpg"
categories:
  - Technology
tags:
  - SvelteKit
  - Tutorial
---

Your markdown content goes here...</code></pre>
				</div>
			</div>
		</section>
	{:else}
		<!-- Featured Post -->
		{#if featuredPost}
			<section class="featured-section container">
				<PostCard post={featuredPost} variant="featured" />
			</section>
		{/if}

		<!-- Recent Posts -->
		{#if recentPosts.length > 0}
			<section class="posts-section container">
				<h2 class="section-title">Latest Posts</h2>
				<div class="posts-grid">
					{#each recentPosts as post}
						<PostCard {post} />
					{/each}
				</div>
			</section>
		{/if}
	{/if}
</div>

<style>
	.home {
		padding: 48px 0;
	}

	.empty-state {
		text-align: center;
		padding: 80px 0;
	}

	.empty-content h1 {
		font-size: 2.5rem;
		margin-bottom: 16px;
	}

	.empty-content > p {
		color: var(--color-gray-600);
		font-size: 1.1rem;
		margin-bottom: 48px;
	}

	.empty-content code {
		background-color: var(--color-gray-100);
		padding: 2px 8px;
		font-size: 0.9em;
	}

	.instructions {
		text-align: left;
		margin-top: 48px;
		padding: 32px;
		background-color: var(--color-gray-50);
		border: 1px solid var(--color-gray-200);
	}

	.instructions h2 {
		font-size: 1.25rem;
		margin-bottom: 16px;
	}

	.instructions > p {
		color: var(--color-gray-600);
		margin-bottom: 24px;
	}

	.instructions pre {
		background-color: var(--color-gray-900);
		color: var(--color-gray-100);
		padding: 24px;
		overflow-x: auto;
		font-size: 0.85rem;
		line-height: 1.6;
	}

	.instructions pre code {
		background: none;
		padding: 0;
		color: inherit;
	}

	.featured-section {
		margin-bottom: 64px;
	}

	.posts-section {
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

		.empty-content h1 {
			font-size: 1.75rem;
		}
	}
</style>

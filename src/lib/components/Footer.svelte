<script lang="ts">
	interface Props {
		categories?: { name: string; count: number }[];
	}

	let { categories = [] }: Props = $props();
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-about">
				<h3 class="footer-title">Blog</h3>
				<p class="footer-description">
					A minimal, Swiss-design inspired personal blog. Built with SvelteKit and Markdown.
				</p>
			</div>

			{#if categories.length > 0}
				<div class="footer-categories">
					<h4 class="footer-heading">Categories</h4>
					<ul class="footer-list">
						{#each categories.slice(0, 5) as category}
							<li>
								<a href="/category/{category.name.toLowerCase()}">{category.name}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<div class="footer-links">
				<h4 class="footer-heading">Links</h4>
				<ul class="footer-list">
					<li><a href="/">Home</a></li>
					<li><a href="/categories">Categories</a></li>
					<li><a href="/tags">Tags</a></li>
					<li><a href="/search">Search</a></li>
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {currentYear} Blog. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		margin-top: 80px;
		padding: 48px 0 24px;
		background-color: var(--color-gray-50);
		border-top: 1px solid var(--color-gray-200);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 48px;
	}

	.footer-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 12px;
	}

	.footer-description {
		color: var(--color-gray-600);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.footer-heading {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-gray-500);
		margin-bottom: 16px;
	}

	.footer-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-list li {
		margin-bottom: 8px;
	}

	.footer-list a {
		color: var(--color-gray-600);
		font-size: 0.9rem;
		transition: color var(--transition-fast);
	}

	.footer-list a:hover {
		color: var(--color-black);
	}

	.footer-bottom {
		margin-top: 48px;
		padding-top: 24px;
		border-top: 1px solid var(--color-gray-200);
		text-align: center;
	}

	.footer-bottom p {
		color: var(--color-gray-500);
		font-size: 0.8rem;
	}

	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>

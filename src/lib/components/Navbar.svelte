<script lang="ts">
	import { page } from '$app/stores';

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function isSearchPage(pathname: string): boolean {
		return pathname === '/search' || pathname.startsWith('/search');
	}
</script>

<header class="header">
	<div class="header-inner container">
		<a href="/" class="logo">
			<span class="logo-text">Blog</span>
		</a>

		<nav class="nav-desktop">
			<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
			<a href="/categories" class:active={$page.url.pathname.startsWith('/categories')}>Categories</a>
			<a href="/tags" class:active={$page.url.pathname.startsWith('/tags')}>Tags</a>
			<a href="/search" class:active={isSearchPage($page.url.pathname)}>Search</a>
		</nav>

		<button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
		</button>
	</div>

	{#if menuOpen}
		<nav class="nav-mobile">
			<a href="/" class:active={$page.url.pathname === '/'} onclick={() => menuOpen = false}>Home</a>
			<a href="/categories" class:active={$page.url.pathname.startsWith('/categories')} onclick={() => menuOpen = false}>Categories</a>
			<a href="/tags" class:active={$page.url.pathname.startsWith('/tags')} onclick={() => menuOpen = false}>Tags</a>
			<a href="/search" class:active={isSearchPage($page.url.pathname)} onclick={() => menuOpen = false}>Search</a>
		</nav>
	{/if}
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		background-color: var(--color-white);
		border-bottom: 1px solid var(--color-gray-200);
		z-index: 100;
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.logo-text {
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.nav-desktop {
		display: flex;
		gap: 32px;
	}

	.nav-desktop a {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-gray-600);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: color var(--transition-fast);
	}

	.nav-desktop a:hover,
	.nav-desktop a.active {
		color: var(--color-black);
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 6px;
		padding: 8px;
		background: none;
		border: none;
		cursor: pointer;
	}

	.bar {
		display: block;
		width: 24px;
		height: 2px;
		background-color: var(--color-black);
		transition: transform var(--transition-base), opacity var(--transition-base);
	}

	.bar.open:first-child {
		transform: translateY(4px) rotate(45deg);
	}

	.bar.open:last-child {
		transform: translateY(-4px) rotate(-45deg);
	}

	.nav-mobile {
		display: none;
		flex-direction: column;
		padding: 16px 24px 24px;
		border-bottom: 1px solid var(--color-gray-200);
		background-color: var(--color-white);
	}

	.nav-mobile a {
		padding: 12px 0;
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-gray-600);
		border-bottom: 1px solid var(--color-gray-100);
	}

	.nav-mobile a:last-child {
		border-bottom: none;
	}

	.nav-mobile a:hover,
	.nav-mobile a.active {
		color: var(--color-black);
	}

	@media (max-width: 768px) {
		.nav-desktop {
			display: none;
		}

		.menu-toggle {
			display: flex;
		}

		.nav-mobile {
			display: flex;
		}
	}
</style>

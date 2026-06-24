<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { t } from '../useT.svelte';

	let locale = $derived($page.params.locale || '');
	let localePrefix = $derived(locale ? `/${locale}` : '');

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function isSearchPage(pathname: string): boolean {
		const searchPath = `${base}${localePrefix}/search`;
		return pathname === searchPath || pathname.startsWith(searchPath);
	}

	function isActive(pathname: string, path: string): boolean {
		if (path === '/' || path === `/${locale}`) {
			return pathname === base || pathname === `${base}/` || pathname === `${base}${localePrefix}/`;
		}
		return pathname.startsWith(`${base}${path}`);
	}
</script>

<header class="header">
	<div class="header-inner container">
		<a href="{base}/" class="logo">
			<span class="logo-text">{t('Blog')}</span>
		</a>

		<nav class="nav-desktop">
			<a href="{base}{localePrefix}/" class:active={isActive($page.url.pathname, localePrefix ? `/${locale}` : '/')}>{t('Home')}</a>
			<a href="{base}{localePrefix}/categories/" class:active={isActive($page.url.pathname, `${localePrefix}/categories`)}>{t('Categories')}</a>
			<a href="{base}{localePrefix}/tags/" class:active={isActive($page.url.pathname, `${localePrefix}/tags`)}>{t('Tags')}</a>
			<a href="{base}{localePrefix}/search/" class:active={isSearchPage($page.url.pathname)}>{t('Search')}</a>
		</nav>

		<button class="menu-toggle" onclick={toggleMenu} aria-label={t('Toggle menu')}>
			<span class="bar" class:open={menuOpen}></span>
			<span class="bar" class:open={menuOpen}></span>
		</button>
	</div>

	{#if menuOpen}
		<nav class="nav-mobile">
			<a href="{base}{localePrefix}/" class:active={isActive($page.url.pathname, localePrefix ? `/${locale}` : '/')} onclick={() => menuOpen = false}>{t('Home')}</a>
			<a href="{base}{localePrefix}/categories/" class:active={isActive($page.url.pathname, `${localePrefix}/categories`)} onclick={() => menuOpen = false}>{t('Categories')}</a>
			<a href="{base}{localePrefix}/tags/" class:active={isActive($page.url.pathname, `${localePrefix}/tags`)} onclick={() => menuOpen = false}>{t('Tags')}</a>
			<a href="{base}{localePrefix}/search/" class:active={isSearchPage($page.url.pathname)} onclick={() => menuOpen = false}>{t('Search')}</a>
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

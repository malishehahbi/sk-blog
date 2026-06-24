<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { t } from '../useT.svelte';

	let open = $state(false);

	let locale = $derived(browser ? ($page.params.locale || 'en') : 'en');

	function toggle() {
		open = !open;
	}

	function switchLang(lang: string) {
		open = false;
		const path = window.location.pathname;
		let cleanPath = path.replace(base, '');
		if (cleanPath.startsWith('/ar/')) {
			cleanPath = cleanPath.replace('/ar', '');
		} else if (cleanPath === '/ar') {
			cleanPath = '/';
		}

		if (lang === 'en') {
			goto(`${base}${cleanPath}`);
		} else {
			goto(`${base}/ar${cleanPath}`);
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const el = document.getElementById('lang-switch');
		if (el && !el.contains(e.target as Node)) {
			open = false;
		}
	}

	$effect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div id="lang-switch" class="lang-switch">
	<button class="trigger" onclick={toggle} aria-label={t('Switch language')}>
		{locale === 'ar' ? t('AR') : t('EN')}
	</button>
	{#if open}
		<div class="dropdown" role="listbox">
			<button class="option" class:selected={locale === 'en'} onclick={() => switchLang('en')}>{t('EN')}</button>
			<button class="option" class:selected={locale === 'ar'} onclick={() => switchLang('ar')}>{t('AR')}</button>
		</div>
	{/if}
</div>

<style>
	.lang-switch {
		position: relative;
	}

	.trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		background: none;
		border: 1px solid var(--color-gray-200);
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--color-gray-600);
		transition: color var(--transition-fast), border-color var(--transition-fast);
	}

	.trigger:hover {
		color: var(--color-black);
		border-color: var(--color-gray-400);
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 4px);
		right: 0;
		z-index: 200;
		background-color: var(--color-white);
		border: 1px solid var(--color-gray-200);
		min-width: 48px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	}

	.option {
		display: block;
		width: 100%;
		padding: 8px 12px;
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-gray-700);
		transition: background-color var(--transition-fast), color var(--transition-fast);
		text-align: center;
	}

	.option:hover {
		background-color: var(--color-gray-100);
		color: var(--color-black);
	}

	.option.selected {
		background-color: var(--color-black);
		color: var(--color-white);
		font-weight: 600;
	}
</style>

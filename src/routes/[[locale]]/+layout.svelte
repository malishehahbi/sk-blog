<script lang="ts">
	import '../../app.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { loadLocale } from 'wuchale/load-utils';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { t } from '$lib/useT.svelte';

	interface Props {
		children: import('svelte').Snippet;
		data: {
			categories: { name: string; count: number }[];
			locale: string;
		};
	}

	let { children, data }: Props = $props();
	let locale = $derived(data.locale || 'en');

	$effect(() => {
		if (browser) {
			loadLocale(locale);
		}
	});

	$effect(() => {
		if (!browser) return;

		const url = new URL(window.location.href);
		const langParam = url.searchParams.get('lang');

		if (langParam && ['en', 'ar'].includes(langParam)) {
			try {
				localStorage.setItem('lang', langParam);
			} catch {}

			if (langParam === 'ar' && locale !== 'ar') {
				const path = url.pathname.replace(base, '') || '/';
				goto(`${base}/ar${path}`);
			} else if (langParam === 'en' && locale === 'ar') {
				const path = url.pathname.replace(base, '').replace('/ar', '') || '/';
				goto(`${base}${path}`);
			}
		} else {
			try {
				const stored = localStorage.getItem('lang');
				if (stored === 'ar' && locale !== 'ar') {
					const path = url.pathname.replace(base, '') || '/';
					goto(`${base}/ar${path}`);
				}
			} catch {}
		}
	});

	$effect(() => {
		if (!browser) return;
		document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
		document.documentElement.lang = locale;
	});
</script>

<svelte:head>
	<title>{t('Blog')}</title>
	<meta name="description" content={t('A minimal, Swiss-design inspired personal blog')} />
</svelte:head>

<div class="app">
	<Navbar />
	<main class="main">
		{@render children()}
	</main>
	<Footer categories={data.categories} />
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main {
		flex: 1;
	}
</style>

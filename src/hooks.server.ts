import type { Handle } from '@sveltejs/kit';
import { runWithLocale, loadLocales } from 'wuchale/load-utils/server';
import * as main from './locales/main.loader.server.svelte.js';
import { locales } from './locales/data.js';

await loadLocales(main.key, main.loadCount, main.loadCatalog, locales);

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname.replace('/blog', '');
	const match = path.match(/^\/(ar)(\/|$)/);
	const locale = match ? 'ar' : 'en';
	return await runWithLocale(locale, () =>
		resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%sveltekit.lang%', locale)
		})
	);
};

import { getPostsByTag, getAllTags } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const allTags = getAllTags();
	const arTags = getAllTags('ar');

	const entries = allTags.map((tag) => ({ slug: tag.name.toLowerCase() }));

	for (const tag of arTags) {
		entries.push({ slug: tag.name.toLowerCase(), locale: 'ar' });
	}

	return entries;
};

export const load: PageServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const posts = getPostsByTag(params.slug, locale);
	if (posts.length === 0) throw error(404, `No posts found with tag "${params.slug}"`);
	return { tag: params.slug, posts, locale };
};

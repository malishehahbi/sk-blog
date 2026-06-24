import { getPostsByCategory, getAllCategories } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const allCategories = getAllCategories();
	const arCategories = getAllCategories('ar');

	const entries = allCategories.map((cat) => ({ slug: cat.name.toLowerCase() }));

	for (const cat of arCategories) {
		entries.push({ slug: cat.name.toLowerCase(), locale: 'ar' });
	}

	return entries;
};

export const load: PageServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const posts = getPostsByCategory(params.slug, locale);
	if (posts.length === 0) throw error(404, `No posts found in category "${params.slug}"`);
	return { category: params.slug, posts, locale };
};

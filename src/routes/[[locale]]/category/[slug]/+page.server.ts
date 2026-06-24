import { getPostsByCategory, getAllCategories } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const categories = getAllCategories();
	return categories.map((cat) => ({ slug: cat.name.toLowerCase() }));
};

export const load: PageServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const posts = getPostsByCategory(params.slug, locale);
	if (posts.length === 0) throw error(404, `No posts found in category "${params.slug}"`);
	return { category: params.slug, posts, locale };
};

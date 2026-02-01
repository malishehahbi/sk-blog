import { getPostsByCategory, getAllCategories } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

// Generate entries for all categories at build time
export const entries: EntryGenerator = () => {
	const categories = getAllCategories();
	return categories.map((cat) => ({ slug: cat.name.toLowerCase() }));
};

export const load: PageServerLoad = async ({ params }) => {
	const posts = getPostsByCategory(params.slug);

	if (posts.length === 0) {
		throw error(404, `No posts found in category "${params.slug}"`);
	}

	return {
		category: params.slug,
		posts
	};
};

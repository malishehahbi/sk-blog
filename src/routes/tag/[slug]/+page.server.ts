import { getPostsByTag, getAllTags } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

// Generate entries for all tags at build time
export const entries: EntryGenerator = () => {
	const tags = getAllTags();
	return tags.map((tag) => ({ slug: tag.name.toLowerCase() }));
};

export const load: PageServerLoad = async ({ params }) => {
	const posts = getPostsByTag(params.slug);

	if (posts.length === 0) {
		throw error(404, `No posts found with tag "${params.slug}"`);
	}

	return {
		tag: params.slug,
		posts
	};
};

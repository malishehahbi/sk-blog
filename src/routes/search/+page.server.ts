import { getAllPosts } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Load all posts at build time - filtering happens client-side
	const allPosts = getAllPosts();

	return {
		allPosts
	};
};

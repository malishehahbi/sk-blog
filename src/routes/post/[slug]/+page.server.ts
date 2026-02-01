import { getPostBySlug, getRelatedPosts, getAllPosts } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

// Generate entries for all posts at build time
export const entries: EntryGenerator = () => {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const relatedPosts = getRelatedPosts(params.slug, 3);

	return {
		post,
		relatedPosts
	};
};

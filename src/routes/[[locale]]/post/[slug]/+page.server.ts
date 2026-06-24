import { getPostBySlug, getRelatedPosts, getAllPosts } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const post = getPostBySlug(params.slug, locale);
	if (!post) throw error(404, 'Post not found');
	const relatedPosts = getRelatedPosts(params.slug, 3, locale);
	return { post, relatedPosts, locale };
};

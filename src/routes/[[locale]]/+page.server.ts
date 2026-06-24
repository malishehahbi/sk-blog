import { getAllPosts } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';

export const entries = () => [{ locale: 'ar' }];

export const load: PageServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const posts = getAllPosts(locale);
	return { posts, locale };
};

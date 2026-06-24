import { getAllCategories } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const categories = getAllCategories(locale);
	return { categories, locale };
};

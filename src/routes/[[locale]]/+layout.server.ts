import { getAllCategories } from '$lib/utils/posts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const categories = getAllCategories(locale);
	return { categories, locale };
};

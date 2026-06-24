import { getAllTags } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const locale = (params.locale as 'en' | 'ar' | undefined) || 'en';
	const tags = getAllTags(locale);
	return { tags, locale };
};

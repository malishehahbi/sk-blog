import { getAllCategories } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = getAllCategories();

	return {
		categories
	};
};

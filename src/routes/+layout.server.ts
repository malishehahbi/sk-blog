import { getAllCategories } from '$lib/utils/posts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const categories = getAllCategories();

	return {
		categories
	};
};

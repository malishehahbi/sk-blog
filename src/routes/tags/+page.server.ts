import { getAllTags } from '$lib/utils/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const tags = getAllTags();

	return {
		tags
	};
};

export interface PostFrontmatter {
	title: string;
	date: string;
	excerpt?: string;
	featuredImage?: string;
	tags?: string[];
	categories?: string[];
	author?: string;
	draft?: boolean;
}

export interface Post extends PostFrontmatter {
	slug: string;
	content: string;
	readingTime: number;
	locale: 'en' | 'ar';
}

export interface PostSummary extends PostFrontmatter {
	slug: string;
	readingTime: number;
	locale: 'en' | 'ar';
}

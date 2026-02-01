import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostSummary, PostFrontmatter } from '$lib/types/post';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

// Calculate reading time (avg 200 words per minute)
function calculateReadingTime(content: string): number {
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / 200);
}

// Get all post files
function getPostFiles(): string[] {
	if (!fs.existsSync(POSTS_DIR)) {
		return [];
	}
	return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));
}

// Parse a single post file
function parsePostFile(filename: string): Post | null {
	const filePath = path.join(POSTS_DIR, filename);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);

	const frontmatter = data as PostFrontmatter;

	// Skip drafts in production
	if (frontmatter.draft && process.env.NODE_ENV === 'production') {
		return null;
	}

	const slug = filename.replace('.md', '');
	const htmlContent = marked(content) as string;

	return {
		...frontmatter,
		slug,
		content: htmlContent,
		readingTime: calculateReadingTime(content)
	};
}

// Get all posts (sorted by date, newest first)
export function getAllPosts(): PostSummary[] {
	const files = getPostFiles();
	const posts: PostSummary[] = [];

	for (const file of files) {
		const post = parsePostFile(file);
		if (post) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { content, ...summary } = post;
			posts.push(summary);
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
	const filename = `${slug}.md`;
	const filePath = path.join(POSTS_DIR, filename);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	return parsePostFile(filename);
}

// Get posts by category
export function getPostsByCategory(category: string): PostSummary[] {
	const allPosts = getAllPosts();
	return allPosts.filter((post) =>
		post.categories?.some((cat) => cat.toLowerCase() === category.toLowerCase())
	);
}

// Get posts by tag
export function getPostsByTag(tag: string): PostSummary[] {
	const allPosts = getAllPosts();
	return allPosts.filter((post) =>
		post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
	);
}

// Get all categories with counts
export function getAllCategories(): { name: string; count: number }[] {
	const allPosts = getAllPosts();
	const categoryMap = new Map<string, number>();

	for (const post of allPosts) {
		if (post.categories) {
			for (const category of post.categories) {
				const count = categoryMap.get(category) || 0;
				categoryMap.set(category, count + 1);
			}
		}
	}

	return Array.from(categoryMap.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);
}

// Get all tags with counts
export function getAllTags(): { name: string; count: number }[] {
	const allPosts = getAllPosts();
	const tagMap = new Map<string, number>();

	for (const post of allPosts) {
		if (post.tags) {
			for (const tag of post.tags) {
				const count = tagMap.get(tag) || 0;
				tagMap.set(tag, count + 1);
			}
		}
	}

	return Array.from(tagMap.entries())
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => b.count - a.count);
}

// Search posts
export function searchPosts(query: string): PostSummary[] {
	const allPosts = getAllPosts();
	const lowerQuery = query.toLowerCase();

	return allPosts.filter((post) => {
		const titleMatch = post.title.toLowerCase().includes(lowerQuery);
		const excerptMatch = post.excerpt?.toLowerCase().includes(lowerQuery);
		const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
		const categoryMatch = post.categories?.some((cat) => cat.toLowerCase().includes(lowerQuery));

		return titleMatch || excerptMatch || tagMatch || categoryMatch;
	});
}

// Get related posts (by shared tags/categories)
export function getRelatedPosts(currentSlug: string, limit: number = 3): PostSummary[] {
	const currentPost = getPostBySlug(currentSlug);
	if (!currentPost) return [];

	const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);

	// Score posts by shared tags and categories
	const scoredPosts = allPosts.map((post) => {
		let score = 0;

		if (currentPost.tags && post.tags) {
			for (const tag of currentPost.tags) {
				if (post.tags.includes(tag)) score += 2;
			}
		}

		if (currentPost.categories && post.categories) {
			for (const category of currentPost.categories) {
				if (post.categories.includes(category)) score += 1;
			}
		}

		return { post, score };
	});

	return scoredPosts
		.filter((sp) => sp.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((sp) => sp.post);
}

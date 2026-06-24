import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Post, PostSummary, PostFrontmatter } from '$lib/types/post';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

function calculateReadingTime(content: string): number {
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / 200);
}

function getPostFiles(): string[] {
	if (!fs.existsSync(POSTS_DIR)) {
		return [];
	}
	return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));
}

function parseLocale(filename: string): { slug: string; locale: 'en' | 'ar' } {
	const match = filename.match(/^(.+?)\.(ar)\.md$/);
	if (match) {
		return { slug: match[1], locale: 'ar' };
	}
	const slug = filename.replace('.md', '');
	return { slug, locale: 'en' };
}

function safeParseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	// Pre-process YAML to auto-quote values containing colons, which break js-yaml
	const preprocessed = raw.replace(
		/^---\r?\n([\s\S]*?)\r?\n---/,
		(_match, yamlBlock: string) => {
			const lines = yamlBlock.split(/\r?\n/);
			const fixedLines = lines.map((line: string) => {
				if (!line.trim() || /^\s/.test(line)) return line;
				const idx = line.indexOf(':');
				if (idx === -1) return line;
				const key = line.slice(0, idx).trim();
				const value = line.slice(idx + 1).trim();
				if (!value || /^["'[{\d]/.test(value)) return line;
				if (value.includes(':') || /[\u0600-\u06FF]/.test(value)) {
					return `${key}: "${value}"`;
				}
				return line;
			});
			return `---\n${fixedLines.join('\n')}\n---`;
		}
	);

	try {
		return matter(preprocessed);
	} catch {
		// Final fallback: parse frontmatter manually with simple line-by-line extraction
		const match = preprocessed.match(/^---\r?\n([\s\S]*?)\r?\n---/);
		if (!match) return matter(preprocessed);
		const yamlBlock = match[1];
		const rest = preprocessed.slice(match[0].length);
		const data: Record<string, unknown> = {};
		let currentKey = '';
		for (const line of yamlBlock.split(/\r?\n/)) {
			const listMatch = line.match(/^\s+-\s+(.+)/);
			if (listMatch && currentKey) {
				const arr = (data[currentKey] as string[]) || [];
				arr.push(listMatch[1].replace(/^["']|["']$/g, ''));
				data[currentKey] = arr;
				continue;
			}
			const kvMatch = line.match(/^(\w+):\s*(.+)?$/);
			if (kvMatch) {
				currentKey = kvMatch[1];
				data[currentKey] = kvMatch[2] ? kvMatch[2].replace(/^["']|["']$/g, '') : [];
			}
		}
		return { data, content: rest.replace(/^\s*\n/, '') };
	}
}

function parsePostFile(filename: string): Post | null {
	const filePath = path.join(POSTS_DIR, filename);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = safeParseFrontmatter(fileContent);

	const frontmatter = data as PostFrontmatter;

	if (frontmatter.draft && process.env.NODE_ENV === 'production') {
		return null;
	}

	const { slug, locale } = parseLocale(filename);
	const htmlContent = marked(content) as string;

	return {
		...frontmatter,
		slug,
		locale,
		content: htmlContent,
		readingTime: calculateReadingTime(content)
	};
}

export function getAllPosts(locale?: 'en' | 'ar'): PostSummary[] {
	const files = getPostFiles();
	const posts: PostSummary[] = [];

	for (const file of files) {
		const post = parsePostFile(file);
		if (post && (!locale || post.locale === locale)) {
			const { content, ...summary } = post;
			posts.push(summary);
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, locale?: 'en' | 'ar'): Post | null {
	const locales = locale ? [locale] : ['en', 'ar'];
	for (const loc of locales) {
		const filename = loc === 'en' ? `${slug}.md` : `${slug}.ar.md`;
		const filePath = path.join(POSTS_DIR, filename);
		if (fs.existsSync(filePath)) {
			return parsePostFile(filename);
		}
	}
	return null;
}

export function getPostsByCategory(category: string, locale?: 'en' | 'ar'): PostSummary[] {
	const allPosts = getAllPosts(locale);
	return allPosts.filter((post) =>
		post.categories?.some((cat) => cat.toLowerCase() === category.toLowerCase())
	);
}

export function getPostsByTag(tag: string, locale?: 'en' | 'ar'): PostSummary[] {
	const allPosts = getAllPosts(locale);
	return allPosts.filter((post) =>
		post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
	);
}

export function getAllCategories(locale?: 'en' | 'ar'): { name: string; count: number }[] {
	const allPosts = getAllPosts(locale);
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

export function getAllTags(locale?: 'en' | 'ar'): { name: string; count: number }[] {
	const allPosts = getAllPosts(locale);
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

export function searchPosts(query: string, locale?: 'en' | 'ar'): PostSummary[] {
	const allPosts = getAllPosts(locale);
	const lowerQuery = query.toLowerCase();

	return allPosts.filter((post) => {
		const titleMatch = post.title.toLowerCase().includes(lowerQuery);
		const excerptMatch = post.excerpt?.toLowerCase().includes(lowerQuery);
		const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
		const categoryMatch = post.categories?.some((cat) => cat.toLowerCase().includes(lowerQuery));
		return titleMatch || excerptMatch || tagMatch || categoryMatch;
	});
}

export function getRelatedPosts(currentSlug: string, limit: number = 3, locale?: 'en' | 'ar'): PostSummary[] {
	const currentPost = getPostBySlug(currentSlug, locale);
	if (!currentPost) return [];

	const allPosts = getAllPosts(locale).filter((p) => p.slug !== currentSlug);

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

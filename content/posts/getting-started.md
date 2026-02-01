---
title: "Getting Started with Your Markdown Blog"
date: "2024-01-15"
excerpt: "Learn how to create and publish your first blog post using markdown files. A simple guide to get you started."
featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
categories:
  - Tutorial
tags:
  - Getting Started
  - Markdown
  - Blogging
author: "Admin"
---

Welcome to your new markdown-powered blog! This guide will help you understand how to create and publish blog posts.

## Creating a New Post

To create a new post, simply add a new `.md` file to the `content/posts/` directory. Each file should include frontmatter at the top with metadata about your post.

### Frontmatter Structure

```yaml
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description"
featuredImage: "https://example.com/image.jpg"
categories:
  - Category Name
tags:
  - Tag One
  - Tag Two
author: "Your Name"
draft: false
---
```

## Writing Content

After the frontmatter, you can write your content using standard Markdown syntax:

- **Bold text** with `**double asterisks**`
- *Italic text* with `*single asterisks*`
- `Code` with backticks
- [Links](/) with `[text](url)`

### Code Blocks

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

### Blockquotes

> Design is not just what it looks like and feels like. Design is how it works.
> — Steve Jobs

## Images

You can include images using the standard markdown syntax or through the `featuredImage` frontmatter field for your hero image.

## Categories and Tags

Organize your posts with categories and tags:

- **Categories**: Broad groupings (e.g., Tutorial, Design, Technology)
- **Tags**: Specific topics (e.g., Markdown, CSS, JavaScript)

Both categories and tags will automatically appear in the navigation and allow readers to discover related content.

## Draft Posts

Set `draft: true` in your frontmatter to hide a post from production builds while still working on it.

---

That's all you need to know to get started. Happy blogging!

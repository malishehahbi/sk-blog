<script lang="ts">
	import { base } from '$app/paths';

	interface Props {
		name: string;
		count?: number;
		type?: 'category' | 'tag';
	}

	let { name, count, type = 'category' }: Props = $props();

	const href = type === 'category' 
		? `${base}/category/${name.toLowerCase()}/` 
		: `${base}/tag/${name.toLowerCase()}/`;
</script>

<a {href} class="tag-badge" class:tag-type={type === 'tag'}>
	<span class="tag-name">{name}</span>
	{#if count !== undefined}
		<span class="tag-count">{count}</span>
	{/if}
</a>

<style>
	.tag-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		font-size: 0.8rem;
		font-weight: 500;
		background-color: var(--color-gray-100);
		color: var(--color-gray-700);
		transition: all var(--transition-fast);
	}

	.tag-badge:hover {
		background-color: var(--color-black);
		color: var(--color-white);
	}

	.tag-badge.tag-type {
		background-color: var(--color-white);
		border: 1px solid var(--color-gray-200);
	}

	.tag-badge.tag-type:hover {
		background-color: var(--color-black);
		border-color: var(--color-black);
		color: var(--color-white);
	}

	.tag-name {
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.tag-count {
		font-size: 0.7rem;
		color: var(--color-gray-500);
	}

	.tag-badge:hover .tag-count {
		color: var(--color-gray-300);
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { t } from '../useT.svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		autofocus?: boolean;
	}

	let { value = '', placeholder = t('Search posts...'), autofocus = false }: Props = $props();

	let locale = $derived($page.params.locale || '');
	let localePrefix = $derived(locale ? `/${locale}` : '');

	// Sync inputValue with the prop when it changes (e.g., from URL)
	let inputValue = $state(value);
	
	$effect(() => {
		inputValue = value;
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (inputValue.trim()) {
			goto(`${localePrefix}/search?q=${encodeURIComponent(inputValue.trim())}`, { invalidateAll: true });
		}
	}

	function handleClear() {
		inputValue = '';
		goto(`${localePrefix}/search`, { invalidateAll: true });
	}
</script>

<form class="search-form" onsubmit={handleSubmit}>
	<div class="search-input-wrapper">
		<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
		<input
			type="text"
			class="search-input"
			{placeholder}
			bind:value={inputValue}
			{autofocus}
		/>
		{#if inputValue}
			<button type="button" class="clear-btn" onclick={handleClear} aria-label={t('Clear search')}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
	<button type="submit" class="search-btn">{t('Search')}</button>
</form>

<style>
	.search-form {
		display: flex;
		gap: 12px;
		width: 100%;
	}

	.search-input-wrapper {
		position: relative;
		flex: 1;
	}

	.search-icon {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 18px;
		color: var(--color-gray-400);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 14px 48px 14px 48px;
		font-size: 1rem;
		font-family: inherit;
		border: 1px solid var(--color-gray-200);
		background-color: var(--color-white);
		transition: border-color var(--transition-fast);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-black);
	}

	.search-input::placeholder {
		color: var(--color-gray-400);
	}

	.clear-btn {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		padding: 4px;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-gray-400);
		transition: color var(--transition-fast);
	}

	.clear-btn:hover {
		color: var(--color-gray-600);
	}

	.clear-btn svg {
		width: 16px;
		height: 16px;
	}

	.search-btn {
		padding: 14px 24px;
		font-size: 0.875rem;
		font-weight: 500;
		font-family: inherit;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background-color: var(--color-black);
		color: var(--color-white);
		border: 1px solid var(--color-black);
		cursor: pointer;
		transition: background-color var(--transition-fast);
	}

	.search-btn:hover {
		background-color: var(--color-gray-800);
	}

	@media (max-width: 640px) {
		.search-form {
			flex-direction: column;
		}

		.search-btn {
			width: 100%;
		}
	}
</style>

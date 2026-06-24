<script lang="ts">
	import { t } from '$lib/useT.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>{t('Error - Blog')}</title>
</svelte:head>

<div class="error-page container container-narrow">
	<div class="error-content">
		<span class="error-code">{$page.status}</span>
		<h1 class="error-title">
			{#if $page.status === 404}
				{t('Page Not Found')}
			{:else}
				{t('Something went wrong')}
			{/if}
		</h1>
		<p class="error-message">
			{#if $page.error?.message}
				{$page.error.message}
			{:else if $page.status === 404}
				{t("The page you're looking for doesn't exist or has been moved.")}
			{:else}
				{t('An unexpected error occurred. Please try again later.')}
			{/if}
		</p>
		<a href="{base}/" class="btn btn-primary">{t('Back to Home')}</a>
	</div>
</div>

<style>
	.error-page {
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 48px 0;
	}

	.error-content {
		max-width: 480px;
	}

	.error-code {
		display: block;
		font-size: 6rem;
		font-weight: 700;
		line-height: 1;
		color: var(--color-gray-200);
		margin-bottom: 16px;
	}

	.error-title {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.error-message {
		color: var(--color-gray-500);
		margin-bottom: 32px;
		line-height: 1.6;
	}
</style>

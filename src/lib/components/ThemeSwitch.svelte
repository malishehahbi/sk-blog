<script lang="ts">
	import { t } from '../useT.svelte';
	type Theme = 'system' | 'light' | 'dark';

	let theme = $state<Theme>('system');
	let systemDark = $state(false);

	function getStoredTheme(): Theme | null {
		try {
			const stored = localStorage.getItem('theme');
			if (stored === 'system' || stored === 'light' || stored === 'dark') return stored;
		} catch {}
		return null;
	}

	function setStoredTheme(t: Theme) {
		try {
			if (t === 'system') {
				localStorage.removeItem('theme');
			} else {
				localStorage.setItem('theme', t);
			}
		} catch {}
	}

	function applyTheme(t: Theme, prefersDark: boolean) {
		const isDark = t === 'dark' || (t === 'system' && prefersDark);
		document.documentElement.classList.toggle('dark', isDark);
	}

	function updateSystemDark() {
		systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		applyTheme(theme, systemDark);
	}

	function select(t: Theme) {
		theme = t;
		setStoredTheme(t);
		applyTheme(t, systemDark);
	}

	$effect(() => {
		const stored = getStoredTheme();
		if (stored) theme = stored;

		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		systemDark = mq.matches;
		applyTheme(theme, systemDark);

		const handler = () => updateSystemDark();
		mq.addEventListener('change', handler);

		return () => mq.removeEventListener('change', handler);
	});

	const options: { value: Theme; label: string }[] = [
		{ value: 'system', label: t('System') },
		{ value: 'light', label: t('Light') },
		{ value: 'dark', label: t('Dark') },
	];
</script>

<div class="theme-switch" role="radiogroup" aria-label={t('Theme selection')}>
	{#each options as opt}
		<button
			class="option"
			class:selected={theme === opt.value}
			role="radio"
			aria-checked={theme === opt.value}
			onclick={() => select(opt.value)}
		>
			{opt.label}
		</button>
	{/each}
</div>

<style>
	.theme-switch {
		display: inline-flex;
		border: 1px solid var(--color-gray-300);
	}

	.option {
		padding: 6px 14px;
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: none;
		border: none;
		border-right: 1px solid var(--color-gray-300);
		cursor: pointer;
		color: var(--color-gray-500);
		transition: background-color var(--transition-fast), color var(--transition-fast);
	}

	.option:last-child {
		border-right: none;
	}

	.option:hover {
		color: var(--color-black);
	}

	.option.selected {
		background-color: var(--color-black);
		color: var(--color-white);
	}
</style>

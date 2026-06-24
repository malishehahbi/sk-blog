import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { wuchale } from 'wuchale/vite'

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(), wuchale()]
});

import { getRuntimeRx } from '../locales/main.loader.svelte.js'
import { keys } from '../locales/.wuchale/main.0.manifest.js'

const keyToIndex = new Map<string, number>()
for (let i = 0; i < keys.length; i++) {
	if (typeof keys[i] === 'string') {
		keyToIndex.set(keys[i], i)
	}
}

let runtime = $derived(getRuntimeRx(0))

export function t(key: string, ...args: (string | number)[]): string {
	const index = keyToIndex.get(key)
	if (index === undefined) return key
	const safeArgs = args.map(a => a ?? '')
	const result = runtime(index, safeArgs)
	return result || key
}

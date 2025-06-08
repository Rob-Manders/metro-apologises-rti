import { type Writable, writable } from 'svelte/store'
import type { PinnedStation } from '../types'

interface Cookie {
	[key: string]: string
}

export const pinnedStations: Writable<PinnedStation[]> = writable([])

export async function setPinnedStationsFromCookie(cookie: string): Promise<void> {
	const pinnedCookie = cookie.split(';').find((c) => {
		return c.includes('pinned')
	})

	let stations: string[] = pinnedCookie?.split('=')[1].split(',') ?? []
	if (stations.length < 1) {
		return
	}

	let pinned: PinnedStation[] = stations.map((s): PinnedStation => {
		return {
			code: s.slice(0, 3),
			platform: Number(s.slice(3))
		}
	})

	pinnedStations.set(pinned)
}

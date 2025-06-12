import { get, type Writable, writable } from 'svelte/store'
import type { PinnedStation, StationList } from '../types'
import { buildStationList } from '../util/buildStationList'
import { localStorageKey } from '../util/pinnedStations'

export const pinnedStations: Writable<PinnedStation[]> = writable([])

export async function setPinnedStationsFromLocalStorage(localStorageValue: string | null): Promise<void> {
	if (!localStorageValue || localStorageValue === "") {
		return
	}

	let stations: string[] = localStorageValue.split(',') ?? []
	if (stations.length < 1) {
		return
	}

	stations = stations.map(station => station.trim())
	stations.sort()

	const pinned: PinnedStation[] = stations.map((s): PinnedStation => {
		return {
			code: s.slice(0, 3),
			platform: Number(s.slice(3))
		}
	})

	pinnedStations.set(pinned)
}

export function pinStationPlatform(code: string, platform: number): StationList | null {
	let pinned = [...get(pinnedStations)]

	const i = pinned.findIndex((s) => s.code === code && s.platform === platform)
	if (i > -1) {
		return null
	}

	pinned.push({ code, platform })
	pinned.sort(sortStations)

	pinnedStations.set(pinned)

	return buildStationList(get(pinnedStations))
}

export function unpinStationPlatform(code: string, platform: number): StationList | null {
	let pinned = [...get(pinnedStations)]

	const i = pinned.findIndex((s) => s.code === code && s.platform === platform)
	if (i > -1) {
		pinned.splice(i, 1)
		pinned.sort(sortStations)

		pinnedStations.set(pinned)

		return buildStationList(get(pinnedStations))
	}

	return null
}

function sortStations(a: PinnedStation, b: PinnedStation): number {
	if (a.code < b.code) {
		return -1
	} else if (a.code > b.code) {
		return 1
	}

	return 0
}

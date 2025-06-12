import { get } from 'svelte/store'
import { pinnedStations } from '../stores/pinnedStations'

export const localStorageKey = 'pinnedStations'

export function stringifyPinnedStations(): string {
	const parsedPins = get(pinnedStations).map((station): string => {
		return `${station.code}${station.platform}`
	})

	return parsedPins.sort().join(',')
}

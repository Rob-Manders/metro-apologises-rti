import { get } from 'svelte/store'
import { pinnedStations } from '../stores/pinnedStations'

export const cookieName = 'pinned'

export function createPinnedStationsCookie(): string {
	const expiry: string = new Date(Date.now() + 3e12).toString()

	const parsedPins = get(pinnedStations).map((station): string => {
		return `${station.code}${station.platform}`
	})

	return `${cookieName}=${parsedPins.sort().join(',')}; expiry=${expiry}; SameSite=Lax`
}

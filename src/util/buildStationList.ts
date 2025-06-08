import type { PinnedStation, StationList } from '../types'
import { stations } from '../data/stations'

export function buildStationList(pinnedStations: PinnedStation[]): StationList {
	const stationList: StationList = {}

	for (const code of Object.keys(stations)) {
		if (code === 'MTW') {
			continue
		}

		if (code === 'MTS') {
			stationList[code] = {
				name: 'Monument',
				platforms: [false, false, false, false]
			}
			continue
		}

		stationList[code] = {
			name: stations[code],
			platforms: [false, false]
		}
	}

	for (const station of pinnedStations) {
		if (station.code === 'MTW') {
			stationList['MTS'].platforms[station.platform - 1] = true
			continue
		}

		stationList[station.code].platforms[station.platform - 1] = true
	}

	return stationList
}

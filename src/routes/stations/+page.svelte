<script lang="ts">
	import { onMount } from 'svelte'
	import {
		pinnedStations,
		pinStationPlatform,
		setPinnedStationsFromCookie,
		unpinStationPlatform
	} from '../../stores/pinnedStations'
	import type { StationList } from '../../types'
	import { buildStationList } from '../../util/buildStationList'
	import { createPinnedStationsCookie } from '../../util/cookie'

	let stationList: StationList = $state({})

	onMount(async () => {
		await setPinnedStationsFromCookie(document.cookie)

		stationList = buildStationList($pinnedStations)
	})

	function togglePlatform(stationCode: string, platformIndex: number): void {
		let newList: StationList | null = null

		if (stationList[stationCode].platforms[platformIndex]) {
			newList = unpinStationPlatform(stationCode, platformIndex + 1)
		} else {
			newList = pinStationPlatform(stationCode, platformIndex + 1)
		}

		if (newList) {
			stationList = newList
		}

		document.cookie = createPinnedStationsCookie()
	}
</script>

<p>Click on a station to see it's departures.</p>
<p>Pin platforms to show departures on your home page.</p>

{#each Object.keys(stationList) as station}
	<div class="station">
		<a href="/stations/{station}"><h2 class="station__name">{stationList[station].name}</h2></a>

		{#each stationList[station].platforms as platform, i}
			<label class="station__platform">
				Platform {i + 1}
				<input type="checkbox" checked={platform} onchange={() => togglePlatform(station, i)}>
			</label>
		{/each}
	</div>
{/each}

<style lang="scss">
	.station {
		a {
			text-decoration: none;
		}
		
		&__name {
			font-family: "Calvert", sans-serif;
			font-size: 1.25rem;
			font-weight: 700;
		}

		&__platform {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
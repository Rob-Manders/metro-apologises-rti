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
	import Search from '../../components/icons/Search.svelte'

	let stationList: StationList = $state({})

	let searchString: string = $state('')
	let filteredList: StationList = $derived.by(() => {
		const list: StationList = {}

		for (const code of Object.keys(stationList)) {
			if (stationList[code].name.toLowerCase().includes(searchString)) {
				list[code] = stationList[code]
			}
		}

		return list
	})

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

<div class="search">
	<input bind:value={searchString} type="text" class="search__input"/>
	<Search className="search__icon"/>
</div>

<div class="info">
	<p>Click on a station to see it's departures.</p>
	<p>Pin platforms to show them on your home page.</p>
</div>

{#each Object.keys(filteredList) as station}
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
	.search {
		display: flex;
		position: relative;
		width: 100%;
		height: 2.5rem;
		margin: 1.25rem 0;

		&__input,
		&__button {
			position: absolute;
			background-color: var(--background-secondary);
			color: var(--text-primary);
			padding-left: 1.25rem;
			border: none;
		}

		&__input {
			inset: 0;
			font-size: 1rem;
			border-radius: 1.25rem;

			&:focus {
				outline: #3c3c3c solid 2px;
			}
		}

		:global(.search__icon) {
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			padding: 0.5rem;
			fill: var(--text-primary);
			width: 2.5rem;
			aspect-ratio: 1 / 1;
		}
	}

	.info {
		font-size: 0.9rem;
		text-align: center;
		margin-bottom: 1.25rem;
		opacity: 0.7;

		p {
			margin: 0.5rem;
		}
	}

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
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
	import ToggleOn from '../../components/icons/ToggleOn.svelte'
	import ToggleOff from '../../components/icons/ToggleOff.svelte'

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
	<p>Click on a station to see its departures.</p>
	<p>Pin platforms to show them on your home page.</p>
</div>

{#each Object.keys(filteredList) as station}
	<div class="station">
		<a href="/stations/{station}"><h2 class="station__name">{stationList[station].name}</h2></a>

		<div class="station__platforms">
			{#each stationList[station].platforms as pinned, i}
				<label class="station__platform">
					Platform {i + 1}
					<button class="station__button" onclick={() => togglePlatform(station, i)}>
						{#if pinned}
							<ToggleOn className="station__toggle station__toggle--on"/>
						{:else}
							<ToggleOff className="station__toggle station__toggle--off"/>
						{/if}
					</button>
				</label>
			{/each}
		</div>
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
			margin-bottom: 0.5rem;
		}

		&__platforms {
			background-color: var(--background-secondary);
			border-radius: 8px;
			overflow: hidden;
		}

		&__platform {
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 0.9rem;
			padding: 0 0.5rem;
		}

		&__button {
			background: none;
			padding: 0;
			border: none;
			outline: none;
			pointer-events: none;
			height: 2.25rem;

			&:hover,
			&:focus {
				:global(.station__toggle) {
					fill: var(--focus);
					opacity: 1;
				}
			}
		}
	}

	.station__platform + .station__platform {
		border-top: 1px solid var(--divider);
	}

	:global(.station__toggle) {
		width: 2.25rem;
		fill: var(--text-primary);
		opacity: 0.2;
	}

	:global(.station__toggle--on) {
		opacity: 1;
	}
</style>
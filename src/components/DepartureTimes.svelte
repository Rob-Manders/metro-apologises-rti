<script module>
	export let refresh: () => void
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { stations } from '../data/stations'
	import type { Departure } from '../types'

	let { stationCode, platform, showName = true } = $props()

	let stationName = $state('')
	let departures = writable<Departure[]>([])

	onMount(async () => {
		refresh = getDepartures
		stationName = stations[stationCode].includes('Monument') ? 'Monument' : stations[stationCode]

		getDepartures()
	})

	function getDepartures() {
		if (stationCode == 'MTS' && (platform == 3 || platform == 4)) stationCode = 'MTW'
		if (stationCode == 'MTW' && (platform == 1 || platform == 2)) stationCode = 'MTS'

		fetch(`https://metro-rti.nexus.org.uk/api/times/${stationCode}/${platform}`)
		.then(response => response.json())
		.then(data => {
			departures.set(data)
		})
		.catch(error => {
			console.error('Error fetching departure times', error)
		})
	}
</script>

<div class="container">
	{#if showName}
		<h3 class="header">{stationName} <span class="header--platform">Platform {platform}</span></h3>
	{:else}
		<h3 class="header"><span class="header--platform">Platform {platform}</span></h3>
	{/if}

	<div class="departures">
		{#each $departures as departure}
			<div class="departure">
				<div class="line line--{departure.line.toLocaleLowerCase()}">
					<span>{departure.line[0]}</span>
				</div>
				<div class="details">
					<p class="details__destination">{departure.destination}</p>

					{#if departure.dueIn > 0}
						<p class="details__due">Due in <strong>{departure.dueIn} mins</strong></p>
					{:else}
						<p class="details__due">Due <strong>now</strong></p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../styles/palette' as *;

	.container {
		margin-bottom: 1rem;
	}

	.header {
		font-family: "Calvert", sans-serif;
		margin: 0 0 0.25rem 0;

		&--platform {
			font-weight: 400;
			font-size: 0.9rem;
			opacity: 0.8;
		}
	}

	.departures {
		background: $background-secondary;
		border-radius: 8px;
		overflow: hidden;
	}

	.departure {
		display: flex;
		gap: 0.25rem;

		+ .departure {
			border-top: 1px solid #121212;
		}

		p {
			margin: 0.3rem;
		}
	}

	.line {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		font-family: "Calvert", sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		color: $background-secondary;
		width: 1rem;
		padding-bottom: 0.2rem;

		span {
			opacity: 0.5;
		}

		&--green {
			background-color: $metro-green;
		}

		&--yellow {
			background-color: $metro-yellow;
		}
	}

	.details {
		&__due {
			font-size: 0.8rem;
		}
	}
</style>
<script module>
	export let refresh: () => void
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { stations } from '../data/stations'
	import type { Departure } from '../types'

	const { stationCode } = $props()

	let departures = writable<Departure[]>([])

	onMount(async () => {
		refresh = getDepartures

		getDepartures()
	})

	function getDepartures() {
		fetch(`https://metro-rti.nexus.org.uk/api/times/${stationCode}/1`)
		.then(response => response.json())
		.then(data => {
			departures.set(data)
		})
		.catch(error => {
			console.log(error)
		})
	}
</script>

<div class="departures__container">
	<h3>{stations[stationCode]}</h3>

	<div class="departure__times">
		{#each $departures as departure}
			<div class="departure__time">
				<p>{departure.destination}</p>
				<p>Due In: {departure.dueIn > 0 ? departure.dueIn : 'Now'}</p>
			</div>
		{/each}
	</div>
</div>
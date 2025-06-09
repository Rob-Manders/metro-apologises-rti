<script>
	import { onMount } from 'svelte'
	import { pinnedStations, setPinnedStationsFromCookie } from '../stores/pinnedStations.js'
	import DepartureTimes from "../components/DepartureTimes.svelte"

	onMount(async () => {
		await setPinnedStationsFromCookie(document.cookie)

		console.log($pinnedStations)
	})
</script>

{#if $pinnedStations.length > 0}
	{#each $pinnedStations as station}
		<DepartureTimes stationCode={station.code} platform={station.platform}/>
	{/each}
{:else}
	<div class="select-stations">
		<p>Your saved stations will show here.</p>
		<p><a href="stations">Select stations</a></p>
	</div>
{/if}

<style lang="scss">
	@use '../styles/palette' as *;

	.select-stations {
		background-color: var(--background-secondary);
		text-align: center;
		margin-top: 1rem;
		padding: 1rem;
		border-radius: 8px;
	}
</style>
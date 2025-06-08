<script lang="ts">
	import DepartureTimes from '../../../components/DepartureTimes.svelte'
	import { stations } from '../../../data/stations'

	const { data } = $props()
</script>

<h2>{stations[data.station].includes('Monument') ? 'Monument' : stations[data.station]}</h2>

<DepartureTimes stationCode={data.station} platform="1" showName="{false}"/>
<DepartureTimes stationCode={data.station} platform="2" showName="{false}"/>

{#if data.station === 'MTS' || data.station === 'MTW'}
	<DepartureTimes stationCode={data.station} platform="3" showName="{false}"/>
	<DepartureTimes stationCode={data.station} platform="4" showName="{false}"/>
{/if}

<style lang="">
	h2 {
		font-family: "Calvert", sans-serif;
		font-size: 1.25rem;
		text-align: center;
		margin: 0.5rem 0;
	}
</style>
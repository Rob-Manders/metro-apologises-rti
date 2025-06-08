<script>
	import DepartureTimes, { refresh } from "../components/DepartureTimes.svelte";
</script>

<DepartureTimes stationCode="MTS" platform="1"/>
<DepartureTimes stationCode="MTS" platform="2"/>
<DepartureTimes stationCode="MTS" platform="3"/>
<DepartureTimes stationCode="MTS" platform="4"/>

<button onclick={refresh}>Refresh</button>
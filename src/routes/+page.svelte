<script>
	import StationDepartures, { refresh } from "../components/StationDepartures.svelte";
</script>

<StationDepartures stationCode="GST" platform="1"/>

<button onclick={refresh}>Refresh</button>
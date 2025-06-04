<script>
	import StationDepartures, { refresh } from "../components/StationDepartures.svelte";
</script>

<StationDepartures stationCode="GST"/>

<button onclick={refresh}>Refresh</button>
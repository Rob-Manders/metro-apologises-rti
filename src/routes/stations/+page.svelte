<script lang="ts">
	import { stations } from '../../data/stations'
</script>

{#each Object.values(stations) as station}
	<p>{station}</p>
{/each}
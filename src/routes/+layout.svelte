<script>
	import '../styles/base.scss';

	let {children} = $props()
</script>

<header>
	<h1 class="main-header">Metro Apologises</h1>
</header>

{@render children()}

<style lang="scss">
	.main-header {
		font-size: 1.5rem;
		text-align: center;
	}
</style>
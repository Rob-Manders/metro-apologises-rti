<script>
	import '../styles/base.scss';
	import Metro from '../components/icons/Metro.svelte'
	import Home from '../components/icons/Home.svelte'

	let {children} = $props()
</script>

<header>
	<a class="header__icon__link" href="/">
		<Home className="header__icon"/>
	</a>
	<a class="header" href="/">
		<h1 class="main-header">Metro Apologises</h1>
		<p>Live Departures</p>
	</a>
	<a class="header__icon__link" href="/stations">
		<Metro className="header__icon"/>
	</a>
</header>

<main>
	{@render children()}
</main>

<footer>
	<a href="/about">About</a> - <a	href="https://github.com/Rob-Manders/metro-apologises-rti" target="_blank">GitHub</a>
</footer>

<style lang="scss">
	@use '../styles/palette' as *;

	:global(.header__icon) {
		fill: var(--text-primary);
		width: 1.5rem;
		height: 1.5rem;
		transition: fill 150ms ease-in-out;
	}

	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}

	.header__icon__link {
		display: block;
		width: 42px;
		height: 42px;
		padding: 0.5rem;

		&:hover,
		&:focus {
			:global(.header__icon) {
				fill: var(--focus);
			}
		}
	}

	.header {
		display: block;
		text-align: center;
		font-family: "Calvert", sans-serif;
		padding: 0.5rem;

		&:hover,
		&:focus {
			color: unset;
		}

		p {
			font-size: 0.9rem;
			margin: 0.25rem 0 0 0;
		}
	}

	.main-header {
		font-size: 1.5rem;
		text-align: center;
	}

	main {
		padding: 0 0.5rem;
	}

	footer {
		text-align: center;
		font-size: 0.65rem;
		margin-top: auto;
		padding: 1rem;
	}

	a {
		text-decoration: none;
	}
</style>
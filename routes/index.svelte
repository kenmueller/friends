<script lang="ts" context="module">
	export const load: Load = async ({ url, fetch }) => ({
		props: {
			webring: await deepWebringFromShallowWebring(myShallowWebring(url), fetch)
		}
	})
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit'

	import type DeepWebring from '$lib/webring/deep'
	import myShallowWebring from '$lib/webring/shallow/my'
	import deepWebringFromShallowWebring from '$lib/webring/deep/from/shallow'
	import MetaImage from '../components/Meta/Image.svelte'
	import MetaTitle from '../components/Meta/Title.svelte'
	import MetaDescription from '../components/Meta/Description.svelte'

	export let webring: DeepWebring
</script>

<MetaImage />
<MetaTitle />
<MetaDescription />

<main>
	<h1>Ken's Friends</h1>
	<p>{JSON.stringify(webring)}</p>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	h1 {
		text-align: center;
	}
</style>

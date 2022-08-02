<script lang="ts" context="module">
	export const load: Load = async ({ url, fetch }) => ({
		props: {
			head: await deepWebringFromShallowWebring(myShallowWebring(url), fetch)
		}
	})
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit'

	import type ShallowWebring from '$lib/webring/shallow'
	import type DeepWebring from '$lib/webring/deep'
	import myShallowWebring from '$lib/webring/shallow/my'
	import deepWebringFromShallowWebring from '$lib/webring/deep/from/shallow'
	import MetaImage from '../components/Meta/Image.svelte'
	import MetaTitle from '../components/Meta/Title.svelte'
	import MetaDescription from '../components/Meta/Description.svelte'
	import FriendNode from '../components/Friend/Node.svelte'
	import Back from '../images/Back.svelte'

	export let head: DeepWebring
	let history: DeepWebring[] = []

	const back = () => {
		const newHead = history.pop()
		if (!newHead) return

		head = newHead
		history = [...history] // Mutated from .pop(), must update
	}

	const setHead = async (friend: ShallowWebring) => {
		const oldHead = head

		head = await deepWebringFromShallowWebring(friend)
		history = [...history, oldHead]
	}
</script>

<MetaImage />
<MetaTitle />
<MetaDescription />

<main>
	<h1>Ken's Friends</h1>
	<div class="head">
		{#if history.length}
			<button class="back" on:click={back}>
				<Back />
				Back
			</button>
		{/if}
		<FriendNode friend={head} />
	</div>
	<div class="friends">
		{#each head.friends as friend (friend.url?.href || friend.name)}
			<FriendNode {friend} onClick={() => setHead(friend)} />
		{:else}
			<p>No friends</p>
		{/each}
	</div>
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

	.head {
		position: relative;
		margin-top: 2rem;
	}

	.back {
		position: absolute;
		top: 50%;
		left: -2rem;
		display: flex;
		align-items: center;
		font-size: 1rem;
		color: colors.$blue;
		transform: translate(-100%, -50%);
		transition: opacity 0.3s;

		> :global(svg) {
			height: 2rem;
		}

		&:hover {
			opacity: 0.7;
		}
	}

	.friends {
		display: flex;
		margin-top: 2rem;

		> :global(article) + :global(article) {
			margin-left: 2rem;
		}
	}
</style>

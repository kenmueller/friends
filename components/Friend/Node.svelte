<script lang="ts">
	import type ShallowWebring from '$lib/webring/shallow'
	import type DeepWebring from '$lib/webring/deep'

	export let friend: ShallowWebring | DeepWebring
	export let onClick: (() => void) | null = null

	$: hostname = friend.url && new URL(friend.url).hostname
</script>

<article role={onClick ? 'button' : undefined} on:click={onClick}>
	{#if friend.name}
		<p>{friend.name || hostname || 'unknown'}</p>
	{/if}
	<a
		href={friend.url || friend.name || ''}
		rel="noopener noreferrer nofollow"
		target="_blank"
		on:click|stopPropagation
	>
		{hostname || friend.name || 'unknown'}
	</a>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 11.56rem;
		height: 6.88rem;
		padding: 0 2rem;
		text-align: center;
		background: rgba(gray, 0.1);
		border-radius: 1rem;
	}

	[role='button'] {
		transition: transform 0.3s;

		&:hover {
			transform: translateY(-2px);
		}
	}

	p {
		margin-bottom: 0.5rem;
	}

	a {
		font-weight: 500;
		color: colors.$blue;
		transition: opacity 0.3s;

		&:hover {
			opacity: 0.7;
		}
	}
</style>

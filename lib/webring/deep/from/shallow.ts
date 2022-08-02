import type Fetch from '$lib/fetch'
import type ShallowWebring from '$lib/webring/shallow'
import type DeepWebring from '..'
import getShallowWebring from '$lib/webring/shallow/get'

const deepWebringFromShallowWebring = async (
	webring: ShallowWebring,
	fetch: Fetch = window.fetch
): Promise<DeepWebring> => ({
	url: webring.url,
	name: webring.name,
	friends: await Promise.all(
		webring.friends.map(friend => getShallowWebring(friend, fetch))
	)
})

export default deepWebringFromShallowWebring

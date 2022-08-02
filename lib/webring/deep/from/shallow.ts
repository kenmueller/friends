import type Fetch from '$lib/fetch'
import type ShallowWebring from '$lib/webring/shallow'
import type DeepWebring from '..'
import errorFromResponse from '$lib/error/from/response'

const deepWebringFromShallowWebring = async (
	webring: ShallowWebring,
	fetch: Fetch = window.fetch
): Promise<DeepWebring> => {
	const response = await fetch(
		`/webring/shallow?friends=${encodeURIComponent(
			JSON.stringify(webring.friends)
		)}`
	)
	if (!response.ok) throw await errorFromResponse(response)

	return {
		url: webring.url,
		name: webring.name,
		friends: (await response.json()) as ShallowWebring[]
	}
}

export default deepWebringFromShallowWebring

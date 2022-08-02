import type Fetch from '$lib/fetch'
import type ShallowWebring from '.'
import urlFromString from '$lib/url/from/string'
import errorFromResponse from '$lib/error/from/response'

const getShallowWebring = async (
	url: string,
	fetch: Fetch = window.fetch
): Promise<ShallowWebring> => {
	const urlObject = urlFromString(url)
	if (!urlObject) return { url: null, name: url, friends: [] }

	try {
		const response = await fetch(new URL('/webring.json', urlObject).href)
		if (!response.ok) throw await errorFromResponse(response)

		const webring = (await response.json()) as Record<string, unknown>
		if (!webring) throw new Error('Invalid webring')

		return {
			url: urlObject,
			name: (typeof webring.name === 'string' && webring.name) || null,
			friends:
				Array.isArray(webring.friends) &&
				webring.friends.every(friend => typeof friend === 'string' && friend)
					? (webring.friends as string[])
					: []
		}
	} catch {
		return { url: urlObject, name: null, friends: [] }
	}
}

export default getShallowWebring

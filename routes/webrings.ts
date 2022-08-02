import type { RequestHandler } from '@sveltejs/kit'

import getShallowWebring from '$lib/webring/shallow/get'
import HttpError from '$lib/error/http'
import ErrorCode from '$lib/error/code'
import errorFromValue from '$lib/error/from/value'

export const GET: RequestHandler = async ({ url }) => {
	try {
		const urls = url.searchParams.get('urls')
		if (!urls) throw new HttpError(ErrorCode.BadRequest, 'Invalid URLs')

		const friends = JSON.parse(urls) as string[]

		if (
			Array.isArray(friends) &&
			friends.every(friend => typeof friend === 'string' && friend)
		) {
			return {
				headers: {
					'access-control-allow-origin': '*',
					'content-type': 'application/json'
				},
				body: JSON.stringify(await Promise.all(friends.map(getShallowWebring)))
			}
		} else {
			throw new HttpError(ErrorCode.BadRequest, 'Invalid friends')
		}
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}

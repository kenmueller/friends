import type { RequestHandler } from '@sveltejs/kit'

import getShallowWebring from '$lib/webring/shallow/get'
import HttpError from '$lib/error/http'
import ErrorCode from '$lib/error/code'
import errorFromValue from '$lib/error/from/value'

export const GET: RequestHandler = async ({ url }) => {
	try {
		const friendsString = url.searchParams.get('friends')

		if (!friendsString)
			throw new HttpError(ErrorCode.BadRequest, 'Invalid friends')

		const friends = JSON.parse(friendsString) as string[]

		if (
			Array.isArray(friends) &&
			friends.every(friend => typeof friend === 'string' && friend)
		) {
			return {
				headers: {
					'access-control-allow-origin': '*',
					'cache-control': 'no-cache',
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

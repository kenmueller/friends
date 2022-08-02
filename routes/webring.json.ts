import type { RequestHandler } from '@sveltejs/kit'

import errorFromValue from '$lib/error/from/value'
import webring from '../data/webring.json'

let data: string | null = null

export const GET: RequestHandler = () => {
	try {
		return {
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'application/json'
			},
			body: (data ??= JSON.stringify(webring))
		}
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return { status: code, body: message }
	}
}

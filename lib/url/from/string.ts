const urlFromString = (url: string) => {
	try {
		if (!(url.startsWith('http://') || url.startsWith('https://')))
			url = `https://${url}`

		return new URL(url)
	} catch {
		return null
	}
}

export default urlFromString

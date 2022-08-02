type Fetch = (
	info: RequestInfo,
	init?: RequestInit | undefined
) => Promise<Response>

export default Fetch

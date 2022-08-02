export default interface ShallowWebring {
	deep: false
	url: URL | null
	name: string | null
	friends: string[]
}

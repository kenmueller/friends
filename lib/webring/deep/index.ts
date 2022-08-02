import type ShallowWebring from '../shallow'

export default interface DeepWebring {
	deep: true
	url: URL | null
	name: string | null
	friends: ShallowWebring[]
}

import type WebringInfo from '../info'

export default interface ShallowWebring extends WebringInfo {
	friends: string[]
}

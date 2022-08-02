import type WebringInfo from '../info'
import type ShallowWebring from '../shallow'

export default interface DeepWebring extends WebringInfo {
	friends: ShallowWebring[]
}

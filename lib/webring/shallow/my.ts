import type ShallowWebring from '.'
import webring from '../../../data/webring.json'

const myShallowWebring = (url: URL): ShallowWebring => ({
	deep: false,
	url,
	name: webring.name,
	friends: webring.friends
})

export default myShallowWebring

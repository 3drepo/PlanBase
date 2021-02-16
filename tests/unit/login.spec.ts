import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Login from '@/components/Login.vue';
// import vuetify from 'vuetify';

describe('Login.vue', () => {
	let wrapper: any;
	// beforeEach(() => {
	// 	Vue.use(vuetify);
	// 	wrapper = shallowMount(Login);
	// });

	// Welcome message
	it('renders welcome message', () => {
		const msg = 'Welcome to the Royal Victoria Docks Community Engagement Portal';
		expect(wrapper.text()).toMatch(msg);
	});
});

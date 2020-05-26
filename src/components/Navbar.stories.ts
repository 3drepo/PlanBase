import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Navbar from './Navbar.vue';

import '../main.scss';

storiesOf('Navbar', module).add('Default', () => ({
	components: { Navbar },
	// methods: { action: action('question') },
	template: `<Navbar />`,
}));

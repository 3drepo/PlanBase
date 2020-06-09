import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import PinDetails from './PinDetails.vue';

import '../main.scss';

storiesOf('PinDetails', module).add('Default', () => ({
	components: { PinDetails },
	// methods: { action: action('PinDetails') },
	template: `<PinDetails />`,
}));

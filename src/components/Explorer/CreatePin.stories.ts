import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import CreatePin from './CreatePin.vue';

import '../main.scss';

storiesOf('CreatePin', module).add('Default', () => ({
	components: { CreatePin },
	// methods: { action: action('CreatePin') },
	template: `<CreatePin />`,
}));

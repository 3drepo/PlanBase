import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import PinComment from './PinComment.vue';

import '../main.scss';

storiesOf('PinComment', module).add('Default', () => ({
	components: { PinComment },
	// methods: { action: action('PinComment') },
	template: `<PinComment />`,
}));

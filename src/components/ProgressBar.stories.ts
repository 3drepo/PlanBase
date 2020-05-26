import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import ProgessBar from './ProgessBar.vue';

import '../main.scss';

storiesOf('ProgessBar', module).add('Default', () => ({
	components: { ProgessBar },
	// methods: { action: action('question') },
	template: `<ProgessBar />`,
}));

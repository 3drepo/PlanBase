import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Question from './Question.vue';

import '../main.scss';

storiesOf('Question', module).add('Default', () => ({
	components: { Question },
	// methods: { action: action('question') },
	template: `<Question />`,
}));

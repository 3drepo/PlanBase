import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import QuestionsList from './QuestionsList.vue';

import '../main.scss';

storiesOf('QuestionsList', module)
	.add('Default', () => ({
		components: { QuestionsList },
		methods: { action: action('question') },
		template: `<QuestionsList @selected="action" />`,
	}))
	.add('Questions 2', () => ({
		components: { QuestionsList },
		computed: {
			questions() {
				return [
					{
						id: '1',
						label: 'Subway',
					},
					{
						id: '2',
						label: 'Stadium',
					},
					{
						id: '3',
						label: 'Cafe',
					},
					{
						id: '4',
						label: 'Footpath',
					},
					{
						id: '5',
						label: 'Drainage',
					},
					{
						id: '6',
						label: 'Garden',
					},
					{
						id: '7',
						label: 'Subway',
					},
					{
						id: '8',
						label: 'Stadium',
					},
					{
						id: '9',
						label: 'Cafe',
					},
					{
						id: '10',
						label: 'Footpath',
					},
					{
						id: '11',
						label: 'Drainage',
					},
					{
						id: '12',
						label: 'Garden',
					},
				];
			},
		},
		methods: { action: action('question') },
		template: `<QuestionsList :questions="questions" @selected="action" />`,
	}));

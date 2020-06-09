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
						title: 'Subway',
					},
					{
						id: '2',
						title: 'Stadium',
					},
					{
						id: '3',
						title: 'Cafe',
					},
					{
						id: '4',
						title: 'Footpath',
					},
					{
						id: '5',
						title: 'Drainage',
					},
					{
						id: '6',
						title: 'Garden',
					},
					{
						id: '7',
						title: 'Subway',
					},
					{
						id: '8',
						title: 'Stadium',
					},
					{
						id: '9',
						title: 'Cafe',
					},
					{
						id: '10',
						title: 'Footpath',
					},
					{
						id: '11',
						title: 'Drainage',
					},
					{
						id: '12',
						title: 'Garden',
					},
				];
			},
		},
		methods: { action: action('question') },
		template: `<QuestionsList :questions="questions" @selected="action" />`,
	}));

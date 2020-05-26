import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default new Vuex.Store({
	state: {
		user: {
			email: null,
			postcode: null,
		},

		overview: {
			title: 'Royal Victoria Docks Community Engagement Portal',
			bodyText:
				'The Royal Docks is embarking on an exciting new chapter, with over £8bn being invested in the area over the next 20 years. Here’s the full story on how the Royal Docks offers a different way to live, work, and invest in London.\n\nNewham’s population is one of the area’s greatest assets. The Royal Docks team is working closely with Newham Council to ensure that regeneration improves education, employment and business opportunity for existing residents.',
			logoUrl: 'https://api3.www.3drepo.io/api/PlanBase/19a3ef10-83d8-11ea-81c9-931a0b2034c3/resources/17d37f30-9e8f-11ea-bb8a-7339f221efad',
			backgroundUrl: 'https://api3.www.3drepo.io/api/PlanBase/19a3ef10-83d8-11ea-81c9-931a0b2034c3/resources/17d37f31-9e8f-11ea-bb8a-7339f221efad',
		} as Overview,

		questions: [
			{
				id: 'q1',
				label: 'Bollards',
				text: 'Are the bollards in the correct location to ensure the safety of pedestrians?',
				rating: null,
				comment: null,
				type: 'question',
				narrative: {
					image: 'https://picsum.photos/900/300',
					comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id euismod nisl, id ultrices tellus. Mauris scelerisque tempus turpis sed luctus.',
				},
			},
			{
				id: 'q2',
				label: 'Town Hall',
				text: 'It this the right location for the Town Hall?',
				rating: null,
				comment: null,
				type: 'question',
			},
			{
				id: 'q3',
				label: 'Dry Docks',
				text: 'Would you expect boats to be docked here at any time?',
				rating: null,
				comment: null,
				type: 'bookmark',
				narrative: {
					image: 'https://picsum.photos/1200/400',
					comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id euismod nisl, id ultrices tellus. Mauris scelerisque tempus turpis sed luctus.',
				},
			},
			{
				id: 'q4',
				label: 'Car Parks',
				text: 'Are the traffic calming measures appropriate for this car park?',
				rating: null,
				comment: null,
				type: 'question',
			},
			{
				id: 'q5',
				label: 'Cycle Lane',
				text: 'Do you agree that these cycling lanes are located in the best place for motor users?',
				rating: null,
				comment: null,
				type: 'question',
			},
			{
				id: 'q6',
				label: 'Astro Pitch',
				text: 'Do you foresee this astro pitch being used on a regular basis?',
				rating: null,
				comment: null,
				type: 'bookmark',
			},
			{
				id: 'q7',
				label: 'Retail Park',
				text: 'Are the retail areas sufficienct for this area of town?',
				rating: null,
				comment: null,
				type: 'question',
				narrative: {
					image: 'https://picsum.photos/1000/300',
					comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id euismod nisl, id ultrices tellus. Mauris scelerisque tempus turpis sed luctus.',
				},
			},
			{
				id: 'q8',
				label: 'Zebra Crossing',
				text: 'Will the presence of a Zebra crossing be good for the community?',
				rating: null,
				comment: null,
				type: 'question',
			},
			{
				id: 'q9',
				label: 'Central Park',
				text: 'Is the central park to your liking?',
				rating: null,
				comment: null,
				type: 'question',
			},
			{
				id: 'q10',
				label: 'Swimming Pool',
				text: 'Will you be using the swimming pool a great deal?',
				rating: null,
				comment: null,
				type: 'bookmark',
			},
			{
				id: 'q11',
				label: 'Underground',
				text: 'Do you agree that the underground station is a critical facility for this community?',
				rating: null,
				comment: null,
				type: 'question',
			},
			{
				id: 'q12',
				label: 'Bus Station',
				text: 'Do you agree that the bus station is a critical facility for this community?',
				rating: null,
				comment: null,
				type: 'question',
			},
		] as Question[],

		pins: [
			{
				id: 'p1',
				x: 623,
				y: 987,
				createdBy: 'chris@bkrdev.com',
				createdAt: '2020/03/15',
			},
			{
				id: 'p2',
				x: 951,
				y: 354,
				createdBy: 'chris@bkrdev.com',
				createdAt: '2020/03/22',
			},
		] as Pin[],

		pinComments: [
			{
				id: 'pc1',
				pinId: 'p1',
				category: 'Education',
				createdBy: 'Guest 654',
				createdAt: '2020/04/02 09:56',
				text:
					'Lorem anim ex id laboris fugiat voluptate irure ad est qui. Ullamco ea ea aliqua labore nisi dolor. Nostrud adipisicing minim duis excepteur velit amet. Esse sint sunt ullamco consequat enim anim eiusmod ullamco ad fugiat. Sit aute aute mollit consectetur nostrud elit incididunt id incididunt eu mollit aute ex ad. Et in officia aliquip dolore ea cupidatat. Excepteur consectetur officia mollit id velit reprehenderit aute exercitation tempor sint aliquip id et voluptate.',
				positive: 12,
				negative: 5,
			},
			{
				id: 'pc2',
				pinId: 'p1',
				category: 'Leisure',
				createdBy: 'Guest 951',
				createdAt: '2020/04/04 16:28',
				text: 'Ex laborum laboris dolore consequat id tempor amet non.',
				positive: 12,
				negative: 15,
			},
			{
				id: 'pc3',
				pinId: 'p1',
				category: 'Transport',
				createdBy: 'Guest 127',
				createdAt: '2020/04/05 21:12',
				text:
					'Sit tempor dolor elit qui cillum laboris nostrud velit. Laborum esse id occaecat aute in amet aute ipsum ad labore veniam. Aliqua exercitation cupidatat laborum sunt esse do laborum sit. Consectetur officia aliqua proident exercitation. Pariatur deserunt duis cillum consequat id anim irure proident quis id aliqua veniam.',
				positive: 27,
				negative: 12,
			},
			{
				id: 'pc4',
				pinId: 'p2',
				category: 'Leisure',
				createdBy: 'Guest 127',
				createdAt: '2020/04/05 21:12',
				text:
					'Elit excepteur magna ut consequat qui elit incididunt dolor. Consequat reprehenderit eiusmod est velit ex non non ea. Cillum Lorem fugiat exercitation do veniam enim irure id labore Lorem.',
				positive: 17,
				negative: 8,
			},
		] as PinComment[],
	},

	getters: {
		user(state: any) {
			return state.user;
		},

		overview(state: any) {
			return state.overview;
		},

		questions(state: any) {
			return state.questions;
		},

		pins(state: any) {
			return state.pins;
		},

		pinComments(state: any) {
			return state.pinComments;
		},
	},

	mutations: {
		setUser(state: any, { email, postcode }: any) {
			// console.log('Store: setUser');
			state.user.email = email;
			state.user.postcode = postcode;
		},

		setPins(state: any, pin: Pin) {
			state.pins = [...state.pins, pin];
		},

		setComments(state: any, comment: PinComment) {
			state.pinComments = [...state.pinComments, comment];
		},
	},

	actions: {
		async createPin({ commit, state }: any, { category, text, x, y }: any) {
			const pin: Pin = {
				id: uuidv4(),
				x,
				y,
				createdBy: state.user.email,
				createdAt: format(new Date(), 'yyyy/MM/dd HH:mm'),
			};

			const comment: PinComment = {
				id: uuidv4(),
				pinId: pin.id,
				category,
				text,
				createdBy: state.user.email,
				createdAt: format(new Date(), 'yyyy/MM/dd HH:mm'),
				positive: 0,
				negative: 0,
			};

			// Todo: Write to API

			commit('setPins', pin);
			commit('setComments', comment);

			return;
		},

		async saveComment({ commit }: any, { category, text, pinId }: any) {
			const comment: PinComment = {
				id: 'pc651',
				pinId,
				category,
				createdBy: 'Guest 987',
				createdAt: format(new Date(), 'yyyy/MM/dd HH:mm'),
				text,
				positive: 0,
				negative: 0,
			};

			// Todo: Write to API

			commit('setComments', comment);

			return;
		},
	},

	modules: {},
});

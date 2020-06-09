import Vue from 'vue';
import Vuex from 'vuex';

// 3dRepo API
import ApiManager from '../libs/tdr/api-manager';
import ApiClient from '../libs/tdr/api-client';
let apiManager = new ApiManager('PlanBase', '353a00c0-9918-11ea-bb8a-7339f221efad');
let apiClient = new ApiClient('');

Vue.use(Vuex);

import { format, isWithinInterval } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default new Vuex.Store({
	state: {
		highContrast: false,

		user: {
			email: null,
			postcode: null,
		},

		overview: {
			title: '',
			bodyText: '',
			logoUrl: '',
			backgroundUrl: '',
		} as Overview,

		questions: [] as Question[],

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

		walkthroughPoints: [] as WalkthroughPoint[],

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
		highContrast(state: any) {
			return state.highContrast;
		},

		user(state: any) {
			return state.user;
		},

		overview(state: any) {
			return state.overview;
		},

		walkthroughPoints(state: any) {
			return state.walkthroughPoints;
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
		toggleHighContrast(state: any) {
			state.highContrast = !state.highContrast;
		},

		setOverview(state: any, overview: Overview) {
			state.overview = overview;
		},

		setQuestions(state: any, questions: Question[]) {
			state.questions = questions;
		},

		setUser(state: any, { email, postcode }: any) {
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
		async init({ commit }: any) {
			const res: any = await Promise.all([apiManager.getProjectOverview(), apiManager.getWalkthroughPoints()]).catch(err => {
				console.error(err);
				return;
			});

			const questions = res[1].map((w: WalkthroughPoint) => {
				return {
					id: w.id,
					title: w.title,
					bodyText: w.bodyText,
					type: w.type,
					thumbnailUrl: 'https://api3.www.3drepo.io/api/' + w.thumbnailUrl,
					viewpoint: w.viewpoint,
					narrative: {
						image: 'https://api3.www.3drepo.io/api/' + w.thumbnailUrl,
						comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id euismod nisl, id ultrices tellus. Mauris scelerisque tempus turpis sed luctus.',
					},
					comment: null,
					rating: null,
				} as Question;
			});

			commit('setOverview', res[0]);
			commit('setQuestions', questions);
		},

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

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// Vuew Persist
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
});

// 3dRepo API
import ApiManager from '../libs/tdr/api-manager';
let apiManager;

// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://0zi7k1xq57.execute-api.eu-west-1.amazonaws.com/production';

Vue.use(Vuex);

import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export default new Vuex.Store({
	state: {
		highContrast: false,

		loading: true,

		errorMessage: '',

		config: null,

		user: {
			email: null,
			postcode: null,
			jwt: null,
		},

		// modelGroup:

		overview: {
			title: '',
			bodyText: '',
			logoUrl: '',
			backgroundUrl: '',
			idMap: null,
		} as Overview,

		// These are 3dRepo issues that have been created by Planbase Admin
		questions: [] as Question[],

		// These are issues that have been created by Planbase End Users
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

		loading(state: any) {
			return state.loading;
		},

		errorMessage(state: any) {
			return state.errorMessage;
		},

		config(state: any) {
			return state.config;
		},

		user(state: any) {
			return state.user;
		},

		overview(state: any) {
			return state.overview;
		},

		summary(state: any) {
			return state.summary;
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

		toggleLoading(state: any, payload: boolean) {
			state.loading = payload;
		},

		setErrorMessage(state: any, payload: string) {
			state.errorMessage = payload;
		},

		setConfig(state: any, payload: Config) {
			state.config = payload;
		},

		setOverview(state: any, overview: Overview) {
			state.overview = overview;
		},

		setSummary(state: any, summary: Summary) {
			state.summary = summary;
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
		async init({ commit }: any, id: number) {
			commit('setErrorMessage', '');
			commit('toggleLoading', true);
			commit('setConfig', null);

			// Look for config file with matching id provided in URL param
			try {
				var configResponse = await axios.get(`/${id}.json`);
			} catch (error) {
				commit('setErrorMessage', 'Config file not found!');
				return;
			}

			const config: Config = configResponse.data;

			(window as any).config = config;

			commit('setConfig', config);

			apiManager = new ApiManager(config.baseApiUrl, config.teamspaceId, config.modelId, config.apiKey);

			const res: any = await Promise.all([apiManager.getProjectOverview(), apiManager.getProjectSummary(), apiManager.getWalkthroughPoints()]).catch(err => console.log(err));

			if (!res) return;

			// NOTE: #1 Add groups and the submodel information to the issues/questions
			// If you use the getGroups API call on those you get:
			// https://www.3drepo.io/api/PlanBase/b1974e30-7dc3-11eb-866f-9178b76b7801/revision/master/head/groups/d3df7070-7dc4-11eb-ba3f-df4897718ad6
			let groups = await apiManager.getGroups();

			// Before you start calling UnityUtils you will also need to call getIdMap here:
			// https://www.3drepo.io/api/PlanBase/b1974e30-7dc3-11eb-866f-9178b76b7801/revision/master/head/idmap.json
			// and use the result later
			let idMap = await apiManager.getIdMap();

			// If there are more than one submodel then flatten into single map
			const subModels = idMap.subModels.reduce((acc: any, cur: { idMap: string[] }) => {
				acc = { ...acc, ...cur.idMap };
				return acc;
			}, {});

			const questions = res[2].map((w: WalkthroughPoint) => {
				const imageUrl = w.thumbnailUrl;
				const overrideGroups: TdrGroup[] = [];
				const hiddenGroups: TdrGroup[] = [];

				// If this WalkthroughPoint contains overrideGroupIds
				if (w.viewpoint.overrideGroupIds) {
					w.viewpoint.overrideGroupIds.map((id: string) => {
						// Find the group that matches this overrideGroupId
						const og = groups.find((g: TdrGroup) => g._id === id);
						if (og) {
							// Loop through objects in this group and find meshIds
							// meshIDs = array of the result of getting the values from the shared_ids from the above
							// array when compared with the relevant subModels object from the idmap.json called earlier
							const meshIds = og.objects.map((obj: { shared_ids: string[] }) => {
								const keys = [];
								// Loop through each key in the flattened subModels
								for (let key in subModels) {
									const value = subModels[key];
									// If this object has a shared_id that matches val in subModels then store the key for this val
									if (obj.shared_ids.includes(value)) {
										keys.push(key);
									}
								}
								return keys;
							});
							overrideGroups.push({ ...og, meshIds: meshIds.reduce((acc, val) => acc.concat(val), []) });
						}
					});
				}

				// If this WalkthroughPoint has a hiddenGroupId
				if (w.viewpoint.hiddenGroupId) {
					// Find the group that matches this overrideGroupId
					const hg = groups.find((g: TdrGroup) => g._id === w.viewpoint.hiddenGroupId);
					if (hg) {
						// Loop through objects in this group
						const meshIds = hg.objects.map((obj: { shared_ids: string[] }) => {
							const keys = [];
							// Loop through each key in the flattened subModels
							for (let key in subModels) {
								const value = subModels[key];
								// If this object has a shared_id that matches val in subModels then store the key for this val
								if (obj.shared_ids.includes(value)) {
									keys.push(key);
								}
							}
							return keys;
						});
						hiddenGroups.push({ ...hg, meshIds });
					}
				}
				return {
					id: w.id,
					title: w.title,
					bodyText: w.bodyText,
					type: w.type,
					thumbnailUrl: config.baseApiUrl + '/' + imageUrl,
					viewpoint: w.viewpoint,
					position: w.position,
					narrative: {
						image: config.baseApiUrl + '/' + imageUrl,
						comment: w.bodyText,
					},
					comment: null,
					rating: null,
					overrideGroups,
					hiddenGroups,
				} as Question;
			});

			commit('setOverview', res[0]);
			commit('setSummary', res[1]);
			commit('setQuestions', questions);
			commit('toggleLoading', false);
		},

		async createPin({ commit, state }: any, { category, text, x, y }: any) {
			const jwt: string = Vue.$cookies.get('user').jwt;

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
			const jwt: string = Vue.$cookies.get('user').jwt;

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

		async addToList({ commit }: any, { user }: any) {
			const jwt: string = Vue.$cookies.get('user').jwt;

			await axios({
				method: 'post',
				url: `${baseUrl}/listMember`,
				data: {
					user,
					jwt,
				},
			}).catch(err => console.log(err));

			return;
		},

		async savePinComment({ commit }: any, data: { issueId: string; comment: string }) {
			const jwt: string = Vue.$cookies.get('user').jwt;

			const res = await axios({
				method: 'POST',
				url: `${baseUrl}/addComment`,
				data: {
					...data,
					jwt,
				},
				withCredentials: false,
			}).catch(err => console.log(err));

			if (!res) return;
			return res.data;
		},

		async verifyRecaptcha(state, data: RecaptchaSeed) {
			return await axios({
				method: 'POST',
				url: `${baseUrl}/recaptcha`,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data,
			}).catch(err => console.log(err));
		},
	},

	plugins: [vuexLocal.plugin],

	modules: {},
});

import axios from 'axios';

const baseURLv1 = 'https://api1.www.3drepo.io/api';
const baseURLv3 = 'https://api3.www.3drepo.io/api';

export default class ApiClient {
	constructor(private apiKey: string) {}

	login(username: string, password: string) {
		return axios
			.post(
				baseURLv1 + '/login',
				{
					username,
					password,
				},
				{ withCredentials: true }
			)
			.then(res => res.data.username)
			.catch(err => {
				if (err.response.data.status === 401) return null;

				if (err.response.data.code === 'ALREADY_LOGGED_IN') return this.getUsername();
				throw err;
			});
	}

	getUsername() {
		return axios
			.get(baseURLv3 + '/login', { withCredentials: true })
			.then(res => res.data.username)
			.catch(err => {
				if (err.response.data.status === 401) return null;
				throw err;
			});
	}

	getIssues(teamspaceId: string, modelId: string): Promise<TdrIssue[]> {
		return axios
			.get(baseURLv3 + '/' + teamspaceId + '/' + modelId + '/issues?key=' + this.apiKey, {
				withCredentials: true,
			})
			.then(res => {
				return res.data;
			});
	}

	getIssue(teamspaceId: string, modelId: string, issueId: string): Promise<TdrIssue> {
		return axios
			.get(baseURLv3 + '/' + teamspaceId + '/' + modelId + '/issues/' + issueId + '?key=' + this.apiKey, {
				withCredentials: true,
			})
			.then(res => {
				return res.data;
			});
	}

	closeIssue(teamspaceId: string, modelId: string, issue: { rev_id: string; _id: string }) {
		return axios.put(
			baseURLv3 + '/' + teamspaceId + '/' + modelId + '/revision/' + issue.rev_id + '/issues/' + issue._id + '.json',
			{ status: 'closed' },
			{
				withCredentials: true,
			}
		);
	}

	getTree(teamspaceId: string, modelId: string) {
		let tree: any;
		let treePath;

		return axios
			.get(baseURLv1 + '/' + teamspaceId + '/' + modelId + '/revision/master/head/searchtree.json', {
				withCredentials: true,
			})
			.then(res => {
				tree = res.data;

				return axios.get(baseURLv1 + '/' + teamspaceId + '/' + modelId + '/revision/master/head/tree_path.json', { withCredentials: true });
			})
			.then(res => {
				treePath = res.data.subModels[0].idToPath;
				console.log(res);
				return { tree, treePath };
			});
	}
}

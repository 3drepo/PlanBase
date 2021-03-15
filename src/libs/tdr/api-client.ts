import axios from 'axios';

export default class ApiClient {
	constructor(private baseApiUrl: string, private apiKey: string) {}

	login(username: string, password: string) {
		return axios
			.post(
				this.baseApiUrl + '/login',
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
			.get(this.baseApiUrl + '/login', { withCredentials: true })
			.then(res => res.data.username)
			.catch(err => {
				if (err.response.data.status === 401) return null;
				throw err;
			});
	}

	getIssues(teamspaceId: string, modelId: string): Promise<TdrIssue[]> {
		return axios.get(this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/issues?key=' + this.apiKey).then(res => {
			return res.data.filter((i: any) => i.status === 'open');
		});
	}

	getIssue(teamspaceId: string, modelId: string, issueId: string): Promise<TdrIssue> {
		return axios.get(this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/issues/' + issueId + '?key=' + this.apiKey).then(res => {
			return res.data;
		});
	}

	closeIssue(teamspaceId: string, modelId: string, issue: { rev_id: string; _id: string }) {
		return axios.put(
			this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/revision/' + issue.rev_id + '/issues/' + issue._id + '.json',
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
			.get(this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/revision/master/head/searchtree.json', {
				withCredentials: true,
			})
			.then(res => {
				tree = res.data;

				return axios.get(this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/revision/master/head/tree_path.json', { withCredentials: true });
			})
			.then(res => {
				treePath = res.data.subModels[0].idToPath;
				console.log(res);
				return { tree, treePath };
			});
	}

	getGroups(teamspaceId: string, modelId: string): Promise<TdrGroup[]> {
		return axios.get(this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/revision/master/head/groups?key=' + this.apiKey).then(res => {
			return res.data;
		});
	}

	getGroup(teamspaceId: string, modelId: string, groupId: string): Promise<TdrGroup> {
		return axios.get(this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/revision/master/head/groups/' + groupId + '?key=' + this.apiKey).then(res => {
			return res.data;
		});
	}

	getIdMap(teamspaceId: string, modelId: string): Promise<any> {
		// https://www.3drepo.io/api/PlanBase/b1974e30-7dc3-11eb-866f-9178b76b7801/revision/master/head/idmap.json
		return axios.get(this.baseApiUrl + '/' + teamspaceId + '/' + modelId + '/revision/master/head/idmap.json' + '?key=' + this.apiKey).then(res => {
			return res.data;
		});
	}
}

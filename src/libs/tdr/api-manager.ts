import ApiClient from './api-client';

export default class ApiManager {
	apiClient: ApiClient;

	constructor(private teamspaceId: string, private modelId: string) {
		this.apiClient = new ApiClient('');
	}

	async getProjectOverview(): Promise<ProjectOverview | null> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		let results = issues.filter(i => i.topic_type === 'RFI');

		if (results.length === 0) return null;

		let issue = await this.apiClient.getIssue(this.teamspaceId, this.modelId, results[0]._id);

		let logoUrl = `https://api3.www.3drepo.io/api/${this.teamspaceId}/${this.modelId}/resources/${
			issue.resources.filter(r => r.name === 'logo.jpg' || r.name === 'logo.png')[0]._id
		}`;
		let backgroundUrl = `https://api3.www.3drepo.io/api/${this.teamspaceId}/${this.modelId}/resources/${
			issue.resources.filter(r => r.name === 'background.jpg' || r.name === 'background.png')[0]._id
		}`;

		return {
			title: results[0].name,
			bodyText: results[0].desc,
			logoUrl,
			backgroundUrl,
		};
	}

	async getNarrativePoints(): Promise<WalkthroughPoint[]> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		return issues
			.filter(i => i.topic_type === 'narrative')
			.map(i => ({
				title: i.name,
				bodyText: i.desc,
				type: 'Narrative',
				position: i.position,
				lookAt: i.look_at,
			}));
	}
}

import ApiClient from './api-client';

export default class ApiManager {
	apiClient: ApiClient;
	apiKey: string;

	constructor(private teamspaceId: string, private modelId: string) {
		this.apiKey = '';
		this.apiClient = new ApiClient(this.apiKey);
	}

	async getProjectOverview(): Promise<ProjectOverview | null> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		let results = issues.filter(i => i.topic_type === 'For information');

		if (results.length === 0) return null;

		let issue = await this.apiClient.getIssue(this.teamspaceId, this.modelId, results[0]._id);

		let title = issue.desc.split('\n\n')[0];
		let bodyText = issue.desc.replace(title + '\n\n', '').replace('\n\n', '<br/><br/>');

		let logoUrl = `https://api3.www.3drepo.io/api/${this.teamspaceId}/${this.modelId}/resources/${
			issue.resources.filter((r: any) => r.name === 'logo.jpg' || r.name === 'logo.png')[0]._id
		}?key=${this.apiKey}`;
		let backgroundUrl = `https://api3.www.3drepo.io/api/${this.teamspaceId}/${this.modelId}/resources/${
			issue.resources.filter((r: any) => r.name === 'background.jpg' || r.name === 'background.png')[0]._id
		}?key=${this.apiKey}`;

		return {
			title,
			bodyText,
			logoUrl,
			backgroundUrl,
		};
	}

	async getWalkthroughPoints(): Promise<WalkthroughPoint[]> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		return issues
			.filter(i => i.topic_type === 'Question' || i.topic_type === 'Walkthrough')
			.map(i => ({
				id: i._id,
				title: i.name,
				bodyText: i.desc,
				type: i.topic_type === 'Question' ? 'AgreementScale' : 'Narrative',
				thumbnailUrl: i.thumbnail,
				viewpoint: {
					position: i.viewpoint.position,
					up: i.viewpoint.up,
					lookAt: i.viewpoint.look_at,
					viewDir: i.viewpoint.view_dir,
				},
			}));
	}
}

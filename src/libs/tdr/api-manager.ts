import ApiClient from './api-client';

export default class ApiManager {
	apiClient: ApiClient;

	constructor(private baseApiUrl: string, private teamspaceId: string, private modelId: string, private apiKey: string) {
		this.apiClient = new ApiClient(baseApiUrl, apiKey);
	}

	async getProjectOverview(): Promise<ProjectOverview | null> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		let results = issues.filter(i => i.topic_type === 'For information');

		if (results.length === 0)
			return {
				title: 'Not loaded.',
				bodyText: 'Not loaded.',
				logoUrl: '',
				backgroundUrl: '',
			};

		let issue = await this.apiClient.getIssue(this.teamspaceId, this.modelId, results[0]._id);

		let title = issue.desc.split('\n\n')[0];
		let bodyText = issue.desc.replace(title + '\n\n', '').replace('\n\n', '<br/><br/>');

		let logoUrl = `${this.baseApiUrl}/${this.teamspaceId}/${this.modelId}/resources/${
			issue.resources.filter((r: any) => r.name === 'logo.jpg' || r.name === 'logo.png')[0]._id
		}?key=${this.apiKey}`;
		let backgroundUrl = `${this.baseApiUrl}/${this.teamspaceId}/${this.modelId}/resources/${
			issue.resources.filter((r: any) => r.name === 'background.jpg' || r.name === 'background.png')[0]._id
		}?key=${this.apiKey}`;

		return {
			title,
			bodyText,
			logoUrl,
			backgroundUrl,
		};
	}

	async getProjectSummary(): Promise<ProjectSummary | null> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		let results = issues.filter(i => i.topic_type === 'Diff');

		if (results.length === 0) return { title: 'Not loaded.', bodyText: 'Not loaded.' };

		let issue = await this.apiClient.getIssue(this.teamspaceId, this.modelId, results[0]._id);

		let title = issue.desc.split('\n\n')[0];
		let bodyText = issue.desc.replace(title + '\n\n', '').replace('\n\n', '<br/><br/>');

		return {
			title,
			bodyText,
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
				thumbnailUrl: i.viewpoint.screenshot + '?key=' + this.apiKey,
				position: i.position,
				viewpoint: {
					position: i.viewpoint.position,
					up: i.viewpoint.up,
					lookAt: i.viewpoint.look_at,
					viewDir: i.viewpoint.view_dir,
				},
			}));
	}

	async getUserPins(): Promise<WalkthroughPoint[]> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		return issues
			.filter(i => i.topic_type === 'Question' || i.topic_type === 'Walkthrough')
			.map(i => ({
				id: i._id,
				title: i.name,
				bodyText: i.desc,
				type: i.topic_type === 'Question' ? 'AgreementScale' : 'Narrative',
				thumbnailUrl: i.viewpoint.screenshot + '?key=' + this.apiKey,
				position: i.position,
				viewpoint: {
					position: i.viewpoint.position,
					up: i.viewpoint.up,
					lookAt: i.viewpoint.look_at,
					viewDir: i.viewpoint.view_dir,
				},
			}));
	}
}

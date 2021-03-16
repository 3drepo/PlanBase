import ApiClient from './api-client';

export default class ApiManager {
	apiClient: ApiClient;

	constructor(private baseApiUrl: string, private teamspaceId: string, private modelId: string, private apiKey: string) {
		this.apiClient = new ApiClient(baseApiUrl, apiKey);
	}

	async getProjectOverview(): Promise<ProjectOverview | null> {
		let issues = await this.apiClient.getIssues(this.teamspaceId, this.modelId);

		// NOTE: #4 Added 'Clash' as a temporary fix for the federations but don't think it should be here
		let results = issues.filter(i => i.topic_type === 'For information' || i.topic_type === 'Clash');

		if (results.length === 0)
			return {
				title: 'Not loaded.',
				bodyText: 'Not loaded.',
				logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Logo_of_3D_Repo.png',
				backgroundUrl: '',
			};

		let issue = await this.apiClient.getIssue(this.teamspaceId, this.modelId, results[0]._id);

		let title = issue.desc.split('\n\n')[0];
		let bodyText = issue.desc.replace(title + '\n\n', '').replace('\n\n', '<br/><br/>');

		let logoUrl: string;
		let backgroundUrl: string;

		if (this.baseApiUrl && this.teamspaceId && this.modelId && issue.resources) {
			logoUrl = `${this.baseApiUrl}/${this.teamspaceId}/${this.modelId}/resources/${
				issue.resources.filter((r: any) => r.name === 'logo.jpg' || r.name === 'logo.png')[0]._id
			}?key=${this.apiKey}`;
			backgroundUrl = `${this.baseApiUrl}/${this.teamspaceId}/${this.modelId}/resources/${
				issue.resources.filter((r: any) => r.name === 'background.jpg' || r.name === 'background.png')[0]._id
			}?key=${this.apiKey}`;
		} else {
			// Fallback logo and background
			logoUrl = 'https://upload.wikimedia.org/wikipedia/en/7/76/Logo_of_3D_Repo.png';
			backgroundUrl = 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
		}

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

		return (
			issues
				// NOTE: #5 Added 'Clash' as a temporary fix for the federations but don't think it should be here
				.filter(i => i.topic_type === 'Question' || i.topic_type === 'Walkthrough' || i.topic_type === 'Clash')
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
						overrideGroupIds: i.viewpoint.override_group_ids,
						hiddenGroupId: i.viewpoint.hidden_group_id,
					},
				}))
		);
	}

	async getIdMap(): Promise<any> {
		return await this.apiClient.getIdMap(this.teamspaceId, this.modelId);
	}

	async getGroups(): Promise<TdrGroup[]> {
		return await this.apiClient.getGroups(this.teamspaceId, this.modelId);
	}

	async getGroup(groupId: string): Promise<TdrGroup> {
		return await this.apiClient.getGroup(this.teamspaceId, this.modelId, groupId);
	}
}

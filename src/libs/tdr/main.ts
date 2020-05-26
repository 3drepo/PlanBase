import ApiManager from './api-manager';
import ApiClient from './api-client';

async function main() {
	let apiManager = new ApiManager('PlanBase', '19a3ef10-83d8-11ea-81c9-931a0b2034c3');
	let apiClient = new ApiClient('');

	//console.log(await apiClient.getIssues('PlanBase', '19a3ef10-83d8-11ea-81c9-931a0b2034c3'));

	//console.log(await apiClient.getIssue('PlanBase', '19a3ef10-83d8-11ea-81c9-931a0b2034c3', 'da576380-83de-11ea-81c9-931a0b2034c3'));

	// let narrativePoints = await apiManager.getNarrativePoints();

	let projectOverview = await apiManager.getProjectOverview();

	console.log(projectOverview);

	// let issue = await tdr.getIssue(teamspaceId, modelId, '5ecdf500-83fa-11ea-81c9-931a0b2034c3');

	// console.log(
	// 	`https://api3.www.3drepo.io/api/${teamspaceId}/${modelId}/resources/${issue.resources[0]._id}`
	// );
}

main();

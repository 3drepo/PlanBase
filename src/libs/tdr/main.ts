import ApiManager from './api-manager';
import ApiClient from './api-client';

async function main() {
	let apiManager = new ApiManager('PlanBase', '353a00c0-9918-11ea-bb8a-7339f221efad', 'cedfaddbd5431f26b1357a719408934b');
	let apiClient = new ApiClient('cedfaddbd5431f26b1357a719408934b');

	//console.log(await apiClient.getIssues('PlanBase', '19a3ef10-83d8-11ea-81c9-931a0b2034c3'));

	//console.log(await apiClient.getIssue('PlanBase', '19a3ef10-83d8-11ea-81c9-931a0b2034c3', 'da576380-83de-11ea-81c9-931a0b2034c3'));

	let walkthroughPoints = await apiManager.getWalkthroughPoints();

	const questions = walkthroughPoints.map(w => {
		return {
			id: w.id,
			title: w.title,
			bodyText: w.bodyText,
			type: w.type,
			thumbnailUrl: w.thumbnailUrl,
			viewpoint: w.viewpoint,
			narrative: {
				image: 'https://picsum.photos/1000/300',
				comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id euismod nisl, id ultrices tellus. Mauris scelerisque tempus turpis sed luctus.',
			},
			comment: null,
			rating: null,
		} as Question;
	});

	console.log(questions);

	// let projectOverview = await apiManager.getProjectOverview();

	// console.log(projectOverview);

	// let issue = await tdr.getIssue(teamspaceId, modelId, '5ecdf500-83fa-11ea-81c9-931a0b2034c3');

	// console.log(
	// 	`https://api3.www.3drepo.io/api/${teamspaceId}/${modelId}/resources/${issue.resources[0]._id}`
	// );
}

main();

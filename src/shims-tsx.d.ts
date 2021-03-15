declare module 'uuid';

type TdrIssue = {
	_id: string;
	name: string;
	desc: string;
	resources: TdrResource[];
	topic_type: string;
	status: string;
	thumbnail: string;
	position: number[];
	viewpoint: {
		screenshot: string;
		screenshotSmall: string;
		position: number[];
		look_at: number[];
		up: number[];
		view_dir: number[];
		override_group_ids?: string[];
		hidden_group_id?: string;
	};
};

type TdrGroup = {
	_id: string;
	name: string;
	description: string;
	color: [number, number, number, number];
	author: string;
	issue_id: string;
	objects: { account: string; model: string; ifc_guids: []; shared_ids: string[] }[];
	meshIds?: any[];
};

type TdrResource = {
	_id: string;
	name: string;
};

type WalkthroughPoint = {
	id: string;
	title: string;
	bodyText: string;
	type: 'Narrative' | 'AgreementScale' | 'Freetext';
	thumbnailUrl: string;
	position: number[];
	viewpoint: {
		position: number[];
		lookAt: number[];
		up: number[];
		viewDir: number[];
		overrideGroupIds?: string[];
		hiddenGroupId?: string;
	};
	overrideGroups?: TdrGroup[];
	hiddenGroups?: TdrGroup[];
};

type ProjectOverview = {
	title: string;
	bodyText: string;
	logoUrl: string;
	backgroundUrl: string;
	// idMap: any;
};

type ProjectSummary = {
	title: string;
	bodyText: string;
};

type Config = {
	baseApiUrl: string;
	teamspaceId: string;
	modelId: string;
	apiKey: string;
	showTitleBar: boolean;
	showNavBar: boolean;
	enableEmailPostcode: boolean;
	showNarrativeList: boolean;
	showNarrativePins: boolean;
	showThumbnails: boolean;
};

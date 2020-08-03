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
		position: number[];
		look_at: number[];
		up: number[];
		view_dir: number[];
	};
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
	};
};

type ProjectOverview = {
	title: string;
	bodyText: string;
	logoUrl: string;
	backgroundUrl: string;
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

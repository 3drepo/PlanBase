declare module 'uuid';

type TdrIssue = {
	_id: string;
	name: string;
	desc: string;
	resources: TdrResource[];
	topic_type: string;
	status: string;
	position: number[];
	look_at: number[];
};

type TdrResource = {
	_id: string;
	name: string;
};

type WalkthroughPoint = {
	title: string;
	bodyText: string;
	type: 'Narrative' | 'AgreementScale' | 'Freetext';
	position: number[];
	lookAt: number[];
};

type ProjectOverview = {
	title: string;
	bodyText: string;
	logoUrl: string;
	backgroundUrl: string;
};

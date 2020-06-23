declare module '*.vue' {
	import Vue from 'vue';
	export default Vue;
}

interface User {
	email: string | null;
	postcode: string | null;
}

// Extends the Walktrough Point to allow for local rating and comment to be added to each
interface Question extends WalkthroughPoint {
	// id: string;
	// title: string;
	// bodyText: string;
	// type: 'AgreementScale' | 'Narrative' | null;
	// thumbnail: string;
	// viewpoint: { position: number[]; lookAt: number[] };
	rating: null | number;
	comment: null | string;
}

interface Pin {
	id: string;
	x: number;
	y: number;
	createdBy: string;
	createdAt: string;
}

interface PinComment {
	id: string;
	pinId: string;
	category: 'Education' | 'Leisure' | 'Transport';
	text: string;
	positive: number;
	negative: number;
	createdBy: string;
	createdAt: string;
}

interface Overview {
	title: string;
	bodyText: string;
	logoUrl: string;
	backgroundUrl: string;
}

interface Summary {
	title: string;
	bodyText: string;
}

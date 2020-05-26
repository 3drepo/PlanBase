declare module '*.vue' {
	import Vue from 'vue';
	export default Vue;
}

interface User {
	email: string | null;
	postcode: string | null;
}

interface Question {
	id: string;
	label: string;
	text: string;
	rating: null | number;
	comment: null | string;
	type: 'question' | 'bookmark' | null;
	image?: string;
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

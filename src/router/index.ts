import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{ path: '/', redirect: '/overview' },

	{
		path: '/overview',
		name: 'overview',
		component: () => import(/* webpackChunkName: "overview" */ '../views/Overview.vue'),
	},

	{
		path: '/questions',
		name: 'questions',
		component: () => import(/* webpackChunkName: "questions" */ '../views/Questions.vue'),
	},

	{
		path: '/explorer',
		name: 'explorer',
		component: () => import(/* webpackChunkName: "explorer" */ '../views/Explorer.vue'),
	},

	{
		path: '/summary',
		name: 'summary',
		component: () => import(/* webpackChunkName: "summary" */ '../views/Summary.vue'),
	},

	{
		path: '/privacy',
		name: 'privacy',
		component: () => import(/* webpackChunkName: "privacy" */ '../views/Privacy.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

// router.beforeEach((to, from, next) => {
// 	console.log(from.name);
// 	console.log(to.name);
// 	next();
// });

export default router;

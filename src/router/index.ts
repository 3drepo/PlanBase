import Vue from 'vue';
import VueRouter, { RouterOptions, RouteConfig } from 'vue-router';
import Store from '../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'login',
		component: () => import(/* webpackChunkName: "overview" */ '../views/Login.vue'),
		beforeEnter: (to, from, next) => {
			// If no config found whilst loading or enableEmailPostcode required show login screen
			if (!Store.getters.config || Store.getters.config.enableEmailPostcode) next();
			// Else forward to overview
			else next('overview');
		},
	},

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
] as RouteConfig[];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

// router.beforeEach((to, from, next) => {
// 	// If config file exists
// 	if (Store.getters.config && Store.getters.config.enableEmailPostcode) {
// 		const loginRequired = Store.getters.config.enableEmailPostcode;
// 		// If login required and no user stored in cookie
// 		const user = Vue.$cookies.get('user');
// 		if (loginRequired && !user) next('login');
// 		else next();
// 	} else next();
// });

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
	// {
	// 	path: '/',
	// 	name: 'login',
	// 	component: Login,
	// beforeEnter: (to: any, from: any, next: any) => {
	// 	const { email, postcode } = store.getters.user;
	// 	if (email && postcode) next(false);
	// 	next();
	// },
	// },

	// {
	// 	path: '/',
	// 	name: 'home',
	// 	component: Home,
	// },

	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	// },

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
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

// If email or postcode is missing, send to login view
router.beforeEach((to, from, next) => {
	const { email, postcode } = store.getters.user;
	if (to.name === 'login') next();
	if (!email || !postcode) {
		next({ name: 'login' });
	}
	next();
});

export default router;

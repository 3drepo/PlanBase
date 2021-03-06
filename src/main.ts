import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import './main.scss';

// Cookies
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
Vue.$cookies.config('7d', '', '', false, 'Lax');

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');

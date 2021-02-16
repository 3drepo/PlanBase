import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import 'vuetify/src/styles/main.sass';

Vue.use(Vuetify);

const opts = {
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: '#107a8b',
				secondary: '#3b5441',
				accent: '#83e85a',
				error: '#FF5252',
				info: '#2196F3',
				success: '#2cb978',
				warning: '#FFC107',
			},
		},
	},
	iconfont: 'mdi',
};

export default new Vuetify(opts);

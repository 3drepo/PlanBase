<template>
	<v-app id="inspire">
		<Navbar />
		<ProgressBar v-if="user" />
		<v-main>
			<v-container fluid>
				<Login v-if="!user" />
				<router-view v-else></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';

// Views
import Login from '@/views/Login.vue';

// Components
import Navbar from '@/components/Navbar.vue';
import ProgressBar from '@/components/ProgressBar.vue';

import { mapGetters } from 'vuex';

export default Vue.extend({
	name: 'App',

	props: {
		source: String,
	},

	components: {
		Navbar,
		ProgressBar,
		Login,
	},

	data: () => ({
		drawer: null,
	}),

	computed: {
		user() {
			const user = this.$store.getters.user;
			return user.email !== null && user.postcode !== null;
		},
	},

	async created() {
		await (this as any).$store.dispatch('init');
		const cookie = (this as any).$cookies.get('user');
		const route = (this as any).$route.path;
		if (cookie) {
			(this as any).$store.commit('setUser', cookie);
			if (route !== '/overview') (this as any).$router.push({ name: 'overview' });
		}
	},
});

declare var UnityUtil: any;
declare var viewer: any;

var PREFIX = 'https://www.3drepo.io';
var API_PREFIX = 'https://api1.www.3drepo.io';

// Unity requires its setting in a global
// variable called Module
(window as any).Module = {
	TOTAL_MEMORY: 2130706432 / 10,
	errorhandler: {},
};

init();

function init() {
	// Replace as appropriate
	var API = API_PREFIX + '/api/';
	var account: string = 'PlanBase';

	// Set the API for the viewer (for fetching models etc)
	setAPI();

	(window as any).initialiseViewer = initialiseViewer;

	function setAPI() {
		UnityUtil.setAPIHost({
			hostNames: [API],
		});
	}

	function initialiseViewer() {
		// var loadModelButton = document.getElementById('loadModelButton');
		// if (!loadModelButton) return;
		// loadModelButton.remove();

		console.log('Initialising 3D Repo Viewer...');
		//changeStatus('Loading Viewer...');

		prepareViewer().then(function() {
			initUnity().then(function() {
				handleModelInput('353a00c0-9918-11ea-bb8a-7339f221efad');
			});
		});
	}

	function changeStatus(text: string) {
		document.getElementById('status')!.innerText = text;

		if (text == '') document.getElementById('status')!.classList.add('hide');
		else document.getElementById('status')!.classList.remove('hide');
	}

	function handleModelInput(model: string) {
		//changeStatus('Loading Model...');

		if (account && model) {
			UnityUtil.loadModel(account, model).then(function() {
				console.log('Model loaded');

				//changeStatus('');

				let event = new Event('modelLoaded');
				window.dispatchEvent(event);
			});
		} else {
			console.error('Model or account not valid: ' + account + model);
		}
	}

	function prepareViewer() {
		var unityLoaderPath = PREFIX + '/unity/Build/UnityLoader.js';

		var unityLoaderScript = document.createElement('script');
		return new Promise(function(resolve, reject) {
			unityLoaderScript.async = true;
			unityLoaderScript.addEventListener(
				'load',
				function() {
					console.log('Loaded UnityLoader.js succesfully');
					resolve();
				},
				false
			);

			unityLoaderScript.addEventListener(
				'error',
				function(error) {
					console.error('Error loading UnityLoader.js' + error);
					reject('Error loading UnityLoader.js');
				},
				false
			);
			// Event handlers MUST come first before setting src
			unityLoaderScript.src = unityLoaderPath;

			// This kicks off the actual loading of Unity
			viewer.appendChild(unityLoaderScript);
		});
	}

	function initUnity() {
		return new Promise(function(resolve, reject) {
			(window as any).Module.errorhandler = UnityUtil.onError;

			UnityUtil.init(
				function(error: any) {
					console.error(error);
				},
				function() {
					console.log('progressCallback');
				},
				function() {
					console.log('modelLoaderProgressCallback');
				}
			);

			UnityUtil.loadUnity('unity', PREFIX + '/unity/Build/unity.json', 2130706432 / 10);

			UnityUtil.onReady()
				.then(function() {
					//changeStatus('');
					resolve();
				})
				.catch(function(error: any) {
					console.error('UnityUtil.onReady failed: ' + error);
					reject(error);
				});
		});
	}
}
</script>

<style lang="scss">
.container {
	padding: 0;
	height: 100%;
}

.v-application {
	pointer-events: none;
	background: transparent !important;
	overflow: hidden;
	height: 100vh;
}

#viewer,
#unity {
	position: absolute;
	height: 100%;
	width: 100%;
	border: none;
	padding: 0;
	margin: 0;
	background: darkgray;
	font-family: 'Roboto', sans-serif;
}
</style>

<template>
	<v-app id="inspire">
		<!-- If mobile device detected -->
		<div v-if="mobileDevice" class="flex justify-center items-center bg-white app-container">
			<img alt="Planbase Logo" class="pb-logo-large" src="./assets/images/planbase_logo.png" />
			<h2 class="text-center px-4">Unfortunately this app is currently unavailable on mobile devices</h2>
		</div>
		<!-- If app is loading -->
		<div v-else-if="loading" class="flex justify-center items-center">
			<h2>Loading...</h2>
		</div>
		<!-- If error -->
		<div v-else-if="errorMessage" class="flex justify-center items-center">
			<h2>{{ errorMessage }}</h2>
		</div>
		<!-- Else load app -->
		<div v-else class="app-container">
			<Navbar v-if="config.showTitleBar" />
			<ProgressBar v-if="config.showNavBar && user" />
			<v-main>
				<v-container fluid>
					<router-view></router-view>
				</v-container>
			</v-main>
		</div>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';

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
	},

	data: () => ({
		drawer: null,
	}),

	computed: {
		...mapGetters(['loading', 'errorMessage', 'config']),

		mobileDevice() {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;
		},

		user() {
			const user = this.$store.getters.user;
			return user.email !== null && user.postcode !== null;
		},
	},

	async mounted() {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('id');

		if (!id) {
			(window as any).location = '/?id=1';
			return;
		}

		await (this as any).$store
			.dispatch('init', id)
			.then(() => {
				if (!initCalled) init();
			})
			.catch((err: any) => console.log(err));
	},
});

declare var UnityUtil: any;
declare var viewer: any;
declare var createPixelStreamingInstance: any;

var PREFIX = 'https://www.3drepo.io';

// Unity requires its setting in a global
// variable called Module
(window as any).Module = {
	TOTAL_MEMORY: 2130706432 / 10,
	errorhandler: {},
};

var initCalled = false;
function init() {
	initCalled = true;
	const baseApiUrl = (window as any).config.baseApiUrl;
	const apiKey = (window as any).config.apiKey;
	const teamspaceId: string = (window as any).config.teamspaceId;
	const modelId: string = (window as any).config.modelId;

	// Set the API for the viewer (for fetching models etc)
	setAPI();

	(window as any).initialiseViewer = initialiseViewer;
	(window as any).planbase_progress_loaded = 0;
	(window as any).planbase_model_loaded = 0;

	function setAPI() {
		UnityUtil.setAPIHost({
			hostNames: [baseApiUrl],
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
				handleModelInput();
			});
		});
	}

	function changeStatus(text: string) {
		document.getElementById('status')!.innerText = text;

		if (text == '') document.getElementById('status')!.classList.add('hide');
		else document.getElementById('status')!.classList.remove('hide');
	}

	function handleModelInput() {
		//changeStatus('Loading Model...');

		if (teamspaceId && modelId) {
			UnityUtil.loadModel(teamspaceId, modelId).then(function() {
				console.log('Model loaded');

				//changeStatus('');

				let event = new Event('modelLoaded');
				window.dispatchEvent(event);
			});
		} else {
			console.error('Model or Teamspace not valid: ' + teamspaceId + '/' + modelId);
		}
	}

	function prepareViewer() {
		const viewer = (window as any).config.viewer;
		if (viewer == 'unreal') {
			return prepareUnrealViewer();
		} else if (viewer == 'unity') {
			return prepareUnityViewer();
		} else {
			console.error(`config.viewer value ${viewer} is not valid. Should be unreal or unity. Defaulting to Unity.`);
			(window as any).config.viewer = 'unity';
			return prepareUnityViewer(); // Default to Unity
		}
	}

	function importScript(url: URL) {
		var tag = document.createElement('script');
		return new Promise(function(resolve, reject) {
			tag.async = true;
			tag.addEventListener(
				'load',
				function() {
					console.log(`Loaded ${url} succesfully`);
					resolve(null);
				},
				false
			);

			tag.addEventListener(
				'error',
				function(error) {
					console.error(`Error loading  ${url} ` + error);
					reject(`Error loading  ${url}`);
				},
				false
			);
			// Event handlers MUST come first before setting src
			tag.src = url.toString();

			// This kicks off the actual loading of Unity
			viewer.appendChild(tag);
		});
	}

	function importLink(url: URL) {
		var tag = document.createElement('link');
		return new Promise(function(resolve, reject) {
			tag.rel = 'stylesheet';
			tag.addEventListener(
				'load',
				function() {
					console.log(`Loaded ${url} succesfully`);
					resolve(null);
				},
				false
			);

			tag.addEventListener(
				'error',
				function(error) {
					console.error(`Error loading  ${url} ` + error);
					reject(`Error loading  ${url}`);
				},
				false
			);
			// Event handlers MUST come first before setting src
			tag.href = url.toString();

			// This kicks off the actual loading of Unity
			viewer.appendChild(tag);
		});
	}

	/**
	 * This function loads the Unreal pixel streaming dependencies
	 */
	function prepareUnrealViewer() {
		const unrealConfig = (window as any).config.unrealConfig;
		const baseUrl = unrealConfig.baseResourcesUrl;
		return Promise.all([
			importLink(new URL(baseUrl + '/player.css')),
			importScript(new URL(unrealConfig.adapterUrl)),
			importScript(new URL(baseUrl + '/webRtcPlayer.js')),
			importScript(new URL(baseUrl + '/app.js')),
		]);
	}

	function prepareUnityViewer() {
		var unityLoaderPath = PREFIX + '/unity/Build/UnityLoader.js';
		return importScript(new URL(unityLoaderPath));
	}

	function initUnity() {
		return new Promise(function(resolve, reject) {
			(window as any).Module.errorhandler = UnityUtil.onError;

			UnityUtil.init(
				function(error: any) {
					console.error(error);
				},
				function(progress: number) {
					(window as any).planbase_progress_loaded = progress;
				},
				function(progress: number) {
					(window as any).planbase_model_loaded = progress;
				}
			);

			UnityUtil.setAPIKey(apiKey);

			const viewer = (window as any).config.viewer;
			if (viewer == 'unity') {
				UnityUtil.loadUnity('unity', PREFIX + '/unity/Build/unity.json', 2130706432 / 10);
			} else if (viewer == 'unreal') {
				UnityUtil.loadUnreal('unity', createPixelStreamingInstance, (window as any).config.unrealConfig);
			}

			// UnityUtil.overrideMeshColor(account, model, meshIds, color)

			UnityUtil.onReady()
				.then(function() {
					//changeStatus('');
					resolve('');

					UnityUtil.viewer = {
						objectSelected: function(pointInfo: any) {
							if (pointInfo.id && pointInfo.pin) {
								window.dispatchEvent(
									new CustomEvent('CLICK_PIN', {
										detail: pointInfo.id,
									} as any)
								);
							}
						},
						pickPointEvent: function(pointInfo: any) {
							if (pointInfo.position && pointInfo.position.length > 0) {
								//UnityUtil.dropIssuePin('test', pointInfo.position, [], [133, 133, 133]);
							}
						},
					};
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
html {
	overflow: hidden !important;
}

.container {
	padding: 0;
	height: 100%;
}

.v-application {
	pointer-events: none;
	background: transparent !important;
	display: flex;
	justify-content: center;
	flex-direction: row;
	overflow: hidden;
	height: 100vh;
	.v-application--wrap {
		display: flex;
		flex-direction: row;
		justify-content: center;
		.app-container {
			width: 100%;
			height: 100vh;
			display: flex;
			flex-direction: column;
			.v-content,
			.pb-progress-bar {
				width: 100%;
				margin: 0 auto;
				border-left: #ccc 1px solid;
				border-right: #ccc 1px solid;
			}
			.pb-logo-large {
				width: 100%;
				max-width: 300px;
				margin-bottom: 2rem;
			}
		}
	}
}

#viewer,
#unity {
	position: absolute;
	height: 100%;
	width: 100%;
	border: none;
	padding: 0;
	margin: 0;
	background: #eee !important;
	font-family: 'Roboto', sans-serif;
	display: flex;
	justify-content: center;
	canvas {
		height: 100vh;
	}
}
</style>

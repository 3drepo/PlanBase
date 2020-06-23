<template>
	<div class="pb-navbar">
		<router-link to="/">
			<img alt="Royal Docks Logo" class="rd-logo" :src="overview.logoUrl" />
		</router-link>
		<div class="pb-nav-body">
			<span class="pl-3 text-xl">{{ overview.title }}</span>
			<v-spacer></v-spacer>
			<v-btn class="tdr-load-btn" color="primary" v-if="!tdrLoaded" @click="loadTdr">Load Model (Dev Only)</v-btn>
			<v-switch v-model="_highContrast" color="primary" class="contrast-switch"></v-switch>
			<v-icon>{{ _highContrast ? 'mdi-brightness-7' : 'mdi-brightness-5' }}</v-icon>
		</div>
		<router-link to="/">
			<img alt="Planbase Logo" class="pb-logo" src="../assets/images/planbase_logo.png" />
		</router-link>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
	name: 'Navbar',
	data: function() {
		return {
			tdrLoaded: false,
		};
	},

	computed: {
		...mapGetters(['overview', 'highContrast']),

		_highContrast: {
			get() {
				return this.highContrast;
			},

			set() {
				this.$store.commit('toggleHighContrast');
			},
		},
	},
	methods: {
		loadTdr: function() {
			(this as any).tdrLoaded = true;
			(window as any).initialiseViewer();
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-navbar {
	pointer-events: all;
	width: 100%;
	background: white;
	display: flex;
	border-bottom: 1px solid #eee;
}

.pb-nav-body {
	flex: 1;
	padding: 1rem;
	display: flex;
	align-items: center;
	border-right: 1px solid rgb(226, 226, 226);
}

.rd-logo {
	width: 160px;
	align-self: center;
	padding: 0.75rem;
	margin-left: 1rem;
}

.pb-logo {
	width: 140px;
	align-self: center;
	padding: 1rem;
	padding-top: 22px;
}
</style>

<style lang="scss">
.tdr-load-btn {
	height: 24px !important;
	font-size: 0.5rem !important;
	margin: 0 10px;
}
.contrast-switch {
	padding: 0 !important;
	margin: 0 !important;
	.v-input__slot {
		margin: 0;
	}
	.v-messages {
		display: none;
	}
}
</style>

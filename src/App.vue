<template>
	<v-app id="inspire">
		<Navbar />
		<ProgressBar v-if="user" />
		<v-content>
			<v-container fluid>
				<Login v-if="!user" />
				<router-view v-else></router-view>
			</v-container>
		</v-content>
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

	created() {
		// this.$vuetify.theme.dark = true;
	},
});
</script>

<style lang="scss" scoped>
.container {
	padding: 0;
	height: 100%;
}
</style>

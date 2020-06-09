<template>
	<div class="login-container" :style="'background-image:url(\'' + overview.backgroundUrl + '\');'">
		<Login />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

// Components
import Login from '@/components/Login.vue';

export default Vue.extend({
	name: 'LoginView',

	components: {
		Login,
	},

	computed: {
		...mapGetters(['overview']),
	},

	beforeMount() {
		if (this.$store.getters.user) {
			const { email, postcode } = this.$store.getters.user;
			if (email && postcode) this.$router.push({ name: 'overview' });
		}
	},
});
</script>

<style lang="scss" scoped>
.login-container {
	pointer-events: all;
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

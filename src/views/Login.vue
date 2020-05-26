<template>
	<div class="login-container">
		<Login />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import Login from '@/components/Login.vue';

export default Vue.extend({
	name: 'LoginView',

	components: {
		Login,
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
	height: 100%;
	width: 100%;
	background-image: url('../assets/images/login_bg.jpg');
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

<template>
	<div class="pb-navbar">
		<router-link to="/">
			<img alt="Royal Docks Logo" class="rd-logo" :src="overview.logoUrl" />
		</router-link>
		<div class="pb-nav-body">
			<span class="pl-3 text-xl">{{ overview.title }}</span>
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

	computed: {
		...mapGetters(['overview']),
	},
});
</script>

<style lang="scss" scoped>
.pb-navbar {
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

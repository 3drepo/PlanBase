<template>
	<div class="px-6 py-4 pb-progress-bar">
		<div @click="changeStep(1)" class="pb-step" :class="stage === 'overview' ? 'active' : ''">
			<v-icon>info</v-icon>
			<span>Overview</span>
		</div>
		<div class="pb-horizontal-rule"></div>
		<div @click="changeStep(2)" class="pb-step" :class="stage === 'questions' ? 'active' : ''">
			<v-icon>help</v-icon>
			<span>Questions</span>
		</div>
		<div class="pb-horizontal-rule"></div>
		<div @click="changeStep(3)" class="pb-step" :class="stage === 'explorer' ? 'active' : ''">
			<v-icon>place</v-icon>
			<span>Explorer</span>
		</div>
		<div class="pb-horizontal-rule"></div>
		<div @click="changeStep(4)" class="pb-step" :class="stage === 'summary' ? 'active' : ''">
			<v-icon>playlist_add_check</v-icon>
			<span>Summary</span>
		</div>
		<div class="pb-horizontal-rule"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
	name: 'ProgressBar',

	computed: {
		...mapGetters(['highContrast']),

		stage() {
			const url = this.$route.name;
			return url;
		},
	},

	methods: {
		changeStep(index: number) {
			switch (index) {
				case 1:
					this.$router.push({ name: 'overview' });
					break;
				case 2:
					this.$router.push({ name: 'questions' });
					break;
				case 3:
					this.$router.push({ name: 'explorer' });
					break;
				default:
					this.$router.push({ name: 'summary' });
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-progress-bar {
	pointer-events: all;
	background: white;
	display: none;
	justify-content: space-between;
	align-items: center;
	.pb-step {
		align-self: center;
		color: #808080;
		display: flex;
		align-items: center;
		cursor: pointer;
		.v-icon {
			font-size: 28px;
		}

		span {
			margin-left: 0.5rem;
			font-family: 'Roboto', sans-serif;
			font-size: 16px;
			letter-spacing: 0.6px;
		}

		&.active {
			color: rgb(37, 37, 37);
			.v-icon {
				color: rgb(37, 37, 37);
			}
		}
	}
	.pb-horizontal-rule {
		height: 1px;
		border-bottom: 1px solid lightgrey;
		flex: 1;
		margin: 0 1rem;
	}
}
</style>

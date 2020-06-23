<template>
	<div class="pb-summary-container">
		<div class="pb-summary-card">
			<div class="p-6 pb-card-intro">
				<h4>{{ summary.title }}</h4>
			</div>
			<div class="pb-card-stages">
				<div class="p-6 flex flex-col pb-stage-item">
					<div class="flex-1 pb-stage-item-description" v-html="summary.bodyText"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
export default {
	name: 'Summary',
	computed: {
		...mapGetters(['summary']),
	},
};
</script>

<style lang="scss" scoped>
.pb-summary-container {
	pointer-events: all;
	height: 100%;
	width: 100%;
	background-image: url('../assets/images/3drepo_bg.jpg');
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: flex-start;

	.pb-summary-card {
		margin-top: 4rem;
		max-width: 740px;
		background-color: #fff;
		box-shadow: 1px 1px 3px 0 rgba(51, 51, 51, 0.5);

		.pb-card-intro {
			border-bottom: 1px solid lightgrey;
		}

		.pb-card-stages {
			display: flex;

			.pb-stage-item {
				border-right: 1px solid lightgrey;
				width: 50%;
			}

			.pb-stage-cta {
				text-align: right;

				a {
					text-decoration: none;
					color: #00aa41;
					cursor: pointer;
					font-weight: 500;
				}
			}
		}
	}
}
</style>

<template>
	<div class="pb-overview-container" :style="`background-image: url('` + overview.backgroundUrl + `');`">
		<div class="pb-overview-card">
			<div class="p-6 pb-card-intro">
				<h3 class="pb-2">{{ overview.title }}</h3>
				<p>{{ overview.bodyText }}</p>
			</div>
			<div class="pb-card-stages">
				<div class="p-6 flex flex-col pb-stage-item">
					<div class="flex-1 pb-stage-item-description">
						<h3 class="pb-2">1. Questions</h3>
						<p>
							Through our continuous engagement with GLA, the CIC partners as well as our own research with residents and multiple planning professionals, we have identified and
							addressed the biggest barriers to participation during community engagement.
						</p>
					</div>
					<div class="pb-stage-cta">
						<router-link to="/questions">START QUESTIONS</router-link>
					</div>
				</div>
				<div class="p-6 flex flex-col pb-stage-item">
					<div class="flex-1 pb-stage-item-description">
						<h3 class="pb-2">2. Explorer</h3>
						<p>
							Local planning authorities and residents review the submissions and comment on them directly in 3D depending on topics such as Design, Environment, Property,
							Transport, Education,Health, Community, Leisure, etc;
						</p>
					</div>
					<div class="pb-stage-cta">
						<router-link to="/explorer">EXPLORE THE PLANS</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
export default {
	name: 'Overview',

	computed: {
		...mapGetters(['overview']),
	},
};
</script>

<style lang="scss" scoped>
.pb-overview-container {
	height: 100%;
	width: 100%;
	background-image: url('../assets/images/3drepo_bg.jpg');
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: flex-start;

	.pb-overview-card {
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

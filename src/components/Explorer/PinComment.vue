<template>
	<div class="pb-comment">
		<!-- Comment Header >>> -->
		<div class="pb-comment-header">
			<div class="pb-category">
				<!-- Category Icons >>> -->
				<div v-if="comment.category === 'Education'" class="education pb-category-icon">
					<v-icon>mdi-school</v-icon>
				</div>
				<div v-if="comment.category === 'Leisure'" class="leisure pb-category-icon">
					<v-icon>mdi-food-fork-drink</v-icon>
				</div>
				<div v-if="comment.category === 'Transport'" class="transport pb-category-icon">
					<v-icon>mdi-train-car</v-icon>
				</div>
				<!-- <<< Category Icons -->
				<span>{{ comment.createdBy }}</span>
			</div>
			<span>{{ comment.createdAt | formatDate }}</span>
		</div>
		<!-- <<< Comment Header -->

		<!-- Comment Body >>> -->
		<div class="pb-comment-holder">
			<div class="comment-text">
				{{ comment.text }}
			</div>
		</div>
		<!-- <<< Comment Body -->

		<!-- Comment Voting >>> -->
		<div class="pb-comment-vote">
			<span>Do you agree with this comment?</span>
			<div class="pb-thumb">
				<v-icon class="positive" @click="upVote">mdi-thumb-up</v-icon>
				<span class="positive" :class="hasVoted ? 'visible' : 'invisible'">{{ upVotedPercentage || 0 }}%</span>
			</div>

			<div class="pb-thumb">
				<v-icon class="negative" @click="downVote">mdi-thumb-down</v-icon>
				<span class="negative" :class="hasVoted ? 'visible' : 'invisible'">{{ downVotedPercentage || 0 }}%</span>
			</div>
		</div>
		<!-- <<< Comment Voting -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from 'date-fns';

export default Vue.extend({
	name: 'PinComment',

	props: {
		comment: {
			type: Object,
		},
	},

	data: () => ({
		hasVoted: false,
	}),

	computed: {
		upVotedPercentage() {
			const numerator = this.comment.positive;
			const denominator = numerator + this.comment.negative;
			return Math.ceil((numerator / denominator) * 100);
		},

		downVotedPercentage() {
			const numerator = this.comment.negative;
			const denominator = numerator + this.comment.positive;
			return Math.floor((numerator / denominator) * 100);
		},
	},

	methods: {
		upVote() {
			if (!(this as any).hasVoted) (this as any).hasVoted = true;
		},

		downVote() {
			if (!(this as any).hasVoted) (this as any).hasVoted = true;
		},
	},

	filters: {
		formatDate(val: string) {
			return format(new Date(val), 'HH:mm do MMM');
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-comment {
	padding: 20px 30px 0;
	border-bottom: 1px solid #eeeeee;

	.pb-comment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #424242;
		font-size: 12px;
		font-weight: 400;
		margin-bottom: 10px;

		.pb-category {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.pb-category-icon {
				height: 37px;
				width: 37px;
				border-radius: 50%;
				margin-right: 0.5rem;
				display: flex;
				justify-content: center;
				align-items: center;

				&.education {
					background: #f0a777;
				}

				&.leisure {
					background: #f1429a;
				}

				&.transport {
					background: #7942f1;
				}

				.v-icon {
					color: white;
				}
			}
		}
	}

	.pb-comment-holder {
		padding: 20px;
		border-radius: 2px;
		background-color: #f6f5f5;
		div {
			font-size: 14px;
			font-weight: 300;
		}
	}

	.pb-comment-vote {
		display: flex;
		justify-content: flex-end;
		padding: 15px 10px;

		span {
			margin-top: 8px;
			margin-right: 10px;
			border-bottom: 1px none #eee;
			font-size: 10px;
			line-height: 12px;
			text-align: center;
		}

		.pb-thumb {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;

			.v-icon {
				margin-left: 10px;
				cursor: pointer;
				&.positive {
					color: #a8e6cf;
				}
				&.negative {
					color: #ff8b94;
				}
			}

			span {
				margin: 10px 0 0 10px;
				font-size: 12px;
				font-weight: 500;
				&.positive {
					color: #a8e6cf;
				}
				&.negative {
					color: #ff8b94;
				}
			}

			.visible {
				opacity: 1;
				transition-property: opacity;
				transition-duration: 4s;
			}

			.invisible {
				opacity: 1;
				transition-property: opacity;
				transition-duration: 4s;
			}
		}
	}
}
</style>

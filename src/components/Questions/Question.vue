<template>
	<div class="pb-question-card" v-if="selectedQuestion" :class="config.showNarrativeList ? 'left-margin' : ''">
		<!-- Card Header -->
		<div class="tw-flex tw-relative pb-card-header">
			<div class="tw-px-6 tw-py-3 tw-flex-1 tw-flex tw-items-center">
				<v-icon class="tw-pr-3">place</v-icon>
				<h4>{{ selectedQuestion.title }}</h4>
			</div>
			<div
				v-show="questionIndex > 0"
				class="tw-flex tw-justify-center tw-items-center pb-previous"
				:class="highContrast ? 'pb-previous-hc' : 'pb-previous'"
				@click="$emit('previousQuestion')"
			>
				<v-icon>keyboard_arrow_left</v-icon>
			</div>
			<div class="tw-flex tw-justify-center tw-items-center" :class="highContrast ? 'pb-next-hc' : 'pb-next'" @click="$emit('nextQuestion')">
				<v-icon>keyboard_arrow_right</v-icon>
			</div>
		</div>

		<!-- Question or Bookmark -->
		<div class="tw-px-6 tw-py-3 tw-pb-2 tw-relative pb-card-section-question">
			<h5 v-if="selectedQuestion.type === 'AgreementScale'" class="tw-pb-2">Question {{ questionIndex + 1 }}</h5>
			<h5 v-else class="tw-pb-2">Bookmark {{ questionIndex + 1 }}</h5>

			<!-- Image -->
			<!-- <img :src="image" alt="question-image" /> -->
			<div class="question-image" v-if="narrative" :alt="narrative.comment" :title="narrative.comment" :style="{ background: 'center / cover no-repeat url(' + image + ')' }"></div>

			<!-- Expand -->
			<div @click="toggleImage" class="tw-absolute expand-button">
				<v-icon>mdi-arrow-expand</v-icon>
			</div>

			<!-- Expanded Image -->
			<div v-if="imageExpanded" class="tw-absolute tw-shadow expanded-image" :style="{ background: 'center / cover no-repeat url(' + image + ')' }">
				<div class="tw-relative tw-shadow narrative">
					<div v-if="narrative">
						<p>{{ narrative.comment }}</p>
					</div>
					<div v-else>
						<p>This is the narrative to help with the image.</p>
						<p>Read with a smile.</p>
					</div>

					<!-- Close button -->
					<div @click="toggleImage" class="tw-absolute close-button">
						<v-icon>mdi-close</v-icon>
					</div>
				</div>
			</div>

			<p class="tw-font-bold">
				{{ selectedQuestion.bodyText }}
			</p>
		</div>

		<!-- Rating -->
		<div v-if="selectedQuestion.type === 'AgreementScale'" class="tw-px-6 tw-py-3 pb-card-question-rating">
			<p>Do you agree or disagree?</p>
			<div class="tw-flex tw-justify-between tw-pb-3 rating-options">
				<div @click="handleRating(1)" class="tw-flex-1 tw-flex tw-flex-col rating-item-group" :class="rating && rating !== 1 ? 'tw-opacity-25' : ''">
					<span class="tw-flex-1 tw-pb-2 rating-item-text">
						Strongly Disagree
					</span>
					<div class="rating-item">
						<span>1</span>
					</div>
				</div>
				<div @click="handleRating(2)" class="tw-flex-1 tw-flex tw-flex-col rating-item-group" :class="rating && rating !== 2 ? 'opacity-25' : ''">
					<span class="tw-flex-1 tw-pb-2 rating-item-text">
						Disagree
					</span>
					<div class="rating-item">
						<span>2</span>
					</div>
				</div>
				<div @click="handleRating(3)" class="tw-flex-1 tw-flex tw-flex-col rating-item-group" :class="rating && rating !== 3 ? 'tw-opacity-25' : ''">
					<span class="tw-flex-1 tw-pb-2 rating-item-text">
						Undecided
					</span>
					<div class="rating-item">
						<span>3</span>
					</div>
				</div>
				<div @click="handleRating(4)" class="tw-flex-1 tw-flex tw-flex-col rating-item-group" :class="rating && rating !== 4 ? 'tw-opacity-25' : ''">
					<span class="tw-flex-1 tw-pb-2 rating-item-text">
						Agree
					</span>
					<div class="rating-item">
						<span>4</span>
					</div>
				</div>
				<div @click="handleRating(5)" class="tw-flex-1 tw-flex tw-flex-col rating-item-group" :class="rating && rating !== 5 ? 'tw-opacity-25' : ''">
					<span class="tw-flex-1 tw-pb-2 rating-item-text">
						Strongly Agree
					</span>
					<div class="rating-item">
						<span>5</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Comment -->
		<div v-if="selectedQuestion.type === 'AgreementScale' && rating" class="tw-px-6 tw-py-3 pb-card-question-comment">
			<label for="comment-text-area" class="tw-text-xs tw-uppercase">Please add a comment to support your choice</label>
			<v-textarea outlined id="comment-text-area" name="comment-text-area" placeholder="e.g. They are far enough from the water's edge" v-model="comment" class="mt-2"></v-textarea>
		</div>

		<!-- Saved Comment -->
		<div v-if="selectedQuestion.type === 'AgreementScale' && rating && savedComment.text" class="px-6 py-3 pb-card-question-comment">
			<!-- <label for="comment-text-area" class="text-xs">Your Comment</label> -->
			<div class="flex justify-between p-2">
				<span class="text-xs">Your Comment</span>
				<span class="text-xs">{{ savedComment.date }}</span>
			</div>
			<div class="saved-comment-container">
				<span>{{ savedComment.text }}</span>
			</div>
		</div>

		<!-- Button Bar -->
		<div class="tw-p-2 tw-flex tw-justify-between pb-button-bar">
			<v-btn text large color="secondary">Skip Question</v-btn>
			<v-btn text large color="success">Save Comment</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { format } from 'date-fns';

export default Vue.extend({
	name: 'Question',

	props: {
		questions: Array,
		selectedQuestion: Object,
		questionIndex: Number,
	},

	data: () => ({
		rating: null as null | number,
		comment: '',
		savedComment: {
			text: '',
			date: '',
		},
		saving: false,
		// image: require('@/assets/images/question_image.png'),
		imageExpanded: false,
	}),

	computed: {
		...mapGetters(['highContrast', 'config']),

		narrative() {
			if (!this.selectedQuestion || !this.selectedQuestion.narrative) return null;
			else return this.selectedQuestion.narrative;
		},

		image() {
			const question = this.selectedQuestion.narrative;
			const backupImage = require('@/assets/images/question_image.png');
			if (question && question.image) return question.image;
			else return backupImage;
		},
	},

	methods: {
		handleRating(index: number) {
			this.rating = index;
		},

		toggleImage() {
			this.imageExpanded = !this.imageExpanded;
		},

		async saveComment() {
			const issueId = this.selectedQuestion.id;
			const commentObj = {
				rating: this.rating,
				comment: this.comment,
			};
			const comment = JSON.stringify(commentObj);
			this.saving = true;

			// Save details to API
			const res = await this.$store.dispatch('savePinComment', { issueId, comment }).catch(err => console.log(err));
			if (!res) {
				console.log('Unable to save comment');
				this.saving = false;
				return;
			}

			// If successful
			const createdAt = format(new Date(res.data.created), 'kk:mm dd MMM');
			const previousAnswers = JSON.parse(Vue.$cookies.get('questions'));
			const oldArray = previousAnswers ? previousAnswers : [];
			const newArray = JSON.stringify([{ issueId, ...commentObj, createdAt }, ...oldArray]);
			Vue.$cookies.set('questions', newArray);
			this.saving = false;
			this.savedComment.text = this.comment;
			this.savedComment.date = createdAt;
			this.comment = '';
			return;
		},
	},

	watch: {
		selectedQuestion(newVal: WalkthroughPoint) {
			if (!newVal) return;
			(window as any).UnityUtil.setViewpoint(newVal.viewpoint.position, newVal.viewpoint.up, newVal.viewpoint.viewDir, newVal.viewpoint.lookAt);
			const questions = JSON.parse(Vue.$cookies.get('questions'));
			const question = questions ? questions.find((q: { issueId: string; rating: string; comment: string }) => q.issueId === this.selectedQuestion.id) : null;
			if (question) {
				this.rating = parseInt(question.rating);
				this.comment = question.comment;
				this.savedComment.text = question.comment;
				this.savedComment.date = question.createdAt ? question.createdAt : format(new Date(), 'kk:mm dd MMM');
			} else {
				this.rating = null;
				this.comment = '';
				this.savedComment.text = '';
				this.savedComment.date = '';
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-question-card {
	pointer-events: all;
	width: 400px;
	margin-left: 210px;
	border-radius: 1px;
	background-color: #fff;
	box-shadow: 1px 1px 13px 0 rgba(79, 94, 120, 0.14);
	height: auto;
	max-height: calc(100vh - 170px);
	overflow: scroll;

	.pb-card-header {
		width: 100%;
		border-bottom: 1px solid rgb(197, 197, 197);

		.pb-next,
		.pb-previous {
			width: 40px;
			background: #eeeeee;
			flex: 0;
			min-width: 48px;
			cursor: pointer;
			&:hover {
				background: #c7c7c7;
			}
			.v-icon {
				font-size: 36px;
			}
		}

		.pb-next-hc,
		.pb-previous-hc {
			width: 40px;
			background: #000;
			flex: 0;
			min-width: 48px;
			cursor: pointer;
			&:hover {
				background: #c50202;
			}
			.v-icon {
				font-size: 36px;
				color: #fff;
			}
		}
	}

	.question-image {
		width: 100%;
		height: 210px;
		margin-bottom: 1rem;
	}

	.expanded-image {
		width: calc(100vw - 220px);
		max-width: 1100px;
		height: 600px;
		z-index: 10;
		top: 0;
		left: 0;
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		border: 3px solid rgb(90, 90, 90);

		.narrative {
			background: white;
			padding: 2rem;
			border-left: 3px solid rgb(90, 90, 90);
			border-bottom: 3px solid rgb(90, 90, 90);

			div {
				max-width: 500px;
			}

			.close-button {
				background: #e3513e;
				width: 40px;
				height: 40px;
				top: -15px;
				right: -15px;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;

				.v-icon {
					color: white;
				}
			}
		}
	}

	.pb-card-section-question {
		h5 {
			font-weight: 400;
			color: rgba(115, 115, 115);
			text-transform: uppercase;
		}

		.expand-button {
			top: 190px;
			right: 35px;
			background: #5da9ec;
			padding: 10px;
			border-radius: 50%;
			cursor: pointer;

			.v-icon {
				color: white;
			}
		}

		p {
			color: #424242;
			font-size: 18px;
			line-height: 24px;
			font-weight: 500;
		}
	}

	.pb-card-question-rating {
		p {
			color: #424242;
			font-size: 18px;
			line-height: 24px;
			font-weight: 500;
		}
	}

	.rating-item-group {
		line-height: 0.75rem;
		text-align: center;
		cursor: pointer;
		&:nth-child(2) {
			.rating-item {
				background-color: #ffaaa5;
			}
		}
		&:nth-child(3) {
			.rating-item {
				background-color: #ffd3b6;
			}
		}
		&:nth-child(4) {
			.rating-item {
				background-color: #dcedc1;
			}
		}
		&:nth-child(5) {
			.rating-item {
				background-color: #a8e6cf;
			}
		}
		.rating-item-text {
			font-size: 0.75rem;
			text-transform: uppercase;
		}

		.rating-item {
			background-color: #ff8b94;
			padding: 4px 20px;
			border-radius: 50px;
			color: #424242;
			font-weight: 700;
			text-decoration: none;
			display: flex;
			justify-content: center;
			padding: 10px;
			margin: 5px;
		}
	}

	.saved-comment-container {
		padding: 1rem;
		background: #f6f5f5;
		span {
			font-size: 14px;
			font-weight: 300;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			font-family: Roboto, sans-serif;
			font-size: 16px;
			letter-spacing: 0.6px;
			font-family: Arial, sans-serif;
			font-size: 14px;
			line-height: 20px;
			color: #333;
		}
	}

	.pb-button-bar {
		border-top: 1px solid rgb(197, 197, 197);
	}
}
</style>

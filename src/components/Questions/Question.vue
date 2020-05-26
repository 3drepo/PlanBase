<template>
	<div class="pb-question-card">
		<!-- Card Header -->
		<div class="flex relative pb-card-header">
			<div class="px-6 py-3 flex-1 flex items-center">
				<v-icon class="pr-3">place</v-icon>
				<h4>{{ selectedQuestion.label }}</h4>
			</div>
			<div
				v-show="questionIndex > 0"
				class="flex justify-center items-center pb-previous"
				@click="$emit('previousQuestion')"
			>
				<v-icon>keyboard_arrow_left</v-icon>
			</div>
			<div class="flex justify-center items-center pb-next" @click="$emit('nextQuestion')">
				<v-icon>keyboard_arrow_right</v-icon>
			</div>
		</div>

		<!-- Question or Bookmark -->
		<div class="px-6 py-3 pb-2 relative pb-card-section-question">
			<h5 v-if="selectedQuestion.type === 'question'" class="pb-2">
				Question {{ questionIndex + 1 }}
			</h5>
			<h5 v-else class="pb-2">Bookmark {{ questionIndex + 1 }}</h5>

			<!-- Image -->
			<!-- <img :src="image" alt="question-image" /> -->
			<div
				class="question-image"
				:style="{ background: 'center / cover no-repeat url(' + image + ')' }"
			></div>

			<!-- Expand -->
			<div @click="toggleImage" class="absolute expand-button">
				<v-icon>mdi-arrow-expand</v-icon>
			</div>

			<!-- Expanded Image -->
			<div
				v-if="imageExpanded"
				class="absolute shadow expanded-image"
				:style="{ background: 'center / cover no-repeat url(' + image + ')' }"
			>
				<div class="relative shadow narrative">
					<div v-if="narrative">
						<p>{{ narrative.comment }}</p>
					</div>
					<div v-else>
						<p>This is the narrative to help with the image.</p>
						<p>Read with a smile.</p>
					</div>

					<!-- Close button -->
					<div @click="toggleImage" class="absolute close-button">
						<v-icon>mdi-close</v-icon>
					</div>
				</div>
			</div>

			<p class="font-bold">
				{{ selectedQuestion.text }}
			</p>
		</div>

		<!-- Rating -->
		<div v-if="selectedQuestion.type === 'question'" class="px-6 py-3 pb-card-question-rating">
			<p>Do you agree or disagree?</p>
			<div class="flex justify-between pb-3 rating-options">
				<div
					@click="handleRating(1)"
					class="flex-1 flex flex-col rating-item-group"
					:class="rating && rating !== 1 ? 'opacity-25' : ''"
				>
					<span class="flex-1 pb-2 rating-item-text">
						Strongly Disagree
					</span>
					<div class="rating-item">
						<span>1</span>
					</div>
				</div>
				<div
					@click="handleRating(2)"
					class="flex-1 flex flex-col rating-item-group"
					:class="rating && rating !== 2 ? 'opacity-25' : ''"
				>
					<span class="flex-1 pb-2 rating-item-text">
						Disagree
					</span>
					<div class="rating-item">
						<span>2</span>
					</div>
				</div>
				<div
					@click="handleRating(3)"
					class="flex-1 flex flex-col rating-item-group"
					:class="rating && rating !== 3 ? 'opacity-25' : ''"
				>
					<span class="flex-1 pb-2 rating-item-text">
						Undecided
					</span>
					<div class="rating-item">
						<span>3</span>
					</div>
				</div>
				<div
					@click="handleRating(4)"
					class="flex-1 flex flex-col rating-item-group"
					:class="rating && rating !== 4 ? 'opacity-25' : ''"
				>
					<span class="flex-1 pb-2 rating-item-text">
						Agree
					</span>
					<div class="rating-item">
						<span>4</span>
					</div>
				</div>
				<div
					@click="handleRating(5)"
					class="flex-1 flex flex-col rating-item-group"
					:class="rating && rating !== 5 ? 'opacity-25' : ''"
				>
					<span class="flex-1 pb-2 rating-item-text">
						Strongly Agree
					</span>
					<div class="rating-item">
						<span>5</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Comment -->
		<div v-if="selectedQuestion.type === 'question'" class="px-6 py-3 pb-card-question-comment">
			<label for="comment-text-area" class="text-xs uppercase"
				>Please add a comment to support your choice</label
			>
			<v-textarea
				outlined
				id="comment-text-area"
				name="comment-text-area"
				placeholder="e.g. They are far enough from the water's edge"
				v-model="comment"
				class="mt-2"
			></v-textarea>
		</div>

		<!-- Button Bar -->
		<div class="p-2 flex justify-between pb-button-bar">
			<v-btn text large color="secondary">Skip Question</v-btn>
			<v-btn text large color="success">Save Comment</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

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
		// image: require('@/assets/images/question_image.png'),
		imageExpanded: false,
	}),

	computed: {
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
	},

	watch: {
		selectedQuestion(newVal) {
			this.rating = null;
			this.comment = '';
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-question-card {
	width: 400px;
	margin-left: 180px;
	border-radius: 1px;
	background-color: #fff;
	box-shadow: 1px 1px 13px 0 rgba(79, 94, 120, 0.14);

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
	}

	.question-image {
		width: 100%;
		height: 210px;
		margin-bottom: 1rem;
	}

	.expanded-image {
		width: calc(100vw - 220px);
		max-width: 1600px;
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

	.pb-button-bar {
		border-top: 1px solid rgb(197, 197, 197);
	}
}
</style>

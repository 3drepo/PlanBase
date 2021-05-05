<template>
	<!-- <div @wheel="scroll($event)" class="pb-questions-list-container"> -->
	<div class="pb-questions-list-container">
		<div
			v-for="(question, qIndex) in questions"
			:key="`question-` + qIndex"
			class="tw-p-3 tw-cursor-pointer pb-question"
			:class="selectedQuestion.id == question.id ? 'active' : ''"
			@click="selectQuestion(qIndex)"
		>
			<div class="tw-rounded-full pb-pill">
				<v-icon v-if="question.type === 'AgreementScale'">mdi-chat-processing-outline</v-icon>
				<v-icon v-else>mdi-bookmark</v-icon>
			</div>
			<span class="pb-question-title" :class="selectedQuestion.id == question.id ? 'tw-text-white' : ''">{{ question.title }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'QuestionsList',

	props: {
		selectedQuestion: {
			type: Object,
		},
		questions: {
			type: Array,
		},
		questionIndex: {
			type: Number,
		},
	},

	data: () => ({
		selectedQuestionIndex: null as null | number,
	}),

	methods: {
		selectQuestion(index: number) {
			this.selectedQuestionIndex = index;
			this.$emit('selectedQuestionIndex', this.questions[index]);
		},
	},

	mounted() {
		this.selectedQuestionIndex = 0;
	},
});
</script>

<style lang="scss" scoped>
.pb-questions-list-container {
	background: #fff;
	font-family: Roboto, sans-serif;
	height: auto;
	left: 0;
	max-height: calc(100vh - 170px);
	min-height: 396px;
	min-width: 196px;
	overflow: auto;
	pointer-events: all;
	position: absolute;
	top: 24px;
	.pb-questions-list-header {
		background: #fafafa;
		border-bottom: 1px solid #eee;
		border-right: 1px solid #eee;
	}

	.pb-question {
		border-bottom: 1px solid #eee;
		border-right: 1px solid #eee;
		background: white;
		.pb-pill {
			background: #eeeeee;
			height: 24px;
			width: 24px;
			margin-right: 10px;
			font-size: 10px;
			line-height: 14px;
			display: flex;
			justify-content: center;
			align-items: center;
			display: inline-flex;
			.v-icon {
				font-size: 18px;
				color: rgb(39, 39, 39);
			}
		}

		.pb-question-title {
			font-size: 12px;
			line-height: 16px;
			text-align: left;
			white-space: normal;
		}

		&:hover {
			background: #eee;
		}

		&.active {
			background: #424242;
			border-bottom: 1px solid #424242;
			border-right: 1px solid #424242;
		}
	}
}
</style>

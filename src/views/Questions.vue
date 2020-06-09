<template>
	<div class="pb-questions-container">
		<QuestionsList
			:questions="questions"
			:selectedQuestion="selectedQuestion"
			:questionIndex="questionIndex"
			@selectedQuestionIndex="questionSelected"
			@previousQuestion="previousQuestion"
			@nextQuestion="nextQuestion"
		/>
		<Question :questions="questions" :selectedQuestion="selectedQuestion" :questionIndex="questionIndex" @previousQuestion="previousQuestion" @nextQuestion="nextQuestion" />
	</div>
</template>

<script lang="ts">
// Components
import QuestionsList from '@/components/Questions/QuestionsList.vue';
import Question from '@/components/Questions/Question.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'Questions',
	components: {
		QuestionsList,
		Question,
	},

	data: () => ({
		selectedQuestion: {} as Question,
	}),

	computed: {
		...mapGetters(['questions']),

		questionIndex() {
			const ids = (this as any).questions.map((q: any) => q.id);
			return ids.indexOf((this as any).selectedQuestion.id);
		},
	},

	methods: {
		questionSelected(question: any) {
			(this as any).selectedQuestion = question;
		},

		previousQuestion() {
			const qIndex = (this as any).questionIndex;

			//  If first question, do nothing
			if (!qIndex) return;

			(this as any).selectedQuestion = (this as any).questions[qIndex - 1];
		},

		nextQuestion() {
			const qIndex = (this as any).questionIndex;
			const questions = (this as any).questions;

			//  If last question, got to pin explorer
			if (qIndex === questions.length - 1) {
				// console.log('navigate to pin explorer...');
				return;
			}

			(this as any).selectedQuestion = questions[qIndex + 1];
		},
	},

	mounted() {
		(this as any).selectedQuestion = (this as any).questions[0];
	},
};
</script>

<style lang="scss" scoped>
.pb-questions-container {
	height: 100%;
	width: 100%;
	padding-top: 24px;
}
</style>

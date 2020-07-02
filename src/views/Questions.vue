<template>
	<div class="pb-questions-container">
		<QuestionsList
			v-if="config.showNarrativeList"
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

// /**
// 	 * Add an issue pin
// 	 * @category Pins
// 	 * @param id - Identifier for the pin
// 	 * @param position - point in space where the pin should generate
// 	 * @param normal - normal vector for the pin (note: this is no longer used)
// 	 * @param colour - RGB value for the colour of the pin
// 	 */
// 	public static dropIssuePin(id: string, position: number[], normal: number[], colour: number[]) {
// 		const params = {
// 			id,
// 			position,
// 			normal,
// 			color : colour
// 		};
// 		UnityUtil.toUnity('DropIssuePin', UnityUtil.LoadingState.MODEL_LOADING, JSON.stringify(params));
// 	}

// /**
// 	 * Remove a pin from the viewer
// 	 * @category Pins
// 	 * @param id - pin identifier
// 	 */
// 	public static removePin(id: string) {
// 		UnityUtil.toUnity('RemovePin', UnityUtil.LoadingState.MODEL_LOADING, id);
// 	}

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
		...mapGetters(['questions', 'config']),

		questionIndex() {
			const selectedQuestion = (this as any).selectedQuestion;
			const questions = (this as any).questions;
			if (!questions.length || !selectedQuestion) return;
			const ids = (this as any).questions.map((q: any) => q.id);
			return ids.indexOf(selectedQuestion.id);
		},
	},

	methods: {
		questionSelected(question: any) {
			(this as any).selectedQuestion = { ...question, time: Date.now() };
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
		if ((this as any).config.showNarrativePins)
			(this as any).questions.map((q: WalkthroughPoint) => {
				if (q.position && q.position.length > 0) (window as any).UnityUtil.dropIssuePin(q.id, q.position, [], [255, 0, 0]);
			});
		(this as any).selectedQuestion = (this as any).questions[0];

		window.addEventListener('CLICK_PIN', (object: any) => {
			(this as any).questions.forEach((q: any) => {
				if (q.id === object.detail) {
					(this as any).selectedQuestion = q;
				}
			});
		});
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

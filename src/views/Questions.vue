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
import addQuarters from 'date-fns/addQuarters';

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
		// NOTE: #2 This is triggered every time as new question is chosen and sets the visibilty options. It takes the new question as an arg
		setVisibilityOptions(q: Question) {
			// Color/Opacity override
			if (q.overrideGroups && q.overrideGroups.length) {
				console.log('override groups detected');
				console.log(q.overrideGroups);
				q.overrideGroups.map((g: TdrGroup) => {
					const account = (window as any).config.teamspaceId;
					const modelId = (window as any).config.modelId;
					const meshIds = g.meshIds;
					const color: number[] = [g.color[0], g.color[1], g.color[2]];
					const opacity: number = g.color[3] ? g.color[3] / 255 : 1;
					// FIXME: Below here not working as meshIds are incorrect I think
					// console.log('over riding color');
					// (window as any).UnityUtil.overrideMeshColor(account, modelId, meshIds, color);
					// console.log('over riding opacity');
					// (window as any).UnityUtil.overrideMeshOpacity(account, modelId, meshIds, opacity);
				});
			}

			// Visibilty
			if (q.hiddenGroups && q.hiddenGroups.length) {
				const account = (window as any).config.teamspaceId;
				const modelId = (window as any).config.modelId;
				const meshIds = (q as any).hiddenGroups[0].meshIds[0];
				const visibility = false;
				// FIXME: Below here not working as meshIds are incorrect I think
				// (window as any).UnityUtil.toggleVisibility(account, modelId, meshIds, visibility);
			}
		},

		// NOTE: #3 Same as above but takes the old question and resets the visibility options
		resetVisibilityOptions(q: Question) {
			if (q.overrideGroups && q.overrideGroups.length) {
				q.overrideGroups.map((g: TdrGroup) => {
					const account = (window as any).config.teamspaceId;
					const modelId = (window as any).config.modelId;
					const meshIds = [...g.objects[0].shared_ids];
					// FIXME: Below here not working as meshIds are incorrect I think
					// console.log('reseting color');
					// (window as any).UnityUtil.resetMeshColor(account, modelId, meshIds);
					// console.log('reseting opacity');
					// (window as any).UnityUtil.resetMeshOpacity(account, modelId, meshIds);
				});
			}
			if (q.hiddenGroups && q.hiddenGroups.length) {
				const account = (window as any).config.teamspaceId;
				const modelId = (window as any).config.modelId;
				const meshIds = [...q.hiddenGroups[0].objects[0].shared_ids];
				const visibility = true;
				// FIXME: Below here not working as meshIds are incorrect I think
				// (window as any).UnityUtil.toggleVisibility(account, modelId, meshIds, visibility);
			}
		},

		questionSelected(question: Question) {
			console.log(question);
			(this as any).setVisibilityOptions(question);
			// (this as any).resetVisibilityOptions(question);
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
		// console.log('Questions view mounted');
		// (this as any).questions.map((q: WalkthroughPoint) => {
		// console.log('q');
		// console.log(q);

		// });
		if ((this as any).config.showNarrativePins)
			(this as any).questions.map((q: WalkthroughPoint) => {
				if (q.position && q.position.length > 0) (window as any).UnityUtil.dropIssuePin(q.id, q.position, [], [255, 0, 0]);
			});
		(this as any).selectedQuestion = (this as any).questions[0];
		(this as any).questionSelected((this as any).questions[0]);

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

<template>
	<div class="pb-pin-details-card">
		<!-- Header >>> -->
		<div class="pb-header">
			<v-icon>mdi-map-marker</v-icon>
			<span>Pin {{ pinIndex + 1 }}</span>
			<div class="pb-previous" @click="$emit('previousPin')">
				<v-icon>keyboard_arrow_left</v-icon>
			</div>
			<div class="pb-next" @click="$emit('nextPin')">
				<v-icon>keyboard_arrow_right</v-icon>
			</div>
		</div>
		<!-- <<< Header -->

		<!-- Add Comment >>> -->
		<div class="pb-add-comment">
			<v-btn text v-if="!addingComment" @click="addComment">Add Your Comment</v-btn>
			<div class="add-comment-container" v-else>
				<h5>Please add your comment to this pin</h5>
				<v-select id="comment-category" :items="categories" v-model="comment.category" label="Choose A Category" dense outlined></v-select>
				<v-textarea outlined name="add-comment-text-area" label="Comment" placeholder="e.g. They are far enough from the water's edge" v-model="comment.text"></v-textarea>
				<div class="tw-flex tw-justify-end">
					<v-btn color="success" text @click="saveComment">Save Comment</v-btn>
				</div>
			</div>
		</div>
		<!-- <<< Add Comment -->

		<!-- Comments >>> -->
		<PinComment v-for="(comment, pinIndex) in pinComments" :key="`pin-comment-` + pinIndex" :comment="comment" />
		<!-- <<< Comments -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import PinComment from './PinComment.vue';

export default Vue.extend({
	name: 'PinDetails',

	props: {
		pins: {
			type: Array,
		},

		pinComments: {
			type: Array,
		},

		selectedPin: {
			type: Object,
		},

		pinIndex: {
			type: Number,
		},
	},

	components: {
		PinComment,
	},

	data: () => ({
		addingComment: false,
		comment: {
			category: null,
			text: '',
		},
	}),

	computed: {
		categories() {
			return ['Education', 'Leisure', 'Transport'];
		},
	},

	methods: {
		addComment() {
			this.addingComment = true;
		},

		async saveComment() {
			if (this.comment.category && this.comment.text) {
				const payload = {
					...this.comment,
					pinId: this.selectedPin.id,
				};
				await this.$store.dispatch('saveComment', payload).catch(err => console.log(err));
				this.comment = {
					category: null,
					text: '',
				};
				this.addingComment = false;
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-pin-details-card {
	pointer-events: all;
	width: 400px;
	min-height: 200px;
	max-height: calc(100vh - 180px);
	overflow-y: scroll;
	background: white;
	position: absolute;
	top: 25px;
	left: 25px;
	z-index: 10;

	.pb-header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #eeeeee;
		height: 50px;

		.v-icon {
			margin-left: 1rem;
			margin-right: 0.5rem;
		}

		span {
			font-size: 18px;
			line-height: 24px;
			color: #424242;
			font-weight: 500;
			flex: 1;
		}

		.pb-next,
		.pb-previous {
			background: #eeeeee;
			height: 50px;
			width: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			&:hover {
				background: #c7c7c7;
			}
			.v-icon {
				margin: 0;
				font-size: 36px;
				color: #424242;
			}
		}
	}

	.pb-add-comment {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0.5rem;
		border-bottom: 1px solid #eeeeee;

		.add-comment-container {
			width: 100%;
			padding: 20px 30px 0 30px;

			h5 {
				color: #424242;
				font-size: 12px;
				font-weight: 400;
				margin-bottom: 20px;
			}

			.v-btn {
				margin-right: -1rem;
			}
		}
	}
}
</style>

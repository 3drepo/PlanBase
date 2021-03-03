<template>
	<div class="pb-create-pin-card">
		<!-- Header >>> -->
		<div class="pb-header">
			<v-icon>mdi-map-marker</v-icon>
			<span>Create New Pin</span>
			<span style="font-size: 10px">{{ pinLocation }}</span>
		</div>
		<!-- <<< Header -->

		<!-- Add Comment >>> -->
		<div class="pb-add-comment">
			<div class="add-comment-container">
				<h5>To create a new pin, please create a new comment.</h5>
				<v-select id="comment-category" :items="categories" v-model="comment.category" label="Choose A Category" dense outlined></v-select>
				<v-textarea outlined name="add-comment-text-area" label="Comment" placeholder="e.g. They are far enough from the water's edge" v-model="comment.text"></v-textarea>
				<div class="tw-flex tw-justify-end">
					<v-btn color="success" text @click="savePin">Save Comment and Create New Pin</v-btn>
				</div>
			</div>
		</div>
		<!-- <<< Add Comment -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from 'date-fns';

export default Vue.extend({
	name: 'CreateNewPin',

	props: {
		pinLocation: {
			type: Object,
		},
	},

	data: () => ({
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
		async savePin() {
			if (!this.comment.category || !this.comment.text) return;

			const payload = {
				...this.comment,
				x: this.pinLocation.x,
				y: this.pinLocation.y,
			};

			await this.$store.dispatch('createPin', payload).catch(err => console.log(err));

			this.comment = {
				category: null,
				text: '',
			};

			this.$emit('pinSaved');
		},
	},
});
</script>

<style lang="scss" scoped>
.pb-create-pin-card {
	width: 400px;
	min-height: 200px;
	max-height: calc(100vh - 180px);
	background: white;
	position: absolute;
	top: 25px;
	left: calc(400px + 10vw);
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

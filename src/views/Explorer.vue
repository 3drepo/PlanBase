<template>
	<div id="canvas" class="pb-explorer-container">
		<!-- Pin Details Card >>> -->
		<PinDetails :selectedPin="selectedPin" :pins="pins" :pinComments="selectedPinComments" :pinIndex="pinIndex" @previousPin="previousPin" @nextPin="nextPin" />
		<!-- <<< Pin Details Card -->

		<!-- Create New Pin Card >>> -->
		<CreatePin v-if="addPin" :pinLocation="pinLocation" @pinSaved="handlePinSaved" />
		<!-- <<< Create New Pin Card -->

		<!-- Existing Pins >>> -->
		<v-icon v-for="(pin, pI) in pins" :key="`pin-` + pI" class="pb-existing-pin" @click="selectPin(pI)" :style="{ top: pin.y - 195 + 'px', left: pin.x - 35 + 'px' }">
			mdi-map-marker
		</v-icon>
		<!-- <<< Existing Pins -->

		<!-- Pin >>> -->
		<v-icon v-if="addPin" class="pb-new-pin" :style="{ top: pinLocation.y - 195 + 'px', left: pinLocation.x - 35 + 'px' }">mdi-map-marker</v-icon>
		<!-- <<< Pin -->

		<!-- Reset View Button >>> -->
		<div class="shadow reset-view-button" @click="resetCamera">
			<v-icon>mdi-sync</v-icon>
			<span>Reset View</span>
		</div>
		<!-- <<< Reset View Button -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// Components
import PinDetails from '@/components/Explorer/PinDetails.vue';
import CreatePin from '@/components/Explorer/CreatePin.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
	name: 'Explorer',

	components: {
		PinDetails,
		CreatePin,
	},

	data: () => ({
		pinIndex: 0,
		addPin: false,
		pinLocation: {
			x: null,
			y: null,
		},
	}),

	computed: {
		...mapGetters(['pins', 'pinComments']),

		selectedPin() {
			return this.pins[this.pinIndex];
		},

		selectedPinComments() {
			if (!this.selectedPin) return null;
			return this.pinComments.filter((comment: PinComment) => {
				return (this as any).selectedPin.id === comment.pinId;
			});
		},
	},

	methods: {
		resetCamera() {
			(window as any).UnityUtil.resetCamera();
		},
		nextPin() {
			if (this.pinIndex < this.pins.length - 1) this.pinIndex++;
		},

		previousPin() {
			if (this.pinIndex > 0) this.pinIndex--;
		},

		setPin(evt: any) {
			const id = evt.target.id;
			if (id !== 'canvas') return;
			const x = evt.pageX;
			const y = evt.pageY;
			this.pinLocation = {
				x,
				y,
			};
			this.addPin = true;
		},

		handlePinSaved() {
			this.addPin = false;
		},

		selectPin(pI: number) {
			this.pinIndex = pI;
		},
	},

	created() {
		document.onkeydown = evt => {
			evt = evt || window.event;
			if (evt.keyCode == 27) {
				this.addPin = false;
			}
		};
	},

	beforeDestroy() {
		window.removeEventListener('keydown', evt => {
			evt = evt || window.event;
			if (evt.keyCode == 27) {
				this.addPin = false;
			}
		});
	},
});
</script>

<style lang="scss" scoped>
.pb-explorer-container {
	height: 100%;
	width: 100%;

	.reset-view-button {
		pointer-events: all;
		position: absolute;
		top: 25px;
		right: 25px;
		background: white;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		.v-icon {
			font-size: 28px;
			margin-right: 0.25rem;
		}

		span {
			font-size: 10px;
			text-transform: uppercase;
			display: inline-block;
			text-align: center;
			max-width: 30px;
		}
	}

	.pb-existing-pin {
		position: absolute;
		font-size: 4rem;
		color: #f142ae;
		cursor: pointer;
		&:hover {
			color: #4542f1;
		}
	}

	.pb-new-pin {
		position: absolute;
		font-size: 4rem;
		color: #7942f1;
	}
}
</style>

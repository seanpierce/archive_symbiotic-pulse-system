<template>
	<div class="voice" v-if="vco">
		<div class="module">
			<div class="module-title">
				VCO
			</div>
			<div class="module-controls">
				<input type="radio" name="waveshape" value="sine" v-model="wave" v-on:change="updateWaveShape()"> Sine
				<input type="radio" name="waveshape" value="square" v-model="wave" v-on:change="updateWaveShape()"> Square
				<input type="radio" name="waveshape" value="sawtooth" v-model="wave" v-on:change="updateWaveShape()"> Saw
			</div>
			<div class="module-controls">
				<div>
					{{ frequency }}
				</div>
				<input type="range" min="0" max="1360" step="1" v-model="vco.frequency.value" v-on:input="updateFrequency($event)" />
			</div>
		</div>
		<div class="module">
			<div class="module-title">
				VCA
			</div>
			<div class="module-controls">
				<div>
					{{ gain }}
				</div>
				<input type="range" min="0" max="1" step="0.01" v-model="vca.gain.value" v-on:input="updateGain($event)" />
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */ 
export default {
	name: 'VCO',
	data: function() {
		return {
			vco: null,
			vca: null,
			frequency: 220,
			wave: 'square',
			gain: 100
		};
	},
	methods: {
		createVCO() {
			var context = this.$parent.context;

			// create vco
			this.vco = context.createOscillator();
			this.vco.type = 'square';
			this.vco.frequency.value = this.frequency;

			// create vca
			this.vca = context.createGain();
			this.vca.gain.value = 1;

			// connect output of vco to input of vca
			// connect output of vca to destination
			this.vco.connect(this.vca);
			this.vca.connect(context.destination);
			this.vco.start();
		},
		updateFrequency(event) {
			var value = event.target.value;
			this.frequency = value;
		},
		updateWaveShape() {
			this.vco.type = this.wave;
		},
		updateGain(event) {
			var value = event.target.value;
			this.gain = Math.round(value * 100)
		},
	},
	mounted: function() {
		this.createVCO();
	}
}
</script>

<style scoped>

</style>

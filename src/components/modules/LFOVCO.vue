<template>
	<div v-if="loaded">
		<div class="module">
			<div class="module-title">
				LFO > VCO
			</div>
			<div class="module-controls">
				<input type="radio" name="lfo-waveshape" value="sine" v-model="wave" v-on:change="updateWaveShape()"> Sine
				<input type="radio" name="lfo-waveshape" value="square" v-model="wave" v-on:change="updateWaveShape()"> Square
				<input type="radio" name="lfo-waveshape" value="sawtooth" v-model="wave" v-on:change="updateWaveShape()"> Saw
			</div>
			<div class="module-controls">
				<div>
					{{ frequency }}
				</div>
				<input type="range" min="0" max="100" step="0.01" v-model="vco.frequency.value" v-on:input="updateFrequency($event)" />
			</div>
			<div class="module-controls">
				<div>
					{{ gain }}
				</div>
				<input type="range" min="0" max="100" step="0.1" v-model="vca.gain.value" v-on:input="updateGain($event)" />
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */ 
export default {
	name: 'LFOVCO',
	data: function() {
		return {
			loaded: false,
			frequency: 0,
			gain: 0,
			wave: 'sine',
			vco: null,
			vca: null
		}
	},
	methods: {
		setData()  {
			this.vco = this.$parent.lfos.vco;
			this.vca = this.$parent.lfos.vcoGain;
			this.vco.type = this.wave;
			this.vco.frequency.value = this.frequency;
			this.vca.gain.value = this.gain;
			this.loaded = true;
		},
		updateFrequency(event) {
			var value = event.target.value;
			this.frequency = Math.round(value * 1);
		},
		updateGain(event) {
			var value = event.target.value;
			this.gain = Math.round(value * 1);
		},
		updateWaveShape() {
			this.vco.type = this.wave;
		},
	},
	mounted: function() {
		this.setData()
	}
}
</script>

<style scoped>

</style>

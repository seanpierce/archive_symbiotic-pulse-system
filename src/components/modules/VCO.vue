<template>
	<div v-if="loaded">
		<div class="module">
			<div class="module-left">
				<div class="module-title">
					VCO
				</div>
				<div class="module-controls">
					<img src="../../assets/sine.png" alt="sine wave" class="wave" v-bind:class="{'selectedWave': wave === 'sine'}" v-on:click="updateWaveShape('sine')">
					<img src="../../assets/square.png" alt="square wave" class="wave" v-bind:class="{'selectedWave': wave === 'square'}" v-on:click="updateWaveShape('square')">
					<img src="../../assets/saw.png" alt="saw wave" class="wave" v-bind:class="{'selectedWave': wave === 'sawtooth'}" v-on:click="updateWaveShape('sawtooth')">
				</div>
				<div class="module-controls">
					<div>
						<div class="label">FREQ</div> {{ frequency }}
					</div>
					<input type="range" min="0" max="1760" step="1" v-model="vco.frequency.value" v-on:input="updateFrequency($event)" />
				</div>
			</div>
			<div class="module-right">
				<div class="module-title">
					LFO
				</div>
				<div class="module-controls">
					<img src="../../assets/sine.png" alt="sine wave" class="wave" v-bind:class="{'selectedWave': lfo.wave === 'sine'}" v-on:click="updateLFOWaveShape('sine')">
					<img src="../../assets/square.png" alt="square wave" class="wave" v-bind:class="{'selectedWave': lfo.wave === 'square'}" v-on:click="updateLFOWaveShape('square')">
					<img src="../../assets/saw.png" alt="saw wave" class="wave" v-bind:class="{'selectedWave': lfo.wave === 'sawtooth'}" v-on:click="updateLFOWaveShape('sawtooth')">
				</div>
				<div class="module-controls">
					<div>
						<div class="label">FREQ</div> {{ lfo.frequency }}
					</div>
					<input type="range" min="0" max="100" step="0.01" v-model="lfo.vco.frequency.value" v-on:input="updateLFOFrequency($event)" />
				</div>
				<div class="module-controls">
					<div>
						<div class="label">GAIN</div> {{ lfo.gain }}
					</div>
					<input type="range" min="0" max="100" step="0.1" v-model="lfo.vca.gain.value" v-on:input="updateLFOGain($event)" />
				</div>
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
			loaded: false,
			frequency: 220,
			wave: 'square',
			vco: null,
			lfo: {
				gain: 0,
				frequency: 0,
				wave: 'sine',
				vco: null,
				vca: null
			}
		}
	},
	methods: {
		setData()  {
			this.vco = this.$parent.vco;
			this.vco.type = this.wave;
			this.vco.frequency.value = this.frequency;
			this.loaded = true;
		},
		updateFrequency(event) {
			var value = event.target.value;
			this.frequency = value;
		},
		updateWaveShape(wave) {
			this.wave = wave;
			this.vco.type = this.wave;
		},

		// lfo functions:
		setLFOData()  {
			this.lfo.vco = this.$parent.lfos.vco;
			this.lfo.vca = this.$parent.lfos.vcoGain;
			this.lfo.vco.type = this.lfo.wave;
			this.lfo.vco.frequency.value = this.lfo.frequency;
			this.lfo.vca.gain.value = this.lfo.gain;
		},
		updateLFOFrequency(event) {
			var value = event.target.value;
			this.lfo.frequency = Math.round(value * 1);
		},
		updateLFOGain(event) {
			var value = event.target.value;
			this.lfo.gain = Math.round(value * 1);
		},
		updateLFOWaveShape(wave) {
			this.lfo.wave = wave;
			this.lfo.vco.type = this.lfo.wave;
		},
	},
	mounted: function() {
		this.setLFOData();
		this.setData();
	}
}
</script>

<style scoped>
</style>

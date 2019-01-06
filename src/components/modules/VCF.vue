<template>
	<div v-if="loaded">
		<div class="module">
			<div class="module-left">
				<div class="module-title">
					VCF
				</div>
				<div class="module-controls">
					<img src="../../assets/lowpass.png" alt="low pass filter" class="wave" v-bind:class="{'selectedWave': type === 'lowpass'}" v-on:click="updateFilterType('lowpass')">
					<img src="../../assets/highpass.png" alt="high pass filter" class="wave" v-bind:class="{'selectedWave': type === 'highpass'}" v-on:click="updateFilterType('highpass')">
				</div>
				<div class="module-controls">
					<div>
						<div class="label">FREQ</div>{{ frequency }}
					</div>
					<input type="range" min="0" max="10000" step="1" v-model="vcf.frequency.value" v-on:input="updateFrequency($event)" />
				</div>
				<div class="module-controls">
					<div>
						<div class="label">RESO</div>{{ resonance }}
					</div>
					<input type="range" min="0" max="100" step="1" v-model="vcf.Q.value" v-on:input="updateResonance($event)" />
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
						<div class="label">FREQ</div>{{ lfo.frequency }}
					</div>
					<input type="range" min="0" max="100" step="0.01" v-model="lfo.vco.frequency.value" v-on:input="updateLFOFrequency($event)" />
				</div>
				<div class="module-controls">
					<div>
						<div class="label">GAIN</div>{{ lfo.gain }}
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
	name: 'VCF',
	data: function() {
		return {
			loaded: false,
			frequency: 100,
			resonance: 0,
			type: 'lowpass',
			vcf: null,
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
			this.vcf = this.$parent.vcf;
			this.vcf.frequency.value = 10000;
			this.vcf.Q.value = this.resonance;
			this.vcf.type = this.type;
			this.loaded = true;
		},
		updateFrequency(event) {
			var value = event.target.value;
			this.frequency = Math.round(value / 100);
		},
		updateResonance(event) {
			var value = event.target.value;
			this.resonance = value;
		},
		updateFilterType(type) {
			this.type = type;
			this.vcf.type = this.type
		},

		// lfo functions:
		setLFOData()  {
			this.lfo.vco = this.$parent.lfos.vcf;
			this.lfo.vca = this.$parent.lfos.vcfGain;
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

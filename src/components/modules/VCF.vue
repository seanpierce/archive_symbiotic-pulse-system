<template>
	<div v-if="loaded">
		<div class="module">
			<div class="module-left">
				<div class="module-title">
					VCF
				</div>
				<div class="module-controls">
					<input type="radio" name="filterType" value="lowpass" v-model="type" v-on:change="updateFilterType()"> Lowpass
					<input type="radio" name="filterType" value="highpass" v-model="type" v-on:change="updateFilterType()"> Highpass
				</div>
				<div class="module-controls">
					<div>
						{{ frequency }}
					</div>
					<input type="range" min="0" max="10000" step="1" v-model="vcf.frequency.value" v-on:input="updateFrequency($event)" />
				</div>
				<div class="module-controls">
					<div>
						{{ resonance }}
					</div>
					<input type="range" min="0" max="100" step="1" v-model="vcf.Q.value" v-on:input="updateResonance($event)" />
				</div>
			</div>
			<div class="module-right">
				<div class="module-title">
					LFO
				</div>
				<div class="module-controls">
					<input type="radio" name="lfo-vcf-waveshape" value="sine" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Sine
					<input type="radio" name="lfo-vcf-waveshape" value="square" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Square
					<input type="radio" name="lfo-vcf-waveshape" value="sawtooth" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Saw
				</div>
				<div class="module-controls">
					<div>
						{{ lfo.frequency }}
					</div>
					<input type="range" min="0" max="100" step="0.01" v-model="lfo.vco.frequency.value" v-on:input="updateLFOFrequency($event)" />
				</div>
				<div class="module-controls">
					<div>
						{{ lfo.gain }}
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
		updateFilterType() {
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
		updateLFOWaveShape() {
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

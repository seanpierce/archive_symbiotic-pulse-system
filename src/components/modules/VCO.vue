<template>
	<div v-if="loaded">
		<div class="module" :style="$parent.moduleStyle">
			<div class="module-left">
				<div class="module-title">
					VCO
				</div>
				<div class="module-controls">
					<input type="radio" :name="'waveshape-' + $parent.number" value="sine" v-model="wave" v-on:change="updateWaveShape()"> Sine
					<input type="radio" :name="'waveshape-' + $parent.number" value="square" v-model="wave" v-on:change="updateWaveShape()"> Square
					<input type="radio" :name="'waveshape-' + $parent.number" value="sawtooth" v-model="wave" v-on:change="updateWaveShape()"> Saw
				</div>
				<div class="module-controls">
					<div>
						{{ frequency }}
					</div>
					<input type="range" min="0" max="1760" step="1" v-model="vco.frequency.value" v-on:input="updateFrequency($event)" />
				</div>
			</div>
			<div class="module-right">
				<div class="module-title">
					LFO
				</div>
				<div class="module-controls">
					<input type="radio" :name="'lfo-vco-waveshape-' + $parent.number" value="sine" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Sine
					<input type="radio" :name="'lfo-vco-waveshape-' + $parent.number" value="square" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Square
					<input type="radio" :name="'lfo-vco-waveshape-' + $parent.number" value="sawtooth" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Saw
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
		updateWaveShape() {
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

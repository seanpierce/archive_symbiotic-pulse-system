<template>
	<div v-if="loaded">
		<div class="module">
			<div class="module-left">
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
			<div class="module-right">
				<div class="module-title">
					LFO
				</div>
				<div class="module-controls">
					<input type="radio" name="lfo-vca-waveshape" value="sine" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Sine
					<input type="radio" name="lfo-vca-waveshape" value="square" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Square
					<input type="radio" name="lfo0-vca-waveshape" value="sawtooth" v-model="lfo.wave" v-on:change="updateLFOWaveShape()"> Saw
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
					<input type="range" min="0" max="1" step="0.01" v-model="lfo.vca.gain.value" v-on:input="updateLFOGain($event)" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */ 
export default {
	name: 'VCA',
	data: function() {
		return {
			loaded: false,
			gain: 100,
			vca: null,
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
			this.vca = this.$parent.vca
			this.vca.gain.value = 1;
			this.loaded = true
		},
		updateGain(event) {
			var value = event.target.value;
			this.gain = Math.round(value * 100)
		},
		setLFOData()  {
			this.lfo.vco = this.$parent.lfos.vca;
			this.lfo.vca = this.$parent.lfos.vcaGain;
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
			this.lfo.gain = Math.round(value * 100);
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

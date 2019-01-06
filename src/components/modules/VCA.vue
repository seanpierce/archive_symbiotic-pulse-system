<template>
	<div v-if="loaded">
		<div class="module">
			<div class="module-left">
				<div class="module-title">
					VCA
				</div>
				<div class="module-controls">
					<img src="../../assets/mute.png" alt="mute voice" class="wave" v-bind:class="{'selectedWave': mute === true}" v-on:click="toggleMute()">
				</div>
				<div class="module-controls">
					<div>
						<div class="label">GAIN</div>{{ gain }}
					</div>
					<input type="range" min="0" max="1" step="0.01" v-model="vca.gain.value" v-on:input="updateGain($event)" />
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
			},
			mute: false,
			lastGainValue: null
		}
	},
	methods: {
		setData()  {
			this.vca = this.$parent.vca
			this.vca.gain.value = 1;
			this.lastGainValue = 1;
			this.loaded = true
		},
		updateGain(event) {
			this.mute = false;
			var value = event.target.value;
			this.gain = Math.round(value * 100)
			this.lastGainValue = value;
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
		updateLFOWaveShape(wave) {
			this.lfo.wave = wave;
			this.lfo.vco.type = this.lfo.wave;
		},
		toggleMute() {
			if (this.mute) {
				this.mute = false;
				console.log(this.vca.gain.value)
				console.log(this.lastGainValue)
				this.vca.gain.value = parseFloat(this.lastGainValue);
			} else {
				this.mute = true;
				this.vca.gain.value = 0;
			}
		}
	},
	mounted: function() {
		this.setLFOData();
		this.setData();
	}
}
</script>

<style scoped>

</style>

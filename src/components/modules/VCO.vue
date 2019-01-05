<template>
	<div v-if="loaded">
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
				<input type="range" min="0" max="1760" step="1" v-model="vco.frequency.value" v-on:input="updateFrequency($event)" />
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
			vco: null
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
	},
	mounted: function() {
		this.setData()
	}
}
</script>

<style scoped>

</style>

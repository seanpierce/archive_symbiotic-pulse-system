<template>
	<div class="voice" v-if="vco">
		<VCO />
		<VCA />
	</div>
</template>

<script>
/* eslint-disable */ 
import VCO from './VCO.vue';
import VCA from './VCA.vue';

export default {
	name: 'Voice',
	components: {
		VCO,
		VCA
	},
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
	},
	mounted: function() {
		this.createVCO();
	}
}
</script>

<style scoped>

</style>

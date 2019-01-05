<template>
	<div class="voice" v-if="vco">
		<VCO />
		<VCF />
		<VCA />
		<LFOVCO />
	</div>
</template>

<script>
/* eslint-disable */ 
import VCO from './VCO.vue';
import VCA from './VCA.vue';
import VCF from './VCF.vue';
import LFOVCO from './LFOVCO.vue';

export default {
	name: 'Voice',
	components: {
		VCO,
		VCA,
		VCF,
		LFOVCO
	},
	data: function() {
		return {
			vco: null,
			vcf: null,
			lfos: {
				vco: null,
				vcoGain: null,
				vcf: null,
				vca:  null
			},
			vca: null
		};
	},
	methods: {
		createVCO() {
			var context = this.$parent.context;

			// create vco
			this.vco = context.createOscillator();

			// create vcf
			this.vcf = context.createBiquadFilter();
			
			// create vca
			this.vca = context.createGain();

			// create lfos
			this.lfos.vcoGain = context.createGain();
			this.lfos.vco = context.createOscillator();

			// connect lfos.vco to vco
			this.lfos.vco.connect(this.lfos.vcoGain);
			this.lfos.vcoGain.connect(this.vco.frequency);

			// connect output of vco to input of vcf
			// connect output of vcf into input of vca
			// connect output of vca to destination
			this.vco.connect(this.vcf);
			this.vcf.connect(this.vca);
			this.vca.connect(context.destination);

			// start oscillator and lfos
			this.vco.start();
			this.lfos.vco.start();
		},
	},
	mounted: function() {
		this.createVCO();
	}
}
</script>

<style scoped>

</style>

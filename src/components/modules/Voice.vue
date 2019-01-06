<template>
	<div class="voice" v-if="vco">
		<VCO />
		<VCF />
		<VCA />
		<LFOVCO />
		<LFOVCF />
		<LFOVCA />
	</div>
</template>

<script>
/* eslint-disable */ 
import VCO from './VCO.vue';
import VCA from './VCA.vue';
import VCF from './VCF.vue';
import LFOVCO from './LFOVCO.vue';
import LFOVCF from './LFOVCF.vue';
import LFOVCA from './LFOVCA.vue';

export default {
	name: 'Voice',
	components: {
		VCO,
		VCA,
		VCF,
		LFOVCO,
		LFOVCF,
		LFOVCA
	},
	data: function() {
		return {
			vco: null,
			vcf: null,
			lfos: {
				vco: null,
				vcoGain: null,
				vcf: null,
				vcfGain: null,
				vca:  null,
				vcaGain: null
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
			this.lfos.vcfGain = context.createGain();
			this.lfos.vcf = context.createOscillator();
			this.lfos.vcaGain = context.createGain();
			this.lfos.vca = context.createOscillator();

			// connect lfos.vco to vco
			// connect lfos.vcf to vcf
			this.lfos.vco.connect(this.lfos.vcoGain);
			this.lfos.vcoGain.connect(this.vco.frequency);
			this.lfos.vcf.connect(this.lfos.vcfGain);
			this.lfos.vcfGain.connect(this.vcf.frequency);
			this.lfos.vca.connect(this.lfos.vcaGain);
			this.lfos.vcaGain.connect(this.vca.gain);

			// connect output of vco to input of vcf
			// connect output of vcf into input of vca
			// connect output of vca to destination
			this.vco.connect(this.vcf);
			this.vcf.connect(this.vca);
			this.vca.connect(context.destination);

			// start oscillator and lfos
			this.vco.start();
			this.lfos.vco.start();
			this.lfos.vcf.start();
			this.lfos.vca.start();
		},
	},
	mounted: function() {
		this.createVCO();
	}
}
</script>

<style scoped>

</style>

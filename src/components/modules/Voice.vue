<template>
	<div class="voice" v-if="vco">
		<VCO :note="note" />
		<VCF />
		<VCA />
		<EG :trig="trig" />
	</div>
</template>

<script>
/* eslint-disable */ 
import VCO from './VCO.vue';
import VCA from './VCA.vue';
import VCF from './VCF.vue';
import EG from './EG.vue';

export default {
	name: 'Voice',
	components: {
		VCO,
		VCA,
		VCF,
		EG
	},
	props: [
		'number',
		'note',
		'trig'
	],
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
			vca: null,
			repeaterVca: null,
			repeater: null,
			attack: 0,
			release: 0.1,
			division: null,
		};
	},
	methods: {	
		createVoice() {
			var context = this.$parent.context;
			this.context = context;

			// create vco
			this.vco = context.createOscillator();

			// create vcf
			this.vcf = context.createBiquadFilter();
			
			// create vcas
			this.vca = context.createGain();
			this.repeaterVCA = context.createGain();

			// create lfos
			this.lfos.vcoGain = context.createGain();
			this.lfos.vco = context.createOscillator();
			this.lfos.vcfGain = context.createGain();
			this.lfos.vcf = context.createOscillator();
			this.lfos.vcaGain = context.createGain();
			this.lfos.vca = context.createOscillator();

			// connect lfos.vco to vco
			// connect lfos.vcf to vcf
			// connect lfos.vca to vca
			this.lfos.vco.connect(this.lfos.vcoGain);
			this.lfos.vcoGain.connect(this.vco.frequency);
			this.lfos.vcf.connect(this.lfos.vcfGain);
			this.lfos.vcfGain.connect(this.vcf.frequency);
			this.lfos.vca.connect(this.lfos.vcaGain);
			this.lfos.vcaGain.connect(this.vca.gain);

			// connect output of vco to input of vcf
			// connect output of vcf into input of vca
			// connect output of vca to repeaterVca
			this.vco.connect(this.vcf);
			this.vcf.connect(this.vca);
			this.vca.connect(this.repeaterVCA);
			this.repeaterVCA.connect(context.destination);

			// start lfos
			this.vco.start();
			this.lfos.vco.start();
			this.lfos.vcf.start();
			this.lfos.vca.start();
		},
		trigger() {
			if (this.repeater === null) {
				var releaseGain = 1
			} else {
				releaseGain = 0
			}
			this.repeaterVCA.gain.setTargetAtTime(1, this.context.currentTime, parseFloat(this.attack));
			this.repeaterVCA.gain.setTargetAtTime(releaseGain, this.context.currentTime + parseFloat(this.attack), this.release);
		},
		playStep() {
			this.repeater = setTimeout(() => {
				this.trigger();
				this.playStep();
			}, this.getClock());
		},
		stopRepeater() {
			clearInterval(this.repeater);
			this.repeater = null;
			this.trigger();
		},
		getClock() {
			var clock = this.$root.milliSeconds;
			switch(this.division) {
				case 'eigth':
					clock = clock / 2;
					break;
				case 'sixteenth':
					clock = clock / 4;
					break;
				default: // quarter
					clock = clock;
			}
			return clock;
		},
	},
	computed: {
    },
	mounted: function() {
		this.createVoice();
		this.playStep();
	}
}
</script>

<style scoped>

</style>

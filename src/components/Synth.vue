<template>
  <div class="synth">
	<VCO />
  </div>
</template>

<script>
/* eslint-disable */ 
import VCO from './modules/VCO.vue'

export default {
  name: 'Synth',
  components: {
	VCO
  },
  props: {
  },
  data: function() {
	return {
	  context: new AudioContext(),
	  masterVolume: null,
	}
  },
  methods: {
	setMasterVolume() {
	  this.masterVolume = this.context.createGain();
	  var filter = this.context.createBiquadFilter();

	  this.masterVolume.connect(filter);
	  this.masterVolume.gain.value = 0.5;
	}
  },
  mounted: function() {
	  this.setMasterVolume();
  }
}
</script>

<style scoped>
</style>

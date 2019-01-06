<template>
  <div class="synth">
	<Voice number="1" color="7CC6FE" />
	<Voice number="2" color="FFC09F" />
	<div class="globals">
		<BPM />
	</div>
  </div>
</template>

<script>
/* eslint-disable */ 
import Voice from './modules/Voice.vue'
import BPM from './modules/BPM.vue'

export default {
  name: 'Synth',
  components: {
	Voice,
	BPM
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

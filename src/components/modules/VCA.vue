<template>
	<div v-if="loaded">
		<div class="module">
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
			vca: null
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
	},
	mounted: function() {
		this.setData()
	}
}
</script>

<style scoped>

</style>

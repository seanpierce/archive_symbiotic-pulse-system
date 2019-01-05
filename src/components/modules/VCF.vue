<template>
	<div v-if="loaded">
		<div class="module">
			<div class="module-title">
				VCF
			</div>
			<div class="module-controls">
				<input type="radio" name="filterType" value="lowpass" v-model="type" v-on:change="updateFilterType()"> Lowpass
				<input type="radio" name="filterType" value="highpass" v-model="type" v-on:change="updateFilterType()"> Highpass
			</div>
			<div class="module-controls">
				<div>
					{{ frequency }}
				</div>
				<input type="range" min="0" max="10000" step="1" v-model="vcf.frequency.value" v-on:input="updateFrequency($event)" />
			</div>
			<div class="module-controls">
				<div>
					{{ resonance }}
				</div>
				<input type="range" min="0" max="100" step="1" v-model="vcf.Q.value" v-on:input="updateResonance($event)" />
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */ 
export default {
	name: 'VCF',
	data: function() {
		return {
			loaded: false,
			frequency: 100,
			resonance: 0,
			type: 'lowpass',
			vcf: null
		}
	},
	methods: {
		setData()  {
			this.vcf = this.$parent.vcf;
			this.vcf.frequency.value = 10000;
			this.vcf.Q.value = this.resonance;
			this.vcf.type = this.type;
			this.loaded = true;
		},
		updateFrequency(event) {
			var value = event.target.value;
			this.frequency = Math.round(value / 100);
		},
		updateResonance(event) {
			var value = event.target.value;
			this.resonance = value;
		},
		updateFilterType() {
			this.vcf.type = this.type
		},
	},
	mounted: function() {
		this.setData()
	}
}
</script>

<style scoped>

</style>

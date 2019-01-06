<template>
	<div class="bpm">
		<div class="module">
			<div class="module-title">
				BPM
			</div>
			<div class="module-controls">
				<div>
					{{ $root.bpm }}
				</div>
				<input type="range" min="1" max="420" step="1" v-model="$root.bpm" v-on:input="$root.setTempo($event)">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BPM',
	data: function() {
		return {
		}
	},
	methods: {
	}	
}
</script>

<style scoped>

</style>

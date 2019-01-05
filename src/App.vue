<template>
	<div id="app">
		<div v-if="!startSynthy" v-on:click="startSynthy = true">Start</div>
		<Synth v-if="startSynthy" />
	</div>
</template>

<script>
/* eslint-disable */ 
import Synth from './components/Synth.vue'

export default {
	name: 'app',
	components: {
		Synth
	},
	data: function() {
	return {
			startSynthy: false,
		}
	},
	methods: {
	}
}
</script>

<style>
#app {
	font-family: Arial, sans-serif;
	color: #333;
}
.voice {
	border: solid 1px #333;
	padding: 10px;
	display: inline-block;
	width: auto;
}
.module {
	margin: 1em auto;
	border-bottom: solid 1px lightgray;
}
.module input[type="range"] {
	width: 100%;
	margin: 0;
}
.module-controls {
	margin: 8px auto;
}
</style>
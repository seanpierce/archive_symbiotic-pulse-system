<template>
	<div id="app">
		<div id="title" v-if="!startSynthy">
			<h1>SYMBIOTIC PULSE SYSTEM</h1>
			<div v-on:click="startSynthy = true" id="start">
				START
			</div>
		</div>
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
* {
	box-sizing: border-box;
}
*:focus {
	outline: none;
}
#app {
	font-family: Arial, sans-serif;
	color: #333;
}
#title {
	width: 600px;
	text-align: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
#start {
	display: inline-block;
	width: auto;
	padding: 8px;
	cursor: pointer;
	border: solid 1px #333;
}
.voice, .globals {
	border: solid 3px #333;
	padding: 10px;
	display: inline-block;
	width: 400px;
	margin: 1em;
}
.globals {
	display: block;
}
.globals:last-child .module {
	border-bottom: none;
}
.module {
	margin: 1em auto;
	border-bottom: solid 1px lightgray;
	position: relative;
}
.module img.wave {
	height: 2em;
	margin-right: 8px;
	cursor: pointer;
}
.module-left, .module-right {
	width: 48%;
	display: inline-block;
	vertical-align: top;
	margin-right: 2%;
}
.module-right::after {
	clear: both;
}
.module input[type="range"] {
	width: 100%;
	margin: 8px 0;
}
.module .label {
	color: lightgray;
	font-size:  0.75em;
	vertical-align: top;
}
.module-controls {
	margin: 12px auto;
}
.selectedWave {
	border: solid 1px lightgray;
}
/* slider styles */
input[type="range"] {
	margin-top: 2em;
	margin-bottom: 2em;
	width: 100%;
	-webkit-appearance: none;
	background: transparent;
}
input[type=range]::-webkit-slider-thumb {
	-webkit-appearance: none;
}
input[type=range]::-ms-track {
	width: 100%;
	cursor: pointer;  
	/* Hides the slider so custom styles can be added */
	background: transparent;
	border-color: transparent;
	color: transparent;
}
input[type=range]::-webkit-slider-thumb {
	-webkit-appearance: none;
	border: 2px solid #555;
	height: 25px;
	width: 12px;
	background: #ffffff;
	cursor: pointer;
	margin-top: -10px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
}
/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
	border: 2px solid #555;
	height: 25px;
	width: 12px;
	background: #ffffff;
	cursor: pointer;
}
/* All the same stuff for IE */
input[type=range]::-ms-thumb {
	border: 1px solid #555;
	height: 25px;
	width: 12px;
	background: #ffffff;
	cursor: pointer;
}
/*style the track*/
input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 2px;
	cursor: pointer;
	background: #555;
}
input[type=range]::-moz-range-track {
	width: 100%;
	height: 2px;
	cursor: pointer;
	background: #555;
}
input[type=range]::-ms-track {
	width: 100%;
	height: 2px;
	cursor: pointer;
	background: transparent;
	border-color: transparent;
	color: transparent;
}
input[type=range]::-ms-fill-lower {
	background: #555;
}
  input[type=range]:focus::-ms-fill-lower {
	background: #555;
}
input[type=range]::-ms-fill-upper {
	background: #555;
}
input[type=range]:focus::-ms-fill-upper {
	background:#555;
}
</style>
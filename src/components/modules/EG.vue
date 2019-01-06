<template>
	<div v-if="$parent.vca">
		<div class="module">
			<div class="module-left">
				<div class="module-title">
					ATTACK
				</div>
				<div class="module-controls">
					<div>
						{{ displayAttack }}
					</div>
					<input 
						type="range" 
						min="0" 
						max="1" 
						step="0.01" 
						v-model="attack" 
						v-on:input="updateAttack($event)" />
				</div>
			</div>
			<div class="module-right">
				<div class="module-title">
					RELEASE
				</div>
				<div class="module-controls">
					<div>
						{{ displayRelease }}
					</div>
					<input type="range" min="0" max="2" step="0.01" v-model="release" v-on:input="updateRelease($event)" />
				</div>
			</div>
			<div class="module-title">
				TRIG
			</div>
			<div class="module-controls">
				<span class="option" v-bind:class="{'selectedOption': trigger === 'hold'}" v-on:click="updateTrig('hold')">Hold</span>
				<span class="option" v-bind:class="{'selectedOption': trigger === 'quarter'}" v-on:click="updateTrig('quarter')">1/4</span>
				<span class="option" v-bind:class="{'selectedOption': trigger === 'eigth'}" v-on:click="updateTrig('eigth')">1/8</span>
				<span class="option" v-bind:class="{'selectedOption': trigger === 'sixteenth'}" v-on:click="updateTrig('sixteenth')">1/16</span>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */ 
export default {
	name: 'EG',
	props: [
		'trig'
	],
	data: function() {
		return {
			loaded: false,
			attack: null,
			release: null,
			displayAttack: null,
			displayRelease: null,
			trigger: this.trig,
			colorrr: 'red'
		}
	},
	methods: {
		setData() {
			this.attack = this.$parent.attack;
			this.release = this.$parent.release;
			this.displayAttack = Math.round(this.attack * 10);
			this.displayRelease = Math.round(this.release * 10);
		},
		updateAttack() {
			this.$parent.attack = this.attack;
			this.displayAttack = Math.round(this.attack * 10);
		},
		updateRelease() {
			this.$parent.release = this.release;
			this.displayRelease = Math.round(this.release * 10);
		},
		updateTrig(trigger) {
			this.trigger = trigger;
			if (this.trigger === 'hold')
				this.setHold();
			else 
				this.setDivider()
		},
		setHold() {
			this.$parent.stopRepeater();
		},
		setDivider() {
			this.$parent.division = this.trigger;
			if (this.$parent.repeater === null)
				this.$parent.playStep()
		}
	},
	mounted: function() {
		this.setData();
		this.updateTrig(this.trig);
	},
}
</script>

<style scoped>
.module {
	border: none;
}

span.option {
	padding: 8px;
	cursor: pointer;
}
span.selectedOption {
	border: solid 1px lightgray;
}
</style>

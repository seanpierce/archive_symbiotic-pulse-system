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
					<input type="range" min="0" max="1" step="0.01" v-model="attack" v-on:input="updateAttack($event)" />
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
				<input type="radio" name="trigger" value="hold" v-model="trigger"> Hold
				<input type="radio" name="trigger" value="sixteenth" v-model="trigger"> 1/16
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */ 
export default {
	name: 'EG',
	data: function() {
		return {
			loaded: false,
			attack: null,
			release: null,
			displayAttack: null,
			displayRelease: null,
			trigger: 'hold'
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
		}
	},
	mounted: function() {
		this.setData();
	}
}
</script>

<style scoped>

</style>

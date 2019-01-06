/* eslint-disable */ 
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: function() {
	  return {
		  bpm: 120,
		  milliSeconds: 500
	  }
  },
  methods: {
	setTempo(event) {
		var value = event.target.value;
		this.bpm = value;
		this.milliSeconds = 60000 / this.bpm;
	}
  }
}).$mount('#app')

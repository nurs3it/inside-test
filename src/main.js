import Vue from 'vue'
import App from './App.vue'
import './assets/js/animation'
import './assets/js/script'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

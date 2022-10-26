import "font-awesome/css/font-awesome.css" // Tem que importa essa font-awesome. para que a seta de desce o menu apareça.
import Vue from 'vue'

import App from './App'
import store from './config/store' // Importando de store.js

Vue.config.productionTip = false

new Vue({
  store, // Associando ela para funcionar.
  render: h => h(App)
}).$mount('#app')
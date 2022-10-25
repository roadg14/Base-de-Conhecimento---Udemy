import "font-awesome/css/font-awesome.css" // Tem que importa essa font-awesome. para que a seta de desce o menu apareça.
import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
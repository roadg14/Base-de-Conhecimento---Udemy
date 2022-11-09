import "font-awesome/css/font-awesome.css" // Tem que importa essa font-awesome. para que a seta de desce o menu apareça.
import Vue from 'vue'

import App from './App'

import store from './config/store' // Importando de store.js
import router from './config/router' // Importando route.js as rotas. 
import './config/bootstrap' // Importando o Bootstrap.js

Vue.config.productionTip = false

// TEMPORARIO!
require('axios').defaults.headers.common['Autorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwibmFtZSI6IkRvdWdsYXMgRmVycmVpcmEiLCJlbWFpbCI6ImRvdWdsYXMxMjJAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY2ODAwMzI4MiwiZXhwIjoxNjY4MjYyNDgyfQ.POMDJNem_ygmw1tjfZyUZpChKds5r7Ym-_AuBe7Gqg8'

new Vue({
  store, // Associando ela para funcionar. // store pode ser compartilhada entre componentes
  router, // Colocando a rotas para funcionar. // router pode ser compartilhada entre componentes
  render: h => h(App)
}).$mount('#app')
import "font-awesome/css/font-awesome.css" // Tem que importa essa font-awesome. para que a seta de desce o menu apareça.
import Vue from 'vue'

import App from './App'
import store from './config/store' // Importando de store.js
import router from './config/router' // Importando route.js as rotas. 
import './config/bootstrap' // Importando o Bootstrap.js

Vue.config.productionTip = false

// TEMPORARIO!
require('axios').defaults.headers.common['Autorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwibmFtZSI6IkRvdWdsYXMgUm9kcmlndWVzIiwiZW1haWwiOiJkb3VnbGFzZ2MxM0BnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY2NzkyMjg2NiwiZXhwIjoxNjY4MTgyMDY2fQ.b0ztga5P_jgvyl24RTE4TRRBHyC827aIDjMmS3kctJc'

new Vue({
  store, // Associando ela para funcionar.
  router, // Colocando a rotas para funcionar.
  render: h => h(App)
}).$mount('#app')
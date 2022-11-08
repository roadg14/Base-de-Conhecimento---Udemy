import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home' //Importando das paginas que terão ligações.
import AdminPages from '../components/admin/AdminPages'

Vue.use(VueRouter) // Cadastrando VueRouter dentro de Vue.

const routes = [{ // Array de objetos // A base das Routes.
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages', // Rotas
    path: '/admin',
    component: AdminPages
}]

export default new VueRouter({ // Instanciando VueRouter 
    mode: 'history', // Modo history para deixa a url bonitinha.
    routes // === routes: routes -> array de objetos
})

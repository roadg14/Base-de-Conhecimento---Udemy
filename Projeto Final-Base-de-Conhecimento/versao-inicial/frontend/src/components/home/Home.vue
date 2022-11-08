<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento" />
        <div class="stats"> <!-- Isso aqui esta ligando ao Stat.vue -->
            <Stat title="Categorias" :value="stat.categories"
                icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.articles"
                icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>

import PageTitle from '../template/PageTitle'; // importando da pasta template e pegando o arquivo PageTitle.vue
import Stat from './Stat' // Importando o stat.js
import axios from 'axios' // Importando o Axios para fazer a Requisição para o Backend.
import { baseApiUrl } from '@/global' //


export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function() { // Estado interno. // é para obter as requisições do backend.
        return {
            stat: {}
        }
    },
    methods: { // Metodos para ir ao backend.
        getStats() { // Requisição para BackEnd.
            // Pegando dados de url/stats e injetando em stats.
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats() // Seta resultado dentro de stat quando monta component
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
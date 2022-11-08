<template>
    <div class="user-admin">
        <h1>Usuários Componente</h1>
    </div>
</template>

<script>

import { baseApiUrl } from "@/global";
import axios from "axios";


export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: "save", // Put, Post ou Delete
            user: {},
            users: [], // Será renderizado na tabela 
        }
    },
    methods: {
        loadUsers() { // Para carregar a lista de usuarios do backend.
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
                console.log(this.users)
            })
        }
    },
    mounted() {
        // Quando componente for carregado
        this.loadUsers()
    }
}
</script>

<style>

</style>
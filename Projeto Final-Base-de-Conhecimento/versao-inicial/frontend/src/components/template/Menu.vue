<template>
    <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
// Importando uma Função que vai ser responsavel por mapea um atributo da store dentro do component.
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>
<template>
    <aside class="menu" v-show="isMenuVisible"></aside> <!-- V-show -> Está ligado na função computerd. -->
</template>

<script>
// Importando uma Função que vai ser responsavel por mapea um atributo da store dentro do component.
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible']) // Essa função que vai fazer sumir o Menu. Esta em Header.vue e Store.js que faz com que ele suma.
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #000000, #252525);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>
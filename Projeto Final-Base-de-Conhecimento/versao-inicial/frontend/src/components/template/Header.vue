<template>
    <header class="header">
        <a class="toggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            {{ title }}
        </h1>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
        hideToggle: Boolean, // Vai ser um Botão que vai aparecer certos menus.
    },
    computed: {
        icon() {
            return "fa-angle-left"
        }
    },
    methods: {
        toggleMenu() { // Aqui da a função para o icone do menuzinho abrir.
            
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #ce501e, #db0f0f);
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1; /* title pode crescer dentro do flex container */
        text-align: center;
    }

</style>
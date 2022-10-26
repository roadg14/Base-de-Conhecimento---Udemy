<template>
	<div id="app">
		<Header title="Douglas - Projeto Base de Conhecimento" :hideToggle="false" /> <!-- Para aceitar esse hidetoggle precisa coloca os dois pontos -> : para intepretar. -->
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
	// Importando todos os arquivos que estão na pasta template.
	import Header from "./components/template/Header" // . É para se referencia o src que é uma pasta.
	import Menu from "./components/template/Menu"
	import Content from "./components/template/Content"
	import Footer from "./components/template/Footer"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer } // Declando os componentes que serão usados.
}
</script>

<style>
	* { 
		font-family: "Lato", sans-serif; /* font referenciada em public/index.html */
	}

	body {
		margin: 0; /* Retirando toda a margin do SiteQ*/
	}

	#app { 
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale; /* suaviza a font na hora de renderizar aplicação */

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 250px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"meno footer";
	}
</style>
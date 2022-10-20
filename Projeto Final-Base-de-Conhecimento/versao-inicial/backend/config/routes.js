// Routes.js é onde vai ser minhas rotas.
module.exports = app => {
    app.route('/users') // Consign acessa função de outro arquivo em outro pasta
    .post(app.api.user.save) // Assim que se usar para acessar o arquivo de outra pasta Usando o 'Consign'.
    .get(app.api.user.get) // O Metodo Get que está em user.js

    app.route('/users/:id') // Outra URL com ja selecionado o ID já para alterar. -> /:id ai que vai saber quem vai ser inserido ou alterado.
    .put(app.api.user.save) // O mesmo metodo vai ser usado para inserir ou alterar.
    .get(app.api.user.getUserById) // Para Selecionar um usuario pelo ID.

    app.route('/categories')
    .get(app.api.category.get) // o get é para buscar.
    .post(app.api.category.save) // o Post é o metodo que vai salvar.

    // Cuidado com a ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree') // A arvore qie ordena a lista de categorias.
    .get(app.api.category.getTree) // Paginação da ARVORE.

    app.route('/categories/:id') // Essas funções estão em Category.js
    .get(app.api.category.getById) // Pesquisa.
    .put(app.api.category.save) // Fazendo a alteração.
    .delete(app.api.category.remove) // Excluir.

    app.route('/articles') // Funções que estão em articles.js
    .get(app.api.article.get) // Resultado.
    .post(app.api.article.save) // Criando e Salvando.

    app.route('/articles/:id')
    .get(app.api.article.getById) // Pesquisa.
    .put(app.api.article.save) // Fazendo a alteração.
    .delete(app.api.article.remove) // Excluir.
}
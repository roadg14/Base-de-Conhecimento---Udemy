// Routes.js é onde vai ser minhas rotas.
module.exports = app => {
    app.route('/users') // Consign acessa função de outro arquivo em outro pasta
    .post(app.api.user.save) // Assim que se usar para acessar o arquivo de outra pasta Usando o 'Consign'.
    .get(app.api.user.get) // O Metodo Get que está em user.js

    app.route('/users/:id') // Outra URL com ja selecionado o ID já para alterar. -> /:id ai que vai saber quem vai ser inserido ou alterado.
    .put(app.api.user.save) // O mesmo metodo vai ser usado para inserir ou alterar.
    .get(app.api.user.getUserById) // Para Selecionar um usuario pelo ID.
}
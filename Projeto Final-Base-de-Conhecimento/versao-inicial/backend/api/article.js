const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation // Acessando as Funções que estão no Validation.js.

    // Função para a validação.
    const save = (req, res) => { // Uma 
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id // Recebe id da requisição

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada') // Erro caso não Encontre a descrição
            existsOrError(article.categoryId, 'Categoria não informada') // Se existi o ID da categoria
            existsOrError(article.userId, 'Autor não informado') // Sabe se tem o autor
            existsOrError(article.content, 'Conteúdo não informado') // se não houver o conteudo.
        } catch(msg) {
            res.status(400).send(msg) // Esse erro é do lado do cliente.
        }

        if(article.id) { // Para fazer a alteração no artigo.
            app.db('articles')
                .update(article) //
                .where({ id: article.id }) // 
                .then(_ => res.status(204).send()) // A resposta
                .catch(err => res.status(500).send(err)) // Problema de pesistencia.
        } else {
            app.db('articles') // Para fazer um Inclusão inserir um artigo.
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Função para Remover o artigo.
    // Fazer algumas validações para saber se vai poder excluir ou não.
    const remove = async (req, res) => {
        try { // Para exluir o ID tem que está selecionado.
            const rowsDeleted = await app.db('articles') // A função de deletar a artigo.
                .where({ id: req.params.id }).del() // Já selecionado o ID para excluir.
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.') // Retornando um erro caso não exista a Artigo. 
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    // Função que vai limitar as paginação // No máximo 10 registros por paginação
    const limit = 10
    const get = async (req, res) => {
        const page = req.query.page || 1
        // Essa função vai definir que a primeira pagina a aparecer sempre vai ser o Exibido.

        const result = await app.db('articles').count('id').first() // Count -> é para saber quantos registros tem no servidor.
        const count = parseInt(result.count)// Pegar numero de artigos para definir quantidade de páginas.

        app.db('articles')
            .select('id', 'name', 'description') // Select vai pega o id, nome e descrição, posso tambem ver o conteudo e autor.
            .limit(limit).offset(page * limit - limit) // Começa offset no 0, depois 10, 20, 30... | A partir de onde começa registro para 10 artigos
            .then(articles => res.json({ data: articles, count, limit })) // Frontend terá dados para renderizar paginador
            .catch(err => res.status(500).send(err))
    }

    // Função de selecionar e mostrar.
    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => { // Converte de binário para string
                article.content = article.content.toString() // Converte de binario para string.
                return res.json(article)
            })
            .catch(err => res.status(500).send(err)) // Pega todos id's que pertencem à categoria informado e seus filhos
    }

    // Função que pega os ID das categorias.
    const getByCategory = async(req, res) => {
        const categoryId = req.params.id  // Buscando as categorias ID Pai

        const page = req.query.page || 1 // Caso não obter retorno assume página 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)

        const ids = categories.rows.map(c => c.id) // Aqui vai gerar uma Array de ID's e os ID'S das Filhos.

        // Consulta em Knex.
        app.db({ a: 'articles', u: 'users' }) // Fazendo uma consultar tanto no article, tanto no users.
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' }) // Selecionando id,name,descrição,imagen. e Fazendo que o Author seja o nome.
            .limit(limit).offset(page * limit -limit) //
            .whereRaw('?? = ??', ['u.id', 'a.userId']) // Igualando tabelas // Tambem encontra o autor do artigo.
            .whereIn('categoryId', ids) // Dentro dos parâmetros estabelecidos 
            .orderBy('a.id', 'desc')  // Uma ordenação. Deicando por ordem.
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))

    }

    return { save, remove, get, getById, getByCategory }

}
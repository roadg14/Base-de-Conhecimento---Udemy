module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation // Importando as validações de validation.js.

    const save = (req, res) => { // Salvar e alterar categoria
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }
        if(req.params.id) category.id = req.params.id // Fazer alteração caso ID esteja informado na URL e já exista no BD
    
        try {
            existsOrError(category.name, 'Nome não informado') // Retorna o erro caso o nome não seja informado.
        } catch(msg) {
            return res.status(400).send(msg) // Quando cair aqui ele vai voltar.
        }

        // Se já estiver
        if(category.id) { // Se id da URL já estiver registrado no BD | ID setado
            app.db('categories')
                .update(category) // Passando a categoria que será atualizada somente a categoria selecionada.
                .where({ id: category.id }) // Selecionando id que vai ser alterado.
                .then(_ => res.status(204).send()) // Se der tudo certo vai chamar esse status.
                .catch(err => res.status(500).send(err)) // Em caso de erro vai se chamar o catch.
        } else { // Se id da URL naõ estiver registrado no BD
            app.db('categories')
                .insert(category) // Vai voltar para inserir a categoria.
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Não é possível excluir categoria caso a mesma possua dados vinculados.
    // Fazer algumas validações para saber se vai poder excluir ou não.
    const remove = async (req, res) => {
        try { // Para exluir o ID tem que está selecionado.
            existsOrError(req.params.id, 'Código da Categoria não informado.')
        
            // Função para saber se tem subcategorias.
            const subcategory = await app.db('categories') // Consulta no DB // Uma validação para saber se tem subcategorias vinculados.
                .where({ parentId: req.params.id }) // Se houver parentID não vai poder excluir.
            notExistsOrError(subcategory, 'Categoria possui subcategorias.') // Se existe retorna erro
            // Não é para existir subcategorias se existir vai da um erro, se não vai esta tudo OK!

            // Função para saber se tem artigos vinculados.
            const articles = await app.db('articles') // Saber se tem artigos associados.
                .where({ categoryId: req.params.id }) // Se houver algum artigo vinculado vai gerar um erro!
            notExistsOrError(articles, 'Categoria possui artigos.') // Vai da esse erro.

            // A função de deletar a categoria.
            const rowsDeleted = await app.db('categories') // Tentando Exluir.
                .where({ id: req.params.id }).del() // Já selecionado o ID para excluir.
            existsOrError(rowsDeleted,'Categoria não foi encontrada.') // Retornando um erro caso não exista a Categoria.

            res.status(204).send() // Se não ouver nenhum erro passa direto.
        } catch(msg) {
            res.status(400).send(msg) // E AQUI CASO CAIA EM UMAS dessas funções de erro.
        }
    }

    // Função que vai receber uma lista de categorias. e vai retorna com mais um atributo path.
    // Vai receber uma categoria e vai mandar novamente com a categoria já adicionada.
    const withPath = categories => { // Estruturando path: catPai > catFilho > catNeto...
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null // -> caso não encontre parent
        }

        // Função que vai transforma uma array de catogorias. em uma outra array de categoria que vai ter um atributo a mais que é path.
        const categoriesWithPath = categories.map(category => { 
            let path = category.name // Path iniciado com nome da categoria
            let parent = getParent(categories, category.parentId) // Procurar parent da categoria

            while(parent) { // Enquanto existir parent continua procurando // Se caso não for encontrado já PARA DE PROCURAR.
                path = `${parent.name} > ${path}` // Concatenando.
                parent = getParent(categories, parent.parentId) // Monta caminho completo
            }

            return { ...category, path } //Retornando.
        })

        // Uma função de Ordenação alfabetiaca. 
        // Tente fazer uma ordenação com os ID
        categoriesWithPath.sort((a, b) => { // Definindo ordenamento
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    // Criando a função get para voltar as categorias.
    const get = (req, res) => {
        app.db('categories') // NESSE CASO EU NÃO QUERO FILTRAR, E SIM TRAZER TODAS AS CATEGORIAS. ISSO VAI SER O SUFICIENTE PARA FAER UM SELECT.
            .then(categories => res.json(withPath(categories))) // Pegando as categorias funto com os path.
            .catch(err => res.status(500).send(err)) // Se der algum problema vai retorna o erro 500.
    }
    
    // Chamando o Get. 
    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    // Função de Arvore das getegorias. 
    const toTree = (categories, tree) => {
        // Se árvore não estiver setada, gerar inicial a partir de categorias sem parent
        if(!tree) tree = categories.filter(c => !c.parentId) // Vai montar a arvore com os primeiros da categorias.
        tree = tree.map(parentNode => { // Encontrar filhos de nó pai
            const isChild = node => node.parentId == parentNode.id // Se true filho direto
            parentNode.children = toTree(categories, categories.filter(isChild)) // Passando filhos diretos para nó pai
            return parentNode // De forma recursiva
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getTree }
}

const bcrypt = require('bcrypt-nodejs') // Encriptografa a senha do usuário

module.exports = app => { // app -> instância do express.
    // As funções de validation.
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation // instância expressa / pasta / arquivo
    
    // O Responsavel para cryptografa a senha.
    // Função para Criptografa a senha.
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10) // Hash diferente para cada geração
        return bcrypt.hashSync(password, salt) // Vai gerar o Hash da senha, 
    }

    const save = async (req, res) => { // Essa Função vai servi tanto para Inserir ou atualizar o usuário.
        const user = { ...req.body } // Clonando body
        if(req.params.id) user.id = req.params.id // Fazer alteração caso ID esteja informado na URL e já exista no BD.

        // Garantindo para que usuário não seja cadastrado a partir de signup
        // Apenas admin pode cadastrar outro admin
        if(!req.originalUrl.startsWith('/users')) user.admin = false //
        if(!req.user || !req.user.admin) user.admin = false // 

        try { // Se não exitir | value, mgs // Essas são as mensagens que vão aparecer na Validação.
            existsOrError(user.name, 'Nome não informado') // Quando o nome não for informado.
            existsOrError(user.email, 'E-mail não informado') // Quando o email não for informado.
            existsOrError(user.password, 'Senha não informada') // Quando a senha não for informada.
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida') // Confirmação da Senha! em caso de erro!
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem') // Confirmando se a senha e a confirmação de senha são iguais!
        
            const userFromDB = await app.db('users') // Acessando Knex Para saber se o usuario já existe no banco de dados DB.
                .where({ email: user.email }).first() // Caso exista usuário com o e-mail informado
            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado') // Se não existir email no BD ok, se existir gera erro!
            }
        }catch(msg) { // Try retorna erros para catch
            return res.status(400).send(msg) // Retorna a mensagem status vai dizer e é erro so usuario ou e p send vai mostra onde foi o erro.
        }

        // Criptografando a senha!
        user.password = encryptPassword(req.body.password) // Criptografando senha
        delete user.confirmPassword // Deletando confirmação de senha para não enviar ao BD

        // Esse é o metodo para INSERIR um usuario no banco de dados, e ate mesmo alterar.
        if(user.id) { // Caso ID já exista, altera o usuário mesmo no BD
            app.db('users')
                .update(user) // Fazer update no banco de dados.
                .where({ id: user.id }) // Se der tudo certo, ele vai chamar o .then com status.
                .whereNull('deletedAt') // Esse campo tem que está null para que o usuario não seja excluido. Vai continuar no Banco de Dados.
                .then(_ => res.status(204).send()) // Se ocorrer com sucesso.
                .catch(err => res.status(500).send(err)) // Se cair no catch siginifica que ocorreu um erro no lado do servidor
        }else { // Caso ID não exista, insere usuário no BD
            app.db('users') 
                .insert(user)
                .then(_ = res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    // Essa função get é responsavel para pega todos os usuarios no Banco.
    const get = (req, res) => { // Pega todos usuários do BD
        app.db('users') 
            .select('id', 'name', 'email', 'admin') // Os Usuarios Selecionados.
            .whereNull('deletedAt') // Esse campo tem que está null para que o usuario não seja excluido. Vai continuar no Banco de Dados.
            .then(users => res.json(users)) // Ao receber usuários retorna como json
            .catch(err => res.status(500).send(err)) // O Err de Banco.
    }

    const getUserById = (req, res) => { // Pega todos usuários do BD
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt') // Esse campo tem que está null para que o usuario não seja excluido. Vai continuar no Banco de Dados.
            .first() // Pegando um unico resultado, não a lista
            .then(user => res.json(user)) // Ao receber usuários retorna como json
            .catch(err => res.status(500).send(err))
    }

    // Função que vai remover o usuario.
    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id }) // filtrando e Pegando o Id do usuarios.
            notExistsOrError(articles, 'Usuário possui artigos vinculados.') // Erro
            
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() }) // Dando um update.
                .where({ id: req.params.id  })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.') // Caso o usuario não sejá encontrado.

            res.status(204).send() // Caso passou.
        } catch(msg) {
            res.status(400).send(msg) // Mensagem de erro.
        }
    }
    
 
    return { save, get, getUserById, remove }
}
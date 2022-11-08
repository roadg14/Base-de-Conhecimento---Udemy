const { authSecret } = require('../.env') // Importando o .env para autenticação.
const jwt = require('jwt-simple') // Gerador de token
const bcrypt = require('bcrypt-nodejs') // Compara senha do BD com informado no login.

module.exports = app => {
    // signin é para comparar se são iguais a senha.
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) { // Validando email e senha.
            return res.status(400).send('Informe usuário e senha') // Mensagem caso Não informe o usuario ou senha.
        }

        const user = await app.db('users') // Pega usuário com o email informado
            .where({ email: req.body.email }) // selecionado o email.
            .first() // Pegando um unico usuario com o First.

        if(!user) return res.status(400).send('Usuário não encontrado!') // Mensagem de erro caso o usuairio não exista.

        // Função para saber se a senhas são iguais.
        const isMatch = bcrypt.compareSync(req.body.password, user.password) // Compara senha recebida com senha do usuário.
        if(!isMatch) return res.status(401).send('Email ou Senha inválido(s)') // Se não for igual, vai mostrar a mensagem de erro.
    
        // Função para Gerar o tempo para um novo token tanto por horas tanto por minutos.
        const now = Math.floor(Date.now() / 1000) // Pegando o valor em Segundos.

        // Função para gerar o token.
        const payload = { // Pegando o conteudo para o token. // Essa função esta ligada com o .config/passport.js
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, // Emitido em // Data quem foi gerado o token.
            exp: now + (60 * 60 * 24 * 3) // Data de expiração. // Um token que vale 3 dias.
            // Quando o token exprirar o site vai fazer com que ele faça login novamente.
        }

        res.json({ // mandando a resposta.
            ...payload, // Aqui vai gerar o token.
            token: jwt.encode(payload, authSecret) //
        })
    }

    // Função de Validação do token.
    const validateToken = async (req, res) => {
        const userData = req.body || null // 
        try {
            if(userData) { 
                const token = jwt.decode(userData.token, authSecret) // Fazendo a decodificação do token.
                if(new Date(token.exp * 1000) > new Date()) { // Se o tempo do token for maior que a data atual então vai estar Valido.
                    return res.send(true) // Ainda está válido
                }
            }
        } catch(e) { // Vai ignorar o catch.
            // Problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}
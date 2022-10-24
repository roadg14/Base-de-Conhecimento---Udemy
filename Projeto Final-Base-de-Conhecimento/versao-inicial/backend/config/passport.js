// Importações necessarias.

const { authSecret } = require('../.env') // Vai precisar ler o token.
const passport = require('passport') // Passport que serve para validação.
const passportJwt = require('passport-jwt') // 
const { Strategy, ExtractJwt } = passportJwt

//Função para decodificar o token.
module.exports = app => {
    const params = {
        secretOrKey: authSecret, // Pegando o token para codificar.
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // Extração de token.
    }

    //
    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id }) // Achando pelo ID
            .first() // Pegando um unico usuario
            .then(user => done(null, user ? { ...payload } : false)) //
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return { // PRecisa passar pelo authenticate
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}
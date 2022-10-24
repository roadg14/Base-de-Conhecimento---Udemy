module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.admin) { //Se o usuario é um administrador chame o middleware.// Middleware será chamado caso user seja admin
            middleware(req, res, next) 
        } else { // Se não for recebera esse erro de não administrador.
            res.status(401).send('Usuário não é administrador.')
        }
    }
}
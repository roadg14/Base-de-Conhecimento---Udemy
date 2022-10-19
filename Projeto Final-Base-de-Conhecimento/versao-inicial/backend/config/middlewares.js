const bodyParser = require('body-parser') // Interpreta o body da requisição
const cors = require('cors') // Cors permite uma outra aplicação acessar a API deste backend | backend > frontend

// Consign auxilia a definir dependências da aplicação
// Consign ele ajudar na hora de definir muito na dependencias de arquivos.
module.exports = app => { // Esse ap é = ao express no index.js
    app.use(bodyParser.json())
    app.use(cors())
}
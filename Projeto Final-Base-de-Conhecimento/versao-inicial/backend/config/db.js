const config = require('../knexfile.js') // Criado a partir de npx knex init.
const knex = require('knex')(config) // Os resultados ja vão ser o armazenados no knex.

knex.migrate.latest([config]) // Executa a migração quando carregar backend - migrations executando.
module.exports = knex // Para acessar knex em index.js
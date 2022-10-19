// Criado a partir de knex migrate:make create_table_articles.

exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary() // Chave primaria.
        table.string('name').notNull() // Não Nulo
        table.string('description', 1000).notNull() // Vai dizer o tamanho da descrição. que é 1000 caracteris.
        table.string('imageUrl', 1000) // 
        table.binary('content').notNull() // Vai criar um campo binario no banco de dados.
        table.integer('userId').references('id') // Auto referenciamento.
            .inTable('users').notNull()
        table.integer('categoryId').references('id') // Auto referenciamento.
            .inTable('categories').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};

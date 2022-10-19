// Criado a partir de knex migrate:make create_table_categories.

exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', table => { // Criando a tabela.
        table.increments('id').primary() // Chave primaria.
        table.string('name').notNull()
        table.integer('parentId').references('id') // Auto referenciamento // Aqui vai ter uma categoria que se relaciona com outra tabela.
            .inTable('categories') // Auto referenciamento.
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories') // o up sempre vai chamar uma nova tabela atualizada 
    // Já o down vai exluir a antigar. vai dropar. 
};

// Adicionando coluna em users
exports.up = function (knex) { // Função vai ser o metodo up vai ser alterar tabela cirando uma coluna
    return knex.schema.alterTable('users', table => { 
        table.timestamp('deletedAt') // Coluna que contém data
    })
};

exports.down = function (knex) { // Função down vai ser alterar a tebela e excluindo a coluna
    return knex.schema.alterTable('users', table => {
        table.dropColumn('deletedAt')
    })
};
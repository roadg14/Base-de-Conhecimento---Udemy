// Criado a partir de knex migrate:make create_table_users
// Migrations -> controla a evolução do banco dados.

exports.up = function(knex, Promise) { //
    return knex.schema.createTable('users', table => { // Criando colunas da tabela users
        table.increments('id').primary() // ID será a chave primaria.
        table.string('name').notNull() 
        table.string('email').notNull().unique() // EMAIL será unique -> unico.
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false) // Para dizer se o usuario é admin ou não.
    })
};

// up -> indo pra novas versões.
// down -> fazendo o contrário do up para facilitar migration.

exports.down = function(knex, Promise) { // Aqui é um modo oposto do metodo up.
    return knex.schema.dropTable('users') // o up sempre vai chamar uma nova tabela atualizada 
    // Já o down vai exluir a antigar. vai dropar. 
};

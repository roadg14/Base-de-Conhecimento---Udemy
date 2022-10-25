const schedule = require('node-schedule') // Importando o schedule.

module.exports = app => { // Executando schedules.
    schedule.scheduleJob('*/1 * * * *', async function () { // Padrão do cromo de 1 e 1 minuto.
        const usersCount = await app.db('users').count('id').first() //  Todas essas função serão executados a casa um minuto.
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stat // Pegando o Modelo lá em stat.js

        // Ultima estatistica
        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } }) // Pegando a ultima estatistica no mongoDB.

        const stat = new Stat({ // Uma nova Estatistica.
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date() // Dada Atual da estatistica.
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users // Se a ultima estatistica não estiver setada ou se for diferente. então o usuario mudou.
        const changeCategories = !lastStat || stat.categories !== lastStat.categories //
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
    
        if(changeUsers || changeCategories || changeArticles) { // Se mudou as tres categorias.
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas!')) // Vai salvar as novas estatisticas e Mostra uma mensagem.
        }

    })

}
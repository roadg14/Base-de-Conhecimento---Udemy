// Estatísticas. Uma Função de agendamento.
module.exports = app => {
    const Stat = app.mongoose.model('Stat', { // Modelos.
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    //
    const get = (req, res) => { // Vai ser a estatistica mais nova.
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } }) // Acessando o Stat e indo buscar no MongoDB 
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}
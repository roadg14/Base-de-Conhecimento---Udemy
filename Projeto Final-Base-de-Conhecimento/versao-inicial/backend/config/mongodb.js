const mongoose = require('mongoose') // Biblioteca objeto documento | Conexão com MongoDB
mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true,  useUnifiedTopology: true })  // Criando Conexão com o MongoDB.
    .catch(e => { // Se ele não conectar vai mostrat uma mensagem.
    const msg = 'ERRO! Não foi possível conectar com o MongoDB!' 
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m') // A cor de backGround para o erro!
})
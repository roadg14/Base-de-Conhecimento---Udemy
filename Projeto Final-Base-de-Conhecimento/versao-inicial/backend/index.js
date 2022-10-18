const app = require('express')() // Instância do express que será utilizada nos demais arquivos

app.listen(3000, () => { // Apontando a porta que estara sendo executado o Backend.
    console.log('Backend executando...!')
})
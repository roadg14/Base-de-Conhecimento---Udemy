const app = require('express')() // Instância do express que será utilizada nos demais arquivos.

app.listen(3000, () => { // A porta de execução de start vai fica no 3000 o localhost:3000.
    console.log('Backend Executando com Sucesso!')
})
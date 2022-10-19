// Validação para saber se o Usuario existe.
// Validação Para saber se a senha estão iguais.

module.exports = app => { // Função se Existir passa, se não exitir vai gerar um Erro.
    function existsOrError(value, msg) { // Se tal nome foi informado
        if(!value) throw msg // Lançando mensagem caso value seja falso
        if(Array.isArray(value) && value.length === 0) throw msg // Caso array retorne vazio 
        if(typeof value === 'string' && !value.trim()) throw msg // Se for string e estiver vazia ou com espaços em branco
    }

    // Se não existir Ok! // se existe vai ter um erro!
    function notExistsOrError(value, msg) { // Para saber se usuário já não está cadastrado
        try {
            existsOrError(value, msg) // Se não resultar em erro lança mensagem
        } catch(msg) { // Se cair aqui ESTA OK! // Caso contrario throw msg ai sim tem um erro!
            return
        }
    
        throw msg
    }

    // Função para saber se é igual. e comparar as senhas!.
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg // Comparar senha e confirmação de senha // Se A for diferente de B -> Mostra a mensagem
    }
    // consign carrega funções
    return { existsOrError, notExistsOrError, equalsOrError }
}
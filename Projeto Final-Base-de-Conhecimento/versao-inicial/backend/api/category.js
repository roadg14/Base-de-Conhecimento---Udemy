module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => { // Salvar e alterar categoria
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
         }
    }
}
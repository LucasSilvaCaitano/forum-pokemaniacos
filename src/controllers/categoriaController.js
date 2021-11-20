var categoriaModel = require("../models/categoriaModel");

function listar(req, res) {
    categoriaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
              
                res.status(200).json(resultado);
            }
        }).catch(function (erro) {
            console.log(erro)
        })
}

module.exports = {
    listar
}
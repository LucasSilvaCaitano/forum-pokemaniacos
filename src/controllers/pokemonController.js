var pokemonModel = require("../models/pokemonModel");

function listarBox(req, res) {
    var idUsuario = req.params.idUsuario;
    pokemonModel.listarBox(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {

                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function inserir(req, res) {
    var nomePokemon = req.body.nome;
    var fotoPokemon = req.body.img;
    var spritePokemon = req.body.sprite;
    var lvl = req.body.level;
    var fkUsuario = req.body.idUsuario;

    pokemonModel.inserir(nomePokemon, fotoPokemon, spritePokemon, lvl, fkUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {

                console.log("sqls", erro.sqlState)

                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );

                if (erro.sqlState == 23000) {
                    res.status(204).json(erro.sqlMessage);
                }

                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarBox,
    inserir
}
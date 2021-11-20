var respostaModel = require("../models/respostaModel");

function cadastrar(req, res){
    var textoResposta = req.body.textoResposta;

    var idUsuario = req.params.idUsuario;
    var idTopico = req.params.idTopico;

    respostaModel.cadastrar(textoResposta, idUsuario, idTopico)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {

                console.log("sqls",erro.sqlState)

                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );

                if(erro.sqlState==23000){
                    res.status(204).json(erro.sqlMessage);
                }

                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar
}
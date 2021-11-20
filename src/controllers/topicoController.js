var topicoModel = require("../models/topicoModel");

function listar(req, res) {
    let idCategoria = req.params.idCategoria;
    topicoModel.listar(idCategoria)
        .then(function (resultado) {
            if (resultado.length > 0) {
                let auxResultado = resultado.map((r) => {
                    let auxR = r;
                    if (auxR.autorRespostaUltimo == null) {
                        auxR.autorRespostaUltimo = r.nomeAutorTopico;
                        auxR.fotoAutorRespostaUltimo = r.fotoAutorTopico;
                        auxR.dataHoraResposta = r.dataHoraTopico;
                    }
                    return auxR;
                })

                res.status(200).json(auxResultado);
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

function contar(req, res) {
    topicoModel.contar()
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

function contarMsg(req, res) {
    topicoModel.contarMsg()
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

function listarRespostas(req, res) {
    let idTopico = req.params.idTopico;
    topicoModel.listarRespostas(idTopico)
        .then(function (resultado) {
            if (resultado.length > 0) {
                let auxResultado = resultado.map((r) => {
                    let auxR = r;
                    auxR.generoUsuario = auxR.generoUsuario=="M"?"Masculino":"Feminino"
                    auxR.generoAutorResposta = auxR.generoAutorResposta=="M"?"Masculino":"Feminino"
                    return auxR;
                })

                res.status(200).json(auxResultado);
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

function cadastrar(req, res){
    let titulo = req.body.tituloTopico;
    let texto = req.body.textoTopico;
    let idSubCategoria = req.params.idSubCategoria;
    let idUsuario = req.params.idUsuario;

    topicoModel.cadstrar(titulo, texto, idUsuario, idSubCategoria)
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
    listar,
    contar,
    listarRespostas,
    contarMsg,
    cadastrar
}
var topicoModel = require("../models/topicoModel");

function listar(req, res) {
    let idCategoria = 2;
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
                console.log(" aux", auxResultado);

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
    let idTopico = 5;
    topicoModel.listarRespostas(idTopico)
        .then(function (resultado) {
            if (resultado.length > 0) {
                let auxResultado = resultado.map((r, i)=>{
                    let auxR = r;
                    if(i==0){
                        
                    }
                })
                
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

module.exports = {
    listar,
    contar,
    listarRespostas,
    contarMsg
}
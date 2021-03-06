var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function listar(req, res) {
    usuarioModel.listar()
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

function listarUsuariosOnline(req, res){
    usuarioModel.listarUsuariosOnline()
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

function listarQtdUsuarios(req, res){
    usuarioModel.listarQtdUsuarios()
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

function exibirUltimoUsuario(req, res){
    usuarioModel.exibirUltimoUsuario()
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

function entrar (req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (email == undefined) {
        res.status(400).send("Seu email est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha est?? indefinida!");
    } else {
        usuarioModel.entrar(email, senha)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                if (resultado[0].nomeUsuario != null) {
                    console.log("aa",resultado);
                    res.json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inv??lido(s)");
                } else {
                    res.status(403).send("Mais de um usu??rio com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}

function cadastrar(req, res) {
    
    var nome = req.body.nomeUsuario;
    var email = req.body.email;
    var genero = req.body.genero;
    var senha = req.body.senha;

    if (nome == undefined) {
        res.status(400).send("Seu nome est?? undefined!");

    }
    else if (email == undefined) {
        res.status(400).send("Seu email est?? undefined!");

    }
    else if (genero == undefined) {
        res.status(400).send("Seu g??nero est?? undefined!");

    }
    else if (senha == undefined) {
        res.status(400).send("Sua senha est?? undefined!");

    }
    else {
        usuarioModel.cadastrar(nome, email, genero, senha)
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
}

function atualizarDataUltimaAtividade(req, res){
    var idUsuario = req.params.idUsuario;

    usuarioModel.atualizarDataUltimaAtividade(idUsuario)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar update: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function atualizarFotoPerfil(req, res){
    var idUsuario = req.params.idUsuario;
    var fotoUsuario = req.body.fotoUsuario;

    usuarioModel.atualizarFotoPerfil(idUsuario, fotoUsuario)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar update: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    entrar,
    cadastrar,
    exibirUltimoUsuario,
    listar,
    listarUsuariosOnline,
    listarQtdUsuarios,
    atualizarDataUltimaAtividade,
    atualizarFotoPerfil
}
var database = require("../database/config");

function listar(){
    var instrucao = `
        SELECT * FROM usuario;
    `;
    return database.executar(instrucao);
}

function listarQtdUsuarios(){
    var instrucao = `
        select count(idUsuario) as qtdUsuarios from usuario;
    `;
    return database.executar(instrucao);
}

function listarUsuariosOnline(){
    var instrucao = `
    select * from usuario
    where dataUltimaAtividade > date_sub(current_timestamp, interval 15 minute);
    `;
    return database.executar(instrucao);
}

function exibirUltimoUsuario(){
    var instrucao = `
        select nomeUsuario from usuario
        where idUsuario = (select max(idUsuario) from usuario);
    `;
    return database.executar(instrucao);
}

function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, email, genero, senha) {
    var instrucao = `
        INSERT INTO usuario (nomeUsuario, emailUsuario, fotoUsuario, generoUsuario, senhaUsuario, permicao) VALUES ('${nome}', '${email}', 'default', '${genero}', '${senha}', 'Usr');
    `;
    return database.executar(instrucao);
}

function atualizarDataUltimaAtividade(id){
    var instrucao = `
        UPDATE usuario
        SET dataUltimaAtividade = current_timestamp
        where idUsuario = ${id}
    `;
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    listarUsuariosOnline,
    listarQtdUsuarios,
    exibirUltimoUsuario,
    atualizarDataUltimaAtividade
};
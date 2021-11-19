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
        select idUsuario, nomeUsuario, emailUsuario, fotoUsuario, count(distinct idTopico) as qtdTopicos, count(idResposta) as qtdMensagens from usuario
        left join topico on topico.fkUsuario = idUsuario
        left join resposta on resposta.fkUsuario = idUsuario
        WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, email, genero, senha) {
    var instrucao = `
        INSERT INTO usuario (nomeUsuario, emailUsuario, generoUsuario, senhaUsuario, permicao) VALUES ('${nome}', '${email}', '${genero}', '${senha}', 'Usr');
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

function atualizarFotoPerfil(id, foto){
    var instrucao = `
        UPDATE usuario
        SET fotoUsuario = '${foto}'
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
    atualizarDataUltimaAtividade,
    atualizarFotoPerfil
};
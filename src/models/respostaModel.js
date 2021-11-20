var database = require("../database/config");

function cadastrar(texto, idUsuario, idTopico){
    var instrucao = `
        insert into resposta(textoResposta, fkUsuario, fkTopico)
        values
        ('${texto}', ${idUsuario}, ${idTopico});
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
}
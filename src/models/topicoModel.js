var database = require("../database/config");

function listar(idSubCategoria){
    var instrucao = `select tituloTopico, dataHoraTopico, autorTopico.nomeUsuario as nomeAutorTopico, dataHoraTopico, autorResposta.nomeUsuario as autorRespostaUltimo, max(dataHoraResposta) from topico
    join usuario as autorTopico on fkUsuario = autorTopico.idUsuario
    left join resposta on idTopico = fkTopico
    left join usuario as autorResposta on resposta.fkUsuario = autorResposta.idUsuario
    where fkSubCategoria = ${idSubCategoria}
    group by idTopico;`;
    return database.executar(instrucao);
}

function contar(){
    
}
module.exports = {
    listarPorSubCategoria
}
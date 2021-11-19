var database = require("../database/config");

function listar(idSubCategoria) {

    var instrucao = `select idTopico, tituloTopico, dataHoraTopico,
    autorTopico.nomeUsuario as nomeAutorTopico,
    autorTopico.fotoUsuario as fotoAutorTopico,
    DATE_FORMAT(max(dataHoraTopico), "%d/%m/%Y") as dataHoraTopico,
    count(idResposta) as qtdRespostas,
    (select nomeUsuario from usuario join resposta on idUsuario = fkUsuario where dataHoraResposta = (select max(dataHoraResposta) from resposta where fkTopico = idTopico)) as autorRespostaUltimo,
    (select fotoUsuario from usuario join resposta on idUsuario = fkUsuario where dataHoraResposta = (select max(dataHoraResposta) from resposta where fkTopico = idTopico)) as fotoAutorRespostaUltimo,
    DATE_FORMAT(max(dataHoraResposta), "%d/%m/%Y") as dataHoraResposta from topico
    join usuario as autorTopico on fkUsuario = autorTopico.idUsuario
    left join resposta on idTopico = fkTopico
    left join usuario as autorResposta on resposta.fkUsuario = autorResposta.idUsuario
    where fkSubCategoria = ${idSubCategoria}
    group by idTopico`;
    return database.executar(instrucao);
}

function contar() {
    var instrucao = `select count(idTopico) as qtdTopicos from topico`;
    return database.executar(instrucao);
}

function listarRespostas(idTopico) {
    var instrucao = `
        select tituloTopico,
        textoTopico,
        dataHoraTopico,
        usuario.*,
        (select(
            select count(idTopico) from topico
            where fkUsuario = 4)+(
                select count(idResposta) from resposta
                where fkUsuario = usuario.idUsuario
            )
        )
        as qtdMensagensAutorTopico,
        textoResposta, dataHoraResposta, autorResposta.*,
        (select(
            select count(idTopico) from topico
            where fkUsuario = 4)+(
                select count(idResposta) from resposta
                where fkUsuario = autorResposta.idUsuario
            )
        )
        as qtdMensagensAutorResposta
        from topico
        join usuario on fkUsuario = idUsuario
        left join resposta on idTopico = fkTopico
        left join usuario as autorResposta on resposta.fkUsuario = autorResposta.idUsuario
        where idTopico = ${idTopico};
    `;
    return database.executar(instrucao);
}

function contarMsg(){
    var instrucao = `
    SELECT 
    (SELECT 
            COUNT(idTopico)
        FROM
            topico) + (SELECT 
            COUNT(idResposta)
        FROM
            resposta) AS qtdMensagens;
    `;

    return database.executar(instrucao);
}

module.exports = {
    listar,
    contar,
    contarMsg,
    listarRespostas
}
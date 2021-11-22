var database = require("../database/config");

function listar(idSubCategoria) {

    var instrucao = `select nomeCategoria, nomeSubCategoria, idTopico, tituloTopico, dataHoraTopico,
    autorTopico.nomeUsuario as nomeAutorTopico,
    autorTopico.fotoUsuario as fotoAutorTopico,
    DATE_FORMAT(max(dataHoraTopico), "%d/%m/%Y") as dataHoraTopico,
    count(idResposta) as qtdRespostas,
    (select nomeUsuario from usuario join resposta on idUsuario = fkUsuario where dataHoraResposta = (select max(dataHoraResposta) from resposta where fkTopico = idTopico)) as autorRespostaUltimo,
    (select fotoUsuario from usuario join resposta on idUsuario = fkUsuario where dataHoraResposta = (select max(dataHoraResposta) from resposta where fkTopico = idTopico)) as fotoAutorRespostaUltimo,
    DATE_FORMAT(max(dataHoraResposta), "%d/%m/%Y") as dataHoraResposta from topico
    join subCategoria ON fkSubCategoria = idSubCategoria
    join categoria ON fkCategoria = idCategoria
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
        SELECT
        nomeCategoria,
        nomeSubCategoria,
        tituloTopico,
        textoTopico,
        DATE_FORMAT(dataHoraTopico, '%d/%m/%Y') AS dataHoraTopico,
        usuario.idUsuario,
        usuario.nomeUsuario,
        usuario.fotoUsuario,
        usuario.generoUsuario,
        DATE_FORMAT(usuario.dataCadastro, '%d/%m/%Y') AS dataCadastroAutor,
        (SELECT 
                (SELECT 
                            COUNT(idTopico)
                        FROM
                            topico
                        WHERE
                            fkUsuario = 4) + (SELECT 
                            COUNT(idResposta)
                        FROM
                            resposta
                        WHERE
                            fkUsuario = usuario.idUsuario)
            ) AS qtdMensagensAutorTopico,
        textoResposta,
        DATE_FORMAT(dataHoraResposta, '%d/%m/%Y') AS dataHoraResposta,
        autorResposta.idUsuario AS idAutorResposta,
        autorResposta.nomeUsuario AS nomeAutorResposta,
        autorResposta.fotoUsuario AS fotoAutorResposta,
        autorResposta.generoUsuario AS generoAutorResposta,
        DATE_FORMAT(autorResposta.dataCadastro, '%d/%m/%Y') AS dataCadastroAutorResposta,
        (SELECT 
                (SELECT 
                            COUNT(idTopico)
                        FROM
                            topico
                        WHERE
                            fkUsuario = 4) + (SELECT 
                            COUNT(idResposta)
                        FROM
                            resposta
                        WHERE
                            fkUsuario = autorResposta.idUsuario)
            ) AS qtdMensagensAutorResposta
        FROM
            topico
                JOIN
            subCategoria ON fkSubCategoria = idSubCategoria
                JOIN
            categoria ON fkCategoria = idCategoria
                JOIN
            usuario ON fkUsuario = idUsuario
                LEFT JOIN
            resposta ON idTopico = fkTopico
                LEFT JOIN
            usuario AS autorResposta ON resposta.fkUsuario = autorResposta.idUsuario
        WHERE
            idTopico = ${idTopico};
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

function cadstrar(titulo, texto, idUsuario, idSubCategoria){
    var instrucao = `
        insert into topico (tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
        VALUES
        ('${titulo}', '${texto}', ${idUsuario}, ${idSubCategoria});
    `;

    return database.executar(instrucao);
}

module.exports = {
    listar,
    contar,
    contarMsg,
    listarRespostas,
    cadstrar
}
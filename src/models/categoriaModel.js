var database = require("../database/config");

function listar(){
    var instrucao = `
        SELECT 
        nomeCategoria,
        idSubCategoria AS idSCategoria,
        nomeSubCategoria,
        descricaoSubCategoria,
        fotoSubCategoria,
        COUNT(DISTINCT idTopico) AS qtdTopicos,
        (SELECT 
                COUNT(idResposta)
            FROM
                resposta
                    JOIN
                topico ON fkTopico = idTopico
                    JOIN
                subCategoria ON fkSubCategoria = idSubCategoria
            WHERE
                idSubCategoria = idSCategoria) + (SELECT DISTINCT
                COUNT(idTopico)
            FROM
                topico
            WHERE
                fkSubCategoria = idSCategoria) AS somaTopicoResposta,
        (SELECT 
                tituloTopico
            FROM
                topico
            WHERE
                dataHoraTopico = (SELECT 
                        MAX(dataHoraTopico)
                    FROM
                        topico
                    WHERE
                        fkSubCategoria = idSubCategoria)) AS nomeUltimoTopico,
        MAX(idUsuario) AS idUltimoUsuario,
        (SELECT 
                nomeUsuario
            FROM
                usuario
                    JOIN
                topico ON fkUsuario = idUsuario
            WHERE
                dataHoraTopico = (SELECT 
                        MAX(dataHoraTopico)
                    FROM
                        topico
                    WHERE
                        fkSubCategoria = idSubCategoria)) AS autorUltimoTopico,
        (SELECT 
                fotoUsuario
            FROM
                usuario
                    JOIN
                topico ON fkUsuario = idUsuario
            WHERE
                dataHoraTopico = (SELECT 
                        MAX(dataHoraTopico)
                    FROM
                        topico
                    WHERE
                        fkSubCategoria = idSubCategoria)) AS fotoAutorUltimoTopico,
        DATE_FORMAT(MAX(dataHoraTopico), '%d/%m/%Y') AS dataHoraUltimoTopico
    FROM
        categoria
            JOIN
        subCategoria ON idCategoria = fkCategoria
            LEFT JOIN
        topico ON fkSubCategoria = idSubCategoria
            LEFT JOIN
        usuario ON idUsuario = fkUsuario
            LEFT JOIN
        resposta ON idTopico = fkTopico
    GROUP BY idSubCategoria;
    `;
    return database.executar(instrucao);
}


module.exports = {
    listar
}
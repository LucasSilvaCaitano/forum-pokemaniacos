var database = require("../database/config");

function listar(){
    var instrucao = `select
    nomeCategoria,
    idSubCategoria,
    nomeSubCategoria,
    descricaoSubCategoria,
    fotoSubCategoria,
    count(distinct idTopico) as qtdTopicos,
    count(idResposta) as somaTopicoResposta,
    (select tituloTopico from topico
    where dataHoraTopico = 
        (select max(dataHoraTopico) from topico
        where fkSubCategoria = idSubCategoria)
    ) as nomeUltimoTopico,
    max(idUsuario) as idUltimoUsuario,
    (select nomeUsuario from usuario
    join topico on fkUsuario = idUsuario
    where dataHoraTopico = 
        (select max(dataHoraTopico) from topico
        where fkSubCategoria = idSubCategoria)
    ) as autorUltimoTopico,
    DATE_FORMAT(max(dataHoraTopico), '%d/%m/%Y') as dataHoraUltimoTopico
    from categoria
    join subCategoria on idCategoria = fkCategoria
    left join topico on fkSubCategoria = idSubCategoria
    left join usuario on idUsuario = fkUsuario
    left join resposta on idTopico = fkTopico
    group by idSubCategoria;`;
    return database.executar(instrucao);
}


module.exports = {
    listar
}
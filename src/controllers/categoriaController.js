var categoriaModel = require("../models/categoriaModel");

function listar(req, res) {
    categoriaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                var auxResultado = [], auxNomeCategoria, i=-1;
                resultado.forEach(r => {
              
                    if(auxNomeCategoria!=r.nomeCategoria){
                        auxNomeCategoria = r.nomeCategoria
                        auxResultado.push({
                            nomeCategoria:auxNomeCategoria, dadosSubCategoria:[]
                        })
                        i++;
                    }
                    auxResultado[i].dadosSubCategoria.push({
                        nomeSubCategoria:r.nomeSubCategoria,
                        descricaoSubCategoria:r.descricaoSubCategoria,
                        fotoSubCategoria:r.fotoSubCategoria,
                        qtdTopicos:r.qtdTopicos,
                        somaTopicoResposta:r.somaTopicoResposta,
                        nomeUltimoTopico:r.nomeUltimoTopico,
                        autorUltimoTopico:r.autorUltimoTopico,
                        fotoAutorUltimoTopico: r.fotoAutorUltimoTopico,
                        dataHoraUltimoTopico:r.dataHoraUltimoTopico,

                    });

                })
                console.log("key",Object.keys(resultado));
                console.log("resultado",Object.values(resultado));

                res.status(200).json(auxResultado);
            }
        }).catch(function (erro) {
            console.log(erro)
        })
}

module.exports = {
    listar
}
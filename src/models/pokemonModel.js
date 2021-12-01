var database = require("../database/config");

function listarBox(idUsuario){
    var instrucao = `select * from pokemon where fkUsuario = ${idUsuario};`;
    return database.executar(instrucao)
}

function inserir(nomePokemon, fotopokemon, spritePokemon, lvl, fkUsuario){
    var instrucao = `
        insert into pokemon
        values
        (null, '${nomePokemon}', '${fotopokemon}', '${spritePokemon}', ${lvl}, ${fkUsuario});
    
    `;
    console.log(instrucao)
    return database.executar(instrucao)
}

module.exports = {
    listarBox,
    inserir
}
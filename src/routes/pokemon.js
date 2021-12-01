var express = require("express");
var router = express.Router();

var pokemonController = require("../controllers/pokemonController");

router.get("/listarBox/:idUsuario", function(req, res) {
    pokemonController.listarBox(req, res);
});

router.post("/inserir", function(req, res){
    pokemonController.inserir(req, res)
})

module.exports = router
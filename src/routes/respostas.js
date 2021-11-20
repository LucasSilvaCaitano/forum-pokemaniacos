var express = require("express");
var router = express.Router();

var respostaController = require("../controllers/respostaController");

router.post("/cadastrar/:idUsuario/:idTopico", function(req, res) {
    console.log(req.body)
    respostaController.cadastrar(req, res);
});

module.exports = router
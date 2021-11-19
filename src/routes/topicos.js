var express = require("express");
var router = express.Router();

var topicoController = require("../controllers/topicoController");

router.get("/listar", function(req, res){
    topicoController.listar(req, res);
})

router.get("/contar", function(req, res) {
    topicoController.contar(req, res);
});

router.get("/contarMsg", function(req, res) {
    topicoController.contarMsg(req, res);
});

router.get("/listarRespostas", function(req, res) {
    topicoController.listarRespostas(req, res);
});
  
module.exports = router;
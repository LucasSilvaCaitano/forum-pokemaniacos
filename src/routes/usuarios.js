var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listar", function(req, res) {
    usuarioController.listar(req, res);
});

router.get("/exibirUltimoUsuario", function(req, res) {
    usuarioController.exibirUltimoUsuario(req, res);
});

router.post("/exibirDadosUsuario", function(req, res) {
    usuarioController.exibirUltimoUsuario(req, res);
});

router.get("/listarUsuariosOnline", function(req, res) {
    usuarioController.listarUsuariosOnline(req, res);
});

router.get("/listarQtdUsuarios", function(req, res) {
    usuarioController.listarQtdUsuarios(req, res);
});

router.post("/cadastrar", function(req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function(req, res) {
    usuarioController.entrar(req, res);
});

router.put("/atualizarDataUltimaAtividade/:idUsuario", function(req, res){
    usuarioController.atualizarDataUltimaAtividade(req, res)
})

router.put("/atualizarFotoPerfil/:idUsuario", function(req, res){
    usuarioController.atualizarFotoPerfil(req, res)
})
  
module.exports = router;
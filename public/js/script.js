const btnModal = document.querySelectorAll('[data-modal]');

btnModal.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        document.getElementById(e.target.dataset.modal).style.display = 'block';
    })

});

const btnClose = document.querySelectorAll('.close');

btnClose.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let modal = e.target.closest('.modalFundo');
        modal.style.display = 'none';
    })

});


function sair() {
    sessionStorage.clear();

    window.location.href = "/";
}

function cadastrarUsuario() {
    var formulario = new URLSearchParams(new FormData(document.getElementById("formCadastro")));

    var nome = formulario.get("nomeUsuario");
    var email = formulario.get("email");
    var genero = formulario.get("genero");
    var senha = formulario.get("senha");
    var confSenha = formulario.get("confSenha");
    console.log(formulario)
    if (nome == "") {
        alert("Preencha o campo nome");
    }
    else if (email == "") {
        alert("Preencha o campo email");
    }
    else if (genero == undefined) {
        alert("Selecione o gênero")
    }
    else if (senha.length < 8) {
        alert("Senha requer no mínimo 8 caracteres")
    }
    else if (senha != confSenha) {
        alert("Senhas diferentes inseridas");
    }
    else if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
        alert("Email invalido");
    }
    else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            body: formulario

        }).then(res => {
            if (res.ok && res.status == 200) {
                alert("Cadastro realizado com sucesso!");

            } else {
                alert("Usuário com nome ou email já cadastrado");

                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (res) {
            console.log(`#ERRO: ${res}`);

        });
    }
    return false;
}

function logar() {
    var formulario = new URLSearchParams(new FormData(document.getElementById("formLogin")));

    var email = formulario.get("email");
    var senha = formulario.get("senha");

    if (email == "") {
        alert("E-Mail é obrigatória")
    } else if (senha == "") {
        alert("Senha é obrigatória")
    } else if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
        alert("E-Mail invalido")
    } else {
        fetch("/usuarios/autenticar", { method: 'POST', body: formulario })
            .then(res => {
                if (res.ok) {

                    res.json().then(json => {
                        console.log("aaaaa", json)
                        sessionStorage.ID_USUARIO = json.idUsuario;
                        sessionStorage.NOME_USUARIO = json.nomeUsuario;
                        sessionStorage.EMAIL_USUARIO = json.emailUsuario;
                        sessionStorage.FOTO_USUARIO = json.fotoUsuario;
                        sessionStorage.QTD_TOPICOS = json.qtdTopicos;
                        sessionStorage.QTD_MENSAGENS = json.qtdMensagens;

                        alert("Logado com sucesso!")
                        window.location.href = "/";

                    });

                } else {

                    console.log("Houve um erro ao tentar realizar o login!");

                    res.text().then(texto => {
                        console.error(texto);

                    });
                }
            })
    }

    return false;
}

function editarFoto() {
    var formulario = new URLSearchParams(new FormData(document.getElementById("formEditarFoto")));

    fetch(`/usuarios/atualizarFotoPerfil/${sessionStorage.ID_USUARIO}`, { method: 'PUT', body: formulario })
        .then(res => {
            if (res.ok) {
                alert("Foto atualizada com sucesso");
                window.location.href = "/";
                sessionStorage.FOTO_USUARIO = formulario.get("fotoUsuario")
            } else {
                alert("Erro")
            }
        })
    return false;
}

function cadastrarTopico() {

    var formulario = new URLSearchParams(new FormData(document.getElementById("formAddTopico")));

    var tituloTopico = formulario.get("tituloTopico");
    var textoTopico = formulario.get("textoTopico");

    var url = window.location.href;
    var indexId = url.indexOf('ria') + 4;
    var idSubCategoria = url.substr(indexId);
    var idUsuario = sessionStorage.ID_USUARIO;

    if (tituloTopico == "") {
        alert("Titulo é obrigatório")
    } else if (textoTopico == "") {
        alert("Texto é obrigatório")
    } else {
        fetch(`/topicos/cadastrar/${idUsuario}/${idSubCategoria}`, { method: 'POST', body: formulario })
            .then(res => {
                if (res.ok) {

                    alert("Tópico adicionado com sucesso!")
                    window.location.href = url;

                }
                else {

                    console.log("Houve um erro ao tentar realizar o login!");

                    res.text().then(texto => {
                        console.error(texto);

                    });
                }
            })
    }

    return false;
}

function cadastrarResposta() {
    var formulario = new URLSearchParams(new FormData(document.getElementById("formAddResposta")));

    var textoResposta = formulario.get("textoResposta");

    var url = window.location.href;
    var indexId = url.indexOf('ico=') + 4;
    var idTopico = url.substr(indexId);
    var idUsuario = sessionStorage.ID_USUARIO;

    if (textoResposta == "") {
        alert("Resposta é obrigatória")
    }
    else {
        fetch(`/respostas/cadastrar/${idUsuario}/${idTopico}`, { method: 'POST', body: formulario })
            .then(res => {
                if (res.ok) {

                    alert("Resposta adicionada com sucesso!")
                    window.location.href = url;

                }
                else {

                    console.log("Houve um erro ao tentar realizar o login!");

                    res.text().then(texto => {
                        console.error(texto);

                    });
                }
            })
    }

    return false;
}
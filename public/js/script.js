var qtdTopicos = 0, qtdMensagens = 0;

function sair(){
    sessionStorage.clear();

    window.location.href="/";
}

function cadastrarUsuario() {
    var formulario = new URLSearchParams(new FormData(document.getElementById("formCadastro")));

    var nome = formulario.get("nomeUsuario");
    var email = formulario.get("email");
    var genero = formulario.get("genero");
    var senha = formulario.get("senha");
    var confSenha = formulario.get("confSenha");

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
    } else if (senha != confSenha) {
        alert("Senhas diferentes inseridas");
    } else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            body: formulario

        }).then(res => {
            if (res.ok) {
                alert("Cadastro realizado com sucesso!");

            } else {
                console.log(res)
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
    } else if ((email.indexOf("@") == -1 || email.indexOf(".com") == -1)) {
        alert("E-Mail invalido")
    } else {
        fetch("/usuarios/autenticar", { method: 'POST', body: formulario })
            .then(res => {
                if (res.ok) {

                    res.json().then(json => {

                        sessionStorage.ID_USUARIO = json.idUsuario;
                        sessionStorage.NOME_USUARIO = json.nomeUsuario;
                        sessionStorage.EMAIL_USUARIO = json.emailUsuario;
                        
                        alert("Logado com sucesso!")
                        window.location.href="/";

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

function carregarCategorias() {
    fetch("/categorias/listar")
        .then(res => res.json())
        .then(res => {

            console.log(res)

            res.forEach(r => {
                let categoria = document.createElement('div');
                categoria.classList.add("categoria");

                let tituloCategoria = document.createElement('h1');
                tituloCategoria.classList.add('tituloCategoria');
                tituloCategoria.innerText = r.nomeCategoria
                
                categoria.append(tituloCategoria)
                console.log(categoria)

                let subCategorias = document.createElement('div');
                subCategorias.classList.add("subCategorias");

                r.dadosSubCategoria.forEach(r2 => {
                    //Criando elementos

                    let card = document.createElement('div');
                    card.classList.add('card');

                    let cardHeader = document.createElement('div');
                    cardHeader.classList.add('cardHeader');

                    let cardTitulo = document.createElement('h1');
                    cardTitulo.classList.add("cardTitulo");
                    cardTitulo.innerText = r2.nomeSubCategoria;

                    let img = document.createElement('img');
                    img.src = `/img/${r2.fotoSubCategoria}`;

                    let cardContent = document.createElement('div');
                    cardContent.classList.add('cardContent');

                    let descricaoSubCategoria = document.createElement('div');
                    descricaoSubCategoria.classList.add('descricaoSubCategoria');
                    descricaoSubCategoria.innerText = r2.descricaoSubCategoria;

                    let metricasSubCategoria = document.createElement('div');
                    metricasSubCategoria.classList.add('metricasSubCategoria');

                    let dlTopicos = document.createElement('dl');

                    let dtTopicos = document.createElement('dt');
                    dtTopicos.innerText = 'Tópicos';
                    
                    let ddTopicos = document.createElement('dd');
                    ddTopicos.innerText = r2.qtdTopicos;

                    let dlMensagens = document.createElement('dl');

                    let dtMensagens = document.createElement('dt');
                    dtMensagens.innerText = 'Mensagens';
                    
                    let ddMensagens = document.createElement('dd');
                    ddMensagens.innerText = r2.somaTopicoResposta;

                    let cardFooter = document.createElement('div');
                    cardFooter.classList.add('cardFooter');

                    let cardFooterContent = document.createElement('div');
                    cardFooterContent.classList.add('cardFooterContent');

                    let pTopico = document.createElement('p');
                    pTopico.innerText = r2.nomeUltimoTopico;

                    let pUsuario = document.createElement('p');
                    pUsuario.innerText = `${r2.autorUltimoTopico} - ${r2.dataHoraUltimoTopico}`;

                    //Anexando elementos
                    subCategorias.append(card);
                    card.append(cardHeader);
                    cardHeader.append(img);
                    cardHeader.append(cardTitulo);
                    card.append(cardContent);
                    cardContent.append(descricaoSubCategoria);
                    cardContent.append(metricasSubCategoria);
                    metricasSubCategoria.append(dlTopicos);
                    metricasSubCategoria.append(dlMensagens)
                    dlTopicos.append(dtTopicos);
                    dlTopicos.append(ddTopicos);
                    dlMensagens.append(dtMensagens);
                    dlMensagens.append(ddMensagens);
                    card.append(cardFooter);
                    cardFooter.append(cardFooterContent);
                    cardFooterContent.append(pTopico);
                    cardFooterContent.append(pUsuario);

                    qtdTopicos += Number(r2.qtdTopicos);
                    qtdMensagens += Number(r2.somaTopicoResposta);
                })

                categoria.append(subCategorias)
                document.querySelector('.categorias').append(categoria)
         
            });

            pTopicos.innerText = qtdTopicos;
            pMensagens.innerText = qtdMensagens;
        })
}

function carregarMembrosOnline() {
    fetch("/usuarios/listarUsuariosOnline")
        .then(res => res.json())
        .then(res => {

            res.forEach(r => {
                console.log(r)
                divUsuariosOnline.append(`${r.nomeUsuario},`)
            })
            spanQtdMembrosOnline.innerHTML = res.length
            
        })
}

function validarSessao() {
    if (sessionStorage.ID_USUARIO != null) {
        bntsPerfil.style.display = 'flex';
        bntsLogin.style.display = 'none';
        fetch(`/usuarios/atualizarDataUltimaAtividade/${sessionStorage.ID_USUARIO}`, { method: 'PUT'})
            .then(res => {

                console.log("aa",res)
            }).catch(e=>console.log("erro", e))

    }else{
        
    }
}

function carregarQtdMembros(){
    fetch("/usuarios/listarQtdUsuarios")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            pMembros.innerText = res[0].qtdUsuarios;
            
        })
}

function carregarUltimoMembro() {
    fetch("/usuarios/exibirUltimoUsuario")
        .then(res => res.json())
        .then(res => {
            console.log(res)

            pUltimoMembro.innerText = res[0].nomeUsuario

        })
}
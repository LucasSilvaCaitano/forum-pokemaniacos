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
                    img.src = `${r2.fotoSubCategoria}`;

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

                    let ultimoTopico = document.createElement('div');
                    ultimoTopico.classList.add('ultimoTopico');

                    let topicoUsuario = document.createElement('div');
                    topicoUsuario.classList.add('topicoUsuario');

                    let imgPerfil = document.createElement('img');
                    imgPerfil.src = r2.fotoAutorUltimoTopico;

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
                    cardFooterContent.append(ultimoTopico);
                    ultimoTopico.append(imgPerfil)
                    ultimoTopico.append(topicoUsuario)


                    topicoUsuario.append(pTopico);
                    topicoUsuario.append(pUsuario);

                })

                categoria.append(subCategorias)
                document.querySelector('.categorias').append(categoria)

                console.log(categoria)
            });


            //   pMensagens.innerText = qtdMensagens;
        })
}

function contarTopicos() {
    fetch("/topicos/contar")
        .then(res => res.json())
        .then(res => {

            pTopicos.innerText = res[0].qtdTopicos;
            
        })
}

function contarMsgs(){
    fetch("/topicos/contarMSG")
    .then(res=>res.json())
    .then(res=>{
        pMensagens.innerText = res[0].qtdMensagens
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
        fetch(`/usuarios/atualizarDataUltimaAtividade/${sessionStorage.ID_USUARIO}`, { method: 'PUT' })
            .then(res => console.log("aa", res))
            .catch(e => console.log("erro", e));

        perfil.style.display = 'flex';
        fotoPerfil.src = sessionStorage.FOTO_USUARIO;
        fotoPerfilEditar.src = sessionStorage.FOTO_USUARIO;
        nomeUsuario.innerText = sessionStorage.NOME_USUARIO;
        topicosUsuario.innerText = sessionStorage.QTD_TOPICOS;
        mensagensUsuario.innerText = sessionStorage.QTD_MENSAGENS;

    } else {

    }
}

function carregarQtdMembros() {
    fetch("/usuarios/listarQtdUsuarios")
        .then(res => res.json())
        .then(res => {

            pMembros.innerText = res[0].qtdUsuarios;

        }
        )
}

function carregarUltimoMembro() {
    fetch("/usuarios/exibirUltimoUsuario")
        .then(res => res.json())
        .then(res => {


            pUltimoMembro.innerText = res[0].nomeUsuario

        })
}

function listarTopicos() {
    fetch("/topicos/listar")
        .then(res => res.json())
        .then(res => {
            console.log("aa", res)
            res.forEach(r => {

                let topico = document.createElement('div');
                topico.classList.add("topico");

                let autorTopico = document.createElement('div');
                autorTopico.classList.add("autorTopico");

                let imgAutorTopico = document.createElement('img');
                imgAutorTopico.src = r.fotoAutorRespostaUltimo;

                let divTopico = document.createElement('div');

                let tituloTopico = document.createElement('h3');
                tituloTopico.classList.add("tituloTopico");
                tituloTopico.innerText = r.tituloTopico;

                let p = document.createElement('p');
                p.innerText = `${r.nomeAutorTopico} - ${r.dataHoraTopico}`;

                let metricasTopico = document.createElement('div');
                metricasTopico.classList.add("metricasTopico");

                let dlRespostas = document.createElement("dl");
                dlRespostas.classList.add("metricasBetween");

                let dtRespostas = document.createElement("dt");
                dtRespostas.innerText = "Respostas";
                let ddRespostas = document.createElement("dd");
                ddRespostas.innerText = r.qtdRespostas;

                let dlVisualizacoes = document.createElement("dl");
                dlVisualizacoes.classList.add("metricasBetween");

                let dtVisualizacoes = document.createElement("dt");
                dtVisualizacoes.innerText = "Visualizações";
                let ddVisualizacoes = document.createElement("dd");
                ddVisualizacoes.innerText = 4;

                let autorResposta = document.createElement('div');
                autorResposta.classList.add('autorResposta');

                let divUltimaResposta = document.createElement("div");

                let pUltimaResposta = document.createElement("div");
                pUltimaResposta.innerText = r.dataHoraResposta;

                let pAutorUltimaResposta = document.createElement("div");
                pAutorUltimaResposta.innerText = r.autorRespostaUltimo;

                let imgAutorResposta = document.createElement('img');
                imgAutorResposta.src = r.fotoAutorRespostaUltimo;

                document.querySelector('.topicos').append(topico)

                topico.append(autorTopico);
                autorTopico.append(imgAutorTopico)
                autorTopico.append(divTopico)
                divTopico.append(tituloTopico)
                divTopico.append(p);
                topico.append(metricasTopico)
                metricasTopico.append(dlRespostas);
                dlRespostas.append(dtRespostas);
                dlRespostas.append(ddRespostas);
                metricasTopico.append(dlVisualizacoes);
                dlVisualizacoes.append(dtVisualizacoes);
                dlVisualizacoes.append(ddVisualizacoes);
                topico.append(autorResposta);
                autorResposta.append(divUltimaResposta);
                divUltimaResposta.append(pUltimaResposta);
                divUltimaResposta.append(pAutorUltimaResposta);
                autorResposta.append(imgAutorResposta);
            });
        }
        )

}

function pesquisarPokemon() {
    fetch(`http://pokeapi.co/api/v2/pokemon/${iptPokemon.value.toLowerCase()}/`)
        .then(res => res.json())
        .then(res => {

            fotoPerfilEditar.src = res.sprites.other['official-artwork'].front_default;

            fotoUsuario.value = res.sprites.other['official-artwork'].front_default;
        })




}

function listarRespostas() {
    fetch("/topicos/listarRespostas")
        .then(res => res.json())
        .then(res => {
            console.log("aa", res)


        }
        )
}
var url = window.location.href;
var indexId = url.indexOf('ria') + 4;
var idSubCategoria = url.substr(indexId);

function carregarCategorias() {

    fetch("/categorias/listar")
        .then(res => res.json())
        .then(res => {
            
            res.forEach(r => {
                var categoria = document.createElement('div');
                categoria.classList.add("categoria");

                let tituloCategoria = document.createElement('h1');
                tituloCategoria.classList.add('tituloCategoria');
                tituloCategoria.innerText = r.nomeCategoria

                categoria.append(tituloCategoria)
                console.log(categoria)

                let subCategorias = document.createElement('div');
                subCategorias.classList.add("subCategorias");

                r.dadosSubCategoria.forEach(r2 => {

                    let card = document.createElement('div');
                    card.classList.add('card');
    
                    let cardHeader = document.createElement('div');
                    cardHeader.classList.add('cardHeader');
    
                    let cardTitulo = document.createElement('h1');
                    cardTitulo.classList.add("cardTitulo");
    
                    let a = document.createElement('a');
                    a.href = `/forum.html?idSubCategoria=${r2.idSCategoria}`;
                    a.innerText = r2.nomeSubCategoria;
    
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
    
                    subCategorias.append(card);
                    card.append(cardHeader);
                    cardHeader.append(img);
                    cardHeader.append(cardTitulo);
                    cardTitulo.append(a);
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
    
                    if(r2.autorUltimoTopico==null){
                        ultimoTopico.innerText = "Nenhum tópico cadastrado"
                    }
                    else{
                        ultimoTopico.append(imgPerfil)
                        ultimoTopico.append(topicoUsuario)
                    }
    
                    topicoUsuario.append(pTopico);
                    topicoUsuario.append(pUsuario);

                    categoria.append(subCategorias)

                    document.querySelector('.categorias').append(categoria)
    
                })

            })



        })
}

function contarTopicos() {
    fetch("/topicos/contar")
        .then(res => res.json())
        .then(res => {

            pTopicos.innerText = res[0].qtdTopicos;

        })
}

function contarMsgs() {
    fetch("/topicos/contarMSG")
        .then(res => res.json())
        .then(res => {
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
    fetch(`/topicos/listar/${idSubCategoria}`)
        .then(res => res.json())
        .then(res => {
            console.log("aa", res)
            nomeCategoria.innerText = res[0].nomeCategoria;
            nomeSubCategoria.innerText = res[0].nomeSubCategoria;
            res.forEach(r => {

                let topico = document.createElement('div');
                topico.classList.add("topico");

                let autorTopico = document.createElement('div');
                autorTopico.classList.add("autorTopico");

                let imgAutorTopico = document.createElement('img');
                imgAutorTopico.src = r.fotoAutorRespostaUltimo;

                let divTopico = document.createElement('div');

                let a = document.createElement('a');
                a.innerText = r.tituloTopico;
                a.href = `topico.html?idTopico=${r.idTopico}`;

                let tituloTopico = document.createElement('h3');
                tituloTopico.classList.add("tituloTopico");

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
                autorTopico.append(imgAutorTopico);
                autorTopico.append(divTopico);
                divTopico.append(tituloTopico);
                tituloTopico.append(a);
                divTopico.append(p);
                topico.append(metricasTopico)
                metricasTopico.append(dlRespostas);
                dlRespostas.append(dtRespostas);
                dlRespostas.append(ddRespostas);
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
    var url = window.location.href;
    var indexId = url.indexOf('ico=') + 4;
    var idTopico = url.substr(indexId);

    fetch(`/topicos/listarRespostas/${idTopico}`)
        .then(res => res.json())
        .then(res => {

            nomeCategoria.innerText = res[0].nomeCategoria;
            nomeSubCategoria.innerText = res[0].nomeSubCategoria;
            nomeTopico.innerText = res[0].tituloTopico;
            
            let tituloTopico = document.createElement('h1');
            tituloTopico.classList.add('tituloTopico');
            tituloTopico.innerText = res[0].tituloTopico;
            
            let articleTopico = document.createElement('article');

            let usuario = document.createElement('div');
            usuario.classList.add('usuario');

            let imgAutorTopico = document.createElement('img');
            imgAutorTopico.src = res[0].fotoUsuario;

            let PAutorTopico = document.createElement('p');
            PAutorTopico.innerText = res[0].nomeUsuario;

            let dlMensagens = document.createElement('dl');
            dlMensagens.classList.add('metricasBetween');
            let dtMensagens = document.createElement('dt');
            dtMensagens.innerText = "Mensagens:";
            let ddMensagens = document.createElement('dd');
            ddMensagens.innerText = res[0].qtdMensagensAutorTopico;

            let dlAfiliado = document.createElement('dl');
            dlAfiliado.classList.add('metricasBetween');
            let dtAfiliado = document.createElement('dt');
            dtAfiliado.innerText = "Afiliado:";
            let ddAfiliado = document.createElement('dd');
            ddAfiliado.innerText = res[0].dataCadastroAutor;

            let dlGenero = document.createElement('dl');
            dlGenero.classList.add('metricasBetween');
            let dtGenero = document.createElement('dt');
            dtGenero.innerText = "Gênero:";
            let ddGenero = document.createElement('dd');
            ddGenero.innerText = res[0].generoUsuario;

            let mensagem = document.createElement('div');
            mensagem.classList.add('mensagem');

            let dataMensagem = document.createElement('div');
            dataMensagem.classList.add('dataMensagem');
            dataMensagem.innerText = res[0].dataHoraTopico;

            let texto = document.createElement('div');
            texto.classList.add('texto');
            texto.innerText = res[0].textoTopico;

            let containerTopicos = document.getElementById('topicos');
            containerTopicos.append(tituloTopico);
            containerTopicos.append(articleTopico);
            articleTopico.append(usuario);
            usuario.append(imgAutorTopico);
            usuario.append(PAutorTopico);
            usuario.append(dlMensagens);
            dlMensagens.append(dtMensagens);
            dlMensagens.append(ddMensagens);
            usuario.append(dlAfiliado);
            dlAfiliado.append(dtAfiliado);
            dlAfiliado.append(ddAfiliado);
            usuario.append(dlGenero);
            dlGenero.append(dtGenero);
            dlGenero.append(ddGenero);
            articleTopico.append(mensagem);
            mensagem.append(dataMensagem);
            mensagem.append(texto);

            if(res[0].nomeAutorResposta!=null){
                res.forEach(r=>{
                    let articleResposta = document.createElement('article');
    
                    let usuarioResposta = document.createElement('div');
                    usuarioResposta.classList.add('usuario');
    
                    let imgAutorResposta= document.createElement('img');
                    imgAutorResposta.src = r.fotoAutorResposta;
    
                    let PAutorResposta = document.createElement('p');
                    PAutorResposta.innerText = r.nomeAutorResposta;
    
                    let dlMensagensResposta = document.createElement('dl');
                    dlMensagensResposta.classList.add('metricasBetween');
                    let dtMensagensResposta = document.createElement('dt');
                    dtMensagensResposta.innerText = "Mensagens:";
                    let ddMensagensResposta = document.createElement('dd');
                    ddMensagensResposta.innerText = r.qtdMensagensAutorResposta;
    
                    let dlAfiliadoResposta = document.createElement('dl');
                    dlAfiliadoResposta.classList.add('metricasBetween');
                    let dtAfiliadoResposta = document.createElement('dt');
                    dtAfiliadoResposta.innerText = "Afiliado:";
                    let ddAfiliadoResposta = document.createElement('dd');
                    ddAfiliadoResposta.innerText = r.dataCadastroAutorResposta;
    
                    let dlGeneroResposta = document.createElement('dl');
                    dlGeneroResposta.classList.add('metricasBetween');
                    let dtGeneroResposta = document.createElement('dt');
                    dtGeneroResposta.innerText = "Gênero:";
                    let ddGeneroResposta = document.createElement('dd');
                    ddGeneroResposta.innerText = r.generoAutorResposta;
    
                    let mensagemResposta = document.createElement('div');
                    mensagemResposta.classList.add('mensagem');
    
                    let dataMensagemResposta = document.createElement('div');
                    dataMensagemResposta.classList.add('dataMensagem');
                    dataMensagemResposta.innerText = r.dataHoraResposta;
    
                    let textoResposta = document.createElement('div');
                    textoResposta.classList.add('texto');
                    textoResposta.innerText = r.textoResposta;

                    containerTopicos.append(articleResposta);
                    articleResposta.append(usuarioResposta);
                    usuarioResposta.append(imgAutorResposta);
                    usuarioResposta.append(PAutorResposta);
                    usuarioResposta.append(dlMensagensResposta);
                    dlMensagensResposta.append(dtMensagensResposta);
                    dlMensagensResposta.append(ddMensagensResposta);
                    usuarioResposta.append(dlAfiliadoResposta);
                    dlAfiliadoResposta.append(dtAfiliadoResposta);
                    dlAfiliadoResposta.append(ddAfiliadoResposta);
                    usuarioResposta.append(dlGeneroResposta);
                    dlGeneroResposta.append(dtGeneroResposta);
                    dlGeneroResposta.append(ddGeneroResposta);
                    articleResposta.append(mensagemResposta);
                    mensagemResposta.append(dataMensagemResposta);
                    mensagemResposta.append(textoResposta);
                })
            }

        })
}
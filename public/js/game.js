var pokemon = {
    nome: '',
    taxaCaptura: 0,
    img: '',
    sprite: '',
    hpMax: 0,
    level: 0,
    idUsuario: sessionStorage.ID_USUARIO
}

var qtdTentativas = 0;
var taxaPokebola = 2;

var intervalo;

var left;

var movEsq;

function iniciar() {
    telaInicial.style.display = 'none';

    telaPokemon.style.display = 'block';

    start();

    criarInterval();
}

function capturar() {

    console.log(taxaPokebola)
    if (left > 168) {
        var percHP = parseInt((left - 168) / 168 * 100);
        var hpAtual = parseInt(pokemon.hpMax * percHP / 100);

    }
    else {
        var percHP = parseInt(left / 168 * 100);
        var hpAtual = parseInt(pokemon.hpMax - pokemon.hpMax * percHP / 100);
    }

    let catchValue = (((3 * pokemon.hpMax - 2 * hpAtual) * (pokemon.taxaCaptura * taxaPokebola) / (3 * pokemon.hpMax)));

    let catc = 1048560 / Math.sqrt(Math.sqrt(16711680 / catchValue));


    console.log("HP autal ", hpAtual)

    console.log("percHP ", percHP);
    console.log("left ", left)
    capturado = true;
    var i;
    for (i = 0; i < 4; i++) {
        var random = Number(Math.random() * 65535).toFixed();

        console.log(random, catc)

        if (random >= catc) {
            qtdTentativas++;
            capturado = false;

            break
        };

    }
    imgPokemon.className = "pokebola";
    imgPokemon.src="img/small-pokeball-icon-4.jpg"
    
    setTimeout(() => {

        if (capturado) {
            left = 0;
            movEsq = false;

            taxaPokebola = 2;
            qtdTentativas = 0;

            fetch("/pokemon/inserir", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pokemon)
            })

            start();
            alert("Pokémon capturado!")
        }
        else if (qtdTentativas % 9 == 0) {
            imgPokemon.src = pokemon.img

            var res = prompt("Parece que você tá com dificuldades em capturar este pokemon, deseja usar a Master Ball?");

            if (res.toLowerCase() == ("sim").toLowerCase()) {
                taxaPokebola = 100;
            }
        }
        else {
            alert("Pokémon não capturado, tente novamente")
            imgPokemon.src = pokemon.img
        }
        imgPokemon.className = "";
    }, 1500*(i-1))


}

function start() {

    fetch(`https://pokeapi.co/api/v2/pokedex/1/`)
        .then(res => res.json())
        .then(res => {
            let randomPokemon = (Math.random() * res.pokemon_entries.length - 1).toFixed();
            //    console.log(res.pokemon_entries[randomPokemon].pokemon_species.url)
            fetch(res.pokemon_entries[randomPokemon].pokemon_species.url)
                .then(res => res.json())
                .then(res => {
                    pokemon.taxaCaptura = res.capture_rate;
                    pokemon.nome = res.name;
                    pokemon.level = parseInt(Math.random() * 99 + 1)

                    nomePokemon.innerHTML = res.name;

                    fetch(res.varieties[0].pokemon.url)
                        .then(res => res.json()
                            .then(res => {
                                let baseHP = res.stats[0].base_stat;
                                let iv = parseInt(Math.random() * 31);

                                pokemon.hpMax = Math.floor(0.01 * (2 * baseHP + iv) * pokemon.level) + pokemon.level + 10;
                                pokemon.img = res.sprites.other['official-artwork'].front_default;
                                pokemon.sprite = res.sprites.versions['generation-viii'].icons.front_default;

                                imgPokemon.src = pokemon.img;
                                nomePokemon.innerHTML = pokemon.nome;

                                console.log("iv", iv)

                                //    hpPokemon.innerHTML = pokemon.hpMax;
                                //  console.log(pokemon)
                            })
                        )
                })

            //console.log(res.pokemon_entries[randomPokemon])
            //console.log(res.pokemon_entries.length)

        })

}

function criarInterval() {
    left = 0;
    movEsq = false;

    intervalo = setInterval(() => {
        mover();
    }, 1);
}

function mover() {
    if (left == 0 || left == 336) {
        movEsq = !movEsq;
    }
    if (left != 336 && movEsq) {

        left += 4;
    } else if (!movEsq) {
        left -= 4;
    }

    pokeballIcon.style.left = `${left}px`;
}

function voltar() {
    telaPokemon.style.display = 'none';
    telaInicial.style.display = 'block';

    clearInterval(intervalo)
}

function verBox() {
    telaBox.style.display = 'flex';
    telaInicial.style.display = 'none';
    fetch(`/pokemon/listarBox/${sessionStorage.ID_USUARIO}`)
        .then(res => res.json())
        .then(res => {
            for (var i = 0; i < res.length; i++) {
                let img = document.createElement("img");
                img.src = res[i].spritePokemon;
                telaBox.append(img)
            }
        })
}
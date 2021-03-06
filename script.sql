create database bdForumPokemaniacos;

use bdForumPokemaniacos;

create table categoria (
	idCategoria int primary key auto_increment,
	nomeCategoria varchar(30)
);

create table usuario (
	idUsuario int primary key auto_increment,
	nomeUsuario varchar(20) unique,
	emailUsuario varchar(50) unique,
	fotoUsuario varchar(115) default '/img/fotosPerfil/eevee.png',
	generoUsuario char(1),
	senhaUsuario varchar(25),
	dataCadastro datetime default current_timestamp,
	dataUltimaAtividade datetime,
	permicao char(3),
    constraint chkGeneroUsuario check (generoUsuario = 'M' or generoUsuario = 'F'),
    constraint chkPermissao check (permicao = 'Adm' or permicao = 'Mod' or permicao = 'Usr')
);

create table subcategoria (
	idSubCategoria int primary key auto_increment,
	nomeSubCategoria varchar(30),
    descricaoSubCategoria text,
    fotoSubCategoria varchar(30),
	fkCategoria int,
	foreign key (fkCategoria) references categoria(idCategoria)
);

create table pokemon(
	idPokemon int primary key auto_increment,
    nomePokemon varchar(45),
    fotoPokemon varchar(115),
    spritePokemon varchar(115),
    lvl int,
    fkUsuario int,
    foreign key (fkUsuario) references usuario(idUsuario)
);

create table topico (
	idTopico int primary key auto_increment,
	tituloTopico varchar(50),
	textoTopico text,
	dataHoraTopico datetime default current_timestamp,
	fkUsuario int,
	fkSubCategoria int,
	foreign key (fkUsuario) references usuario(idUsuario),
	foreign key (fkSubCategoria) references subcategoria(idSubCategoria)
);

create table resposta (
	idResposta int primary key auto_increment,
	textoResposta text,
	dataHoraResposta datetime default current_timestamp,
	fkUsuario int,
	fkTopico int,
	foreign key (fkUsuario) references usuario(idUsuario),
	foreign key (fkTopico) references topico(idTopico)
  );

-- usuarios
insert into usuario (nomeUsuario, emailUsuario, fotoUsuario, generoUsuario, senhaUsuario, permicao)
values 
('Lucas123', 'lucas@gmail.com', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/677.png', 'M', '123', 'Adm');

insert into usuario (nomeUsuario, emailUsuario, fotoUsuario, generoUsuario, senhaUsuario, permicao)
values 
('Jos??', 'jose@gmail.com', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/677.png', 'M', '123', 'Mod');

insert into usuario (nomeUsuario, emailUsuario, fotoUsuario, generoUsuario, senhaUsuario, permicao)
values 
('Vinicus', 'vinicus@gmail.com', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/677.png', 'M', '123', 'Mod');

insert into usuario (nomeUsuario, emailUsuario, fotoUsuario, generoUsuario, senhaUsuario, permicao)
values 
('Ana', 'ana@gmail.com', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/677.png', 'F', '123', 'Usr');

insert into categoria
values
(null, 'Geral'),
(null, 'Jogos'),
(null, 'Anime e mang??'),
(null, 'TCG');

insert into subCategoria
values
-- Geral
(null, 'Novidades', 'Novidades relacionadas ao f??rum', '/img/foto.jpg', 1),
(null, 'Boas vindas', 'Novo no f??rum? apresente-se aqui', '/img/foto.jpg', 1),
(null, 'Sugest??es', 'Tem uma id??ia do que acrescentar no f??rum? poste aqui', '/img/foto.jpg', 1),
-- Jogos
(null, 'Gera????o 1','Pok??mon Red, Blue, Yellow', '/img/rbg.png', 2),
(null, 'Gera????o 2','Pok??mon Gold, Silver, Crystal.', '/img/gold.jpg', 2),
(null, 'Gera????o 3','Pok??mon Ruby, Sapphire, Emerald, Fire Red, Leaf Green', '/img/gen3.jpg', 2),
(null, 'Gera????o 4','Pok??mon Diamond, Pearl, Platinum, Heart Gold, Soul Silver.', '/img/gen4.jpg', 2),
(null, 'Gera????o 5','Pok??mon Black, White, Black 2, White 2.', '/img/gen5.jpg', 2),
(null, 'Gera????o 6','Pok??mon X, Y, Omega Ruby, Alpha Sapphirw', '/img/gen6.jpg', 2),
(null, 'Gera????o 7','Pok??mon Sun, Moon, Ultra Sun, Ultra Moon, Lets go Pikachu e Eevee', '/img/gen7.jpg', 2),
(null, 'Gera????o 8','Pok??mon Sword, Shield, Brilliant Diamond, Shinning Pearl.', '/img/gen8.jpeg', 2),
(null, 'Pok??mon GO','Assuntos sobre Pok??mon GO.', '/img/foto.jpg', 2),
(null, 'Pok??mon Unite','Assuntos sobre Pok??mon Unite.', '/img/unite.jpg', 2),
(null, 'Mystery Dungeon','Assuntos sobre Pok??mon a saga Mystery Dungeon.', '/img/mysteryDungeon.png', 2),
(null, 'Outros spin-offs','Assuntos sobre jogos que n??o fazem parte da saga principal.', '/img/colosseum.jpg', 2),
-- Anime e mang??
(null, 'Anime','Assuntos sobre o anime.', '/img/journey.jpeg', 3),
(null, 'Mang??','Assuntos sobre o mang??.', '/img/manga.jpg', 3),
-- TCG
(null, 'TCG','Assuntos sobre o jogo de cartas.', '/img/tcg.jpg', 4);

select * from usuario;

select * from subCategoria;

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Lan??amento', 'O site lan??ou', 1, 1);

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Apresenta????o', 'Oi', 1, 2);

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Apresenta????o 2', 'Oi', 2, 2);

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Apresenta????o 3', 'Oi guys', 3, 2);

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Apresenta????o Ana', 'Ol??', 4, 2);

insert into resposta (textoResposta, fkUsuario, fkTopico)
values
('Bem vindo mano!', 1, 2);

insert into resposta (textoResposta, fkUsuario, fkTopico)
values
('Bem vindo bro!', 3, 2);

insert into resposta (textoResposta, fkUsuario, fkTopico)
values
('Valeu gente!', 2, 2);

insert into resposta (textoResposta, fkUsuario, fkTopico)
values
('Bem vinda!', 1, 5);

insert into resposta (textoResposta, fkUsuario, fkTopico)
values
('Ol??! Bem vinda', 2, 5);

insert into resposta (textoResposta, fkUsuario, fkTopico)
values
('Valeu gente!', 4, 5);

select * from topico
join usuario on fkUsuario = idUsuario;

select * from resposta;

select (select count(idResposta) from resposta
join topico on fkTopico = idTopico
join subCategoria on fkSubCategoria = idSubCategoria
where idSubCategoria = 3)+ (select distinct count(idTopico)  from topico where fkSubCategoria = 3);

select count(idResposta) from resposta
join topico on fkTopico = idTopico
join subCategoria on fkSubCategoria = idSubCategoria
where idSubCategoria = 2;

select distinct count(idTopico)  from topico where fkSubCategoria = 2;

select count(idTopico) from topico;

-- Categorias, subcategoria e seus ??ltimos t??picos

SELECT 
    nomeCategoria,
    idSubCategoria AS idSCategoria,
    nomeSubCategoria,
    descricaoSubCategoria,
    fotoSubCategoria,
    COUNT(DISTINCT idTopico) AS qtdTopicos,
    (SELECT 
            COUNT(idResposta)
        FROM
            resposta
                JOIN
            topico ON fkTopico = idTopico
                JOIN
            subCategoria ON fkSubCategoria = idSubCategoria
        WHERE
            idSubCategoria = idSCategoria) + (SELECT DISTINCT
            COUNT(idTopico)
        FROM
            topico
        WHERE
            fkSubCategoria = idSCategoria) AS somaTopicoResposta,
    (SELECT 
            tituloTopico
        FROM
            topico
        WHERE
            dataHoraTopico = (SELECT 
                    MAX(dataHoraTopico)
                FROM
                    topico
                WHERE
                    fkSubCategoria = idSubCategoria)) AS nomeUltimoTopico,
    MAX(idUsuario) AS idUltimoUsuario,
    (SELECT 
            nomeUsuario
        FROM
            usuario
                JOIN
            topico ON fkUsuario = idUsuario
        WHERE
            dataHoraTopico = (SELECT 
                    MAX(dataHoraTopico)
                FROM
                    topico
                WHERE
                    fkSubCategoria = idSubCategoria)) AS autorUltimoTopico,
    (SELECT 
            fotoUsuario
        FROM
            usuario
                JOIN
            topico ON fkUsuario = idUsuario
        WHERE
            dataHoraTopico = (SELECT 
                    MAX(dataHoraTopico)
                FROM
                    topico
                WHERE
                    fkSubCategoria = idSubCategoria)) AS fotoAutorUltimoTopico,
    DATE_FORMAT(MAX(dataHoraTopico), '%d/%m/%Y') AS dataHoraUltimoTopico
FROM
    categoria
        JOIN
    subCategoria ON idCategoria = fkCategoria
        LEFT JOIN
    topico ON fkSubCategoria = idSubCategoria
        LEFT JOIN
    usuario ON idUsuario = fkUsuario
        LEFT JOIN
    resposta ON idTopico = fkTopico
GROUP BY idSubCategoria;
    
    SELECT 
    nomeCategoria,
    nomeSubCategoria,
    idTopico,
    tituloTopico,
    dataHoraTopico,
    autorTopico.nomeUsuario AS nomeAutorTopico,
    autorTopico.fotoUsuario AS fotoAutorTopico,
    DATE_FORMAT(MAX(dataHoraTopico), '%d/%m/%Y') AS dataHoraTopico,
    COUNT(idResposta) AS qtdRespostas,
    (SELECT 
            nomeUsuario
        FROM
            usuario
                JOIN
            resposta ON idUsuario = fkUsuario
        WHERE
            dataHoraResposta = (SELECT 
                    MAX(dataHoraResposta)
                FROM
                    resposta
                WHERE
                    fkTopico = idTopico)) AS autorRespostaUltimo,
    (SELECT 
            fotoUsuario
        FROM
            usuario
                JOIN
            resposta ON idUsuario = fkUsuario
        WHERE
            dataHoraResposta = (SELECT 
                    MAX(dataHoraResposta)
                FROM
                    resposta
                WHERE
                    fkTopico = idTopico)) AS fotoAutorRespostaUltimo,
    DATE_FORMAT(MAX(dataHoraResposta), '%d/%m/%Y') AS dataHoraResposta
FROM
    topico
        JOIN
    subCategoria ON fkSubCategoria = idSubCategoria
        JOIN
    categoria ON fkCategoria = idCategoria
        JOIN
    usuario AS autorTopico ON fkUsuario = autorTopico.idUsuario
        LEFT JOIN
    resposta ON idTopico = fkTopico
        LEFT JOIN
    usuario AS autorResposta ON resposta.fkUsuario = autorResposta.idUsuario
GROUP BY idTopico;
    
    -- T??pico e seus usu??rios e respostas
    SELECT
    nomeCategoria,
    nomeSubCategoria,
    tituloTopico,
    textoTopico,
    DATE_FORMAT(dataHoraTopico, '%d/%m/%Y') AS dataHoraTopico,
    usuario.idUsuario,
    usuario.nomeUsuario,
    usuario.fotoUsuario,
    usuario.generoUsuario,
    (SELECT 
            (SELECT 
                        COUNT(idTopico)
                    FROM
                        topico
                    WHERE
                        fkUsuario = 4) + (SELECT 
                        COUNT(idResposta)
                    FROM
                        resposta
                    WHERE
                        fkUsuario = usuario.idUsuario)
        ) AS qtdMensagensAutorTopico,
    textoResposta,
    DATE_FORMAT(dataHoraResposta, '%d/%m/%Y') AS dataHoraResposta,
    autorResposta.idUsuario AS idAutorResposta,
    autorResposta.nomeUsuario AS nomeAutorResposta,
    autorResposta.fotoUsuario AS fotoAutorResposta,
    autorResposta.generoUsuario AS generoAutorResposta,
    DATE_FORMAT(autorResposta.dataCadastro, '%d/%m/%Y') AS dataCadastroAutorResposta,
    (SELECT 
            (SELECT 
                        COUNT(idTopico)
                    FROM
                        topico
                    WHERE
                        fkUsuario = 4) + (SELECT 
                        COUNT(idResposta)
                    FROM
                        resposta
                    WHERE
                        fkUsuario = autorResposta.idUsuario)
        ) AS qtdMensagensAutorResposta
FROM
    topico
		JOIN
    subCategoria ON fkSubCategoria = idSubCategoria
		JOIN
    categoria ON fkCategoria = idCategoria
        JOIN
    usuario ON fkUsuario = idUsuario
        LEFT JOIN
    resposta ON idTopico = fkTopico
        LEFT JOIN
    usuario AS autorResposta ON resposta.fkUsuario = autorResposta.idUsuario
WHERE
    idTopico = 3;
    
    select count(idTopico) from topico
    where fkUsuario = 1;
    
    SELECT 
    (SELECT 
            COUNT(idTopico)
        FROM
            topico) + (SELECT 
            COUNT(idResposta)
        FROM
            resposta) AS qtdMensagens;
    
    select count(idTopico) from topico where fkUsuario = 2;
    
        select count(idResposta) from resposta where fkUsuario = 2;
create database bdForumPokemaniacos;

use bdForumPokemaniacos;

create table categoria (
	idCategoria int primary key auto_increment,
	nomeCategoria varchar(30)
);

create table usuario (
	idUsuario int primary key auto_increment,
	nomeUsuario varchar(20),
	emailUsuario varchar(30),
	fotoUsuario varchar(20),
	generoUsuario char(1),
	senhaUsuario varchar(25),
	dataCadastro datetime default current_timestamp,
	dataUltimaAtividade datetime,
	permicao char(3),
    constraint chkGeneroUsuario check (generoUsuario = 'M' or generoUsuario = 'F'),
    constraint chkPermissao check (permicao = 'Adm' or permicao = 'Mod' or permicao = 'Usr')
);

create table  subcategoria (
	idSubCategoria int primary key auto_increment,
	nomeSubCategoria varchar(30),
    descricaoSubCategoria text,
    fotoSubCategoria varchar(30),
	fkCategoria int,
	foreign key (fkCategoria) references categoria(idCategoria)
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
('Lucas123', 'lucas@gmail.com', 'defaultM.png', 'M', '123', 'Adm');

insert into usuario (nomeUsuario, emailUsuario, fotoUsuario, generoUsuario, senhaUsuario, permicao)
values 
('Lucas567', 'lucas567@gmail.com', 'defaultM.png', 'M', '123', 'Mod');

insert into categoria
values
(null, 'Geral'),
(null, 'Jogos'),
(null, 'Anime e mangá'),
(null, 'TCG'),
(null, 'Fanworks');

insert into subCategoria
values
-- Geral
(null, 'Novidades', 'Novidades relacionadas ao fórum', 'foto', 1),
(null, 'Boas vindas', 'Novo no fórum? apresente-se aqui', 'foto', 1),
(null, 'Sugestões', 'Tem uma idéia do que acrescentar no fórum? poste aqui', 'foto', 1),
-- Jogos
(null, 'Geração 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Geração 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Geração 3','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Geração 4','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Geração 5','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Geração 6','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Geração 7','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Geração 8','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Pokémon GO','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Pokémon Unite','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Mystery Dungeon','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
(null, 'Outros spin-offs','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 2),
-- Anime e mangá
(null, 'Anime','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 3),
(null, 'Mangá','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 3),
-- TCG
(null, 'TCG','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 4),
-- Fanworks
(null, 'Fangames','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 5),
(null, 'Fanarts','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet turpis sem. Sed tempus felis vel metus commodo, at dictum nunc rutrum. Sed at.', 'foto', 5);

select * from subCategoria;

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Lançamento', 'O site lançou', 1, 1);

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Apresentação', 'Oi', 2, 2);

insert into topico(tituloTopico, textoTopico, fkUsuario, fkSubCategoria)
values
('Apresentação 2', 'Oi', 1, 2);

insert into resposta (textoResposta, fkUsuario, fkTopico)
values
('Bem vindo mano!', 1, 2);

select nomeCategoria,
    idSubCategoria,
    nomeSubCategoria,
    count(distinct idTopico) as qtdTopicos,
    count(idResposta) as somaTopicoResposta,
    (select tituloTopico from topico
    where dataHoraTopico = 
        (select max(dataHoraTopico) from topico
        where fkSubCategoria = idSubCategoria)
    ) as nomeUltimoTopico,
    max(idUsuario) as idUltimoUsuario,
    (select nomeUsuario from usuario
    join topico on fkUsuario = idUsuario
    where dataHoraTopico = 
        (select max(dataHoraTopico) from topico
        where fkSubCategoria = idSubCategoria)
    ) as autorUltimoTopico,
    DATE_FORMAT(max(dataHoraTopico), '%d/%m/%Y') as dataHoraUltimoTopico
    from categoria
    join subCategoria on idCategoria = fkCategoria
    left join topico on fkSubCategoria = idSubCategoria
    left join usuario on idUsuario = fkUsuario
    left join resposta on idTopico = fkTopico
    group by idSubCategoria;
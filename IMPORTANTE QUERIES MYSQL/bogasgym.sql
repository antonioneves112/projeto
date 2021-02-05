/*create database bogasteam;*/

use bogasteam;
create table instrutores( 
nif int primary key,
nome nvarchar (120) not null ,
foto LONGBLOB,
contacto nvarchar (9),
email varchar(120)

)engine InnoDB;

delete from instrutores WHERE nif <> 1 ;
insert into instrutores (nif,nome,contacto,email,id_modalidade) value  (273666541,'António Neves', '911933140','antonio.carlos.cosme.boturao@gmail.com', 1), 
(273666542,'José Neves', '934821799','boturao@netcabo.pt',3),
(273666581,'Lúcia Neves', '934794463','lgcosme@gmail.com',2);


create table modalidades (
id_modalidade int auto_increment primary key,
modalidade nvarchar(120) not null unique
);


insert into modalidades (modalidade) values('Kickboxing'),('Boxe'),('Muay-Thai'),('Jiu-jitsu');

 /*alter table instrutores add constraint fkmodalidadeintrutor foreign key (id_modalidade) references modalidades(id_modalidade);
 */
 
 select * from instrutores AS i inner join modalidades m on i.id_modalidade = m.id_modalidade;
 

 update instrutores set id_modalidade = 1 WHERE nif = 273666541;
 
 /*drop table socio;*/
 
 create table socios (
 nif_socio int primary key,
 nome_socio nvarchar (120) not null,
 foto LONGBLOB,
 morada nvarchar(250),
 email nvarchar(120),
 telefone nvarchar (9),
 nib nvarchar (120)
 )engine InnoDB;
 
 insert into socios (nif_socio,nome_socio,morada,email,telefone,nib) values 
 (123456789,'José Arnaldo','Praça Natália Correia Nº5 3ºDRT , 2720-414 AMADORA','hernesto8@gmail.com','964794487',' 0038 0000 35255393301 42'),
 (213456789,'Tiago Arnaldo','Praça Natália Correia Nº5 3ºDRT , 2720-414 AMADORA','h8@gmail.com','964494487',' 1138 0000 35255393301 42'),
  (213456799,'Eduardo Pereira','Praça Natália Correia Nº5 3ºDRT , 2720-414 AMADORA','edu@gmail.com','914598487',' 0007 0000 35255393301 42');
 
 
 /*select * from socios;*/
 
 create table aulas (
 id_aula int auto_increment primary key,
 nif_instrutor int,
 constraint fk_aulas_instrutor foreign key (nif_instrutor) references instrutores(nif)
 
 )engine InnoDB;
 
 
 insert into aulas (nif_instrutor) values (273666541),(273666542);

/*
select * from aulas;
select * from instrutores , aulas;
select * from instrutores AS i inner join aulas AS a on i.nif=a.nif_instrutor;
*/

create table horarios (
id_aula int ,
dia_semana enum ('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'),
inicio time ,
fim time,
constraint pkhorarios primary key (id_aula,dia_semana,inicio)

)engine InnoDB;


insert into horarios (id_aula,dia_semana,inicio,fim) values (1,'Segunda','17:00:00','18:30:00'),(1,'Terça','17:00:00','18:30:00'),(1,'Quinta','17:00:00','18:30:00'),
(2,'Segunda','19:45:00','20:30:00'),(2,'Quarta','19:45:00','20:30:00'),(2,'Sexta','19:45:00','20:30:00');

select i.nome,a.id_aula,h.dia_semana,h.inicio,h.fim, TIMESTAMPDIFF(second,inicio,fim)/60 as tempo from instrutores i inner join aulas AS a on i.nif = a.nif_instrutor 
inner join horarios as h on h.id_aula = a.id_aula;

create table turmas (
nif_socio int,
id_aula int,
constraint pkturma primary key (nif_socio,id_aula), 
constraint fkturmasocio foreign key (nif_socio) references socios(nif_socio),
constraint fkturmasaula foreign key (id_aula) references aulas(id_aula) 
)engine InnoDB;

/*
select * from socios;
select * from aulas;

drop table turma;
*/

insert into turmas (nif_socio,id_aula) values (123456789,1),(213456789,1),(213456799,1),(123456789,2);

select s.* from instrutores AS i inner join aulas as a on a.nif_instrutor = i.nif
inner join turmas t on t.id_aula = a.id_aula
inner join socios s on s.nif_socio = t.nif_socio WHERE i.nome like 'António Neves';

/*
drop table mensalidade;
*/

create table mensalidade (
id_mensalidade int primary key auto_increment,
nif_socio int,
constraint  fkmensalidadesocio foreign key (nif_socio) references socios(nif_socio),
data_vencimento date not null ,
data_pagamento date,
valor decimal (15,2)
)engine InnoDB;

insert into mensalidade (nif_socio,data_vencimento) values (123456789,'2021-01-01'),(123456789,'2021-02-01');
CREATE DATABASE `bogasteam` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


select * from horarios;

delete from horarios where id_aula >0;




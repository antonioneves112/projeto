use bogasteam;

select * from modalidades;

alter table modalidades add nif_instrutor int;
alter table modalidades add constraint fkmodalidadesinstrutor foreign key (nif_instrutor) references instrutores (nif) on update cascade on delete cascade;

insert into modalidades (id_modalidade,modalidade) VALUES ('5','Kickboxing Manhã');


delete from modalidades where id_modalidade = 87;

select * from socios;
use bogasteam;
select * from turmas;
select  id_modalidade, modalidade from modalidades

select * from modalidades;

select * from instrutores;

alter table instrutores drop foto;

alter table instrutores add foto nvarchar(250);

update  instrutores set foto='img/miguelcara.JPG' where nif=240250931;

select * from socios;

select * from instrutores;

update instrutores set id_modalidade=116 where nif = 222351225;
update instrutores set id_modalidade=117 where nif = 240250931

alter table modalidades drop column nif_instrutor; 
alter table modalidades drop constraint fkmodalidadesinstrutor; 

insert into aulas (nif_instrutor) values (222351225),(240250931),(273666541),(987456321);

select * from aulas;
select * from aulas;

use bogasteam;
insert into turmas(nif_socio,id_aula) values (272086258,18),(252997204,18),(254348033,17);

insert into turmas(nif_socio,id_aula) values (242159843,17);

delete from aulas where id_aula>0;

select i.nif,i.nome, t.id_aula, s.nome_socio from instrutores AS i inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas AS t
on t.id_aula = a.id_aula inner join socios AS s on s.nif_socio = t.nif_socio order by a.nif_instrutor;

select * from aulas;
select * from turmas;


select  s.*  from instrutores AS i  inner join aulas AS a on i.nif = a.nif_instrutor 
inner join turmas AS t on t.id_aula = a.id_aula inner join socios AS s on s.nif_socio = t.nif_socio where i.nif = 222351225;

delete from turma where nif

alter table turmas add constraint uc_turma unique ()

insert into instrutores (foto) values ('img/eddy.JPG') where nif = 987456321;

select * modalidades;

delete from instrutores where nome='Edson Anilton da Veiga Semedo';



use bogasteamremote;

select * from socios;
select * from instrutores;
select * from turmas;
select * from aulas;
select * from mensalidade;
select m.*, i.nome from modalidades AS m inner join instrutores AS i on m.nif_instrutor = i.nif;

create view VIEW_modalidadessocios AS 
select m.modalidade, s.nif_socio from modalidades AS m inner join instrutores AS i on m.nif_instrutor = i.nif 
inner join aulas AS a on a.nif_instrutor = i.nif inner join turmas AS t on t.id_aula = a.id_aula 
inner join socios AS s on s.nif_socio = t.nif_socio;
 

select i.*,m.modalidade from instrutores AS i  inner join modalidades AS m on i.id_modalidade=m.id_modalidade; 
select * from socios AS s inner join modalidades AS m on  

select * from VIEW_modalidadessocios;
select * from socios AS s inner join VIEW_modalidadessocios AS v on s.nif_socio = v.nif_socio;

 
insert into modalidades (modalidade,nif_instrutor) values ('Kickboxing Bogas',222351225); 
update instrutores set foto = 'img/edson.PNG' where nif = 267925484;
delete from modalidades where id_modalidade = null;




select  s.*  from instrutores AS i  inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas AS t on t.id_aula = a.id_aula inner join socios AS s on s.nif_socio = t.nif_socio where i.nif =273666541;
select * from instrutores AS i inner join modalidades AS m on 

select * from socios;

delimiter //
create trigger trgpagou before update 
on mensalidade 
for each row 
begin
if NEW.data_pagamento is null then
set NEW.pago = 0; 
else
set NEW.pago= 1;
end if; 
 end //
delimiter ;
select * from mensalidade;
update mensalidade set data_pagamento = null where id_mensalidade = 45;
update mensalidade set data_pagamento = '2021/03/01'  where id_mensalidade = 45;
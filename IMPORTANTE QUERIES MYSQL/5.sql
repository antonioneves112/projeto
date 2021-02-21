use bogasteamremote;
alter table mensalidade change  data_pagamento  data_pagamento  date;
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

select * from mensalidade;

delete from mensalidade where id_mensalidade <59;


select  s.*  from instrutores AS i  inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas AS t on t.id_aula = a.id_aula inner join socios AS s on s.nif_socio = t.nif_socio where i.nif =273666541;
select * from instrutores AS i inner join modalidades AS m on 

select * from socios;
drop trigger trgpagou

delimiter //
create trigger trgpagou before update 
on mensalidade 
for each row 
begin
if (old.data_pagamento is null) then  
set new.pago = 0; 
else
set  new.pago = 1;
end if;
 end //
delimiter ;
 
 
 DELIMITER $$
CREATE TRIGGER `sku_after_update` AFTER UPDATE ON `uau3h_virtuemart_order_items` 
  FOR EACH ROW
  BEGIN
    IF (old.order_item_sku_copy != new.order_item_sku)
    THEN
    UPDATE uau3h_virtuemart_orders
        SET order_item_sku_copy=new.order_item_sku,                      
    WHERE virtuemart_order_id=new.virtuemart_order_id;
    END IF;
  END$$
DELIMITER ;

delimiter //
create trigger trgpagar before insert 
on mensalidade 
for each row 
begin
if (new.data_pagamento is null) then  
set new.pago = 0; 
else
set  new.pago = 1;
end if;
 end //
delimiter ;


) where id_mensalidade = old.id_mensalidade;
 end //
delimiter ;
select * from mensalidade;
update mensalidade set data_pagamento = null where id_mensalidade = 4;
update mensalidade set data_pagamento = '2021/03/01'  where id_mensalidade = 48;

select * from mensalidade;

select * from socios  AS s where exists(
 select * from mensalidade m where m.pago=0 and s.nif_socio =m.nif_socio  
) ;
alter table mensalidade change data_vencimento data_vencimento date not null;
DESC mensalidade;
delete from mensalidade where id_mensalidade <> 0;
alter table mensalidade add column data_criacao timestamp default current_timestamp;
alter table mensalidade change data_criacao data_update timestamp default current_timestamp; 
alter table mensalidade add constraint uc unique(nif_socio,month(data_vencimento));
alter table mensalidade drop constraint uc;
ADD CONSTRAINT UC_Person UNIQUE (ID,LastName);

alter table mensalidade add column mes int check (mes between 1 and 12);
drop trigger trg_mes_insert;
DELIMITER // 
create trigger trg_mes_insert before insert on mensalidade 
for each row 
begin 
set NEW.mes = month (NEW.data_vencimento);
end //
DELIMITER ; 













delete from mensalidades where id_mensalidade > 0;




drop trigger trg_mes_update
DELIMITER // 
create trigger trg_mes_update before update on mensalidade 
for each row 
begin 
if(new.data_pagamento != null) then
 set  new.pago=1;
end if;
set NEW.mes = month (NEW.data_vencimento);
end //

DROP procedure if exists cria_mensalidades2;
DELIMITER //
create procedure cria_mensalidades2 (in datavencimento varchar(120)) 
begin 
set  mydata = STR_TO_DATE(datavencimento, "%d %m %Y");
insert into mensalidade (nif_socio,data_vencimento,valor) select nif_socio, datavencimento ,25 from socios AS s ;

end //

call cria_mensalidades ('2021-04-01');

select  * from mensalidade;
delete from mensalidade where id_mensalidade>0;

show create table mensalidade;

 'CREATE TABLE `mensalidade` (\n  `id_mensalidade` int NOT NULL AUTO_INCREMENT,\n  `nif_socio` int DEFAULT NULL,\n  `data_vencimento` date NOT NULL,\n  `data_pagamento` date DEFAULT NULL,\n  `valor` decimal(15,2) DEFAULT NULL,\n  `pago` tinyint(1) DEFAULT NULL,\n  `data_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP,\n  `mes` int DEFAULT NULL,\n  PRIMARY KEY (`id_mensalidade`),\n  UNIQUE KEY `uc` (`nif_socio`,`mes`),\n  KEY `fkmensalidadesocio` (`nif_socio`),\n  CONSTRAINT `fkmensalidadesocio` FOREIGN KEY (`nif_socio`) REFERENCES `socios` (`nif_socio`),\n  CONSTRAINT `mensalidade_chk_1` CHECK ((`mes` between 1 and 12))\n) ENGINE=InnoDB AUTO_INCREMENT=1011 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'


SELECT  -- dd/MM/yyyy format
select * from mensalidade;
'CREATE TABLE `mensalidade` (
  `id_mensalidade` int NOT NULL AUTO_INCREMENT,
  `nif_socio` int DEFAULT NULL,
  `data_vencimento` date NOT NULL,
  `data_pagamento` date DEFAULT NULL,
  `valor` decimal(15,2) DEFAULT NULL,
  `pago` tinyint(1) DEFAULT NULL,
  `data_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mes` int DEFAULT NULL,
  PRIMARY KEY (`id_mensalidade`),
  UNIQUE KEY `uc` (`nif_socio`,`mes`),
  KEY `fkmensalidadesocio` (`nif_socio`),
  CONSTRAINT `fkmensalidadesocio` FOREIGN KEY (`nif_socio`) REFERENCES `socios` (`nif_socio`),
  CONSTRAINT `mensalidade_chk_1` CHECK ((`mes` between 1 and 12))
) ENGINE=InnoDB AUTO_INCREMENT=1011 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci'

DROP procedure if exists cria_mensalidades;
DELIMITER //
create procedure cria_mensalidades (in datavencimento varchar(50)) 
begin 
insert into mensalidade (nif_socio,data_vencimento,valor, mes) select nif_socio, datavencimento ,25, month(datavencimento) m from socios AS s ;

end //


DELIMITER ;

select * from mensalidade;
update mensalidade set data_pagamento = '2021/09/09' where id_mensalidade= 68;

delete from mensalidade where id_mensalidade >0;

update mensalidade set data_vencimento = '2021/10/29' where id_mensalidade=67;

DESC mensalidade;

select * from mensalidade where mes=2;
insert into mensalidade (nif_socio,data_vencimento) VALUES ('130829692','2021/08/01'); 

alter table mensalidade add constraint uc unique(nif_socio,mes); 

delete from mensalidade where id_mensalidade<>0;

select m.*,s.nome_socio from mensalidade AS m inner join socios as s on m.nif_socio=s.nif_socio order by data_vencimento; 

update instrutores set foto='img/cara-paulo.PNG' where nif=258393254;
drop event mensalidadesmes
DELIMITER $$
CREATE EVENT mensalidadesmes
ON SCHEDULE EVERY '1' MONTH
STARTS '2021-2-20 22:15:00'
DO 
BEGIN
DECLARE data date default now();
call cria_mensalidades(data);
END$$

DELIMITER ;
select * from mensalidade;
select * from modalidades;
connection.query("call procedure_name(?,?)", [param1, param2], function (err, result) {
    if (err) {
        console.log("err:", err);
    } else {
        console.log("results:", result);
    }

});



select i.*,m.modalidade from instrutores AS i  inner join modalidades AS m on i.id_modalidade=m.id_modalidade; 


select * from socios AS s inner join modalidades AS m on  

select m.*,s.nome_socio from socios AS s  inner join mensalidade AS m on s.nif_socio = m.nif_socio order by data_vencimento desc;

update mensalidade set data_pagamento = '2021/04/22' where nif_socio = '222983515';

select * from mensalidade;

drop trigger if exists trg_mes_update;
DELIMITER // 
create trigger trg_mes_update before update on mensalidade 
for each row 
begin 
set NEW.mes = month (NEW.data_vencimento);
if (NEW.data_pagamento <> null ) then
 SET new.pago= 1;
end if;
end //
DELIMITER ; 



drop trigger if exists trg_mes_update;
DELIMITER // 
create trigger trg_mes_update after update on mensalidade 
for each row 
begin 
update mensalidade set mes = month (NEW.data_vencimento);

if (old.data_pagamento <> null ) then
update mensalidade set pago = 1;
end if;
end //
DELIMITER ; 

update mensalidade set data_pagamento='?' where id_mensalidade='?';

update mensalidade set data_pagamento='2026/09/01' where id_mensalidade=116;

select * from mensalidade;

select * from socios AS s inner join VIEW_modalidadessocios AS v on s.nif_socio = v.nif_socio;

select i.nif,i.nome, t.id_aula, s.nome_socio, t.nif_socio from instrutores AS i inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas AS t on t.id_aula = a.id_aula inner join socios AS s on s.nif_socio = t.nif_socio order by a.nif_instrutor;

DELIMITER //
create function divida(nifsocio int ) returns boolean 
begin 
if exists (select * from mensalidade where nif_socio = nifsocio AND pago = 0) then return true ;
else return false; 
end if;
end //
DELIMITER ; 

select *,divida(nif_socio) AS divida from socios;
select * from mensalidade;

create view socios_divida AS sd 
select * from socios inner join 


update mensalidade set data_pagamento = '2021/02/13', pago = 1 where id_mensalidade >= 149;

select * from turmas;

select * from instrutores;

select * from socios;

select *from aulas;
select * from modalidades;

select * from modalidades;

insert into turmas (nif_socio,id_aula) VALUES (741789987,24);



delete from turmas where nif_socio='123456789';



delete from modalidades where id_modalidade = 116;

select *  from VIEW_modalidadessocios order by nif_socio;
select * from socios;
select * from mensalidade;
select s.nif_socio from socios AS s inner left VIEW_modalidadessocios AS v on s.nif_socio = v.nif_socio;


select id_aula, concat(i.nome ,' - ' , m.modalidade) as descricao from  instrutores i inner join  modalidades m  on m.id_modalidade =i.id_modalidade  
inner join aulas a on a.nif_instrutor =i.nif;


select s.nif_socio,s.nome_socio from socios AS s;

select * from turmas;
select * from View_ListarTurma order by nome;
select * from instrutores;

drop view View_ListarTurma;
create view View_ListarTurma
as
select t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio
     inner join aulas a on a.id_aula = t.id_aula 
     inner join instrutores i on a.nif_instrutor = i.nif
     inner join modalidades m on m.id_modalidade = i.id_modalidade;


select * from View_ListarTurma;
select * from mensalidade;

select * from turmas;

delete from turmas where nif_socio=? and id_aula=?;
delete from modalidades where id_modalidade = 116;
select * from modalidades;
update instrutores set id_modalidade = 139 where nif=273666541;
select * from instrutores; 

select * from turmas inner join;

select t.id_aula,m.modalidade, i.nome, t.nif_socio, s.nome_socio from turmas t inner join socios s on s.nif_socio = t.nif_socio inner join aulas a on a.id_aula = t.id_aula   inner join instrutores i on a.nif_instrutor = i.nif inner join modalidades m on m.id_modalidade = i.id_modalidade;

delete from socios where nif_socio=111111111;

delete from  mensalidade where id_mensalidade >0;
select * from modalidades;

select * from instrutores;

update instrutores set foto='';

select i.*,m.modalidade from instrutores AS i inner join modalidades AS m on i.nif=m.nif_instrutor where nome='222351225'; 

select * from instrutores;
delete from instrutores where nif=123456789;

delete from mensalidade where id_mensalidade>0;
select * from modalidades;

SELECT m.*, i.nome from modalidades AS m left join instrutores AS i on m.nif_instrutor = i.nif;
select * from mensalidade;
delete from mensalidade where id_mensalidade >0;

select * from instrutores;
select * from modalidades;

update modalidades set nif_instrutor=258393254 where id_modalidade=153;

delete from instrutores where id_modalidade = 152;
delete from instrutores where nif=123456798;

select i.*, m.modalidade from instrutores AS i inner join modalidades AS m on  i.id_modalidade =  m.id_modalidade;
select * from turmas;
SELECT m.*,i.nome from modalidades AS m inner join instrutores AS i on m.id_modalidade = i.id_modalidade;

select * from instrutores AS i inner

select * from socios AS s inner join turmas AS t on s.nif_socio=t.nif_socio inner aula AS a on a.id_aula=t.id_aula inner instrutores AS i on i.nif=a.nif_instrutor; 

select DISTINCT a.id_aula,m.modalidade  from turmas AS t inner join aulas AS a on t.id_aula=a.id_aula right join modalidades AS m on m.nif_instrutor = a.nif_instrutor;
select * from instrutores AS i inner join modalidades AS m on i.id_modalidade=m.id_modalidade  where nif=273666541;
select * from turmas;
select * from modalidades;
insert into aulas (nif_instrutor) values ()
update modalidades set nif_instrutor = 258393254 where id_modalidade=153;
select * from aulas;
insert into aulas (nif_instrutor) VALUES (258393254 );
select * from aulas;
delete from aulas where nif_instrutor='258393254';
select * from instrutores;
select distinct (id_aula)  from turmas;
select t.*,m.modalidade,i.nome,s.nif_socio,nome_socio from turmas AS t inner join socios AS s on t.nif_socio = s.nif_socio inner join aulas AS a on t.id_aula = a.id_aula inner join instrutores AS i on i.nif = a.nif_instrutor inner join modalidades AS m on m.id_modalidade = i.id_modalidade;

select * from mensalidade AS m inner join socios AS s on m.nif_socio=s.nif_socio;
select s.nome_socio from socios AS s inner join turmas AS t on s.nif_socio=t.nif_socio inner join aulas AS a on a.id_aula= t.id_aula inner join instrutores AS i on i.nif=a.nif_instrutor where i.nif=273666541;




select t.*,m.modalidade,i.nome,s.nif_socio,nome_socio from turmas AS t inner join socios AS s on t.nif_socio = s.nif_socio inner join aulas AS a on t.id_aula = a.id_aula inner join instrutores AS i on i.nif = a.nif_instrutor inner join modalidades AS m on m.id_modalidade = i.id_modalidade inner mensalidades AS me on me.nif_socio=s.nif_socio;


select * from turmas AS t inner join socios AS s on t.nif_socio=s.nif_socio inner join aulas AS a on a.id_aula=t.id_aula inner join ;

select a.id_aula,mo.modalidade,i.nome,me.pago,s.nome_socio from instrutores AS i inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas as t on a.id_aula=t.id_aula inner join socios as s on s.nif_socio=t.nif_socio inner join mensalidade AS me on me.nif_socio=s.nif_socio inner join modalidades AS mo on mo.nif_instrutor=nif where s.nif_socio=222983515;

select * from socios;



select distinct(s.nome_socio),a.id_aula,mo.modalidade,i.nome,me.pago from instrutores AS i inner join aulas AS a on i.nif = a.nif_instrutor inner join turmas as t on a.id_aula=t.id_aula inner join socios as s on s.nif_socio=t.nif_socio inner join mensalidade AS me on me.nif_socio=s.nif_socio inner join modalidades AS mo on mo.nif_instrutor=nif;

select * from modalidades AS m inner join instrutores AS i on m.id_modalidade=i.id_modalidade inner join aulas AS a on i.nif=a.nif_instrutor inner join turmas as t on a.id_aula=t.id_aula inner join socios as s on t.nif_socio = s.nif_socio;


select a.*,i.nome from aulas AS a inner join instrutores AS i on i.nif = a.nif_instrutor;


delete from mensalidade where id_mensalidade>0;

select * from mensalidade;






delete from mensalidade where id_mensalidade>0;



delete from modalidades where id_modalidade = 152;

select * from aulas;

select * from modalidades;

select * from horarios;


select a.*,m.nome from aulas AS a inner modalidades AS m on a.nif_instrutor=m.nif_instrutor; 

select a.*,m.modalidade from aulas AS a inner join modalidades AS m on a.nif_instrutor=m.nif_instrutor;

insert into horarios (id_aula,dia_semana,inicio,fim) VALUES (21,'Quinta','17:00','18:30');

update horarios set fim='21:30' where id_aula=23;  

select h.*,m.modalidade from horarios AS h inner join aulas AS a on a.id_aula=h.id_aula inner join instrutores AS i on i.nif=a.nif_instrutor inner join modalidades AS m on m.nif_instrutor=i.nif; 

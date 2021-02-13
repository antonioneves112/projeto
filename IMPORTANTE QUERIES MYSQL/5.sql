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

DELIMITER // 
create trigger trg_mes_insert before insert on mensalidade 
for each row 
begin 
set NEW.mes = month (NEW.data_vencimento);
end //
DELIMITER ; 


DELIMITER // 
create trigger trg_mes_update before update on mensalidade 
for each row 
begin 
set NEW.mes = month (NEW.data_vencimento);
end //
DELIMITER ; 

DROP procedure if exists cria_mensalidades;
DELIMITER //
create procedure cria_mensalidades (in datavencimento date) 
begin 
insert into mensalidade (nif_socio,data_vencimento,valor) select nif_socio, datavencimento,25 from socios AS s ;

end //


DELIMITER ;
call cria_mensalidades('2021/08/08');
select * from mensalidade;
update mensalidade set data_pagamento = '2021/09/09' where id_mensalidade= 68;



update mensalidade set data_vencimento = '2021/10/29' where id_mensalidade=67;

DESC mensalidade;

select * from mensalidade;
insert into mensalidade (nif_socio,data_vencimento) VALUES ('130829692','2021/08/01'); 

alter table mensalidade add constraint uc unique(nif_socio,mes); 

delete from mensalidade where id_mensalidade<>0;

select * from mensalidade join 


DELIMITER $$
CREATE EVENT mensalidadesmes
ON SCHEDULE EVERY '1' MONTH
STARTS '2021-2-12 19:18:00'
DO 
BEGIN
DECLARE data date default now();
call cria_mensalidades(data);
END$$

DELIMITER ;


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

update mensalidade set data_pagamento='?' where id_mensalidade='?';

update mensalidade set data_pagamento='2025/02/01' where id_mensalidade=103;

select * from mensalidade;


























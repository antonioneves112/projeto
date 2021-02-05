use bogasteam;

select * from instrutores;


insert into instrutores (nif, nome, contacto, email) VALUES ('273666589','Edson Moreira','911933140','edson@gmail.com');

update instrutores set nome ='poiu',contacto ='91777777' , email ='reidelas@gmail.com'  WHERE nif = '1'; 

insert into instrutores (nif, nome, contacto, email),id_ VALUES ('2736665','Edson Moreira','911933140','edson@gmail.com');

select * from modalidades;

alter table modalidades add nif_instrutor int;

alter table modalidades add  constraint fkmodalidadeinstrutor foreign key (nif_instrutor) references instrutores (nif);
alter table modalidades drop constraint fkmodalidadeinstrutor;
alter table modalidades drop nif_instrutor;

select * from modalidades;


CREATE TABLE mensalidade (
  id_mensalidade int NOT NULL AUTO_INCREMENT,
  nif_socio int DEFAULT NULL,
  data_vencimento date NOT NULL,
  data_pagamento date DEFAULT NULL,
  valor decimal(15,2) DEFAULT NULL,
  pago tinyint(1) DEFAULT NULL,
  data_update timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  mes int DEFAULT NULL,
  PRIMARY KEY (id_mensalidade),
  UNIQUE KEY uc (nif_socio,mes),
  KEY fkmensalidadesocio (nif_socio),
  CONSTRAINT fkmensalidadesocio FOREIGN KEY (nif_socio) REFERENCES socios (nif_socio),
  CONSTRAINT mensalidade_chk_1 CHECK ((mes between 1 and 12))
) ENGINE=InnoDB AUTO_INCREMENT=1911 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE socios (
  nif_socio int NOT NULL,
  nome_socio varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  foto longblob,
  morada varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  email varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  telefone varchar(9) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  nib varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (nif_socio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE turmas (
  nif_socio int NOT NULL,
  id_aula int NOT NULL,
  PRIMARY KEY (nif_socio,id_aula),
  KEY fkturmasaula (id_aula),
  CONSTRAINT fkturmasaula FOREIGN KEY (id_aula) REFERENCES aulas (id_aula),
  CONSTRAINT fkturmasocio FOREIGN KEY (nif_socio) REFERENCES socios (nif_socio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE aulas (
  id_aula int NOT NULL AUTO_INCREMENT,
  nif_instrutor int DEFAULT NULL,
  PRIMARY KEY (id_aula),
  KEY fk_aulas_instrutor (nif_instrutor),
  CONSTRAINT fk_aulas_instrutor FOREIGN KEY (nif_instrutor) REFERENCES instrutores (nif)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE instrutores (
  nif int NOT NULL,
  nome varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  contacto varchar(9) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  email varchar(120) DEFAULT NULL,
  id_modalidade int DEFAULT NULL,
  foto varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (nif),
  KEY fkmodalidadeintrutor (id_modalidade),
  CONSTRAINT fkmodalidadeintrutor FOREIGN KEY (id_modalidade) REFERENCES modalidades (id_modalidade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE horarios (
  id_horario int NOT NULL AUTO_INCREMENT,
  id_aula int NOT NULL,
  dia_semana enum('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo') NOT NULL,
  inicio time NOT NULL,
  fim time DEFAULT NULL,
  PRIMARY KEY (id_horario),
  UNIQUE KEY id_aula (id_aula,dia_semana,inicio),
  CONSTRAINT fkhorariosaulas FOREIGN KEY (id_aula) REFERENCES aulas (id_aula)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE modalidades (
  id_modalidade int NOT NULL AUTO_INCREMENT,
  modalidade varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  nif_instrutor int DEFAULT NULL,
  PRIMARY KEY (id_modalidade),
  UNIQUE KEY modalidade (modalidade),
  KEY fkmodalidadesinstrutor (nif_instrutor)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




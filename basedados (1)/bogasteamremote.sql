-- phpMyAdmin SQL Dump
-- version 5.1.0-rc2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 22-Fev-2021 às 02:22
-- Versão do servidor: 8.0.23
-- versão do PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bogasteamremote`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`antonioneves112`@`%` PROCEDURE `cria_mensalidades2` (IN `datavencimento` VARCHAR(120))  begin 
insert into mensalidade (nif_socio,data_vencimento,valor, mes) select nif_socio,  STR_TO_DATE(datavencimento, "%d %m %Y") ,25, month( STR_TO_DATE(datavencimento, "%d %m %Y")) from socios AS s ;

end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `aulas`
--

CREATE TABLE `aulas` (
  `id_aula` int NOT NULL,
  `nif_instrutor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `aulas`
--

INSERT INTO `aulas` (`id_aula`, `nif_instrutor`) VALUES
(49, NULL),
(50, NULL),
(51, NULL),
(52, NULL),
(53, NULL),
(54, NULL),
(22, 222351225),
(23, 240250931),
(55, 267925484),
(21, 273666541);

-- --------------------------------------------------------

--
-- Estrutura da tabela `horarios`
--

CREATE TABLE `horarios` (
  `id_horario` int NOT NULL,
  `id_aula` int NOT NULL,
  `dia_semana` enum('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo') NOT NULL,
  `inicio` time NOT NULL,
  `fim` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `horarios`
--

INSERT INTO `horarios` (`id_horario`, `id_aula`, `dia_semana`, `inicio`, `fim`) VALUES
(3, 21, 'Segunda', '17:00:00', '18:30:00'),
(4, 21, 'Terça', '17:00:00', '18:30:00'),
(5, 21, 'Quinta', '17:00:00', '18:30:00'),
(6, 22, 'Segunda', '19:00:00', '20:30:00'),
(7, 22, 'Quarta', '19:00:00', '20:30:00'),
(8, 22, 'Sexta', '19:00:00', '20:30:00'),
(9, 23, 'Terça', '20:00:00', '21:30:00'),
(10, 23, 'Quinta', '20:00:00', '21:30:00'),
(11, 23, 'Sábado', '19:00:00', '20:30:00'),
(12, 55, 'Segunda', '07:00:00', '08:00:00'),
(13, 23, 'Quarta', '07:00:00', '08:00:00'),
(14, 55, 'Sexta', '07:00:00', '08:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `instrutores`
--

CREATE TABLE `instrutores` (
  `nif` int NOT NULL,
  `nome` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `contacto` varchar(9) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `id_modalidade` int DEFAULT NULL,
  `foto` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `instrutores`
--

INSERT INTO `instrutores` (`nif`, `nome`, `contacto`, `email`, `id_modalidade`, `foto`) VALUES
(222351225, 'José Ricardo Rodrigues Pereira de Oliveira', '914367087', 'ricardo.bogas@gmail.com', 137, 'img/bogascara.JPG'),
(240250931, 'Miguel Ângelo Segerei Ramos', '927428004', 'miguelangelo_r9@hotmail.com', 117, 'img/miguelcara.JPG'),
(258393254, 'Paulo Caro', '925824312', 'Paulo.sergio.caro@gmail.com', 153, 'img/cara-paulo.PNG'),
(267925484, 'Edson Anilton da Veiga Semedo', '968033713', 'edson.semedo1992@gmail.com', 136, 'img/edson.PNG'),
(273666541, 'António Carlos Cosme da Graça Boturão das Neves', '911933140', 'Antonio.carlos.cosme.boturao@gmail.com', 139, 'img/nevinhos.JPG');

-- --------------------------------------------------------

--
-- Estrutura da tabela `mensalidade`
--

CREATE TABLE `mensalidade` (
  `id_mensalidade` int NOT NULL,
  `nif_socio` int DEFAULT NULL,
  `data_vencimento` date NOT NULL,
  `data_pagamento` date DEFAULT NULL,
  `valor` decimal(15,2) DEFAULT NULL,
  `pago` tinyint(1) DEFAULT NULL,
  `data_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mes` int DEFAULT NULL
) ;

--
-- Extraindo dados da tabela `mensalidade`
--

INSERT INTO `mensalidade` (`id_mensalidade`, `nif_socio`, `data_vencimento`, `data_pagamento`, `valor`, `pago`, `data_update`, `mes`) VALUES
(1787, 130829692, '2021-01-01', '2021-02-22', '25.00', 1, '2021-02-20 23:01:56', 1),
(1788, 222983515, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1789, 226393038, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1790, 232159068, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1791, 232259640, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1792, 242159843, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1793, 248958046, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1794, 251159230, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1795, 252997204, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1796, 254348033, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1797, 259936480, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1798, 270525211, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1799, 271660775, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1800, 272086258, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1801, 273666541, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1802, 296747440, '2021-01-01', NULL, '25.00', 0, '2021-02-20 23:01:56', 1),
(1818, 130829692, '2021-04-01', '2021-02-20', '25.00', 1, '2021-02-20 23:03:00', 4),
(1819, 222983515, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1820, 226393038, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1821, 232159068, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1822, 232259640, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1823, 242159843, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1824, 248958046, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1825, 251159230, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1826, 252997204, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1827, 254348033, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1828, 259936480, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1829, 270525211, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1830, 271660775, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1831, 272086258, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1832, 273666541, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1833, 296747440, '2021-04-01', NULL, '25.00', 0, '2021-02-20 23:03:00', 4),
(1849, 130829692, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1850, 222983515, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1851, 226393038, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1852, 232159068, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1853, 232259640, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1854, 242159843, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1855, 248958046, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1856, 251159230, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1857, 252997204, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1858, 254348033, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1859, 259936480, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1860, 270525211, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1861, 271660775, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1862, 272086258, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1863, 273666541, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1864, 296747440, '2021-12-01', NULL, '25.00', 0, '2021-02-20 23:03:55', 12),
(1880, 130829692, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1881, 222983515, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1882, 226393038, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1883, 232159068, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1884, 232259640, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1885, 242159843, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1886, 248958046, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1887, 251159230, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1888, 252997204, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1889, 254348033, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1890, 259936480, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1891, 270525211, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1892, 271660775, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1893, 272086258, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1894, 273666541, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1895, 296747440, '2021-11-01', NULL, '25.00', 0, '2021-02-20 23:04:59', 11),
(1912, 130829692, '2021-02-21', '2021-02-21', '25.00', 1, '2021-02-21 20:18:22', NULL);

--
-- Acionadores `mensalidade`
--
DELIMITER $$
CREATE TRIGGER `trgpagar` BEFORE INSERT ON `mensalidade` FOR EACH ROW begin
if (new.data_pagamento is null) then  
set new.pago = 0; 
else
set  new.pago = 1;
end if;
 end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `modalidades`
--

CREATE TABLE `modalidades` (
  `id_modalidade` int NOT NULL,
  `modalidade` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nif_instrutor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `modalidades`
--

INSERT INTO `modalidades` (`id_modalidade`, `modalidade`, `nif_instrutor`) VALUES
(117, 'Muay Thai', 240250931),
(136, 'Treino Funcional', 267925484),
(137, 'Kickboxing Bogas', 222351225),
(139, 'Kickboxing António', 273666541),
(153, 'Kickboxing Alfragide', 258393254),
(156, 'www', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `socios`
--

CREATE TABLE `socios` (
  `nif_socio` int NOT NULL,
  `nome_socio` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `foto` longblob,
  `morada` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `telefone` varchar(9) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `nib` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `socios`
--

INSERT INTO `socios` (`nif_socio`, `nome_socio`, `foto`, `morada`, `email`, `telefone`, `nib`) VALUES
(130829692, 'João Paulo Andrade', NULL, 'R. Michel Giacometti Nº6 R/C ESQ ', 'jpmourafandrade@gmail.com', '918150740', '000700000037893467223'),
(222983515, 'Tiago Miguel Pereira do Couto', NULL, 'Praça Natália Correia Nº1 3 ESQ', 'pereiracouto7@gmail.com', '914302265', '003600049910008703294'),
(226393038, 'Rúben Figueira', NULL, 'Rua Doutor Manuel de Arriaga ', '...@gmail.com', '936204786', ''),
(232159068, 'Luana Barbosa Rodrigues Sá', NULL, 'Avenida Pangim Nº9 3 Esq', 'barbosalu7@gmail.com', '927908670', '019300001050277725294'),
(232259640, 'Tiago Goncalves', NULL, 'Rua República Da Guiné Bissau N1 Rc A', 'tiagoalexandre1990@gmail.com', '960255152', ''),
(242159843, 'Ricardo Araújo', NULL, 'Avenida da Liberdade Lote2 R/C', 'ricardo.portugal1@sapo.pt', '932925840', ''),
(248958046, 'Duarte Gonçalves Santos', NULL, 'Avenida Miguel Bombarda Nº 149 2º ESQ', 'duartegoncalvessantos@gmail.com', '967132251', '0035067300007614723025'),
(251159230, 'Ricardo Soares', NULL, 'R. Soeiro Pereira Gomes N 20 3DRT', 'ricardo.soaresgoliveira@gmail.com', '918656661', '00331000043526728'),
(252997204, 'João Pedro do Carmo Pinto', NULL, 'R. Dom Diniz nr 27 4 ESQ', 'joaopedro.pinto7@gmail.com', '933602619', '0035069200014969100042'),
(254348033, 'Nuno Rodrigues Martins', NULL, 'R. da Louceira N12 R/C  ', 'nuno-martins-16@hotmail.com', '926078608', ''),
(259936480, 'Gonçalo Mendonça', NULL, 'R. Linha de Torres N 21 ', 'goncalomendonca94@gmail.com', '936149826', ''),
(270525211, 'Nair Veiga', NULL, 'Rua Doutor Manuel de Ariaga', 'veiganair92@gmail.com', '939610139', ''),
(271660775, 'Fábio Alexandre de Matos Henriques', NULL, 'R Professor Cid dos Santos Lote 64 2 DRT', 'fabio012henriques@gmail.com', '962374006', ''),
(272086258, 'Sara das Neves Correia', NULL, 'R. Mário Sacramento lote 967 1 DRT', 'isabelneves1997@hotmail.com', '937854629', ''),
(273666541, 'António Neves', NULL, 'Praça Natália Correia n5 3drt', 'Antonio.carlos.cosme.boturao@gmail.com', '911933140', '0000000000'),
(296747440, 'Edmilson Varela Semedo', NULL, 'Rua do Vale Nº9  2ºD Rio de Mouro', 'semedomunuxu@gmail.com', '925887866', '003300004554977138505');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas`
--

CREATE TABLE `turmas` (
  `nif_socio` int NOT NULL,
  `id_aula` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `turmas`
--

INSERT INTO `turmas` (`nif_socio`, `id_aula`) VALUES
(226393038, 21),
(251159230, 21),
(252997204, 21),
(270525211, 21),
(272086258, 21),
(296747440, 21),
(130829692, 22),
(222983515, 22),
(232159068, 22),
(248958046, 22),
(271660775, 22),
(242159843, 23),
(254348033, 23),
(259936480, 23);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `View_ListarTurma`
-- (Veja abaixo para a view atual)
--
CREATE TABLE `View_ListarTurma` (
`id_aula` int
,`modalidade` varchar(120)
,`nif_socio` int
,`nome` varchar(120)
,`nome_socio` varchar(120)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para vista `VIEW_modalidadessocios`
-- (Veja abaixo para a view atual)
--
CREATE TABLE `VIEW_modalidadessocios` (
`modalidade` varchar(120)
,`nif_socio` int
);

-- --------------------------------------------------------

--
-- Estrutura para vista `View_ListarTurma`
--
DROP TABLE IF EXISTS `View_ListarTurma`;

CREATE ALGORITHM=UNDEFINED DEFINER=`antonioneves112`@`%` SQL SECURITY DEFINER VIEW `View_ListarTurma`  AS SELECT `t`.`id_aula` AS `id_aula`, `m`.`modalidade` AS `modalidade`, `i`.`nome` AS `nome`, `t`.`nif_socio` AS `nif_socio`, `s`.`nome_socio` AS `nome_socio` FROM ((((`turmas` `t` join `socios` `s` on((`s`.`nif_socio` = `t`.`nif_socio`))) join `aulas` `a` on((`a`.`id_aula` = `t`.`id_aula`))) join `instrutores` `i` on((`a`.`nif_instrutor` = `i`.`nif`))) join `modalidades` `m` on((`m`.`id_modalidade` = `i`.`id_modalidade`))) ;

-- --------------------------------------------------------

--
-- Estrutura para vista `VIEW_modalidadessocios`
--
DROP TABLE IF EXISTS `VIEW_modalidadessocios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`antonioneves112`@`%` SQL SECURITY DEFINER VIEW `VIEW_modalidadessocios`  AS SELECT `m`.`modalidade` AS `modalidade`, `s`.`nif_socio` AS `nif_socio` FROM ((((`modalidades` `m` join `instrutores` `i` on((`m`.`nif_instrutor` = `i`.`nif`))) join `aulas` `a` on((`a`.`nif_instrutor` = `i`.`nif`))) join `turmas` `t` on((`t`.`id_aula` = `a`.`id_aula`))) join `socios` `s` on((`s`.`nif_socio` = `t`.`nif_socio`))) ;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `aulas`
--
ALTER TABLE `aulas`
  ADD PRIMARY KEY (`id_aula`),
  ADD KEY `fk_aulas_instrutor` (`nif_instrutor`);

--
-- Índices para tabela `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_horario`),
  ADD UNIQUE KEY `id_aula` (`id_aula`,`dia_semana`,`inicio`);

--
-- Índices para tabela `instrutores`
--
ALTER TABLE `instrutores`
  ADD PRIMARY KEY (`nif`),
  ADD KEY `fkmodalidadeintrutor` (`id_modalidade`);

--
-- Índices para tabela `mensalidade`
--
ALTER TABLE `mensalidade`
  ADD PRIMARY KEY (`id_mensalidade`),
  ADD UNIQUE KEY `uc` (`nif_socio`,`mes`),
  ADD KEY `fkmensalidadesocio` (`nif_socio`);

--
-- Índices para tabela `modalidades`
--
ALTER TABLE `modalidades`
  ADD PRIMARY KEY (`id_modalidade`),
  ADD UNIQUE KEY `modalidade` (`modalidade`),
  ADD KEY `fkmodalidadesinstrutor` (`nif_instrutor`);

--
-- Índices para tabela `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`nif_socio`);

--
-- Índices para tabela `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`nif_socio`,`id_aula`),
  ADD KEY `fkturmasaula` (`id_aula`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aulas`
--
ALTER TABLE `aulas`
  MODIFY `id_aula` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de tabela `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `mensalidade`
--
ALTER TABLE `mensalidade`
  MODIFY `id_mensalidade` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `modalidades`
--
ALTER TABLE `modalidades`
  MODIFY `id_modalidade` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `aulas`
--
ALTER TABLE `aulas`
  ADD CONSTRAINT `fk_aulas_instrutor` FOREIGN KEY (`nif_instrutor`) REFERENCES `instrutores` (`nif`);

--
-- Limitadores para a tabela `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `fkhorariosaulas` FOREIGN KEY (`id_aula`) REFERENCES `aulas` (`id_aula`);

--
-- Limitadores para a tabela `instrutores`
--
ALTER TABLE `instrutores`
  ADD CONSTRAINT `fkmodalidadeintrutor` FOREIGN KEY (`id_modalidade`) REFERENCES `modalidades` (`id_modalidade`);

--
-- Limitadores para a tabela `mensalidade`
--
ALTER TABLE `mensalidade`
  ADD CONSTRAINT `fkmensalidadesocio` FOREIGN KEY (`nif_socio`) REFERENCES `socios` (`nif_socio`);

--
-- Limitadores para a tabela `turmas`
--
ALTER TABLE `turmas`
  ADD CONSTRAINT `fkturmasaula` FOREIGN KEY (`id_aula`) REFERENCES `aulas` (`id_aula`),
  ADD CONSTRAINT `fkturmasocio` FOREIGN KEY (`nif_socio`) REFERENCES `socios` (`nif_socio`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`antonioneves112`@`%` EVENT `mensalidadesmes` ON SCHEDULE EVERY 1 MONTH STARTS '2021-02-20 22:15:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
DECLARE data date default now();
call cria_mensalidades(data);
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

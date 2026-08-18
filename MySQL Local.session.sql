DROP DATABASE IF EXISTS `sistema_alocacao`;
CREATE DATABASE IF NOT EXISTS `sistema_alocacao`;
USE `sistema_alocacao`;

CREATE TABLE usuario (
  id_usuario INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  perfil VARCHAR(20) NULL,
  ativo BOOLEAN NULL DEFAULT TRUE,
  PRIMARY KEY (id_usuario)
);

CREATE TABLE coordenacao (
  id_coordenacao INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id_usuario INT UNSIGNED NOT NULL,
  nome VARCHAR(255) NULL,
  telefone VARCHAR(20) NULL,
  PRIMARY KEY (id_coordenacao),
  CONSTRAINT fk_coordenacao_usuario 
    FOREIGN KEY (usuario_id_usuario) 
    REFERENCES usuario (id_usuario)
);

CREATE TABLE area (
  id_area INT UNSIGNED NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(45) NULL,
  PRIMARY KEY (id_area)
);

CREATE TABLE modalidades (
  id_modalidades INT UNSIGNED NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(20) NULL,
  PRIMARY KEY (id_modalidades)
);

CREATE TABLE datas_feriados (
  id_datas_feriados INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id_datas_feriados)
);

CREATE TABLE curso (
  id_curso INT UNSIGNED NOT NULL AUTO_INCREMENT,
  datas_feriados_id_datas_feriados INT UNSIGNED NOT NULL,
  area_id_area INT UNSIGNED NOT NULL,
  modalidades_id_modalidades INT UNSIGNED NOT NULL,
  coordenacao_id_coordenacao INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_curso),
  CONSTRAINT fk_curso_coordenacao 
    FOREIGN KEY (coordenacao_id_coordenacao) 
    REFERENCES coordenacao (id_coordenacao),
  CONSTRAINT fk_curso_modalidades 
    FOREIGN KEY (modalidades_id_modalidades) 
    REFERENCES modalidades (id_modalidades),
  CONSTRAINT fk_curso_area 
    FOREIGN KEY (area_id_area) 
    REFERENCES area (id_area),
  CONSTRAINT fk_curso_datas_feriados 
    FOREIGN KEY (datas_feriados_id_datas_feriados) 
    REFERENCES datas_feriados (id_datas_feriados)
);

CREATE TABLE atividades (
  id_atividades INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id_atividades)
);

CREATE TABLE turma (
  id_turma INT UNSIGNED NOT NULL AUTO_INCREMENT,
  atividades_id_atividades INT UNSIGNED NOT NULL,
  curso_id_curso INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_turma),
  CONSTRAINT fk_turma_curso 
    FOREIGN KEY (curso_id_curso) 
    REFERENCES curso (id_curso),
  CONSTRAINT fk_turma_atividades 
    FOREIGN KEY (atividades_id_atividades) 
    REFERENCES atividades (id_atividades)
);

CREATE TABLE horario (
  id_horario INT UNSIGNED NOT NULL AUTO_INCREMENT,
  dia_semana VARCHAR(20) NULL,
  hora_inicio TIME NULL,
  hora_fim TIME NULL,
  PRIMARY KEY (id_horario)
);

CREATE TABLE sala (
  id_sala INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(20) NULL,
  tipo VARCHAR(255) NULL,
  capacidade SMALLINT UNSIGNED NULL,
  PRIMARY KEY (id_sala)
);

CREATE TABLE instrutor (
  id_instrutor INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NULL,
  cpf CHAR(11) NULL,
  PRIMARY KEY (id_instrutor)
);

CREATE TABLE instrutor_has_curso (
  instrutor_id_instrutor INT UNSIGNED NOT NULL,
  curso_id_curso INT UNSIGNED NOT NULL,
  PRIMARY KEY (instrutor_id_instrutor, curso_id_curso),
  CONSTRAINT fk_ihc_instrutor 
    FOREIGN KEY (instrutor_id_instrutor) 
    REFERENCES instrutor (id_instrutor),
  CONSTRAINT fk_ihc_curso 
    FOREIGN KEY (curso_id_curso) 
    REFERENCES curso (id_curso)
);

CREATE TABLE alocacao_aula (
  id_alocacao_aula INT UNSIGNED NOT NULL AUTO_INCREMENT,
  horario_id_horario INT UNSIGNED NOT NULL,
  sala_id_sala INT UNSIGNED NOT NULL,
  instrutor_id_instrutor INT UNSIGNED NOT NULL,
  turma_id_turma INT UNSIGNED NOT NULL,
  data_aula DATE NULL,
  PRIMARY KEY (id_alocacao_aula),
  CONSTRAINT fk_alocacao_turma 
    FOREIGN KEY (turma_id_turma) 
    REFERENCES turma (id_turma),
  CONSTRAINT fk_alocacao_instrutor 
    FOREIGN KEY (instrutor_id_instrutor) 
    REFERENCES instrutor (id_instrutor),
  CONSTRAINT fk_alocacao_sala 
    FOREIGN KEY (sala_id_sala) 
    REFERENCES sala (id_sala),
  CONSTRAINT fk_alocacao_horario 
    FOREIGN KEY (horario_id_horario) 
    REFERENCES horario (id_horario)
);
SHOW TABLES;
DESCRIBE usuario;

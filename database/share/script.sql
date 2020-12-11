DROP DATABASE IF EXISTS catering;
CREATE DATABASE catering;
USE catering;

CREATE TABLE unitate_masura(
	denumire varchar(25) NOT NULL UNIQUE,
	PRIMARY KEY(denumire));
	
INSERT INTO unitate_masura(denumire)
	VALUES('bucata'),
			('kilogram'),
			('gram'),
			('legatura');

CREATE TABLE ingredient(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	denumire varchar(50) NOT NULL UNIQUE,
	unitate_masura varchar(25) NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(unitate_masura) REFERENCES unitate_masura(denumire));
	
CREATE TABLE reteta(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	denumire varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY(ID));
	
CREATE TABLE detalii_reteta(
	ID_reteta int NOT NULL,
	ID_ingredient int NOT NULL,
	PRIMARY KEY(ID_reteta, ID_ingredient),
	FOREIGN KEY(ID_reteta) REFERENCES reteta(ID),
	FOREIGN KEY(ID_ingredient) REFERENCES ingredient(ID));
	
CREATE TABLE client(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	nume varchar(50) NOT NULL,
	adresa varchar(100),
	telefon varchar(20),
	PRIMARY KEY(ID));	
	
CREATE TABLE stare(
	denumire varchar(20) NOT NULL UNIQUE,
	PRIMARY KEY(denumire));

INSERT INTO stare(denumire)
	VALUES('preluata'),
			('in lucru'),
			('livrata');
	
CREATE TABLE comanda(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	ID_client int NOT NULL,
	stare varchar(20) NOT NULL DEFAULT('preluata'),
	PRIMARY KEY(ID),
	FOREIGN KEY(ID_client) REFERENCES client(ID),
	FOREIGN KEY(stare) REFERENCES stare(denumire));
	
CREATE TABLE detalii_comanda(
	ID_comanda int NOT NULL,
	ID_reteta int NOT NULL,
	portii int NOT NULL DEFAULT(25),
	PRIMARY KEY(ID_comanda, ID_reteta),
	FOREIGN KEY(ID_comanda) REFERENCES comanda(ID),
	FOREIGN KEY(ID_reteta) REFERENCES reteta(ID));

CREATE TABLE utilizator(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	nume varchar(50) NOT NULL,
	cont varchar(50) NOT NULL UNIQUE,
	parola varchar(255) NOT NULL,
	PRIMARY KEY(ID));

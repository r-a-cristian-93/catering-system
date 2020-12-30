DROP DATABASE IF EXISTS catering;
CREATE DATABASE catering;
USE catering;

CREATE TABLE units(
	name varchar(25) NOT NULL UNIQUE,
	PRIMARY KEY(name));
	
INSERT INTO units(name)
	VALUES('bucata'),
			('kilogram'),
			('gram'),
			('legatura');

CREATE TABLE ingredients(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	name varchar(50) NOT NULL UNIQUE,
	unit varchar(25) NOT NULL,
	price int NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(unit) REFERENCES units(name));
	
CREATE TABLE recipes(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	name varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY(ID));
	
CREATE TABLE recipe_details(
	ID_recipe int NOT NULL,
	ID_ingredient int NOT NULL,
	PRIMARY KEY(ID_recipe, ID_ingredient),
	FOREIGN KEY(ID_recipe) REFERENCES recipes(ID),
	FOREIGN KEY(ID_ingredient) REFERENCES ingredients(ID));
	
CREATE TABLE clients(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	address varchar(100),
	phone varchar(20),
	PRIMARY KEY(ID));	
	
CREATE TABLE status(
	name varchar(20) NOT NULL UNIQUE,
	PRIMARY KEY(name));

INSERT INTO status(name)
	VALUES('preluata'),
			('in lucru'),
			('livrata');
	
CREATE TABLE orders(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,
	ID_client int NOT NULL,
	status varchar(20) NOT NULL DEFAULT('preluata'),
	PRIMARY KEY(ID),
	FOREIGN KEY(ID_client) REFERENCES clients(ID),
	FOREIGN KEY(status) REFERENCES status(name));
	
CREATE TABLE order_details(
	ID_order int NOT NULL,
	ID_recipe int NOT NULL,
	servings int NOT NULL DEFAULT(25),
	PRIMARY KEY(ID_order, ID_recipe),
	FOREIGN KEY(ID_order) REFERENCES orders(ID),
	FOREIGN KEY(ID_recipe) REFERENCES recipes(ID));

CREATE TABLE emplyee(
	ID int NOT NULL UNIQUE AUTO_INCREMENT,	
	username varchar(50) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	name varchar(50),
	email varchar(50),
	PRIMARY KEY(ID));

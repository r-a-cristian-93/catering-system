-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: catering
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Str. Scurta, Nr. 33, Bl. . 2, Sc. 3, Timisoara'),(2,'Str. Valea Viilor, Nr.22, Lehliu-Gara'),(4,'Strada Ion Creang 808, Sibiu, Sibiu, Romania'),(5,'Bulevardul Tudor Arghezi 909, Bacu, Bacu, Romania'),(6,'Aleea George Cobuc 1010, Craiova, Dolj, Romania'),(7,'Strada Vasile Alecsandri 1111, Trgu-Mure, Mure, Romania'),(8,'Bulevardul Nicolae Iorga 1212, Baia-Mare, Maramure, Romania'),(9,'Aleea Ion Luca Caragiale 1313, Buzu, Buzu, Romania'),(10,'Strada Andrei Mureanu 1414, Satu-Mare, Satu Mare, Romania'),(11,'Bulevardul Lucian Blaga 1515, Focani, Vrancea, Romania'),(12,'Aleea Liviu Rebreanu 1616, Piteti, Arge, Romania'),(13,'Strada Alexandru Macedonski 1717, Trgovite, Dmbovia, Romania'),(14,'Strada Mihai Eminescu 123, Bucureti, Bucureti, Romania'),(15,'Bulevardul George Cobuc 456, Cluj-Napoca, Cluj, Romania'),(16,'Drumul Ion Creang 789, Timioara, Timi, Romania'),(18,'Strada Mircea Eliade 202, Constana, Constana, Romania'),(19,'Bulevardul Mircea Crtrescu 303, Braov, Braov, Romania'),(20,'Curtea Sadoveanu 404, Galai, Galai, Romania'),(21,'Aleea Urmuz 505, Oradea, Bihor, Romania'),(22,'Bulevardul Liviu Rebreanu 606, Ploieti, Prahova, Romania'),(23,'Strada Marin Preda 707, Arad, Arad, Romania');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (0,'-',NULL),(1,'Vasile Ciupitu',NULL),(2,'Gheorghe Lazar','0733165789'),(24,'Gabriela Radulescu','0750123456'),(25,'Catalin Gheorghiu','0742345678'),(26,'Diana Neacsu',NULL),(27,'Lucian Stanescu','0766789012'),(28,'Carmen Nistor','0751234567'),(29,'Adrian Munteanu','0743456789'),(30,'Monica Dragomir','0752345678'),(31,'Valentin Radu',NULL),(32,'Alina Stoica','0767890123'),(33,'Sorin Vasile','0753234567'),(34,'Elena Iliescu','0740123456'),(35,'Alexandru Popa','0758345678'),(36,'Ioana Draghici',NULL),(37,'Gabriel Radu','0761123456'),(38,'Mihaela Tudor','0745567890'),(39,'Victor Iancu','0754123456'),(40,'Roxana Stan','0746234567'),(41,'Cristian Balan',NULL),(42,'Andreea Dumitru','0767789012'),(43,'Marius Enache','0759345678'),(44,'Andrei Popescu','0740123456'),(45,'Ana Marinescu','0758345678'),(46,'Mihai Stefanescu',NULL),(47,'Elena Vasilescu','0761123456'),(48,'Gabriela Ionescu','0745567890'),(49,'Catalin Dumitru','0754123456'),(50,'Simona Stanescu','0746234567'),(51,'Alexandru Balan',NULL),(52,'Mihaela Cojocaru','0767789012'),(53,'Dragos Neacsu','0759345678');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_addresses`
--

DROP TABLE IF EXISTS `clients_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_addresses` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_client` int NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_addresses`
--

LOCK TABLES `clients_addresses` WRITE;
/*!40000 ALTER TABLE `clients_addresses` DISABLE KEYS */;
INSERT INTO `clients_addresses` VALUES (1,1,'Str. Scurta, Nr. 33, Bl. . 2, Sc. 3, Timisoara'),(2,1,'Str. Valea Viilor, Nr.22, Lehliu-Gara'),(4,2,'Strada Ion Creang 808, Sibiu, Sibiu, Romania'),(5,2,'Bulevardul Tudor Arghezi 909, Bacu, Bacu, Romania'),(7,2,'Aleea George Cobuc 1010, Craiova, Dolj, Romania'),(10,2,'Strada Pacanelelor, Nr 33A');
/*!40000 ALTER TABLE `clients_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debug_var`
--

DROP TABLE IF EXISTS `debug_var`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debug_var` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `value` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debug_var`
--

LOCK TABLES `debug_var` WRITE;
/*!40000 ALTER TABLE `debug_var` DISABLE KEYS */;
/*!40000 ALTER TABLE `debug_var` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `role` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `username` (`username`),
  KEY `role` (`role`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'admin','$2a$10$AH4ZhACPDDDMnOBbw2fSyun3aSbGOlPHi.J7TBbf47btmv0XO5ln6','Radu Alexandru Cristian',NULL,'admin'),(2,'daniel','$2a$10$AH4ZhACPDDDMnOBbw2fSyun3aSbGOlPHi.J7TBbf47btmv0XO5ln6','Radu Daniel Ion',NULL,'user');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `unit` varchar(25) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `unit` (`unit`),
  CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`unit`) REFERENCES `units` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (4,'Carne de vita','kg',40),(6,'Marar','legatura',3),(8,'Cartofi','kg',5),(10,'Ardei iute','buc',1),(11,'Lapte','l',4),(12,'Ulei','l',7),(13,'Sare','kg',5),(14,'Paine','kg',12),(15,'Apa plata','l',1),(16,'Orez','kg',8),(18,'Telina','kg',3),(19,'Bors','l',2),(24,'Gogonele','kg',10),(25,'Morcovi','kg',7),(26,'Ou','buc',1),(27,'Otet','l',5),(32,'Carne de porc','kg',24);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recipes_after_update_ingredient` AFTER UPDATE ON `ingredients` FOR EACH ROW BEGIN
	IF (OLD.price <> NEW.price) THEN
		CALL update_recipes_ing_cost_by_ing_id(OLD.ID);
		CALL update_ingredient_price_history(OLD.ID, NEW.price);
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ingredients_price_history`
--

DROP TABLE IF EXISTS `ingredients_price_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients_price_history` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_ingredient` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `date` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_ingredient` (`ID_ingredient`,`date`),
  CONSTRAINT `ingredients_price_history_ibfk_1` FOREIGN KEY (`ID_ingredient`) REFERENCES `ingredients` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients_price_history`
--

LOCK TABLES `ingredients_price_history` WRITE;
/*!40000 ALTER TABLE `ingredients_price_history` DISABLE KEYS */;
INSERT INTO `ingredients_price_history` VALUES (1,4,33,'2022-09-24'),(2,4,40,'2022-09-01'),(3,6,3,'2022-09-24'),(4,8,5,'2022-09-24'),(5,10,1,'2022-09-24'),(6,11,4,'2022-09-24'),(7,12,7,'2022-09-24'),(8,13,5,'2022-09-24'),(9,14,12,'2022-09-24'),(10,15,1,'2022-09-24'),(11,16,8,'2022-09-24'),(12,18,3,'2022-09-24'),(13,19,2,'2022-09-24'),(14,24,10,'2022-09-24'),(15,25,7,'2022-09-24'),(16,26,1,'2022-09-24'),(17,27,5,'2022-09-24'),(18,32,24,'2022-09-24');
/*!40000 ALTER TABLE `ingredients_price_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_client` int DEFAULT '0',
  `status` varchar(20) NOT NULL DEFAULT (_latin1'preluata'),
  `ing_cost` double DEFAULT '0',
  `placement_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `due_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `supply_date` datetime DEFAULT NULL,
  `production_date` datetime DEFAULT NULL,
  `preparing_date` datetime DEFAULT NULL,
  `shipping_date` datetime DEFAULT NULL,
  `cancel_date` datetime DEFAULT NULL,
  `ID_shopping_list` int NOT NULL DEFAULT '0',
  `ID_delivery_address` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `ID_client` (`ID_client`),
  KEY `status` (`status`),
  KEY `ID_shopping_list` (`ID_shopping_list`),
  KEY `ID_delivery_address` (`ID_delivery_address`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`ID_client`) REFERENCES `clients` (`ID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`status`) REFERENCES `status` (`name`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`ID_shopping_list`) REFERENCES `shopping_list` (`ID`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`ID_delivery_address`) REFERENCES `addresses` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,'expediata',90.4,'2021-01-04 11:27:45','2021-09-08 10:27:45','2024-01-23 13:41:16','2024-01-23 13:41:24','2024-01-23 13:41:25','2024-01-23 13:41:26',NULL,33,14),(2,2,'expediata',193.56000000000003,'2021-01-24 11:27:51','2021-01-23 11:27:45','2021-01-24 11:27:51','2021-01-24 11:27:51','2021-01-24 11:27:51','2021-01-24 11:27:51',NULL,33,1),(4,2,'expediata',453.94,'2021-01-24 11:27:51','2021-02-03 11:27:45','2022-12-03 09:07:09','2022-12-03 09:07:21','2024-01-04 10:29:24','2024-01-04 10:29:26',NULL,33,1),(59,2,'anulata',4.62,'2021-01-24 11:27:51','2021-01-24 11:27:45',NULL,NULL,NULL,NULL,'2022-12-01 16:54:56',0,1),(102,50,'expediata',88.35000000000001,'2021-02-14 10:55:37','2021-02-14 10:55:00','2024-01-04 14:07:15','2024-01-11 07:47:16','2024-01-18 10:11:47','2024-01-18 10:12:40',NULL,0,2),(103,40,'expediata',41.35,'2021-02-14 10:56:39','2021-02-14 10:56:39','2024-01-23 13:40:37','2024-01-25 10:19:38','2024-01-25 10:19:38','2024-01-25 12:58:28',NULL,0,4),(110,53,'preparata',39.4,'2024-01-09 11:56:51','2024-01-09 11:56:00',NULL,'2024-01-19 12:07:15','2024-01-19 12:00:28',NULL,'2024-01-18 12:02:50',0,21),(111,51,'preluata',39.55,'2024-01-18 11:48:04','2024-01-18 11:48:04',NULL,NULL,NULL,NULL,NULL,0,20);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `order_cancel` BEFORE UPDATE ON `orders` FOR EACH ROW BEGIN
	IF (NEW.status = "anulata" AND OLD.status <> "anulata") THEN
		SET NEW.cancel_date = CURRENT_TIMESTAMP;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `shopping_list_after_update_orders` AFTER UPDATE ON `orders` FOR EACH ROW BEGIN
	IF NOT EXISTS (SELECT * FROM orders WHERE ID_shopping_list = OLD.ID_shopping_list) THEN
		IF (OLD.ID_shopping_list <> 0) THEN
			DELETE FROM shopping_list WHERE ID = OLD.ID_shopping_list;
		END IF;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `shopping_list_after_delete_orders` AFTER DELETE ON `orders` FOR EACH ROW BEGIN
	IF NOT EXISTS (SELECT * FROM orders WHERE ID_shopping_list = OLD.ID_shopping_list) THEN
		IF (OLD.ID_shopping_list <> 0) THEN
			DELETE FROM shopping_list WHERE ID = OLD.ID_shopping_list;
		END IF;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orders_details`
--

DROP TABLE IF EXISTS `orders_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_order` int NOT NULL,
  `ID_recipe` int NOT NULL,
  `servings` int NOT NULL DEFAULT (25),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_order` (`ID_order`,`ID_recipe`),
  KEY `ID_recipe` (`ID_recipe`),
  CONSTRAINT `orders_details_ibfk_2` FOREIGN KEY (`ID_recipe`) REFERENCES `recipes` (`ID`),
  CONSTRAINT `orders_details_ibfk_3` FOREIGN KEY (`ID_order`) REFERENCES `orders` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_details`
--

LOCK TABLES `orders_details` WRITE;
/*!40000 ALTER TABLE `orders_details` DISABLE KEYS */;
INSERT INTO `orders_details` VALUES (5,1,2,20),(8,2,5,24),(13,2,8,24),(20,4,2,100),(43,59,2,3),(103,102,8,10),(104,102,5,10),(106,103,8,5),(111,1,15,20),(112,1,27,20),(113,1,29,3),(115,4,5,100),(116,4,8,11),(117,4,29,10),(118,102,2,5),(119,110,2,10),(120,110,10,10),(121,111,16,7),(122,111,15,7),(123,111,2,7),(124,103,5,6);
/*!40000 ALTER TABLE `orders_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `orders_after_insert_details` AFTER INSERT ON `orders_details` FOR EACH ROW BEGIN
	CALL update_orders_ing_cost_by_order_id(NEW.ID_order);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `orders_after_update_details` AFTER UPDATE ON `orders_details` FOR EACH ROW BEGIN
	CALL update_orders_ing_cost_by_order_id(OLD.ID_order);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `orders_after_delete_details` AFTER DELETE ON `orders_details` FOR EACH ROW BEGIN
	CALL update_orders_ing_cost_by_order_id(OLD.ID_order);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `quantity` double NOT NULL,
  `unit` varchar(25) NOT NULL,
  `ing_cost` double NOT NULL DEFAULT '0',
  `category` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `unit` (`unit`),
  KEY `category` (`category`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`unit`) REFERENCES `units` (`name`),
  CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`category`) REFERENCES `recipes_categories` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (2,'Friganele',100,'g',1.54,'Deserturi'),(5,'Cartofi prajiti',200,'g',1.025,'Garnituri'),(8,'Mititei',200,'g',7.040000000000001,'Mancaruri calde'),(10,'Orez cu lapte',300,'ml',2.4,'Deserturi'),(12,'Ciorba de perisoare',300,'ml',0,'Super, Ciorbe'),(15,'Ciorba de legume',400,'ml',1.11,'Super, Ciorbe'),(16,'Baclava',23,'g',3,'Deserturi'),(27,'Mamaliga',1,'kg',0.07,'Accesorii'),(29,'Friptura de vita',300,'g',12,'Fripturi');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `orders_after_update_recipe` AFTER UPDATE ON `recipes` FOR EACH ROW BEGIN
	IF !(OLD.ing_cost <=> NEW.ing_cost) THEN
		CALL update_orders_ing_cost_by_ing_id(OLD.ID);
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `recipes_categories`
--

DROP TABLE IF EXISTS `recipes_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes_categories` (
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes_categories`
--

LOCK TABLES `recipes_categories` WRITE;
/*!40000 ALTER TABLE `recipes_categories` DISABLE KEYS */;
INSERT INTO `recipes_categories` VALUES ('Accesorii'),('Aperitive'),('Bauturi'),('Deserturi'),('Fripturi'),('Garnituri'),('Mancaruri calde'),('Salate'),('Super, Ciorbe');
/*!40000 ALTER TABLE `recipes_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes_details`
--

DROP TABLE IF EXISTS `recipes_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_recipe` int NOT NULL,
  `ID_ingredient` int NOT NULL,
  `quantity` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `ID_recipe` (`ID_recipe`,`ID_ingredient`),
  KEY `ID_ingredient` (`ID_ingredient`),
  CONSTRAINT `recipes_details_ibfk_1` FOREIGN KEY (`ID_recipe`) REFERENCES `recipes` (`ID`),
  CONSTRAINT `recipes_details_ibfk_2` FOREIGN KEY (`ID_ingredient`) REFERENCES `ingredients` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes_details`
--

LOCK TABLES `recipes_details` WRITE;
/*!40000 ALTER TABLE `recipes_details` DISABLE KEYS */;
INSERT INTO `recipes_details` VALUES (8,5,8,0.2),(20,8,4,0.14),(24,10,11,0.3),(29,10,16,0.15),(30,15,8,0.05),(32,15,18,0.03),(33,15,12,0.01),(34,15,19,0.2),(35,15,13,0.02),(36,15,15,0.2),(59,27,12,0.01),(64,5,13,0.005),(67,2,11,0.1),(69,2,12,0.02),(79,2,26,1),(81,8,32,0.06),(82,16,26,3),(86,29,4,0.3);
/*!40000 ALTER TABLE `recipes_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recipes_after_insert_details` AFTER INSERT ON `recipes_details` FOR EACH ROW BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(NEW.ID_recipe);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recipes_after_update_details` AFTER UPDATE ON `recipes_details` FOR EACH ROW BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(OLD.ID_recipe);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = latin1 */ ;
/*!50003 SET character_set_results = latin1 */ ;
/*!50003 SET collation_connection  = latin1_swedish_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recipes_after_delete_details` AFTER DELETE ON `recipes_details` FOR EACH ROW BEGIN
	CALL update_recipes_ing_cost_by_recipe_id(OLD.ID_recipe);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('admin'),('user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_list`
--

DROP TABLE IF EXISTS `shopping_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_list` (
  `ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_list`
--

LOCK TABLES `shopping_list` WRITE;
/*!40000 ALTER TABLE `shopping_list` DISABLE KEYS */;
INSERT INTO `shopping_list` VALUES (0),(33);
/*!40000 ALTER TABLE `shopping_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES ('anulata'),('aprovizionata'),('expediata'),('pregatita'),('preluata'),('preparata');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES ('buc'),('g'),('kg'),('l'),('legatura'),('ml');
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-30 14:20:54

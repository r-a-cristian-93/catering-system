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
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `ID_address` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `ID_address` (`ID_address`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`ID_address`) REFERENCES `clients_addresses` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (0,'-',NULL,2),(1,'Vasile Ciupitu',NULL,2),(2,'Gheorghe Lazar','0733165789',2),(24,'Gabriela Radulescu','0750123456',2),(25,'Catalin Gheorghiu','0742345678',2),(26,'Diana Neacsu',NULL,2),(27,'Lucian Stanescu','0766789012',2),(28,'Carmen Nistor','0751234567',2),(29,'Adrian Munteanu','0743456789',2),(30,'Monica Dragomir','0752345678',2),(31,'Valentin Radu',NULL,2),(32,'Alina Stoica','0767890123',2),(33,'Sorin Vasile','0753234567',2),(34,'Elena Iliescu','0740123456',2),(35,'Alexandru Popa','0758345678',2),(36,'Ioana Draghici',NULL,2),(37,'Gabriel Radu','0761123456',2),(38,'Mihaela Tudor','0745567890',2),(39,'Victor Iancu','0754123456',2),(40,'Roxana Stan','0746234567',2),(41,'Cristian Balan',NULL,2),(42,'Andreea Dumitru','0767789012',2),(43,'Marius Enache','0759345678',2),(44,'Andrei Popescu','0740123456',2),(45,'Ana Marinescu','0758345678',2),(46,'Mihai Stefanescu',NULL,2),(47,'Elena Vasilescu','0761123456',2),(48,'Gabriela Ionescu','0745567890',2),(49,'Catalin Dumitru','0754123456',2),(50,'Simona Stanescu','0746234567',2),(51,'Alexandru Balan',NULL,2),(52,'Mihaela Cojocaru','0767789012',2),(53,'Dragos Neacsu','0759345678',2);
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
  `value` varchar(255) DEFAULT NULL,
  `latitude` float(9,6) DEFAULT NULL,
  `longitude` float(9,6) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_addresses`
--

LOCK TABLES `clients_addresses` WRITE;
/*!40000 ALTER TABLE `clients_addresses` DISABLE KEYS */;
INSERT INTO `clients_addresses` VALUES (2,'Str. Valea Viilor, Nr.22, Lehliu-Gara',46.438099,24.748642),(10,'Strada Pacanelelor, Nr 33A',45.557323,21.026932),(12,'Aleea Angela Similea 2, Cluj-Napoca',45.751869,20.287228),(14,'Strada Inna 4, Constanta',47.748505,20.337500),(16,'Bulevardul Loredana 6, Craiova',47.836105,22.497160),(18,'Aleea Ovidiu Komornyik 8, Galati',45.155155,24.188316),(20,'Strada Iris 10, Bacau',45.493748,24.322380),(22,'Bulevardul Phoenix 12, Sibiu',45.788261,23.322906),(24,'Aleea Adrian Enescu 14, Targu Mures',47.380325,24.643942),(26,'Strada Voltaj 16, Baia Mare',47.603035,23.716393),(28,'Bulevardul Carla s Dreams 18, Buzau',46.034096,23.563148),(30,'Aleea Urma 20, Satu Mare',47.849125,21.132111),(32,'Strada Alternosfera 22, Targoviste',47.488045,24.698803),(34,'Bulevardul Catalin Crisan 24, Braila',46.620735,24.988583),(36,'Aleea Suie Paparude 26, Baia Mare',45.380611,20.480528),(38,'Strada Hara 28, Botosani',47.269741,20.745520),(40,'Bulevardul Semnal M 30, Deva',45.691738,21.790731),(42,'Aleea Luna Amara 32, Giurgiu',47.416969,23.833509),(44,'Strada Bere Gratis 34, Rosiorii de Vede',46.990040,24.844753),(46,'Bulevardul Loredana 36, Campulung',45.808468,21.236311),(48,'Aleea Holograf 38, Slobozia',47.110966,21.629812),(50,'Strada Pro Musica 40, Adjud',46.575520,23.884207),(52,'Bulevardul Stelu Enache 42, Lugoj',45.415398,20.268091),(54,'Aleea Metropol 44, Reghin',47.864857,22.334724),(56,'Strada Spitalul de Urgenta 46, Baia Sprie',45.998749,24.095346),(58,'Bulevardul Elena Gheorghe 48, Mizil',47.517330,20.591051),(60,'Aleea N&D 50, Miercurea Ciuc',47.546104,21.007942),(62,'Strada Trooper 52, Husi',45.409885,22.849279),(64,'Bulevardul Zdob si Zdub 54, Navodari',45.356419,20.659212),(66,'Aleea Phoenix 56, Cernavoda',47.051392,20.318399),(68,'Strada Iris 58, Curtea de Arges',47.757011,20.815001),(70,'Bulevardul Celelalte Cuvinte 60, Turnu Magurele',47.492268,23.754734);
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
  `name` varchar(50) NOT NULL DEFAULT 'Ingredient nou',
  `unit` varchar(25) NOT NULL DEFAULT 'g',
  `price` double NOT NULL DEFAULT '0',
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
INSERT INTO `ingredients` VALUES (4,'Carne de vita','kg',57),(6,'Marar','legatura',3),(8,'Cartofi','kg',5),(10,'Ardei iute','buc',1),(11,'Lapte','l',4),(12,'Ulei','l',7),(13,'Sare','kg',5),(14,'Paine','kg',12),(15,'Apa plata','l',1),(16,'Orez','kg',8),(18,'Telina','kg',3),(19,'Bors','l',2),(24,'Gogonele','kg',10),(25,'Morcovi','kg',7),(26,'Ou','buc',1),(27,'Otet','l',5),(32,'Carne de porc','kg',24);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients_price_history`
--

LOCK TABLES `ingredients_price_history` WRITE;
/*!40000 ALTER TABLE `ingredients_price_history` DISABLE KEYS */;
INSERT INTO `ingredients_price_history` VALUES (1,4,33,'2022-09-24'),(2,4,40,'2022-09-01'),(3,6,3,'2022-09-24'),(4,8,5,'2022-09-24'),(5,10,1,'2022-09-24'),(6,11,4,'2022-09-24'),(7,12,7,'2022-09-24'),(8,13,5,'2022-09-24'),(9,14,12,'2022-09-24'),(10,15,1,'2022-09-24'),(11,16,8,'2022-09-24'),(12,18,3,'2022-09-24'),(13,19,2,'2022-09-24'),(14,24,10,'2022-09-24'),(15,25,7,'2022-09-24'),(16,26,1,'2022-09-24'),(17,27,5,'2022-09-24'),(18,32,24,'2022-09-24'),(19,4,55,'2024-03-09'),(20,4,57,'2024-03-10');
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
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `ID_client` (`ID_client`),
  KEY `status` (`status`),
  KEY `ID_shopping_list` (`ID_shopping_list`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`ID_client`) REFERENCES `clients` (`ID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`status`) REFERENCES `status` (`name`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`ID_shopping_list`) REFERENCES `shopping_list` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,43,'expediata',105.69999999999999,'2024-01-04 11:27:45','2021-09-08 10:27:45','2024-01-23 13:41:16','2024-01-23 13:41:24','2024-01-23 13:41:25','2024-01-23 13:41:26',NULL,33),(2,53,'expediata',319.08,'2024-01-24 11:27:51','2024-01-23 11:27:00','2024-01-24 11:27:51','2024-01-24 11:27:51','2024-01-24 11:27:51','2024-01-24 11:27:51',NULL,33),(4,2,'expediata',531.12,'2024-01-24 11:27:51','2021-02-03 11:27:45','2022-12-03 09:07:09','2022-12-03 09:07:21','2024-01-04 10:29:24','2024-01-04 10:29:26',NULL,33),(59,53,'anulata',26.794999999999998,'2024-01-24 11:27:51','2024-02-22 11:27:00',NULL,NULL,NULL,NULL,'2024-03-10 13:43:23',0),(102,50,'expediata',112.15,'2021-02-14 10:55:37','2021-02-14 10:55:00','2024-01-04 14:07:15','2024-01-11 07:47:16','2024-01-18 10:11:47','2024-01-18 10:12:40',NULL,0),(103,40,'expediata',53.25,'2021-02-14 10:56:39','2021-02-14 10:56:39','2024-01-23 13:40:37','2024-01-25 10:19:38','2024-01-25 10:19:38','2024-01-25 12:58:28',NULL,0),(110,53,'expediata',39.4,'2024-01-09 11:56:51','2024-01-09 11:56:00',NULL,'2024-01-19 12:07:15','2024-02-01 12:08:37','2024-02-01 12:08:49','2024-01-18 12:02:50',0),(111,51,'preluata',39.55,'2024-01-18 11:48:04','2024-01-18 11:48:00',NULL,NULL,NULL,NULL,NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_details`
--

LOCK TABLES `orders_details` WRITE;
/*!40000 ALTER TABLE `orders_details` DISABLE KEYS */;
INSERT INTO `orders_details` VALUES (5,1,2,20),(8,2,5,24),(13,2,8,24),(20,4,2,100),(43,59,2,3),(103,102,8,10),(104,102,5,10),(106,103,8,5),(111,1,15,20),(112,1,27,20),(113,1,29,3),(115,4,5,100),(116,4,8,11),(117,4,29,10),(118,102,2,5),(119,110,2,10),(120,110,10,10),(121,111,16,7),(122,111,15,7),(123,111,2,7),(124,103,5,6),(125,2,29,4),(126,59,5,7),(127,59,16,5);
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
  `name` varchar(100) NOT NULL DEFAULT (_latin1'Reteta noua'),
  `quantity` double DEFAULT '300',
  `unit` varchar(25) NOT NULL DEFAULT (_latin1'g'),
  `ing_cost` double NOT NULL DEFAULT '0',
  `category` varchar(20) NOT NULL DEFAULT (_latin1'Aperitive'),
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `unit` (`unit`),
  KEY `category` (`category`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`unit`) REFERENCES `units` (`name`),
  CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`category`) REFERENCES `recipes_categories` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (2,'Friganele cu lapte',100,'g',1.54,'Deserturi'),(5,'Cartofi prajiti',200,'g',1.025,'Garnituri'),(8,'Mititei',200,'g',9.42,'Mancaruri calde'),(10,'Orez cu lapte',300,'ml',2.4,'Deserturi'),(12,'Ciorba de perisoare',300,'ml',0,'Super, Ciorbe'),(15,'Ciorba de legume',400,'ml',1.11,'Super, Ciorbe'),(16,'Baclava',23,'g',3,'Deserturi'),(27,'Mamaliga',1,'kg',0.07,'Accesorii'),(29,'Friptura de vita',300,'g',17.099999999999998,'Fripturi'),(30,'Reteta noua',300,'g',15,'Aperitive'),(31,'Reteta noua',300,'g',0,'Aperitive');
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
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes_details`
--

LOCK TABLES `recipes_details` WRITE;
/*!40000 ALTER TABLE `recipes_details` DISABLE KEYS */;
INSERT INTO `recipes_details` VALUES (8,5,8,0.2),(20,8,4,0.14),(24,10,11,0.3),(29,10,16,0.15),(30,15,8,0.05),(32,15,18,0.03),(33,15,12,0.01),(34,15,19,0.2),(35,15,13,0.02),(36,15,15,0.2),(59,27,12,0.01),(64,5,13,0.005),(67,2,11,0.1),(69,2,12,0.02),(79,2,26,1),(81,8,32,0.06),(82,16,26,3),(86,29,4,0.3),(87,30,6,5);
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

-- Dump completed on 2024-03-28 10:04:19

-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: catering
-- ------------------------------------------------------
-- Server version	8.0.22

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
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (0,'-',NULL,NULL),(1,'Vasile Ciupitu','Str. Valea Viilor, Nr.22, Lehliu-Gara',NULL),(2,'Gheorghe Lazar','Str. Scurta, Nr. 33, Bl. . 2, Sc. 3, Timisoara','0733165789');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debug_var`
--

LOCK TABLES `debug_var` WRITE;
/*!40000 ALTER TABLE `debug_var` DISABLE KEYS */;
INSERT INTO `debug_var` VALUES (1,'x',0),(2,'after update on orders, OLD.ID_shopping_list',0),(3,'after update on orders, NEW.ID_shopping_list',25),(4,'after update on orders, OLD.ID_shopping_list',0),(5,'after update on orders, NEW.ID_shopping_list',25),(10,'after delete on orders, ORD_C=',1),(11,'after update on orders, OLD.ID_shopping_list',25),(12,'after update on orders, NEW.ID_shopping_list',25),(13,'after update on orders, OLD.ID_shopping_list',0),(14,'after update on orders, NEW.ID_shopping_list',26),(15,'after update on orders, OLD.ID_shopping_list',0),(16,'after update on orders, NEW.ID_shopping_list',26),(17,'after update on orders, OLD.ID_shopping_list',26),(18,'after update on orders, NEW.ID_shopping_list',26),(19,'after update on orders, OLD.ID_shopping_list',26),(20,'after update on orders, NEW.ID_shopping_list',26),(21,'after update on orders, OLD.ID_shopping_list',26),(22,'after update on orders, NEW.ID_shopping_list',26),(23,'after update on orders, OLD.ID_shopping_list',26),(24,'after update on orders, NEW.ID_shopping_list',26),(25,'after update on orders, OLD.ID_shopping_list',26),(26,'after update on orders, NEW.ID_shopping_list',26),(27,'after update on orders, OLD.ID_shopping_list',0),(28,'after update on orders, NEW.ID_shopping_list',0),(29,'after update on orders, OLD.ID_shopping_list',26),(30,'after update on orders, NEW.ID_shopping_list',26),(31,'after update on orders, OLD.ID_shopping_list',0),(32,'after update on orders, NEW.ID_shopping_list',26),(33,'after update on orders, OLD.ID_shopping_list',0),(34,'after update on orders, NEW.ID_shopping_list',27),(35,'after update on orders, OLD.ID_shopping_list',0),(36,'after update on orders, NEW.ID_shopping_list',27),(37,'after update on orders, OLD.ID_shopping_list',27),(38,'after update on orders, NEW.ID_shopping_list',0),(39,'after update on orders, OLD.ID_shopping_list',27),(40,'after update on orders, NEW.ID_shopping_list',0),(41,'after update on orders, OLD.ID_shopping_list',0),(42,'after update on orders, NEW.ID_shopping_list',0),(43,'after update on orders, OLD.ID_shopping_list',0),(44,'after update on orders, NEW.ID_shopping_list',28),(45,'after update on orders, OLD.ID_shopping_list',0),(46,'after update on orders, NEW.ID_shopping_list',28),(47,'after update on orders, OLD.ID_shopping_list',28),(48,'after update on orders, NEW.ID_shopping_list',0),(49,'after update on orders, OLD.ID_shopping_list',28),(50,'after update on orders, NEW.ID_shopping_list',0),(51,'after update on orders, OLD.ID_shopping_list',0),(52,'after update on orders, NEW.ID_shopping_list',0),(53,'after update on orders, OLD.ID_shopping_list',0),(54,'after update on orders, NEW.ID_shopping_list',29),(55,'after update on orders, OLD.ID_shopping_list',0),(56,'after update on orders, NEW.ID_shopping_list',29),(57,'after update on orders, OLD.ID_shopping_list',0),(58,'after update on orders, NEW.ID_shopping_list',0),(59,'after update on orders, OLD.ID_shopping_list',26),(60,'after update on orders, NEW.ID_shopping_list',0),(61,'after update on orders, OLD.ID_shopping_list',26),(62,'after update on orders, NEW.ID_shopping_list',0),(63,'after update on orders, OLD.ID_shopping_list',26),(64,'after update on orders, NEW.ID_shopping_list',0),(65,'after update on orders, OLD.ID_shopping_list',0),(66,'after update on orders, NEW.ID_shopping_list',29),(67,'after update on orders, OLD.ID_shopping_list',0),(68,'after update on orders, NEW.ID_shopping_list',29),(69,'after update on orders, OLD.ID_shopping_list',0),(70,'after update on orders, NEW.ID_shopping_list',30),(71,'after update on orders, OLD.ID_shopping_list',0),(72,'after update on orders, NEW.ID_shopping_list',30),(73,'after update on orders, OLD.ID_shopping_list',29),(74,'after update on orders, NEW.ID_shopping_list',0),(75,'after update on orders, OLD.ID_shopping_list',29),(76,'after update on orders, NEW.ID_shopping_list',0),(77,'after update on orders, OLD.ID_shopping_list',29),(78,'after update on orders, NEW.ID_shopping_list',0),(79,'after update on orders, OLD.ID_shopping_list',0),(80,'after update on orders, NEW.ID_shopping_list',0),(81,'after update on orders, OLD.ID_shopping_list',0),(82,'after update on orders, NEW.ID_shopping_list',0),(83,'after update on orders, OLD.ID_shopping_list',0),(84,'after update on orders, NEW.ID_shopping_list',0),(85,'after update on orders, OLD.ID_shopping_list',29),(86,'after update on orders, NEW.ID_shopping_list',0),(87,'after update on orders, OLD.ID_shopping_list',0),(88,'after update on orders, NEW.ID_shopping_list',30),(89,'after update on orders, OLD.ID_shopping_list',0),(90,'after update on orders, NEW.ID_shopping_list',30),(91,'after update on orders, OLD.ID_shopping_list',0),(92,'after update on orders, NEW.ID_shopping_list',30),(93,'after update on orders, OLD.ID_shopping_list',0),(94,'after update on orders, NEW.ID_shopping_list',30),(95,'after update on orders, OLD.ID_shopping_list',30),(96,'after update on orders, NEW.ID_shopping_list',0),(97,'after update on orders, OLD.ID_shopping_list',0),(98,'after update on orders, NEW.ID_shopping_list',0),(99,'after update on orders, OLD.ID_shopping_list',30),(100,'after update on orders, NEW.ID_shopping_list',0),(101,'after update on orders, OLD.ID_shopping_list',30),(102,'after update on orders, NEW.ID_shopping_list',0),(103,'after update on orders, OLD.ID_shopping_list',0),(104,'after update on orders, NEW.ID_shopping_list',31),(105,'after update on orders, OLD.ID_shopping_list',0),(106,'after update on orders, NEW.ID_shopping_list',31),(107,'after update on orders, OLD.ID_shopping_list',0),(108,'after update on orders, NEW.ID_shopping_list',31),(109,'after update on orders, OLD.ID_shopping_list',31),(110,'after update on orders, NEW.ID_shopping_list',0),(111,'after update on orders, OLD.ID_shopping_list',31),(112,'after update on orders, NEW.ID_shopping_list',0),(113,'after update on orders, OLD.ID_shopping_list',31),(114,'after update on orders, NEW.ID_shopping_list',0),(115,'after update on orders, OLD.ID_shopping_list',0),(116,'after update on orders, NEW.ID_shopping_list',0),(117,'after update on orders, OLD.ID_shopping_list',0),(118,'after update on orders, NEW.ID_shopping_list',32),(119,'after update on orders, OLD.ID_shopping_list',0),(120,'after update on orders, NEW.ID_shopping_list',32);
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
INSERT INTO `employees` VALUES (1,'alex','$2a$10$APd3mb1f.DVh.Qwm4qXHqu1djH86cEjGrZ4bGxH0QDNOn8q4r8NJq','Radu Alexandru Cristian',NULL,'admin'),(2,'daniel','$2a$10$v.pp.ftt/K42FLb0ohmPOuvX0Wk1hNenQ0LtsLpTknZ5QIb/3H2Wy','Radu Daniel Ion',NULL,'user');
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
INSERT INTO `ingredients` VALUES (4,'Carne de vita','kg',33),(6,'Marar','legatura',2.5),(8,'Cartofi','kg',5),(10,'Ardei iute','buc',1),(11,'Lapte','l',4),(12,'Ulei','l',7),(13,'Sare','kg',5),(14,'Paine','kg',12),(15,'Apa plata','l',0.5),(16,'Orez','kg',8),(18,'Telina','kg',3),(19,'Bors','l',2),(24,'Gogonele','kg',10),(25,'Morcovi','kg',7),(26,'Ou','buc',0.6),(27,'Otet','l',5),(32,'Carne de porc','kg',24);
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
CALL update_recipes_ing_cost_by_ing_id(OLD.ID);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `delivery_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_shopping_list` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `ID_client` (`ID_client`),
  KEY `status` (`status`),
  KEY `ID_shopping_list` (`ID_shopping_list`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`ID_client`) REFERENCES `clients` (`ID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`status`) REFERENCES `status` (`name`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`ID_shopping_list`) REFERENCES `shopping_list` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,'livrata',28.320000000000004,'2021-09-08 10:27:45','2021-01-04 11:27:45',32),(2,2,'livrata',170.04,'2021-01-23 11:27:45','2021-01-24 11:27:51',32),(4,2,'in lucru',354,'2021-02-03 11:27:45','2021-01-24 11:27:51',0),(59,2,'anulata',3.4200000000000004,'2021-01-24 11:27:45','2021-01-24 11:27:51',0),(102,1,'preluata',70.85000000000001,'2021-02-14 10:55:37','2021-02-14 10:55:37',30),(103,2,'preluata',0,'2021-02-14 10:56:39','2021-02-14 10:56:39',30),(104,1,'preluata',0,'2021-02-14 11:03:09','2021-02-14 11:03:09',30);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `shopping_list_after_update_orders` AFTER UPDATE ON `orders` FOR EACH ROW BEGIN
call log_var('after update on orders, OLD.ID_shopping_list', OLD.ID_shopping_list);
call log_var('after update on orders, NEW.ID_shopping_list', NEW.ID_shopping_list);
IF NOT EXISTS (SELECT * FROM orders WHERE ID_shopping_list = OLD.ID_shopping_list) THEN
DELETE FROM shopping_list WHERE ID = OLD.ID_shopping_list;
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
DELETE FROM shopping_list WHERE ID = OLD.ID_shopping_list;
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
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_details`
--

LOCK TABLES `orders_details` WRITE;
/*!40000 ALTER TABLE `orders_details` DISABLE KEYS */;
INSERT INTO `orders_details` VALUES (5,1,2,10),(8,2,5,24),(13,2,8,24),(20,4,2,100),(43,59,2,3),(44,4,10,100),(46,1,10,2),(101,1,15,12),(103,102,8,10),(104,102,5,10);
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
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `unit` (`unit`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`unit`) REFERENCES `units` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (2,'Friganele',100,'g',1.1400000000000001),(5,'Cartofi prajiti',200,'g',1.025),(8,'Mititei',200,'g',6.0600000000000005),(10,'Orez cu lapte',300,'ml',2.4),(12,'Ciorba de perisoare',300,'ml',0),(15,'Ciorba de legume',400,'ml',1.01),(16,'Baclava',23,'g',1.7999999999999998),(27,'Mamaliga',1,'kg',0.07);
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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes_details`
--

LOCK TABLES `recipes_details` WRITE;
/*!40000 ALTER TABLE `recipes_details` DISABLE KEYS */;
INSERT INTO `recipes_details` VALUES (8,5,8,0.2),(20,8,4,0.14),(24,10,11,0.3),(29,10,16,0.15),(30,15,8,0.05),(32,15,18,0.03),(33,15,12,0.01),(34,15,19,0.2),(35,15,13,0.02),(36,15,15,0.2),(59,27,12,0.01),(64,5,13,0.005),(67,2,11,0.1),(69,2,12,0.02),(79,2,26,1),(81,8,32,0.06),(82,16,26,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_list`
--

LOCK TABLES `shopping_list` WRITE;
/*!40000 ALTER TABLE `shopping_list` DISABLE KEYS */;
INSERT INTO `shopping_list` VALUES (0),(30),(32);
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
INSERT INTO `status` VALUES ('anulata'),('in lucru'),('livrata'),('preluata');
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

-- Dump completed on 2021-02-14 13:55:36

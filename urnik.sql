CREATE DATABASE  IF NOT EXISTS `urnik` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `urnik`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: urnik
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `predmet`
--

DROP TABLE IF EXISTS `predmet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `predmet` (
  `id` int(11) NOT NULL,
  `ime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmet`
--

LOCK TABLES `predmet` WRITE;
/*!40000 ALTER TABLE `predmet` DISABLE KEYS */;
INSERT INTO `predmet` VALUES (1,'asd'),(2,'qwe'),(3,'adfg'),(4,'lllllll');
/*!40000 ALTER TABLE `predmet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prostor_predmet`
--

DROP TABLE IF EXISTS `prostor_predmet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prostor_predmet` (
  `prostori_id` int(11) NOT NULL,
  `predmet_id` int(11) NOT NULL,
  `cas` varchar(45) DEFAULT NULL,
  `start_date` varchar(45) DEFAULT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `days_week` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`prostori_id`,`predmet_id`),
  KEY `fk_prostori_has_predmet_predmet1_idx` (`predmet_id`),
  KEY `fk_prostori_has_predmet_prostori_idx` (`prostori_id`),
  CONSTRAINT `fk_prostori_has_predmet_predmet1` FOREIGN KEY (`predmet_id`) REFERENCES `predmet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prostori_has_predmet_prostori` FOREIGN KEY (`prostori_id`) REFERENCES `prostori` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prostor_predmet`
--

LOCK TABLES `prostor_predmet` WRITE;
/*!40000 ALTER TABLE `prostor_predmet` DISABLE KEYS */;
INSERT INTO `prostor_predmet` VALUES (1,1,NULL,NULL,NULL,'pon'),(2,2,'915-1300',NULL,NULL,'tor,cet'),(2,3,NULL,NULL,NULL,'cet'),(4,4,NULL,NULL,NULL,'tor,pet');
/*!40000 ALTER TABLE `prostor_predmet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prostori`
--

DROP TABLE IF EXISTS `prostori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prostori` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `velikost` int(11) NOT NULL,
  `ime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prostori`
--

LOCK TABLES `prostori` WRITE;
/*!40000 ALTER TABLE `prostori` DISABLE KEYS */;
INSERT INTO `prostori` VALUES (0,0,NULL),(1,20,'rca'),(2,20,'b'),(3,10,'rcc'),(4,88,'vd'),(5,22,'e'),(6,54,'f'),(7,20,'g'),(8,62,'h'),(9,52,'i');
/*!40000 ALTER TABLE `prostori` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-14 16:24:41

CREATE DATABASE  IF NOT EXISTS `phonebook`;
USE `phonebook`;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(45) NOT NULL,
    `companyName` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
)  ENGINE=INNODB AUTO_INCREMENT=7 DEFAULT CHARSET=LATIN1;

LOCK TABLES `contacts` WRITE;

INSERT INTO `contacts` VALUES
  (1,'John','67894528',NULL),
  (2,'Dan','50299925','Zendesk'),
  (3,'Filip','34678429','Joe & The Juice'),
  (4,'Anders','45982946',NULL),
  (5,'Chris','34674763','HackYourFuture'),
  (6,'Orhan','45792824','Elastic');

UNLOCK TABLES;

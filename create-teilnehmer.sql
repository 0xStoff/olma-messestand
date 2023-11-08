# Create DB with table teilnehmer

# When table drop on UI is not working, uncomment and run following command:
#SET SQL_SAFE_UPDATES = 0;

DROP DATABASE IF EXISTS `olma_messestand`;
CREATE DATABASE `olma_messestand`; 
USE `olma_messestand`;

SET NAMES utf8;
SET character_set_client = utf8mb4;
 
CREATE TABLE `teilnehmer` (
  `teilnehmer_id` INT,
  `vorname` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `geburtsdatum` varchar(50) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `plz` smallINT DEFAULT NULL,
  `telefonnummer` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `selfie`varchar(50) DEFAULT NULL,
  PRIMARY KEY (`teilnehmer_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `gewinnspiel_daten` (
  `teilnehmer_id`INT,
  `winner_id` INT DEFAULT NULL,
  `vorname`varchar(50) DEFAULT NULL,
  `selfie`varchar(50) DEFAULT NULL,
  `gewinnspiel` bool DEFAULT NULL,
	PRIMARY KEY (`teilnehmer_id`),
	FOREIGN KEY (`teilnehmer_id`)
    REFERENCES teilnehmer(`teilnehmer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `gewinnspiel_fragen` (
  `frage_id` INT,
  `frage` varchar(250) NOT NULL,
  `antwort` varchar(50) NOT NULL,
  `choice1` varchar(50) NOT NULL,
  `choice2` varchar(50) NOT NULL,
  `choice3` varchar(50) NOT NULL,
  PRIMARY KEY (`frage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `gewinnspiel_fragen` VALUES (0,'Wann wurde MusterAG gegründet', '1994', '1870','1914','1590');
INSERT INTO `gewinnspiel_fragen` VALUES (1,'Was ist unser Maskottchen', 'Kuh', 'Tiger','Faultier','Ameise');
INSERT INTO `gewinnspiel_fragen` VALUES (2,'Wo liegt der Hauptsitz', 'Zürich', 'Budapest', 'Berlin', 'New York');
INSERT INTO `gewinnspiel_fragen` VALUES (3,'Welche Dienstleistungen bieten wir an', 'individuelle Softwarelösungen', 'Autoservice','Fast Food','ärztliche Untersuchung');
INSERT INTO `gewinnspiel_fragen` VALUES (4,'Wie lautet unser Motto', 'Software die begeistert', 'Im lovin it', 'Just do it','Geiz ist geil');


CREATE TABLE `umfrage_daten` (
  `umfrage_daten_id` INT NOT NULL AUTO_INCREMENT,
  `frage_0` INT DEFAULT NULL,
  `frage_1` INT DEFAULT NULL,
  `frage_2` INT DEFAULT NULL,
  `frage_3` INT DEFAULT NULL,
  `frage_4` INT DEFAULT NULL,
  PRIMARY KEY (`umfrage_daten_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `umfrage_fragen` (
  `umfrage_fragen_id` INT,
  `fragen` varchar(250) NOT NULL,
  PRIMARY KEY (`umfrage_fragen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `umfrage_fragen` VALUES (0,'Wie hat dir unser Stand gefallen');
INSERT INTO `umfrage_fragen` VALUES (1,'Wie empfindest du die Website');
INSERT INTO `umfrage_fragen` VALUES (2,'Würdest du wiederkommen');
INSERT INTO `umfrage_fragen` VALUES (3,'Wie hast du die Betreuung empfunden');
INSERT INTO `umfrage_fragen` VALUES (4,'Würdest du uns weiterempfehlen');


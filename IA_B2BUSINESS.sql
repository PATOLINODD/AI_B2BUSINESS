USE `IAB2BUSINESS`;

#DROP TABLE SHOPPING;
#DROP TABLE SALES;
#DROP TABLE SERVICESNSOLUTIONS;
#DROP TABLE CREDITSCARD;
#DROP TABLE CLIENTS;
#DROP TABLE PROVIDERS;

CREATE TABLE IF NOT exists `CLIENTS` (
  `CLTID` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `CLTNAME` VARCHAR(50) NOT NULL,
  `CLTEMAIL` TEXT NOT NULL,
  `CLTPASSWORD` TEXT NOT NULL,
  `CLTCNPJ` VARCHAR(15) UNIQUE NOT NULL,
  `CLTBUSINESSNAME` VARCHAR(20) NOT NULL,
  `CLTFANTASYNAME` VARCHAR(30) UNIQUE NOT NULL,
  `CLTSOCIALREASON` VARCHAR(20) NOT NULL,
  `CLTCREATEDATE` VARCHAR(100) NOT NULL DEFAULT (now()),
  `CLTUPDATEDATE` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT exists `CREDITSCARD` (
  `CRDCLTID` INTEGER,
  `CRDPRVID` INTEGER,
  `CRDNUMBERCARD` VARCHAR(16) UNIQUE NOT NULL,
  `CRDEXPIRATIONDATE` varchar(5) NOT NULL,
  `CRDNAMEONCARD` VARCHAR(50) NOT NULL,
  `CRDBIRTHDATE` VARCHAR(100) NOT NULL DEFAULT (now()),
  `CRDCPFCNPJ` VARCHAR(16) NOT NULL
);


CREATE TABLE IF NOT exists `PROVIDERS` (
  `PROVIDERID` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `PRVNAME` VARCHAR(50) NOT NULL,
  `PRVEMAIL` TEXT NOT NULL,
  `PRVPASSWORD` TEXT NOT NULL,
  `PRVCNPJ` VARCHAR(15) UNIQUE NOT NULL,
  `PRVBUSINESSNAME` VARCHAR(20) NOT NULL,
  `PRVFANTASYNAME` VARCHAR(30) UNIQUE NOT NULL,
  `PRVSOCIALREASON` VARCHAR(20) NOT NULL,
  `PRVSECTORACTING` VARCHAR(100) NOT NULL,
  `PRVCREATEDATE` VARCHAR(100) NOT NULL DEFAULT (now()),
  `PRVUPDATEDATE` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT exists `SERVICESNSOLUTIONS` (
  `SRVSLTID` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `SRVSLTPRVID` INTEGER NOT NULL,
  `SRVSLTNAME` VARCHAR(100) NOT NULL,
  `SRVSLTDESC` TEXT NOT NULL,
  `SRVSLTPRICE` DECIMAL(15, 2) NOT NULL
);

CREATE TABLE IF NOT exists `SALES` (
  `SLSPRVID` INTEGER NOT NULL,
  `SLSCLTID` INTEGER NOT NULL,
  `SLSSRVSLTID` INTEGER NOT NULL,
  `SLSSRVSTATE` VARCHAR(12) NOT NULL,
  `SLSSRVSLTPRICE` DECIMAL(15, 2) NOT NULL,
  `SLSDATE` VARCHAR(100) NOT NULL DEFAULT (now())
);

CREATE TABLE IF NOT exists `SHOPPING` (
  `SHPPRVID` INTEGER NOT NULL,
  `SHPCLTID` INTEGER NOT NULL,
  `SHPSRVSLTID` INTEGER NOT NULL,
  `SHPSRVSTATE` VARCHAR(12) NOT NULL,
  `SHPSRVSLTPRICE` DECIMAL(15, 2) NOT NULL,
  `SHPDATE` VARCHAR(100) NOT NULL DEFAULT (now())
);



ALTER TABLE `CREDITSCARD` ADD FOREIGN KEY (`CRDCLTID`) REFERENCES `CLIENTS` (`CLTID`);

ALTER TABLE `CREDITSCARD` ADD FOREIGN KEY (`CRDPRVID`) REFERENCES `PROVIDERS` (`PROVIDERID`);

ALTER TABLE `SERVICESNSOLUTIONS` ADD FOREIGN KEY (`SRVSLTPRVID`) REFERENCES `PROVIDERS` (`PROVIDERID`);

ALTER TABLE `SALES` ADD FOREIGN KEY (`SLSPRVID`) REFERENCES `PROVIDERS` (`PROVIDERID`);

ALTER TABLE `SALES` ADD FOREIGN KEY (`SLSCLTID`) REFERENCES `CLIENTS` (`CLTID`); --

ALTER TABLE `SALES` ADD FOREIGN KEY (`SLSSRVSLTID`) REFERENCES `SERVICESNSOLUTIONS` (`SRVSLTID`);

ALTER TABLE `SHOPPING` ADD FOREIGN KEY (`SHPPRVID`) REFERENCES `PROVIDERS` (`PROVIDERID`);

ALTER TABLE `SHOPPING` ADD FOREIGN KEY (`SHPCLTID`) REFERENCES `CLIENTS` (`CLTID`);

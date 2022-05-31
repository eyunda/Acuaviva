/*
SQLyog Trial v13.1.8 (64 bit)
MySQL - 10.4.24-MariaDB : Database - acuaviva
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`acuaviva` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `acuaviva`;

/*Table structure for table `clientes` */

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_estrato` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idroless` (`id_rol`),
  CONSTRAINT `fk_idroless` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `clientes` */

insert  into `clientes`(`id`,`nombre`,`apellido`,`edad`,`telefono`,`correo`,`username`,`password`,`id_rol`,`id_estrato`) values 
(1,'Sofia','Sanchez',43,'3124563781','sofi@gmail.com','sofia','12345',2,1),
(3,'daniela','herrera',90,'3108882266','jhon1100p@gmail.com','daniela','12345',2,1),
(4,'sofia','cabrera',40,'3213211211','cabrera@gmail.com','sofi','12345',2,2);

/*Table structure for table `costos_fijos` */

DROP TABLE IF EXISTS `costos_fijos`;

CREATE TABLE `costos_fijos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `costos` varchar(50) NOT NULL,
  `valor` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `costos_fijos` */

insert  into `costos_fijos`(`id`,`costos`,`valor`) values 
(1,'cargo fijo agua',800);

/*Table structure for table `estado` */

DROP TABLE IF EXISTS `estado`;

CREATE TABLE `estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `estado` */

insert  into `estado`(`id`,`estado`) values 
(1,'espera'),
(2,'respondido'),
(3,'pagado'),
(4,'sin pagar');

/*Table structure for table `estrato` */

DROP TABLE IF EXISTS `estrato`;

CREATE TABLE `estrato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estrato` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `estrato` */

insert  into `estrato`(`id`,`estrato`,`descuento`) values 
(1,1,800),
(2,2,500),
(3,3,200),
(4,4,100),
(5,5,0);

/*Table structure for table `image` */

DROP TABLE IF EXISTS `image`;

CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `image` */

insert  into `image`(`id`,`type`,`name`,`data`) values 
(1,'image/jpeg','fondo.jpg','0000-00-00');

/*Table structure for table `mision` */

DROP TABLE IF EXISTS `mision`;

CREATE TABLE `mision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mision` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `mision` */

insert  into `mision`(`id`,`mision`) values 
(1,'“En nuestra empresa prestamos los servicios públicos domiciliarios\n                 de acueducto, alcantarillado,  y complementarios; con calidad, continuidad y\n                  cobertura; buscando la mejora continua y satisfacción de la comunidad”');

/*Table structure for table `pqrs` */

DROP TABLE IF EXISTS `pqrs`;

CREATE TABLE `pqrs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pqrs` varchar(50) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `respuesta` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idclientes` (`id_cliente`),
  KEY `fk_idestado` (`id_estado`),
  CONSTRAINT `fk_idclientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `fk_idestado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `pqrs` */

insert  into `pqrs`(`id`,`pqrs`,`id_cliente`,`id_estado`,`respuesta`) values 
(4,'me quejo porque el personal de servicio me atendió',1,1,''),
(5,'me quejo porque el profe me pide mucha cosa',1,2,'sacamos 5');

/*Table structure for table `recibo` */

DROP TABLE IF EXISTS `recibo`;

CREATE TABLE `recibo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consumo` int(11) NOT NULL,
  `deuda_anterior` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `lectura_pasada` int(11) NOT NULL,
  `lectura_resiente` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idcliente` (`id_cliente`),
  KEY `fk_idestado` (`id_estado`),
  CONSTRAINT `fk_idcliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `fk_idestados` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `recibo` */

insert  into `recibo`(`id`,`consumo`,`deuda_anterior`,`id_cliente`,`lectura_pasada`,`lectura_resiente`,`id_estado`) values 
(3,0,0,3,1997,2020,3),
(4,0,0,4,40000,50000,4);

/*Table structure for table `rol` */

DROP TABLE IF EXISTS `rol`;

CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `rol` */

insert  into `rol`(`id`,`rol`) values 
(1,'administrador'),
(2,'cliente'),
(3,'trabajador');

/*Table structure for table `trabajadores` */

DROP TABLE IF EXISTS `trabajadores`;

CREATE TABLE `trabajadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idroles` (`id_rol`),
  CONSTRAINT `fk_idroles` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `trabajadores` */

insert  into `trabajadores`(`id`,`nombre`,`apellido`,`edad`,`telefono`,`correo`,`username`,`password`,`id_rol`) values 
(1,'Jhonatan','Garzon',43,'3215678321','garzon@gmail.com','garzon','12345',3);

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `telefono` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_idrol` (`id_rol`),
  CONSTRAINT `fk_idrol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombre`,`apellido`,`edad`,`telefono`,`correo`,`username`,`password`,`id_rol`) values 
(1,'Enderson','Yunda',25,2147483647,'eyunda@gmail.com','yunda','12345',1),
(2,'Luis','Garrido',22,2147483647,'garrido@gmail.com','luis','12345',2);

/*Table structure for table `vision` */

DROP TABLE IF EXISTS `vision`;

CREATE TABLE `vision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vision` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `vision` */

insert  into `vision`(`id`,`vision`) values 
(1,'“EN NUESTRA EMPRESA NOS COMPROMETEMOS A PRESTAR LOS SERVICIOS\n                 PÚBLICOS  DE ACUEDUCTO, ALCANTARILLADO Y COMPLEMENTARIOS CON\n                  CALIDAD, CONTINUIDAD Y COBERTURA; GARANTIZANDO LA MEJORA CONTINUA DE SUS PROCESOS; \n                  CON PERSONAL COMPETENTE E INFRAESTRUCTURA, PARA SATISFACER A LA COMUNIDAD”');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

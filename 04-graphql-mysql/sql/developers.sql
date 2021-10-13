-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
-- Anartz Mugika Ledo (mugan86@gmail.com)
--
-- Servidor: localhost
-- Tiempo de generación: 15-05-2020 a las 12:10:45
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.1.27

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `developers`
--
CREATE DATABASE IF NOT EXISTS `developers` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `developers`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Información de los diferentes lenguajes de programación';

--
-- Volcado de datos para la tabla `languages`
--

INSERT INTO `languages` (`id`, `name`) VALUES
(1, 'Swift'),
(2, 'Kotlin'),
(3, 'Javascript'),
(4, 'Typescript'),
(5, 'Java'),
(6, 'PHP'),
(7, 'Cobol'),
(8, 'Go'),
(10, 'C#');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT 'Identificador del desarrollador',
  `name` varchar(150) NOT NULL COMMENT 'Nombre y apellidos del desarrollador',
  `instructor` tinyint(4) NOT NULL DEFAULT '0',
  `twitter` varchar(100) NOT NULL,
  `web` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `instructor`, `twitter`, `web`) VALUES
(1, 'Ruslan González', 0, 'ruslangonzalez', 'https://github.com/ruslanguns'),
(2, 'Antonio Leiva', 1, 'lime_cl', 'https://antonioleiva.com'),
(3, 'Anartz Mugika', 1, 'mugan86', 'https://anartz-mugika.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users-languages`
--

CREATE TABLE `users-languages` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `language` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users-languages`
--

INSERT INTO `users-languages` (`id`, `user`, `language`) VALUES
(1, 1, 3),
(2, 1, 4),
(3, 2, 8),
(4, 2, 7),
(5, 2, 6),
(6, 2, 2),
(7, 2, 5),
(8, 1, 2),
(10, 3, 4),
(11, 3, 2),
(12, 3, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users-languages`
--
ALTER TABLE `users-languages`
  ADD PRIMARY KEY (`id`,`user`,`language`),
  ADD KEY `user` (`user`),
  ADD KEY `language` (`language`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del desarrollador', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users-languages`
--
ALTER TABLE `users-languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users-languages`
--
ALTER TABLE `users-languages`
  ADD CONSTRAINT `language` FOREIGN KEY (`language`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `users` (`id`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.5.53 - MySQL Community Server (GPL)
-- Операционная система:         Win32
-- HeidiSQL Версия:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных task_tracker
CREATE DATABASE IF NOT EXISTS `task_tracker` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `task_tracker`;

-- Дамп структуры для таблица task_tracker.Comment
CREATE TABLE IF NOT EXISTS `Comment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(8000) NOT NULL,
  `id_task` int(10) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `role_user` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы task_tracker.Comment: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;

-- Дамп структуры для таблица task_tracker.Project
CREATE TABLE IF NOT EXISTS `Project` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы task_tracker.Project: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `Project` DISABLE KEYS */;
/*!40000 ALTER TABLE `Project` ENABLE KEYS */;

-- Дамп структуры для таблица task_tracker.ProjectsUsers
CREATE TABLE IF NOT EXISTS `ProjectsUsers` (
  `id_project` int(10) DEFAULT NULL,
  `id_user` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы task_tracker.ProjectsUsers: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `ProjectsUsers` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProjectsUsers` ENABLE KEYS */;

-- Дамп структуры для таблица task_tracker.Session
CREATE TABLE IF NOT EXISTS `Session` (
  `id` int(10) DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы task_tracker.Session: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;

-- Дамп структуры для таблица task_tracker.Task
CREATE TABLE IF NOT EXISTS `Task` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(50) NOT NULL,
  `task_description` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `id_project` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы task_tracker.Task: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `Task` DISABLE KEYS */;
/*!40000 ALTER TABLE `Task` ENABLE KEYS */;

-- Дамп структуры для таблица task_tracker.TasksUsers
CREATE TABLE IF NOT EXISTS `TasksUsers` (
  `id_task` int(10) DEFAULT NULL,
  `id_user` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы task_tracker.TasksUsers: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `TasksUsers` DISABLE KEYS */;
/*!40000 ALTER TABLE `TasksUsers` ENABLE KEYS */;

-- Дамп структуры для таблица task_tracker.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `verified` smallint(2) DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы task_tracker.Users: ~11 rows (приблизительно)
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

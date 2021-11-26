-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2021 at 09:13 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techcycling`
--

-- --------------------------------------------------------

--
-- Table structure for table `checkpoints`
--

CREATE TABLE `checkpoints` (
  `reg_code` varchar(50) NOT NULL,
  `location` int(10) NOT NULL,
  `points` int(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `timestamp` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checkpoints`
--

INSERT INTO `checkpoints` (`reg_code`, `location`, `points`, `createdAt`, `timestamp`) VALUES
('11111', 1, 10, '2021-02-02 02:41:57', NULL),
('11111', 2, 10, '2021-02-02 06:32:54', NULL),
('11111', 3, 10, '2021-02-02 06:32:54', NULL),
('11111', 4, 10, '2021-02-02 06:33:15', NULL),
('11111', 5, 10, '2021-02-04 02:59:33', NULL),
('12345', 1, 10, '2021-02-01 10:47:57', NULL),
('12345', 2, 10, '2021-02-01 10:47:57', NULL),
('12345', 3, 10, '2021-02-02 06:32:09', NULL),
('12345', 4, 10, '2021-02-02 06:32:09', NULL),
('12345', 5, 10, '2021-02-02 06:32:18', NULL),
('67890', 1, 10, '2021-02-02 06:33:15', NULL),
('67890', 2, 10, '2021-02-02 06:33:27', NULL),
('67890', 3, 10, '2021-02-02 02:41:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cyclist`
--

CREATE TABLE `cyclist` (
  `reg_code` varchar(50) NOT NULL,
  `nama_lengkap` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `perusahaan` varchar(30) NOT NULL,
  `jenis_sepeda` varchar(10) NOT NULL,
  `is_active` int(2) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cyclist`
--

INSERT INTO `cyclist` (`reg_code`, `nama_lengkap`, `email`, `perusahaan`, `jenis_sepeda`, `is_active`, `createdAt`, `updatedAt`) VALUES
('11111', 'Anjani', 'trianjani@gmail.com', 'Indo Surya', 'Road Bike', 1, '2021-02-02', NULL),
('12121', 'Ucrit', 'ucrit@gmail.com', 'Pets Indonesia', 'BMX', 1, '2021-02-02', '2021-02-02'),
('12345', 'Ahmad', 'aqilhalim@yahoo.co.id', 'Samakta Mitra', 'Ontel', 1, '2021-02-02', '2021-02-04'),
('67890', 'Halim', 'aqilhalim@yahoo.co.id', 'Samakta Mitra', 'Fixie', 1, '2021-02-02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `regcodes`
--

CREATE TABLE `regcodes` (
  `reg_code` varchar(50) NOT NULL,
  `company` varchar(50) DEFAULT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `regcodes`
--

INSERT INTO `regcodes` (`reg_code`, `company`, `createdAt`) VALUES
('11111', NULL, '2021-02-02'),
('12121', NULL, '2021-02-02'),
('12345', NULL, '2021-02-02'),
('22222', NULL, '2021-02-02'),
('67890', NULL, '2021-02-02'),
('aqil', NULL, '2021-02-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checkpoints`
--
ALTER TABLE `checkpoints`
  ADD PRIMARY KEY (`reg_code`,`location`);

--
-- Indexes for table `cyclist`
--
ALTER TABLE `cyclist`
  ADD PRIMARY KEY (`reg_code`);

--
-- Indexes for table `regcodes`
--
ALTER TABLE `regcodes`
  ADD PRIMARY KEY (`reg_code`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkpoints`
--
ALTER TABLE `checkpoints`
  ADD CONSTRAINT `checkpoints_ibfk_1` FOREIGN KEY (`reg_code`) REFERENCES `cyclist` (`reg_code`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

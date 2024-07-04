-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 02:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_application_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `contact`, `avatar`, `address`, `created_at`, `updated_at`) VALUES
('9b57dce1-6945-453c-8977-ec99b62db824', 'ehtisham', 'ehtisham@gmail.com', '$2b$10$JpB98IBLC9o1HSYiYXRrOe54Kx07mn0rLXPxkQVyJ7tJeM.jOfom6', 'ehtisham', 'khan', 'male', 21, '03459550908', 'profile.png', 'Abbottabad Pakistan', '2021-09-17 22:40:35', '2022-01-07 20:12:01');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `discipline` text NOT NULL,
  `session` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `vice_chancellor_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `admin_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `name`, `details`, `discipline`, `session`, `created_at`, `updated_at`, `teacher_id`, `vice_chancellor_id`, `admin_id`) VALUES
('feb8aadc-1da0-4e59-ade7-89321dd4827b', 'First Annoucemnet', 'orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lore.', 'Computer Science', 'Spring 2023', '2023-09-12 13:54:55', '2023-09-12 13:55:11', 'f5a7a758-3464-4651-a50e-e4852b2c7713', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `rollnumber` int(11) NOT NULL,
  `mobilenumber` varchar(255) NOT NULL,
  `classandsection` varchar(255) NOT NULL,
  `discipline` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subcategory` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `approved_or_rejected_by` varchar(255) DEFAULT NULL,
  `details` text NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `student_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `application_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `name`, `rollnumber`, `mobilenumber`, `classandsection`, `discipline`, `subject`, `category`, `purpose`, `date`, `status`, `approved_or_rejected_by`, `details`, `file`, `file_type`, `created_at`, `updated_at`, `student_id`, `application_type`) VALUES
('70cf5bc6-d1fd-494f-862c-48a3df8e9161', 'Aqsa123', 5507, '09007878601', 'CS 7th A', 'Computer Science', 'Application For result', 'result', 'personal', '2023-09-12T18:00', 'Accepted', 'f5a7a758-3464-4651-a50e-e4852b2c7713', 'Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.', '', '', '2023-09-12 13:58:28', '2023-09-12 13:59:33', '7d54318b-5bca-40b8-94f4-a1aa4a020b11', 'Normal');

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` char(36) NOT NULL,
  `teacher_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forwarded_applications`
--

CREATE TABLE `forwarded_applications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `vice_chancellor_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `application_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forwarded_applications`
--

INSERT INTO `forwarded_applications` (`id`, `created_at`, `updated_at`, `teacher_id`, `vice_chancellor_id`, `application_id`) VALUES
('5c7ee530-8da9-49d0-a7b2-2d2eebecf3f0', '2023-09-12 13:58:40', '2023-09-12 13:58:40', 'f5a7a758-3464-4651-a50e-e4852b2c7713', NULL, '70cf5bc6-d1fd-494f-862c-48a3df8e9161');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `teacher_id` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` varchar(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `remarks`
--

CREATE TABLE `remarks` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `details` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `teacher_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `vice_chancellor_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `application_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `name`, `created_at`, `updated_at`) VALUES
('f1b2b345-38b9-458e-bdce-ccd24110345c', 'Spring 2023', '2023-09-12 13:43:10', '2023-09-12 13:43:10');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `rollnumber` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `discipline` text NOT NULL,
  `session` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `rollnumber`, `contact`, `avatar`, `address`, `discipline`, `session`, `created_at`, `updated_at`) VALUES
('7d54318b-5bca-40b8-94f4-a1aa4a020b11', 'Aqsa123', 'aqsa8060@gmail.com', '$2b$08$kMjuHSRrVPQ0u12O3U/lJeaGoiTeJl5BoeZQ3ExW9T5C.WGwpIs..', 'Aqsa', 'Javaid', 'female', 25, 8346, '090078601', 'profile.png', 'Supply Abbottabad Pakistan', 'Computer Science', 'Spring 2023', '2023-09-12 13:44:42', '2023-09-12 13:47:26'),
('9e7c1d38-8293-4b80-a654-678e5d690c49', 'Khadija123', 'khadija066@gmail.com', '$2b$08$Y4Z.Lcww5xtrg/Jwkw3Xf.3bFNtuxRs7qtMZFhURKAbd5WWxa0qJ.', 'Khadija', 'Bibi', 'female', 24, 8349, '090078601', 'profile.png', 'Abbottabad Pakistan', 'Computer Science', 'Spring 2023', '2023-09-12 13:46:53', '2023-09-12 13:46:53');

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `student_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isHidden` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `contact`, `avatar`, `role`, `address`, `created_at`, `updated_at`) VALUES
('b9b3df52-86ee-4de3-b47f-e1b977c9554b', 'Aysha123', 'aysha@gmail.com', '$2b$08$PO3wjowa8d9i3QerhUI5qO/ov/pq2K657PUMk2VlCQPy5mIBbrSKe', 'Aysha', 'Aslam', 'female', 25, '090078601', 'profile.png', 'Coordinator Computer Science', 'Abbottabad Pakistan', '2023-09-12 13:53:42', '2023-09-12 13:53:42'),
('f5a7a758-3464-4651-a50e-e4852b2c7713', 'Sidra123', 'engr.sidra19@gmail.com', '$2b$08$jcA7KbbaxzeLT6Htxzk6iO1Fpy.lXKKFagZZuxoychNUNjrfc734O', 'Sidra', 'Zubair', 'female', 29, '090078601', 'profile.png', 'Chairman', 'Abbottabad Pakistan', '2021-10-04 19:07:55', '2023-08-26 19:43:15');

-- --------------------------------------------------------

--
-- Table structure for table `vice_chancellor`
--

CREATE TABLE `vice_chancellor` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vice_chancellor`
--

INSERT INTO `vice_chancellor` (`id`, `name`, `email`, `password`, `firstname`, `lastname`, `gender`, `age`, `contact`, `avatar`, `address`, `created_at`, `updated_at`) VALUES
('9b57dce1-6945-453c-8977-ec99b62db824', 'ehtisham12', 'ehtisham1234@gmail.com', '$2b$10$JpB98IBLC9o1HSYiYXRrOe54Kx07mn0rLXPxkQVyJ7tJeM.jOfom6', 'Ehtisham', 'Khan', 'male', 27, '03459550908', 'profile-pic (5).1687435641651.png', 'Abbottabad Pakistan', '2021-09-17 22:40:35', '2023-06-22 12:07:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `vice_chancellor_id` (`vice_chancellor_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forwarded_applications`
--
ALTER TABLE `forwarded_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `vice_chancellor_id` (`vice_chancellor_id`),
  ADD KEY `application_id` (`application_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `remarks`
--
ALTER TABLE `remarks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `vice_chancellor_id` (`vice_chancellor_id`),
  ADD KEY `application_id` (`application_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vice_chancellor`
--
ALTER TABLE `vice_chancellor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`vice_chancellor_id`) REFERENCES `vice_chancellor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `announcements_ibfk_3` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `forwarded_applications`
--
ALTER TABLE `forwarded_applications`
  ADD CONSTRAINT `forwarded_applications_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `forwarded_applications_ibfk_2` FOREIGN KEY (`vice_chancellor_id`) REFERENCES `vice_chancellor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `forwarded_applications_ibfk_3` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `remarks`
--
ALTER TABLE `remarks`
  ADD CONSTRAINT `remarks_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `remarks_ibfk_2` FOREIGN KEY (`vice_chancellor_id`) REFERENCES `vice_chancellor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `remarks_ibfk_3` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

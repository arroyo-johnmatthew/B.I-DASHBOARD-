-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2025 at 05:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `postcode` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `address1`, `address2`, `city`, `state`, `postcode`) VALUES
(1, '456 Oak Ave', '67 Spaulding', 'Metropolis', 'NY', '10001'),
(2, '789 Pine Rd', 'Suite 10', 'Gotham', 'CA', '90210'),
(3, '654 Cedar Lane', 'Unit 28', 'Makati', 'NCR', '44114'),
(4, '1010 Maple Street', '34 Spaulding', 'Pasay', 'NCR', '1693'),
(5, '19 Sealion', '62 Sealion', 'Taguig', 'NCR', '1630'),
(6, '88 Tech Park', 'Tower 3, Unit 15A', 'Makati', 'NCR', '1200'),
(7, '124 Pearl Drive', 'Penthouse', 'Pasig', 'NCR', '1605'),
(8, '88 Sunset Blvd', 'Suite 210', 'Los Angeles', 'CA', '9002'),
(9, '75 Broadway Ave', 'Floor 5', 'Seoul', 'Seoul Metropolitan', '1002'),
(10, '500 Lake Shore Drive', 'Unit 1102', 'Seattle', 'WA', '9810'),
(11, '101 Innovation Drive', '5th Floor', 'Taguig', 'NCR', '1630'),
(12, '202 Techno Park', '4th Unit', 'Cebu', 'Cebu', '6000'),
(13, '303 Greenfield Ave', 'Unit 12B', 'Davao', 'Davao Region', '800');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(40) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `shipping_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(40) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `subtotal`, `shipping_fee`, `tax`, `total`, `status`, `created_at`) VALUES
(1, '1', 99.90, 5.00, 9.99, 114.89, 'Shipped', '2025-05-25 01:53:40'),
(2, '2', 172.50, 5.00, 17.25, 194.75, 'Shipped', '2025-05-25 01:58:13'),
(3, '3', 99.96, 5.00, 10.00, 114.96, 'Delivered', '2025-05-25 02:05:26'),
(4, '4', 118.50, 5.00, 11.85, 135.35, 'Processing', '2025-05-25 02:17:31'),
(5, '5', 100.00, 5.00, 10.00, 115.00, 'Pending', '2025-05-26 00:27:52'),
(6, '6', 15000.00, 5.00, 1500.00, 16505.00, 'Shipped', '2025-05-31 20:15:34'),
(7, '7', 25000.00, 5.00, 2500.00, 27505.00, 'Delivered', '2025-05-31 20:20:27'),
(8, '8', 12499.95, 5.00, 1249.99, 13754.94, 'Delivered', '2025-05-31 20:25:06'),
(9, '9', 1299.50, 5.00, 129.95, 1434.45, 'Processing', '2025-05-31 20:29:38'),
(10, '10', 33299.00, 5.00, 3329.90, 36633.90, 'Processing', '2025-05-31 20:33:42'),
(11, '11', 1200.00, 5.00, 120.00, 1325.00, 'Shipped', '2025-06-01 09:52:55'),
(12, '12', 18000.00, 5.00, 1800.00, 19805.00, 'Delivered', '2025-06-01 09:55:46'),
(13, '13', 12000.00, 5.00, 1200.00, 13205.00, 'Processing', '2025-06-01 10:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `inventory` int(11) DEFAULT NULL,
  `category` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `inventory`, `category`) VALUES
(1, 'SuperGadget', 'High-tech gadget for daily use', 49.95, 100, 'Electronics'),
(2, 'MegaTool', 'Durable and versatile toolset', 34.50, 75, 'Tools'),
(3, 'PowerBank', '20000mAh portable charger', 24.99, 120, 'Accessories'),
(4, 'SmartLamp', 'Voice-controlled LED smart lamp', 39.50, 65, 'HomeTech'),
(5, 'ARASHI Fan', 'Its a merchandise from Japan for there concert.', 50.00, 50, '5'),
(6, 'Gaming Laptop', 'High-end gaming laptop', 15000.00, 5, 'Electronics'),
(7, '85-inch 8K Smart TV', 'Ultra HD 8K Smart Television', 25000.00, 10, 'Electronics'),
(8, 'ARASHI Album', 'An Jpop album made in japan', 2499.99, 10, 'Fan Merch'),
(9, 'Canon camera', 'Full-frame Canon with 24MP sensor', 1299.50, 15, 'Photography'),
(10, 'MacBook Pro M3', 'Apple MacBook Pro 16 with M3 Pro chip', 33299.00, 5, 'Computing'),
(11, 'Laser TV Projector', '4K Ultra Short Throw Laser Projector', 1200.00, 8, 'Electronics'),
(12, 'Drone Camera Pro', 'Professional 8K drone with AI tracking', 9000.00, 15, 'Gadgets'),
(13, 'Smart Bed', 'Adjustable smart bed with sleep tracking', 12000.00, 4, 'Home Tech');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shipping_address_id` int(11) NOT NULL,
  `billing_address_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `order_id`, `product_id`, `user_id`, `shipping_address_id`, `billing_address_id`, `price`, `quantity`, `date`) VALUES
(1, 1, 1, 1, 1, 1, 10000.00, 2, '2025-05-25'),
(2, 2, 2, 2, 2, 2, 1500.00, 5, '2025-05-25'),
(3, 3, 3, 3, 3, 3, 2500.00, 4, '2025-05-25'),
(4, 4, 4, 4, 4, 4, 7300.00, 3, '2025-05-26'),
(5, 5, 5, 5, 5, 5, 500.00, 2, '2025-05-26'),
(6, 6, 6, 6, 6, 6, 15000.00, 1, '2025-05-27'),
(7, 7, 7, 7, 7, 7, 21000.00, 1, '2025-05-27'),
(8, 8, 8, 8, 8, 8, 2499.99, 5, '2025-05-29'),
(9, 9, 9, 9, 9, 9, 1299.50, 1, '2025-05-29'),
(10, 10, 10, 10, 10, 10, 33299.00, 1, '2025-05-31'),
(11, 11, 11, 11, 11, 11, 1200.00, 1, '2025-05-31'),
(12, 12, 12, 12, 12, 12, 9000.00, 2, '2025-06-01'),
(13, 13, 13, 13, 13, 13, 12000.00, 1, '2025-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(80) DEFAULT NULL,
  `last_name` varchar(80) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `is_active`) VALUES
(1, 'Anna', 'Lee', 'annalee@gmail.com', 'annalee85', '9874563212', b'1'),
(2, 'Carlos', 'Martinez', 'carlos.martinez@gmail.com', 'c123martinez', '9873214565', b'1'),
(3, 'Olivia', 'Davis', 'olivia.davis@gmail.com', 'olivedavis90', '9638521474', b'1'),
(4, 'Marcus', 'Brown', 'marcusbrown@gmail.com', 'marcus1985', '9645321874', b'1'),
(5, 'Bea', 'Ynion', 'mabeamaeynion@gmail.com', 'beamaeynion08', '9695971397', b'1'),
(6, 'Lucas', 'Villanueva', 'lucasvillanueva@gmail.com', 'LucasVill', '09171236548', b'1'),
(7, 'Andrea', 'Reyes', 'andrea98@gmail.com', 'AndreaReyes', '09357159687', b'1'),
(8, 'Emily', 'Johnson', 'emilyjohnson@gmail.com', 'emilyson', '09638521478', b'1'),
(9, 'Jisoo', 'Kim', 'sooyaaa@gmail.com', 'sooyaaa', '09362514879', b'1'),
(10, 'Linh', 'Nguyen', 'linhnguyen@gmail.com', 'linnnn', '09631478521', b'1'),
(11, 'Miguel', 'Dela Cruz', 'migueldelacruz@gmail.com', 'MiGuel', '09638524175', b'1'),
(12, 'Erika', 'Tan', 'erikatan@gmail.com', 'ErikaTan', '09324568914', b'1'),
(13, 'Carlo', 'Bautista', 'carlobautista@gmail.com', 'CarloBautista', '09365874365', b'1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shipping_address_id` (`shipping_address_id`),
  ADD KEY `billing_address_id` (`billing_address_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `sales_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `sales_ibfk_4` FOREIGN KEY (`shipping_address_id`) REFERENCES `locations` (`id`),
  ADD CONSTRAINT `sales_ibfk_5` FOREIGN KEY (`billing_address_id`) REFERENCES `locations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

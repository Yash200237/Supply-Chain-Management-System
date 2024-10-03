CREATE TABLE `OrderStatus` (
  `status_ID` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(20) NOT NULL,
  `description` VARCHAR(200),
  PRIMARY KEY (`status_ID`)
);

CREATE TABLE `Store` (
  `city` VARCHAR(20) NOT NULL,
  `store_ID` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (`store_ID`)
);

CREATE TABLE `Route` (
  `route_ID` INT UNSIGNED NOT NULL,
  `store_ID` TINYINT UNSIGNED NOT NULL,
  `duration` NUMERIC(4,2),
  `path_description` VARCHAR(200),
  PRIMARY KEY (`route_ID`),
  CONSTRAINT `fk_route_store` FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`) ON DELETE CASCADE
);

CREATE TABLE `Customer` (
  `customer_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `city` VARCHAR(20) NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(64) BINARY NOT NULL,  -- Changed to NOT NULL
  `phone_number` VARCHAR(10),
  `address` VARCHAR(100),
  `customer_type` ENUM('retailer', 'wholesaler', 'end customer') NOT NULL,
  PRIMARY KEY (`customer_ID`)
);

CREATE TABLE `DriverAssistant` (
  `driverA_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(64) BINARY NOT NULL,  -- Changed to NOT NULL
  `phone_number` VARCHAR(10),
  `total_hours` NUMERIC(6,2),
  `weekly_hours` NUMERIC(4,2),
  `monthly_salary` NUMERIC(8,2),
  PRIMARY KEY (`driverA_ID`),
  CHECK (`weekly_hours` BETWEEN 0 AND 60)
);

CREATE TABLE `Manager` (
  `manager_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(64) BINARY NOT NULL,  -- Changed to NOT NULL
  `phone_number` VARCHAR(10),
  `store_ID` TINYINT UNSIGNED NOT NULL,
  `salary` NUMERIC(8,2),
  PRIMARY KEY (`manager_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

CREATE TABLE `Driver` (
  `driver_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `username` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) DEFAULT NULL,
  `password` VARCHAR(64) BINARY NOT NULL,  -- Changed to NOT NULL
  `phone_number` VARCHAR(10),
  `total_hours` NUMERIC(6,2),
  `weekly_hours` NUMERIC(4,2),
  `monthly_salary` NUMERIC(8,2),
  PRIMARY KEY (`driver_ID`),
  CHECK (`weekly_hours` BETWEEN 0 AND 40)
);

CREATE TABLE `Truck` (
  `store_ID` TINYINT UNSIGNED NOT NULL,
  `truck_Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `capacity` NUMERIC(8,2),
  PRIMARY KEY (`truck_Id`),
  CONSTRAINT `fk_truck_store` FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`) ON DELETE SET NULL
);

CREATE TABLE `TruckSchedule` (
  `schedule_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `driver_ID` INT UNSIGNED NOT NULL,
  `driverA_ID` INT UNSIGNED NOT NULL,
  `truck_Id` INT UNSIGNED NOT NULL,
  `route_ID` INT UNSIGNED NOT NULL,
  `time` TIME NOT NULL,  -- Changed to NOT NULL
  `date` DATE NOT NULL,  -- Changed to NOT NULL
  `manager_ID` INT UNSIGNED NOT NULL,
  `status` VARCHAR(10),
  PRIMARY KEY (`schedule_ID`),
  FOREIGN KEY (`driverA_ID`) REFERENCES `DriverAssistant`(`driverA_ID`),
  FOREIGN KEY (`route_ID`) REFERENCES `Route`(`route_ID`),
  FOREIGN KEY (`manager_ID`) REFERENCES `Manager`(`manager_ID`),
  FOREIGN KEY (`driver_ID`) REFERENCES `Driver`(`driver_ID`),
  FOREIGN KEY (`truck_Id`) REFERENCES `Truck`(`truck_Id`)
);

CREATE TABLE `Order` (
  `order_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_ID` INT UNSIGNED NOT NULL,
  `route_ID` INT UNSIGNED NOT NULL,
  `status_ID` INT NOT NULL,
  `time` TIME NOT NULL,  -- Changed to NOT NULL
  `date` DATE NOT NULL,  -- Changed to NOT NULL
  `total_volume` NUMERIC(8,2),
  `schedule_ID` INT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`order_ID`),
  CONSTRAINT `fk_order_status` FOREIGN KEY (`status_ID`) REFERENCES `OrderStatus`(`status_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_order_route` FOREIGN KEY (`route_ID`) REFERENCES `Route`(`route_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_ID`) REFERENCES `Customer`(`customer_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_order_schedule` FOREIGN KEY (`schedule_ID`) REFERENCES `TruckSchedule`(`schedule_ID`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `Product` (
  `product_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `price` NUMERIC(8,2),
  `discount` INT,
  `volume` NUMERIC(8,2),
  PRIMARY KEY (`product_ID`)
);

CREATE TABLE `OrderProduct` (
  `order_ID` INT UNSIGNED NOT NULL,
  `product_ID` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`order_ID`, `product_ID`),
  FOREIGN KEY (`order_ID`) REFERENCES `Order`(`order_ID`),
  FOREIGN KEY (`product_ID`) REFERENCES `Product`(`product_ID`)
);

CREATE TABLE `Train` (
  `train_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `time` TIME NOT NULL,  -- Changed to NOT NULL
  `day` VARCHAR(15),
  `capacity` NUMERIC(8,2),
  `destination` VARCHAR(50),
  PRIMARY KEY (`train_ID`)
);

CREATE TABLE `TrainSchedule` (
  `train_ID` INT UNSIGNED NOT NULL,
  `order_ID` INT UNSIGNED NOT NULL,
  `manager_ID` INT UNSIGNED NOT NULL,
  `time` TIME NOT NULL,  -- Changed to NOT NULL
  `date` DATE NOT NULL,  -- Changed to NOT NULL
  FOREIGN KEY (`train_ID`) REFERENCES `Train`(`train_ID`),
  FOREIGN KEY (`manager_ID`) REFERENCES `Manager`(`manager_ID`)
);

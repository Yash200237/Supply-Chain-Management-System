CREATE TABLE `OrderStatus` (
  `status_ID` INT,
  `status` varchar(20),
  `description` varchar(50),
  PRIMARY KEY (`status_ID`)
);

CREATE TABLE `Store` (
  `city` varchar(7),
  `store_ID` binary(16),
  PRIMARY KEY (`store_ID`)
);

CREATE TABLE `Route` (
  `route_ID` binary(16),
  `store_ID` binary(16),
  `duration` numeric(4,2),
  `path_description` varchar(50),
  PRIMARY KEY (`route_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

CREATE TABLE `Customer` (
  `customer_ID` binary(16),
  `first_name` varchar(20),
  `last_name` varchar(20),
  `username` varchar(20),
  `email` varchar(50),
  `password` varchar(64),
  `phone_number` varchar(10),
  `address` varchar(50),
  `customer_type` varchar(20),
  PRIMARY KEY (`customer_ID`)
);

CREATE TABLE `DriverAssistant` (
  `driverA_ID` binary(16),
  `first_name` varchar(20),
  `last_name` varchar(20),
  `username` varchar(20),
  `email` varchar(50),
  `password` varchar(64),
  `phone_number` varchar(10),
  `total_hours` numeric(6,2),
  `weekly_hours` numeric(4,2),
  `monthly_salary` numeric(8,2),
  PRIMARY KEY (`driverA_ID`)
);

CREATE TABLE `Manager` (
  `manager_ID` binary(16),
  `first_name` varchar(20),
  `last_name` varchar(20),
  `username` varchar(20),
  `email` varchar(50),
  `password` varchar(64),
  `phone_number` varchar(10),
  `store_ID` binary(16),
  `salary` numeric(8,2),
  PRIMARY KEY (`manager_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

CREATE TABLE `Driver` (
  `driver_ID` binary(16),
  `first_name` varchar(20),
  `last_name` varchar(20),
  `username` varchar(20),
  `email` varchar(50),
  `password` varchar(64),
  `phone_number` varchar(10),
  `total_hours` numeric(6,2),
  `weekly_hours` numeric(4,2),
  `monthly_salary` numeric(8,2),
  PRIMARY KEY (`driver_ID`)
);

CREATE TABLE `Truck` (
  `store_ID` binary(16),
  `truck_Id` binary(16),
  `capacity` numeric(8,2),
  PRIMARY KEY (`truck_Id`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

CREATE TABLE `TruckSchedule` (
  `schedule_ID` binary(16),
  `driver_ID` binary(16),
  `driverA_ID` binary(16),
  `truck_Id` binary(16),
  `route_ID` binary(16),
  `time` TIME,
  `date` DATE,
  `manager_ID` binary(16),
  `status` varchar(10),
  PRIMARY KEY (`schedule_ID`),
  FOREIGN KEY (`driverA_ID`) REFERENCES `DriverAssistant`(`driverA_ID`),
  FOREIGN KEY (`route_ID`) REFERENCES `Route`(`route_ID`),
  FOREIGN KEY (`manager_ID`) REFERENCES `Manager`(`manager_ID`),
  FOREIGN KEY (`driver_ID`) REFERENCES `Driver`(`driver_ID`),
  FOREIGN KEY (`truck_Id`) REFERENCES `Truck`(`truck_Id`)
);

CREATE TABLE `Order` (
  `order_ID` binary(16),
  `customer_ID` binary(16),
  `route_ID` binary(16),
  `status_ID` INT,
  `time` TIME,
  `date` DATE,
  `total_volume` numeric(8,2),
  `schedule_ID` binary(16),
  PRIMARY KEY (`order_ID`),
  FOREIGN KEY (`status_ID`) REFERENCES `OrderStatus`(`status_ID`),
  FOREIGN KEY (`route_ID`) REFERENCES `Route`(`route_ID`),
  FOREIGN KEY (`customer_ID`) REFERENCES `Customer`(`customer_ID`),
  FOREIGN KEY (`schedule_ID`) REFERENCES `TruckSchedule`(`schedule_ID`)
);

CREATE TABLE `Product` (
  `product_ID` binary(16),
  `name` varchar(20),
  `price` numeric(8,2),
  `discount` INT,
  `volume` numeric(8,2),
  PRIMARY KEY (`product_ID`)
);

CREATE TABLE `OrderProduct` (
  `order_ID` binary(16),
  `product_ID` binary(16),
  `quantity` INT,
  FOREIGN KEY (`order_ID`) REFERENCES `Order`(`order_ID`),
  FOREIGN KEY (`product_ID`) REFERENCES `Product`(`product_ID`)
);

CREATE TABLE `Train` (
  `train_ID` binary(16),
  `time` TIME,
  `day` varchar(15),
  `capacity` numeric(8,2),
  `destination` varchar(50),
  PRIMARY KEY (`train_ID`)
);

CREATE TABLE `TrainSchedule` (
  `train_ID` binary(16),
  `order_ID` binary(16),
  `manager_ID` binary(16),
  FOREIGN KEY (`train_ID`) REFERENCES `Train`(`train_ID`),
  FOREIGN KEY (`manager_ID`) REFERENCES `Manager`(`manager_ID`)
);

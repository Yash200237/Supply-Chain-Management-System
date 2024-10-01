-- Insert into Customer
INSERT INTO Customer (customer_ID, first_name, last_name, username, email, password, phone_number, address, customer_type) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Alice', 'Johnson', 'alicejohnson', 'alice.j@example.com', 'alice123', '5551231111', '123 Apple St', 'retailer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Bob', 'Smith', 'bobsmith', 'bob.smith@example.com', 'bob123', '5551241112', '456 Orange St', 'wholesaler'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Charlie', 'Brown', 'charliebrown', 'charlie.b@example.com', 'charlie123', '5551251113', '789 Peach St', 'end customer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Diana', 'Ross', 'dianaross', 'diana.r@example.com', 'diana123', '5551261114', '101 Pine St', 'retailer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Ethan', 'Clark', 'ethanclark', 'ethan.c@example.com', 'ethan123', '5551271115', '202 Maple St', 'wholesaler'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Fiona', 'Green', 'fionagreen', 'fiona.g@example.com', 'fiona123', '5551281116', '303 Oak St', 'end customer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'George', 'Harris', 'georgeharris', 'george.h@example.com', 'george123', '5551291117', '404 Birch St', 'retailer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Hannah', 'Moore', 'hannahmoore', 'hannah.m@example.com', 'hannah123', '5551301118', '505 Cedar St', 'wholesaler'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Isaac', 'Lewis', 'isaaclewis', 'isaac.l@example.com', 'isaac123', '5551311119', '606 Spruce St', 'end customer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Julia', 'Walker', 'juliawalker', 'julia.w@example.com', 'julia123', '5551321120', '707 Fir St', 'retailer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Kevin', 'Hall', 'kevinhall', 'kevin.h@example.com', 'kevin123', '5551331121', '808 Elm St', 'wholesaler'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Laura', 'King', 'lauraking', 'laura.k@example.com', 'laura123', '5551341122', '909 Willow St', 'end customer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Michael', 'Scott', 'michaelscott', 'michael.s@example.com', 'michael123', '5551351123', '1010 Cherry St', 'retailer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Nina', 'Taylor', 'ninataylor', 'nina.t@example.com', 'nina123', '5551361124', '1111 Beech St', 'wholesaler'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Oliver', 'Anderson', 'oliveranderson', 'oliver.a@example.com', 'oliver123', '5551371125', '1212 Cedar St', 'end customer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Paula', 'Martin', 'paulamartin', 'paula.m@example.com', 'paula123', '5551381126', '1313 Maple St', 'retailer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Quincy', 'Robinson', 'quincyrobinson', 'quincy.r@example.com', 'quincy123', '5551391127', '1414 Spruce St', 'wholesaler'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Rachel', 'Thompson', 'rachelthompson', 'rachel.t@example.com', 'rachel123', '5551401128', '1515 Pine St', 'end customer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Steve', 'Evans', 'steveevans', 'steve.e@example.com', 'steve123', '5551411129', '1616 Fir St', 'retailer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Tina', 'Wright', 'tinawright', 'tina.w@example.com', 'tina123', '5551421130', '1717 Cherry St', 'wholesaler');



-- Insert into Driver
INSERT INTO Driver (driver_ID, first_name, last_name, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Michael', 'Williams', 'michaelw', 'michael.w@example.com', 'password123', '5551231001', 40.0, 20.0, 40000),
(UNHEX(REPLACE(UUID(), '-', '')), 'David', 'Brown', 'davidb', 'david.b@example.com', 'password789', '5551231003', 45.0, 22.5, 42000),
(UNHEX(REPLACE(UUID(), '-', '')), 'John', 'Miller', 'johnm', 'john.m@example.com', 'password102', '5551231005', 50.0, 25.0, 45000),
(UNHEX(REPLACE(UUID(), '-', '')), 'William', 'Martinez', 'williamm', 'william.m@example.com', 'password104', '5551231007', 47.0, 23.5, 43000),
(UNHEX(REPLACE(UUID(), '-', '')), 'James', 'Clark', 'jamesc', 'james.c@example.com', 'password106', '5551231009', 39.0, 19.5, 39500),
(UNHEX(REPLACE(UUID(), '-', '')), 'Daniel', 'Lewis', 'daniell', 'daniel.l@example.com', 'password108', '5551231011', 46.0, 23.0, 42500),
(UNHEX(REPLACE(UUID(), '-', '')), 'Chloe', 'Walker', 'chloew', 'chloe.w@example.com', 'password109', '5551231012', 43.0, 21.5, 41500),
(UNHEX(REPLACE(UUID(), '-', '')), 'Lucas', 'Perez', 'lucasp', 'lucas.p@example.com', 'password110', '5551231013', 44.0, 22.0, 42000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Mia', 'Young', 'miay', 'mia.y@example.com', 'password111', '5551231014', 40.0, 20.0, 40000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Ethan', 'King', 'ethank', 'ethan.k@example.com', 'password112', '5551231015', 37.0, 18.5, 38500);



-- Insert into DriverAssistant
INSERT INTO DriverAssistant (driverA_ID, first_name, last_name, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Tom', 'Lee', 'tomlee', 'tom@assist.com', 'passtom', '5556667777', 65.0, 22.0, 30000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Emma', 'Clark', 'emmaclark', 'emma@assist.com', 'passemma', '5557778888', 70.0, 25.0, 32000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Alex', 'Brooks', 'alexbrooks', 'alex@assist.com', 'passalex', '5558889999', 68.0, 24.0, 31000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Sophia', 'Turner', 'sophiaturner', 'sophia@assist.com', 'passsophia', '5559991111', 62.0, 21.0, 29000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Daniel', 'Morris', 'danielmorris', 'daniel@assist.com', 'passdaniel', '5551112222', 75.0, 27.0, 34000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Liam', 'Harris', 'liamharris', 'liam@assist.com', 'passliam', '5552223333', 64.0, 22.0, 30000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Chloe', 'Hill', 'chloehill', 'chloe@assist.com', 'passchloe', '5553334444', 67.0, 23.5, 31000),
(UNHEX(REPLACE(UUID(), '-', '')), 'James', 'Nelson', 'jamesnelson', 'james@assist.com', 'passjames', '5554445555', 72.0, 26.0, 33000),
(UNHEX(REPLACE(UUID(), '-', '')), 'Olivia', 'Cooper', 'oliviacooper', 'olivia@assist.com', 'passolivia', '5555556666', 69.0, 24.5, 31500),
(UNHEX(REPLACE(UUID(), '-', '')), 'Lucas', 'Parker', 'lucasparker', 'lucas@assist.com', 'passlucas', '5556667777', 66.0, 23.0, 30500);


-- Insert into Store
INSERT INTO Store (store_ID, city) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Kandy'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Colombo'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Negombo'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Galle'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Matara'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Jaffna'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Trincomalee');


-- Insert into Product
INSERT INTO Product (product_ID, name, price, discount, volume) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'T-shirt', 2000, 5, 0.3),
(UNHEX(REPLACE(UUID(), '-', '')), 'Jeans', 5000, 1, 0.8),
(UNHEX(REPLACE(UUID(), '-', '')), 'Sneakers', 7500, 8, 1.2),
(UNHEX(REPLACE(UUID(), '-', '')), 'Backpack', 4500, 2, 1.5),
(UNHEX(REPLACE(UUID(), '-', '')), 'Sunglasses', 500, 0, 0.2),
(UNHEX(REPLACE(UUID(), '-', '')), 'Wristwatch', 3200, 5, 0.3),
(UNHEX(REPLACE(UUID(), '-', '')), 'Wallet', 2500, 1, 0.2),
(UNHEX(REPLACE(UUID(), '-', '')), 'Handbag', 5500, 8, 0.7),
(UNHEX(REPLACE(UUID(), '-', '')), 'Belt', 1800, 5, 0.1),
(UNHEX(REPLACE(UUID(), '-', '')), 'Cap', 1500, 7, 0.2),
(UNHEX(REPLACE(UUID(), '-', '')), 'Socks', 100, 0, 0.1),
(UNHEX(REPLACE(UUID(), '-', '')), 'Jacket', 1000, 0, 1.8),
(UNHEX(REPLACE(UUID(), '-', '')), 'Dress', 7000, 2, 1.0),
(UNHEX(REPLACE(UUID(), '-', '')), 'Blender', 9000, 10, 2.5),
(UNHEX(REPLACE(UUID(), '-', '')), 'Coffee Maker', 10000, 15, 3.0),
(UNHEX(REPLACE(UUID(), '-', '')), 'Toaster', 8000, 10, 1.8),
(UNHEX(REPLACE(UUID(), '-', '')), 'Iron', 4500, 8, 1.4),
(UNHEX(REPLACE(UUID(), '-', '')), 'Cookware Set', 12000, 20, 5.0),
(UNHEX(REPLACE(UUID(), '-', '')), 'Bath Towel', 2500, 0, 1.0),
(UNHEX(REPLACE(UUID(), '-', '')), 'Pillow', 3000, 2, 1.2);


-- Insert into Train
INSERT INTO Train (train_ID, time, day, capacity, destination) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), '08:00:00', 'Monday', 2000, 'Colombo'),
(UNHEX(REPLACE(UUID(), '-', '')), '14:00:00', 'Monday', 2000, 'Negombo'),
(UNHEX(REPLACE(UUID(), '-', '')), '08:00:00', 'Tuesday', 1800, 'Galle'),
(UNHEX(REPLACE(UUID(), '-', '')), '14:00:00', 'Tuesday', 1800, 'Matara'),
(UNHEX(REPLACE(UUID(), '-', '')), '08:00:00', 'Wednesday', 2200, 'Jaffna'),
(UNHEX(REPLACE(UUID(), '-', '')), '14:00:00', 'Wednesday', 2200, 'Trincomalee'),
(UNHEX(REPLACE(UUID(), '-', '')), '08:00:00', 'Thursday', 1900, 'Colombo'),
(UNHEX(REPLACE(UUID(), '-', '')), '14:00:00', 'Thursday', 1900, 'Negombo'),
(UNHEX(REPLACE(UUID(), '-', '')), '08:00:00', 'Friday', 2100, 'Galle'),
(UNHEX(REPLACE(UUID(), '-', '')), '14:00:00', 'Friday', 2100, 'Matara'),
(UNHEX(REPLACE(UUID(), '-', '')), '08:00:00', 'Saturday', 2000, 'Jaffna'),
(UNHEX(REPLACE(UUID(), '-', '')), '14:00:00', 'Saturday', 2000, 'Trincomalee'),
(UNHEX(REPLACE(UUID(), '-', '')), '08:00:00', 'Sunday', 2000, 'Colombo'),
(UNHEX(REPLACE(UUID(), '-', '')), '14:00:00', 'Sunday', 2000, 'Negombo');


-- Insert into OrderStatus
INSERT INTO OrderStatus (status_ID, status, description) VALUES 
(1, 'Processing', 'Order is successfully placed and being processed'),
(2, 'Dispatched', 'Order has been dispatched from the main store'),
(3, 'Out for delivery', 'Order has been dispatched from the local store'),
(4, 'Delivered', 'Order has been delivered'),
(5, 'Cancelled', 'Order was cancelled');



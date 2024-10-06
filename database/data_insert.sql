-- Insert into Customer
INSERT INTO Customer (first_name, last_name, city, username, email, password, phone_number, address, customer_type) VALUES
('Supun', 'Peiris', 'Kandy', 'supunpeiris', 'supunp@gmail.com', SHA2('supunp123', 256), '0711234567', 'No 115, Haragama, Kapuliyadda, Talathuoya', 'retailer'),
('Sapumal', 'Siriwardhana', 'Colombo', 'sapumalsiriwardhana', 'sapumals@gmail.com', SHA2('sapumals123', 256), '0761234967', '411 Galle Road, Colombo 03', 'wholesaler'),
('Shriya', 'Shantha', 'Negombo', 'shriyashantha', 'shriyas@gmail.com', SHA2('shriyas123', 256), '0768234967', 'No 24, 1st Cross Street, Negombo', 'end customer'),
('Evon', 'Gunathilaka', 'Galle', 'evongunathilaka', 'evong@gmail.com', SHA2('evong123', 256), '0763334967', '590 Galle Road, Galle', 'wholesaler'),
('Fiona', 'Fernando', 'Matara', 'fionafernando', 'fionaf@gmail.com', SHA2('fionaf123', 256), '0717934567', 'No 3/4, 1st Lane, Upatissa Mawatha, Walgama South, Matara', 'end customer'),
('Georgina', 'Alvis', 'Jaffna', 'georginaalvis', 'georgea@gmail.com', SHA2('georgea123', 256), '0714434567', 'Nellandai Veethi, Thumpalai, Point Pedro', 'retailer'),
('Hannah', 'Jayaweera', 'Trincomalee', 'hannahjayaweera', 'hannahj@gmail.com', SHA2('hannahj123', 256), '0761114967', 'B6, Panichankemi, Trincomalee', 'wholesaler'),
('Isaac', 'Newton', 'Kandy', 'isaacnewton', 'isaacn@gmail.com', SHA2('isaacn123', 256), '0708132497', 'No 78, Ullandupitiya Rd, Werellagama', 'end customer'),
('Julia', 'Premawardhana', 'Colombo', 'juliapremawardhana', 'juliap@gmail.com', SHA2('juliap123', 256), '0700922497', '200 Union Place, Colombo 02', 'retailer'),
('Kevin', 'Balasooriya', 'Negombo', 'kevinbalasooriya', 'kevinb@gmail.com', SHA2('kevinb123', 256), '0714035267', 'No 17, Mankuliya Road, Negombo', 'wholesaler'),
('Laura', 'Aponsu', 'Galle', 'lauraaponsu', 'lauraa@gmail.com', SHA2('lauraa123', 256), '0769900267', '188 Main Street, Galle', 'end customer'),
('Michael', 'Perera', 'Matara', 'michaelperera', 'michaelp@gmail.com', SHA2('michaelp123', 256), '0708135557', 'No 107, Dehigaspe, Pitabeddara', 'retailer'),
('Soffy', 'Taylor', 'Jaffna', 'soffytaylor', 'soffyt@gmail.com', SHA2('soffyt123', 256), '0717835557', 'St. Mary’s Lane, Kopay, Jaffna', 'wholesaler'),
('Patrick', 'Anderson', 'Trincomalee', 'patrickanderson', 'patricka@gmail.com', SHA2('patricka123', 256), '0711111157', 'B34, Hulogedara, Trincomalee', 'end customer'),
('Piyadasa', 'Samarasekara', 'Kandy', 'piyadasasamarasekara', 'piyadasas@gmail.com', SHA2('piyadasas123', 256), '0761654467', 'No 85/8, Station Road, Katugastota', 'retailer'),
('Amali', 'Karunarathna', 'Colombo', 'amalikarunarathna', 'amalik@gmail.com', SHA2('amalik123', 256), '0763448902', '65 Maligawatte Road, Colombo 10', 'wholesaler'),
('Sithumi', 'Jayasinghe', 'Negombo', 'sithumijayasinghe', 'sithumij@gmail.com', SHA2('sithumij123', 256), '0751653367', 'No 4, Kudapaduwa, Negombo', 'end customer'),
('Sunimal', 'Vidhana', 'Galle', 'sunimalvidhana', 'sunimalv@gmail.com', SHA2('sunimalv123', 256), '0741653375', 'No 245/5, SI, Ransiri Uyana, Moris Rd, Galle', 'retailer'),
('Tina', 'Kariyawasam', 'Matara', 'tinakariyawasam', 'tinak@gmail.com', SHA2('tinak123', 256), '0719999991', 'No 72/19, Aswatta, Kirimetimulla, Thelijjawila', 'wholesaler'),
('Diana', 'Peiris', 'Jaffna', 'dianapeiris', 'dianap@gmail.com', SHA2('dianap123', 256), '0760003991', '657/1 Hospital Road, Jaffna', 'retailer');


-- Insert into Driver
INSERT INTO Driver (first_name, last_name, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
('Nimal', 'Alvis', 'nimala', 'nimala@gmail.com', SHA2('password123', 256), '0711112223', 140.00, 20.00, 40000.00),
('Kamal', 'Perera', 'kamalp', 'kamalp@gmail.com', SHA2('password789', 256), '0711122334', 145.00, 22.50, 42000.00),
('Bimal', 'Fernando', 'bimalf', 'bimalf@gmail.com', SHA2('password102', 256), '0713322114', 150.00, 25.00, 45000.00),
('Pathum', 'Kumara', 'pathumk', 'pathumk@gmail.com', SHA2('password104', 256), '0717788991', 147.00, 23.50, 43000.00),
('Kantha', 'Lakshan', 'kanthal', 'kanthal@gmail.com', SHA2('password106', 256), '0714455661', 139.00, 19.50, 39500.00),
('Shantha', 'Rathna', 'shanthar', 'shanthar@gmail.com', SHA2('password108', 256), '0713344990', 146.00, 23.00, 42500.00),
('Priyantha', 'Peiris', 'priyanthap', 'priyanthap@gmail.com', SHA2('password109', 256), '0718833221', 143.00, 21.50, 41500.00),
('Lasantha', 'Karunarathna', 'lasanthak', 'lasanthak@gmail.com', SHA2('password110', 256), '0715500883', 144.00, 23.00, 42000.00),
('Krishantha', 'Kariyawasam', 'krishanthak', 'krishanthak@gmail.com', SHA2('password111', 256), '0714400558', 140.00, 20.00, 40000.00),
('Dimantha', 'Aponsu', 'dimanthaa', 'dimanthaa@gmail.com', SHA2('password112', 256), '0710099335', 137.00, 18.50, 38500.00),
('Nishan', 'Dissanayake', 'nishand', 'nishand@gmail.com', SHA2('password113', 256), '0718765431', 142.00, 21.00, 41000.00),
('Rohan', 'Silva', 'rohans', 'rohans@gmail.com', SHA2('password114', 256), '0718765432', 135.00, 19.00, 39000.00),
('Tharindu', 'Jayawardena', 'tharinduj', 'tharinduj@gmail.com', SHA2('password115', 256), '0718765433', 150.00, 24.00, 44000.00),
('Udara', 'Weerasinghe', 'udaraw', 'udaraw@gmail.com', SHA2('password116', 256), '0718765434', 147.00, 22.50, 43000.00),
('Lakshan', 'Gamage', 'lakshang', 'lakshang@gmail.com', SHA2('password117', 256), '0718765435', 138.00, 20.00, 39500.00),
('Chathura', 'Wickramasinghe', 'chathuraw', 'chathuraw@gmail.com', SHA2('password118', 256), '0718765436', 145.00, 22.00, 42000.00),
('Saranga', 'Liyanage', 'sarangal', 'sarangal@gmail.com', SHA2('password119', 256), '0718765437', 143.00, 21.50, 41500.00),
('Gayan', 'Abeyratne', 'gayana', 'gayana@gmail.com', SHA2('password120', 256), '0718765438', 140.00, 20.00, 40000.00);



-- Insert into DriverAssistant
INSERT INTO DriverAssistant (first_name, last_name, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
('Lal', 'Kantha', 'lalkantha', 'lalk@gmail.com', SHA2('passlalk', 256), '0710033772', 165.00, 22.00, 30000.00),
('Lisal', 'Jayamanna', 'lisaljaya', 'lisalj@gmail.com', SHA2('passlisalj', 256), '0710011772', 170.00, 25.00, 32000.00),
('Movindu', 'Gunasinghe', 'movinduguna', 'movindug@gmail.com', SHA2('passmovindug', 256), '0710099772', 168.00, 24.00, 31000.00),
('Namal', 'Lanka', 'namallan', 'namall@gmail.com', SHA2('passsnamall', 256), '0719988775', 162.00, 21.00, 29000.00),
('Nipun', 'Jayasinghe', 'nipunjaya', 'nipunj@gmail.com', SHA2('passnipunj', 256), '0719080775', 175.00, 27.00, 34000.00),
('Piyath', 'Premachandra', 'piyathprema', 'piyathp@gmail.com', SHA2('passpiyathp', 256), '0712565775', 164.00, 22.00, 30000.00),
('Vikum', 'Peiris', 'vikumpei', 'vikump@gmail.com', SHA2('passvikump', 256), '0712565707', 167.00, 23.50, 31000.00),
('Viranga', 'Nelson', 'viranganel', 'virangan@gmail.com', SHA2('passvirangan', 256), '0712035707', 172.00, 26.00, 33000.00),
('Vinod', 'Alvis', 'vinodalv', 'vinoda@gmail.com', SHA2('passvinoda', 256), '0710234772', 169.00, 24.50, 31500.00),
('Yasindu', 'Piyasiri', 'yasindupiya', 'yasindup@gmail.com', SHA2('passyasindup', 256), '0718765432', 166.00, 23.00, 30500.00),
('Chaminda', 'Weerakkody', 'chamindaw', 'chamindaw@gmail.com', SHA2('passchamindaw', 256), '0718765433', 170.00, 25.00, 32000.00),
('Tharindu', 'Perera', 'tharindup', 'tharindup@gmail.com', SHA2('passtharindup', 256), '0718765434', 165.00, 22.50, 30000.00),
('Isuru', 'Fernando', 'isuruf', 'isuruf@gmail.com', SHA2('passisuruf', 256), '0718765435', 168.00, 24.00, 31000.00),
('Janith', 'Jayasinghe', 'janithj', 'janithj@gmail.com', SHA2('passjanithj', 256), '0718765436', 175.00, 27.00, 34000.00),
('Roshan', 'Silva', 'roshans', 'roshans@gmail.com', SHA2('passroshans', 256), '0718765437', 160.00, 21.50, 29000.00),
('Sunil', 'Samarasinghe', 'sunils', 'sunils@gmail.com', SHA2('passsunils', 256), '0718765438', 170.00, 25.00, 32000.00),
('Lahiru', 'Bandara', 'lahirub', 'lahirub@gmail.com', SHA2('passlahirub', 256), '0718765439', 169.00, 24.50, 31500.00),
('Asanka', 'Wijesinghe', 'asankaw', 'asankaw@gmail.com', SHA2('passasankaw', 256), '0718765440', 166.00, 23.00, 30500.00);


-- Insert into Store
INSERT INTO Store (city,store_ID) VALUES
('Kandy',1),
('Colombo',2),
('Negombo',3),
('Galle',4),
('Matara',5),
('Jaffna',6),
('Trincomalee',7);


-- Insert into Product
INSERT INTO Product (name, price, discount, volume) VALUES
('T-shirt', 2000.00, 5, 0.01),
('Jeans', 5000.00, 1, 0.01),
('Sneakers', 7500.00, 8, 0.02),
('Backpack', 4500.00, 2, 0.02),
('Sunglasses', 500.00, 0, 0.01),
('Wristwatch', 3200.00, 5, 0.01),
('Wallet', 2500.00, 1, 0.01),
('Handbag', 5500.00, 8, 0.02),
('Belt', 1800.00, 5, 0.01),
('Cap', 1500.00, 7, 0.01),
('Socks', 100.00, 0, 0.01),
('Jacket', 1000.00, 0, 0.02),
('Dress', 7000.00, 2, 0.02),
('Blender', 9000.00, 10, 0.10),
('Coffee Maker', 10000.00, 15, 0.10),
('Toaster', 8000.00, 10, 0.08),
('Iron', 4500.00, 8, 0.08),
('Cookware Set', 12000.00, 20, 0.10),
('Bath Towel', 2500.00, 0, 0.02),
('Pillow', 3000.00, 2, 0.05);


-- Insert into Train
INSERT INTO Train (time, day, capacity, destination) VALUES
('08:00:00', 'Monday', 500, 'Colombo'),
('14:00:00', 'Monday', 550, 'Negombo'),
('08:00:00', 'Tuesday', 500, 'Galle'),
('14:00:00', 'Tuesday', 550, 'Matara'),
('08:00:00', 'Wednesday', 450, 'Jaffna'),
('14:00:00', 'Wednesday', 500, 'Trincomalee'),
('08:00:00', 'Thursday', 500, 'Colombo'),
('14:00:00', 'Thursday', 500, 'Negombo'),
('08:00:00', 'Friday', 450, 'Galle'),
('14:00:00', 'Friday', 400, 'Matara'),
('08:00:00', 'Saturday', 500, 'Jaffna'),
('14:00:00', 'Saturday', 500, 'Trincomalee'),
('08:00:00', 'Sunday', 500, 'Colombo'),
('14:00:00', 'Sunday', 550, 'Negombo');



-- Insert into OrderStatus
INSERT INTO OrderStatus (status, description) VALUES 
('Processing', 'Order is successfully placed and being processed'),
('Dispatched', 'Order has been dispatched from the main store'),
('Out for delivery', 'Order has been dispatched from the local store'),
('Delivered', 'Order has been delivered'),
('Cancelled', 'Order was cancelled');



-- Insert into Manager
INSERT INTO Manager (first_name, last_name, username, email, password, phone_number, store_ID, salary) VALUES
('Kasun', 'Abayakoon', 'kasuna1', 'kasuna1@gmail.com', SHA2('passkasuna1', 256), '0702786961', 1, 75000.00),
('Indika', 'Balasuriya', 'indikab2', 'indikab2@gmail.com', SHA2('passindikab2', 256), '0764971679', 2, 60000.00),
('Nuwan', 'Chamara', 'nuwanc3', 'nuwanc3@gmail.com', SHA2('passnuwanc3', 256), '0701596460', 3, 52000.00),
('Chaminda', 'Dahanayake', 'chamindad4', 'chamindad4@gmail.com', SHA2('passchamindad4', 256), '0705032346', 4, 59000.00),
('Gayan', 'Edirisinghe', 'gayane5', 'gayane5@gmail.com', SHA2('passgayane5', 256), '0766753499', 5, 61000.00),
('Dinesh', 'Fernando', 'dineshf6', 'dineshf6@gmail.com', SHA2('passdineshf6', 256), '0711260213', 6, 58000.00),
('Sanjeewa', 'Gamage', 'sanjeewag7', 'sanjeewag7@gmail.com', SHA2('passsanjeewag7', 256), '0705259049', 7, 57000.00);


-- Insert into Truck
INSERT INTO Truck (store_ID, capacity) VALUES
(1, 10.00),
(1, 10.50),
(1, 9.80),
(2, 10.20),
(2, 10.00),
(2, 10.00),
(3, 9.80),
(3, 10.00),
(3, 10.50),
(4, 10.00),
(4, 10.20),
(4, 10.00),
(5, 10.20),
(5, 10.00),
(5, 9.80),
(6, 10.00),
(6, 10.20),
(6, 10.50),
(7, 10.00),
(7, 9.80),
(7, 10.00);


-- Insert into Route
INSERT INTO Route (route_ID, store_ID, duration, path_description) VALUES
(1, 1, 3.50, 'Kandy-Route 01'),
(2, 1, 5.00, 'Kandy-Route 02'),

(3, 2, 3.00, 'Colombo-Route 01'),
(4, 2, 4.50, 'Colombo-Route 02'),
(5, 2, 5.00, 'Colombo-Route 03'),

(6, 3, 5.00, 'Negombo-Route 01'),
(7, 3, 6.00, 'Negombo-Route 02'),
(8, 3, 4.50, 'Negombo-Route 03'),

(9, 4, 3.50, 'Galle-Route 01'),
(10, 4, 5.00, 'Galle-Route 02'),

(11, 5, 4.50, 'Matara-Route 01'),
(12, 5, 4.00, 'Matara-Route 02'),
(13, 5, 5.50, 'Matara-Route 03'),

(14, 6, 5.00, 'Jaffna-Route 01'),
(15, 6, 6.00, 'Jaffna-Route 02'),

(16, 7, 3.50, 'Trincomalee-Route 01'),
(17, 7, 6.00, 'Trincomalee-Route 02'),
(18, 7, 5.50, 'Trincomalee-Route 03');


-- Insert into TruckSchedule
INSERT INTO TruckSchedule (driver_ID, driverA_ID, truck_Id, route_ID, time, date, manager_ID, status) VALUES
(1, 18, 3, 1, '08:00:00', '2024-10-06', 1, 'completed'),         -- Kandy
(2, 17, 2, 2, '09:00:00', '2024-10-06', 1, 'completed'),

(3, 16, 1, 3, '08:30:00', '2024-10-06', 2, 'completed'),         -- Colombo
(4, 15, 5, 4, '08:30:00', '2024-10-06', 2, 'completed'),
(5, 14, 6, 5, '09:30:00', '2024-10-06', 2, 'completed'),

(6, 13, 4, 6, '08:30:00', '2024-10-06', 3, 'completed'),         -- Negombo
(7, 12, 9, 7, '08:00:00', '2024-10-06', 3, 'completed'),
(8, 11, 8, 8, '08:30:00', '2024-10-06', 3, 'completed'),

(9, 10, 7, 9, '09:00:00', '2024-10-06', 4, 'completed'),         -- Galle
(10, 9, 10, 10, '09:00:00', '2024-10-06', 4, 'completed'),

(11, 8, 12, 11, '08:00:00', '2024-10-06', 5, 'completed'),      -- Matara
(12, 7, 11, 12, '08:30:00', '2024-10-06', 5, 'completed'),
(13, 6, 14, 13, '08:00:00', '2024-10-06', 5, 'completed'),

(14, 5, 15, 14, '09:00:00', '2024-10-06', 6, 'completed'),       -- Jaffna
(15, 4, 13, 15, '08:00:00', '2024-10-06', 6, 'completed'),

(16, 3, 18, 16, '09:30:00', '2024-10-06', 7, 'completed'),       -- Trincomalee  
(17, 2, 17, 17, '08:00:00', '2024-10-06', 7, 'completed'),
(18, 1, 16, 18, '08:30:00', '2024-10-06', 7, 'completed'),

(1, 17, 3, 1, '09:00:00', '2024-10-07', 1, 'on progress'),       -- Kandy
(2, 18, 2, 2, '09:00:00', '2024-10-07', 1, 'on progress'),

(5, 15, 6, 3, '08:00:00', '2024-10-07', 2, 'on progress'),      -- Colombo
(4, 16, 5, 4, '09:00:00', '2024-10-07', 2, 'on progress'),
(3, 14, 4, 5, '09:00:00', '2024-10-07', 2, 'on progress'),

(1, 18, 1, 1, '08:00:00', '2024-10-08', 1, 'scheduled'),         -- Kandy
(2, 17, 3, 2, '09:00:00', '2024-10-08', 1, 'scheduled'),

(4, 14, 5, 3, '09:00:00', '2024-10-08', 2, 'scheduled'),        -- Colombo
(5, 15, 6, 4, '08:00:00', '2024-10-08', 2, 'scheduled'),
(3, 16, 4, 5, '09:00:00', '2024-10-08', 2, 'scheduled');



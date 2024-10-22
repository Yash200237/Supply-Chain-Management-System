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
('Diana', 'Peiris', 'Jaffna', 'dianapeiris', 'dianap@gmail.com', SHA2('dianap123', 256), '0760003991', '657/1 Hospital Road, Jaffna', 'retailer'),
('Nadun', 'Abeywickrama', 'Trincomalee', 'nadunabeywickrama', 'naduna@gmail.com', SHA2('naduna123', 256), '0704449991', 'No 52, Beach Road, Trincomalee', 'end customer');



-- Insert into Driver
INSERT INTO Driver (first_name, last_name, city, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
('Nimal', 'Alvis','Kandy', 'nimala', 'nimala@gmail.com', SHA2('password123', 256), '0711112223', 140.00, 20.00, 40000.00),
('Kamal', 'Perera','Kandy', 'kamalp', 'kamalp@gmail.com', SHA2('password789', 256), '0711122334', 145.00, 22.50, 42000.00),
('Bimal', 'Fernando','Colombo', 'bimalf', 'bimalf@gmail.com', SHA2('password102', 256), '0713322114', 150.00, 25.00, 45000.00),
('Pathum', 'Kumara','Colombo', 'pathumk', 'pathumk@gmail.com', SHA2('password104', 256), '0717788991', 147.00, 23.50, 43000.00),
('Kantha', 'Lakshan','Colombo', 'kanthal', 'kanthal@gmail.com', SHA2('password106', 256), '0714455661', 139.00, 19.50, 39500.00),
('Shantha', 'Rathna','Negombo', 'shanthar', 'shanthar@gmail.com', SHA2('password108', 256), '0713344990', 146.00, 23.00, 42500.00),
('Priyantha', 'Peiris','Negombo', 'priyanthap', 'priyanthap@gmail.com', SHA2('password109', 256), '0718833221', 143.00, 21.50, 41500.00),
('Lasantha', 'Karunarathna','Negombo', 'lasanthak', 'lasanthak@gmail.com', SHA2('password110', 256), '0715500883', 144.00, 23.00, 42000.00),
('Krishantha', 'Kariyawasam','Galle', 'krishanthak', 'krishanthak@gmail.com', SHA2('password111', 256), '0714400558', 140.00, 20.00, 40000.00),
('Dimantha', 'Aponsu','Galle', 'dimanthaa', 'dimanthaa@gmail.com', SHA2('password112', 256), '0710099335', 137.00, 18.50, 38500.00),
('Nishan', 'Dissanayake','Matara', 'nishand', 'nishand@gmail.com', SHA2('password113', 256), '0718765431', 142.00, 21.00, 41000.00),
('Rohan', 'Silva','Matara', 'rohans', 'rohans@gmail.com', SHA2('password114', 256), '0718765432', 135.00, 19.00, 39000.00),
('Tharindu', 'Jayawardena','Matara', 'tharinduj', 'tharinduj@gmail.com', SHA2('password115', 256), '0718765433', 150.00, 24.00, 44000.00),
('Udara', 'Weerasinghe','Jaffna', 'udaraw', 'udaraw@gmail.com', SHA2('password116', 256), '0718765434', 147.00, 22.50, 43000.00),
('Lakshan', 'Gamage','Jaffna', 'lakshang', 'lakshang@gmail.com', SHA2('password117', 256), '0718765435', 138.00, 20.00, 39500.00),
('Chathura', 'Wickramasinghe','Trincomalee', 'chathuraw', 'chathuraw@gmail.com', SHA2('password118', 256), '0718765436', 145.00, 22.00, 42000.00),
('Saranga', 'Liyanage','Trincomalee', 'sarangal', 'sarangal@gmail.com', SHA2('password119', 256), '0718765437', 143.00, 21.50, 41500.00),
('Gayan', 'Abeyratne','Trincomalee', 'gayana', 'gayana@gmail.com', SHA2('password120', 256), '0718765438', 140.00, 20.00, 40000.00);



-- Insert into DriverAssistant
INSERT INTO DriverAssistant (first_name, last_name,city, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
('Lal', 'Kantha','Trincomalee', 'lalkantha', 'lalk@gmail.com', SHA2('passlalk', 256), '0710033772', 165.00, 22.00, 30000.00),
('Lisal', 'Jayamanna','Trincomalee', 'lisaljaya', 'lisalj@gmail.com', SHA2('passlisalj', 256), '0710011772', 170.00, 25.00, 32000.00),
('Movindu', 'Gunasinghe','Trincomalee', 'movinduguna', 'movindug@gmail.com', SHA2('passmovindug', 256), '0710099772', 168.00, 24.00, 31000.00),
('Namal', 'Lanka','Jaffna', 'namallan', 'namall@gmail.com', SHA2('passsnamall', 256), '0719988775', 162.00, 21.00, 29000.00),
('Nipun', 'Jayasinghe','Jaffna', 'nipunjaya', 'nipunj@gmail.com', SHA2('passnipunj', 256), '0719080775', 175.00, 27.00, 34000.00),
('Piyath', 'Premachandra','Matara', 'piyathprema', 'piyathp@gmail.com', SHA2('passpiyathp', 256), '0712565775', 164.00, 22.00, 30000.00),
('Vikum', 'Peiris','Matara', 'vikumpei', 'vikump@gmail.com', SHA2('passvikump', 256), '0712565707', 167.00, 23.50, 31000.00),
('Viranga', 'Nelson','Matara', 'viranganel', 'virangan@gmail.com', SHA2('passvirangan', 256), '0712035707', 172.00, 26.00, 33000.00),
('Vinod', 'Alvis','Galle', 'vinodalv', 'vinoda@gmail.com', SHA2('passvinoda', 256), '0710234772', 169.00, 24.50, 31500.00),
('Yasindu', 'Piyasiri','Galle', 'yasindupiya', 'yasindup@gmail.com', SHA2('passyasindup', 256), '0718765432', 166.00, 23.00, 30500.00),
('Chaminda', 'Weerakkody','Negombo', 'chamindaw', 'chamindaw@gmail.com', SHA2('passchamindaw', 256), '0718765433', 170.00, 25.00, 32000.00),
('Tharindu', 'Perera','Negombo', 'tharindup', 'tharindup@gmail.com', SHA2('passtharindup', 256), '0718765434', 165.00, 22.50, 30000.00),
('Isuru', 'Fernando','Negombo', 'isuruf', 'isuruf@gmail.com', SHA2('passisuruf', 256), '0718765435', 168.00, 24.00, 31000.00),
('Janith', 'Jayasinghe','Colombo', 'janithj', 'janithj@gmail.com', SHA2('passjanithj', 256), '0718765436', 175.00, 27.00, 34000.00),
('Roshan', 'Silva','Colombo', 'roshans', 'roshans@gmail.com', SHA2('passroshans', 256), '0718765437', 160.00, 21.50, 29000.00),
('Sunil', 'Samarasinghe','Colombo', 'sunils', 'sunils@gmail.com', SHA2('passsunils', 256), '0718765438', 170.00, 25.00, 32000.00),
('Lahiru', 'Bandara','Kandy', 'lahirub', 'lahirub@gmail.com', SHA2('passlahirub', 256), '0718765439', 169.00, 24.50, 31500.00),
('Asanka', 'Wijesinghe','Kandy', 'asankaw', 'asankaw@gmail.com', SHA2('passasankaw', 256), '0718765440', 166.00, 23.00, 30500.00);


-- Insert into Store
INSERT INTO Store (city,store_ID) VALUES
('Kandy',1),
('Colombo',2),
('Negombo',3),
('Galle',4),
('Matara',5),
('Jaffna',6),
('Trincomalee',7);


-- Insert into Manager
INSERT INTO Manager (first_name, last_name, username, email, password, phone_number, store_ID, salary) VALUES
('Kasun', 'Abayakoon', 'kasuna1', 'kasuna1@gmail.com', SHA2('passkasuna1', 256), '0702786961', 1, 75000.00),
('Indika', 'Balasuriya', 'indikab2', 'indikab2@gmail.com', SHA2('passindikab2', 256), '0764971679', 2, 60000.00),
('Nuwan', 'Chamara', 'nuwanc3', 'nuwanc3@gmail.com', SHA2('passnuwanc3', 256), '0701596460', 3, 52000.00),
('Chaminda', 'Dahanayake', 'chamindad4', 'chamindad4@gmail.com', SHA2('passchamindad4', 256), '0705032346', 4, 59000.00),
('Gayan', 'Edirisinghe', 'gayane5', 'gayane5@gmail.com', SHA2('passgayane5', 256), '0766753499', 5, 61000.00),
('Dinesh', 'Fernando', 'dineshf6', 'dineshf6@gmail.com', SHA2('passdineshf6', 256), '0711260213', 6, 58000.00),
('Sanjeewa', 'Gamage', 'sanjeewag7', 'sanjeewag7@gmail.com', SHA2('passsanjeewag7', 256), '0705259049', 7, 57000.00);



-- Insert into Product
INSERT INTO Product (name, price, discount, volume) VALUES
('T-shirt', 2000.00, 5, 0.01),                 -- 1
('Jeans', 5000.00, 1, 0.01),                   -- 2
('Sneakers', 7500.00, 8, 0.02),                -- 3
('Backpack', 4500.00, 2, 0.02),                -- 4
('Sunglasses', 500.00, 0, 0.01),               -- 5
('Wristwatch', 3200.00, 5, 0.01),              -- 6
('Wallet', 2500.00, 1, 0.01),                  -- 7
('Handbag', 5500.00, 8, 0.02),                 -- 8
('Belt', 1800.00, 5, 0.01),                    -- 9
('Cap', 1500.00, 7, 0.01),                     -- 10
('Socks', 100.00, 0, 0.01),                    -- 11
('Jacket', 1000.00, 0, 0.02),                  -- 12
('Dress', 7000.00, 2, 0.02),                   -- 13
('Blender', 9000.00, 10, 0.10),                -- 14
('Coffee Maker', 10000.00, 15, 0.10),          -- 15
('Toaster', 8000.00, 10, 0.08),                -- 16
('Iron', 4500.00, 8, 0.08),                    -- 17
('Cookware Set', 12000.00, 20, 0.10),          -- 18
('Bath Towel', 2500.00, 0, 0.02),              -- 19
('Pillow', 3000.00, 2, 0.05);                  -- 20



-- Insert into Train
INSERT INTO Train (time, day, capacity, destination) VALUES
('08:00:00', 'Monday', 500, 'Colombo'),        -- 1
('14:00:00', 'Monday', 550, 'Negombo'),        -- 2
('08:00:00', 'Tuesday', 500, 'Galle'),         -- 3
('14:00:00', 'Tuesday', 550, 'Matara'),        -- 4
('08:00:00', 'Wednesday', 450, 'Jaffna'),      -- 5
('14:00:00', 'Wednesday', 500, 'Trincomalee'), -- 6
('08:00:00', 'Thursday', 500, 'Colombo'),      -- 7
('14:00:00', 'Thursday', 500, 'Negombo'),      -- 8
('08:00:00', 'Friday', 450, 'Galle'),          -- 9
('14:00:00', 'Friday', 400, 'Matara'),         -- 10
('08:00:00', 'Saturday', 500, 'Jaffna'),       -- 11
('14:00:00', 'Saturday', 500, 'Trincomalee'),  -- 12
('08:00:00', 'Sunday', 500, 'Colombo'),        -- 13
('14:00:00', 'Sunday', 550, 'Negombo');        -- 14



-- Insert into OrderStatus
INSERT INTO OrderStatus (status, description) VALUES 
('Processing', 'Order is successfully placed and being processed'),      -- 1
('Dispatched', 'Order has been dispatched from the main store'),         -- 2
('Out for delivery', 'Order has been dispatched from the local store'),  -- 3
('Delivered', 'Order has been delivered');                               -- 4



-- Insert into Truck
INSERT INTO Truck (store_ID, truck_plate_no, capacity) VALUES
(1,'CP 6719', 10.00),
(1,'CP 1230', 10.50),
(1,'CP 1098', 9.80),
(2,'WP 5432', 10.20),
(2,'WP 1230', 10.00),
(2,'WP 7651', 10.00),
(3,'WP 7012', 9.80),
(3,'WP 3480', 10.00),
(3,'WP 4472', 10.50),
(4,'SP 2345', 10.00),
(4,'SP 8765', 10.20),
(4,'SP 5432', 10.00),
(5,'SP 9145', 10.20),
(5,'SP 1540', 10.00),
(5,'SP 5413', 9.80),
(6,'NP 6789', 10.00),
(6,'NP 9876', 10.20),
(6,'NP 3432', 10.50),
(7,'EP 9846', 10.00),
(7,'EP 4321', 9.80),
(7,'EP 8765', 10.00);


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
(15, 4, 13, 15, '08:00:00', '2024-09-04', 6, 'completed'), -- 1
(1, 18, 3, 1, '08:00:00', '2024-09-04', 1, 'completed'),   -- 2      
(4, 15, 5, 4, '08:30:00', '2024-09-05', 2, 'completed'),   -- 3
(2, 17, 2, 2, '09:00:00', '2024-09-05', 1, 'completed'),   -- 4
(5, 14, 6, 5, '09:30:00', '2024-09-05', 2, 'completed'),   -- 5
(18, 1, 16, 18, '08:30:00', '2024-09-06', 7, 'completed'), -- 6
(10, 9, 10, 10, '09:00:00', '2024-09-08', 4, 'completed'), -- 7
(1, 18, 3, 1, '08:00:00', '2024-09-08', 1, 'completed'),   -- 8     
(11, 8, 12, 11, '08:00:00', '2024-09-08', 5, 'completed'), -- 9
(15, 4, 13, 15, '08:00:00', '2024-09-09', 6, 'completed'), -- 10
(14, 5, 15, 14, '09:00:00', '2024-09-09', 6, 'completed'), -- 11  
(11, 8, 12, 11, '08:00:00', '2024-09-10', 5, 'completed'), -- 12
(7, 12, 9, 7, '08:00:00', '2024-09-11', 3, 'completed'),   -- 13
(4, 15, 5, 4, '08:30:00', '2024-09-13', 2, 'completed'),   -- 14
(2, 17, 2, 2, '09:00:00', '2024-09-13', 1, 'completed'),   -- 15
(17, 2, 17, 17, '08:00:00', '2024-09-14', 7, 'completed'), -- 16
(3, 16, 1, 3, '08:30:00', '2024-09-14', 2, 'completed'),   -- 17
(6, 13, 4, 6, '08:30:00', '2024-09-15', 3, 'completed'),   -- 18
(7, 12, 9, 7, '08:00:00', '2024-09-16', 3, 'completed'),   -- 19
(9, 10, 7, 9, '09:00:00', '2024-09-16', 4, 'completed'),   -- 20
(8, 11, 8, 8, '08:30:00', '2024-09-17', 3, 'completed'),   -- 21
(10, 9, 10, 10, '09:00:00', '2024-09-17', 4, 'completed'), -- 22
(5, 14, 6, 5, '09:30:00', '2024-09-18', 2, 'completed'),   -- 23
(16, 3, 18, 16, '09:30:00', '2024-09-19', 7, 'completed'), -- 24
(17, 2, 17, 17, '08:00:00', '2024-09-20', 7, 'completed'), -- 25
(12, 7, 11, 12, '08:30:00', '2024-09-21', 5, 'completed'), -- 26
(6, 13, 4, 6, '08:30:00', '2024-09-21', 3, 'completed'),   -- 27
(13, 6, 14, 13, '08:00:00', '2024-09-21', 5, 'completed'), -- 28
(14, 5, 15, 14, '09:00:00', '2024-09-23', 6, 'completed'), -- 29
(16, 3, 18, 16, '09:30:00', '2024-09-24', 7, 'completed'), -- 30
(3, 16, 1, 3, '08:30:00', '2024-09-24', 2, 'completed'),   -- 31 
(18, 1, 16, 18, '08:30:00', '2024-09-25', 7, 'completed'), -- 32
(9, 10, 7, 9, '09:00:00', '2024-09-25', 4, 'completed'),   -- 33
(12, 7, 11, 12, '08:30:00', '2024-09-26', 5, 'completed'), -- 34
(13, 6, 14, 13, '08:00:00', '2024-09-27', 5, 'completed'), -- 35
(8, 11, 8, 8, '08:30:00', '2024-09-28', 3, 'completed'),   -- 36
(3, 16, 1, 3, '08:30:00', '2024-09-29', 2, 'completed'),   -- 37
(13, 6, 14, 13, '08:00:00', '2024-09-29', 5, 'completed'), -- 38
(7, 12, 9, 7, '08:00:00', '2024-09-30', 3, 'completed'),   -- 39
(8, 11, 8, 8, '08:30:00', '2024-09-30', 3, 'completed'),   -- 40
(11, 8, 12, 11, '08:00:00', '2024-10-01', 5, 'completed'), -- 41
(1, 18, 3, 1, '08:00:00', '2024-10-02', 1, 'completed'),   -- 42
(5, 14, 6, 5, '09:30:00', '2024-10-03', 2, 'completed'),   -- 43
(18, 1, 16, 18, '08:30:00', '2024-10-03', 7, 'completed'), -- 44
(4, 15, 5, 4, '08:30:00', '2024-10-04', 2, 'completed'),   -- 45
(14, 5, 15, 14, '09:00:00', '2024-10-05', 6, 'completed'), -- 46
(15, 4, 13, 15, '08:00:00', '2024-10-05', 6, 'completed'), -- 47
(6, 13, 4, 6, '08:30:00', '2024-10-06', 3, 'completed'),   -- 48
(12, 7, 11, 12, '08:30:00', '2024-10-07', 5, 'completed'), -- 49
(16, 3, 18, 16, '09:30:00', '2024-10-07', 7, 'completed'); -- 50


-- Insert into Order
INSERT INTO `Order` (customer_ID, route_ID, status_ID, time, date, total_volume, schedule_ID) VALUES
(6, 15, 4, '00:14:00', '2024-08-28', 0.05, 1),      -- 1  
(1, 1, 4, '00:45:00', '2024-08-28', 0.05, 2),       -- 2  
(16, 4, 4, '18:58:00', '2024-08-29', 0.26, 3),      -- 3
(8, 2, 4, '03:37:00', '2024-08-29', 0.12, 4),       -- 4
(2, 5, 4, '19:08:00', '2024-08-29', 0.42, 5),       -- 5
(7, 18, 4, '10:16:00', '2024-08-30', 0.24, 6),      -- 6
(4, 10, 4, '06:52:00', '2024-09-01', 0.04, 7),      -- 7
(1, 1, 4, '09:22:00', '2024-09-01', 0.22, 8),       -- 8
(12, 11, 4, '11:32:00', '2024-09-01', 0.23, 9),     -- 9
(6, 15, 4, '15:07:00', '2024-09-02', 0.18, 10),     -- 10
(13, 14, 4, '16:25:00', '2024-09-02', 0.41, 11),    -- 11
(12, 11, 4, '20:29:00', '2024-09-03', 0.34, 12),    -- 12
(3, 7, 4, '01:34:00', '2024-09-04', 0.40, 13),      -- 13
(16, 4, 4, '10:18:00', '2024-09-06', 0.22, 14),     -- 14
(8, 2, 4, '12:41:00', '2024-09-06', 0.05, 15),      -- 15
(14, 17, 4, '01:33:00', '2024-09-07', 0.10, 16),    -- 16
(9, 3, 4, '21:16:00', '2024-09-07', 0.16, 17),      -- 17
(10, 6, 4, '02:12:00', '2024-09-08', 0.60, 18),     -- 18
(3, 7, 4, '13:23:00', '2024-09-09', 0.49, 19),      -- 19
(11, 9, 4, '12:16:00', '2024-09-09', 0.36, 20),     -- 20
(17, 8, 4, '02:36:00', '2024-09-10', 0.19, 21),     -- 21
(4, 10, 4, '07:04:00', '2024-09-10', 0.39, 22),     -- 22
(2, 5, 4, '22:33:00', '2024-09-11', 0.40, 23),      -- 23
(21, 16, 4, '12:11:00', '2024-09-12', 0.27, 24),    -- 24
(14, 17, 4, '15:54:00', '2024-09-13', 0.08, 25),    -- 25
(5, 12, 4, '13:29:00', '2024-09-14', 0.64, 26),     -- 26
(10, 6, 4, '22:53:00', '2024-09-14', 0.10, 27),     -- 27
(19, 13, 4, '21:45:00', '2024-09-14', 0.04, 28),    -- 28
(20, 14, 4, '13:33:00', '2024-09-16', 0.13, 29),    -- 29
(21, 16, 4, '12:03:00', '2024-09-17', 0.23, 30),    -- 30
(9, 3, 4, '11:26:00', '2024-09-17', 0.31, 31),      -- 31
(7, 18, 4, '18:35:00', '2024-09-18', 0.31, 32),     -- 32 
(18, 9, 4, '21:09:00', '2024-09-18', 30.05, 33),    -- 33
(5, 12, 4, '16:37:00', '2024-09-19', 0.32, 34),     -- 34
(19, 13, 4, '15:24:00', '2024-09-20', 0.13, 35),    -- 35
(17, 8, 4, '16:46:00', '2024-09-21', 0.24, 36),     -- 36
(9, 3, 4, '08:00:00', '2024-09-22', 0.17, 37),      -- 37
(19, 13, 4, '18:30:00', '2024-09-22', 0.40, 38),    -- 38
(3, 7, 4, '04:55:00', '2024-09-23', 0.56, 39),      -- 39
(17, 8, 4, '04:46:00', '2024-09-23', 0.02, 40),     -- 40
(12, 11, 4, '00:40:00', '2024-09-24', 0.58, 41),    -- 41
(15, 1, 4, '01:56:00', '2024-09-25', 0.63, 42),     -- 42
(2, 5, 4, '00:56:00', '2024-09-26', 0.24, 43),      -- 43
(7, 18, 4, '05:41:00', '2024-09-26', 0.17, 44),     -- 44
(16, 4, 4, '19:34:00', '2024-09-27', 0.20, 45),     -- 45
(20, 14, 4, '02:50:00', '2024-09-28', 0.23, 46),    -- 46
(6, 15, 4, '17:06:00', '2024-09-28', 0.11, 47),     -- 47
(10, 6, 4, '21:50:00', '2024-09-29', 0.36, 48),     -- 48
(5, 12, 4, '17:35:00', '2024-09-30', 0.30, 49),     -- 49
(21, 16, 4, '02:20:00', '2024-09-30', 0.44, 50);    -- 50


-- Insert into TrainSchedule
INSERT INTO `TrainSchedule` (train_ID, order_ID, manager_ID) VALUES
(11, 1, 1),    -- 8/31
(13, 3, 1),    -- 8/31
(13, 5, 1),    -- 8/31
(12, 6, 1),    -- 8/31
(3, 7, 1),     -- 9/3
(4, 9, 1),     -- 9/3
(5, 10, 1),    -- 9/4
(5, 11, 1),    -- 9/4
(10, 12, 1),   -- 9/6
(8, 13, 1),    -- 9/5
(13, 14, 1),   -- 9/8
(12, 16, 1),   -- 9/7
(13, 17, 1),   -- 9/8
(14, 18, 1),   -- 9/8
(2, 19, 1),    -- 9/9
(3, 20, 1),    -- 9/10
(8, 21, 1),    -- 9/12
(3, 22, 1),    -- 9/10
(7, 23, 1),    -- 9/12
(12, 24, 1),   -- 9/14
(12, 25, 1),   -- 9/14
(4, 26, 1),    -- 9/17
(14, 27, 1),   -- 9/15
(4, 28, 1),    -- 9/17
(5, 29, 1),    -- 9/18
(6, 30, 1),    -- 9/18
(9, 31, 1),    -- 9/19   
(12, 32, 1),   -- 9/21
(9, 33, 1),    -- 9/20
(10, 34, 1),   -- 9/20
(4, 35, 1),    -- 9/24    
(14, 36, 1),   -- 9/22
(1, 37, 1),    -- 9/23
(4, 38, 1),    -- 9/24
(2, 39, 1),    -- 9/23  
(2, 40, 1),    -- 9/23  
(4, 41, 1),    -- 9/24 
(7, 43, 1),    -- 9/26
(12, 44, 1),   -- 9/28 
(13, 45, 1),   -- 9/29 
(11, 46, 1),   -- 9/28
(5, 47, 1),    -- 10/2
(2, 48, 1),    -- 9/30
(4, 49, 1),    -- 10/1  
(6, 50, 1);    -- 10/2


-- Insert into Order
INSERT INTO `OrderProduct` (order_id, product_id, quantity) VALUES
(1, 12, 1), 
(1, 7, 3), 
(2, 5, 5), 
(3, 11, 2), 
(3, 18, 1), 
(3, 19, 4), 
(3, 1, 3), 
(3, 9, 3), 
(4, 14, 1), 
(4, 5, 2), 
(5, 18, 4), 
(5, 13, 1), 
(6, 19, 3), 
(6, 20, 2), 
(6, 5, 4),
(6, 1, 4), 
(7, 7, 3), 
(7, 5, 1), 
(8, 18, 1), 
(8, 4, 2), 
(8, 12, 4), 
(9, 7, 1), 
(9, 6, 3), 
(9, 17, 2), 
(9, 10, 3), 
(10, 11, 5), 
(10, 15, 1), 
(10, 5, 3), 
(11, 14, 2), 
(11, 12, 4),
(11, 2, 3),
(11, 19, 5), 
(12, 20, 5), 
(12, 6, 4), 
(12, 4, 2), 
(12, 2, 1), 
(13, 14, 2), 
(13, 20, 2), 
(13, 10, 5), 
(13, 2, 2), 
(13, 5, 3), 
(14, 3, 5), 
(14, 11, 4), 
(14, 6, 5), 
(14, 1, 1),
(14, 12, 1), 
(15, 6, 5), 
(16, 8, 1), 
(16, 6, 3), 
(16, 7, 3), 
(16, 3, 1), 
(17, 10, 5), 
(17, 7, 5), 
(17, 13, 3), 
(18, 14, 1), 
(18, 18, 5), 
(19, 6, 2), 
(19, 7, 4), 
(19, 9, 3), 
(19, 15, 1),
(19, 14, 3), 
(20, 12, 2), 
(20, 3, 5), 
(20, 8, 2), 
(20, 20, 2), 
(20, 4, 4), 
(21, 20, 2), 
(21, 9, 2), 
(21, 6, 4),
(21, 1, 3), 
(22, 17, 1), 
(22, 8, 4), 
(22, 12, 5), 
(22, 4, 4), 
(22, 1, 5),
(23, 19, 4), 
(23, 17, 4), 
(24, 11, 4), 
(24, 3, 5), 
(24, 8, 5), 
(24, 13, 1), 
(24, 10, 1), 
(25, 7, 3), 
(25, 5, 4), 
(25, 11, 1), 
(26, 18, 3), 
(26, 1, 1), 
(26, 3, 1), 
(26, 7, 1), 
(26, 14, 3),
(27, 12, 5), 
(28, 10, 4), 
(29, 18, 1), 
(29, 5, 3), 
(30, 13, 5),
(30, 10, 5), 
(30, 8, 1), 
(30, 1, 1), 
(30, 5, 5), 
(31, 10, 1), 
(31, 19, 5), 
(31, 20, 4), 
(32, 10, 2), 
(32, 6, 5), 
(32, 17, 3),
(33, 9, 4), 
(33, 11, 1), 
(34, 18, 1), 
(34, 15, 2), 
(34, 11, 2), 
(35, 11, 2), 
(35, 15, 1), 
(35, 1, 1), 
(36, 16, 3), 
(37, 6, 5), 
(37, 1, 4), 
(37, 11, 4), 
(37, 8, 2), 
(38, 18, 4), 
(39, 7, 5),
(39, 15, 1), 
(39, 16, 2), 
(39, 20, 5), 
(40, 9, 2), 
(41, 13, 1), 
(41, 8, 4), 
(41, 18, 2), 
(41, 17, 1), 
(41, 14, 2), 
(42, 13, 2), 
(42, 8, 2), 
(42, 16, 5), 
(42, 9, 5), 
(42, 12, 5), 
(43, 16, 2),
(43, 3, 2), 
(43, 4, 2), 
(44, 17, 2), 
(44, 6, 1), 
(45, 20, 3), 
(45, 8, 2), 
(45, 9, 1), 
(46, 13, 3),
(46, 16, 2), 
(46, 7, 1), 
(47, 10, 3),
(47, 16, 1),
(48, 16, 4), 
(48, 9, 2), 
(48, 5, 2),
(49, 14, 1), 
(49, 20, 2), 
(49, 3, 5), 
(50, 9, 4), 
(50, 15, 4);
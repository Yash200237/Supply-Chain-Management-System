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


-- Insert into Product
INSERT INTO Product (name, price, discount, volume) VALUES
('T-shirt', 2000.00, 5, 0.01),                 --1
('Jeans', 5000.00, 1, 0.01),                   --2
('Sneakers', 7500.00, 8, 0.02),                --3
('Backpack', 4500.00, 2, 0.02),                --4
('Sunglasses', 500.00, 0, 0.01),               --5
('Wristwatch', 3200.00, 5, 0.01),              --6
('Wallet', 2500.00, 1, 0.01),                  --7
('Handbag', 5500.00, 8, 0.02),                 --8
('Belt', 1800.00, 5, 0.01),                    --9
('Cap', 1500.00, 7, 0.01),                     --10
('Socks', 100.00, 0, 0.01),                    --11
('Jacket', 1000.00, 0, 0.02),                  --12
('Dress', 7000.00, 2, 0.02),                   --13
('Blender', 9000.00, 10, 0.10),                --14
('Coffee Maker', 10000.00, 15, 0.10),          --15
('Toaster', 8000.00, 10, 0.08),                --16
('Iron', 4500.00, 8, 0.08),                    --17
('Cookware Set', 12000.00, 20, 0.10),          --18
('Bath Towel', 2500.00, 0, 0.02),              --19
('Pillow', 3000.00, 2, 0.05);                  --20


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
(1, 18, 3, 1, '08:00:00', '2024-10-20', 1, 'completed'),   -- 1       Kandy
(2, 17, 2, 2, '09:00:00', '2024-10-20', 1, 'completed'),   -- 2

(3, 16, 1, 3, '08:30:00', '2024-10-20', 2, 'completed'),   -- 3       Colombo
(4, 15, 5, 4, '08:30:00', '2024-10-20', 2, 'completed'),   -- 4
(5, 14, 6, 5, '09:30:00', '2024-10-20', 2, 'completed'),   -- 5

(6, 13, 4, 6, '08:30:00', '2024-10-20', 3, 'completed'),   -- 6       Negombo
(7, 12, 9, 7, '08:00:00', '2024-10-20', 3, 'completed'),   -- 7
(8, 11, 8, 8, '08:30:00', '2024-10-20', 3, 'completed'),   -- 8

(9, 10, 7, 9, '09:00:00', '2024-10-20', 4, 'completed'),   -- 9       Galle
(10, 9, 10, 10, '09:00:00', '2024-10-20', 4, 'completed'), -- 10

(11, 8, 12, 11, '08:00:00', '2024-10-20', 5, 'completed'), -- 11      Matara
(12, 7, 11, 12, '08:30:00', '2024-10-20', 5, 'completed'), -- 12
(13, 6, 14, 13, '08:00:00', '2024-10-20', 5, 'completed'), -- 13

(14, 5, 15, 14, '09:00:00', '2024-10-20', 6, 'completed'), -- 14      Jaffna
(15, 4, 13, 15, '08:00:00', '2024-10-20', 6, 'completed'), -- 15

(16, 3, 18, 16, '09:30:00', '2024-10-20', 7, 'completed'), -- 16      Trincomalee   -- completed
(17, 2, 17, 17, '08:00:00', '2024-10-20', 7, 'completed'), -- 17
(18, 1, 16, 18, '08:30:00', '2024-10-20', 7, 'completed'), -- 18

(1, 17, 3, 1, '09:00:00', '2024-11-08', 1, 'completed'), -- 19      Kandy
(2, 18, 2, 2, '09:00:00', '2024-11-08', 1, 'completed'), -- 20

(5, 15, 6, 3, '08:00:00', '2024-11-08', 2, 'scheduled'), -- 21      Colombo
(4, 16, 5, 4, '09:00:00', '2024-11-08', 2, 'scheduled'), -- 22
(3, 14, 4, 5, '09:00:00', '2024-11-08', 2, 'scheduled'), -- 23

(1, 18, 1, 1, '08:00:00', '2024-11-08', 1, 'scheduled'),   -- 24      Kandy
(2, 17, 3, 2, '09:00:00', '2024-11-08', 1, 'scheduled'),   -- 25

(4, 14, 5, 3, '09:00:00', '2024-11-08', 2, 'scheduled'),   -- 26      Colombo
(5, 15, 6, 4, '08:00:00', '2024-11-08', 2, 'scheduled'),   -- 27
(3, 16, 4, 5, '09:00:00', '2024-11-08', 2, 'scheduled');   -- 28


-- Insert into Order
INSERT INTO `Order` (customer_ID, route_ID, status_ID, time, date, total_volume, schedule_ID) VALUES
(6, 15, 4, '00:14:00', '2024-09-28', 0.05, 15),    --1
(1, 1, 3, '00:45:00', '2024-09-28', 0.05, 1),      --2  
(16, 4, 3, '18:58:00', '2024-09-28', 0.26, 4),     --3
(8, 2, 4, '03:37:00', '2024-09-28', 0.12, 2),      --4
(2, 5, 4, '19:08:00', '2024-09-28', 0.42, 5),      --5
(7, 18, 4, '10:16:00', '2024-09-28', 0.24, 18),    --6
(4, 10, 3, '06:52:00', '2024-09-28', 0.04, 10),    --7
(1, 1, 5, '09:22:00', '2024-09-28', 0.22, 1),      --8
(12, 11, 5, '11:32:00', '2024-09-28', 0.23, 11), --9
(6, 15, 5, '15:07:00', '2024-09-28', 0.18, 15),  --10
(13, 14, 1, '16:25:00', '2024-09-28', 0.41, 14), --11
(12, 11, 4, '20:29:00', '2024-09-28', 0.34, 11), --12
(3, 7, 2, '01:34:00', '2024-09-28', 0.40, 7),    --13
(16, 4, 2, '10:18:00', '2024-09-28', 0.22, 4),   --14
(8, 2, 1, '12:41:00', '2024-09-28', 0.05, 2),    --15
(14, 17, 2, '01:33:00', '2024-09-28', 0.10, 17),  --16
(9, 3, 4, '21:16:00', '2024-09-28', 0.16, 3),    --17
(10, 6, 1, '02:12:00', '2024-09-28', 0.60, 6),   --18
(3, 7, 1, '13:23:00', '2024-09-28', 0.49, 7),    --19
(11, 9, 5, '12:16:00', '2024-09-28', 0.36, 9),   --20
(17, 8, 1, '02:36:00', '2024-09-28', 0.19, 8),   --21
(4, 10, 5, '07:04:00', '2024-09-28', 0.39, 10),  --22
(2, 5, 3, '22:33:00', '2024-09-28', 0.40, 5),   --23
(21, 16, 4, '12:11:00', '2024-09-28', 0.27, 16), --24
(14, 17, 4, '15:54:00', '2024-09-28', 0.08, 17), --25
(5, 12, 5, '13:29:00', '2024-09-28', 0.64, 12),  --26
(10, 6, 2, '22:53:00', '2024-09-28', 0.10, 6),   --27
(19, 13, 2, '21:45:00', '2024-09-28', 0.04, 13), --28

(20, 14, 3, '13:33:00', '2024-09-30', 0.13, 2),  --29
(21, 16, 3, '12:03:00', '2024-09-30', 0.23, 14), --30
(9, 3, 5, '11:26:00', '2024-09-30', 0.31, 27),   --31
(7, 18, 1, '18:35:00', '2024-09-30', 0.31, 26),   --32 
(18, 9, 5, '21:09:00', '2024-09-30', 30.05, 12),  --33
(5, 12, 1, '16:37:00', '2024-09-30', 0.32, 14),  --34
(19, 13, 3, '15:24:00', '2024-09-30', 0.13, 20), --35
(17, 8, 1, '16:46:00', '2024-09-30', 0.24, 21),  --36
(9, 3, 5, '08:00:00', '2024-09-30',  0.17, 14),   --37
(19, 13, 1, '18:30:00', '2024-09-30', 0.40, 22), --38
(3, 7, 4, '04:55:00', '2024-09-30', 0.56, 18),   --39
(17, 8, 3, '04:46:00', '2024-09-30', 0.02, 2),   --40
(12, 11, 1, '00:40:00', '2023-02-08', 0.58, 3),   --41
(15, 1, 5, '01:56:00', '2023-12-14', 0.63, 24),  --42
(2, 5, 3, '00:56:00', '2023-03-08', 0.24, 2),    --43
(7, 18, 4, '05:41:00', '2023-05-12', 0.17, 28),  --44
(16, 4, 2, '19:34:00', '2023-10-25', 0.20, 25),   --45
(20, 14, 1, '02:50:00', '2023-03-04', 0.23, 6),  --46
(6, 15, 3, '17:06:00', '2023-09-04', 0.11, 1),   --47
(10, 6, 1, '21:50:00', '2023-11-21', 0.36, 9),   --48
(5, 12, 4, '17:35:00', '2023-02-25', 0.30, 24),   --49
(21, 16, 3, '02:20:00', '2023-12-15', 0.44, 4);  --50



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

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



INSERT INTO Driver (first_name, last_name, city, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
('Nimal', 'Alvis', 'Colombo', 'nimala', 'nimala@gmail.com', SHA2('password123', 256), '0711112223', 140.00, 20.00, 40000.00),
('Kamal', 'Perera', 'Kandy', 'kamalp', 'kamalp@gmail.com', SHA2('password789', 256), '0711122334', 145.00, 22.50, 42000.00),
('Bimal', 'Fernando', 'Galle', 'bimalf', 'bimalf@gmail.com', SHA2('password102', 256), '0713322114', 150.00, 25.00, 45000.00),
('Pathum', 'Kumara', 'Negombo', 'pathumk', 'pathumk@gmail.com', SHA2('password104', 256), '0717788991', 147.00, 23.50, 43000.00),
('Kantha', 'Lakshan', 'Jaffna', 'kanthal', 'kanthal@gmail.com', SHA2('password106', 256), '0714455661', 139.00, 19.50, 39500.00),
('Shantha', 'Rathna', 'Matara', 'shanthar', 'shanthar@gmail.com', SHA2('password108', 256), '0713344990', 146.00, 23.00, 42500.00),
('Priyantha', 'Peiris', 'Colombo', 'priyanthap', 'priyanthap@gmail.com', SHA2('password109', 256), '0718833221', 143.00, 21.50, 41500.00),
('Lasantha', 'Karunarathna', 'Kandy', 'lasanthak', 'lasanthak@gmail.com', SHA2('password110', 256), '0715500883', 144.00, 23.00, 42000.00),
('Krishantha', 'Kariyawasam', 'Galle', 'krishanthak', 'krishanthak@gmail.com', SHA2('password111', 256), '0714400558', 140.00, 20.00, 40000.00),
('Dimantha', 'Aponsu', 'Negombo', 'dimanthaa', 'dimanthaa@gmail.com', SHA2('password112', 256), '0710099335', 137.00, 18.50, 38500.00),
('Nishan', 'Dissanayake', 'Jaffna', 'nishand', 'nishand@gmail.com', SHA2('password113', 256), '0718765431', 142.00, 21.00, 41000.00),
('Rohan', 'Silva', 'Matara', 'rohans', 'rohans@gmail.com', SHA2('password114', 256), '0718765432', 135.00, 19.00, 39000.00),
('Tharindu', 'Jayawardena', 'Colombo', 'tharinduj', 'tharinduj@gmail.com', SHA2('password115', 256), '0718765433', 150.00, 24.00, 44000.00),
('Udara', 'Weerasinghe', 'Kandy', 'udaraw', 'udaraw@gmail.com', SHA2('password116', 256), '0718765434', 147.00, 22.50, 43000.00),
('Lakshan', 'Gamage', 'Trincomalee', 'lakshang', 'lakshang@gmail.com', SHA2('password117', 256), '0718765435', 138.00, 20.00, 39500.00),
('Chathura', 'Wickramasinghe', 'Trincomalee', 'chathuraw', 'chathuraw@gmail.com', SHA2('password118', 256), '0718765436', 145.00, 22.00, 42000.00),
('Saranga', 'Liyanage', 'Jaffna', 'sarangal', 'sarangal@gmail.com', SHA2('password119', 256), '0718765437', 143.00, 21.50, 41500.00),
('Gayan', 'Abeyratne', 'Matara', 'gayana', 'gayana@gmail.com', SHA2('password120', 256), '0718765438', 140.00, 20.00, 40000.00);


INSERT INTO DriverAssistant (first_name, last_name, city, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
('Lal', 'Kantha', 'Colombo', 'lalkantha', 'lalk@gmail.com', SHA2('passlalk', 256), '0710033772', 165.00, 22.00, 30000.00),
('Lisal', 'Jayamanna', 'Kandy', 'lisaljaya', 'lisalj@gmail.com', SHA2('passlisalj', 256), '0710011772', 170.00, 25.00, 32000.00),
('Movindu', 'Gunasinghe', 'Matara', 'movinduguna', 'movindug@gmail.com', SHA2('passmovindug', 256), '0710099772', 168.00, 24.00, 31000.00),
('Namal', 'Lanka', 'Trincomalee', 'namallan', 'namall@gmail.com', SHA2('passsnamall', 256), '0719988775', 162.00, 21.00, 29000.00),
('Nipun', 'Jayasinghe', 'Jaffna', 'nipunjaya', 'nipunj@gmail.com', SHA2('passnipunj', 256), '0719080775', 175.00, 27.00, 34000.00),
('Piyath', 'Premachandra', 'Matara', 'piyathprema', 'piyathp@gmail.com', SHA2('passpiyathp', 256), '0712565775', 164.00, 22.00, 30000.00),
('Vikum', 'Peiris', 'Colombo', 'vikumpei', 'vikump@gmail.com', SHA2('passvikump', 256), '0712565707', 167.00, 23.50, 31000.00),
('Viranga', 'Nelson', 'Kandy', 'viranganel', 'virangan@gmail.com', SHA2('passvirangan', 256), '0712035707', 172.00, 26.00, 33000.00),
('Vinod', 'Alvis', 'Galle', 'vinodalv', 'vinoda@gmail.com', SHA2('passvinoda', 256), '0710234772', 169.00, 24.50, 31500.00),
('Yasindu', 'Piyasiri', 'Negombo', 'yasindupiya', 'yasindup@gmail.com', SHA2('passyasindup', 256), '0718765432', 166.00, 23.00, 30500.00),
('Chaminda', 'Weerakkody', 'Jaffna', 'chamindaw', 'chamindaw@gmail.com', SHA2('passchamindaw', 256), '0718765433', 170.00, 25.00, 32000.00),
('Tharindu', 'Perera', 'Colombo', 'tharindup', 'tharindup@gmail.com', SHA2('passtharindup', 256), '0718765434', 165.00, 22.50, 30000.00),
('Isuru', 'Fernando', 'Kandy', 'isuruf', 'isuruf@gmail.com', SHA2('passisuruf', 256), '0718765435', 168.00, 24.00, 31000.00),
('Janith', 'Jayasinghe', 'Galle', 'janithj', 'janithj@gmail.com', SHA2('passjanithj', 256), '0718765436', 175.00, 27.00, 34000.00),
('Roshan', 'Silva', 'Negombo', 'roshans', 'roshans@gmail.com', SHA2('passroshans', 256), '0718765437', 160.00, 21.50, 29000.00),
('Sunil', 'Samarasinghe', 'Jaffna', 'sunils', 'sunils@gmail.com', SHA2('passsunils', 256), '0718765438', 170.00, 25.00, 32000.00),
('Lahiru', 'Perera', 'Matara', 'lahiruper', 'lahiruper@gmail.com', SHA2('passlahiru', 256), '0712567890', 180.00, 30.00, 35000.00),
('Asanka', 'Fernando', 'Trincomalee', 'asankaf', 'asankaf@gmail.com', SHA2('passasanka', 256), '0718765439', 170.00, 25.00, 33000.00);


INSERT INTO Store (store_ID, city) VALUES
(1, 'Kandy'),
(2, 'Colombo'),
(3, 'Negombo'),
(4, 'Galle'),
(5, 'Matara'),
(6, 'Jaffna'),
(7, 'Trincomalee');

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

INSERT INTO OrderStatus (status, description) VALUES 
('Processing', 'Order is successfully placed and being processed'),
('Dispatched', 'Order has been dispatched from the main store'),
('Out for delivery', 'Order has been dispatched from the local store'),
('Delivered', 'Order has been delivered'),
('Cancelled', 'Order was cancelled');

INSERT INTO Manager (first_name, last_name, username, email, password, phone_number, store_ID, salary) VALUES
('Kasun', 'Abayakoon', 'kasuna1', 'kasuna1@gmail.com', SHA2('passkasuna1', 256), '0702786961', 1, 75000.00),
('Indika', 'Balasuriya', 'indikab2', 'indikab2@gmail.com', SHA2('passindikab2', 256), '0764971679', 2, 60000.00),
('Nuwan', 'Chamara', 'nuwanc3', 'nuwanc3@gmail.com', SHA2('passnuwanc3', 256), '0701596460', 3, 52000.00),
('Chaminda', 'Dahanayake', 'chamindad4', 'chamindad4@gmail.com', SHA2('passchamindad4', 256), '0705032346', 4, 59000.00),
('Gayan', 'Edirisinghe', 'gayane5', 'gayane5@gmail.com', SHA2('passgayane5', 256), '0766753499', 5, 61000.00),
('Dinesh', 'Fernando', 'dineshf6', 'dineshf6@gmail.com', SHA2('passdineshf6', 256), '0711260213', 6, 58000.00),
('Sanjeewa', 'Gamage', 'sanjeewag7', 'sanjeewag7@gmail.com', SHA2('passsanjeewag7', 256), '0705259049', 7, 57000.00);


INSERT INTO Truck (store_ID, truck_plate_no, capacity) VALUES
(1, 'NWP 1234', 10.00),
(1, 'NWP 5678', 10.50),
(1, 'NWP 2345', 9.80),
(2, 'NP 6789', 10.20),
(2, 'NP 9876', 10.00),
(2, 'NP 5432', 10.00),
(3, 'SP 2345', 9.80),
(3, 'SP 8765', 10.00),
(3, 'SP 5432', 10.50),
(4, 'CP 6789', 10.00),
(4, 'CP 1230', 10.20),
(4, 'CP 1098', 10.00),
(5, 'EP 9876', 10.20),
(5, 'EP 4321', 10.00),
(5, 'EP 8765', 9.80),
(6, 'WP 5432', 10.00),
(6, 'WP 1230', 10.20),
(6, 'WP 7651', 10.50),
(7, 'NCP 4567', 10.00),
(7, 'NCP 3205', 9.80),
(7, 'NCP 5439', 10.00);

-- Insert into Customer
INSERT INTO Customer (customer_ID, first_name, last_name, city, username, email, password, phone_number, address, customer_type) VALUES
(1,'Supun','Peiris','Kandy','supunpeiris','supunp@gmail.com','supunp123','0711234567','No 115, Haragama,Kapuliyadda, Talathuoya','retailer'),
(2,'Sapumal','Siriwardhana','Colombo','sapumalsiriwardhana','sapumals@gmail.com','sapumals123','0761234967','411 Galle Road, Colombo 03','wholesaler'),
(3,'Shriya','Shantha','Negombo','shriyashantha','shriyas@gmail.com','shriyas123','0768234967','No 24,1st Cross Street, Negombo','end customer'),
(4,'Evon','Gunathilaka','Galle','evongunathilaka','evong@gmail.com','evong123','0763334967','590 Galle Road, Galle','wholesaler'),
(5,'Fiona','Fernando','Matara','fionafernando','fionaf@gmail.com','fionaf123','0717934567','No 3/4, 1 Lane, Upatissa mawatha, Walgama South,Matara','end customer'),
(6,'Georgina','Alvis','Jaffna','georginaalvis','georgea@gmail.com','georgea123','0714434567','Nellandai Veethi,Thumpalai,Point- Pedro','retailer'),
(7,'Hannah','Jayaweera','Trincomalee','hannahjayaweera','hannahj@gmail.com','hannahj123','0761114967','B6,Panichankemi,Trincomalee','wholesaler'),
(8,'Isaac','Newton','Kandy','isaacnewton','isaacn@gmail.com','isaacn123','0708132497','No 78, Ullandupitiya Rd,Werellagama','end customer'),
(9,'Julia','Premawardhana','Colombo','juliapremawardhana','juliap@gmail.com','juliap123','0700922497','200 Union Place, Colombo 02','retailer'),
(10,'Kevin','Balasooriya','Negombo','kevinbalasooriya','kevinb@gmail.com','kevinb123','0714035267','No 17,Mankuliya Road, Negombo','wholesaler'),
(11,'Laura','Aponsu','Galle','lauraaponsu','lauraa@gmail.com','lauraa123','0769900267','188 Main Street, Galle','end customer'),
(12,'Michael','Perera','Matara','michaelperera','michaelp@gmail.com','michaelp123','0708135557','No 107, Dehigaspe,Pitabeddara','retailer'),
(13,'Soffy','Taylor','Jaffna','soffytaylor','soffyt@gmail.com','soffyt123','0717835557','St. Mary’s Lane,Kopay,Jaffna','wholesaler'),
(14,'Patrick','Anderson','Trincomalee','patrickanderson','patricka@gmail.com','patricka123','0711111157','B34,Hulogedara,Trincomalee','end customer'),
(15,'Piyadasa','Samarasekara','Kandy','piyadasasamarasekara','piyadasas@gmail.com','piyadasas123','0761654467','No 85/8,Station Road,Katugastota','retailer'),
(16,'Amali','Karunarathna','Colombo','amalikarunarathna','amalik@gmail.com','amalik123','0113448902','65 Maligawatte Road, Colombo 10','wholesaler'),
(17,'Sithumi','Jayasinghe','Negombo','sithumijayasinghe','sithumij@gmail.com','sithumij123','0751653367','No 4,Kudapaduwa, Negombo','end customer'),
(18,'Sunimal','Vidhana','Galle','sunimalvidhana','sunimalv@gmail.com','sunimalv123','0741653375','No 245/5, SI, Ransiri Uyana,Moris Rd, Galle','retailer'),
(19,'Tina','Kariyawasam','Matara','tinakariyawasam','tinak@gmail.com','tinak123','0719999991','No 72/19, Aswatta,Kirimetimulla, Thelijjawila','wholesaler'),
(20,'Diana','Peiris','Jaffna','dianapeiris','dianap@gmail.com','dianap123','0760003991','657/1 Hospital Road,Jaffna','retailer');


-- Insert into Driver
INSERT INTO Driver (driver_ID, first_name, last_name, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
(1,'Nimal','Alvis','nimala','nimala@gmail.com','password123','0711112223',140.00,20.00,40000.00),
(2,'Kamal','Perera','kamalp','kamalp@gmail.com','password789','0711122334',145.00,22.50,42000.00),
(3,'Bimal','Fernando','bimalf','bimalf@gmail.com','password102','0713322114',150.00,25.00,45000.00),
(4,'Pathum','Kumara','pathumk','pathumk@gmail.com','password104','0717788991',147.00,23.50,43000.00),
(5,'Kantha','Lakshan','kanthal','kanthal@gmail.com','password106','0714455661',139.00,19.50,39500.00),
(6,'Shantha','Rathna','shanthar','shanthar@gmail.com','password108','0713344990',146.00,23.00,42500.00),
(7,'Priyantha','Peiris','priyanthap','priyanthap@gmail.com','password109','0718833221',143.00,21.50,41500.00),
(8,'Lasantha','Karunarathna','lasanthak','lasanthak@gmail.com','password110','0715500883',144.00,23.00,42000.00),
(9,'Krishantha','Kariyawasam','krishanthak','krishanthak@gmail.com','password111','0714400558',140.00,20.00,40000.00),
(10,'Dimantha','Aponsu','dimanthaa','dimanthaa@gmail.com','password112','0710099335',137.00,18.50,38500.00);


-- Insert into DriverAssistant
INSERT INTO DriverAssistant (driverA_ID, first_name, last_name, username, email, password, phone_number, total_hours, weekly_hours, monthly_salary) VALUES
(1,'Lal','Kantha','lalkantha','lalk@gmail.com','passlalk','0710033772',165.00,22.00,30000.00),
(2,'Lisal','Jayamanna','lisaljaya','lisalj@gmail.com','passlisalj','0710011772',170.00,25.00,32000.00),
(3,'Movindu','Gunasinghe','movinduguna','movindug@gmail.com','passmovindug','0710099772',168.00,24.00,31000.00),
(4,'Namal','Lanka','namallan','namall@gmail.com','passsnamall','0719988775',162.00,21.00,29000.00),
(5,'Nipun','Jayasinghe','nipunjaya','nipunj@gmail.com','passnipunj','0719080775',175.00,27.00,34000.00),
(6,'Piyath','Premachandra','piyathprema','piyathp@gmail.com','passpiyathp','0712565775',164.00,22.00,30000.00),
(7,'Vikum','Peiris','vikumpei','vikump@gmail.com','passvikump','0712565707',167.00,23.50,31000.00),
(8,'Viranga','Nelson','viranganel','virangan@gmail.com','passvirangan','0712035707',172.00,26.00,33000.00),
(9,'Vinod','Alvis','vinodalv','vinoda@gmail.com','passvinoda','0710234772',169.00,24.50,31500.00),
(10,'Yasindu','Piyasiri','yasindupiya','yasindup@gmail.com','passyasindup','0718765432',166.00,23.00,30500.00);


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
INSERT INTO Product (product_ID, name, price, discount, volume) VALUES
(1,'T-shirt',2000.00,5,0.30),
(2,'Jeans',5000.00,1,0.80),
(3,'Sneakers',7500.00,8,1.20),
(4,'Backpack',4500.00,2,1.50),
(5,'Sunglasses',500.00,0,0.20),
(6,'Wristwatch',3200.00,5,0.30),
(7,'Wallet',2500.00,1,0.20),
(8,'Handbag',5500.00,8,0.70),
(9,'Belt',1800.00,5,0.10),
(10,'Cap',1500.00,7,0.20),
(11,'Socks',100.00,0,0.10),
(12,'Jacket',1000.00,0,1.80),
(13,'Dress',7000.00,2,1.00),
(14,'Blender',9000.00,10,2.50),
(15,'Coffee Maker',10000.00,15,3.00),
(16,'Toaster',8000.00,10,1.80),
(17,'Iron',4500.00,8,1.40),
(18,'Cookware Set',12000.00,20,5.00),
(19,'Bath Towel',2500.00,0,1.00),
(20,'Pillow',3000.00,2,1.20);


-- Insert into Train
INSERT INTO Train (train_ID, time, day, capacity, destination) VALUES
(1,'08:00:00','Monday',2000.00,'Colombo'),
(2,'14:00:00','Monday',2000.00,'Negombo'),
(3,'08:00:00','Tuesday',1800.00,'Galle'),
(4,'14:00:00','Tuesday',1800.00,'Matara'),
(5,'08:00:00','Wednesday',2200.00,'Jaffna'),
(6,'14:00:00','Wednesday',2200.00,'Trincomalee'),
(7,'08:00:00','Thursday',1900.00,'Colombo'),
(8,'14:00:00','Thursday',1900.00,'Negombo'),
(9,'08:00:00','Friday',2100.00,'Galle'),
(10,'14:00:00','Friday',2100.00,'Matara'),
(11,'08:00:00','Saturday',2000.00,'Jaffna'),
(12,'14:00:00','Saturday',2000.00,'Trincomalee'),
(13,'08:00:00','Sunday',2000.00,'Colombo'),
(14,'14:00:00','Sunday',2000.00,'Negombo');


-- Insert into OrderStatus
INSERT INTO OrderStatus (status_ID, status, description) VALUES 
(1, 'Processing', 'Order is successfully placed and being processed'),
(2, 'Dispatched', 'Order has been dispatched from the main store'),
(3, 'Out for delivery', 'Order has been dispatched from the local store'),
(4, 'Delivered', 'Order has been delivered'),
(5, 'Cancelled', 'Order was cancelled');




DELIMITER //

CREATE PROCEDURE InsertOrderAndProducts(
    IN p_customerID INT,
    IN p_routeID INT,
    IN p_totalVolume DECIMAL(8, 2),
    IN p_cart JSON
)
BEGIN
    DECLARE newOrderID INT;
    DECLARE i INT DEFAULT 0;
    DECLARE cartItem JSON;
    DECLARE productID INT;
    DECLARE quantity INT;

    -- Step 1: Insert into the Order table
    INSERT INTO `Order` (customer_ID, route_ID, status_ID, time, date, total_volume)
    VALUES (p_customerID, p_routeID, 1, NOW(), CURDATE(), p_totalVolume);

    -- Step 2: Get the last inserted order ID
    SET newOrderID = LAST_INSERT_ID();

    -- Step 3: Loop through the cart (JSON array) and insert each item into OrderProduct
    WHILE i < JSON_LENGTH(p_cart) DO
        -- Extract the product_ID and quantity from the cart JSON array
        SET cartItem = JSON_EXTRACT(p_cart, CONCAT('$[', i, ']'));

        -- Extract product_ID and quantity from cartItem
        SET productID = JSON_UNQUOTE(JSON_EXTRACT(cartItem, '$.product_ID'));
        SET quantity = JSON_UNQUOTE(JSON_EXTRACT(cartItem, '$.quantity'));

        -- Insert each product into OrderProduct table
        INSERT INTO OrderProduct (order_ID, product_ID, quantity)
        VALUES (newOrderID, productID, quantity);

        -- Increment loop counter
        SET i = i + 1;
    END WHILE;
     -- Return the new order ID
    SELECT newOrderID AS insertId;
END //

DELIMITER ;


-----------------------------------------------------------------------------------------------------------



DELIMITER //

CREATE PROCEDURE GetRoutesForCustomerCity(IN customerID INT)
BEGIN
  DECLARE customerCity VARCHAR(20);
  DECLARE storeID TINYINT;

  -- Fetch the customer's city from the Customer table
  SELECT city INTO customerCity FROM Customer WHERE customer_ID = customerID;

  -- Fetch the store_ID for that city from the Store table
  SELECT store_ID INTO storeID FROM Store WHERE city = customerCity;

  -- Fetch the routes that belong to the store
  SELECT * FROM Route WHERE store_ID = storeID;
  
END //

DELIMITER ;


-----------------------------------------------------------------------------------------------------------
----------------------------Procedures for Truck schedule--------------------------------------------------
-----------------------------------------------------------------------------------------------------------



DELIMITER //

CREATE PROCEDURE GetAllScheduleData(
    IN managerStoreID INT
)
BEGIN
    -- Fetch the city based on the manager's store ID
    DECLARE managerCity VARCHAR(20);
    
    SELECT city INTO managerCity 
    FROM Store 
    WHERE store_ID = managerStoreID;

    -- Fetch drivers based on the manager's city
    SELECT driver_ID, first_name, last_name 
    FROM Driver 
    WHERE city = managerCity;

    -- Fetch driver assistants based on the manager's city
    SELECT driverA_ID, first_name, last_name 
    FROM DriverAssistant 
    WHERE city = managerCity;

    -- Fetch trucks based on the manager's store ID
    SELECT truck_Id, truck_plate_no 
    FROM Truck 
    WHERE store_ID = managerStoreID;

    -- Fetch routes based on the manager's store ID
    SELECT route_ID, path_description 
    FROM Route 
    WHERE store_ID = managerStoreID;
END //

DELIMITER ;


-----------------------------------------------------------------------------------------------------------



DELIMITER //

CREATE PROCEDURE GetRecentSchedules(IN managerId INT)
BEGIN
    SELECT 
        ts.schedule_ID,
        d.first_name AS driver_first_name,
        d.last_name AS driver_last_name,
        da.first_name AS assistant_first_name,
        da.last_name AS assistant_last_name,
        t.truck_plate_no,
        r.path_description,
        ts.date,
        ts.time,
        ts.status
    FROM 
        TruckSchedule ts
    JOIN 
        Driver d ON ts.driver_ID = d.driver_ID
    JOIN 
        DriverAssistant da ON ts.driverA_ID = da.driverA_ID
    JOIN 
        Truck t ON ts.truck_Id = t.truck_Id
    JOIN 
        Route r ON ts.route_ID = r.route_ID
    WHERE 
        ts.manager_ID = managerId
        AND ts.date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH);
END //

DELIMITER ;


-----------------------------------------------------------------------------------------------------------


DELIMITER //

CREATE PROCEDURE CreateTruckSchedule(
    IN p_driver_ID INT,
    IN p_driverA_ID INT,
    IN p_truck_Id INT,
    IN p_route_ID INT,
    IN p_date DATE,
    IN p_time TIME,
    IN p_manager_ID INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
sp: BEGIN
    DECLARE v_route_duration DECIMAL(4,2);
    DECLARE v_last_driver_end DATETIME;
    DECLARE v_last_trip_end DATETIME;
    DECLARE v_second_last_trip_end DATETIME;
    DECLARE v_total_driver_hours DECIMAL(5,2);
    DECLARE v_total_assistant_hours DECIMAL(5,2);
    DECLARE v_new_trip_end DATETIME;
    DECLARE v_assistant_weekly_hours DECIMAL(5,2);
    DECLARE v_driver_weekly_hours DECIMAL(5,2);


    -- Initialize success to false
    SET p_success = FALSE;

    -- Step 1: Get route duration
    SELECT duration INTO v_route_duration
    FROM Route
    WHERE route_ID = p_route_ID;

    -- Step 2: Calculate new trip end time
    SET v_new_trip_end = TIMESTAMP(p_date, p_time) + INTERVAL v_route_duration HOUR;

    -- Step 3: Check if driver has consecutive trip without a 4-hour break                      
    SELECT MAX(TIMESTAMP(date, time) + INTERVAL r.duration HOUR) INTO v_last_driver_end
    FROM TruckSchedule ts
    JOIN Route r ON ts.route_ID = r.route_ID
    WHERE ts.driver_ID = p_driver_ID
    ORDER BY ts.date DESC, ts.time DESC
    LIMIT 1;
    
	IF v_last_driver_end IS NOT NULL AND TIMESTAMP(p_date, p_time) < v_last_driver_end  THEN
        SET p_message = 'Driver cannot be assigned to multiple schedules at the same time';
        LEAVE sp;
    END IF;    

    IF v_last_driver_end IS NOT NULL AND TIMESTAMP(p_date, p_time) < v_last_driver_end + INTERVAL 4 HOUR THEN
        SET p_message = 'Driver cannot be assigned to consecutive trips without a 4-hour break';
        LEAVE sp;
    END IF;

	-- Retrieve the end time of the last trip of the assistant                                
	SELECT TIMESTAMP(date, time) + INTERVAL r.duration HOUR INTO v_last_trip_end
	FROM TruckSchedule ts
	JOIN Route r ON ts.route_ID = r.route_ID
	WHERE ts.driverA_ID = p_driverA_ID
	ORDER BY TIMESTAMP(date, time) DESC
	LIMIT 1;

	-- Retrieve the end time of the second-last trip of the assistant, if it exists
	SELECT TIMESTAMP(date, time) + INTERVAL r.duration HOUR INTO v_second_last_trip_end
	FROM TruckSchedule ts
	JOIN Route r ON ts.route_ID = r.route_ID
	WHERE ts.driverA_ID = p_driverA_ID
	ORDER BY TIMESTAMP(date, time) DESC
	LIMIT 1 OFFSET 1;  -- Skip the most recent trip and get the second last

    IF v_last_trip_end IS NOT NULL AND TIMESTAMP(p_date, p_time) < v_last_trip_end THEN
        SET p_message = 'Assistant cannot be assigned to multiple schedules at the same time';
        LEAVE sp;
    END IF;
    
    IF v_second_last_trip_end IS NOT NULL
       AND  TIMESTAMP(p_date, p_time) < v_last_trip_end + INTERVAL 4 HOUR
       AND v_second_last_trip_end > v_last_trip_end - INTERVAL 4 HOUR THEN
        SET p_message = 'Assistant cannot be assigned to a third consecutive trip without a 4-hour break';
        LEAVE sp;
    END IF;

    -- Step 5: Check weekly hours limit for driver (max 40 hours)                                  
    -- Fetch the current weekly hours for the driver
	SELECT weekly_hours INTO v_driver_weekly_hours
	FROM Driver
	WHERE driver_ID = p_driver_ID;

	-- Check if adding the new route duration exceeds 40 hours
	IF v_driver_weekly_hours + v_route_duration > 40 THEN
		SET p_message = 'Driver exceeds weekly hours limit of 40 hours';
		LEAVE sp;
	END IF;

    -- Step 6: Check weekly hours limit for assistant (max 60 hours)                       
    -- Fetch the current weekly hours for the assistant
	SELECT weekly_hours INTO v_assistant_weekly_hours
	FROM DriverAssistant
	WHERE driverA_ID = p_driverA_ID;

	-- Check if adding the new route duration exceeds 60 hours
	IF v_assistant_weekly_hours + v_route_duration > 60 THEN
		SET p_message = 'Assistant exceeds weekly hours limit of 60 hours';
		LEAVE sp;
	END IF;

    -- Step 7: If all conditions pass, insert the new schedule
    INSERT INTO TruckSchedule (driver_ID, driverA_ID, truck_Id, route_ID, date, time, manager_ID, status)
    VALUES (p_driver_ID, p_driverA_ID, p_truck_Id, p_route_ID, p_date, p_time, p_manager_ID, 'scheduled');

    -- Set success message
    SET p_success = TRUE;
    SET p_message = 'Schedule created successfully';

END sp //
DELIMITER ;


-----------------------------------------------------------------------------------------------------------


DELIMITER //

CREATE PROCEDURE UpdateHoursAfterCompletion(
    IN p_schedule_ID INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
UpdateHoursAfterCompletion: BEGIN
    DECLARE v_driver_ID INT;
    DECLARE v_driverA_ID INT;
    DECLARE v_route_duration DECIMAL(4, 2);
    DECLARE v_assistant_weekly_hours DECIMAL(5,2);
    DECLARE v_driver_weekly_hours DECIMAL(5,2);

    -- Initialize success to false
    SET p_success = FALSE;

    -- Start transaction
    START TRANSACTION;

    -- Step 1: Update the schedule status to 'completed'
    UPDATE TruckSchedule 
    SET status = 'completed' 
    WHERE schedule_ID = p_schedule_ID;

    -- Step 2: Check if the status was successfully updated
    IF ROW_COUNT() = 0 THEN
        SET p_message = 'Schedule not found or already completed';
        ROLLBACK;
        LEAVE UpdateHoursAfterCompletion;
    END IF;

    -- Step 3: Fetch driver, assistant, and route duration
    SELECT ts.driver_ID, ts.driverA_ID, r.duration
    INTO v_driver_ID, v_driverA_ID, v_route_duration
    FROM TruckSchedule ts
    JOIN Route r ON ts.route_ID = r.route_ID
    WHERE ts.schedule_ID = p_schedule_ID;

    -- Step 4: Update total_hours and weekly_hours for the Driver
    UPDATE Driver
    SET total_hours = total_hours + v_route_duration,
        weekly_hours = weekly_hours + v_route_duration
    WHERE driver_ID = v_driver_ID;
    
    -- Check if the driver's hours update was successful
    IF ROW_COUNT() = 0 THEN
        SET p_message = 'Failed to update driver hours';
        ROLLBACK;
        LEAVE UpdateHoursAfterCompletion;
    END IF;

    -- Step 5: Update total_hours and weekly_hours for the DriverAssistant
    UPDATE DriverAssistant
    SET total_hours = total_hours + v_route_duration,
        weekly_hours = weekly_hours + v_route_duration
    WHERE driverA_ID = v_driverA_ID;
    
    -- Check if the assistant's hours update was successful
    IF ROW_COUNT() = 0 THEN
        SET p_message = 'Failed to update assistant hours';
        ROLLBACK;
        LEAVE UpdateHoursAfterCompletion;
    END IF;

    -- Commit the transaction if all steps succeeded
    COMMIT;

    -- Set success message
    SET p_success = TRUE;
    SET p_message = 'Schedule marked as completed and hours updated successfully';

END //
DELIMITER ;



-----------------------------------------------------------------------------------------------------------



DELIMITER //

CREATE PROCEDURE AssignOrdersToSchedule(
    IN p_schedule_ID INT,
    OUT p_pending_orders INT
)
BEGIN
    -- Variable declarations
    DECLARE v_truck_capacity DECIMAL(8,2);
    DECLARE v_total_volume DECIMAL(8,2) DEFAULT 0;
    DECLARE v_route_ID INT;
    DECLARE v_order_ID INT;
    DECLARE v_order_volume DECIMAL(8,2);
    DECLARE done INT DEFAULT FALSE;
    DECLARE is_kandy_route BOOLEAN DEFAULT FALSE;

    -- Cursor and handler declarations
    DECLARE order_cursor CURSOR FOR
        SELECT order_ID, total_volume
        FROM `Order`
        WHERE 
            (is_kandy_route = TRUE AND route_ID = v_route_ID AND schedule_ID IS NULL)
            OR (is_kandy_route = FALSE AND route_ID = v_route_ID AND (schedule_ID IS NULL AND status_ID = 2))
        ORDER BY total_volume ASC;
        
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Temporary table for storing assigned order IDs
    CREATE TEMPORARY TABLE TempAssignedOrders (order_ID INT);

    -- Initialize pending orders count
    SET p_pending_orders = 0;

    -- Start a transaction to ensure atomicity
    START TRANSACTION;

    -- Step 1: Retrieve the truck's capacity and route ID for the given schedule
    SELECT t.capacity, ts.route_ID
    INTO v_truck_capacity, v_route_ID
    FROM TruckSchedule ts
    JOIN Truck t ON ts.truck_Id = t.truck_Id
    WHERE ts.schedule_ID = p_schedule_ID;

    -- Step 2: Determine if this is a Kandy route
    SET is_kandy_route = (v_route_ID IN (SELECT route_ID FROM Route WHERE store_ID = 1));

    -- Step 3: Open the cursor and loop through orders
    OPEN order_cursor;

    assign_loop: LOOP
        FETCH order_cursor INTO v_order_ID, v_order_volume;
        
        -- Exit loop when no more orders are found
        IF done THEN 
            LEAVE assign_loop; 
        END IF;
        
        -- Check if adding the order exceeds the truck capacity
        IF (v_total_volume + v_order_volume) <= v_truck_capacity THEN
            -- Assign the order to the schedule
            UPDATE `Order`
            SET schedule_ID = p_schedule_ID
            WHERE order_ID = v_order_ID;
            
            -- Add the order ID to the temporary table
            INSERT INTO TempAssignedOrders (order_ID) VALUES (v_order_ID);
            
            SET v_total_volume = v_total_volume + v_order_volume;
            
        ELSE
            -- Increment pending orders count if it exceeds capacity
            SET p_pending_orders = p_pending_orders + 1;
        END IF;
    END LOOP assign_loop;

    CLOSE order_cursor;
    
    COMMIT;

    -- Select assigned order IDs to return them
    SELECT order_ID FROM TempAssignedOrders;
    
    -- Return pending orders count separately
    SELECT p_pending_orders AS pending_orders;


    -- Clean up temporary table
    DROP TEMPORARY TABLE TempAssignedOrders;
END //

DELIMITER ;




-----------------------------------------------------------------------------------------------------------
----------------------------Procedures for Reports---------------------------------------------------------
-----------------------------------------------------------------------------------------------------------






DELIMITER //

CREATE PROCEDURE GetQuarterlySalesData(IN p_year INT, IN p_quarter INT)
BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;

    -- Calculate the start and end dates based on the quarter
    SET start_date = CASE p_quarter
                     WHEN 1 THEN CONCAT(p_year, '-01-01')
                     WHEN 2 THEN CONCAT(p_year, '-04-01')
                     WHEN 3 THEN CONCAT(p_year, '-07-01')
                     WHEN 4 THEN CONCAT(p_year, '-10-01')
                     END;

    SET end_date = DATE_ADD(start_date, INTERVAL 3 MONTH);

    -- Fetch the total quantity of each product sold within the date range
    SELECT p.product_ID, 
           p.name AS product_name, 
           SUM(op.quantity) AS total_quantity_sold,
           COUNT(DISTINCT o.order_ID) AS total_orders
    FROM `Order` o
    JOIN OrderProduct op ON o.order_ID = op.order_ID
    JOIN Product p ON op.product_ID = p.product_ID
    WHERE o.date BETWEEN start_date AND end_date
    GROUP BY p.product_ID, p.name
    ORDER BY total_quantity_sold DESC;

END //

DELIMITER ;


-----------------------------------------------------------------------------------------------------------


DELIMITER //

CREATE PROCEDURE GetRouteSpecificSales(
    IN p_route_ID INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT 
        name,
        SUM(total_quantity_sold) AS total_quantity_sold
    FROM RouteSpecificSales
    WHERE 
        route_ID = p_route_ID 
        AND CONCAT(year, '-', LPAD(month, 2, '0'), '-01') BETWEEN p_start_date AND p_end_date
    GROUP BY name;
END //

DELIMITER ;



-----------------------------------------------------------------------------------------------------------



DELIMITER //

CREATE PROCEDURE GetCustomersInManagerCity(IN manager_id INT)
BEGIN
    SELECT 
        c.customer_ID, 
        c.first_name, 
        c.last_name, 
        c.customer_type
    FROM 
        Customer c
    JOIN 
        Store s ON c.city = s.city
    JOIN 
        Manager m ON s.store_ID = m.store_ID
    WHERE 
        m.manager_ID = manager_id;
END //

DELIMITER ;













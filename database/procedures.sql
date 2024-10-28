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









